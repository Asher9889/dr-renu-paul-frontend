"use client";

import { useState } from "react";
import { List } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BlogTableOfContents } from "@/features/blog/components/blog-table-of-contents";
import type { BlogHeadingBlock } from "@/features/blog/types/blog";

type BlogMobileTocProps = {
  items: BlogHeadingBlock[];
  label: string;
};

export function BlogMobileToc({ items, label }: BlogMobileTocProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) {
    return null;
  }

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label={label}
          className="fixed bottom-6 right-6 z-40 size-11 text-gold-soft shadow-none lg:hidden"
        >
          <List aria-hidden className="size-4" />
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

        <div className="min-h-0 overflow-y-auto px-4 pb-8">
          <BlogTableOfContents
            items={items}
            label={label}
            onNavigate={() => setIsOpen(false)}
            showLabel={false}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
