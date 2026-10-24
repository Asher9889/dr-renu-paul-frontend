import { BlogPostPage, buildBlogPostMetadata } from "@/features/blog";

export function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  return buildBlogPostMetadata(params);
}

export default function BlogArticlePage({
  params,
}: PageProps<"/blog/[slug]">) {
  return <BlogPostPage params={params} />;
}
