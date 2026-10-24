import Link from "next/link";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { Button } from "@/components/ui/button";
import type { AdminBlogListContent } from "@/features/admin-blog/types/admin-blog-content";

type BlogPostsEmptyProps = {
  content: AdminBlogListContent["empty"];
  isFiltered: boolean;
  onReset: () => void;
  newNoteLabel: string;
};

export function BlogPostsEmpty({
  content,
  isFiltered,
  onReset,
  newNoteLabel,
}: BlogPostsEmptyProps) {
  return (
    <div className="py-20 md:py-24">
      <SectionEyebrow text={content.eyebrow} />

      {isFiltered ? (
        <>
          <h2 className="mt-4 max-w-xl text-subheading">
            {content.filteredTitle}
          </h2>
          <p className="mt-4 max-w-md text-caption text-muted-foreground">
            {content.filteredDescription}
          </p>
          <Button className="mt-8" onClick={onReset} variant="outline">
            {content.filteredActionLabel}
          </Button>
        </>
      ) : (
        <>
          <h2 className="mt-4 max-w-xl text-subheading">
            {content.titleLead}{" "}
            <em className="font-display italic text-primary">
              {content.titleItalic}
            </em>
          </h2>
          <p className="mt-4 max-w-md text-caption text-muted-foreground">
            {content.description}
          </p>
          <Button asChild className="mt-8">
            <Link href="/admin/blogs/new">{newNoteLabel}</Link>
          </Button>
        </>
      )}
    </div>
  );
}
