// app/(browse)/(home)/_components/featured-carousel.tsx - COMPLETE REWRITE
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
    
    setTimeout(() => setIsTransitioning(false), 700); // Match transition duration
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
    }, 7000); // 7 seconds per slide

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
          {/* Image with smooth transition */}
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
              unoptimized
            />
          </div>
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
          
          {/* Content with fade transition */}
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

      {/* Navigation Buttons */}
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

      {/* Dots Indicator */}
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
