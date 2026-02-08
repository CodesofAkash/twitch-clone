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
                  Create &quot;{search}&quot;
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