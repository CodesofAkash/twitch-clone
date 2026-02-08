// app/(browse)/(home)/_components/live-channels.tsx
import Link from "next/link";
import { getStreams } from "@/lib/feed-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";

export const LiveChannels = async () => {
  const data = await getStreams();
  const liveStreams = data.filter((stream) => stream.isLive);

  if (liveStreams.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Live Channels</h2>
        {liveStreams.length > 5 && (
          <Link
            href="/search?filter=live"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Show more
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {liveStreams.slice(0, 10).map((result) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
};

export const LiveChannelsSkeleton = () => {
  return (
    <div>
      <div className="h-8 w-48 bg-muted rounded mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
