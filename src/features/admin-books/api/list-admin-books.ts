import apiClient from "@/config/axios";
import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import { adminBookListResponseSchema } from "../schema/book-entities.schema";
import type { AdminBookListQuery, AdminBookListResult } from "../types/book";

export async function listAdminBooks(query: AdminBookListQuery): Promise<AdminBookListResult> {
  const endpoint = apiEndpoints.adminBooks.posts.list;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path),
    params: {
      status: query.status,
      q: query.q?.trim() ? query.q.trim() : undefined,
      page: query.page,
      limit: query.limit,
    },
  });
  const parsed = adminBookListResponseSchema.parse(response.data);
  return { books: parsed.data, meta: parsed.meta };
}
