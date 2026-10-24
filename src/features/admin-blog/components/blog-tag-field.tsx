"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AdminBlogEditorContent } from "@/features/admin-blog/types/admin-blog-content";
import { cn } from "@/lib/utils";

const MAXIMUM_TAGS = 20;
const MAXIMUM_TAG_LENGTH = 60;

type BlogTagFieldProps = {
  value: string[];
  onChange: (value: string[]) => void;
  content: AdminBlogEditorContent["tags"];
  invalid?: boolean;
  error?: string;
};

export function BlogTagField({
  value,
  onChange,
  content,
  invalid,
  error,
}: BlogTagFieldProps) {
  const [draft, setDraft] = useState("");

  function addTag(rawValue: string) {
    const tag = rawValue
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, MAXIMUM_TAG_LENGTH);

    if (!tag) {
      return;
    }

    if (
      value.length >= MAXIMUM_TAGS ||
      value.some((existingTag) => existingTag.toLowerCase() === tag.toLowerCase())
    ) {
      setDraft("");
      return;
    }

    onChange([...value, tag]);
    setDraft("");
  }

  function removeTag(tagToRemove: string) {
    onChange(value.filter((tag) => tag !== tagToRemove));
  }

  return (
    <section aria-labelledby="tag-field-label">
      <Label
        className="text-micro uppercase text-muted-foreground"
        htmlFor="blog-tags-input"
        id="tag-field-label"
      >
        {content.label}
      </Label>

      {value.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {value.map((tag) => (
            <li key={tag}>
              <Badge
                className="h-6 gap-1 rounded-sm bg-secondary pr-1 pl-2 text-caption font-normal text-foreground"
                variant="secondary"
              >
                {tag}
                <button
                  aria-label={`${content.removeLabel}: ${tag}`}
                  className="rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => removeTag(tag)}
                  type="button"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-caption text-muted-foreground/70">
          {content.emptyLabel}
        </p>
      )}

      <Input
        aria-invalid={invalid ? true : undefined}
        className={cn("mt-3", invalid && "border-destructive")}
        id="blog-tags-input"
        maxLength={MAXIMUM_TAG_LENGTH}
        onBlur={() => addTag(draft)}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addTag(draft);
            return;
          }

          if (
            event.key === "Backspace" &&
            draft.length === 0 &&
            value.length > 0
          ) {
            removeTag(value[value.length - 1]);
          }
        }}
        placeholder={content.placeholder}
        value={draft}
      />
      {error ? (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      ) : (
        <p className="mt-2 text-micro uppercase text-muted-foreground/70">
          {content.helper}
        </p>
      )}
    </section>
  );
}
