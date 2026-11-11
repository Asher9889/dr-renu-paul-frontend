import { Suspense } from "react";

import { BooksListing } from "@/features/books";

export const metadata = { title: "Books" };

export default function BooksRoute() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1240px] px-6 py-16 text-caption text-muted-foreground">
          Opening the library…
        </div>
      }
    >
      <BooksListing />
    </Suspense>
  );
}
