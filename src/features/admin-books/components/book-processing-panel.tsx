"use client";

import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { getAdminBookError } from "../api/get-admin-book-error";
import { adminBooksContent } from "../content/admin-books-content";
import { useReprocessAdminBook } from "../hooks/use-reprocess-admin-book";
import type { AdminBookDetail } from "../types/book";
import { BookProcessingBadge } from "./book-processing-badge";

export function BookProcessingPanel({ book }: { book: AdminBookDetail }) {
  const reprocess = useReprocessAdminBook();
  const copy = adminBooksContent.editor.processing;
  const processing = book.processing;
  const isWorking =
    processing.status === "PENDING" || processing.status === "PROCESSING";
  const canRetry = Boolean(book.ebook) && !isWorking;

  function retry() {
    reprocess.mutate(book.id, {
      onSuccess: () => toast.success(copy.queued),
      onError: (error) =>
        toast.error(copy.retryError, {
          description: getAdminBookError(error).message,
        }),
    });
  }

  return (
    <div className="mt-5 border border-border bg-secondary/30 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-micro uppercase text-muted-foreground">
            {copy.label}
          </p>
          <div className="mt-2">
            <BookProcessingBadge processing={processing} />
          </div>
        </div>
        <Button
          disabled={!canRetry || reprocess.isPending}
          onClick={retry}
          size="sm"
          type="button"
          variant="outline"
        >
          {reprocess.isPending ? (
            <Loader2 className="animate-spin" data-icon="inline-start" />
          ) : (
            <RefreshCw data-icon="inline-start" />
          )}
          {processing.status === "FAILED" ? copy.retryLabel : copy.rebuildLabel}
        </Button>
      </div>

      <p className="mt-3 text-caption text-muted-foreground">
        {isWorking
          ? copy.workingDescription
          : processing.status === "READY"
            ? copy.readyDescription(processing.pageCount)
            : copy.idleDescription}
      </p>

      {processing.status === "PENDING" || processing.status === "PROCESSING" ? (
        <p className="mt-2 flex items-center gap-2 text-micro uppercase text-gold">
          <Loader2 aria-hidden className="size-3 animate-spin" />
          {copy.pollingLabel}
        </p>
      ) : null}

      {processing.error ? (
        <p className="mt-3 flex items-start gap-2 border border-destructive/30 bg-destructive/5 px-3 py-2 text-caption text-destructive">
          <AlertTriangle aria-hidden className="mt-0.5 size-3.5 shrink-0" />
          {processing.error}
        </p>
      ) : null}
    </div>
  );
}
