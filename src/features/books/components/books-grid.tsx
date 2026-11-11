import { booksContent } from "../content/books-content";
import { BookCard } from "./book-card";
import type { BookSummary } from "../types/book";

export function BooksGrid({ books }: { books: BookSummary[] }) {
  const copy = booksContent.listing;

  if (books.length === 0) {
    return (
      <div className="border border-border bg-card p-10 md:p-16">
        <p className="font-display text-subheading">{copy.emptyTitle}</p>
        <p className="mt-3 max-w-md text-caption text-muted-foreground">{copy.emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book, index) => <BookCard book={book} index={index} key={book.id} />)}
    </div>
  );
}
