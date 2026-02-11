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

  // 2 rows: 2×1(mobile), 2×2(md), 2×3(lg), 2×4(xl), 2×5(2xl) = ~10 items for 2 rows at largest breakpoint
  const itemsToShowInitially = 10;
  const displayStreams = showAll ? offlineStreams : offlineStreams.slice(0, itemsToShowInitially);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Recommended Channels</h2>
        {offlineStreams.length > itemsToShowInitially && (
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="text-sm"
          >
            {showAll ? "Show Less" : `Show More (${offlineStreams.length})`}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 gap-y-6">
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