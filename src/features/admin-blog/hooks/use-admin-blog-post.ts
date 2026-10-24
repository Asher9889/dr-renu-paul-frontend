"use client";

import { useQuery } from "@tanstack/react-query";

import { adminBlogQueryKeys } from "@/features/admin-blog/api/admin-blog-query-keys";
import { getAdminBlogPost } from "@/features/admin-blog/api/get-admin-blog-post";

export function useAdminBlogPost(id: string) {
  return useQuery({
    queryKey: adminBlogQueryKeys.detail(id),
    queryFn: () => getAdminBlogPost(id),
    staleTime: 15_000,
    retry: false,
  });
}
