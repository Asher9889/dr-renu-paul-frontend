"use client";

import { type ChangeEvent, useRef, useState } from "react";
import { FileText, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { getAdminBookError } from "../api/get-admin-book-error";
import { adminBooksContent } from "../content/admin-books-content";
import { useUploadAdminBookMedia } from "../hooks/use-upload-admin-book-media";
import type { BookEbook } from "../types/book";
import { cn } from "@/lib/utils";

const ACCEPTED_EBOOK_TYPES = ["application/pdf"];
const MAXIMUM_EBOOK_BYTES = 50 * 1024 * 1024;

function formatFileSize(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type BookEbookFieldProps = {
  value: BookEbook | null;
  onChange: (value: BookEbook | null) => void;
  invalid?: boolean;
};

export function BookEbookField({ value, onChange, invalid }: BookEbookFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadAdminBookMedia();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const copy = adminBooksContent.editor.ebook;
  const toasts = adminBooksContent.editor.toasts;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!ACCEPTED_EBOOK_TYPES.includes(file.type)) {
      toast.error(toasts.uploadError, { description: copy.invalidTypeLabel });
      return;
    }
    if (file.size > MAXIMUM_EBOOK_BYTES) {
      toast.error(toasts.uploadError, { description: copy.tooLargeLabel });
      return;
    }
    setUploadError(null);
    upload.mutate(
      { kind: "ebook", file },
      {
        onSuccess: (media) => {
          if (!media.storageKey) {
            setUploadError("The upload did not return a stored file. Please try again.");
            toast.error(toasts.uploadError);
            return;
          }
          onChange({
            storageKey: media.storageKey,
            fileName: media.fileName ?? file.name,
            mimeType: "application/pdf",
            sizeBytes: media.sizeBytes,
          });
          toast.success(toasts.ebookUploaded);
        },
        onError: (error) => {
          const parsed = getAdminBookError(error);
          setUploadError(parsed.message);
          toast.error(toasts.uploadError, { description: parsed.message });
        },
      },
    );
  }

  return (
    <section aria-labelledby="ebook-field-label">
      <div className="flex items-baseline justify-between">
        <span className="text-micro uppercase text-muted-foreground" id="ebook-field-label">{copy.label}</span>
        {value ? <span className="text-micro uppercase tabular-nums text-muted-foreground/70">{formatFileSize(value.sizeBytes)}</span> : null}
      </div>
      <input accept=".pdf,application/pdf" aria-label={copy.uploadLabel} className="sr-only" onChange={handleFileChange} ref={inputRef} type="file" />

      {value ? (
        <div className="mt-3 flex items-center gap-4 border border-border bg-secondary/30 p-4">
          <FileText className="size-6 shrink-0 text-gold" strokeWidth={1.4} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-caption text-foreground">{value.fileName}</p>
            <p className="mt-0.5 text-micro uppercase text-muted-foreground/70">PDF · {formatFileSize(value.sizeBytes)}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Button disabled={upload.isPending} onClick={() => inputRef.current?.click()} size="sm" type="button" variant="outline">
              {upload.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Upload data-icon="inline-start" />}
              {copy.replaceLabel}
            </Button>
            <Button disabled={upload.isPending} onClick={() => onChange(null)} size="icon-sm" type="button" variant="ghost">
              <X />
              <span className="sr-only">{copy.removeLabel}</span>
            </Button>
          </div>
        </div>
      ) : (
        <button
          className={cn("mt-3 flex w-full flex-col items-center justify-center gap-3 border border-dashed border-border bg-secondary/30 px-6 py-10 text-center transition-colors hover:border-gold/60 hover:bg-secondary/50", invalid && "border-destructive")}
          disabled={upload.isPending}
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          {upload.isPending ? <Loader2 className="size-5 animate-spin text-muted-foreground" /> : <FileText className="size-5 text-gold" strokeWidth={1.4} />}
          <span className="flex flex-col gap-1">
            <span className="text-caption text-foreground">{upload.isPending ? copy.uploadingLabel : copy.uploadLabel}</span>
            <span className="text-micro uppercase text-muted-foreground/70">{copy.uploadHint}</span>
          </span>
        </button>
      )}

      {uploadError ? <p className="mt-2 text-sm text-destructive">{uploadError}</p> : null}
    </section>
  );
}
