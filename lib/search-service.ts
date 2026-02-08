import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const getSearch = async (term?: string) => {
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
        OR: [
          {
            name: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            user: {
              username: {
                contains: term,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
        updatedAt: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        viewerCount: true,
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
      where: {
        OR: [
          {
            name: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            user: {
              username: {
                contains: term,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
        updatedAt: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        viewerCount: true,
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

  return streams.map(stream => ({
    ...stream,
    categoryName: stream.category?.name || null,
    categorySlug: stream.category?.slug || null,
    tagNames: stream.tags.map(t => t.tag.name),
    category: undefined,
    tags: undefined,
  }));
};

// Search with filters
export interface SearchFilters {
  term?: string;
  categorySlug?: string;
  liveOnly?: boolean;
  sortBy?: "viewers" | "recent";
}

export const getFilteredSearch = async (filters: SearchFilters) => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  const whereConditions: any = {
    ...(userId && {
      user: {
        NOT: {
          blocking: {
            some: {
              blockedId: userId,
            },
          },
        },
      },
    }),
  };

  // Category filter
  if (filters.categorySlug) {
    whereConditions.category = {
      slug: filters.categorySlug,
    };
  }

  // Live only filter
  if (filters.liveOnly) {
    whereConditions.isLive = true;
  }

  // Search term
  if (filters.term) {
    whereConditions.OR = [
      {
        name: {
          contains: filters.term,
          mode: "insensitive",
        },
      },
      {
        user: {
          username: {
            contains: filters.term,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  // Sorting
  let orderBy: any = [{ isLive: "desc" }];
  
  if (filters.sortBy === "viewers") {
    orderBy.push({ viewerCount: "desc" });
  } else {
    orderBy.push({ updatedAt: "desc" });
  }

  const streams = await db.stream.findMany({
    where: whereConditions,
    select: {
      id: true,
      user: true,
      isLive: true,
      name: true,
      thumbnailUrl: true,
      updatedAt: true,
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      viewerCount: true,
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
    orderBy,
  });

  return streams.map(stream => ({
    ...stream,
    categoryName: stream.category?.name || null,
    categorySlug: stream.category?.slug || null,
    tagNames: stream.tags.map(t => t.tag.name),
    category: undefined,
    tags: undefined,
  }));
};