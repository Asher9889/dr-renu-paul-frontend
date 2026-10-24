import Link from "next/link";
import {
  Archive,
  ArrowUpRight,
  Loader2,
  Save,
  Send,
  Trash2,
  Undo2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BlogStatusBadge } from "@/features/admin-blog/components/blog-status-badge";
import { formatBlogDate } from "@/features/admin-blog/lib/format-blog-date";
import type {
  AdminBlogEditorContent,
  AdminBlogStatusLabels,
} from "@/features/admin-blog/types/admin-blog-content";
import type { AdminBlogPostDetail } from "@/features/admin-blog/types/blog";
import { cn } from "@/lib/utils";

type BlogPostActionsCardProps = {
  content: AdminBlogEditorContent;
  labels: AdminBlogStatusLabels;
  post: AdminBlogPostDetail | null;
  isDirty: boolean;
  isSaving: boolean;
  isPublishing: boolean;
  onSave: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
  onArchive: () => void;
  onDelete: () => void;
};

export function BlogPostActionsCard({
  content,
  labels,
  post,
  isDirty,
  isSaving,
  isPublishing,
  onSave,
  onPublish,
  onUnpublish,
  onArchive,
  onDelete,
}: BlogPostActionsCardProps) {
  const status = post?.status ?? "draft";
  const isBusy = isSaving || isPublishing;
  const saveDisabled = isBusy || (Boolean(post) && !isDirty);

  return (
    <div className="border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-micro uppercase text-muted-foreground">
          {content.actions.statusLabel}
        </span>
        <BlogStatusBadge labels={labels} status={status} />
      </div>

      <p className="mt-3 flex items-center gap-2 text-micro uppercase text-muted-foreground">
        <span
          aria-hidden
          className={cn(
            "size-1.5 rounded-full",
            isDirty ? "bg-gold" : "bg-border",
          )}
        />
        {isDirty ? content.unsavedLabel : content.savedLabel}
      </p>

      {post ? (
        <dl className="mt-5 space-y-2 border-t border-border pt-4 text-caption">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-muted-foreground">
              {content.meta.createdLabel}
            </dt>
            <dd className="tabular-nums text-foreground">
              {formatBlogDate(post.createdAt)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-muted-foreground">
              {content.meta.updatedLabel}
            </dt>
            <dd className="tabular-nums text-foreground">
              {formatBlogDate(post.updatedAt, { withTime: true })}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-muted-foreground">
              {content.meta.publishedLabel}
            </dt>
            <dd className="tabular-nums text-foreground">
              {post.publishedAt
                ? formatBlogDate(post.publishedAt)
                : content.meta.notPublished}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-muted-foreground">
              {content.meta.readingTimeLabel}
            </dt>
            <dd className="tabular-nums text-foreground">
              {content.meta.readingTimeValue.replace(
                "{minutes}",
                String(post.readingTimeMinutes),
              )}
            </dd>
          </div>
        </dl>
      ) : null}

      {status === "archived" ? (
        <p className="mt-5 border-t border-border pt-4 text-caption text-muted-foreground">
          {content.archivedNotice}
        </p>
      ) : null}

      <div className="mt-5 space-y-2 border-t border-border pt-4">
        {status === "draft" ? (
          <>
            <Button
              className="w-full"
              disabled={isBusy}
              onClick={onPublish}
              type="button"
            >
              {isPublishing ? (
                <Loader2 className="animate-spin" data-icon="inline-start" />
              ) : (
                <Send data-icon="inline-start" />
              )}
              {isPublishing
                ? content.actions.publishing
                : content.actions.publish}
            </Button>
            <Button
              className="w-full"
              disabled={saveDisabled}
              onClick={onSave}
              type="button"
              variant="outline"
            >
              {isSaving ? (
                <Loader2 className="animate-spin" data-icon="inline-start" />
              ) : (
                <Save data-icon="inline-start" />
              )}
              {isSaving
                ? content.actions.saving
                : post
                  ? content.actions.saveChanges
                  : content.actions.saveDraft}
            </Button>
          </>
        ) : null}

        {status === "published" ? (
          <>
            <Button
              className="w-full"
              disabled={saveDisabled}
              onClick={onSave}
              type="button"
            >
              {isSaving ? (
                <Loader2 className="animate-spin" data-icon="inline-start" />
              ) : (
                <Save data-icon="inline-start" />
              )}
              {isSaving
                ? content.actions.saving
                : content.actions.saveChanges}
            </Button>
            <Button asChild className="w-full" variant="outline">
              <Link
                href={`/blog/${post?.slug ?? ""}`}
                rel="noreferrer"
                target="_blank"
              >
                {content.actions.viewLive}
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
          </>
        ) : null}
      </div>

      <div className="mt-4 space-y-1 border-t border-border pt-4">
        {status === "published" ? (
          <Button
            className="w-full justify-start"
            disabled={isBusy}
            onClick={onUnpublish}
            type="button"
            variant="ghost"
          >
            <Undo2 data-icon="inline-start" />
            {content.actions.unpublish}
          </Button>
        ) : null}

        {status !== "archived" ? (
          <Button
            className="w-full justify-start"
            disabled={isBusy}
            onClick={onArchive}
            type="button"
            variant="ghost"
          >
            <Archive data-icon="inline-start" />
            {content.actions.archive}
          </Button>
        ) : null}

        <Button
          className="w-full justify-start text-destructive hover:text-destructive"
          disabled={isBusy}
          onClick={onDelete}
          type="button"
          variant="ghost"
        >
          <Trash2 data-icon="inline-start" />
          {content.actions.delete}
        </Button>
      </div>
    </div>
  );
}
