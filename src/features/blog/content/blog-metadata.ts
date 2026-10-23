import type { Metadata } from "next";

import {
  blogAuthor,
  blogPosts,
  getBlogPostBySlug,
} from "@/features/blog/content/blog-posts-content";

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
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Note not found — Dr. Renu Paul",
      description: blogListingMetadata.description,
    };
  }

  return {
    title: `${post.title} — Dr. Renu Paul`,
    description: post.description,
    keywords: [...post.tags, "homoeopathy", "Dr. Renu Paul"],
    authors: [{ name: blogAuthor.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date.iso,
      authors: [blogAuthor.name],
      tags: post.tags,
    },
  };
}

export function getBlogStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}
