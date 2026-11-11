import { useQuery } from "@tanstack/react-query";
import { getPublicBook } from "../api/get-public-book";
import { publicBooksQueryKeys } from "../api/public-books-query-keys";
import type { BookDetail } from "../types/book";

export function usePublicBook(slug: string, initialData?: BookDetail) {
  return useQuery({
    queryKey: publicBooksQueryKeys.detail(slug),
    queryFn: () => getPublicBook(slug),
    initialData,
  });
}
