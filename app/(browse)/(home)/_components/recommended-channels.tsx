"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { getStreams } from "@/lib/feed-service";

interface RecommendedChannelsProps {
  data: Awaited<ReturnType<typeof getStreams>>;
}

export const RecommendedChannels = ({ data }: RecommendedChannelsProps) => {
  const [showAll, setShowAll] = useState(false);

  const offlineStreams = data.filter((stream) => !stream.isLive);

  if (offlineStreams.length === 0) {
    return null;
  }

  const displayStreams = showAll ? offlineStreams : offlineStreams.slice(0, 8);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Recommended Channels</h2>
        {offlineStreams.length > 8 && (
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="text-sm"
          >
            {showAll ? "Show Less" : `Show All (${offlineStreams.length})`}
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

export const RecommendedChannelsSkeleton = () => {
  return (
    <div>
      <div className="h-8 w-64 bg-muted rounded mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(8)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};