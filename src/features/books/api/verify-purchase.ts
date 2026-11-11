import apiClient from "@/config/axios";
import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import { bookPurchaseResponseSchema } from "../schema/public-book.schema";
import type { BookPurchaseResult } from "../types/book";

export type VerifyPurchasePayload = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export async function verifyPurchase(
  slug: string,
  payload: VerifyPurchasePayload,
): Promise<BookPurchaseResult> {
  const endpoint = apiEndpoints.publicBooks.purchaseVerify;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path, { slug }),
    data: payload,
  });
  return bookPurchaseResponseSchema.parse(response.data).data;
}