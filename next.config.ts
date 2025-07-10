import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "img.clerk.com",
      "q5oayrdeu3.ufs.sh"
    ],
  },
  
  eslint: {
    ignoreDuringBuilds: true, // 💣 disables ESLint during `next build`
  },
  
  typescript: {
    ignoreBuildErrors: true, // 💣 disables TypeScript errors during build
  },
};

export default nextConfig;
