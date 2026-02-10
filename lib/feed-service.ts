import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getStreams = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
      },
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
        viewerCount: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
          take: 3,
        },
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          viewerCount: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
        viewerCount: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
          take: 3,
        },
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          viewerCount: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  // Transform the data to flatten category and tags
  return streams.map((stream) => ({
    ...stream,
    categoryName: stream.category?.name || null,
    categorySlug: stream.category?.slug || null,
    tagNames: stream.tags.map((t) => t.tag.name),
    category: undefined,
    tags: undefined,
  }));
};

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
              viewerCount: true,
              category: {
                select: {
                  name: true,
                  slug: true,
                },
              },
              tags: {
                select: {
                  tag: {
                    select: {
                      name: true,
                    },
                  },
                },
                take: 3,
              },
            },
          },
        },
      },
    },
  });

  return followedUsers
    .map((follow) => follow.following.stream)
    .filter((stream): stream is NonNullable<typeof stream> => stream !== null)    .map((stream) => ({
      ...stream,
      categoryName: stream.category?.name || null,
      categorySlug: stream.category?.slug || null,
      tagNames: stream.tags.map((t) => t.tag.name),
      category: undefined,
      tags: undefined,
    }));
};