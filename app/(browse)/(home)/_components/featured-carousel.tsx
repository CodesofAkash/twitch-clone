// app/(browse)/(home)/_components/featured-carousel.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const featuredStreams = [
  {
    username: "ShadowNinja92",
    title: "🔥 RANKED GRIND - Road to Radiant",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop",
  },
  {
    username: "ProShooter_Alex",
    title: "FACEIT Level 10 Grind",
    thumbnail: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&h=1080&fit=crop",
  },
  {
    username: "ArtByLuna",
    title: "Painting Fantasy Characters - Chill Stream",
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&h=1080&fit=crop",
  },
];

export const FeaturedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredStreams.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredStreams.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredStreams.length) % featuredStreams.length);
  };

  const current = featuredStreams[currentIndex];

  return (
    <div className="relative h-[400px] w-full bg-gradient-to-b from-background to-transparent mb-8">
      <Link href={`/${current.username}`}>
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={current.thumbnail}
            alt={current.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
            <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold inline-block mb-2">
              LIVE
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">{current.title}</h2>
            <p className="text-white/80">{current.username}</p>
          </div>
        </div>
      </Link>

      {/* Navigation */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredStreams.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const FeaturedCarouselSkeleton = () => {
  return (
    <div className="relative h-[400px] w-full bg-muted mb-8">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
