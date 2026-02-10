import { Suspense } from "react";
import { Metadata } from "next";
import { searchStreams, SearchFilters } from "@/lib/search-service";
import { getAllCategories } from "@/lib/category-service";
import { SearchResults } from "./_components/search-results";
import { Skeleton } from "@/components/ui/skeleton";
import { contentConfig } from "@/lib/content-config";

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const searchTerm = params.term;
  const category = params.category;
  
  let title = "Search Streams | OpenStream";
  let description = "Search and discover live streams, channels, and content on OpenStream.";
  
  if (searchTerm) {
    title = `Search: ${searchTerm} | OpenStream`;
    description = `Search results for "${searchTerm}" - find live streams and channels.`;
  } else if (category) {
    title = `${category} Streams | OpenStream`;
    description = `Browse ${category} streams and channels on OpenStream.`;
  }
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${contentConfig.project.baseUrl}/search`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

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
    <main className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<Skeleton className="h-10 w-full mb-6" />}>
        <SearchResults
          initialResults={results}
          initialFilters={filters}
          categories={categories}
        />
      </Suspense>
    </main>
  );
};

export default SearchPage;