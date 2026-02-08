# PART 1: FOUNDATION & IMMEDIATE FIXES

## FILE 1: Updated Recommended Service (Sidebar - Live First)

**Path**: `lib/recommended-service.ts`

```typescript
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          { id: { not: userId } },
          {
            followers: {
              none: {
                followerId: userId,
              },
            },
          },
          {
            blocking: {
              none: {
                blockedId: userId,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        imageUrl: true,
        stream: {
          select: {
            id: true,
            isLive: true,
            viewerCount: true,
          },
        },
      },
      orderBy: [
        {
          stream: {
            isLive: "desc", // LIVE USERS FIRST
          },
        },
        {
          stream: {
            viewerCount: "desc", // Then by viewer count
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  } else {
    users = await db.user.findMany({
      select: {
        id: true,
        username: true,
        imageUrl: true,
        stream: {
          select: {
            id: true,
            isLive: true,
            viewerCount: true,
          },
        },
      },
      orderBy: [
        {
          stream: {
            isLive: "desc", // LIVE USERS FIRST
          },
        },
        {
          stream: {
            viewerCount: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  }

  return users;
};
```

---

## FILE 2: Fixed Thumbnail Component

**Path**: `components/thumbnail.tsx`

```typescript
import Image from "next/image";
import { UserAvatar } from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { LiveBadge } from "@/components/live-badge";

interface ThumbnailProps {
  src: string | null;
  fallback: string;
  isLive: boolean;
  username: string;
}

export const Thumbnail = ({
  src,
  fallback,
  isLive,
  username,
}: ThumbnailProps) => {
  let content;

  if (!src) {
    content = (
      <div className="bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md">
        <UserAvatar
          size="lg"
          showBadge={false}
          username={username}
          imageUrl={fallback}
          isLive={false}
        />
      </div>
    );
  } else {
    content = (
      <Image
        src={src}
        fill
        alt={username}
        className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
        unoptimized // Prevents 404 errors with dynamic URLs
      />
    );
  }

  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <div className="rounded-md absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
      {content}
      {isLive && src && (
        <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
```

---

## FILE 3: Featured Carousel Wrapper (Server Component)

**Path**: `app/(browse)/(home)/_components/featured-carousel-wrapper.tsx`

```typescript
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
```

---

## FILE 4: Featured Carousel Client Component (Smooth Transitions)

**Path**: `app/(browse)/(home)/_components/featured-carousel.tsx`

```typescript
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LiveBadge } from "@/components/live-badge";

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
    
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning, streams.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning || streams.length === 0) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + streams.length) % streams.length);
    
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning, streams.length]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => setIsTransitioning(false), 700);
  };

  useEffect(() => {
    if (streams.length === 0) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 7000); // 7 seconds - longer wait

    return () => clearInterval(timer);
  }, [nextSlide, streams.length]);

  if (streams.length === 0) {
    return null;
  }

  const current = streams[currentIndex];

  return (
    <div className="relative h-[400px] w-full bg-gradient-to-b from-background to-transparent mb-8 overflow-hidden">
      <Link href={`/${current.username}`}>
        <div className="relative h-full w-full">
          <div className={`
            absolute inset-0 transition-opacity duration-700 ease-in-out
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}>
            <Image
              src={current.thumbnail}
              alt={current.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
              unoptimized
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
          
          <div className={`
            absolute bottom-0 left-0 p-8 max-w-2xl transition-all duration-700 ease-in-out
            ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          `}>
            {current.isLive && (
              <div className="mb-3">
                <LiveBadge />
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

      {streams.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-12 w-12 rounded-full transition-all"
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
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-12 w-12 rounded-full transition-all"
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
              className={`
                h-2 rounded-full transition-all duration-300
                ${index === currentIndex 
                  ? "w-8 bg-white" 
                  : "w-2 bg-white/50 hover:bg-white/75"
                }
              `}
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
    <div className="relative h-[400px] w-full bg-muted mb-8 rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
      <div className="absolute bottom-0 left-0 p-8 space-y-3">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-12 w-96" />
        <Skeleton className="h-6 w-64" />
      </div>
    </div>
  );
};
```

---

## FILE 5: Updated Homepage

**Path**: `app/(browse)/(home)/page.tsx`

```typescript
import { Suspense } from "react";
import { FeaturedCarousel, FeaturedCarouselSkeleton } from "./_components/featured-carousel-wrapper";
import { LiveChannels, LiveChannelsSkeleton } from "./_components/live-channels";
import { Categories, CategoriesSkeleton } from "./_components/categories";
import { RecommendedChannels, RecommendedChannelsSkeleton } from "./_components/recommended-channels";

export default function Home() {
  return (
    <div className="h-full">
      <Suspense fallback={<FeaturedCarouselSkeleton />}>
        <FeaturedCarousel />
      </Suspense>

      <div className="max-w-screen-2xl mx-auto px-8 space-y-8 pb-10">
        <Suspense fallback={<LiveChannelsSkeleton />}>
          <LiveChannels />
        </Suspense>

        <Suspense fallback={<CategoriesSkeleton />}>
          <Categories />
        </Suspense>

        <Suspense fallback={<RecommendedChannelsSkeleton />}>
          <RecommendedChannels />
        </Suspense>
      </div>
    </div>
  );
}
```

This completes the immediate fixes. Continue to next file...
