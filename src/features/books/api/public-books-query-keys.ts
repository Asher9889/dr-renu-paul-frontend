export const publicBooksQueryKeys = {
  all: ["public-books"] as const,
  list: () => [...publicBooksQueryKeys.all, "list"] as const,
  detail: (slug: string) => [...publicBooksQueryKeys.all, "detail", slug] as const,
  reader: (slug: string) => [...publicBooksQueryKeys.all, "reader", slug] as const,
  access: (slug: string) => [...publicBooksQueryKeys.all, "access", slug] as const,
  purchases: () => [...publicBooksQueryKeys.all, "purchases"] as const,
};
