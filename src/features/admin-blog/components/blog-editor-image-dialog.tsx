"use client";

import Image from "next/image";
import { type ChangeEvent, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { ImagePlus, Loader2, Upload } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAdminBlogError } from "@/features/admin-blog/api/get-admin-blog-error";
import { useUploadBlogMedia } from "@/features/admin-blog/hooks/use-upload-blog-media";
import type { AdminBlogEditorContent } from "@/features/admin-blog/types/admin-blog-content";
import type { AdminBlogMedia } from "@/features/admin-blog/types/blog";
import { cn } from "@/lib/utils";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];
const MAXIMUM_IMAGE_BYTES = 8 * 1024 * 1024;

type BlogEditorImageDialogProps = {
  editor: Editor | null;
  content: AdminBlogEditorContent["imageDialog"];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function BlogEditorImageDialog({
  editor,
  content,
  open,
  onOpenChange,
}: BlogEditorImageDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadBlogMedia();
  const [media, setMedia] = useState<AdminBlogMedia | null>(null);
  const [alt, setAlt] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setMedia(null);
      setAlt("");
      setError(null);
    }

    onOpenChange(nextOpen);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError(content.invalidTypeLabel);
      return;
    }

    if (file.size > MAXIMUM_IMAGE_BYTES) {
      setError(content.tooLargeLabel);
      return;
    }

    setError(null);
    upload.mutate(file, {
      onSuccess: (uploadedMedia) => {
        setMedia(uploadedMedia);
      },
      onError: (uploadError) => {
        setError(getAdminBlogError(uploadError).message);
      },
    });
  }

  function handleInsert() {
    if (!editor || !media) {
      setError(content.invalidLabel);
      return;
    }

    editor
      .chain()
      .focus()
      .setImage({
        src: media.url,
        alt: alt.trim(),
        title: alt.trim(),
      })
      .run();

    handleOpenChange(false);
  }

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent className="max-h-dvh overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <SectionEyebrow text={content.eyebrow} />
          <DialogTitle className="font-display text-subheading font-normal">
            {content.title}
          </DialogTitle>
          <DialogDescription>{content.description}</DialogDescription>
        </DialogHeader>

        <input
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          aria-label={content.uploadLabel}
          className="sr-only"
          onChange={handleFileChange}
          ref={inputRef}
          type="file"
        />

        {media ? (
          <div className="mt-6 space-y-4">
            <div className="flex justify-center border border-border bg-muted p-2">
              <Image
                alt={alt || content.altPlaceholder}
                className="h-auto max-h-64 w-auto max-w-full object-contain"
                height={media.height}
                src={media.url}
                width={media.width}
              />
            </div>
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
            <div className="space-y-2">
              <Label className="text-micro uppercase" htmlFor="editor-image-alt">
                {content.altLabel}
              </Label>
              <Input
                id="editor-image-alt"
                maxLength={300}
                onChange={(event) => setAlt(event.target.value)}
                placeholder={content.altPlaceholder}
                value={alt}
              />
            </div>
          </div>
        ) : (
          <button
            className={cn(
              "mt-6 flex w-full flex-col items-center justify-center gap-3 border border-dashed border-border bg-secondary/30 px-6 py-10 text-center transition-colors hover:border-gold/60 hover:bg-secondary/50",
              error && "border-destructive",
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

        {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}

        <DialogFooter className="mt-8">
          <Button onClick={() => handleOpenChange(false)} type="button" variant="outline">
            {content.cancel}
          </Button>
          <Button disabled={!media || upload.isPending} onClick={handleInsert} type="button">
            {content.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
