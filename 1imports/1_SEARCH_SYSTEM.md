# PART 1: SEARCH SYSTEM - Complete Implementation

Copy each file exactly as shown. All files are complete and ready to use.

---

## FILE 1: lib/search-service.ts (REPLACE ENTIRE FILE)

```typescript
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export interface SearchFilters {
  term?: string;
  categorySlug?: string;
  tag?: string;
  liveOnly?: boolean;
  sortBy?: "viewers" | "recent";
}

export const searchStreams = async (filters: SearchFilters) => {
  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  const whereConditions: any = {
    ...(userId && {
      user: { NOT: { blocking: { some: { blockedId: userId } } } },
    }),
  };

  if (filters.categorySlug) {
    whereConditions.category = { slug: filters.categorySlug };
  }

  if (filters.tag) {
    whereConditions.tags = {
      some: { tag: { slug: filters.tag.toLowerCase().replace(/\s+/g, "-") } },
    };
  }

  if (filters.liveOnly) {
    whereConditions.isLive = true;
  }

  if (filters.term) {
    whereConditions.OR = [
      { name: { contains: filters.term, mode: "insensitive" as const } },
      { user: { username: { contains: filters.term, mode: "insensitive" as const } } },
    ];
  }

  let orderBy: any = [{ isLive: "desc" }];
  if (filters.sortBy === "viewers") {
    orderBy.push({ viewerCount: "desc" });
  } else {
    orderBy.push({ updatedAt: "desc" });
  }

  const streams = await db.stream.findMany({
    where: whereConditions,
    select: {
      id: true,
      user: true,
      isLive: true,
      name: true,
      thumbnailUrl: true,
      updatedAt: true,
      viewerCount: true,
      category: { select: { name: true, slug: true } },
      tags: {
        select: { tag: { select: { name: true, slug: true } } },
        take: 5,
      },
    },
    orderBy,
    take: 100,
  });

  return streams.map((stream) => ({
    ...stream,
    categoryName: stream.category?.name || null,
    categorySlug: stream.category?.slug || null,
    tagNames: stream.tags.map((t) => t.tag.name),
    tagSlugs: stream.tags.map((t) => t.tag.slug),
    category: undefined,
    tags: undefined,
  }));
};
```

---

## FILE 2: app/search/page.tsx (CREATE NEW FILE)

```typescript
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
```

---

## FILE 3: app/search/_components/search-results.tsx (CREATE NEW FILE)

```typescript
"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Category } from "@prisma/client";
import { SearchFilters as SearchFiltersType } from "@/lib/search-service";
import { SearchFilters } from "./search-filters";
import { ResultCard } from "@/app/(browse)/(home)/_components/result-card";
import { Skeleton } from "@/components/ui/skeleton";

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
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Client-side state for filters
  const [liveOnly, setLiveOnly] = useState(initialFilters.liveOnly || false);
  const [sortBy, setSortBy] = useState<"viewers" | "recent">(
    initialFilters.sortBy || "viewers"
  );

  // Client-side filtering
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

  return (
    <div>
      <SearchFilters
        categories={categories}
        currentCategory={initialFilters.categorySlug}
        currentTag={initialFilters.tag}
        liveOnly={liveOnly}
        sortBy={sortBy}
        onCategoryChange={handleCategoryChange}
        onClearTag={handleClearTag}
        onLiveOnlyChange={setLiveOnly}
        onSortChange={setSortBy}
        isPending={isPending}
      />

      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          {initialFilters.term && `Results for "${initialFilters.term}"`}
          {initialFilters.tag && ` • Tag: ${initialFilters.tag}`}
          {initialFilters.categorySlug && !initialFilters.term && "Results"}
          {!initialFilters.term && !initialFilters.tag && !initialFilters.categorySlug && "All Streams"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {filteredResults.length} {filteredResults.length === 1 ? "result" : "results"} found
        </p>
      </div>

      {filteredResults.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No streams found matching your criteria.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {filteredResults.map((result) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
};

export const SearchResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-10 w-full mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-video rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## FILE 4: app/search/_components/search-filters.tsx (CREATE NEW FILE)

```typescript
"use client";

import { X } from "lucide-react";
import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SearchFiltersProps {
  categories: Category[];
  currentCategory?: string | null;
  currentTag?: string | null;
  liveOnly: boolean;
  sortBy: "viewers" | "recent";
  onCategoryChange: (categorySlug: string | null) => void;
  onClearTag: () => void;
  onLiveOnlyChange: (value: boolean) => void;
  onSortChange: (value: "viewers" | "recent") => void;
  isPending: boolean;
}

export const SearchFilters = ({
  categories,
  currentCategory,
  currentTag,
  liveOnly,
  sortBy,
  onCategoryChange,
  onClearTag,
  onLiveOnlyChange,
  onSortChange,
  isPending,
}: SearchFiltersProps) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Category Filter (Server-side) */}
        <Select
          value={currentCategory || "all"}
          onValueChange={(value) => onCategoryChange(value === "all" ? null : value)}
          disabled={isPending}
        >
          <SelectTrigger className="lg:w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort (Client-side) */}
        <Select value={sortBy} onValueChange={(val: any) => onSortChange(val)}>
          <SelectTrigger className="lg:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="viewers">Most Viewers</SelectItem>
            <SelectItem value="recent">Recently Updated</SelectItem>
          </SelectContent>
        </Select>

        {/* Live Only (Client-side) */}
        <div className="flex items-center space-x-2">
          <Switch
            id="live-only"
            checked={liveOnly}
            onCheckedChange={onLiveOnlyChange}
          />
          <Label htmlFor="live-only" className="cursor-pointer">
            Live only
          </Label>
        </div>
      </div>

      {/* Active Tag Badge */}
      {currentTag && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active tag:</span>
          <Button
            variant="secondary"
            size="sm"
            onClick={onClearTag}
            disabled={isPending}
            className="gap-1"
          >
            {currentTag}
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};
```

---

## ✅ SEARCH SYSTEM COMPLETE

Next: Download `2_HOME_IMPROVEMENTS.md` for clickable tags and show more features.
