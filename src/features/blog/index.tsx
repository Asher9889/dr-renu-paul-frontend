import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BlogAppointmentCard } from "@/features/blog/components/blog-appointment-card";
import { BlogAuthorCard } from "@/features/blog/components/blog-author-card";
import { BlogGrid } from "@/features/blog/components/blog-grid";
import { BlogMobileToc } from "@/features/blog/components/blog-mobile-toc";
import { BlogPageHeader } from "@/features/blog/components/blog-page-header";
import { BlogPostBody } from "@/features/blog/components/blog-post-body";
import { BlogPostHeader } from "@/features/blog/components/blog-post-header";
import { BlogPostSkeleton } from "@/features/blog/components/blog-post-skeleton";
import { BlogReadMore } from "@/features/blog/components/blog-read-more";
import { BlogSidebar } from "@/features/blog/components/blog-sidebar";
import { BlogTagFilter } from "@/features/blog/components/blog-tag-filter";
import { blogDetailContent } from "@/features/blog/content/blog-detail-content";
import { blogListingContent } from "@/features/blog/content/blog-listing-content";
import {
  ALL_BLOG_TAG,
  blogAuthor,
  blogPosts,
  getBlogHeadings,
  getBlogPostBySlug,
  getBlogPostsByTag,
  getBlogTagSummaries,
  getRelatedBlogPosts,
  resolveBlogTag,
} from "@/features/blog/content/blog-posts-content";
import type { BlogTagSummary } from "@/features/blog/types/blog";

type BlogSearchParams = Promise<Record<string, string | string[] | undefined>>;

type BlogListingProps = {
  searchParams: BlogSearchParams;
};

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function BlogListing({ searchParams }: BlogListingProps) {
  const tagSummaries = getBlogTagSummaries(blogPosts);

  return (
    <main className="flex-1">
      <BlogPageHeader content={blogListingContent}>
        <Suspense
          fallback={
            <BlogTagFilter
              allTagLabel={blogListingContent.allTagLabel}
              label={blogListingContent.filterLabel}
              mobileLabel={blogListingContent.mobileFilterLabel}
              selectedTag={ALL_BLOG_TAG}
              tags={tagSummaries}
            />
          }
        >
          <FilteredBlogTagFilter
            searchParams={searchParams}
            tagSummaries={tagSummaries}
          />
        </Suspense>
      </BlogPageHeader>

      <section className="mx-auto w-full max-w-[1240px] px-6 py-12 md:py-16">
        <Suspense
          fallback={
            <BlogGrid
              emptyActionLabel={blogListingContent.emptyActionLabel}
              emptyMessage={blogListingContent.emptyMessage}
              posts={blogPosts}
            />
          }
        >
          <FilteredBlogGrid
            searchParams={searchParams}
            tagSummaries={tagSummaries}
          />
        </Suspense>
      </section>
    </main>
  );
}

type FilteredBlogTagFilterProps = {
  searchParams: BlogSearchParams;
  tagSummaries: BlogTagSummary[];
};

async function FilteredBlogTagFilter({
  searchParams,
  tagSummaries,
}: FilteredBlogTagFilterProps) {
  const params = await searchParams;
  const selectedTag = resolveBlogTag(params.tag, tagSummaries);

  return (
    <BlogTagFilter
      allTagLabel={blogListingContent.allTagLabel}
      label={blogListingContent.filterLabel}
      mobileLabel={blogListingContent.mobileFilterLabel}
      selectedTag={selectedTag}
      tags={tagSummaries}
    />
  );
}

type FilteredBlogGridProps = {
  searchParams: BlogSearchParams;
  tagSummaries: BlogTagSummary[];
};

async function FilteredBlogGrid({
  searchParams,
  tagSummaries,
}: FilteredBlogGridProps) {
  const params = await searchParams;
  const selectedTag = resolveBlogTag(params.tag, tagSummaries);
  const posts = getBlogPostsByTag(blogPosts, selectedTag);

  return (
    <BlogGrid
      emptyActionLabel={blogListingContent.emptyActionLabel}
      emptyMessage={blogListingContent.emptyMessage}
      posts={posts}
    />
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
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const headings = getBlogHeadings(post);
  const relatedPosts = getRelatedBlogPosts(blogPosts, post);

  return (
    <main className="flex-1">
      <BlogPostHeader content={blogDetailContent} post={post} />

      <div className="mx-auto w-full max-w-[1240px] px-6">
        <figure className="mt-10 md:mt-14">
          <div className="relative aspect-[16/9] max-h-[560px] w-full overflow-hidden border border-border bg-muted">
            <Image
              alt={post.thumbnail.alt}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1240px) 1192px, 100vw"
              src={post.thumbnail.src}
            />
          </div>
          <figcaption className="mt-3 text-caption italic text-muted-foreground">
            {blogDetailContent.figureLabel} — {post.thumbnail.caption}
          </figcaption>
        </figure>

        <div className="mt-10 grid grid-cols-1 border-t border-border lg:grid-cols-12">
          <article className="pb-24 pt-10 lg:col-span-8 lg:border-r lg:border-border lg:py-14 lg:pr-12">
            <div className="mb-8 lg:hidden">
              <BlogAuthorCard
                author={blogAuthor}
                label={blogDetailContent.authorLabel}
              />
            </div>

            <BlogPostBody
              blocks={post.body}
              note={blogDetailContent.articleNote}
            />

            <div className="mt-10 lg:hidden">
              <BlogAppointmentCard content={blogDetailContent.appointment} />
            </div>

            <BlogReadMore
              content={blogDetailContent}
              posts={relatedPosts}
            />
          </article>

          <aside className="hidden border-t border-border py-10 lg:col-span-4 lg:block lg:border-t-0 lg:py-14 lg:pl-10">
            <BlogSidebar
              author={blogAuthor}
              content={blogDetailContent}
              headings={headings}
            />
          </aside>
        </div>
      </div>

      <BlogMobileToc
        items={headings}
        label={blogDetailContent.tocLabel}
      />
    </main>
  );
}

export { blogListingMetadata, buildBlogPostMetadata, getBlogStaticParams } from "@/features/blog/content/blog-metadata";
