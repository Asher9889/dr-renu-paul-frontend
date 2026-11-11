"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getPublicBookError } from "../api/get-public-book-error";
import { booksContent } from "../content/books-content";
import { useBookReader } from "../hooks/use-book-reader";
import { BookReaderView } from "./book-reader";

export function BookReaderPage({ slug }: { slug: string }) {
  const query = useBookReader(slug);
  const copy = booksContent.reader;

  if (query.isPending) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
        <Loader2 className="size-5 animate-spin text-gold" />
        <p className="mt-4 text-micro uppercase text-muted-foreground">
          {copy.loadingLabel}
        </p>
      </main>
    );
  }

  if (query.isError || !query.data) {
    const error = getPublicBookError(query.error);
    const isPreparing = error.status === 409;
    const isMissing = error.status === 404;

    return (
      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1240px] px-6 pt-10 md:pt-14">
          <Link
            className="inline-flex items-center gap-2 text-micro uppercase text-muted-foreground transition-colors hover:text-foreground"
            href={isMissing ? "/books" : `/books/${slug}`}
          >
            <ArrowLeft className="size-3.5" />
            {isMissing ? booksContent.detail.backLabel : copy.backLabel}
          </Link>

          <div className="mx-auto mt-16 max-w-xl border border-border bg-card p-8 text-center md:p-12">
            <p className="text-micro uppercase tracking-[0.14em] text-gold">
              {isPreparing ? "In preparation" : "Unavailable"}
            </p>
            <h1 className="mt-5 font-display text-subheading text-balance">
              {isPreparing
                ? copy.preparingTitle
                : isMissing
                  ? copy.notFoundTitle
                  : copy.unavailableTitle}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-caption leading-relaxed text-muted-foreground">
              {isPreparing
                ? copy.preparingDescription
                : isMissing
                  ? copy.notFoundDescription
                  : error.message}
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {!isMissing ? (
                <Button
                  disabled={query.isFetching}
                  onClick={() => query.refetch()}
                  type="button"
                >
                  {query.isFetching ? (
                    <Loader2 className="animate-spin" data-icon="inline-start" />
                  ) : null}
                  {copy.checkAgainLabel}
                </Button>
              ) : null}
              <Button asChild type="button" variant="outline">
                <Link href={`/books/${slug}`}>
                  {booksContent.detail.backLabel}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return <BookReaderView data={query.data} />;
}
