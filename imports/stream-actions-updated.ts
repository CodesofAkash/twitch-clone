// actions/stream.ts - UPDATED VERSION

"use server";

import { revalidatePath } from "next/cache";
import { Stream } from "@prisma/client";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { getOrCreateTag } from "@/lib/tag-service";
import { createCustomCategory } from "@/lib/category-service";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) {
      throw new Error("Stream not found");
    }

    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };

    const stream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch {
    throw new Error("Internal Error");
  }
};

// Update stream category
export const updateStreamCategory = async (categoryIdOrName: string) => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) {
      throw new Error("Stream not found");
    }

    let categoryId: string;

    // Check if it's an existing category ID
    const existingCategory = await db.category.findUnique({
      where: { id: categoryIdOrName },
    });

    if (existingCategory) {
      categoryId = existingCategory.id;
    } else {
      // Create custom category
      const newCategory = await createCustomCategory(categoryIdOrName);
      categoryId = newCategory.id;
    }

    const stream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        categoryId,
      },
      include: {
        category: true,
      },
    });

    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch (error) {
    throw new Error("Failed to update category");
  }
};

// Update stream tags
export const updateStreamTags = async (tagNames: string[]) => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) {
      throw new Error("Stream not found");
    }

    // Delete existing tags
    await db.streamTag.deleteMany({
      where: {
        streamId: selfStream.id,
      },
    });

    // Get or create tags and link them
    const tags = await Promise.all(
      tagNames.map((name) => getOrCreateTag(name))
    );

    await db.streamTag.createMany({
      data: tags.map((tag) => ({
        streamId: selfStream.id,
        tagId: tag.id,
      })),
    });

    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return { success: true };
  } catch (error) {
    throw new Error("Failed to update tags");
  }
};
