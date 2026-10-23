import Link from "next/link";

import { BlogMobileTagFilter } from "@/features/blog/components/blog-mobile-tag-filter";
import type { BlogTagSummary } from "@/features/blog/types/blog";
import { cn } from "@/lib/utils";

type BlogTagFilterProps = {
  tags: BlogTagSummary[];
  selectedTag: string;
  allTagLabel: string;
  label: string;
  mobileLabel: string;
};

export function BlogTagFilter({
  tags,
  selectedTag,
  allTagLabel,
  label,
  mobileLabel,
}: BlogTagFilterProps) {
  const selectedCount =
    tags.find((tag) => tag.tag === selectedTag)?.count ?? 0;

  return (
    <>
      <nav
        aria-label={label}
        className="hidden flex-wrap items-baseline gap-x-6 gap-y-3 md:flex"
      >
        {tags.map((tag) => {
          const isSelected = tag.tag === selectedTag;

          return (
            <Link
              aria-current={isSelected ? "page" : undefined}
              className={cn(
                "inline-flex items-baseline gap-2 border-b pb-1 text-micro uppercase transition-colors duration-[var(--duration-state)] ease-[var(--ease-quiet)]",
                isSelected
                  ? "border-gold text-foreground"
                  : "border-transparent text-muted-foreground hover:border-gold/40 hover:text-foreground",
              )}
              href={
                tag.tag === allTagLabel
                  ? "/blog"
                  : `/blog?tag=${encodeURIComponent(tag.tag)}`
              }
              key={tag.tag}
              prefetch
            >
              {tag.tag}
              <span className="tabular-nums text-gold">{tag.count}</span>
            </Link>
          );
        })}
      </nav>

      <BlogMobileTagFilter
        allTagLabel={allTagLabel}
        label={mobileLabel}
        selectedCount={selectedCount}
        selectedTag={selectedTag}
        tags={tags}
      />
    </>
  );
}
