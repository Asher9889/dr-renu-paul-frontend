import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getPublicBlogAuthor } from "@/features/blog/api/get-public-blog-author";
import { getPublicBlogPost } from "@/features/blog/api/get-public-blog-post";
import { BlogGridSkeleton } from "@/features/blog/components/blog-grid-skeleton";
import { BlogPageHeader } from "@/features/blog/components/blog-page-header";
import { BlogPostSkeleton } from "@/features/blog/components/blog-post-skeleton";
import { BlogPostView } from "@/features/blog/components/blog-post-view";
import { BlogPostsSection } from "@/features/blog/components/blog-posts-section";
import { BlogTagFilterSection } from "@/features/blog/components/blog-tag-filter-section";
import { BlogTagFilterSkeleton } from "@/features/blog/components/blog-tag-filter-skeleton";
import { blogListingContent } from "@/features/blog/content/blog-listing-content";
import type { BlogSearchParams } from "@/features/blog/types/blog";

type BlogListingProps = {
  searchParams: Promise<BlogSearchParams>;
};

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function BlogListing({ searchParams }: BlogListingProps) {
  return (
    <main className="flex-1">
      <BlogPageHeader content={blogListingContent}>
        <Suspense fallback={<BlogTagFilterSkeleton />}>
          <BlogTagFilterSection searchParams={searchParams} />
        </Suspense>
      </BlogPageHeader>

      <section className="mx-auto w-full max-w-[1240px] px-6 py-12 md:py-16">
        <Suspense fallback={<BlogGridSkeleton />}>
          <BlogPostsSection searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}

export function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}

async function BlogPostContent({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, author] = await Promise.all([
    getPublicBlogPost(slug),
    getPublicBlogAuthor(),
  ]);

  if (!post) {
    notFound();
  }

  return <BlogPostView author={author} initialPost={post} />;
}

export {
  blogListingMetadata,
  buildBlogPostMetadata,
} from "@/features/blog/lib/blog-metadata";
