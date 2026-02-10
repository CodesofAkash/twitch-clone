"use server";

import { db } from "@/lib/db";

export const submitSuggestion = async (data: {
  name: string;
  email: string;
  title: string;
  description: string;
  category: string;
}) => {
  try {
    await db.suggestion.create({
      data,
    });

    return { success: true };
  } catch (error) {
    throw new Error("Failed to submit suggestion");
  }
};