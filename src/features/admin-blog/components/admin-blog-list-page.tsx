"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AdminPageHeader } from "@/features/admin-blog/components/admin-page-header";
import { BlogPostCard } from "@/features/admin-blog/components/blog-post-card";
import { BlogPostTable } from "@/features/admin-blog/components/blog-post-table";
import { BlogPostsEmpty } from "@/features/admin-blog/components/blog-posts-empty";
import { BlogPostsError } from "@/features/admin-blog/components/blog-posts-error";
import { BlogPostsPagination } from "@/features/admin-blog/components/blog-posts-pagination";
import { BlogPostsSkeleton } from "@/features/admin-blog/components/blog-posts-skeleton";
import { BlogPostsToolbar } from "@/features/admin-blog/components/blog-posts-toolbar";
import { adminBlogContent } from "@/features/admin-blog/content/admin-blog-content";
import { useAdminBlogPosts } from "@/features/admin-blog/hooks/use-admin-blog-posts";
import { useBlogPostFilters } from "@/features/admin-blog/hooks/use-blog-post-filters";

export function AdminBlogListPage() {
  const copy = adminBlogContent.list;
  const filters = useBlogPostFilters();
  const postsQuery = useAdminBlogPosts(filters.query);
  const posts = postsQuery.data?.posts ?? [];
  const meta = postsQuery.data?.meta;

  return (
    <div className="mx-auto w-full max-w-[1240px] px-6 py-10 md:py-14">
      <AdminPageHeader
        description={copy.description}
        eyebrow={copy.eyebrow}
        titleItalic={copy.headlineItalic}
        titleLead={copy.headlineLead}
      >
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-micro uppercase text-muted-foreground">
              {filters.hasFilters ? copy.filteredLabel : copy.totalLabel}
            </p>
            <p className="mt-1 font-display text-subheading leading-none tabular-nums">
              {meta ? meta.total : "—"}
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/admin/blogs/new">
              <Plus data-icon="inline-start" />
              {copy.newNoteLabel}
            </Link>
          </Button>
        </div>
      </AdminPageHeader>

      <BlogPostsToolbar
        content={copy}
        hasFilters={filters.hasFilters}
        onReset={filters.resetFilters}
        onSearchChange={filters.setSearch}
        onStatusChange={filters.setStatus}
        search={filters.search}
        status={filters.status}
      />

      {postsQuery.isPending ? (
        <BlogPostsSkeleton label={copy.loadingLabel} />
      ) : postsQuery.isError ? (
        <BlogPostsError
          content={copy.error}
          onRetry={() => postsQuery.refetch()}
        />
      ) : posts.length === 0 ? (
        <BlogPostsEmpty
          content={copy.empty}
          isFiltered={filters.hasFilters}
          newNoteLabel={copy.newNoteLabel}
          onReset={filters.resetFilters}
        />
      ) : (
        <div aria-busy={postsQuery.isFetching}>
          <div className="hidden border-t border-border md:block">
            <BlogPostTable content={adminBlogContent} posts={posts} />
          </div>
          <div className="md:hidden">
            {posts.map((post) => (
              <BlogPostCard
                content={adminBlogContent}
                key={post.id}
                post={post}
              />
            ))}
          </div>

          {meta ? (
            <BlogPostsPagination
              content={copy}
              meta={meta}
              onPageChange={filters.setPage}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
