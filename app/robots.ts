import { MetadataRoute } from "next";
import { contentConfig } from "@/lib/content-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/u/", "/api/", "/sign-in", "/sign-up"],
      },
    ],
    sitemap: `${contentConfig.project.baseUrl}/sitemap.xml`,
  };
}