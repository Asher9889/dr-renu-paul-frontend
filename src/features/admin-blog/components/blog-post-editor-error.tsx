"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { Button } from "@/components/ui/button";
import type { AdminBlogEditorContent } from "@/features/admin-blog/types/admin-blog-content";

type BlogPostEditorErrorProps = {
  content: AdminBlogEditorContent;
  onRetry: () => void;
};

export function BlogPostEditorError({
  content,
  onRetry,
}: BlogPostEditorErrorProps) {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-6 py-10 md:py-14">
      <Link
        className="inline-flex items-center gap-2 text-micro font-medium uppercase text-muted-foreground transition-colors hover:text-foreground"
        href="/admin/blogs"
      >
        <ArrowLeft className="size-3.5" />
        {content.backLabel}
      </Link>

      <div className="py-20 md:py-24">
        <SectionEyebrow text={content.error.eyebrow} />
        <h1 className="mt-4 max-w-xl text-heading">{content.error.title}</h1>
        <p className="mt-4 max-w-md text-caption text-muted-foreground">
          {content.error.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Button onClick={onRetry}>{content.error.retryLabel}</Button>
          <Button asChild variant="outline">
            <Link href="/admin/blogs">{content.error.backLabel}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
