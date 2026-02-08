import { getFilteredSearch } from "@/lib/search-service";
import { getAllCategories } from "@/lib/category-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { SearchFilters } from "./search-filters";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsProps {
  term?: string;
  category?: string;
  liveOnly?: boolean;
  sortBy?: "viewers" | "recent";
}

export const Results = async ({ 
  term, 
  category,
  liveOnly,
  sortBy = "viewers"
}: ResultsProps) => {
  const data = await getFilteredSearch({
    term,
    categorySlug: category,
    liveOnly,
    sortBy,
  });

  const categories = await getAllCategories();

  return (
    <div>
      <SearchFilters 
        initialTerm={term}
        initialCategory={category}
        initialLiveOnly={liveOnly}
        initialSort={sortBy}
        categories={categories}
      />

      <h2 className="text-lg font-semibold mb-4">
        {term ? `Results for "${term}"` : "All streams"}
        {category && " in category"}
        {liveOnly && " (Live only)"}
      </h2>

      {data.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No results found. Try different keywords or filters.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((result) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-10 w-full mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(12)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};