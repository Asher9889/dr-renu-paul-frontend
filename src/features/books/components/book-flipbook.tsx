"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, LockKeyhole } from "lucide-react";
import HTMLFlipBook from "react-pageflip";

import { Button } from "@/components/ui/button";
import type { ReaderPage } from "../types/book";

type FlipBookApi = {
  flipNext: () => void;
  flipPrev: () => void;
  turnToPage: (page: number) => void;
  getCurrentPageIndex: () => number;
  getPageCount: () => number;
};

type FlipBookHandle = {
  pageFlip?: () => FlipBookApi | null;
};

type BookFlipbookProps = {
  pages: ReaderPage[];
  title: string;
  hasFullAccess: boolean;
  onUnlock: () => void;
};

export function BookFlipbook({
  pages,
  title,
  hasFullAccess,
  onUnlock,
}: BookFlipbookProps) {
  const flipRef = useRef<FlipBookHandle | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getFlip = useCallback((): FlipBookApi | null => {
    return flipRef.current?.pageFlip?.() ?? null;
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return;
      }

      const flip = getFlip();
      if (!flip) return;
      event.preventDefault();
      if (event.key === "ArrowLeft") flip.flipPrev();
      else flip.flipNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [getFlip]);

  const totalPages = pages.length;
  const displayedPage = Math.min(currentIndex + 1, totalPages);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full justify-center overflow-hidden py-2">
        <HTMLFlipBook
          autoSize
          className="book-flipbook"
          clickEventForward
          disableFlipByClick={false}
          drawShadow
          flippingTime={700}
          height={620}
          maxHeight={790}
          maxShadowOpacity={0.32}
          maxWidth={560}
          minHeight={394}
          minWidth={260}
          mobileScrollSupport
          onFlip={(event: { data: number }) => setCurrentIndex(event.data)}
          ref={flipRef as never}
          showCover
          showPageCorners
          size="stretch"
          startPage={0}
          startZIndex={0}
          style={{}}
          swipeDistance={30}
          useMouseEvents
          usePortrait
          width={440}
        >
          {pages.map((page) => (
            <div
              className="h-full w-full overflow-hidden bg-[#f7f2e7]"
              data-density={page.pageNumber === 1 ? "hard" : "soft"}
              key={page.pageNumber}
            >
              {page.locked || !page.imageUrl ? (
                <div className="relative flex h-full w-full flex-col items-center justify-center gap-5 overflow-hidden bg-[#16241d] px-7 text-center text-[#f4efe4]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-4 border border-[#c5a97a]/25"
                  />
                  <span className="text-micro uppercase tracking-[0.18em] text-[#c5a97a]">
                    Page {page.pageNumber}
                  </span>
                  <LockKeyhole
                    aria-hidden
                    className="size-6 text-[#c5a97a]"
                    strokeWidth={1.3}
                  />
                  <p className="max-w-[18rem] font-display text-2xl leading-snug">
                    This page opens with the complete edition.
                  </p>
                  <p className="max-w-[17rem] text-caption leading-relaxed text-[#d8cdb8]/70">
                    The free preview ends here. Unlock the remaining pages to keep
                    reading without interruption.
                  </p>
                  <button
                    className="mt-1 inline-flex h-9 items-center justify-center border border-[#c5a97a]/60 px-4 text-micro uppercase tracking-[0.14em] text-[#f4efe4] transition-colors hover:bg-[#c5a97a]/15"
                    onClick={(event) => {
                      event.stopPropagation();
                      onUnlock();
                    }}
                    type="button"
                  >
                    Unlock the edition
                  </button>
                  <span className="absolute bottom-6 right-7 text-micro tabular-nums text-[#d8cdb8]/45">
                    {page.pageNumber} / {totalPages}
                  </span>
                </div>
              ) : (
                <div className="relative h-full w-full">
                  <Image
                    alt={`Page ${page.pageNumber} of ${title}`}
                    className="object-contain"
                    fill
                    loading={page.pageNumber <= 3 ? "eager" : "lazy"}
                    sizes="(min-width: 1024px) 560px, 100vw"
                    src={page.imageUrl}
                    unoptimized
                  />
                </div>
              )}
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      <div className="mt-8 flex w-full max-w-md items-center justify-between gap-4 border-t border-border pt-5">
        <Button
          aria-label="Previous page"
          disabled={currentIndex <= 0}
          onClick={() => getFlip()?.flipPrev()}
          size="icon"
          type="button"
          variant="outline"
        >
          <ChevronLeft />
        </Button>

        <div className="text-center">
          <p className="text-micro uppercase text-muted-foreground">
            {hasFullAccess ? "Complete edition" : "Free preview"}
          </p>
          <p className="mt-1 font-display text-title tabular-nums">
            {displayedPage} / {totalPages}
          </p>
        </div>

        <Button
          aria-label="Next page"
          disabled={currentIndex >= totalPages - 1}
          onClick={() => getFlip()?.flipNext()}
          size="icon"
          type="button"
          variant="outline"
        >
          <ChevronRight />
        </Button>
      </div>

      <p className="mt-3 text-center text-micro uppercase text-muted-foreground/70">
        Drag a page corner, use the arrows, or press ← →
      </p>
    </div>
  );
}
