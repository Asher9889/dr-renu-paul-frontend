import type { Metadata } from "next";

import { getPublicBlogAuthor } from "@/features/blog/api/get-public-blog-author";
import { getPublicBlogPost } from "@/features/blog/api/get-public-blog-post";

export const blogListingMetadata: Metadata = {
  title: "The Journal — Dr. Renu Paul",
  description:
    "Essays from Dr. Renu Paul's homoeopathic practice on constitution, chronic care, women's health, children, and the quiet work of returning to health.",
  keywords: [
    "homoeopathy journal",
    "constitutional homoeopathy",
    "Dr. Renu Paul",
    "women's health",
    "chronic care",
    "child care",
  ],
};

export async function buildBlogPostMetadata(
  params: Promise<{ slug: string }>,
): Promise<Metadata> {
  const { slug } = await params;
  const [post, author] = await Promise.all([
    getPublicBlogPost(slug),
    getPublicBlogAuthor().catch(() => null),
  ]);

  if (!post) {
    return {
      title: "Note not found — Dr. Renu Paul",
      description: blogListingMetadata.description,
    };
  }

  const authorName = author?.name ?? "Dr. Renu Paul";
  const tags = post.tags.map((tag) => tag.name);

  return {
    title: `${post.title} — Dr. Renu Paul`,
    description: post.excerpt,
    keywords: [...tags, "homoeopathy", "Dr. Renu Paul"],
    authors: [{ name: authorName }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [authorName],
      tags,
      images: [
        {
          url: post.cover.url,
          width: post.cover.width,
          height: post.cover.height,
          alt: post.cover.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.cover.url],
    },
  };
}
