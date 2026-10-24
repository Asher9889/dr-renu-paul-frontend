import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import apiClient from "@/config/axios";
import { adminBlogPostListResponseSchema } from "@/features/admin-blog/schema/blog-entities.schema";
import type {
  AdminBlogListQuery,
  AdminBlogListResult,
} from "@/features/admin-blog/types/blog";

export async function listAdminBlogPosts(
  query: AdminBlogListQuery,
): Promise<AdminBlogListResult> {
  const endpoint = apiEndpoints.adminBlog.posts.list;
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

  const parsed = adminBlogPostListResponseSchema.parse(response.data);

  return {
    posts: parsed.data,
    meta: parsed.meta,
  };
}
