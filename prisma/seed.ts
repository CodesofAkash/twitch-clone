// prisma/seed.ts - UPDATED VERSION
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Realistic streamers with diverse categories
  // Only first 4 are LIVE, rest are OFFLINE
  const streamers = [
    // LIVE Gaming Streamers
    {
      username: "ShadowNinja92",
      externalUserId: "user_2kX9mLpQw3rY8sN4vB7",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ShadowNinja",
      bio: "Pro FPS player | Former esports champion | Streaming competitive gameplay daily 🎯",
      stream: {
        name: "🔥 RANKED GRIND - Road to Radiant",
        thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },
    {
      username: "ProShooter_Alex",
      externalUserId: "user_7kX9mLpQw3rY8sN4vB2",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProShooter",
      bio: "CS:GO veteran with 10k hours | Teaching tactics and strategies 🎮",
      stream: {
        name: "FACEIT Level 10 Grind | !sensitivity !crosshair",
        thumbnailUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },

    // LIVE Creative
    {
      username: "ArtByLuna",
      externalUserId: "user_9mLpQw3rY8sN4vB7kX2",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArtByLuna",
      bio: "Digital artist | Character design & illustration | Commissions open 🎨",
      stream: {
        name: "Painting Fantasy Characters - Chill Stream",
        thumbnailUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },

    // LIVE Just Chatting
    {
      username: "ChillWithSarah",
      externalUserId: "user_8sN4vB7kX9mLpQw3rY5",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChillSarah",
      bio: "Just chatting about life, travel, and random topics | Coffee enthusiast ☕",
      stream: {
        name: "Morning Coffee Chat ☕ Let's Talk!",
        thumbnailUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },

    // OFFLINE - Gaming
    {
      username: "QueenGamer",
      externalUserId: "user_8sN4vB7kX9mLpQw3rY2",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=QueenGamer",
      bio: "Variety gaming streamer | RPG lover | Let's explore new worlds together! ✨",
      stream: {
        name: "First Playthrough - New RPG Adventure!",
        thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },
    {
      username: "TechNerd_Mike",
      externalUserId: "user_3rY2kX9mLpQw8sN4vB7",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechNerd",
      bio: "Software engineer streaming game dev and coding projects 💻",
      stream: {
        name: "Building a Game Engine from Scratch - Day 12",
        thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },
    {
      username: "HorrorGaming_Emma",
      externalUserId: "user_6vB7kX9mLpQw3rY8sN4",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=HorrorEmma",
      bio: "Horror game enthusiast | Jump scares guaranteed | Not for the faint-hearted 😱",
      stream: {
        name: "Resident Evil Village - First Playthrough (Scared)",
        thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },
    {
      username: "RetroGamer_Tom",
      externalUserId: "user_5kX9mLpQw3rY8sN4vB3",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=RetroTom",
      bio: "Speedrunner | Retro games from the 90s | World record attempts 🕹️",
      stream: {
        name: "Super Mario 64 - 120 Star Speedrun Practice",
        thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },
    {
      username: "StrategyMaster_Chris",
      externalUserId: "user_1mLpQw3rY8sN4vB7kX9",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=StrategyChris",
      bio: "Grand strategy games | Building empires one turn at a time 👑",
      stream: {
        name: "Civilization VI - Domination Victory Attempt",
        thumbnailUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },

    // OFFLINE - Creative
    {
      username: "MusicMaestro_Jay",
      externalUserId: "user_4vB7kX9mLpQw3rY8sN2",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=MusicMaestro",
      bio: "Music producer & DJ | Live mixing sessions | Request your favorite tracks! 🎵",
      stream: {
        name: "🎧 Late Night Lofi Beats & Chill Vibes",
        thumbnailUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },
    {
      username: "DJSpinMaster",
      externalUserId: "user_5vB7kX9mLpQw3rY8sN4",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=DJSpin",
      bio: "Professional DJ | House & EDM mixes | Weekend party vibes 🎉",
      stream: {
        name: "🔊 LIVE DJ SET - House Music Marathon",
        thumbnailUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },

    // OFFLINE - IRL/Other
    {
      username: "FitnessCoach_Dan",
      externalUserId: "user_2kX9mLpQw3rY8sN4vB9",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=FitnessDan",
      bio: "Certified personal trainer | Home workout sessions | Let's get fit together! 💪",
      stream: {
        name: "30-Minute Full Body Workout | No Equipment Needed",
        thumbnailUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },
    {
      username: "ESports_Captain",
      externalUserId: "user_7kX9mLpQw3rY8sN4vB8",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ESportsCaptain",
      bio: "Team captain & coach | Analyzing pro matches | Competitive insights 🏆",
      stream: {
        name: "Pro Match Review - Breaking Down Top Plays",
        thumbnailUrl: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },
    {
      username: "CookingWithOlivia",
      externalUserId: "user_3rY8sN4vB7kX9mLpQw2",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=CookingOlivia",
      bio: "Home chef sharing easy recipes | Cooking streams every weekend 🍳",
      stream: {
        name: "Making Homemade Pasta from Scratch!",
        thumbnailUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },
    {
      username: "TravelVlogger_Max",
      externalUserId: "user_4sN4vB7kX9mLpQw3rY8",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=TravelMax",
      bio: "Exploring the world one city at a time | IRL travel streams 🌍",
      stream: {
        name: "Walking Tour: Tokyo Street Food at Night",
        thumbnailUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },
    {
      username: "AnimeFan_Yuki",
      externalUserId: "user_9kX9mLpQw3rY8sN4vB7",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnimeYuki",
      bio: "Anime discussions & watch-along streams | Manga reviews 📚",
      stream: {
        name: "Watching New Anime Season - First Episode Reactions",
        thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=1080&fit=crop",
        isLive: false, // OFFLINE
      },
    },
  ];

  // Delete all existing users first (for clean re-seed)
  await prisma.follow.deleteMany({});
  await prisma.block.deleteMany({});
  await prisma.stream.deleteMany({});
  await prisma.user.deleteMany({});
  
  console.log("🗑️  Cleared existing data");

  // Create users with streams
  for (const streamerData of streamers) {
    const { stream, ...userData } = streamerData;
    
    const user = await prisma.user.create({
      data: {
        ...userData,
        stream: {
          create: stream,
        },
      },
    });

    const status = stream.isLive ? "🔴 LIVE" : "⚫ OFFLINE";
    console.log(`✅ Created: ${user.username} ${status}`);
  }

  // Create realistic follow relationships
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
    const follower = allUsers.find(u => u.username === followerName);
    const following = allUsers.find(u => u.username === followingName);

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

  const liveCount = streamers.filter(s => s.stream.isLive).length;
  const offlineCount = streamers.filter(s => !s.stream.isLive).length;

  console.log("\n🎉 Seed completed successfully!");
  console.log(`📊 Created ${streamers.length} streamers`);
  console.log(`🔴 ${liveCount} LIVE streamers`);
  console.log(`⚫ ${offlineCount} OFFLINE streamers`);
  console.log(`🔗 Created ${followPairs.length} follow relationships`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
