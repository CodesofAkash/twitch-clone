import { getStreams } from "@/lib/feed-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

export const Results = async () => {
  const data = await getStreams();

  // Separate live and offline streams
  const liveStreams = data.filter((result) => result.isLive);
  const offlineStreams = data.filter((result) => !result.isLive);

  return (
    <div>
      {/* Live Channels Section */}
      {liveStreams.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Live Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {liveStreams.map((result) => (
              <ResultCard key={result.id} data={result} />
            ))}
          </div>
        </div>
      )}

      {/* Offline/Recommended Section */}
      {offlineStreams.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {liveStreams.length > 0 ? "Recommended Channels" : "All Channels"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {offlineStreams.map((result) => (
              <ResultCard key={result.id} data={result} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center text-muted-foreground mt-10">
          <h3 className="text-xl mb-2">No streams found</h3>
          <p>Check back later for live streams!</p>
        </div>
      )}
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
