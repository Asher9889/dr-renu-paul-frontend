import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlogCoverThumb } from "@/features/admin-blog/components/blog-cover-thumb";
import { BlogPostRowActions } from "@/features/admin-blog/components/blog-post-row-actions";
import { BlogPostTags } from "@/features/admin-blog/components/blog-post-tags";
import { BlogStatusBadge } from "@/features/admin-blog/components/blog-status-badge";
import { formatBlogDate } from "@/features/admin-blog/lib/format-blog-date";
import type { AdminBlogContent } from "@/features/admin-blog/types/admin-blog-content";
import type { AdminBlogPostSummary } from "@/features/admin-blog/types/blog";

type BlogPostTableProps = {
  posts: AdminBlogPostSummary[];
  content: AdminBlogContent;
};

export function BlogPostTable({ posts, content }: BlogPostTableProps) {
  const copy = content.list;

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          <TableHead className="h-11 pl-0 text-micro font-medium uppercase text-muted-foreground">
            {copy.table.post}
          </TableHead>
          <TableHead className="h-11 text-micro font-medium uppercase text-muted-foreground">
            {copy.table.status}
          </TableHead>
          <TableHead className="hidden h-11 text-micro font-medium uppercase text-muted-foreground lg:table-cell">
            {copy.table.tags}
          </TableHead>
          <TableHead className="hidden h-11 text-micro font-medium uppercase text-muted-foreground xl:table-cell">
            {copy.table.updated}
          </TableHead>
          <TableHead className="h-11 pr-0 text-right text-micro font-medium uppercase text-muted-foreground">
            <span className="sr-only">{copy.table.actions}</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow className="border-border/80 align-middle" key={post.id}>
            <TableCell className="py-4 pl-0">
              <div className="flex items-center gap-4">
                <BlogCoverThumb
                  altFallback={post.title}
                  className="h-14 w-20"
                  cover={post.cover}
                  noCoverLabel={copy.row.noCover}
                  sizes="80px"
                />
                <div className="min-w-0">
                  <Link
                    className="line-clamp-1 font-heading text-lg leading-snug transition-colors hover:text-primary"
                    href={`/admin/blogs/${post.id}`}
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 line-clamp-1 text-caption text-muted-foreground">
                    {post.excerpt || post.slug}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2 text-micro uppercase text-muted-foreground/70">
                    <span className="text-gold">/{post.slug}</span>
                    <span aria-hidden>·</span>
                    <span>
                      {post.readingTimeMinutes} {copy.row.readingTimeSuffix}
                    </span>
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap items-center gap-2">
                <BlogStatusBadge
                  labels={content.statusLabels}
                  status={post.status}
                />
                {post.featured ? (
                  <Badge
                    className="h-auto rounded-sm px-2 py-0.5 text-micro uppercase text-gold"
                    variant="secondary"
                  >
                    {copy.row.featured}
                  </Badge>
                ) : null}
              </div>
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              <BlogPostTags
                tags={post.tags}
                untaggedLabel={copy.row.untagged}
              />
            </TableCell>
            <TableCell className="hidden xl:table-cell">
              <time
                className="text-caption tabular-nums text-muted-foreground"
                dateTime={post.updatedAt}
              >
                {formatBlogDate(post.updatedAt, { withTime: true })}
              </time>
            </TableCell>
            <TableCell className="pr-0 text-right">
              <BlogPostRowActions content={content} post={post} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
