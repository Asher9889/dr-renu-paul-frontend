import { useQuery } from "@tanstack/react-query";
import { listPublicBooks, type PublicBookListResult } from "../api/list-public-books";
import { publicBooksQueryKeys } from "../api/public-books-query-keys";

export function usePublicBooks(initialData?: PublicBookListResult) {
  return useQuery({
    queryKey: publicBooksQueryKeys.list(),
    queryFn: () => listPublicBooks(),
    initialData,
  });
}
