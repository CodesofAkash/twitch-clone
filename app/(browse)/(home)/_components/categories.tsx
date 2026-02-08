// app/(browse)/(home)/_components/categories.tsx
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  {
    name: "Just Chatting",
    thumbnail: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=800&fit=crop",
    viewers: "240K",
  },
  {
    name: "VALORANT",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=800&fit=crop",
    viewers: "74.3K",
  },
  {
    name: "Counter-Strike",
    thumbnail: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=800&fit=crop",
    viewers: "437K",
  },
  {
    name: "League of Legends",
    thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=800&fit=crop",
    viewers: "133K",
  },
  {
    name: "Minecraft",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop",
    viewers: "30.9K",
  },
  {
    name: "Art",
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=800&fit=crop",
    viewers: "41.3K",
  },
  {
    name: "Music",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=800&fit=crop",
    viewers: "16K",
  },
  {
    name: "Cooking",
    thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=800&fit=crop",
    viewers: "95.4K",
  },
];

export const Categories = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Link
          href="/search"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          Browse all
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/search?category=${category.name.toLowerCase()}`}
            className="group"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
              <Image
                src={category.thumbnail}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <p className="font-semibold truncate group-hover:text-primary">
                {category.name}
              </p>
              <p className="text-sm text-muted-foreground">{category.viewers} viewers</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const CategoriesSkeleton = () => {
  return (
    <div>
      <div className="h-8 w-48 bg-muted rounded mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-[3/4] rounded-lg mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
};
