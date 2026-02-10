import { Suspense } from "react";
import { FeaturedCarousel, FeaturedCarouselSkeleton } from "./_components/featured-carousel-wrapper";
import { LiveChannels, LiveChannelsSkeleton } from "./_components/live-channels";
import { Categories, CategoriesSkeleton } from "./_components/categories";
import { RecommendedChannels, RecommendedChannelsSkeleton } from "./_components/recommended-channels";
import { getStreams } from "@/lib/feed-service";
import { Footer } from "@/components/footer";

async function getHomeData() {
  const streams = await getStreams();
  return streams;
}

export default async function Home() {
  const streams = await getHomeData();

  return (
    <div className="h-full">
      <Suspense fallback={<FeaturedCarouselSkeleton />}>
        <FeaturedCarousel />
      </Suspense>

      <div className="max-w-screen-2xl mx-auto px-8 space-y-8 pb-10">
        <Suspense fallback={<LiveChannelsSkeleton />}>
          <LiveChannels data={streams} />
        </Suspense>

        <Suspense fallback={<CategoriesSkeleton />}>
          <Categories />
        </Suspense>

        <Suspense fallback={<RecommendedChannelsSkeleton />}>
          <RecommendedChannels data={streams} />
        </Suspense>
      </div>

      {/* Footer - ONLY on homepage */}
      <Footer />
    </div>
  );
}