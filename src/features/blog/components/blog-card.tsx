import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatBlogDate } from "@/features/blog/lib/format-blog-date";
import type { BlogPostSummary } from "@/features/blog/types/blog";

type BlogCardProps = {
  post: BlogPostSummary;
  index: number;
};

export function BlogCard({ post, index }: BlogCardProps) {
  const date = formatBlogDate(post.publishedAt);
  const primaryTag = post.tags[0];

  return (
    <Link
      className="group flex h-full flex-col border-b border-r border-border bg-background p-5 transition-colors duration-[var(--duration-state)] ease-[var(--ease-quiet)] hover:bg-card md:p-7"
      href={`/blog/${post.slug}`}
      prefetch
    >
      <div className="relative aspect-[4/3] overflow-hidden border border-border bg-muted">
        <Image
          alt={post.cover.alt}
          className="object-cover transition-transform duration-[var(--duration-reveal)] ease-[var(--ease-editorial)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          src={post.cover.url}
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        {primaryTag ? (
          <Badge
            className="h-auto rounded-sm px-2 py-1 text-micro uppercase text-muted-foreground"
            variant="secondary"
          >
            {primaryTag.name}
          </Badge>
        ) : (
          <span />
        )}
        <span className="text-micro tabular-nums text-gold">
          ({String(index + 1).padStart(2, "0")})
        </span>
      </div>

      <h2 className="mt-4 font-display text-title leading-snug text-balance decoration-gold/60 underline-offset-4 group-hover:underline">
        {post.title}
      </h2>

      <p className="mt-2 line-clamp-3 text-caption text-muted-foreground">
        {post.excerpt}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4 pt-6">
        <time
          className="text-caption tabular-nums text-muted-foreground"
          dateTime={date.iso}
        >
          {date.label}
        </time>
        <ArrowUpRight
          aria-hidden
          className="size-4 text-gold transition-transform duration-[var(--duration-state)] ease-[var(--ease-quiet)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
        />
      </div>
    </Link>
  );
}
