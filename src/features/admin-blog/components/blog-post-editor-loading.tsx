import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { Skeleton } from "@/components/ui/skeleton";
import type { AdminBlogEditorContent } from "@/features/admin-blog/types/admin-blog-content";

type BlogPostEditorLoadingProps = {
  content: AdminBlogEditorContent;
};

export function BlogPostEditorLoading({
  content,
}: BlogPostEditorLoadingProps) {
  return (
    <div
      aria-busy="true"
      className="mx-auto w-full max-w-[1240px] px-6 py-10 md:py-14"
    >
      <Link
        className="inline-flex items-center gap-2 text-micro font-medium uppercase text-muted-foreground"
        href="/admin/blogs"
      >
        <ArrowLeft className="size-3.5" />
        {content.backLabel}
      </Link>

      <div className="mt-6 border-b border-border pb-10 md:pb-14">
        <SectionEyebrow text={content.editEyebrow} />
        <h1 className="mt-4 text-heading">{content.loading.title}</h1>
        <p className="mt-4 max-w-md text-caption text-muted-foreground">
          {content.loading.description}
        </p>
      </div>

      <div className="mt-10 grid gap-12 md:mt-12 lg:grid-cols-3 lg:gap-16">
        <div className="space-y-8 lg:col-span-2">
          <Skeleton className="h-16 w-3/4 rounded-none" />
          <Skeleton className="h-10 w-full rounded-none" />
          <Skeleton className="h-28 w-full rounded-none" />
          <Skeleton className="h-96 w-full rounded-none" />
        </div>
        <div className="space-y-6">
          <Skeleton className="aspect-[16/10] w-full rounded-none" />
          <Skeleton className="h-24 w-full rounded-none" />
          <Skeleton className="h-48 w-full rounded-none" />
        </div>
      </div>
    </div>
  );
}
