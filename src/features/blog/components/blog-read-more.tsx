import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import type { BlogDetailContent, BlogPost } from "@/features/blog/types/blog";

type BlogReadMoreProps = {
  posts: BlogPost[];
  content: BlogDetailContent;
};

export function BlogReadMore({ posts, content }: BlogReadMoreProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-border pt-10">
      <SectionEyebrow text={content.relatedEyebrow} />

      <h2 className="mt-4 font-display text-subheading">
        {content.relatedHeading}
      </h2>

      <div className="mt-8 flex flex-col gap-8">
        {posts.map((post) => (
          <Link
            className="group grid grid-cols-1 gap-5 sm:grid-cols-12 sm:items-center"
            href={`/blog/${post.slug}`}
            key={post.slug}
            prefetch
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-border bg-muted sm:col-span-4">
              <Image
                alt={post.thumbnail.alt}
                className="object-cover transition-transform duration-[var(--duration-reveal)] ease-[var(--ease-editorial)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                fill
                sizes="(min-width: 640px) 220px, 100vw"
                src={post.thumbnail.src}
              />
            </div>

            <div className="sm:col-span-8">
              <div className="flex flex-wrap items-center gap-3 text-micro uppercase text-muted-foreground">
                <span className="text-gold">{post.tags[0]}</span>
                <time className="tabular-nums" dateTime={post.date.iso}>
                  {post.date.label}
                </time>
              </div>

              <h3 className="mt-2 font-display text-title leading-snug decoration-gold/60 underline-offset-4 group-hover:underline">
                {post.title}
              </h3>

              <p className="mt-2 line-clamp-3 text-caption text-muted-foreground">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Link
        className="mt-8 inline-flex items-center gap-2 text-micro font-medium uppercase text-foreground underline decoration-border underline-offset-8 transition-colors hover:decoration-gold"
        href="/blog"
        prefetch
      >
        {content.allNotesLabel}
        <ArrowRight aria-hidden className="size-3.5 text-gold" />
      </Link>
    </section>
  );
}
