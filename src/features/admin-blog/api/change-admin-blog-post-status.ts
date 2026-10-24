import axios from "axios";

import { adminBlogPostsEndpoint } from "@/features/admin-blog/api/admin-blog-config";
import { adminBlogPostResponseSchema } from "@/features/admin-blog/schema/blog-entities.schema";
import type {
  AdminBlogPostDetail,
  BlogPostStatusAction,
} from "@/features/admin-blog/types/blog";

export async function changeAdminBlogPostStatus(
  id: string,
  action: BlogPostStatusAction,
): Promise<AdminBlogPostDetail> {
  const endpoint = `${adminBlogPostsEndpoint}/${encodeURIComponent(id)}/${action}`;
  const response =
    action === "publish" ? await axios.post(endpoint, {}) : await axios.post(endpoint);

  return adminBlogPostResponseSchema.parse(response.data).data;
}
