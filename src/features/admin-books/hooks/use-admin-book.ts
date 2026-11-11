import { useQuery } from "@tanstack/react-query";
import { getAdminBook } from "../api/get-admin-book";
import { adminBooksQueryKeys } from "../api/admin-books-query-keys";

export function useAdminBook(id: string, enabled = true) {
  return useQuery({
    queryKey: adminBooksQueryKeys.detail(id),
    queryFn: () => getAdminBook(id),
    enabled: Boolean(id) && enabled,
    // Poll while the worker renders the PDF so the editor reflects readiness.
    refetchInterval: (query) => {
      const status = query.state.data?.processing.status;
      return status === "PENDING" || status === "PROCESSING" ? 2500 : false;
    },
  });
}
