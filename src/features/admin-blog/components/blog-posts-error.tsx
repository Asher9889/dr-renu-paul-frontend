"use client";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { Button } from "@/components/ui/button";
import type { AdminBlogListContent } from "@/features/admin-blog/types/admin-blog-content";

type BlogPostsErrorProps = {
  content: AdminBlogListContent["error"];
  onRetry: () => void;
};

export function BlogPostsError({ content, onRetry }: BlogPostsErrorProps) {
  return (
    <div className="py-20 md:py-24">
      <SectionEyebrow text={content.eyebrow} />
      <h2 className="mt-4 max-w-xl text-subheading">{content.title}</h2>
      <p className="mt-4 max-w-md text-caption text-muted-foreground">
        {content.description}
      </p>
      <Button className="mt-8" onClick={onRetry} variant="outline">
        {content.retryLabel}
      </Button>
    </div>
  );
}
