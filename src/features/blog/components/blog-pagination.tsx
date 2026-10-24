import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { buildBlogListingHref } from "@/features/blog/lib/blog-listing";
import type { BlogListingContent } from "@/features/blog/types/blog";

type BlogPaginationProps = {
  page: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  selectedTagSlug: string | null;
  content: BlogListingContent;
};

export function BlogPagination({
  page,
  hasPreviousPage,
  hasNextPage,
  selectedTagSlug,
  content,
}: BlogPaginationProps) {
  if (!hasPreviousPage && !hasNextPage) {
    return null;
  }

  const linkClassName =
    "inline-flex items-center gap-2 text-micro font-medium uppercase text-foreground underline decoration-border underline-offset-8 transition-colors hover:decoration-gold";

  return (
    <nav
      aria-label={content.paginationLabel}
      className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6"
    >
      {hasPreviousPage ? (
        <Link
          className={linkClassName}
          href={buildBlogListingHref(selectedTagSlug, page - 1)}
          prefetch
        >
          <ArrowLeft aria-hidden className="size-3.5 text-gold" />
          {content.newerLabel}
        </Link>
      ) : (
        <span />
      )}

      <span className="text-caption tabular-nums text-muted-foreground">
        {page}
      </span>

      {hasNextPage ? (
        <Link
          className={linkClassName}
          href={buildBlogListingHref(selectedTagSlug, page + 1)}
          prefetch
        >
          {content.olderLabel}
          <ArrowRight aria-hidden className="size-3.5 text-gold" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
