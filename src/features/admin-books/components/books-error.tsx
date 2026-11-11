import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { Button } from "@/components/ui/button";
import { adminBooksContent } from "../content/admin-books-content";

export function BooksError({ onRetry }: { onRetry: () => void }) {
  const copy = adminBooksContent.list.error;
  return (
    <div className="border border-border bg-card p-10">
      <SectionEyebrow text={copy.eyebrow} />
      <h2 className="mt-4 font-display text-subheading">{copy.title}</h2>
      <p className="mt-3 max-w-md text-caption text-muted-foreground">{copy.description}</p>
      <Button className="mt-6" onClick={onRetry} variant="outline">{copy.retryLabel}</Button>
    </div>
  );
}
