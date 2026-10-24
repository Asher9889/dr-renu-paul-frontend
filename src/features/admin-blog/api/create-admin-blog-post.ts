import axios from "axios";

import { adminBlogPostsEndpoint } from "@/features/admin-blog/api/admin-blog-config";
import { adminBlogPostResponseSchema } from "@/features/admin-blog/schema/blog-entities.schema";
import type {
  AdminBlogPostDetail,
  CreateBlogPostPayload,
} from "@/features/admin-blog/types/blog";

export async function createAdminBlogPost(
  payload: CreateBlogPostPayload,
): Promise<AdminBlogPostDetail> {
  const response = await axios.post(adminBlogPostsEndpoint, payload);

  return adminBlogPostResponseSchema.parse(response.data).data;
}
