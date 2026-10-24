import type { AdminBlogListQuery } from "@/features/admin-blog/types/blog";

export const adminBlogQueryKeys = {
  all: ["admin-blog"] as const,
  lists: () => [...adminBlogQueryKeys.all, "list"] as const,
  list: (query: AdminBlogListQuery) =>
    [
      ...adminBlogQueryKeys.lists(),
      {
        status: query.status ?? "all",
        q: query.q?.trim() ?? "",
        page: query.page,
        limit: query.limit,
      },
    ] as const,
  details: () => [...adminBlogQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...adminBlogQueryKeys.details(), id] as const,
};
