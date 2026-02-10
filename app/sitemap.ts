import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { contentConfig } from "@/lib/content-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = contentConfig.project.baseUrl;

  // Get all users for dynamic routes
  const users = await db.user.findMany({
    select: {
      username: true,
      updatedAt: true,
    },
  });

  const userPages = users.map((user) => ({
    url: `${baseUrl}/${user.username}`,
    lastModified: user.updatedAt,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    ...userPages,
  ];
}