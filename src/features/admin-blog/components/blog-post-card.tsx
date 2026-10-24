import Link from "next/link";

import { BlogCoverThumb } from "@/features/admin-blog/components/blog-cover-thumb";
import { BlogPostRowActions } from "@/features/admin-blog/components/blog-post-row-actions";
import { BlogPostTags } from "@/features/admin-blog/components/blog-post-tags";
import { BlogStatusBadge } from "@/features/admin-blog/components/blog-status-badge";
import { formatBlogDate } from "@/features/admin-blog/lib/format-blog-date";
import type { AdminBlogContent } from "@/features/admin-blog/types/admin-blog-content";
import type { AdminBlogPostSummary } from "@/features/admin-blog/types/blog";

type BlogPostCardProps = {
  post: AdminBlogPostSummary;
  content: AdminBlogContent;
};

export function BlogPostCard({ post, content }: BlogPostCardProps) {
  const copy = content.list;

  return (
    <article className="flex gap-4 border-b border-border py-5 first:pt-0 last:border-b-0">
      <BlogCoverThumb
        altFallback={post.title}
        className="h-24 w-20"
        cover={post.cover}
        noCoverLabel={copy.row.noCover}
        sizes="80px"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link
            className="line-clamp-2 font-heading text-lg leading-snug transition-colors hover:text-primary"
            href={`/admin/blogs/${post.id}`}
          >
            {post.title}
          </Link>
          <BlogPostRowActions content={content} post={post} />
        </div>
        <p className="mt-1 line-clamp-2 text-caption text-muted-foreground">
          {post.excerpt || copy.row.untagged}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <BlogStatusBadge labels={content.statusLabels} status={post.status} />
          <BlogPostTags
            maxVisible={1}
            tags={post.tags}
            untaggedLabel={copy.row.untagged}
          />
        </div>
        <p className="mt-2 text-micro uppercase tabular-nums text-muted-foreground/70">
          {formatBlogDate(post.updatedAt, { withTime: true })}
        </p>
      </div>
    </article>
  );
}
