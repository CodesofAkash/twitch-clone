# PART 2: PRIORITY 1 - ESSENTIAL FEATURES

## FILE 6: Category Selector Component (Dashboard)

**Path**: `components/category-selector.tsx`

```typescript
"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Category } from "@prisma/client";

interface CategorySelectorProps {
  categories: Category[];
  value?: string;
  onChange: (categoryId: string, categoryName: string) => void;
}

export const CategorySelector = ({
  categories,
  value,
  onChange,
}: CategorySelectorProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedCategory = categories.find((cat) => cat.id === value);

  const handleSelect = (categoryId: string, categoryName: string) => {
    onChange(categoryId, categoryName);
    setOpen(false);
  };

  const handleCreateCustom = () => {
    if (search.trim()) {
      // Create custom category with the search term
      onChange(search.trim(), search.trim());
      setSearch("");
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCategory
            ? selectedCategory.name
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search category..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>
            <div className="p-2">
              <p className="text-sm text-muted-foreground mb-2">
                No category found.
              </p>
              {search.trim() && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleCreateCustom}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create "{search}"
                </Button>
              )}
            </div>
          </CommandEmpty>
          <CommandGroup>
            {categories.map((category) => (
              <CommandItem
                key={category.id}
                value={category.name}
                onSelect={() => handleSelect(category.id, category.name)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === category.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex items-center gap-2">
                  <span>{category.name}</span>
                  {!category.isPredefined && (
                    <span className="text-xs text-muted-foreground">(Custom)</span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
```

---

## FILE 7: Tag Input Component

**Path**: `components/tag-input.tsx`

```typescript
"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  placeholder?: string;
}

export const TagInput = ({
  value,
  onChange,
  maxTags = 5,
  placeholder = "Add tags...",
}: TagInputProps) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      
      if (value.length >= maxTags) {
        return;
      }

      if (!value.includes(input.trim())) {
        onChange([...value, input.trim()]);
      }
      
      setInput("");
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <Badge key={tag} variant="secondary" className="gap-1">
            {tag}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
      
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length >= maxTags ? `Max ${maxTags} tags` : placeholder}
        disabled={value.length >= maxTags}
      />
      
      <p className="text-xs text-muted-foreground">
        Press Enter to add tags. {value.length}/{maxTags} tags
      </p>
    </div>
  );
};
```

---

## FILE 8: Stream Info Card (Dashboard - with Category & Tags)

**Path**: `app/(dashboard)/u/[username]/(home)/_components/stream-info-card.tsx`

```typescript
"use client";

import { useState, useTransition, ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import Image from "next/image";

import { updateStream, updateStreamCategory, updateStreamTags } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";

import { Hint } from "@/components/hint";
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
              Can't find your category? Type to create a custom one.
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
```

Continue to next file...
