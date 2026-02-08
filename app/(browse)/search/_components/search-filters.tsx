"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import qs from "query-string";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Category } from "@prisma/client";

interface SearchFiltersProps {
  initialTerm?: string;
  initialCategory?: string;
  initialLiveOnly?: boolean;
  initialSort?: "viewers" | "recent";
  categories: Category[];
}

export const SearchFilters = ({
  initialTerm = "",
  initialCategory,
  initialLiveOnly = false,
  initialSort = "viewers",
  categories,
}: SearchFiltersProps) => {
  const router = useRouter();

  const [term, setTerm] = useState(initialTerm);
  const [category, setCategory] = useState(initialCategory || "");
  const [liveOnly, setLiveOnly] = useState(initialLiveOnly);
  const [sort, setSort] = useState(initialSort);

  const applyFilters = () => {
    const url = qs.stringifyUrl({
      url: "/search",
      query: {
        term: term || undefined,
        category: category || undefined,
        live: liveOnly || undefined,
        sort,
      },
    }, { skipNull: true, skipEmptyString: true });

    router.push(url);
  };

  const clearFilters = () => {
    setTerm("");
    setCategory("");
    setLiveOnly(false);
    setSort("viewers");
    router.push("/search");
  };

  const hasActiveFilters = term || category || liveOnly || sort !== "viewers";

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              applyFilters();
            }
          }}
          placeholder="Search streams or users..."
          className="lg:max-w-md"
        />

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="lg:w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(val: any) => setSort(val)}>
          <SelectTrigger className="lg:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="viewers">Most Viewers</SelectItem>
            <SelectItem value="recent">Recently Updated</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Switch
            id="live-only"
            checked={liveOnly}
            onCheckedChange={setLiveOnly}
          />
          <Label htmlFor="live-only" className="cursor-pointer">
            Live only
          </Label>
        </div>

        <div className="flex gap-2">
          <Button onClick={applyFilters} variant="primary">
            Apply Filters
          </Button>
          
          {hasActiveFilters && (
            <Button onClick={clearFilters} variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};