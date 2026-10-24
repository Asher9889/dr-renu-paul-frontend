import { getPublicBlogTags } from "@/features/blog/api/get-public-blog-tags";
import { BlogTagFilter } from "@/features/blog/components/blog-tag-filter";
import { blogListingContent } from "@/features/blog/content/blog-listing-content";
import { getBlogSearchValue } from "@/features/blog/lib/blog-listing";
import type { BlogSearchParams } from "@/features/blog/types/blog";

type BlogTagFilterSectionProps = {
  searchParams: Promise<BlogSearchParams>;
};

export async function BlogTagFilterSection({
  searchParams,
}: BlogTagFilterSectionProps) {
  const params = await searchParams;
  const selectedTagSlug = getBlogSearchValue(params.tag) ?? null;
  const { tags, totalPublishedPosts } = await getPublicBlogTags();

  return (
    <BlogTagFilter
      allTagLabel={blogListingContent.allTagLabel}
      label={blogListingContent.filterLabel}
      mobileLabel={blogListingContent.mobileFilterLabel}
      selectedTagSlug={selectedTagSlug}
      tags={tags}
      totalPublishedPosts={totalPublishedPosts}
    />
  );
}
