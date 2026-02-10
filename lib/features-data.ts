export const currentFeatures = [
  {
    category: "Core Platform",
    features: [
      {
        name: "Real-time Streaming",
        description: "WebRTC-powered live streaming with sub-second latency",
        tech: ["LiveKit", "WebRTC"],
      },
      {
        name: "Interactive Chat",
        description: "Real-time chat with emote support",
        tech: ["LiveKit DataChannel", "React"],
      },
      {
        name: "Categories & Tags",
        description: "Organize streams with 16 categories and custom tags",
        tech: ["PostgreSQL", "Prisma"],
      },
    ],
  },
  {
    category: "User Features",
    features: [
      {
        name: "Follow System",
        description: "Follow your favorite streamers",
        tech: ["Clerk", "PostgreSQL"],
      },
      {
        name: "Search & Discovery",
        description: "Find streams by category, tags, or keywords",
        tech: ["Next.js Server Actions", "Prisma"],
      },
      {
        name: "Stream Dashboard",
        description: "Manage your stream, chat settings, and keys",
        tech: ["Next.js 15 App Router", "Server Components"],
      },
    ],
  },
  {
    category: "Technical Stack",
    features: [
      {
        name: "Frontend",
        description: "Modern React with server components",
        tech: ["Next.js 15", "React 19", "TypeScript"],
      },
      {
        name: "Styling",
        description: "Utility-first CSS with pre-built components",
        tech: ["Tailwind CSS", "shadcn/ui", "Radix UI"],
      },
      {
        name: "Backend",
        description: "Type-safe database and authentication",
        tech: ["Prisma", "PostgreSQL", "Clerk"],
      },
    ],
  },
];

export const futureFeatures = [
  {
    priority: "High",
    features: [
      {
        name: "Stream Notifications",
        description: "Get notified when followed channels go live",
        status: "Planned",
      },
      {
        name: "Clips System",
        description: "Create and share 30-60s highlights",
        status: "In Progress",
      },
      {
        name: "VOD Recordings",
        description: "Save and replay past streams",
        status: "Planned",
      },
    ],
  },
  {
    priority: "Medium",
    features: [
      {
        name: "Stream Analytics",
        description: "Viewer graphs, peak times, growth metrics",
        status: "Planned",
      },
      {
        name: "Moderation Tools",
        description: "Timeout, ban, and auto-mod features",
        status: "Planned",
      },
      {
        name: "Custom Emotes",
        description: "Upload channel-specific emotes",
        status: "Research",
      },
    ],
  },
  {
    priority: "Future",
    features: [
      {
        name: "Subscriptions",
        description: "Paid memberships with Stripe",
        status: "Research",
      },
      {
        name: "Raid System",
        description: "Send viewers to another channel",
        status: "Planned",
      },
      {
        name: "Mobile Apps",
        description: "Native iOS and Android apps",
        status: "Future",
      },
    ],
  },
];