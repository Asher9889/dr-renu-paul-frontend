import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import apiClient from "@/config/axios";
import { publicBlogFeaturedResponseSchema } from "@/features/blog/schema/public-blog.schema";
import type { BlogPostSummary } from "@/features/blog/types/blog";

const FEATURED_POST_LIMIT = 3;

export async function getFeaturedBlogPosts(): Promise<BlogPostSummary[]> {
  const endpoint = apiEndpoints.publicBlog.featured;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path),
    params: {
      limit: FEATURED_POST_LIMIT,
    },
  });
  const parsed = publicBlogFeaturedResponseSchema.parse(response.data);

  return parsed.data;
}
