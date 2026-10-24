import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BlogCard } from "@/features/blog/components/blog-card";
import type { BlogPostSummary } from "@/features/blog/types/blog";

type BlogGridProps = {
  posts: BlogPostSummary[];
  emptyMessage: string;
  emptyActionLabel: string;
  startIndex?: number;
};

export function BlogGrid({
  posts,
  emptyMessage,
  emptyActionLabel,
  startIndex = 0,
}: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="border border-border bg-card p-10 md:p-16">
        <p className="font-display text-subheading">{emptyMessage}</p>
        <Link
          className="mt-6 inline-flex items-center gap-2 text-micro font-medium uppercase text-foreground underline decoration-border underline-offset-8 transition-colors hover:decoration-gold"
          href="/blog"
        >
          {emptyActionLabel}
          <ArrowRight aria-hidden className="size-3.5 text-gold" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <BlogCard index={startIndex + index} key={post.slug} post={post} />
      ))}
    </div>
  );
}
