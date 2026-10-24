import axios from "axios";

import { adminBlogPostsEndpoint } from "@/features/admin-blog/api/admin-blog-config";
import { adminBlogPostResponseSchema } from "@/features/admin-blog/schema/blog-entities.schema";
import type { AdminBlogPostDetail } from "@/features/admin-blog/types/blog";

export async function getAdminBlogPost(
  id: string,
): Promise<AdminBlogPostDetail> {
  const response = await axios.get(
    `${adminBlogPostsEndpoint}/${encodeURIComponent(id)}`,
  );

  return adminBlogPostResponseSchema.parse(response.data).data;
}
