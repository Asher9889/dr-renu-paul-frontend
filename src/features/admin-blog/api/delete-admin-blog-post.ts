import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import apiClient from "@/config/axios";

export async function deleteAdminBlogPost(id: string): Promise<void> {
  const endpoint = apiEndpoints.adminBlog.posts.remove;

  await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path, { id }),
  });
}
