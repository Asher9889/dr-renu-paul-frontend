"use client";

import Image from "next/image";
import { type ChangeEvent, useRef, useState } from "react";
import { ImagePlus, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAdminBookError } from "../api/get-admin-book-error";
import { adminBooksContent } from "../content/admin-books-content";
import { useUploadAdminBookMedia } from "../hooks/use-upload-admin-book-media";
import type { BookCover } from "../types/book";
import { cn } from "@/lib/utils";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAXIMUM_IMAGE_BYTES = 8 * 1024 * 1024;

type BookCoverFieldProps = {
  value: BookCover | null;
  onChange: (value: BookCover | null) => void;
  altFallback: string;
  invalid?: boolean;
  altError?: string;
};

export function BookCoverField({ value, onChange, altFallback, invalid, altError }: BookCoverFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadAdminBookMedia();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const copy = adminBooksContent.editor.cover;
  const toasts = adminBooksContent.editor.toasts;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error(toasts.uploadError, { description: "Choose a JPEG, PNG, WebP, or AVIF image." });
      return;
    }
    if (file.size > MAXIMUM_IMAGE_BYTES) {
      toast.error(toasts.uploadError, { description: "The image must be 8 MB or smaller." });
      return;
    }
    setUploadError(null);
    upload.mutate(
      { kind: "cover", file },
      {
        onSuccess: (media) => {
          if (!media.url) {
            setUploadError("The upload did not return an image URL. Please try again.");
            toast.error(toasts.uploadError);
            return;
          }
          onChange({
            url: media.url,
            alt: value?.alt ?? "",
            width: media.width ?? 0,
            height: media.height ?? 0,
          });
          toast.success(toasts.coverUploaded);
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
    <section aria-labelledby="cover-field-label">
      <div className="flex items-baseline justify-between">
        <Label className="text-micro uppercase text-muted-foreground" id="cover-field-label">{copy.label}</Label>
        {value ? (
          <span className="text-micro uppercase tabular-nums text-muted-foreground/70">
            {copy.dimensionsLabel} {value.width} × {value.height}
          </span>
        ) : null}
      </div>
      <input accept={ACCEPTED_IMAGE_TYPES.join(",")} aria-label={copy.uploadLabel} className="sr-only" onChange={handleFileChange} ref={inputRef} type="file" />

      {value ? (
        <div className="mt-3">
          <div className="relative aspect-[3/4] w-40 overflow-hidden border border-border bg-muted">
            <Image alt={value.alt || altFallback} className="object-cover" fill sizes="160px" src={value.url} />
            {upload.isPending ? (
              <div className="absolute inset-0 flex items-center justify-center bg-background/70">
                <span className="flex items-center gap-2 text-micro uppercase text-muted-foreground">
                  <Loader2 className="size-3.5 animate-spin" />{copy.uploadingLabel}
                </span>
              </div>
            ) : null}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Button disabled={upload.isPending} onClick={() => inputRef.current?.click()} size="sm" type="button" variant="outline">
              <Upload data-icon="inline-start" />{copy.replaceLabel}
            </Button>
            <Button disabled={upload.isPending} onClick={() => onChange(null)} size="sm" type="button" variant="ghost">
              <X data-icon="inline-start" />{copy.removeLabel}
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
          {upload.isPending ? <Loader2 className="size-5 animate-spin text-muted-foreground" /> : <ImagePlus className="size-5 text-gold" strokeWidth={1.4} />}
          <span className="flex flex-col gap-1">
            <span className="text-caption text-foreground">{upload.isPending ? copy.uploadingLabel : copy.uploadLabel}</span>
            <span className="text-micro uppercase text-muted-foreground/70">{copy.uploadHint}</span>
          </span>
        </button>
      )}

      {uploadError ? <p className="mt-2 text-sm text-destructive">{uploadError}</p> : null}

      {value ? (
        <div className="mt-4 space-y-2">
          <Label className="text-micro uppercase text-muted-foreground" htmlFor="cover-alt">{copy.altLabel}</Label>
          <Input
            aria-invalid={altError ? true : undefined}
            id="cover-alt"
            maxLength={300}
            onChange={(event) => onChange({ ...value, alt: event.target.value })}
            placeholder={copy.altPlaceholder}
            value={value.alt}
          />
          {altError ? <p className="text-sm text-destructive">{altError}</p> : null}
        </div>
      ) : null}
    </section>
  );
}
