import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AdminPageHeader } from "@/features/admin-blog/components/admin-page-header";
import { BlogStatusBadge } from "@/features/admin-blog/components/blog-status-badge";
import { formatBlogDate } from "@/features/admin-blog/lib/format-blog-date";
import type {
  AdminBlogEditorContent,
  AdminBlogStatusLabels,
} from "@/features/admin-blog/types/admin-blog-content";
import type { AdminBlogPostDetail } from "@/features/admin-blog/types/blog";

type BlogPostFormHeaderProps = {
  content: AdminBlogEditorContent;
  labels: AdminBlogStatusLabels;
  post: AdminBlogPostDetail | null;
};

export function BlogPostFormHeader({
  content,
  labels,
  post,
}: BlogPostFormHeaderProps) {
  const status = post?.status ?? "draft";

  return (
    <div>
      <Link
        className="inline-flex items-center gap-2 text-micro font-medium uppercase text-muted-foreground transition-colors hover:text-foreground"
        href="/admin/blogs"
      >
        <ArrowLeft className="size-3.5" />
        {content.backLabel}
      </Link>

      <AdminPageHeader
        className="mt-6"
        description={post ? content.editDescription : content.newDescription}
        eyebrow={post ? content.editEyebrow : content.newEyebrow}
        titleItalic={post ? content.editTitleItalic : content.newTitleItalic}
        titleLead={post ? content.editTitleLead : content.newTitleLead}
      >
        <div className="flex flex-wrap items-center gap-3">
          <BlogStatusBadge labels={labels} status={status} />
          {post ? (
            <span className="text-micro uppercase tabular-nums text-muted-foreground">
              {content.meta.updatedLabel}{" "}
              {formatBlogDate(post.updatedAt, { withTime: true })}
            </span>
          ) : null}
        </div>
      </AdminPageHeader>
    </div>
  );
}
