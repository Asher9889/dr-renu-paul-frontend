import Image from "next/image";

import type { BlogCover } from "@/features/admin-blog/types/blog";
import { cn } from "@/lib/utils";

type BlogCoverThumbProps = {
  cover: BlogCover | null;
  altFallback: string;
  noCoverLabel: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function BlogCoverThumb({
  cover,
  altFallback,
  noCoverLabel,
  className,
  sizes = "120px",
  priority = false,
}: BlogCoverThumbProps) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden border border-border bg-muted",
        className,
      )}
    >
      {cover ? (
        <Image
          alt={cover.alt || altFallback}
          className="object-cover"
          fill
          priority={priority}
          sizes={sizes}
          src={cover.url}
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center px-2 text-center text-micro uppercase text-muted-foreground/70">
          {noCoverLabel}
        </span>
      )}
    </div>
  );
}
