import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listAdminBooks } from "../api/list-admin-books";
import { adminBooksQueryKeys } from "../api/admin-books-query-keys";
import type { AdminBookListQuery } from "../types/book";

export function useAdminBooks(query: AdminBookListQuery) {
  return useQuery({
    queryKey: adminBooksQueryKeys.list(query),
    queryFn: () => listAdminBooks(query),
    placeholderData: keepPreviousData,
  });
}
