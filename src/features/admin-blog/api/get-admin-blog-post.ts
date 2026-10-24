import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import apiClient from "@/config/axios";
import { adminBlogPostResponseSchema } from "@/features/admin-blog/schema/blog-entities.schema";
import type { AdminBlogPostDetail } from "@/features/admin-blog/types/blog";

export async function getAdminBlogPost(
  id: string,
): Promise<AdminBlogPostDetail> {
  const endpoint = apiEndpoints.adminBlog.posts.detail;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path, { id }),
  });

  return adminBlogPostResponseSchema.parse(response.data).data;
}
