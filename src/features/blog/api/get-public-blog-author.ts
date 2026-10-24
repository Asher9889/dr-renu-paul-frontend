import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import apiClient from "@/config/axios";
import { publicBlogAuthorResponseSchema } from "@/features/blog/schema/public-blog.schema";
import type { BlogAuthor } from "@/features/blog/types/blog";

export async function getPublicBlogAuthor(): Promise<BlogAuthor> {
  const endpoint = apiEndpoints.publicBlog.author;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path),
  });
  const parsed = publicBlogAuthorResponseSchema.parse(response.data);

  return parsed.data;
}
