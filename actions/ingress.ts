"use server";

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  TrackSource,
  type CreateIngressOptions,
  IngressAudioOptions,
  IngressVideoOptions,
} from "livekit-server-sdk";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { revalidatePath } from "next/cache";

/* ---------------- clients ---------------- */

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

const ingressClient = new IngressClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

/* ---------------- presets ---------------- */

const videoOptions = new IngressVideoOptions({
  source: TrackSource.CAMERA,
  encodingOptions: {
    case: "preset",
    value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
  },
});

const audioOptions = new IngressAudioOptions({
  source: TrackSource.MICROPHONE,
  encodingOptions: {
    case: "preset",
    value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
  },
});

/* ---------------- helpers ---------------- */

export const resetIngress = async (hostIdentity: string) => {
  // delete rooms
  const rooms = await roomService.listRooms([hostIdentity]);
  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  // delete ingresses for this user
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

/* ---------------- main action ---------------- */

export const createIngress = async (inputType: number) => {
  const self = await getSelf();

  // ingresses for this user
  const userIngresses = await ingressClient.listIngress({
    roomName: self.id,
  });

  // all ingresses (free tier = 1 total)
  const allIngresses = await ingressClient.listIngress({});

  // if user has none but someone else does → block
  if (userIngresses.length === 0 && allIngresses.length > 0) {
    throw new Error("INGRESS_LIMIT_REACHED");
  }

  // always reset user's ingress
  await resetIngress(self.id);

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  if (inputType === 1) {
    options.enableTranscoding = true;
  } else {
    options.video = videoOptions;
    options.audio = audioOptions;
  }

  const ingressType =
    inputType === 0 ? IngressInput.RTMP_INPUT : IngressInput.WHIP_INPUT;

  const ingress = await ingressClient.createIngress(ingressType, options);

  if (!ingress?.url || !ingress?.streamKey) {
    throw new Error("FAILED_TO_CREATE_INGRESS");
  }

  await db.stream.update({
    where: { userId: self.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  revalidatePath(`/u/${self.username}/keys`);

  return {
    ingressId: ingress.ingressId,
    url: ingress.url,
    streamKey: ingress.streamKey,
  };
};
