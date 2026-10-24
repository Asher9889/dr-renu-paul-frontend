"use client";

import Image from "next/image";
import { type ChangeEvent, useRef, useState } from "react";
import { ImagePlus, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAdminBlogError } from "@/features/admin-blog/api/get-admin-blog-error";
import { useUploadBlogMedia } from "@/features/admin-blog/hooks/use-upload-blog-media";
import type {
  AdminBlogEditorContent,
  AdminBlogToasts,
} from "@/features/admin-blog/types/admin-blog-content";
import type { BlogCoverForm } from "@/features/admin-blog/types/blog";
import { cn } from "@/lib/utils";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];
const MAXIMUM_IMAGE_BYTES = 8 * 1024 * 1024;

type BlogCoverFieldProps = {
  value: BlogCoverForm | null;
  onChange: (value: BlogCoverForm | null) => void;
  content: AdminBlogEditorContent["cover"];
  toasts: AdminBlogToasts;
  altFallback: string;
  invalid?: boolean;
  fieldErrors?: {
    alt?: string;
    caption?: string;
  };
};

export function BlogCoverField({
  value,
  onChange,
  content,
  toasts,
  altFallback,
  invalid,
  fieldErrors,
}: BlogCoverFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadBlogMedia();
  const [uploadError, setUploadError] = useState<string | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error(toasts.uploadError, {
        description: toasts.invalidImageType,
      });
      return;
    }

    if (file.size > MAXIMUM_IMAGE_BYTES) {
      toast.error(toasts.uploadError, {
        description: toasts.imageTooLarge,
      });
      return;
    }

    setUploadError(null);
    upload.mutate(file, {
      onSuccess: (media) => {
        onChange({
          url: media.url,
          alt: value?.alt ?? "",
          caption: value?.caption ?? "",
          width: media.width,
          height: media.height,
        });
        toast.success(toasts.coverUploaded);
      },
      onError: (error) => {
        const parsed = getAdminBlogError(error);
        setUploadError(parsed.message);
        toast.error(toasts.uploadError, { description: parsed.message });
      },
    });
  }

  function updateCover(patch: Partial<BlogCoverForm>) {
    if (!value) {
      return;
    }
    onChange({ ...value, ...patch });
  }

  return (
    <section aria-labelledby="cover-field-label">
      <div className="flex items-baseline justify-between">
        <Label
          className="text-micro uppercase text-muted-foreground"
          id="cover-field-label"
        >
          {content.label}
        </Label>
        {value ? (
          <span className="text-micro uppercase tabular-nums text-muted-foreground/70">
            {content.dimensionsLabel} {value.width} × {value.height}
          </span>
        ) : null}
      </div>

      <input
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        aria-label={content.uploadLabel}
        className="sr-only"
        onChange={handleFileChange}
        ref={inputRef}
        type="file"
      />

      {value ? (
        <div className="mt-3">
          <div className="group relative aspect-[16/10] overflow-hidden border border-border bg-muted">
            <Image
              alt={value.alt || altFallback}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              src={value.url}
            />
            {upload.isPending ? (
              <div className="absolute inset-0 flex items-center justify-center bg-background/70">
                <span className="flex items-center gap-2 text-micro uppercase text-muted-foreground">
                  <Loader2 className="size-3.5 animate-spin" />
                  {content.uploadingLabel}
                </span>
              </div>
            ) : null}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Button
              disabled={upload.isPending}
              onClick={() => inputRef.current?.click()}
              size="sm"
              type="button"
              variant="outline"
            >
              <Upload data-icon="inline-start" />
              {content.replaceLabel}
            </Button>
            <Button
              disabled={upload.isPending}
              onClick={() => onChange(null)}
              size="sm"
              type="button"
              variant="ghost"
            >
              <X data-icon="inline-start" />
              {content.removeLabel}
            </Button>
          </div>
        </div>
      ) : (
        <button
          className={cn(
            "mt-3 flex w-full flex-col items-center justify-center gap-3 border border-dashed border-border bg-secondary/30 px-6 py-10 text-center transition-colors hover:border-gold/60 hover:bg-secondary/50",
            invalid && "border-destructive",
          )}
          disabled={upload.isPending}
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          {upload.isPending ? (
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          ) : (
            <ImagePlus className="size-5 text-gold" strokeWidth={1.4} />
          )}
          <span className="flex flex-col gap-1">
            <span className="text-caption text-foreground">
              {upload.isPending ? content.uploadingLabel : content.uploadLabel}
            </span>
            <span className="text-micro uppercase text-muted-foreground/70">
              {content.uploadHint}
            </span>
          </span>
        </button>
      )}

      {uploadError ? (
        <p className="mt-2 text-sm text-destructive">{uploadError}</p>
      ) : null}

      {value ? (
        <div className="mt-5 space-y-4">
          <div className="space-y-2">
            <Label
              className="text-micro uppercase text-muted-foreground"
              htmlFor="cover-alt"
            >
              {content.altLabel}
            </Label>
            <Input
              aria-invalid={fieldErrors?.alt ? true : undefined}
              id="cover-alt"
              maxLength={300}
              onChange={(event) => updateCover({ alt: event.target.value })}
              placeholder={content.altPlaceholder}
              value={value.alt}
            />
            {fieldErrors?.alt ? (
              <p className="text-sm text-destructive">{fieldErrors.alt}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label
              className="text-micro uppercase text-muted-foreground"
              htmlFor="cover-caption"
            >
              {content.captionLabel}
            </Label>
            <Textarea
              aria-invalid={fieldErrors?.caption ? true : undefined}
              className="min-h-20"
              id="cover-caption"
              maxLength={500}
              onChange={(event) =>
                updateCover({ caption: event.target.value })
              }
              placeholder={content.captionPlaceholder}
              value={value.caption}
            />
            {fieldErrors?.caption ? (
              <p className="text-sm text-destructive">
                {fieldErrors.caption}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
