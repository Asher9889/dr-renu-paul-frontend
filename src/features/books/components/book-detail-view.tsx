"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, BookOpen, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { booksContent } from "../content/books-content";
import { useBookAccess } from "../hooks/use-book-access";
import { usePublicBook } from "../hooks/use-public-book";
import { formatBookPrice } from "../lib/format-book-price";
import type { BookDetail } from "../types/book";
import { BookPurchaseDialog } from "./book-purchase-dialog";

export function BookDetailView({ initialBook }: { initialBook: BookDetail }) {
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const query = usePublicBook(initialBook.slug, initialBook);
  const accessQuery = useBookAccess(initialBook.slug);
  const book = query.data ?? initialBook;
  const access = accessQuery.data?.access ?? null;
  const copy = booksContent.detail;

  const processing = book.processing;
  const isReadable = processing.status === "READY" && book.totalPages > 0;
  const totalPages = processing.pageCount > 0 ? processing.pageCount : book.totalPages;
  const hasFullAccess = access?.hasFullAccess ?? false;
  const needsPurchase = book.price > 0 && !hasFullAccess;

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1240px] px-6 pt-10 md:pt-14">
        <Link className="inline-flex items-center gap-2 text-micro uppercase text-muted-foreground transition-colors hover:text-foreground" href="/books">
          <ArrowLeft className="size-3.5" />
          {copy.backLabel}
        </Link>
      </div>

      <section className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 pb-14 pt-8 md:grid-cols-12 md:gap-14 md:pb-20 md:pt-12">
        <figure className="md:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden border border-border bg-muted">
            {book.cover ? (
              <Image alt={book.cover.alt} className="object-cover" fill priority sizes="(min-width: 768px) 480px, 100vw" src={book.cover.url} />
            ) : (
              <span className="flex h-full items-center justify-center px-6 text-center font-display text-subheading">{book.title}</span>
            )}
          </div>
          <figcaption className="mt-3 text-caption italic text-muted-foreground">{copy.figureLabel}</figcaption>
        </figure>

        <div className="flex flex-col justify-center md:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            {book.category ? (
              <Badge className="h-auto w-fit rounded-sm px-2 py-1 text-micro uppercase text-muted-foreground" variant="secondary">{book.category}</Badge>
            ) : null}
            {hasFullAccess ? (
              <Badge className="h-auto w-fit rounded-sm border border-gold/40 bg-gold/10 px-2 py-1 text-micro uppercase text-gold" variant="outline">
                <BookOpen aria-hidden className="size-3" />
                {copy.fullAccessLabel}
              </Badge>
            ) : isReadable ? (
              <Badge className="h-auto w-fit rounded-sm px-2 py-1 text-micro uppercase text-muted-foreground" variant="outline">
                {copy.previewAccessLabel}
              </Badge>
            ) : null}
          </div>
          <h1 className="mt-5 text-heading">{book.title}</h1>
          {book.subtitle ? <p className="mt-3 font-display text-subheading text-muted-foreground">{book.subtitle}</p> : null}
          <p className="mt-4 text-caption uppercase tracking-[0.14em] text-gold">{book.author}</p>
          <p className="mt-6 max-w-xl text-body text-muted-foreground">{book.description}</p>

          <Separator className="my-8" />

          <dl className="grid grid-cols-2 gap-x-8 gap-y-5 text-caption sm:grid-cols-3">
            <div>
              <dt className="text-micro uppercase text-muted-foreground">{copy.pagesLabel}</dt>
              <dd className="mt-1 tabular-nums">{totalPages > 0 ? totalPages : "—"}</dd>
            </div>
            {/* <div>
              <dt className="text-micro uppercase text-muted-foreground">{copy.previewLabel}</dt>
              <dd className="mt-1 tabular-nums">{book.freePreviewPages}</dd>
            </div> */}
            <div>
              <dt className="text-micro uppercase text-muted-foreground">{copy.languageLabel}</dt>
              <dd className="mt-1 uppercase">{book.language}</dd>
            </div>
          </dl>

          {/* <div className="mt-8 border border-gold/35 bg-gold/5 p-5">
            <div className="flex items-start gap-3">
              <Lock aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
              <div>
                <p className="text-micro uppercase text-gold">
                  {isReadable ? copy.previewLabel : copy.processingTitle}
                </p>
                <p className="mt-1 text-caption text-muted-foreground">
                  {isReadable
                    ? `${copy.previewCount(book.freePreviewPages, totalPages)}. ${copy.previewDescription}`
                    : copy.processingDescription}
                </p>
              </div>
            </div>
          </div> */}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            {isReadable ? (
              <Button asChild size="lg">
                <Link href={`/books/${book.slug}/read`}>
                  {hasFullAccess ? copy.continueReadingLabel : copy.readPreviewLabel}
                  <ArrowUpRight data-icon="inline-end" />
                </Link>
              </Button>
            ) : (
              <Button disabled size="lg" type="button">
                {copy.processingTitle}
              </Button>
            )}
            {/* {needsPurchase ? (
              <Button onClick={() => setPurchaseOpen(true)} size="lg" type="button" variant="outline">
                {copy.buyLabel}
                <span aria-hidden className="mx-1 h-3.5 w-px bg-border" />
                <span className="tabular-nums">{formatBookPrice(book.price, book.currency)}</span>
              </Button>
            ) : null} */}
            {!needsPurchase && hasFullAccess && isReadable ? (
              <Button asChild size="lg" variant="outline">
                <Link href="/books">{copy.backLabel}</Link>
              </Button>
            ) : null}
          </div>
          <p className="mt-3 text-caption italic text-muted-foreground">{copy.purchaseNote}</p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-6 py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-4">
            <p className="text-micro uppercase tracking-[0.14em] text-gold">{copy.aboutLabel}</p>
          </div>
          <div className="md:col-span-8">
            <p className="max-w-2xl text-body text-muted-foreground">{book.description}</p>
            <div className="mt-8 border border-border bg-card p-6">
              <p className="text-micro uppercase text-gold">{copy.lockedTitle}</p>
              <p className="mt-2 max-w-md text-caption text-muted-foreground">{copy.lockedDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <BookPurchaseDialog
        access={access}
        book={book}
        onOpenChange={setPurchaseOpen}
        open={purchaseOpen}
      />
    </main>
  );
}
