import { BlogListing, blogListingMetadata } from "@/features/blog";

export const metadata = blogListingMetadata;

export default function BlogPage({ searchParams }: PageProps<"/blog">) {
  return <BlogListing searchParams={searchParams} />;
}
