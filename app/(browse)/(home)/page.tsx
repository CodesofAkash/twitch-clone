import { Suspense } from "react";
import { FeaturedCarousel, FeaturedCarouselSkeleton } from "./_components/featured-carousel";
import { LiveChannels, LiveChannelsSkeleton } from "./_components/live-channels";
import { Categories, CategoriesSkeleton } from "./_components/categories";
import { RecommendedChannels, RecommendedChannelsSkeleton } from "./_components/recommended-channels";

interface FeaturedStream {
  username: string;
  title: string;
  thumbnail: string;
  category: string;
  viewerCount: number;
  isLive: boolean;
}

export default function Home() {

  const streams = [
    {
      username: "gamer123",
      title: "Epic Gameplay!",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
      category: "Gaming",
      viewerCount: 1200,
      isLive: true,
    },
    {
      username: "artist456",
      title: "Live Art Creation",
      thumbnail: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=450&fit=crop",
      category: "Art",
      viewerCount: 800,
      isLive: true,
    },
    {
      username: "coder789",
      title: "Coding Session",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop",
      category: "Programming",
      viewerCount: 500,
      isLive: true,
    },
    {
      username: "chef101",
      title: "Cooking Show",
      thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=450&fit=crop",
      category: "Cooking",
      viewerCount: 300,
      isLive: true,
    },
    {
      username: "musician202",
      title: "Live Music Performance",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=450&fit=crop",
      category: "Music",
      viewerCount: 1500,
      isLive: true,
    }
  ] as FeaturedStream[];

  return (
    <div className="h-full">
      {/* Featured Carousel */}
      <Suspense fallback={<FeaturedCarouselSkeleton />}>
        <FeaturedCarousel streams={streams} />
      </Suspense>

      <div className="max-w-screen-2xl mx-auto px-8 space-y-8 pb-10">
        {/* Live Channels */}
        <Suspense fallback={<LiveChannelsSkeleton />}>
          <LiveChannels />
        </Suspense>

        {/* Categories */}
        <Suspense fallback={<CategoriesSkeleton />}>
          <Categories />
        </Suspense>

        {/* Recommended Channels */}
        <Suspense fallback={<RecommendedChannelsSkeleton />}>
          <RecommendedChannels />
        </Suspense>
      </div>
    </div>
  );
}
