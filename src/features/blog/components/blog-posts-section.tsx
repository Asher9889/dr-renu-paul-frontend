import { getPublicBlogPosts } from "@/features/blog/api/get-public-blog-posts";
import { BlogPostsView } from "@/features/blog/components/blog-posts-view";
import { blogListingContent } from "@/features/blog/content/blog-listing-content";
import {
  BLOG_PAGE_SIZE,
  readBlogListingQuery,
} from "@/features/blog/lib/blog-listing";
import type { BlogSearchParams } from "@/features/blog/types/blog";

type BlogPostsSectionProps = {
  searchParams: Promise<BlogSearchParams>;
};

export async function BlogPostsSection({
  searchParams,
}: BlogPostsSectionProps) {
  const params = await searchParams;
  const query = readBlogListingQuery(params);
  const initialData = await getPublicBlogPosts({
    tag: query.tag,
    page: query.page,
    limit: BLOG_PAGE_SIZE,
  });

  return (
    <BlogPostsView
      content={blogListingContent}
      initialData={initialData}
      page={query.page}
      tagSlug={query.tag}
    />
  );
}
