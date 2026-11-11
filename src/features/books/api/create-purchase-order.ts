import apiClient from "@/config/axios";
import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import { bookPurchaseOrderResponseSchema } from "../schema/public-book.schema";
import type { BookPurchaseOrderResult } from "../types/book";

export async function createPurchaseOrder(
  slug: string,
): Promise<BookPurchaseOrderResult> {
  const endpoint = apiEndpoints.publicBooks.purchaseOrder;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path, { slug }),
    data: {},
  });
  return bookPurchaseOrderResponseSchema.parse(response.data).data;
}