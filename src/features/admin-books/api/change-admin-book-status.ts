import apiClient from "@/config/axios";
import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import { adminBookResponseSchema } from "../schema/book-entities.schema";
import type { AdminBookDetail, BookStatusAction } from "../types/book";

const statusEndpoints = {
  publish: apiEndpoints.adminBooks.posts.publish,
  unpublish: apiEndpoints.adminBooks.posts.unpublish,
  archive: apiEndpoints.adminBooks.posts.archive,
} as const;

export async function changeAdminBookStatus(id: string, action: BookStatusAction): Promise<AdminBookDetail> {
  const endpoint = statusEndpoints[action];
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path, { id }),
    ...(action === "publish" ? { data: {} } : {}),
  });
  return adminBookResponseSchema.parse(response.data).data;
}
