import apiClient from "@/config/axios";
import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import { publicBookResponseSchema } from "../schema/public-book.schema";
import type { BookDetail } from "../types/book";

export async function getPublicBook(slug: string): Promise<BookDetail> {
  const endpoint = apiEndpoints.publicBooks.detail;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path, { slug }),
  });
  return publicBookResponseSchema.parse(response.data).data;
}
