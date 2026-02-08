// app/(browse)/(home)/_components/recommended-channels.tsx
import { getStreams } from "@/lib/feed-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";

export const RecommendedChannels = async () => {
  const data = await getStreams();
  const offlineStreams = data.filter((stream) => !stream.isLive);

  if (offlineStreams.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recommended Channels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {offlineStreams.map((result) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
};

export const RecommendedChannelsSkeleton = () => {
  return (
    <div>
      <div className="h-8 w-64 bg-muted rounded mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
