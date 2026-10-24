import type { BlogPostFormValues } from "@/features/admin-blog/schema/blog-post-form.schema";
import type { AdminBlogPostDetail } from "@/features/admin-blog/types/blog";

export function getEmptyBlogPostFormValues(): BlogPostFormValues {
  return {
    title: "",
    slug: "",
    excerpt: "",
    content: {
      type: "doc",
      content: [{ type: "paragraph" }],
    },
    cover: null,
    tags: [],
    featured: false,
  };
}

export function getBlogPostFormValues(
  post: AdminBlogPostDetail,
): BlogPostFormValues {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    cover: post.cover
      ? {
          ...post.cover,
          caption: post.cover.caption ?? "",
        }
      : null,
    tags: post.tags.map((tag) => tag.name),
    featured: post.featured,
  };
}
