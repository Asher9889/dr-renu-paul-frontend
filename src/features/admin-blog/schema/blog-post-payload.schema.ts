import { z } from "zod";

import { tiptapDocumentSchema } from "@/features/blog/schema/tiptap-document.schema";

export const BLOG_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const httpUrlSchema = z
  .url("Please provide a valid URL.")
  .refine(
    (value) => /^https?:\/\//i.test(value),
    "URLs must use http or https.",
  );

export const blogCoverPayloadSchema = z
  .object({
    url: httpUrlSchema,
    alt: z.string().trim().min(1, "Cover alt text is required.").max(300),
    caption: z.string().trim().max(500).nullable(),
    width: z.number().int().positive().max(20000),
    height: z.number().int().positive().max(20000),
  })
  .strict();

export const createBlogPostPayloadSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required.").max(200),
    slug: z
      .string()
      .trim()
      .min(1, "Slug is required.")
      .max(160)
      .regex(BLOG_SLUG_PATTERN, "Slug must be lowercase kebab-case."),
    excerpt: z
      .string()
      .trim()
      .max(200, "Excerpt must be 200 characters or fewer."),
    content: tiptapDocumentSchema,
    cover: blogCoverPayloadSchema.nullish(),
    tags: z
      .array(z.string().trim().min(1).max(60))
      .max(20, "A post can have at most 20 tags."),
    featured: z.boolean().optional(),
  })
  .strict();

export const updateBlogPostPayloadSchema =
  createBlogPostPayloadSchema.partial();

export type CreateBlogPostPayload = z.infer<
  typeof createBlogPostPayloadSchema
>;
export type UpdateBlogPostPayload = z.infer<
  typeof updateBlogPostPayloadSchema
>;
