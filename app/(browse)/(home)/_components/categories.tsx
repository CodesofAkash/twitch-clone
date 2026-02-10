import { SafeImage } from "@/components/safe-image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategoriesWithStats } from "@/lib/category-service";

export const Categories = async () => {
  // Fetch categories from database with live viewer counts
  const categories = await getCategoriesWithStats();

  // Only show categories that have streams
  const activeCategories = categories.filter((cat) => cat.streamCount > 0);

  // Sort by viewer count and take top 8
  const topCategories = activeCategories
    .sort((a, b) => b.viewerCount - a.viewerCount)
    .slice(0, 8);

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
        {topCategories.map((category) => (
          <Link
            key={category.id}
            href={`/search?category=${category.slug}`}
            className="group"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
              <SafeImage
                src={category.imageUrl}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                unoptimized
              />
            </div>
            <div>
              <p className="font-semibold truncate group-hover:text-primary">
                {category.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {category.viewerCount > 0
                  ? `${category.viewerCount.toLocaleString()} viewers`
                  : `${category.streamCount} ${category.streamCount === 1 ? "channel" : "channels"}`
                }
              </p>
            </div>
          </Link>
        ))}
      </div>

      {topCategories.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No active categories right now
        </p>
      )}
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
