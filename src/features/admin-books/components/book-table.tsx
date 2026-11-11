import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookCoverThumb } from "./book-cover-thumb";
import { BookProcessingBadge } from "./book-processing-badge";
import { BookRowActions } from "./book-row-actions";
import { BookStatusBadge } from "./book-status-badge";
import { adminBooksContent } from "../content/admin-books-content";
import { formatBookDate } from "../lib/format-book-date";
import { formatBookPrice } from "../lib/format-book-price";
import type { AdminBookSummary } from "../types/book";

export function BookTable({ books }: { books: AdminBookSummary[] }) {
  const copy = adminBooksContent.list;

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          <TableHead className="h-11 pl-0 text-micro font-medium uppercase text-muted-foreground">{copy.table.book}</TableHead>
          <TableHead className="h-11 text-micro font-medium uppercase text-muted-foreground">{copy.table.status}</TableHead>
          <TableHead className="hidden h-11 text-micro font-medium uppercase text-muted-foreground lg:table-cell">{copy.table.preview}</TableHead>
          <TableHead className="hidden h-11 text-micro font-medium uppercase text-muted-foreground xl:table-cell">{copy.table.price}</TableHead>
          <TableHead className="hidden h-11 text-micro font-medium uppercase text-muted-foreground xl:table-cell">{copy.table.updated}</TableHead>
          <TableHead className="h-11 pr-0 text-right text-micro font-medium uppercase text-muted-foreground"><span className="sr-only">{copy.table.actions}</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book) => (
          <TableRow className="border-border/80 align-middle" key={book.id}>
            <TableCell className="py-4 pl-0">
              <div className="flex items-center gap-4">
                <BookCoverThumb altFallback={book.title} className="h-20 w-14 shrink-0" cover={book.cover} noCoverLabel={copy.row.noCover} />
                <div className="min-w-0">
                  <Link className="line-clamp-1 font-display text-title leading-snug transition-colors hover:text-primary" href={`/admin/books/${book.id}`}>
                    {book.title}
                  </Link>
                  <p className="mt-1 line-clamp-1 text-caption text-muted-foreground">{book.author || book.slug}</p>
                  <div className="mt-1.5 flex items-center gap-2 text-micro uppercase text-muted-foreground/70">
                    <span className="text-gold">/{book.slug}</span>
                    <span aria-hidden>·</span>
                    <span className="tabular-nums">{book.totalPages} pages</span>
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col items-start gap-1.5">
                <BookStatusBadge status={book.status} />
                <BookProcessingBadge processing={book.processing} />
              </div>
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              <span className="text-caption tabular-nums text-muted-foreground">
                {book.freePreviewPages > 0 ? `${book.freePreviewPages} ${copy.row.freePagesSuffix}` : copy.row.noPreview}
              </span>
            </TableCell>
            <TableCell className="hidden xl:table-cell">
              <span className="text-caption tabular-nums">{formatBookPrice(book.price, book.currency)}</span>
            </TableCell>
            <TableCell className="hidden xl:table-cell">
              <time className="text-caption tabular-nums text-muted-foreground" dateTime={book.updatedAt}>{formatBookDate(book.updatedAt)}</time>
            </TableCell>
            <TableCell className="pr-0 text-right"><BookRowActions book={book} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
