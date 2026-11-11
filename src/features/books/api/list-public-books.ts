import apiClient from "@/config/axios";
import { apiEndpoints } from "@/config/apiEndPoints";
import { publicBookListResponseSchema } from "../schema/public-book.schema";
import type { BookSummary } from "../types/book";

export type PublicBookListResult = {
  books: BookSummary[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export async function listPublicBooks(params: { page?: number; limit?: number } = {}): Promise<PublicBookListResult> {
  const endpoint = apiEndpoints.publicBooks.list;
  const response = await apiClient.request({
    method: endpoint.method,
    url: endpoint.path,
    params: { page: params.page, limit: params.limit },
  });
  const parsed = publicBookListResponseSchema.parse(response.data);
  return { books: parsed.data, meta: parsed.meta };
}
