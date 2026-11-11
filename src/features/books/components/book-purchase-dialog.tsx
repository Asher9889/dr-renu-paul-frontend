"use client";

import { useState } from "react";
import { Check, LockKeyhole } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getPublicBookError } from "../api/get-public-book-error";
import { useBookPurchaseGate } from "../hooks/use-book-purchase-gate";
import { useDisplayRazorpay, PaymentCancelledError } from "../hooks/use-purchase-book";
import { formatBookPrice } from "../lib/format-book-price";
import type { BookAccess, BookSummary } from "../types/book";

type PurchasableBook = Pick<BookSummary,
  "slug" | "title" | "freePreviewPages" | "totalPages" | "price" | "currency"
>;

type BookPurchaseDialogProps = {
  book: PurchasableBook;
  access: BookAccess | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function BookPurchaseDialog({book, access, open, onOpenChange }: BookPurchaseDialogProps) {
  const { displayRazorpay, isPending } = useDisplayRazorpay(book.slug);
  const gate = useBookPurchaseGate(book.slug);
  const [error, setError] = useState<string | null>(null);

  const freePages = access?.freePreviewPages ?? book.freePreviewPages;
  const totalPages = access?.totalPages ?? book.totalPages;
  const price = access?.price ?? book.price;
  const currency = access?.currency ?? book.currency;

  async function handlePurchase() {
    setError(null);

    const isSignedIn = await gate.requireSignedIn();
    if (!isSignedIn) return;

    // The dialog overlay (z-50) sits above Razorpay's checkout iframe and
    // blocks clicks, so close it before opening the payment modal.
    onOpenChange(false);

    try {
      await displayRazorpay();
      toast.success("The complete edition is now open.", {
        description: `All ${totalPages} pages are available in the reader.`,
      });
    } catch (purchaseError) {
      if (purchaseError instanceof PaymentCancelledError) return;
      onOpenChange(true);
      setError(getPublicBookError(purchaseError).message);
    }
  }

  return (
    <Dialog
      onOpenChange={(nextOpen) => {
        if (isPending) return;
        setError(null);
        onOpenChange(nextOpen);
      }}
      open={open}
    >
      <DialogContent className="gap-0 rounded-sm border border-border p-0 sm:max-w-md">
        <DialogHeader className="gap-3 border-b border-border px-6 pb-5 pt-6">
          <p className="text-micro uppercase tracking-[0.14em] text-gold">
            Complete edition
          </p>
          <DialogTitle className="font-display text-subheading leading-tight">
            Unlock “{book.title}”
          </DialogTitle>
          <DialogDescription className="text-caption leading-relaxed">
            The opening {freePages} {freePages === 1 ? "page is" : "pages are"} free.
            Purchase the complete edition to continue through all {totalPages} pages
            in the flipper reader.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 px-6 py-5">
          <div>
            <div className="flex items-center justify-between gap-4 text-caption">
              <span className="text-muted-foreground">Free preview</span>
              <span className="tabular-nums">
                {freePages} of {totalPages} pages
              </span>
            </div>
            <div className="mt-2.5 flex items-center justify-between gap-4 text-caption">
              <span className="text-muted-foreground">Complete edition</span>
              <span className="inline-flex items-center gap-1.5 text-foreground">
                <Check aria-hidden className="size-3.5 text-gold" />
                All pages
              </span>
            </div>
            <Separator className="my-4" />
            <div className="flex items-end justify-between gap-4">
              <span className="text-micro uppercase text-muted-foreground">
                Total
              </span>
              <span className="font-display text-title tabular-nums">
                {formatBookPrice(price, currency)}
              </span>
            </div>
          </div>

          <div className="flex gap-3 border border-gold/35 bg-gold/5 p-3">
            <LockKeyhole
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-gold"
            />
            <p className="text-caption text-muted-foreground">
              Access unlocks immediately after the purchase is confirmed. Your
              place in the reader is kept.
            </p>
          </div>

          {error ? (
            <p className="border border-destructive/40 bg-destructive/5 px-3 py-2 text-caption text-destructive">
              {error}
            </p>
          ) : null}
        </div>

        <DialogFooter className="mx-0 mb-0 rounded-b-sm border-border bg-secondary/50 px-6 py-4">
          <Button
            disabled={isPending}
            onClick={() => onOpenChange(false)}
            type="button"
            variant="ghost"
          >
            Keep reading the preview
          </Button>
          <Button
            disabled={isPending}
            onClick={() => {
              void handlePurchase();
            }}
            type="button"
          >
            {isPending
              ? "Completing purchase…"
              : `Unlock for ${formatBookPrice(price, currency)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
