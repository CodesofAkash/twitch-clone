import { Suspense } from "react";
import { searchStreams, SearchFilters } from "@/lib/search-service";
import { getAllCategories } from "@/lib/category-service";
import { SearchResults } from "./_components/search-results";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchPageProps {
  searchParams: Promise<{
    term?: string;
    category?: string;
    tag?: string;
    live?: string;
    sort?: string;
  }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;

  const filters: SearchFilters = {
    term: params.term,
    categorySlug: params.category,
    tag: params.tag,
    liveOnly: params.live === "true",
    sortBy: (params.sort as "viewers" | "recent") || "viewers",
  };

  const [results, categories] = await Promise.all([
    searchStreams(filters),
    getAllCategories(),
  ]);

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<Skeleton className="h-10 w-full mb-6" />}>
        <SearchResults
          initialResults={results}
          initialFilters={filters}
          categories={categories}
        />
      </Suspense>
    </div>
  );
};

export default SearchPage;