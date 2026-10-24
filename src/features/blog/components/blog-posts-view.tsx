"use client";

import { BlogGrid } from "@/features/blog/components/blog-grid";
import { BlogPagination } from "@/features/blog/components/blog-pagination";
import { usePublicBlogPosts } from "@/features/blog/hooks/use-public-blog-posts";
import { BLOG_PAGE_SIZE } from "@/features/blog/lib/blog-listing";
import type {
  BlogListResult,
  BlogListingContent,
} from "@/features/blog/types/blog";

type BlogPostsViewProps = {
  initialData: BlogListResult;
  tagSlug?: string;
  page: number;
  content: BlogListingContent;
};

export function BlogPostsView({
  initialData,
  tagSlug,
  page,
  content,
}: BlogPostsViewProps) {
  const postsQuery = usePublicBlogPosts(
    { tag: tagSlug, page, limit: BLOG_PAGE_SIZE },
    initialData,
  );
  const result = postsQuery.data ?? initialData;

  return (
    <>
      <BlogGrid
        emptyActionLabel={content.emptyActionLabel}
        emptyMessage={content.emptyMessage}
        posts={result.posts}
        startIndex={(result.meta.page - 1) * BLOG_PAGE_SIZE}
      />

      <BlogPagination
        content={content}
        hasNextPage={result.meta.hasNextPage}
        hasPreviousPage={result.meta.hasPreviousPage}
        page={result.meta.page}
        selectedTagSlug={tagSlug ?? null}
      />
    </>
  );
}
