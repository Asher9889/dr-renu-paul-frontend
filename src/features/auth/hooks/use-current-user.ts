"use client";

import { useQuery } from "@tanstack/react-query";

import { authQueryKeys } from "../api/auth-query-keys";
import { getCurrentUser } from "../api/get-current-user";

export function useCurrentUser() {
  const query = useQuery({
    queryKey: authQueryKeys.currentUser(),
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 30_000,
  });

  return {
    user: query.data ?? null,
    isPending: query.isPending,
    refetch: query.refetch,
  };
}
