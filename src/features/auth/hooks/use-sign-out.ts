"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { authQueryKeys } from "../api/auth-query-keys";
import { logout } from "../api/logout";
import { authContent } from "../content/auth-content";

/**
 * Ends the backend session, clears the cached reader, and marks every other
 * query stale. Pages that were fetched for the signed-in reader (for example
 * a purchased book) are refetched as a guest instead of being read from the
 * cache after sign-out.
 */
export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(authQueryKeys.currentUser(), null);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] !== authQueryKeys.all[0],
      });
      toast.success(authContent.account.signedOutMessage);
    },
    onError: () => {
      toast.error(authContent.account.signOutError);
    },
  });
}
