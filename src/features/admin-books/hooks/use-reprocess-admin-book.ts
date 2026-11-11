import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reprocessAdminBook } from "../api/reprocess-admin-book";
import { adminBooksQueryKeys } from "../api/admin-books-query-keys";

export function useReprocessAdminBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => reprocessAdminBook(id),
    onSuccess: (book) => {
      queryClient.setQueryData(adminBooksQueryKeys.detail(book.id), book);
      queryClient.invalidateQueries({ queryKey: adminBooksQueryKeys.lists() });
    },
  });
}
