"use client";

import Link from "next/link";
import { useState } from "react";
import { Archive, ArrowUpRight, MoreHorizontal, Pencil, Send, Trash2, Undo2 } from "lucide-react";
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
import { getAdminBookError } from "../api/get-admin-book-error";
import { adminBooksContent } from "../content/admin-books-content";
import { useChangeAdminBookStatus } from "../hooks/use-change-admin-book-status";
import { useDeleteAdminBook } from "../hooks/use-delete-admin-book";
import type { AdminBookSummary, BookStatusAction } from "../types/book";

type ConfirmAction = "unpublish" | "archive" | "delete";

export function BookRowActions({ book }: { book: AdminBookSummary }) {
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const statusMutation = useChangeAdminBookStatus();
  const deleteMutation = useDeleteAdminBook();
  const copy = adminBooksContent.list;

  function describeError(error: unknown): string {
    const parsed = getAdminBookError(error);
    return parsed.issues.length > 0
      ? `${parsed.message} ${parsed.issues.map((issue) => issue.message).join(" ")}`
      : parsed.message;
  }

  function runStatusAction(action: BookStatusAction) {
    statusMutation.mutate(
      { id: book.id, action },
      {
        onSuccess: () => toast.success(adminBooksContent.editor.toasts[action === "publish" ? "published" : action === "unpublish" ? "unpublished" : "archived"]),
        onError: (error) =>
          toast.error(copy.error.title, { description: describeError(error) }),
      },
    );
  }

  function deleteBook() {
    deleteMutation.mutate(book.id, {
      onSuccess: () => toast.success(adminBooksContent.editor.toasts.deleted),
      onError: (error) => toast.error(adminBooksContent.editor.toasts.deleteError, { description: describeError(error) }),
    });
  }

  const isBusy = statusMutation.isPending || deleteMutation.isPending;
  const canPublish =
    book.processing.status === "READY" && book.processing.pageCount > 0;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label={copy.row.openMenu} disabled={isBusy} size="icon-sm" variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href={`/admin/books/${book.id}`}>
              <Pencil />
              {copy.row.edit}
            </Link>
          </DropdownMenuItem>
          {book.status === "PUBLISHED" ? (
            <DropdownMenuItem asChild>
              <Link href={`/books/${book.slug}`} target="_blank" rel="noreferrer">
                <ArrowUpRight />
                {copy.row.viewLive}
              </Link>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuSeparator />
          {book.status === "DRAFT" ? (
            <DropdownMenuItem disabled={!canPublish} onSelect={() => runStatusAction("publish")}>
              <Send />
              {canPublish ? copy.row.publish : copy.row.publishPreparing}
            </DropdownMenuItem>
          ) : null}
          {book.status === "PUBLISHED" ? (
            <DropdownMenuItem onSelect={() => setConfirmAction("unpublish")}>
              <Undo2 />
              {copy.row.unpublish}
            </DropdownMenuItem>
          ) : null}
          {book.status !== "ARCHIVED" ? (
            <DropdownMenuItem onSelect={() => setConfirmAction("archive")}>
              <Archive />
              {copy.row.archive}
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setConfirmAction("delete")} variant="destructive">
            <Trash2 />
            {copy.row.delete}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmAction === "unpublish"} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{copy.dialogs.unpublishTitle}</AlertDialogTitle>
            <AlertDialogDescription>{copy.dialogs.unpublishDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{copy.dialogs.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={() => runStatusAction("unpublish")}>{copy.dialogs.unpublishConfirm}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmAction === "archive"} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{copy.dialogs.archiveTitle}</AlertDialogTitle>
            <AlertDialogDescription>{copy.dialogs.archiveDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{copy.dialogs.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={() => runStatusAction("archive")}>{copy.dialogs.archiveConfirm}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmAction === "delete"} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{copy.dialogs.deleteTitle}</AlertDialogTitle>
            <AlertDialogDescription>{copy.dialogs.deleteDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{copy.dialogs.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={deleteBook} variant="destructive">{copy.dialogs.deleteConfirm}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
