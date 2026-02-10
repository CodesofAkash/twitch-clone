"use server";

import { getSelf } from "@/lib/auth-service";
import { isBlockedByUser } from "@/lib/block-service";
import { getUserById } from "@/lib/user-service";
import { AccessToken } from "livekit-server-sdk";
import { v4 } from "uuid";

export const createViewerToken = async (hostIdentity: string) => {
  let self;

  try {
    self = await getSelf();
  } catch {
    // Create anonymous guest user for unauthenticated viewers
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    self = { id, username };
  }

  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error("User not found");
  }

  const isBlocked = await isBlockedByUser(host.id);

  if (isBlocked) {
    throw new Error("User is blocked");
  }

  const isHost = self.id === host.id;

  // Create LiveKit access token with appropriate permissions
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.username,
    }
  );

  // Grant room access: viewers can join and send data (chat), but not publish video/audio
  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await token.toJwt();
};