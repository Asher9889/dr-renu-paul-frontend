import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseBook } from "../api/purchase-book";
import { publicBooksQueryKeys } from "../api/public-books-query-keys";
import type { BookPurchaseResult } from "../types/book";

export function usePurchaseBook(slug: string) {
  const queryClient = useQueryClient();

  return useMutation<BookPurchaseResult, unknown, void>({
    mutationFn: () => purchaseBook(slug),
    onSuccess: (result) => {
      queryClient.setQueryData(publicBooksQueryKeys.access(slug), {
        access: result.access,
        purchase: result.purchase,
      });
      queryClient.invalidateQueries({
        queryKey: publicBooksQueryKeys.reader(slug),
      });
      queryClient.invalidateQueries({
        queryKey: publicBooksQueryKeys.purchases(),
      });
    },
  });
}
