"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { BlogTagSummary } from "@/features/blog/types/blog";
import { cn } from "@/lib/utils";

type BlogMobileTagFilterProps = {
  tags: BlogTagSummary[];
  selectedTag: string;
  selectedCount: number;
  allTagLabel: string;
  label: string;
};

export function BlogMobileTagFilter({
  tags,
  selectedTag,
  selectedCount,
  allTagLabel,
  label,
}: BlogMobileTagFilterProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="h-11 w-full justify-between px-4 text-micro uppercase md:hidden"
          variant="outline"
        >
          <span className="flex items-baseline gap-2">
            {selectedTag}
            <span className="tabular-nums text-gold">{selectedCount}</span>
          </span>
          <ChevronDown aria-hidden className="size-4 text-muted-foreground" />
        </Button>
      </SheetTrigger>

      <SheetContent
        aria-describedby={undefined}
        className="max-h-[85dvh] shadow-none"
        side="bottom"
      >
        <SheetHeader>
          <SheetTitle className="font-display text-subheading">
            {label}
          </SheetTitle>
        </SheetHeader>

        <nav
          aria-label={label}
          className="flex min-h-0 flex-col overflow-y-auto px-4 pb-8"
        >
          {tags.map((tag) => {
            const isSelected = tag.tag === selectedTag;

            return (
              <SheetClose asChild key={tag.tag}>
                <Link
                  aria-current={isSelected ? "page" : undefined}
                  className={cn(
                    "flex items-baseline justify-between gap-4 border-b border-border py-3.5 text-body transition-colors",
                    isSelected
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  href={
                    tag.tag === allTagLabel
                      ? "/blog"
                      : `/blog?tag=${encodeURIComponent(tag.tag)}`
                  }
                  prefetch
                >
                  <span
                    className={cn(
                      "decoration-gold/60 underline-offset-4",
                      isSelected && "underline",
                    )}
                  >
                    {tag.tag}
                  </span>
                  <span className="text-caption tabular-nums text-gold">
                    {tag.count}
                  </span>
                </Link>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
