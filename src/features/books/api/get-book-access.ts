import apiClient from "@/config/axios";
import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import { bookAccessResponseSchema } from "../schema/public-book.schema";
import type { BookAccessResult } from "../types/book";

export async function getBookAccess(slug: string): Promise<BookAccessResult> {
  const endpoint = apiEndpoints.publicBooks.access;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path, { slug }),
  });
  return bookAccessResponseSchema.parse(response.data).data;
}
