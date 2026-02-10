"use client";

import { X } from "lucide-react";
import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SearchFiltersProps {
  categories: Category[];
  currentCategory?: string | null;
  currentTag?: string | null;
  liveOnly: boolean;
  sortBy: "viewers" | "recent";
  onCategoryChange: (categorySlug: string | null) => void;
  onClearTag: () => void;
  onLiveOnlyChange: (value: boolean) => void;
  onSortChange: (value: "viewers" | "recent") => void;
  isPending: boolean;
}

export const SearchFilters = ({
  categories,
  currentCategory,
  currentTag,
  liveOnly,
  sortBy,
  onCategoryChange,
  onClearTag,
  onLiveOnlyChange,
  onSortChange,
  isPending,
}: SearchFiltersProps) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Category Filter (Server-side) */}
        <Select
          value={currentCategory || "all"}
          onValueChange={(value) => onCategoryChange(value === "all" ? null : value)}
          disabled={isPending}
        >
          <SelectTrigger className="lg:w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort (Client-side) */}
        <Select value={sortBy} onValueChange={(val: any) => onSortChange(val)}>
          <SelectTrigger className="lg:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="viewers">Most Viewers</SelectItem>
            <SelectItem value="recent">Recently Updated</SelectItem>
          </SelectContent>
        </Select>

        {/* Live Only (Client-side) */}
        <div className="flex items-center space-x-2">
          <Switch
            id="live-only"
            checked={liveOnly}
            onCheckedChange={onLiveOnlyChange}
          />
          <Label htmlFor="live-only" className="cursor-pointer">
            Live only
          </Label>
        </div>
      </div>

      {/* Active Tag Badge */}
      {currentTag && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active tag:</span>
          <Button
            variant="secondary"
            size="sm"
            onClick={onClearTag}
            disabled={isPending}
            className="gap-1"
          >
            {currentTag}
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};