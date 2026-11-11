import apiClient from "@/config/axios";
import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";

export async function deleteAdminBook(id: string): Promise<void> {
  const endpoint = apiEndpoints.adminBooks.posts.remove;
  await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path, { id }),
  });
}
