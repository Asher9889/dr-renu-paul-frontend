import {
  BlogPostPage,
  buildBlogPostMetadata,
  getBlogStaticParams,
} from "@/features/blog";

export const generateStaticParams = getBlogStaticParams;

export function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  return buildBlogPostMetadata(params);
}

export default function BlogArticlePage({
  params,
}: PageProps<"/blog/[slug]">) {
  return <BlogPostPage params={params} />;
}
