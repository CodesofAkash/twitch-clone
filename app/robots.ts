import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/u/", "/api/", "/sign-in", "/sign-up"],
      },
    ],
    sitemap: "https://twitch-clone--codesofakash.vercel.app/sitemap.xml",
  };
}