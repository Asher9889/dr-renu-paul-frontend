import apiClient from "@/config/axios";
import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import { adminBookResponseSchema } from "../schema/book-entities.schema";
import type { AdminBookDetail } from "../types/book";

export async function reprocessAdminBook(id: string): Promise<AdminBookDetail> {
  const endpoint = apiEndpoints.adminBooks.posts.reprocess;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path, { id }),
  });
  return adminBookResponseSchema.parse(response.data).data;
}
