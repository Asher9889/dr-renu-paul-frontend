import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import apiClient from "@/config/axios";
import { publicBlogPostListResponseSchema } from "@/features/blog/schema/public-blog.schema";
import type {
  BlogListResult,
  PublicBlogPostsQuery,
} from "@/features/blog/types/blog";

export async function getPublicBlogPosts(
  query: PublicBlogPostsQuery,
): Promise<BlogListResult> {
  const endpoint = apiEndpoints.publicBlog.posts;
  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path),
    params: {
      tag: query.tag,
      page: query.page,
      limit: query.limit,
    },
  });
  const parsed = publicBlogPostListResponseSchema.parse(response.data);

  return {
    posts: parsed.data,
    meta: parsed.meta,
  };
}
