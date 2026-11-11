import { Suspense } from "react";

import { BookDetailPage } from "@/features/books";

export default function BookDetailRoute({ params }: PageProps<"/books/[slug]">) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1240px] px-6 py-16 text-caption text-muted-foreground">
          Opening the edition…
        </div>
      }
    >
      <BookDetailPage params={params} />
    </Suspense>
  );
}
