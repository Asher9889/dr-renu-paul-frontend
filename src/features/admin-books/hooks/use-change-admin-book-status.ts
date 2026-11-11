import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeAdminBookStatus } from "../api/change-admin-book-status";
import { adminBooksQueryKeys } from "../api/admin-books-query-keys";
import type { BookStatusAction } from "../types/book";

export function useChangeAdminBookStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action }: { id: string; action: BookStatusAction }) =>
      changeAdminBookStatus(id, action),
    onSuccess: (book) => {
      queryClient.invalidateQueries({ queryKey: adminBooksQueryKeys.lists() });
      queryClient.setQueryData(adminBooksQueryKeys.detail(book.id), book);
    },
  });
}
