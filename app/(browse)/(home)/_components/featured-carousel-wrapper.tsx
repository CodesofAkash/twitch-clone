import { db } from "@/lib/db";
import { FeaturedCarousel as ClientCarousel, FeaturedCarouselSkeleton } from "./featured-carousel";

async function getFeaturedStreams() {
  // Get top 5 live streams by viewer count
  const liveStreams = await db.stream.findMany({
    where: { isLive: true },
    include: { 
      user: true,
      category: true 
    },
    orderBy: { viewerCount: "desc" },
    take: 5,
  });

  // If less than 5 live, fill with popular offline streams
  if (liveStreams.length < 5) {
    const neededCount = 5 - liveStreams.length;
    const offlineStreams = await db.stream.findMany({
      where: { isLive: false },
      include: { 
        user: true,
        category: true 
      },
      orderBy: { peakViewerCount: "desc" },
      take: neededCount,
    });

    const allStreams = [...liveStreams, ...offlineStreams];
    
    return allStreams.map((stream) => ({
      username: stream.user.username,
      title: stream.name,
      thumbnail: stream.thumbnailUrl || stream.user.imageUrl,
      category: stream.category?.name || "Just Chatting",
      viewerCount: stream.viewerCount,
      isLive: stream.isLive,
    }));
  }

  return liveStreams.map((stream) => ({
    username: stream.user.username,
    title: stream.name,
    thumbnail: stream.thumbnailUrl || stream.user.imageUrl,
    category: stream.category?.name || "Just Chatting",
    viewerCount: stream.viewerCount,
    isLive: stream.isLive,
  }));
}

export async function FeaturedCarousel() {
  const streams = await getFeaturedStreams();
  
  if (streams.length === 0) {
    return null;
  }

  return <ClientCarousel streams={streams} />;
}

export { FeaturedCarouselSkeleton };