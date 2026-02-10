"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { getStreams } from "@/lib/feed-service";

interface LiveChannelsProps {
  data: Awaited<ReturnType<typeof getStreams>>;
}

export const LiveChannels = ({ data }: LiveChannelsProps) => {
  const [showAll, setShowAll] = useState(false);

  const liveStreams = data.filter((stream) => stream.isLive);

  if (liveStreams.length === 0) {
    return null;
  }

  const displayStreams = showAll ? liveStreams : liveStreams.slice(0, 8);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Live Channels</h2>
        {liveStreams.length > 8 && (
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="text-sm"
          >
            {showAll ? "Show Less" : `Show All (${liveStreams.length})`}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {displayStreams.map((stream) => (
          <ResultCard key={stream.id} data={stream} />
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
        {[...Array(8)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};