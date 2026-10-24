"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Archive,
  ArrowUpRight,
  MoreHorizontal,
  Pencil,
  Send,
  Trash2,
  Undo2,
} from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAdminBlogError } from "@/features/admin-blog/api/get-admin-blog-error";
import { useChangeBlogPostStatus } from "@/features/admin-blog/hooks/use-change-blog-post-status";
import { useDeleteBlogPost } from "@/features/admin-blog/hooks/use-delete-blog-post";
import type { AdminBlogContent } from "@/features/admin-blog/types/admin-blog-content";
import type {
  AdminBlogPostSummary,
  BlogPostStatusAction,
} from "@/features/admin-blog/types/blog";

type BlogPostRowActionsProps = {
  post: AdminBlogPostSummary;
  content: AdminBlogContent;
};

type ConfirmAction = "unpublish" | "archive" | "delete";

export function BlogPostRowActions({
  post,
  content,
}: BlogPostRowActionsProps) {
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const statusMutation = useChangeBlogPostStatus();
  const deleteMutation = useDeleteBlogPost();
  const copy = content.list;

  const successMessages: Record<BlogPostStatusAction, string> = {
    publish: content.toasts.published,
    unpublish: content.toasts.unpublished,
    archive: content.toasts.archived,
  };

  function describeError(error: unknown): string {
    const parsed = getAdminBlogError(error);

    return parsed.issues.length > 0
      ? `${parsed.message} ${parsed.issues.map((issue) => issue.message).join(" ")}`
      : parsed.message;
  }

  function runStatusAction(action: BlogPostStatusAction) {
    statusMutation.mutate(
      { id: post.id, action },
      {
        onSuccess: () => toast.success(successMessages[action]),
        onError: (error) => {
          const fallback =
            action === "publish"
              ? content.toasts.publishError
              : action === "unpublish"
                ? content.toasts.unpublishError
                : content.toasts.archiveError;

          toast.error(fallback, { description: describeError(error) });
        },
      },
    );
  }

  function deletePost() {
    deleteMutation.mutate(post.id, {
      onSuccess: () => toast.success(content.toasts.deleted),
      onError: (error) =>
        toast.error(content.toasts.deleteError, {
          description: describeError(error),
        }),
    });
  }

  const isBusy = statusMutation.isPending || deleteMutation.isPending;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={copy.row.openMenu}
            disabled={isBusy}
            size="icon-sm"
            variant="ghost"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href={`/admin/blogs/${post.id}`}>
              <Pencil />
              {copy.row.edit}
            </Link>
          </DropdownMenuItem>

          {post.status === "published" ? (
            <DropdownMenuItem asChild>
              <Link href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">
                <ArrowUpRight />
                {copy.row.viewLive}
              </Link>
            </DropdownMenuItem>
          ) : null}

          <DropdownMenuSeparator />

          {post.status === "draft" ? (
            <DropdownMenuItem onSelect={() => runStatusAction("publish")}>
              <Send />
              {copy.row.publish}
            </DropdownMenuItem>
          ) : null}

          {post.status === "published" ? (
            <DropdownMenuItem onSelect={() => setConfirmAction("unpublish")}>
              <Undo2 />
              {copy.row.unpublish}
            </DropdownMenuItem>
          ) : null}

          {post.status !== "archived" ? (
            <DropdownMenuItem onSelect={() => setConfirmAction("archive")}>
              <Archive />
              {copy.row.archive}
            </DropdownMenuItem>
          ) : null}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => setConfirmAction("delete")}
            variant="destructive"
          >
            <Trash2 />
            {copy.row.delete}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={confirmAction === "unpublish"}
        onOpenChange={(open) => !open && setConfirmAction(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{copy.dialogs.unpublishTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {copy.dialogs.unpublishDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{copy.dialogs.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={() => runStatusAction("unpublish")}>
              {copy.dialogs.unpublishConfirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={confirmAction === "archive"}
        onOpenChange={(open) => !open && setConfirmAction(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{copy.dialogs.archiveTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {copy.dialogs.archiveDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{copy.dialogs.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={() => runStatusAction("archive")}>
              {copy.dialogs.archiveConfirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={confirmAction === "delete"}
        onOpenChange={(open) => !open && setConfirmAction(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{copy.dialogs.deleteTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {copy.dialogs.deleteDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{copy.dialogs.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={deletePost} variant="destructive">
              {copy.dialogs.deleteConfirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
