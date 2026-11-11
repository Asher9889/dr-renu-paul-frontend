import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { Button } from "@/components/ui/button";
import { adminBooksContent } from "../content/admin-books-content";

export function BooksEmpty({ isFiltered, onReset }: { isFiltered: boolean; onReset: () => void }) {
  const copy = adminBooksContent.list.empty;

  return (
    <div className="border border-border bg-card p-10 md:p-16">
      <SectionEyebrow text={copy.eyebrow} />
      <h2 className="mt-4 text-heading">
        {isFiltered ? (
          copy.filteredTitle
        ) : (
          <>
            {copy.titleLead}{" "}
            <em className="font-display italic text-primary">{copy.titleItalic}</em>
          </>
        )}
      </h2>
      <p className="mt-4 max-w-md text-caption text-muted-foreground">
        {isFiltered ? copy.filteredDescription : copy.description}
      </p>
      {isFiltered ? (
        <Button className="mt-6 px-0 text-micro uppercase underline decoration-border underline-offset-8 hover:decoration-gold" onClick={onReset} type="button" variant="link">
          {copy.filteredActionLabel}
        </Button>
      ) : (
        <Link className="mt-6 inline-flex items-center gap-2 text-micro font-medium uppercase underline decoration-border underline-offset-8 transition-colors hover:decoration-gold" href="/admin/books/new">
          {copy.actionLabel}
          <ArrowRight aria-hidden className="size-3.5 text-gold" />
        </Link>
      )}
    </div>
  );
}
