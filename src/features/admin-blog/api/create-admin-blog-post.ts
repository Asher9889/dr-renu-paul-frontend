import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import apiClient from "@/config/axios";
import { adminBlogPostResponseSchema } from "@/features/admin-blog/schema/blog-entities.schema";
import type {
  AdminBlogPostDetail,
  CreateBlogPostPayload,
} from "@/features/admin-blog/types/blog";

export async function createAdminBlogPost(
  payload: CreateBlogPostPayload,
): Promise<AdminBlogPostDetail> {
  const endpoint = apiEndpoints.adminBlog.posts.create;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path),
    data: payload,
  });

  return adminBlogPostResponseSchema.parse(response.data).data;
}
