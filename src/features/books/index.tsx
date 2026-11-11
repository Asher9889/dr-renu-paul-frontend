import { notFound } from "next/navigation";

import { getPublicBook } from "./api/get-public-book";
import { listPublicBooks } from "./api/list-public-books";
import { BookDetailView } from "./components/book-detail-view";
import { BooksPage } from "./components/books-page";

export async function BooksListing() {
  const result = await listPublicBooks();
  return <BooksPage initialData={result} />;
}

export async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = await getPublicBook(slug).catch(() => null);

  if (!book) {
    notFound();
  }

  return <BookDetailView initialBook={book} />;
}

export { BooksPage } from "./components/books-page";
export { BookDetailView } from "./components/book-detail-view";
export { BookReaderPage } from "./components/book-reader-page";
