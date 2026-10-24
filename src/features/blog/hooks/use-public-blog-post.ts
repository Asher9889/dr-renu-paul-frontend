"use client";

import { useQuery } from "@tanstack/react-query";

import { getPublicBlogPost } from "@/features/blog/api/get-public-blog-post";
import { publicBlogQueryKeys } from "@/features/blog/api/public-blog-query-keys";
import type { BlogPostDetail } from "@/features/blog/types/blog";

export function usePublicBlogPost(
  slug: string,
  initialData: BlogPostDetail,
) {
  return useQuery({
    queryKey: publicBlogQueryKeys.post(slug),
    queryFn: () => getPublicBlogPost(slug),
    initialData,
  });
}
