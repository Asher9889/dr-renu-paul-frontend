import Link from "next/link";

import { BlogMobileTagFilter } from "@/features/blog/components/blog-mobile-tag-filter";
import { buildBlogListingHref } from "@/features/blog/lib/blog-listing";
import type { BlogTagSummary } from "@/features/blog/types/blog";
import { cn } from "@/lib/utils";

type BlogTagFilterProps = {
  tags: BlogTagSummary[];
  selectedTagSlug: string | null;
  totalPublishedPosts: number;
  allTagLabel: string;
  label: string;
  mobileLabel: string;
};

export function BlogTagFilter({
  tags,
  selectedTagSlug,
  totalPublishedPosts,
  allTagLabel,
  label,
  mobileLabel,
}: BlogTagFilterProps) {
  const selectedTag = selectedTagSlug
    ? tags.find((tag) => tag.slug === selectedTagSlug)
    : undefined;
  const selectedCount = selectedTag
    ? selectedTag.count
    : selectedTagSlug
      ? 0
      : totalPublishedPosts;
  const selectedTagName = selectedTag?.name ?? allTagLabel;

  return (
    <>
      <nav
        aria-label={label}
        className="hidden flex-wrap items-baseline gap-x-6 gap-y-3 md:flex"
      >
        <Link
          aria-current={selectedTagSlug ? undefined : "page"}
          className={cn(
            "inline-flex items-baseline gap-2 border-b pb-1 text-micro uppercase transition-colors duration-[var(--duration-state)] ease-[var(--ease-quiet)]",
            selectedTagSlug
              ? "border-transparent text-muted-foreground hover:border-gold/40 hover:text-foreground"
              : "border-gold text-foreground",
          )}
          href={buildBlogListingHref(null, 1)}
          prefetch
        >
          {allTagLabel}
          <span className="tabular-nums text-gold">{totalPublishedPosts}</span>
        </Link>

        {tags.map((tag) => {
          const isSelected = tag.slug === selectedTagSlug;

          return (
            <Link
              aria-current={isSelected ? "page" : undefined}
              className={cn(
                "inline-flex items-baseline gap-2 border-b pb-1 text-micro uppercase transition-colors duration-[var(--duration-state)] ease-[var(--ease-quiet)]",
                isSelected
                  ? "border-gold text-foreground"
                  : "border-transparent text-muted-foreground hover:border-gold/40 hover:text-foreground",
              )}
              href={buildBlogListingHref(tag.slug, 1)}
              key={tag.slug}
              prefetch
            >
              {tag.name}
              <span className="tabular-nums text-gold">{tag.count}</span>
            </Link>
          );
        })}
      </nav>

      <BlogMobileTagFilter
        allTagLabel={allTagLabel}
        label={mobileLabel}
        selectedCount={selectedCount}
        selectedTagName={selectedTagName}
        selectedTagSlug={selectedTagSlug}
        tags={tags}
        totalPublishedPosts={totalPublishedPosts}
      />
    </>
  );
}
