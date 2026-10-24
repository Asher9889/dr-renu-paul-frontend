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
import { buildBlogListingHref } from "@/features/blog/lib/blog-listing";
import type { BlogTagSummary } from "@/features/blog/types/blog";
import { cn } from "@/lib/utils";

type BlogMobileTagFilterProps = {
  tags: BlogTagSummary[];
  selectedTagSlug: string | null;
  selectedTagName: string;
  selectedCount: number;
  totalPublishedPosts: number;
  allTagLabel: string;
  label: string;
};

export function BlogMobileTagFilter({
  tags,
  selectedTagSlug,
  selectedTagName,
  selectedCount,
  totalPublishedPosts,
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
            {selectedTagName}
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
          <SheetClose asChild>
            <Link
              aria-current={selectedTagSlug ? undefined : "page"}
              className={cn(
                "flex items-baseline justify-between gap-4 border-b border-border py-3.5 text-body transition-colors",
                selectedTagSlug
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-foreground",
              )}
              href={buildBlogListingHref(null, 1)}
              prefetch
            >
              <span
                className={cn(
                  "decoration-gold/60 underline-offset-4",
                  selectedTagSlug ? undefined : "underline",
                )}
              >
                {allTagLabel}
              </span>
              <span className="text-caption tabular-nums text-gold">
                {totalPublishedPosts}
              </span>
            </Link>
          </SheetClose>

          {tags.map((tag) => {
            const isSelected = tag.slug === selectedTagSlug;

            return (
              <SheetClose asChild key={tag.slug}>
                <Link
                  aria-current={isSelected ? "page" : undefined}
                  className={cn(
                    "flex items-baseline justify-between gap-4 border-b border-border py-3.5 text-body transition-colors",
                    isSelected
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  href={buildBlogListingHref(tag.slug, 1)}
                  prefetch
                >
                  <span
                    className={cn(
                      "decoration-gold/60 underline-offset-4",
                      isSelected && "underline",
                    )}
                  >
                    {tag.name}
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
