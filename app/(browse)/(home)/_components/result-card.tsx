import Link from "next/link";
import { User } from "@prisma/client";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";

interface ResultCardProps {
  data: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    user: User;
    viewerCount: number;
    categoryName: string | null;
    categorySlug: string | null;
    tagNames: string[];
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="w-full space-y-3 group">
        {/* Thumbnail with live badge */}
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.username}
        />

        {/* Stream info */}
        <div className="flex gap-x-3">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />
          
          <div className="flex flex-col text-sm overflow-hidden flex-1">
            {/* Stream title */}
            <p className="truncate font-semibold hover:text-primary transition">
              {data.name}
            </p>
            
            {/* Username */}
            <p className="text-muted-foreground text-sm">
              {data.user.username}
            </p>
            
            {/* Category */}
            {data.categoryName && (
              <p className="text-xs text-muted-foreground truncate">
                {data.categoryName}
              </p>
            )}
            
            {/* Viewer count (only show if live) */}
            {data.isLive && data.viewerCount > 0 && (
              <p className="text-xs text-red-500 font-medium">
                {data.viewerCount.toLocaleString()} viewers
              </p>
            )}
            
            {/* Tags */}
            {data.tagNames && data.tagNames.length > 0 && (
              <div className="flex gap-1 mt-1 flex-wrap">
                {data.tagNames.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-accent text-accent-foreground px-1.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full space-y-3">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
};
