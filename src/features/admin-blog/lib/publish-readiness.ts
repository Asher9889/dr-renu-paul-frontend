import type { BlogPostFormValues } from "@/features/admin-blog/schema/blog-post-form.schema";
import { getDocumentStats } from "@/features/admin-blog/lib/tiptap-payload";

export type PublishChecklistItemId =
  | "title"
  | "excerpt"
  | "content"
  | "cover"
  | "tags";

export type PublishChecklistItem = {
  id: PublishChecklistItemId;
  complete: boolean;
  detail?: string;
};

export function getPublishChecklist(
  values: BlogPostFormValues,
): PublishChecklistItem[] {
  const excerptLength = values.excerpt.trim().length;
  const { words } = getDocumentStats(values.content);

  return [
    {
      id: "title",
      complete: values.title.trim().length > 0,
    },
    {
      id: "excerpt",
      complete: excerptLength >= 40 && excerptLength <= 200,
      detail: `${excerptLength}/200`,
    },
    {
      id: "content",
      complete: words > 0,
      detail: words > 0 ? `${words} words` : undefined,
    },
    {
      id: "cover",
      complete: Boolean(values.cover?.url && values.cover?.alt.trim()),
    },
    {
      id: "tags",
      complete: values.tags.length > 0,
      detail: values.tags.length > 0 ? `${values.tags.length}` : undefined,
    },
  ];
}

export function isReadyToPublish(
  checklist: PublishChecklistItem[],
): boolean {
  return checklist.every((item) => item.complete);
}
