import axios from "axios";

import { adminBlogPostsEndpoint } from "@/features/admin-blog/api/admin-blog-config";
import { adminBlogPostListResponseSchema } from "@/features/admin-blog/schema/blog-entities.schema";
import type {
  AdminBlogListQuery,
  AdminBlogListResult,
} from "@/features/admin-blog/types/blog";

export async function listAdminBlogPosts(
  query: AdminBlogListQuery,
): Promise<AdminBlogListResult> {
  const response = await axios.get(adminBlogPostsEndpoint, {
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
