import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdminBook } from "../api/create-admin-book";
import { updateAdminBook } from "../api/update-admin-book";
import { adminBooksQueryKeys } from "../api/admin-books-query-keys";
import type { AdminBookDetail, CreateBookPayload } from "../types/book";

type SaveBookVariables = {
  id?: string;
  payload: CreateBookPayload;
};

export function useSaveAdminBook() {
  const queryClient = useQueryClient();
  return useMutation<AdminBookDetail, unknown, SaveBookVariables>({
    mutationFn: ({ id, payload }) =>
      id ? updateAdminBook(id, payload) : createAdminBook(payload),
    onSuccess: (book) => {
      queryClient.invalidateQueries({ queryKey: adminBooksQueryKeys.lists() });
      queryClient.setQueryData(adminBooksQueryKeys.detail(book.id), book);
    },
  });
}
