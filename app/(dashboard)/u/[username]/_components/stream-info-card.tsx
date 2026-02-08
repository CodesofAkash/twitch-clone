"use client";

import { useState, useTransition, ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import Image from "next/image";

import { updateStream, updateStreamCategory, updateStreamTags } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CategorySelector } from "@/components/category-selector";
import { TagInput } from "@/components/tag-input";
import { Category, Stream } from "@prisma/client";

interface StreamInfoCardProps {
  initialData: Stream & {
    category: Category | null;
    tags: { tag: { name: string } }[];
  };
  categories: Category[];
}

export const StreamInfoCard = ({
  initialData,
  categories,
}: StreamInfoCardProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const closeRef = useRef<ElementRef<"button">>(null);
  
  const [name, setName] = useState(initialData?.name || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [tags, setTags] = useState<string[]>(
    initialData?.tags?.map(t => t.tag.name) || []
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success("Stream updated");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onCategoryChange = (newCategoryId: string, categoryName: string) => {
    setCategoryId(newCategoryId);
    
    startTransition(() => {
      updateStreamCategory(newCategoryId)
        .then(() => {
          toast.success(`Category set to ${categoryName}`);
          router.refresh();
        })
        .catch(() => toast.error("Failed to update category"));
    });
  };

  const onTagsChange = (newTags: string[]) => {
    setTags(newTags);
    
    startTransition(() => {
      updateStreamTags(newTags)
        .then(() => {
          toast.success("Tags updated");
          router.refresh();
        })
        .catch(() => toast.error("Failed to update tags"));
    });
  };

  const onChange = (thumbnailUrl?: string) => {
    startTransition(() => {
      updateStream({ thumbnailUrl })
        .then(() => {
          toast.success("Thumbnail updated");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="bg-background">
      <div className="rounded-xl bg-muted p-6">
        <div className="flex items-center gap-x-2.5 mb-4">
          <div className="rounded-md bg-primary p-2 h-auto w-auto">
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximize your visibility
            </p>
          </div>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label>Name</Label>
            <Input
              placeholder="Stream name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              disabled={isPending}
            />
          </div>

          <div>
            <Label>Category</Label>
            <CategorySelector
              categories={categories}
              value={categoryId}
              onChange={onCategoryChange}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Can&apos;t find your category? Type to create a custom one.
            </p>
          </div>

          <div>
            <Label>Tags</Label>
            <TagInput
              value={tags}
              onChange={onTagsChange}
              maxTags={5}
              placeholder="e.g., English, Competitive, Tutorial"
            />
          </div>

          <div>
            <Label>Thumbnail</Label>
            {initialData?.thumbnailUrl && (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 mb-4">
                <Image
                  fill
                  alt="Thumbnail"
                  src={initialData.thumbnailUrl}
                  className="object-cover"
                />
              </div>
            )}
            <div className="rounded-xl border outline-dashed outline-muted">
              <UploadDropzone
                endpoint="thumbnailUploader"
                appearance={{
                  label: {
                    color: "#FFFFFF",
                  },
                  allowedContent: {
                    color: "#FFFFFF",
                  },
                }}
                onClientUploadComplete={(res) => {
                  onChange(res?.[0]?.url);
                  router.refresh();
                }}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              disabled={isPending}
              type="button"
              variant="ghost"
              ref={closeRef}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              variant="primary"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const StreamInfoCardSkeleton = () => {
  return (
    <div className="bg-background">
      <div className="rounded-xl bg-muted p-6">
        <Skeleton className="h-10 w-[200px]" />
        <div className="space-y-4 mt-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="aspect-video rounded-xl" />
        </div>
      </div>
    </div>
  );
};