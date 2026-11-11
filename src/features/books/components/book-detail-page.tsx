"use client";

import { useQuery } from "@tanstack/react-query";
import { getPublicBook } from "../api/get-public-book";

export function BookDetailPage({ slug }: { slug: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["public-book", slug],
    queryFn: () => getPublicBook(slug),
  });

  if (isLoading) return <p>Loading book…</p>;
  if (!data) return <p>Book not found.</p>;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">{data.title}</h1>
      <p className="mt-1 text-muted-foreground">{data.author}</p>
      <p className="mt-4">{data.description}</p>
      <p className="mt-4 text-sm">
        Free preview: {data.freePreviewPages} of {data.totalPages} pages. Purchase to read the rest.
      </p>
    </main>
  );
}
