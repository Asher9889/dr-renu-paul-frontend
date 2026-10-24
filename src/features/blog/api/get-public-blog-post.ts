import { isAxiosError } from "axios";

import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import apiClient from "@/config/axios";
import { publicBlogPostResponseSchema } from "@/features/blog/schema/public-blog.schema";
import type { BlogPostDetail } from "@/features/blog/types/blog";

export async function getPublicBlogPost(
  slug: string,
): Promise<BlogPostDetail | null> {
  const endpoint = apiEndpoints.publicBlog.post;

  try {
    const response = await apiClient.request({
      method: endpoint.method,
      url: buildApiPath(endpoint.path, { slug }),
    });
    const parsed = publicBlogPostResponseSchema.parse(response.data);

    return parsed.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw error;
  }
}
