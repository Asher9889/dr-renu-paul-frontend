import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { getFeaturedBlogPosts } from "@/features/blog/api/get-featured-blog-posts";
import type { BlogPostSummary } from "@/features/blog/types/blog";
import { ArrowLink } from "@/features/home/components/arrow-link";
import type { JournalContent } from "@/features/home/types/home-content";
import { cn } from "@/lib/utils";

type JournalSectionProps = {
  content: JournalContent;
};

export async function JournalSection({ content }: JournalSectionProps) {
  let posts: BlogPostSummary[] = [];

  try {
    posts = await getFeaturedBlogPosts();
  } catch {
    posts = [];
  }

  return (
    <section className="border-t border-border" id="journal">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-24 md:py-32">
        <SectionEyebrow text={content.eyebrow} />

        <h2 className="mt-6 font-display text-4xl md:text-heading">
          {content.heading}
        </h2>

        {posts.length === 0 ? (
          <div className="mt-14 border border-border bg-card p-10 md:p-16">
            <p className="font-display text-subheading">
              {content.emptyMessage}
            </p>
            <ArrowLink
              className="mt-6"
              href="/blog"
              label={content.emptyActionLabel}
            />
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {posts.map((post, index) => {
              const category = post.tags[0]?.name ?? content.defaultCategory;

              return (
                <article
                  key={post.slug}
                  className={cn(index === 1 && "md:-mt-10")}
                >
                  <Link
                    className="group block"
                    href={`/blog/${post.slug}`}
                    prefetch
                  >
                    <div className="relative aspect-[4/3] overflow-hidden border border-border bg-muted">
                      <Image
                        alt={post.cover.alt}
                        className="object-cover transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        fill
                        sizes="(min-width: 768px) 400px, 100vw"
                        src={post.cover.url}
                      />
                    </div>
                  </Link>

                  <Badge
                    className="mt-5 h-auto rounded-md px-2 py-1 text-micro uppercase text-muted-foreground"
                    variant="secondary"
                  >
                    {category}
                  </Badge>

                  <h3 className="mt-3 font-display text-title">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-caption text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <ArrowLink
                    className="mt-5"
                    href={`/blog/${post.slug}`}
                    label="Read"
                  />
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
