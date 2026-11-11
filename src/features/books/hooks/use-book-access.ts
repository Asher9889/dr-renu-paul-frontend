import { useQuery } from "@tanstack/react-query";
import { getBookAccess } from "../api/get-book-access";
import { publicBooksQueryKeys } from "../api/public-books-query-keys";

export function useBookAccess(slug: string, enabled = true) {
  return useQuery({
    queryKey: publicBooksQueryKeys.access(slug),
    queryFn: () => getBookAccess(slug),
    enabled: Boolean(slug) && enabled,
    retry: false,
    staleTime: 30_000,
  });
}
