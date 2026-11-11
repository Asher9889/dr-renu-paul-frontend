import { useQuery } from "@tanstack/react-query";
import { getBookReader } from "../api/get-book-reader";
import { publicBooksQueryKeys } from "../api/public-books-query-keys";

export function useBookReader(slug: string) {
  return useQuery({
    queryKey: publicBooksQueryKeys.reader(slug),
    queryFn: () => getBookReader(slug),
    retry: false,
    staleTime: 30_000,
  });
}
