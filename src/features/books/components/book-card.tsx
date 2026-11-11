import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { booksContent } from "../content/books-content";
import { formatBookPrice } from "../lib/format-book-price";
import type { BookSummary } from "../types/book";

export function BookCard({ book, index }: { book: BookSummary; index: number }) {
  const copy = booksContent.listing;

  return (
    <Link
      className="group flex h-full flex-col border-b border-r border-border bg-background p-5 transition-colors duration-[var(--duration-state)] ease-[var(--ease-quiet)] hover:bg-card md:p-7"
      href={`/books/${book.slug}`}
      prefetch
    >
      <div className="relative aspect-[3/4] overflow-hidden border border-border bg-muted">
        {book.cover ? (
          <Image
            alt={book.cover.alt}
            className="object-cover transition-transform duration-[var(--duration-reveal)] ease-[var(--ease-editorial)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            src={book.cover.url}
          />
        ) : (
          <span className="flex h-full items-center justify-center px-4 text-center text-micro uppercase text-muted-foreground/70">{book.title}</span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        {book.category ? (
          <Badge className="h-auto rounded-sm px-2 py-1 text-micro uppercase text-muted-foreground" variant="secondary">
            {book.category}
          </Badge>
        ) : <span />}
        <span className="text-micro tabular-nums text-gold">({String(index + 1).padStart(2, "0")})</span>
      </div>

      <h2 className="mt-4 font-display text-title leading-snug text-balance decoration-gold/60 underline-offset-4 group-hover:underline">
        {book.title}
      </h2>
      <p className="mt-1 text-caption text-muted-foreground">{book.author}</p>
      <p className="mt-3 line-clamp-3 text-caption text-muted-foreground">{book.description}</p>

      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <div>
          <p className="text-micro uppercase text-gold">{copy.freeLabel}</p>
          <p className="mt-1 text-caption tabular-nums text-muted-foreground">
            {book.freePreviewPages} {copy.pagesLabel} / {book.totalPages}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-caption tabular-nums text-muted-foreground">{formatBookPrice(book.price, book.currency)}</span>
          <ArrowUpRight aria-hidden className="size-4 text-gold transition-transform duration-[var(--duration-state)] ease-[var(--ease-quiet)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
        </div>
      </div>
    </Link>
  );
}
