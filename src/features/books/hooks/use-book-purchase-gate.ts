"use client";

import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/features/auth";
import { buildSignInHref } from "@/lib/auth-redirect";

/**
 * Guards the purchase of an edition. Signed-out readers are sent to the
 * Google sign-in screen and brought back to the reader with the purchase
 * dialog already open.
 */
export function useBookPurchaseGate(slug: string) {
  const router = useRouter();
  const { user, isPending, refetch } = useCurrentUser();

  async function requireSignedIn(): Promise<boolean> {
    if (user) return true;

    // The user query may still be loading when the reader clicks. Ask once
    // more before treating them as signed out.
    if (isPending) {
      const currentUser = await refetch();
      if (currentUser.data) return true;
    }

    router.push(buildSignInHref(`/books/${slug}/read?purchase=1`));
    return false;
  }

  return { user, isPending, requireSignedIn };
}
