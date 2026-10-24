import type { BlogSearchParams } from "@/features/blog/types/blog";

export const BLOG_PAGE_SIZE = 9;

export function getBlogSearchValue(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseBlogPage(value: string | string[] | undefined): number {
  const candidate = Number(getBlogSearchValue(value));

  if (!Number.isInteger(candidate) || candidate < 1) {
    return 1;
  }

  return candidate;
}

export function buildBlogListingHref(
  tagSlug: string | null,
  page: number,
): string {
  const params = new URLSearchParams();

  if (tagSlug) {
    params.set("tag", tagSlug);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return query ? `/blog?${query}` : "/blog";
}

export function readBlogListingQuery(searchParams: BlogSearchParams) {
  return {
    tag: getBlogSearchValue(searchParams.tag) ?? undefined,
    page: parseBlogPage(searchParams.page),
  };
}
