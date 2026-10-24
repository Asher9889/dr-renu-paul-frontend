import { z } from "zod";

import { tiptapDocumentSchema } from "@/features/admin-blog/schema/tiptap-document.schema";

export const blogPostStatusSchema = z.enum([
  "draft",
  "published",
  "archived",
]);

export const blogTagSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

export const blogCoverSchema = z.object({
  url: z.string(),
  alt: z.string(),
  caption: z.string().nullable(),
  width: z.number(),
  height: z.number(),
});

export const adminBlogPageMetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
  status: blogPostStatusSchema.nullable(),
  q: z.string().nullable(),
});

export const adminBlogPostSummarySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  cover: blogCoverSchema.nullable(),
  tags: z.array(blogTagSchema),
  status: blogPostStatusSchema,
  publishedAt: z.string().nullable(),
  readingTimeMinutes: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const adminBlogPostDetailSchema = adminBlogPostSummarySchema.extend({
  content: tiptapDocumentSchema,
});

export const adminBlogPostListResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  statusCode: z.number().optional(),
  data: z.array(adminBlogPostSummarySchema),
  meta: adminBlogPageMetaSchema,
});

export const adminBlogPostResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  statusCode: z.number().optional(),
  data: adminBlogPostDetailSchema,
});

export const adminBlogMediaResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  statusCode: z.number().optional(),
  data: z.object({
    url: z.string(),
    mimeType: z.string(),
    sizeBytes: z.number(),
    width: z.number(),
    height: z.number(),
  }),
});

export const adminBlogApiErrorSchema = z.object({
  success: z.literal(false).optional(),
  message: z.string().optional(),
  errors: z
    .array(
      z.object({
        field: z.string(),
        message: z.string(),
      }),
    )
    .optional(),
});

export type AdminBlogPageMeta = z.infer<typeof adminBlogPageMetaSchema>;
export type AdminBlogPostSummary = z.infer<
  typeof adminBlogPostSummarySchema
>;
export type AdminBlogPostDetail = z.infer<
  typeof adminBlogPostDetailSchema
>;
export type AdminBlogMedia = z.infer<
  typeof adminBlogMediaResponseSchema
>["data"];
