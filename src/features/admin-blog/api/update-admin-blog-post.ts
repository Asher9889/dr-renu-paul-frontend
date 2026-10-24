import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import apiClient from "@/config/axios";
import { adminBlogPostResponseSchema } from "@/features/admin-blog/schema/blog-entities.schema";
import type {
  AdminBlogPostDetail,
  UpdateBlogPostPayload,
} from "@/features/admin-blog/types/blog";

export async function updateAdminBlogPost(
  id: string,
  payload: UpdateBlogPostPayload,
): Promise<AdminBlogPostDetail> {
  const endpoint = apiEndpoints.adminBlog.posts.update;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path, { id }),
    data: payload,
  });

  return adminBlogPostResponseSchema.parse(response.data).data;
}
