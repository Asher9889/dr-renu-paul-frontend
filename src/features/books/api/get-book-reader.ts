import apiClient from "@/config/axios";
import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import { bookReaderResponseSchema } from "../schema/public-book.schema";
import type { BookReader } from "../types/book";

export async function getBookReader(slug: string): Promise<BookReader> {
  const endpoint = apiEndpoints.publicBooks.reader;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path, { slug }),
  });
  return bookReaderResponseSchema.parse(response.data).data;
}
