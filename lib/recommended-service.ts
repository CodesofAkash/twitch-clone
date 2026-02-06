import { db } from "./db";
import { getSelf } from "./auth-service";

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
          },
        },
      },
      orderBy: [
        {
          stream: {
            isLive: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
      take: 10,
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
          },
        },
      },
      orderBy: [
        {
          stream: {
            isLive: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
      take: 10,
    });
  }

  return users;
};