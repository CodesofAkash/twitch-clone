"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { Category } from "@prisma/client";
import { SearchFilters as SearchFiltersType } from "@/lib/search-service";
import { SearchFilters } from "./search-filters";
import { ResultCard } from "@/app/(browse)/(home)/_components/result-card";
import { Loader2 } from "lucide-react";

interface SearchResultsProps {
  initialResults: any[];
  initialFilters: SearchFiltersType;
  categories: Category[];
}

export const SearchResults = ({
  initialResults,
  initialFilters,
  categories,
}: SearchResultsProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [liveOnly, setLiveOnly] = useState(initialFilters.liveOnly || false);
  const [sortBy, setSortBy] = useState<"viewers" | "recent">(
    initialFilters.sortBy || "viewers"
  );

  let filteredResults = [...initialResults];

  if (liveOnly) {
    filteredResults = filteredResults.filter((r) => r.isLive);
  }

  filteredResults.sort((a, b) => {
    if (sortBy === "viewers") {
      return b.viewerCount - a.viewerCount;
    }
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const handleCategoryChange = (categorySlug: string | null) => {
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: {
          term: initialFilters.term,
          category: categorySlug || undefined,
          tag: initialFilters.tag,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    startTransition(() => {
      router.push(url);
    });
  };

  const handleTagSearch = (tag: string) => {
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: {
          term: initialFilters.term,
          category: initialFilters.categorySlug,
          tag,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    startTransition(() => {
      router.push(url);
    });
  };

  const handleClearTag = () => {
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: {
          term: initialFilters.term,
          category: initialFilters.categorySlug,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    startTransition(() => {
      router.push(url);
    });
  };

  const handleClearAll = () => {
    startTransition(() => {
      router.push("/search");
    });
  };

  return (
    <div>
      {isPending && (
        <div className="fixed top-4 right-4 z-50 bg-background border rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Searching...</span>
          </div>
        </div>
      )}

      <SearchFilters
        categories={categories}
        currentCategory={initialFilters.categorySlug}
        currentTag={initialFilters.tag}
        currentTerm={initialFilters.term}
        liveOnly={liveOnly}
        sortBy={sortBy}
        onCategoryChange={handleCategoryChange}
        onTagSearch={handleTagSearch}
        onClearTag={handleClearTag}
        onClearAll={handleClearAll}
        onLiveOnlyChange={setLiveOnly}
        onSortChange={setSortBy}
        isPending={isPending}
      />

      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          {initialFilters.term && `Results for "${initialFilters.term}"`}
          {initialFilters.tag && initialFilters.categorySlug && " • "}
          {initialFilters.tag && `Tag: ${initialFilters.tag}`}
          {initialFilters.categorySlug && !initialFilters.term && !initialFilters.tag && "Results"}
          {!initialFilters.term && !initialFilters.tag && !initialFilters.categorySlug && "All Streams"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {filteredResults.length} {filteredResults.length === 1 ? "result" : "results"} found
        </p>
      </div>

      {filteredResults.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            {initialFilters.tag 
              ? `No streams found with tag "${initialFilters.tag}"`
              : "No streams found matching your criteria."}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-8">
        {filteredResults.map((result) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
};