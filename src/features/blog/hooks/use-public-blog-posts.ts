"use client";

import { useQuery } from "@tanstack/react-query";

import { getPublicBlogPosts } from "@/features/blog/api/get-public-blog-posts";
import { publicBlogQueryKeys } from "@/features/blog/api/public-blog-query-keys";
import type {
  BlogListResult,
  PublicBlogPostsQuery,
} from "@/features/blog/types/blog";

export function usePublicBlogPosts(
  query: PublicBlogPostsQuery,
  initialData: BlogListResult,
) {
  return useQuery({
    queryKey: publicBlogQueryKeys.posts(query),
    queryFn: () => getPublicBlogPosts(query),
    initialData,
  });
}
