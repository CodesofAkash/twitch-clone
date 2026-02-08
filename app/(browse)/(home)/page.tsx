import { Suspense } from "react";
import { FeaturedCarousel, FeaturedCarouselSkeleton } from "./_components/featured-carousel";
import { LiveChannels, LiveChannelsSkeleton } from "./_components/live-channels";
import { Categories, CategoriesSkeleton } from "./_components/categories";
import { RecommendedChannels, RecommendedChannelsSkeleton } from "./_components/recommended-channels";

export default function Home() {
  return (
    <div className="h-full">
      {/* Featured Carousel */}
      <Suspense fallback={<FeaturedCarouselSkeleton />}>
        <FeaturedCarousel />
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
