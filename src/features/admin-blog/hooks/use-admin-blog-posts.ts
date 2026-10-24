"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { adminBlogQueryKeys } from "@/features/admin-blog/api/admin-blog-query-keys";
import { listAdminBlogPosts } from "@/features/admin-blog/api/list-admin-blog-posts";
import type { AdminBlogListQuery } from "@/features/admin-blog/types/blog";

export function useAdminBlogPosts(query: AdminBlogListQuery) {
  return useQuery({
    queryKey: adminBlogQueryKeys.list(query),
    queryFn: () => listAdminBlogPosts(query),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
