import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminBook } from "../api/delete-admin-book";
import { adminBooksQueryKeys } from "../api/admin-books-query-keys";

export function useDeleteAdminBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdminBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminBooksQueryKeys.lists() });
    },
  });
}
