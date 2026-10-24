import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import apiClient from "@/config/axios";
import { publicBlogTagsResponseSchema } from "@/features/blog/schema/public-blog.schema";
import type { BlogTagListResult } from "@/features/blog/types/blog";

export async function getPublicBlogTags(): Promise<BlogTagListResult> {
  const endpoint = apiEndpoints.publicBlog.tags;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path),
  });
  const parsed = publicBlogTagsResponseSchema.parse(response.data);

  return {
    tags: parsed.data,
    totalPublishedPosts: parsed.meta.totalPublishedPosts,
  };
}
