import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          { id: { not: userId } },
          {
            followers: {
              none: {
                followerId: userId,
              },
            },
          },
          {
            blocking: {
              none: {
                blockedId: userId,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        imageUrl: true,
        stream: {
          select: {
            id: true,
            isLive: true,
            viewerCount: true,
          },
        },
      },
      orderBy: [
        {
          stream: {
            isLive: "desc", // LIVE USERS FIRST
          },
        },
        {
          stream: {
            viewerCount: "desc", // Then by viewer count
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  } else {
    users = await db.user.findMany({
      select: {
        id: true,
        username: true,
        imageUrl: true,
        stream: {
          select: {
            id: true,
            isLive: true,
            viewerCount: true,
          },
        },
      },
      orderBy: [
        {
          stream: {
            isLive: "desc", // LIVE USERS FIRST
          },
        },
        {
          stream: {
            viewerCount: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  }

  return users;
};