// prisma/seed.ts - WITH CATEGORIES AND TAGS

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Predefined categories with images
const PREDEFINED_CATEGORIES = [
  {
    name: "Just Chatting",
    slug: "just-chatting",
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=800&fit=crop",
    description: "Conversations, reactions, and hangouts",
  },
  {
    name: "Gaming",
    slug: "gaming",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=800&fit=crop",
    description: "All types of gaming content",
  },
  {
    name: "VALORANT",
    slug: "valorant",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=800&fit=crop",
    description: "Tactical 5v5 character-based shooter",
  },
  {
    name: "Counter-Strike",
    slug: "counter-strike",
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=800&fit=crop",
    description: "Classic competitive FPS",
  },
  {
    name: "League of Legends",
    slug: "league-of-legends",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=800&fit=crop",
    description: "MOBA strategy game",
  },
  {
    name: "Minecraft",
    slug: "minecraft",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop",
    description: "Creative sandbox building",
  },
  {
    name: "Art",
    slug: "art",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=800&fit=crop",
    description: "Digital art and illustration",
  },
  {
    name: "Music",
    slug: "music",
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=800&fit=crop",
    description: "Live music and DJ sets",
  },
  {
    name: "Cooking",
    slug: "cooking",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=800&fit=crop",
    description: "Culinary streams and recipes",
  },
  {
    name: "Fitness & Health",
    slug: "fitness-health",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&fit=crop",
    description: "Workouts and wellness",
  },
  {
    name: "Travel & Outdoors",
    slug: "travel-outdoors",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=800&fit=crop",
    description: "IRL travel and exploration",
  },
  {
    name: "Programming",
    slug: "programming",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=800&fit=crop",
    description: "Coding and software development",
  },
  {
    name: "Horror",
    slug: "horror",
    imageUrl: "https://images.unsplash.com/photo-1614465304860-05af03984ff0?w=600&h=800&fit=crop",
    description: "Horror games and scary content",
  },
  {
    name: "Retro Gaming",
    slug: "retro-gaming",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop",
    description: "Classic games and speedruns",
  },
  {
    name: "Strategy",
    slug: "strategy",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=800&fit=crop",
    description: "Turn-based and RTS games",
  },
  {
    name: "Anime & Manga",
    slug: "anime-manga",
    imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=800&fit=crop",
    description: "Anime discussions and reactions",
  },
];

// Common tags
const COMMON_TAGS = [
  "English", "Competitive", "Casual", "Tutorial", "Speedrun",
  "First Playthrough", "Funny", "Educational", "Relaxing", "High Skill",
  "Beginner Friendly", "Pro Player", "Ranked", "Unranked", "Co-op",
  "Multiplayer", "Single Player", "Creative", "Building", "PvP",
];

async function main() {
  console.log("🌱 Starting comprehensive seed...");

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  await prisma.streamTag.deleteMany({});
  await prisma.follow.deleteMany({});
  await prisma.block.deleteMany({});
  await prisma.stream.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.category.deleteMany({});

  // Create Categories
  console.log("\n📁 Creating categories...");
  const categories = [];
  for (const cat of PREDEFINED_CATEGORIES) {
    const category = await prisma.category.create({
      data: {
        ...cat,
        isPredefined: true,
        isActive: true,
      },
    });
    categories.push(category);
    console.log(`  ✅ ${category.name}`);
  }

  // Create Tags
  console.log("\n🏷️  Creating tags...");
  const tags = [];
  for (const tagName of COMMON_TAGS) {
    const tag = await prisma.tag.create({
      data: {
        name: tagName,
        slug: tagName.toLowerCase().replace(/\s+/g, "-"),
      },
    });
    tags.push(tag);
  }
  console.log(`  ✅ Created ${tags.length} tags`);

  // Helper to get category by slug
  const getCategoryBySlug = (slug: string) =>
    categories.find((c) => c.slug === slug);

  // Helper to get random tags
  const getRandomTags = (count: number = 3) => {
    const shuffled = [...tags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Create Users and Streams
  console.log("\n👥 Creating users and streams...");

  const streamers = [
    // LIVE - FPS Gaming
    {
      user: {
        username: "ShadowNinja92",
        externalUserId: "user_2kX9mLpQw3rY8sN4vB7",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ShadowNinja",
        bio: "Pro FPS player | Former esports champion | Streaming competitive gameplay daily 🎯",
      },
      stream: {
        name: "🔥 RANKED GRIND - Road to Radiant",
        thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop",
        isLive: true,
        categorySlug: "valorant",
        viewerCount: 15234,
        tags: ["English", "Competitive", "Pro Player"],
      },
    },
    {
      user: {
        username: "ProShooter_Alex",
        externalUserId: "user_7kX9mLpQw3rY8sN4vB2",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProShooter",
        bio: "CS:GO veteran with 10k hours | Teaching tactics and strategies 🎮",
      },
      stream: {
        name: "FACEIT Level 10 Grind | !sensitivity !crosshair",
        thumbnailUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&h=1080&fit=crop",
        isLive: true,
        categorySlug: "counter-strike",
        viewerCount: 8942,
        tags: ["English", "Educational", "High Skill"],
      },
    },

    // LIVE - Creative
    {
      user: {
        username: "ArtByLuna",
        externalUserId: "user_9mLpQw3rY8sN4vB7kX2",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArtByLuna",
        bio: "Digital artist | Character design & illustration | Commissions open 🎨",
      },
      stream: {
        name: "Painting Fantasy Characters - Chill Stream",
        thumbnailUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&h=1080&fit=crop",
        isLive: true,
        categorySlug: "art",
        viewerCount: 3456,
        tags: ["English", "Relaxing", "Creative"],
      },
    },

    // LIVE - Just Chatting
    {
      user: {
        username: "ChillWithSarah",
        externalUserId: "user_8sN4vB7kX9mLpQw3rY5",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChillSarah",
        bio: "Just chatting about life, travel, and random topics | Coffee enthusiast ☕",
      },
      stream: {
        name: "Morning Coffee Chat ☕ Let's Talk!",
        thumbnailUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&h=1080&fit=crop",
        isLive: true,
        categorySlug: "just-chatting",
        viewerCount: 12789,
        tags: ["English", "Casual", "Relaxing"],
      },
    },

    // LIVE - Music
    {
      user: {
        username: "DJSpinMaster",
        externalUserId: "user_5vB7kX9mLpQw3rY8sN4",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=DJSpin",
        bio: "Professional DJ | House & EDM mixes | Weekend party vibes 🎉",
      },
      stream: {
        name: "🔊 LIVE DJ SET - House Music Marathon",
        thumbnailUrl: "https://images.unsplash.com/photo-1571266028243-d220c3f2e6c4?w=1920&h=1080&fit=crop",
        isLive: true,
        categorySlug: "music",
        viewerCount: 5621,
        tags: ["English", "Relaxing"],
      },
    },

    // OFFLINE Streamers
    {
      user: {
        username: "QueenGamer",
        externalUserId: "user_8sN4vB7kX9mLpQw3rY2",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=QueenGamer",
        bio: "Variety gaming streamer | RPG lover | Let's explore new worlds together! ✨",
      },
      stream: {
        name: "First Playthrough - New RPG Adventure!",
        thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop",
        isLive: false,
        categorySlug: "gaming",
        viewerCount: 0,
        tags: ["English", "First Playthrough", "Casual"],
      },
    },
    {
      user: {
        username: "TechNerd_Mike",
        externalUserId: "user_3rY2kX9mLpQw8sN4vB7",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechNerd",
        bio: "Software engineer streaming game dev and coding projects 💻",
      },
      stream: {
        name: "Building a Game Engine from Scratch - Day 12",
        thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop",
        isLive: false,
        categorySlug: "programming",
        viewerCount: 0,
        tags: ["English", "Educational", "Tutorial"],
      },
    },
    {
      user: {
        username: "HorrorGaming_Emma",
        externalUserId: "user_6vB7kX9mLpQw3rY8sN4",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=HorrorEmma",
        bio: "Horror game enthusiast | Jump scares guaranteed | Not for the faint-hearted 😱",
      },
      stream: {
        name: "Resident Evil Village - First Playthrough (Scared)",
        thumbnailUrl: "https://images.unsplash.com/photo-1614465304860-05af03984ff0?w=1920&h=1080&fit=crop",
        isLive: false,
        categorySlug: "horror",
        viewerCount: 0,
        tags: ["English", "First Playthrough", "Funny"],
      },
    },
    {
      user: {
        username: "RetroGamer_Tom",
        externalUserId: "user_5kX9mLpQw3rY8sN4vB3",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=RetroTom",
        bio: "Speedrunner | Retro games from the 90s | World record attempts 🕹️",
      },
      stream: {
        name: "Super Mario 64 - 120 Star Speedrun Practice",
        thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080&fit=crop",
        isLive: false,
        categorySlug: "retro-gaming",
        viewerCount: 0,
        tags: ["English", "Speedrun", "High Skill"],
      },
    },
    {
      user: {
        username: "StrategyMaster_Chris",
        externalUserId: "user_1mLpQw3rY8sN4vB7kX9",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=StrategyChris",
        bio: "Grand strategy games | Building empires one turn at a time 👑",
      },
      stream: {
        name: "Civilization VI - Domination Victory Attempt",
        thumbnailUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop",
        isLive: false,
        categorySlug: "strategy",
        viewerCount: 0,
        tags: ["English", "Single Player", "Casual"],
      },
    },
    {
      user: {
        username: "MusicMaestro_Jay",
        externalUserId: "user_4vB7kX9mLpQw3rY8sN2",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=MusicMaestro",
        bio: "Music producer & DJ | Live mixing sessions | Request your favorite tracks! 🎵",
      },
      stream: {
        name: "🎧 Late Night Lofi Beats & Chill Vibes",
        thumbnailUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920&h=1080&fit=crop",
        isLive: false,
        categorySlug: "music",
        viewerCount: 0,
        tags: ["English", "Relaxing"],
      },
    },
    {
      user: {
        username: "FitnessCoach_Dan",
        externalUserId: "user_2kX9mLpQw3rY8sN4vB9",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=FitnessDan",
        bio: "Certified personal trainer | Home workout sessions | Let's get fit together! 💪",
      },
      stream: {
        name: "30-Minute Full Body Workout | No Equipment Needed",
        thumbnailUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop",
        isLive: false,
        categorySlug: "fitness-health",
        viewerCount: 0,
        tags: ["English", "Tutorial", "Beginner Friendly"],
      },
    },
    {
      user: {
        username: "ESports_Captain",
        externalUserId: "user_7kX9mLpQw3rY8sN4vB8",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ESportsCaptain",
        bio: "Team captain & coach | Analyzing pro matches | Competitive insights 🏆",
      },
      stream: {
        name: "Pro Match Review - Breaking Down Top Plays",
        thumbnailUrl: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=1920&h=1080&fit=crop",
        isLive: false,
        categorySlug: "gaming",
        viewerCount: 0,
        tags: ["English", "Educational", "Competitive"],
      },
    },
    {
      user: {
        username: "CookingWithOlivia",
        externalUserId: "user_3rY8sN4vB7kX9mLpQw2",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=CookingOlivia",
        bio: "Home chef sharing easy recipes | Cooking streams every weekend 🍳",
      },
      stream: {
        name: "Making Homemade Pasta from Scratch!",
        thumbnailUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&h=1080&fit=crop",
        isLive: false,
        categorySlug: "cooking",
        viewerCount: 0,
        tags: ["English", "Tutorial", "Beginner Friendly"],
      },
    },
    {
      user: {
        username: "TravelVlogger_Max",
        externalUserId: "user_4sN4vB7kX9mLpQw3rY8",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=TravelMax",
        bio: "Exploring the world one city at a time | IRL travel streams 🌍",
      },
      stream: {
        name: "Walking Tour: Tokyo Street Food at Night",
        thumbnailUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&h=1080&fit=crop",
        isLive: false,
        categorySlug: "travel-outdoors",
        viewerCount: 0,
        tags: ["English", "Casual"],
      },
    },
    {
      user: {
        username: "AnimeFan_Yuki",
        externalUserId: "user_9kX9mLpQw3rY8sN4vB7",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnimeYuki",
        bio: "Anime discussions & watch-along streams | Manga reviews 📚",
      },
      stream: {
        name: "Watching New Anime Season - First Episode Reactions",
        thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=1080&fit=crop",
        isLive: false,
        categorySlug: "anime-manga",
        viewerCount: 0,
        tags: ["English", "Casual", "Funny"],
      },
    },
  ];

  for (const { user: userData, stream: streamData } of streamers) {
    const category = getCategoryBySlug(streamData.categorySlug);
    const streamTags = streamData.tags.map((tagName) =>
      tags.find((t) => t.name === tagName)
    ).filter(Boolean);

    const user = await prisma.user.create({
      data: {
        ...userData,
        stream: {
          create: {
            name: streamData.name,
            thumbnailUrl: streamData.thumbnailUrl,
            isLive: streamData.isLive,
            viewerCount: streamData.viewerCount,
            categoryId: category!.id,
            tags: {
              create: streamTags.map((tag) => ({
                tagId: tag!.id,
              })),
            },
          },
        },
      },
    });

    const status = streamData.isLive
      ? `🔴 LIVE (${streamData.viewerCount.toLocaleString()} viewers)`
      : "⚫ OFFLINE";
    console.log(`  ✅ ${user.username} - ${category?.name} ${status}`);
  }

  // Create follow relationships
  console.log("\n👥 Creating follow relationships...");
  const allUsers = await prisma.user.findMany();
  const followPairs = [
    ["ShadowNinja92", "ProShooter_Alex"],
    ["ShadowNinja92", "ESports_Captain"],
    ["QueenGamer", "HorrorGaming_Emma"],
    ["QueenGamer", "RetroGamer_Tom"],
    ["ArtByLuna", "MusicMaestro_Jay"],
    ["ChillWithSarah", "CookingWithOlivia"],
    ["FitnessCoach_Dan", "ChillWithSarah"],
    ["TechNerd_Mike", "StrategyMaster_Chris"],
    ["AnimeFan_Yuki", "QueenGamer"],
    ["DJSpinMaster", "MusicMaestro_Jay"],
  ];

  for (const [followerName, followingName] of followPairs) {
    const follower = allUsers.find((u) => u.username === followerName);
    const following = allUsers.find((u) => u.username === followingName);

    if (follower && following) {
      await prisma.follow.create({
        data: {
          followerId: follower.id,
          followingId: following.id,
        },
      });
      console.log(`  ${followerName} → ${followingName}`);
    }
  }

  const liveCount = streamers.filter((s) => s.stream.isLive).length;
  const offlineCount = streamers.filter((s) => !s.stream.isLive).length;

  console.log("\n🎉 Seed completed successfully!");
  console.log(`📁 ${categories.length} categories`);
  console.log(`🏷️  ${tags.length} tags`);
  console.log(`👥 ${streamers.length} streamers`);
  console.log(`🔴 ${liveCount} LIVE`);
  console.log(`⚫ ${offlineCount} OFFLINE`);
  console.log(`🔗 ${followPairs.length} follows`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
