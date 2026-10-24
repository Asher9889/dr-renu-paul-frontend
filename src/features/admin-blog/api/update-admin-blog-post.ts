import axios from "axios";

import { adminBlogPostsEndpoint } from "@/features/admin-blog/api/admin-blog-config";
import { adminBlogPostResponseSchema } from "@/features/admin-blog/schema/blog-entities.schema";
import type {
  AdminBlogPostDetail,
  UpdateBlogPostPayload,
} from "@/features/admin-blog/types/blog";

export async function updateAdminBlogPost(
  id: string,
  payload: UpdateBlogPostPayload,
): Promise<AdminBlogPostDetail> {
  const response = await axios.patch(
    `${adminBlogPostsEndpoint}/${encodeURIComponent(id)}`,
    payload,
  );

  return adminBlogPostResponseSchema.parse(response.data).data;
}
