import { slugify } from "@/features/admin-blog/lib/slugify";
import { toTiptapDocument } from "@/features/admin-blog/lib/tiptap-payload";
import {
  createBlogPostPayloadSchema,
  type CreateBlogPostPayload,
} from "@/features/admin-blog/schema/blog-post-payload.schema";
import type { BlogPostFormValues } from "@/features/admin-blog/schema/blog-post-form.schema";

export function buildBlogPostPayload(
  values: BlogPostFormValues,
): CreateBlogPostPayload {
  const slug =
    values.slug.trim() ||
    slugify(values.title).slice(0, 160).replace(/-+$/g, "");

  const tags = Array.from(
    new Map(
      values.tags
        .map((tag) => tag.trim().replace(/\s+/g, " "))
        .filter(Boolean)
        .map((tag) => [tag.toLowerCase(), tag]),
    ).values(),
  );

  const cover = values.cover
    ? {
        url: values.cover.url,
        alt: values.cover.alt.trim(),
        caption: values.cover.caption.trim() || null,
        width: values.cover.width,
        height: values.cover.height,
      }
    : null;

  return createBlogPostPayloadSchema.parse({
    title: values.title.trim(),
    slug,
    excerpt: values.excerpt.trim(),
    content: toTiptapDocument(values.content),
    cover,
    tags,
    featured: values.featured,
  });
}
