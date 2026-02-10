"use client";

import { useState, useTransition, useRef, ElementRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateStream, updateStreamCategory, updateStreamTags } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";
import { Hint } from "@/components/hint";
import { Trash } from "lucide-react";
import { SafeImage } from "@/components/safe-image";
import { CategorySelector } from "@/components/category-selector";
import { TagInput } from "@/components/tag-input";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
  initialCategoryId: string | null;
  initialTags: string[];
  categories: {
    id: string;
    name: string;
    isPredefined?: boolean;
  }[];
}

export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
  initialCategoryId,
  initialTags,
  categories = [],
}: InfoModalProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const [categoryId, setCategoryId] = useState(initialCategoryId || "");
  const [tags, setTags] = useState<string[]>(initialTags);

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success("Thumbnail removed");
          setThumbnailUrl("");
          router.refresh();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Normalize empty values for proper comparison
    const normalizedInitialCategory = initialCategoryId || "";
    const normalizedCategory = categoryId || "";

    // Check if anything actually changed
    const nameChanged = name.trim() !== initialName;
    const categoryChanged = normalizedCategory !== normalizedInitialCategory;
    const tagsChanged = JSON.stringify(tags.sort()) !== JSON.stringify(initialTags.sort());

    if (!nameChanged && !categoryChanged && !tagsChanged) {
      toast.info("No changes to save");
      return;
    }

    startTransition(async () => {
      try {
        const updatePromises = [];

        // Only update what changed
        if (nameChanged) {
          updatePromises.push(updateStream({ name: name.trim() }));
        }
        if (categoryChanged && normalizedCategory) {
          updatePromises.push(updateStreamCategory(normalizedCategory));
        }
        if (tagsChanged) {
          updatePromises.push(updateStreamTags(tags));
        }

        // Wait for all updates to complete
        await Promise.all(updatePromises);
        
        // Close modal first for better UX
        closeRef?.current?.click();
        
        // Refresh in background
        router.refresh();
        
        // Small delay to ensure refresh starts before showing toast
        await new Promise(resolve => setTimeout(resolve, 500));
        
        toast.success("Stream updated");
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              disabled={isPending}
              placeholder="Stream name"
              onChange={onChange}
              value={name}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <CategorySelector
              categories={categories}
              value={categoryId}
              onChange={(newCategoryId) => setCategoryId(newCategoryId)}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <TagInput value={tags} onChange={setTags} maxTags={5} />
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove thumbnail" asChild side="left">
                    <Button
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <SafeImage
                  alt="Thumbnail"
                  src={thumbnailUrl}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
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
                  onClientUploadComplete={(res: { url: string }[]) => {
                    setThumbnailUrl(res?.[0]?.url);
                    updateStream({ thumbnailUrl: res?.[0]?.url }).then(() => {
                      router.refresh();
                      toast.success("Thumbnail uploaded successfully");
                    }).catch(() => {
                      toast.error("Failed to save thumbnail");
                    });
                  }}
                  onUploadError={(error: Error) => {
                    console.error("Upload error:", error);
                    toast.error(error.message || "Failed to upload thumbnail. Please check file size and format.");
                  }}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} variant="primary" type="submit">
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
