"use client";

import { usePublicBooks } from "../hooks/use-public-books";
import type { PublicBookListResult } from "../api/list-public-books";
import { BooksGrid } from "./books-grid";
import { BooksPageHeader } from "./books-page-header";

export function BooksPage({ initialData }: { initialData: PublicBookListResult }) {
  const query = usePublicBooks(initialData);
  const result = query.data ?? initialData;

  return (
    <main className="flex-1">
      <BooksPageHeader count={result.meta.total} />
      <section className="mx-auto w-full max-w-[1240px] px-6 py-12 md:py-16">
        <BooksGrid books={result.books} />
      </section>
    </main>
  );
}
