import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

// Get all active categories
export const getAllCategories = async () => {
  return unstable_cache(
    async () => {
      const categories = await db.category.findMany({
        where: {
          isActive: true,
        },
        orderBy: [
          {
            isPredefined: "desc", // Predefined first
          },
          {
            name: "asc",
          },
        ],
      });

      return categories;
    },
    ["all-categories"],
    {
      revalidate: 300, // Cache for 5 minutes
      tags: ["categories"],
    }
  )();
};

// Get category by slug
export const getCategoryBySlug = async (slug: string) => {
  const category = await db.category.findUnique({
    where: {
      slug,
      isActive: true,
    },
  });

  return category;
};

// Get category by ID
export const getCategoryById = async (id: string) => {
  const category = await db.category.findUnique({
    where: {
      id,
      isActive: true,
    },
  });

  return category;
};

// Get categories with stream counts
export const getCategoriesWithStats = async () => {
  const categories = await db.category.findMany({
    where: {
      isActive: true,
    },
    include: {
      _count: {
        select: {
          streams: true,
        },
      },
      streams: {
        where: {
          isLive: true,
        },
        select: {
          viewerCount: true,
        },
      },
    },
    orderBy: [
      {
        isPredefined: "desc",
      },
      {
        name: "asc",
      },
    ],
  });

  return categories.map((category) => ({
    ...category,
    streamCount: category._count.streams,
    viewerCount: category.streams.reduce(
      (sum, stream) => sum + stream.viewerCount,
      0
    ),
    streams: undefined,
    _count: undefined,
  }));
};

// Create custom category (user-created)
export const createCustomCategory = async (
  name: string,
  description?: string
) => {
  // Create slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // Check if category already exists
  const existing = await db.category.findUnique({
    where: { slug },
  });

  if (existing) {
    // Return existing category if found
    return existing;
  }

  // Create new custom category with default image
  const category = await db.category.create({
    data: {
      name,
      slug,
      description,
      imageUrl:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=800&fit=crop", // Default image
      isPredefined: false,
      isActive: true,
    },
  });

  return category;
};

// Search categories by name
export const searchCategories = async (query: string) => {
  const categories = await db.category.findMany({
    where: {
      isActive: true,
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10,
  });

  return categories;
};
