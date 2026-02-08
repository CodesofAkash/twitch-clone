import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Results, ResultsSkeleton } from "./_components/results";

interface SearchPageProps {
  searchParams: {
    term?: string;
    category?: string;
    live?: string;
    sort?: string;
  };
}

const SearchPage = async ({
  searchParams,
}: SearchPageProps) => {
  const params = await searchParams;

  if (!params.term && !params.category) {
    redirect("/");
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results 
          term={params.term}
          category={params.category}
          liveOnly={params.live === "true"}
          sortBy={params.sort as "viewers" | "recent" | undefined}
        />
      </Suspense>
    </div>
  );
};

export default SearchPage;