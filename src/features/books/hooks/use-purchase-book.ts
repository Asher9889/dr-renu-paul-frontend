"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useCurrentUser } from "@/features/auth";
import { createPurchaseOrder } from "../api/create-purchase-order";
import { verifyPurchase } from "../api/verify-purchase";
import { loadRazorpay } from "../lib/load-razorpay";
import { publicBooksQueryKeys } from "../api/public-books-query-keys";
import type { BookPurchaseResult } from "../types/book";
import type { RazorpayPaymentResponse } from "../types/razorpay";

export class PaymentCancelledError extends Error {
  constructor() {
    super("Payment cancelled");
    this.name = "PaymentCancelledError";
  }
}

/**
 * Razorpay checkout entry point in the "displayRazorpay" style: load the
 * script, create an order on the backend, open the checkout modal, then verify
 * the payment. Returns the updated purchase/access result on success.
 */
export function useDisplayRazorpay(slug: string) {
  const queryClient = useQueryClient();
  const { user } = useCurrentUser();
  const [isPending, setIsPending] = useState(false);

  async function displayRazorpay(): Promise<BookPurchaseResult | null> {
    setIsPending(true);
    try {
      const order = await createPurchaseOrder(slug);

      const loaded = await loadRazorpay();
      const RazorpayCtor = window.Razorpay;
      if (!loaded || !RazorpayCtor) {
        throw new Error("Could not load the payment gateway.");
      }

      const paymentResponse = await new Promise<RazorpayPaymentResponse>(
        (resolve, reject) => {
          const razorpay = new RazorpayCtor({
            key: order.keyId,
            amount: order.amount,
            currency: order.currency,
            name: "Dr. Renu Paul",
            description: "Complete edition",
            order_id: order.orderId,
            prefill: {
              name: user?.name ?? undefined,
              email: user?.email ?? undefined,
            },
            theme: { color: "#B8862F" },
            handler: (response) => resolve(response),
            modal: {
              ondismiss: () => reject(new PaymentCancelledError()),
            },
          });

          razorpay.on("payment.failed", () => {
            reject(new Error("Payment failed. Please try again."));
          });

          razorpay.open();
        },
      );

      const result = await verifyPurchase(slug, {
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
      });

      queryClient.setQueryData(publicBooksQueryKeys.access(slug), {
        access: result.access,
        purchase: result.purchase,
      });
      queryClient.invalidateQueries({
        queryKey: publicBooksQueryKeys.reader(slug),
      });
      queryClient.invalidateQueries({
        queryKey: publicBooksQueryKeys.purchases(),
      });

      return result;
    } finally {
      setIsPending(false);
    }
  }

  return { displayRazorpay, isPending };
}