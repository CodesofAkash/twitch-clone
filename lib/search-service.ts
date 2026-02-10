import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export interface SearchFilters {
  term?: string;
  categorySlug?: string;
  tag?: string;
  liveOnly?: boolean;
  sortBy?: "viewers" | "recent";
}

export const searchStreams = async (filters: SearchFilters) => {
  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  const whereConditions: any = {
    ...(userId && {
      user: { NOT: { blocking: { some: { blockedId: userId } } } },
    }),
  };

  if (filters.categorySlug) {
    whereConditions.category = { slug: filters.categorySlug };
  }

  if (filters.tag) {
    whereConditions.tags = {
      some: { tag: { slug: filters.tag.toLowerCase().replace(/\s+/g, "-") } },
    };
  }

  if (filters.liveOnly) {
    whereConditions.isLive = true;
  }

  if (filters.term) {
    whereConditions.OR = [
      { name: { contains: filters.term, mode: "insensitive" as const } },
      { user: { username: { contains: filters.term, mode: "insensitive" as const } } },
    ];
  }

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
      viewerCount: true,
      category: { select: { name: true, slug: true } },
      tags: {
        select: { tag: { select: { name: true, slug: true } } },
        take: 5,
      },
    },
    orderBy,
    take: 100,
  });

  return streams.map((stream) => ({
    ...stream,
    categoryName: stream.category?.name || null,
    categorySlug: stream.category?.slug || null,
    tagNames: stream.tags.map((t) => t.tag.name),
    tagSlugs: stream.tags.map((t) => t.tag.slug),
    category: undefined,
    tags: undefined,
  }));
};