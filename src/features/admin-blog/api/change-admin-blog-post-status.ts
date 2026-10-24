import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import apiClient from "@/config/axios";
import { adminBlogPostResponseSchema } from "@/features/admin-blog/schema/blog-entities.schema";
import type {
  AdminBlogPostDetail,
  BlogPostStatusAction,
} from "@/features/admin-blog/types/blog";

const statusEndpoints = {
  publish: apiEndpoints.adminBlog.posts.publish,
  unpublish: apiEndpoints.adminBlog.posts.unpublish,
  archive: apiEndpoints.adminBlog.posts.archive,
} as const;

export async function changeAdminBlogPostStatus(id: string, action: BlogPostStatusAction): Promise<AdminBlogPostDetail> {
  const endpoint = statusEndpoints[action];
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path, { id }),
    ...(action === "publish" ? { data: {} } : {}),
  });

  return adminBlogPostResponseSchema.parse(response.data).data;
}
