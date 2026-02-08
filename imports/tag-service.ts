// lib/tag-service.ts

import { db } from "@/lib/db";

// Get all tags
export const getAllTags = async () => {
  const tags = await db.tag.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return tags;
};

// Get or create tag
export const getOrCreateTag = async (name: string) => {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const existing = await db.tag.findUnique({
    where: { slug },
  });

  if (existing) {
    return existing;
  }

  const tag = await db.tag.create({
    data: {
      name,
      slug,
    },
  });

  return tag;
};

// Search tags
export const searchTags = async (query: string) => {
  const tags = await db.tag.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10,
  });

  return tags;
};

// Get popular tags
export const getPopularTags = async (limit: number = 20) => {
  const tags = await db.tag.findMany({
    include: {
      _count: {
        select: {
          streams: true,
        },
      },
    },
    orderBy: {
      streams: {
        _count: "desc",
      },
    },
    take: limit,
  });

  return tags;
};
