import type { BookFormValues } from "../schema/book-form.schema";
import type { BookProcessing } from "../types/book";

export function getBookPublishIssues(
  values: BookFormValues,
  processing?: BookProcessing | null,
): string[] {
  const issues: string[] = [];
  if (!values.title.trim()) issues.push("A title is required.");
  if (!values.author.trim()) issues.push("An author is required.");
  if (!values.description.trim()) issues.push("A description is required.");
  if (!values.cover) issues.push("A cover image is required.");
  if (!values.ebook) issues.push("An ebook PDF is required.");
  if (values.freePreviewPages > values.totalPages && values.totalPages > 0)
    issues.push("Free preview pages cannot exceed total pages.");
  if (processing && processing.status !== "READY")
    issues.push("The reader pages are still being prepared.");
  return issues;
}

export function isBookReadyToPublish(
  values: BookFormValues,
  processing?: BookProcessing | null,
): boolean {
  return getBookPublishIssues(values, processing).length === 0;
}

export function isReaderPrepared(processing: BookProcessing | null): boolean {
  return processing?.status === "READY" && processing.pageCount > 0;
}
