"use client";

import { type FormEvent, useState } from "react";
import type { Editor } from "@tiptap/react";

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
import type { AdminBlogEditorContent } from "@/features/admin-blog/types/admin-blog-content";

type BlogEditorLinkDialogProps = {
  editor: Editor | null;
  content: AdminBlogEditorContent["linkDialog"];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type BlogEditorLinkFormProps = {
  editor: Editor;
  content: AdminBlogEditorContent["linkDialog"];
  onClose: () => void;
};

function normalizeUrl(value: string): string | null {
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

function BlogEditorLinkForm({
  editor,
  content,
  onClose,
}: BlogEditorLinkFormProps) {
  const existingHref = editor.getAttributes("link").href as string | undefined;
  const [url, setUrl] = useState(existingHref ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError(content.invalidLabel);
      return;
    }

    const href = normalizeUrl(trimmedUrl);
    if (!href) {
      setError(content.invalidLabel);
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href, target: "_blank", rel: "noopener noreferrer" })
      .run();

    onClose();
  }

  function handleRemove() {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <SectionEyebrow text={content.eyebrow} />
        <DialogTitle className="font-display text-subheading font-normal">
          {content.title}
        </DialogTitle>
        <DialogDescription>{content.description}</DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-2">
        <Label className="text-micro uppercase" htmlFor="editor-link-url">
          {content.label}
        </Label>
        <Input
          aria-invalid={error ? true : undefined}
          autoComplete="url"
          id="editor-link-url"
          inputMode="url"
          onChange={(event) => {
            setUrl(event.target.value);
            setError(null);
          }}
          placeholder={content.placeholder}
          value={url}
        />
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </div>

      <DialogFooter className="mt-8 sm:justify-between">
        <div>
          {existingHref ? (
            <Button onClick={handleRemove} type="button" variant="ghost">
              {content.removeLabel}
            </Button>
          ) : null}
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button onClick={onClose} type="button" variant="outline">
            {content.cancel}
          </Button>
          <Button type="submit">{content.confirm}</Button>
        </div>
      </DialogFooter>
    </form>
  );
}

export function BlogEditorLinkDialog({
  editor,
  content,
  open,
  onOpenChange,
}: BlogEditorLinkDialogProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-md">
        {editor ? (
          <BlogEditorLinkForm
            content={content}
            editor={editor}
            onClose={() => onOpenChange(false)}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
