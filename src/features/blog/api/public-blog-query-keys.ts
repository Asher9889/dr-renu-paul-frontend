import type { PublicBlogPostsQuery } from "@/features/blog/types/blog";

export const publicBlogQueryKeys = {
  all: ["public-blog"] as const,
  posts: (query: PublicBlogPostsQuery) =>
    ["public-blog", "posts", query] as const,
  post: (slug: string) => ["public-blog", "post", slug] as const,
};
