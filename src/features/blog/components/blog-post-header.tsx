import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BlogDetailContent, BlogPost } from "@/features/blog/types/blog";

type BlogPostHeaderProps = {
  post: BlogPost;
  content: BlogDetailContent;
};

export function BlogPostHeader({ post, content }: BlogPostHeaderProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-14 md:py-20">
        <div className="flex flex-wrap items-center gap-3 gap-y-4">
          <Button asChild className="size-10" variant="outline">
            <Link aria-label={content.backLabel} href="/blog">
              <ArrowLeft aria-hidden />
            </Link>
          </Button>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                className="h-auto rounded-sm px-2 py-1 text-micro uppercase text-muted-foreground"
                key={tag}
                variant="secondary"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <time
            className="text-caption font-medium tabular-nums text-muted-foreground"
            dateTime={post.date.iso}
          >
            {post.date.label}
          </time>

          <span aria-hidden className="text-muted-foreground">
            ·
          </span>

          <span className="text-caption text-muted-foreground">
            {post.readTime}
          </span>
        </div>

        <h1 className="mt-8 max-w-[24ch] font-display text-4xl leading-tight tracking-tight text-balance md:text-5xl lg:text-6xl">
          {post.title}
        </h1>

        <p className="mt-6 max-w-[62ch] text-body text-muted-foreground md:text-subheading md:leading-snug">
          {post.description}
        </p>
      </div>
    </section>
  );
}
