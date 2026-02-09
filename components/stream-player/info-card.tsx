"use client";

import { Pencil } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { InfoModal } from "./info-modal";

interface InfoCardProps {
  hostIdentity: string;
  viewerIdentity: string;
  name: string;
  thumbnailUrl: string | null;
  streamWithCategoryAndTags: any;
  categories: {
    id: string;
    name: string;
    isPredefined?: boolean;
  }[];
}

export const InfoCard = ({
  hostIdentity,
  viewerIdentity,
  name,
  thumbnailUrl,
  streamWithCategoryAndTags,
  categories,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;

  // Extract category and tags
  const categoryName = streamWithCategoryAndTags?.category?.name || null;
  const categoryId = streamWithCategoryAndTags?.categoryId || null;
  const tags = streamWithCategoryAndTags?.tags?.map((t: any) => t.tag.name) || [];

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit your stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximize your visibility
            </p>
          </div>
          {/* Pass all data to modal */}
          <InfoModal
            initialName={name}
            initialThumbnailUrl={thumbnailUrl}
            initialCategoryId={categoryId}
            initialTags={tags}
            categories={categories}
          />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Name</h3>
            <p className="text-sm font-semibold">{name}</p>
          </div>

          {/* Category Display */}
          {categoryName && (
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">Category</h3>
              <p className="text-sm font-semibold">{categoryName}</p>
            </div>
          )}

          {/* Tags Display */}
          {tags.length > 0 && (
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs bg-accent text-accent-foreground px-2.5 py-1 rounded-md font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Thumbnail</h3>
            {thumbnailUrl && (
              <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                <Image
                  fill
                  src={thumbnailUrl}
                  alt={name}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
