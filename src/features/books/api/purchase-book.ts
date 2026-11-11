import apiClient from "@/config/axios";
import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import { bookPurchaseResponseSchema } from "../schema/public-book.schema";
import type { BookPurchaseResult } from "../types/book";

export async function purchaseBook(slug: string): Promise<BookPurchaseResult> {
  const endpoint = apiEndpoints.publicBooks.purchase;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path, { slug }),
    data: {},
  });
  return bookPurchaseResponseSchema.parse(response.data).data;
}
