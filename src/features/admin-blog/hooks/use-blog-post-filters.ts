"use client";

import { useMemo, useState } from "react";

import { useDebouncedValue } from "@/features/admin-blog/hooks/use-debounced-value";
import type {
  AdminBlogListQuery,
  BlogPostStatus,
} from "@/features/admin-blog/types/blog";

export const ADMIN_BLOG_PAGE_SIZE = 10;

export type AdminBlogStatusFilter = BlogPostStatus | "all";

export function useBlogPostFilters() {
  const [status, setStatus] = useState<AdminBlogStatusFilter>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search, 300);

  const query = useMemo<AdminBlogListQuery>(
    () => ({
      status: status === "all" ? undefined : status,
      q: debouncedSearch.trim() || undefined,
      page,
      limit: ADMIN_BLOG_PAGE_SIZE,
    }),
    [debouncedSearch, page, status],
  );

  function updateStatus(nextStatus: AdminBlogStatusFilter) {
    setStatus(nextStatus);
    setPage(1);
  }

  function updateSearch(nextSearch: string) {
    setSearch(nextSearch);
    setPage(1);
  }

  function resetFilters() {
    setStatus("all");
    setSearch("");
    setPage(1);
  }

  return {
    status,
    setStatus: updateStatus,
    search,
    setSearch: updateSearch,
    page,
    setPage,
    query,
    resetFilters,
    hasFilters: status !== "all" || search.trim().length > 0,
  };
}
