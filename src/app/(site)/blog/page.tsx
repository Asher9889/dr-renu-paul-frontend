import { BlogListing, blogListingMetadata } from "@/features/blog";

export const metadata = blogListingMetadata; // metadata is an object that describes a page

export default function BlogPage({ searchParams }: PageProps<"/blog">) {
  return <BlogListing searchParams={searchParams} />;
}
