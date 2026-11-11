import apiClient from "@/config/axios";
import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import { adminBookResponseSchema } from "../schema/book-entities.schema";
import type { AdminBookDetail, CreateBookPayload } from "../types/book";

export async function createAdminBook(payload: CreateBookPayload): Promise<AdminBookDetail> {
  const endpoint = apiEndpoints.adminBooks.posts.create;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path),
    data: payload,
  });
  return adminBookResponseSchema.parse(response.data).data;
}
