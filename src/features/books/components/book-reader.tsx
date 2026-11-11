"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, LockKeyhole } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildSignInHref } from "@/lib/auth-redirect";
import { booksContent } from "../content/books-content";
import { useBookPurchaseGate } from "../hooks/use-book-purchase-gate";
import { formatBookPrice } from "../lib/format-book-price";
import type { BookReader } from "../types/book";
import { BookPurchaseDialog } from "./book-purchase-dialog";

const BookFlipbook = dynamic(
  () => import("./book-flipbook").then((module) => module.BookFlipbook),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[26rem] w-full items-center justify-center border border-border bg-card">
        <p className="text-caption text-muted-foreground">
          Arranging the pages…
        </p>
      </div>
    ),
  },
);

export function BookReaderView({ data }: { data: BookReader }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, isPending, requireSignedIn } = useBookPurchaseGate(
    data.book.slug,
  );
  const shouldResumePurchase = searchParams.get("purchase") === "1";
  const [purchaseOpen, setPurchaseOpen] = useState(shouldResumePurchase);
  const { book, access, pages } = data;
  const copy = booksContent.reader;
  // Trust the reader response only while the session check is in flight. Once
  // we know the reader is signed out, a cached full-access payload must not
  // keep the complete edition open on screen.
  const hasFullAccess = access.hasFullAccess && (isPending || Boolean(user));
  const visiblePages = hasFullAccess
    ? pages
    : pages.map((page) =>
        page.pageNumber > access.freePreviewPages
          ? { ...page, locked: true, imageUrl: null }
          : page,
      );
  const purchaseDialogOpen = purchaseOpen && !isPending && Boolean(user);

  useEffect(() => {
    if (!shouldResumePurchase || isPending) return;

    if (!user) {
      router.replace(buildSignInHref(`${pathname}?purchase=1`));
      return;
    }

    window.history.replaceState(null, "", pathname);
  }, [isPending, pathname, router, user, shouldResumePurchase]);

  async function handleUnlock() {
    const isSignedIn = await requireSignedIn();
    if (isSignedIn) {
      setPurchaseOpen(true);
    }
  }

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1240px] px-6 pt-8 md:pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            className="inline-flex items-center gap-2 text-micro uppercase text-muted-foreground transition-colors hover:text-foreground"
            href={`/books/${book.slug}`}
          >
            <ArrowLeft className="size-3.5" />
            {copy.backLabel}
          </Link>
          <Badge
            className="h-auto gap-1.5 rounded-sm border border-gold/40 bg-gold/10 px-2 py-1 text-micro uppercase text-gold"
            variant="outline"
          >
            {hasFullAccess ? (
              <BookOpen aria-hidden className="size-3" />
            ) : (
              <LockKeyhole aria-hidden className="size-3" />
            )}
            {hasFullAccess ? copy.fullBadge : copy.freeBadge}
          </Badge>
        </div>
      </div>

      <header className="mx-auto mt-8 w-full max-w-[1240px] px-6 text-center">
        <p className="text-micro uppercase tracking-[0.14em] text-gold">
          {copy.eyebrow}
        </p>
        <h1 className="mt-4 font-display text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
          {book.title}
        </h1>
        <p className="mt-3 text-caption uppercase tracking-[0.14em] text-muted-foreground">
          {book.author}
        </p>
      </header>

      <section className="relative mx-auto mt-8 w-full max-w-[1240px] px-3 pb-12 sm:px-6 md:mt-10 md:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-10 bottom-32 bg-gold/5 blur-3xl"
        />
        <div className="relative border border-border bg-secondary/40 px-2 py-6 sm:px-6 md:px-10 md:py-10">
          <BookFlipbook
            hasFullAccess={hasFullAccess}
            onUnlock={() => {
              void handleUnlock();
            }}
            pages={visiblePages}
            title={book.title}
          />
        </div>

        {hasFullAccess ? (
          <div className="mx-auto mt-8 max-w-xl border border-gold/35 bg-gold/5 p-5 text-center">
            <p className="text-micro uppercase text-gold">
              {copy.fullNoticeTitle}
            </p>
            <p className="mt-2 text-caption text-muted-foreground">
              {copy.fullNotice}
            </p>
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-xl border border-gold/35 bg-gold/5 p-5 text-center">
            <p className="text-micro uppercase text-gold">
              {copy.freeNoticeTitle}
            </p>
            <p className="mt-2 text-caption text-muted-foreground">
              {copy.freeNotice(access.freePreviewPages, access.totalPages)}
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                void handleUnlock();
              }}
              size="lg"
              type="button"
            >
              {copy.unlockLabel}
              <span aria-hidden className="mx-1 h-3 w-px bg-primary-foreground/30" />
              <span className="tabular-nums">
                {formatBookPrice(access.price, access.currency)}
              </span>
            </Button>
            <p className="mt-2.5 text-caption italic text-muted-foreground">
              {booksContent.detail.purchaseNote}
            </p>
          </div>
        )}
      </section>

      <BookPurchaseDialog
        access={access}
        book={book}
        onOpenChange={setPurchaseOpen}
        open={purchaseDialogOpen}
      />
    </main>
  );
}
