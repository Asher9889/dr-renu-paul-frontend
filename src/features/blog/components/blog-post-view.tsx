"use client";

import Image from "next/image";

import { BlogAppointmentCard } from "@/features/blog/components/blog-appointment-card";
import { BlogAuthorCard } from "@/features/blog/components/blog-author-card";
import { BlogMobileToc } from "@/features/blog/components/blog-mobile-toc";
import { BlogPostBody } from "@/features/blog/components/blog-post-body";
import { BlogPostHeader } from "@/features/blog/components/blog-post-header";
import { BlogReadMore } from "@/features/blog/components/blog-read-more";
import { BlogSidebar } from "@/features/blog/components/blog-sidebar";
import { blogDetailContent } from "@/features/blog/content/blog-detail-content";
import { usePublicBlogPost } from "@/features/blog/hooks/use-public-blog-post";
import type {
  BlogAuthor,
  BlogPostDetail,
} from "@/features/blog/types/blog";

type BlogPostViewProps = {
  initialPost: BlogPostDetail;
  author: BlogAuthor;
};

export function BlogPostView({ initialPost, author }: BlogPostViewProps) {
  const postQuery = usePublicBlogPost(initialPost.slug, initialPost);
  const post = postQuery.data ?? initialPost;
  const figureCaption = post.cover.caption
    ? `${blogDetailContent.figureLabel} — ${post.cover.caption}`
    : blogDetailContent.figureLabel;

  return (
    <main className="flex-1">
      <BlogPostHeader content={blogDetailContent} post={post} />

      <div className="mx-auto w-full max-w-[1240px] px-6">
        <figure className="mt-10 md:mt-14">
          <div className="relative aspect-[16/9] max-h-[560px] w-full overflow-hidden border border-border bg-muted">
            <Image
              alt={post.cover.alt}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1240px) 1192px, 100vw"
              src={post.cover.url}
            />
          </div>
          <figcaption className="mt-3 text-caption italic text-muted-foreground">
            {figureCaption}
          </figcaption>
        </figure>

        <div className="mt-10 grid grid-cols-1 border-t border-border lg:grid-cols-12">
          <article className="pb-24 pt-10 lg:col-span-8 lg:border-r lg:border-border lg:py-14 lg:pr-12">
            <div className="mb-8 lg:hidden">
              <BlogAuthorCard
                author={author}
                key={author.avatar.url}
                label={blogDetailContent.authorLabel}
              />
            </div>

            <BlogPostBody
              content={post.content}
              note={blogDetailContent.articleNote}
            />

            <div className="mt-10 lg:hidden">
              <BlogAppointmentCard content={blogDetailContent.appointment} />
            </div>

            <BlogReadMore content={blogDetailContent} posts={post.related} />
          </article>

          <aside className="hidden border-t border-border py-10 lg:col-span-4 lg:block lg:border-t-0 lg:py-14 lg:pl-10">
            <BlogSidebar
              author={author}
              content={blogDetailContent}
              headings={post.toc}
            />
          </aside>
        </div>
      </div>

      <BlogMobileToc items={post.toc} label={blogDetailContent.tocLabel} />
    </main>
  );
}
