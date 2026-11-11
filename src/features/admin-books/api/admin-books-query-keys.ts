import type { AdminBookListQuery } from "../types/book";

export const adminBooksQueryKeys = {
  all: ["admin-books"] as const,
  lists: () => [...adminBooksQueryKeys.all, "list"] as const,
  list: (query: AdminBookListQuery) =>
    [
      ...adminBooksQueryKeys.lists(),
      {
        status: query.status ?? "all",
        q: query.q?.trim() ?? "",
        page: query.page,
        limit: query.limit,
      },
    ] as const,
  details: () => [...adminBooksQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...adminBooksQueryKeys.details(), id] as const,
};
