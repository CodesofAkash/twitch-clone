# PART 2: HOME PAGE IMPROVEMENTS

Clickable tags, Show More buttons, Improved Carousel

---

## FILE 5: app/(browse)/(home)/_components/result-card.tsx (UPDATE)

```typescript
import Link from "next/link";
import { User } from "@prisma/client";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";

interface ResultCardProps {
  data: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    user: User;
    viewerCount: number;
    categoryName: string | null;
    categorySlug: string | null;
    tagNames: string[];
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="w-full space-y-3 group">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.username}
        />

        <div className="flex gap-x-3">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />

          <div className="flex flex-col text-sm overflow-hidden flex-1">
            <p className="truncate font-semibold hover:text-primary transition">
              {data.name}
            </p>

            <p className="text-muted-foreground text-sm">{data.user.username}</p>

            {data.categoryName && (
              <p className="text-xs text-muted-foreground truncate">
                {data.categoryName}
              </p>
            )}

            {data.isLive && data.viewerCount > 0 && (
              <p className="text-xs text-red-500 font-medium">
                {data.viewerCount.toLocaleString()} viewers
              </p>
            )}

            {/* CLICKABLE TAGS - Redirect to search */}
            {data.tagNames && data.tagNames.length > 0 && (
              <div className="flex gap-1 mt-1 flex-wrap" onClick={(e) => e.stopPropagation()}>
                {data.tagNames.slice(0, 2).map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?tag=${encodeURIComponent(tag)}`}
                    className="text-xs bg-accent text-accent-foreground px-1.5 py-0.5 rounded hover:bg-accent/80 transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full space-y-3">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
};
```

---

## FILE 6: app/(browse)/(home)/_components/live-channels.tsx (UPDATE - ADD SHOW MORE)

```typescript
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { getStreams } from "@/lib/feed-service";

interface LiveChannelsProps {
  data: Awaited<ReturnType<typeof getStreams>>;
}

export const LiveChannels = ({ data }: LiveChannelsProps) => {
  const [showAll, setShowAll] = useState(false);

  const liveStreams = data.filter((stream) => stream.isLive);

  if (liveStreams.length === 0) {
    return null;
  }

  const displayStreams = showAll ? liveStreams : liveStreams.slice(0, 8);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Live Channels</h2>
        {liveStreams.length > 8 && (
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="text-sm"
          >
            {showAll ? "Show Less" : `Show All (${liveStreams.length})`}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {displayStreams.map((stream) => (
          <ResultCard key={stream.id} data={stream} />
        ))}
      </div>
    </div>
  );
};

export const LiveChannelsSkeleton = () => {
  return (
    <div>
      <div className="h-8 w-48 bg-muted rounded mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(8)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
```

---

## FILE 7: app/(browse)/(home)/_components/recommended-channels.tsx (UPDATE - ADD SHOW MORE)

```typescript
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { getStreams } from "@/lib/feed-service";

interface RecommendedChannelsProps {
  data: Awaited<ReturnType<typeof getStreams>>;
}

export const RecommendedChannels = ({ data }: RecommendedChannelsProps) => {
  const [showAll, setShowAll] = useState(false);

  const offlineStreams = data.filter((stream) => !stream.isLive);

  if (offlineStreams.length === 0) {
    return null;
  }

  const displayStreams = showAll ? offlineStreams : offlineStreams.slice(0, 8);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Recommended Channels</h2>
        {offlineStreams.length > 8 && (
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="text-sm"
          >
            {showAll ? "Show Less" : `Show All (${offlineStreams.length})`}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {displayStreams.map((stream) => (
          <ResultCard key={stream.id} data={stream} />
        ))}
      </div>
    </div>
  );
};

export const RecommendedChannelsSkeleton = () => {
  return (
    <div>
      <div className="h-8 w-64 bg-muted rounded mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(8)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
```

---

## FILE 8: app/(browse)/(home)/_components/categories.tsx (ALREADY UPDATED FROM DB)

No changes needed - already fetches from database with "Browse all" link.

---

## FILE 9: app/(browse)/(home)/_components/featured-carousel.tsx (UPDATE - BETTER ANIMATION)

```typescript
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface FeaturedStream {
  username: string;
  title: string;
  thumbnail: string;
  category: string;
  viewerCount: number;
  isLive: boolean;
}

interface FeaturedCarouselProps {
  streams: FeaturedStream[];
}

export const FeaturedCarousel = ({ streams }: FeaturedCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning || streams.length === 0) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % streams.length);

    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, streams.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning || streams.length === 0) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + streams.length) % streams.length);

    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, streams.length]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);
    setCurrentIndex(index);

    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    if (streams.length === 0) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(timer);
  }, [nextSlide, streams.length]);

  if (streams.length === 0) {
    return null;
  }

  const current = streams[currentIndex];

  return (
    <div className="relative h-[400px] w-full bg-background mb-8 overflow-hidden rounded-xl">
      <Link href={`/${current.username}`}>
        <div className="relative h-full w-full">
          {/* Sliding Image Container */}
          <div className="relative h-full w-full overflow-hidden">
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {streams.map((stream, index) => (
                <div key={index} className="min-w-full h-full relative">
                  <Image
                    src={stream.thumbnail}
                    alt={stream.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="100vw"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
            {/* Compact LIVE Badge */}
            {current.isLive && (
              <div className="mb-3">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                  Live
                </span>
              </div>
            )}

            <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {current.title}
            </h2>

            <div className="flex items-center gap-3 text-white/90">
              <p className="font-semibold">{current.username}</p>
              <span>•</span>
              <p>{current.category}</p>
              {current.isLive && current.viewerCount > 0 && (
                <>
                  <span>•</span>
                  <p>{current.viewerCount.toLocaleString()} viewers</p>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Navigation Arrows */}
      {streams.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-12 w-12 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-12 w-12 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            disabled={isTransitioning}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}

      {/* Dots */}
      {streams.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {streams.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                goToSlide(index);
              }}
              disabled={isTransitioning}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FeaturedCarouselSkeleton = () => {
  return (
    <div className="relative h-[400px] w-full bg-muted mb-8 rounded-xl overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
```

---

## FILE 10: app/(browse)/(home)/page.tsx (UPDATE - Pass data to components)

```typescript
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
```

---

## ✅ HOME IMPROVEMENTS COMPLETE

Next: Download `3_FOOTER_AND_LEGAL.md` for footer and legal pages.
