import { getSelf } from "./auth-service";
import { db } from "./db";

export const getStreams = async () => {
    let userId;

    try {
        const self = await getSelf();
        userId = self.id;
    } catch {
        userId = null;
    }

    let streams = [];

    if(userId) {
        streams = await db.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId,
                            }
                        }
                    }
                }
            },
            select: {
                user: true,
                thumbnailUrl: true,
                name: true,
                isLive: true,
                id: true,
            },
            orderBy: [
                {
                    isLive: "desc",
                },
                {
                    updatedAt: "desc",
                }
            ]
        })
    } else {
        streams = await db.stream.findMany({
            select: {
                user: true,
                thumbnailUrl: true,
                name: true,
                isLive: true,
                id: true,
            },
            orderBy: [
                {
                    isLive: "desc",
                },
                {
                    updatedAt: "desc",
                }
            ]
        })
    }

    return streams;
}

/**
 * Retrieves the feed of live streams from users that the current user follows.
 * 
 * This function fetches all users followed by the authenticated user, excluding
 * those who have blocked the current user. It returns their associated stream data.
 * 
 * The `.map()` operation extracts the nested stream object from each followed user's data,
 * transforming the structure from `{ following: { stream: {...} } }` to just the stream object.
 * The `.filter(Boolean)` removes any null/undefined stream entries (for users without active streams).
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of stream objects containing
 * stream details (id, user, isLive status, name, and thumbnailUrl) for followed users who
 * haven't blocked the current user and have stream data available.
 * 
 * @throws {Error} If the current user cannot be authenticated via getSelf()
 * @throws {Error} If there's a database error during the query
 */
export const getFeed = async () => {
  const self = await getSelf();

  const followedUsers = await db.follow.findMany({
    where: {
      followerId: self.id,
      following: {
        blocking: {
          none: {
            blockedId: self.id,
          },
        },
      },
    },
    select: {
      following: {
        select: {
          stream: {
            select: {
              id: true,
              user: true,
              isLive: true,
              name: true,
              thumbnailUrl: true,
            },
          },
        },
      },
    },
  });

  return followedUsers.map((follow) => follow.following.stream).filter(Boolean);
};