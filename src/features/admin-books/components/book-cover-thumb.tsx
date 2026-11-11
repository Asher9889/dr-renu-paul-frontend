import Image from "next/image";

import type { BookCover } from "../types/book";
import { cn } from "@/lib/utils";

type BookCoverThumbProps = {
  cover: BookCover | null;
  altFallback: string;
  noCoverLabel: string;
  className?: string;
  sizes?: string;
};

export function BookCoverThumb({ cover, altFallback, noCoverLabel, className, sizes = "80px" }: BookCoverThumbProps) {
  return (
    <div className={cn("relative aspect-[3/4] overflow-hidden border border-border bg-muted", className)}>
      {cover ? (
        <Image alt={cover.alt || altFallback} className="object-cover" fill sizes={sizes} src={cover.url} />
      ) : (
        <span className="flex h-full items-center justify-center px-2 text-center text-micro uppercase text-muted-foreground/70">
          {noCoverLabel}
        </span>
      )}
    </div>
  );
}
