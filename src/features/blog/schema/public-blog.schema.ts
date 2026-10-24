import { z } from "zod";

import { tiptapDocumentSchema } from "@/features/blog/schema/tiptap-document.schema";

export const publicBlogTagSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

export const publicBlogTagSummarySchema = publicBlogTagSchema.extend({
  count: z.number(),
});

export const publicBlogCoverSchema = z.object({
  url: z.string(),
  alt: z.string(),
  caption: z.string().nullable(),
  width: z.number(),
  height: z.number(),
});

export const publicBlogPostSummarySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  cover: publicBlogCoverSchema,
  tags: z.array(publicBlogTagSchema),
  publishedAt: z.string(),
  readingTimeMinutes: z.number(),
});

export const publicBlogPageMetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
  tag: z.string().nullable(),
});

export const publicBlogTocItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  level: z.union([z.literal(2), z.literal(3)]),
});

export const publicBlogPostDetailSchema =
  publicBlogPostSummarySchema.extend({
    content: tiptapDocumentSchema,
    toc: z.array(publicBlogTocItemSchema),
    related: z.array(publicBlogPostSummarySchema),
    updatedAt: z.string(),
  });

export const publicBlogPostListResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  statusCode: z.number().optional(),
  data: z.array(publicBlogPostSummarySchema),
  meta: publicBlogPageMetaSchema,
});

export const publicBlogPostResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  statusCode: z.number().optional(),
  data: publicBlogPostDetailSchema,
});

export const publicBlogTagsResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  statusCode: z.number().optional(),
  data: z.array(publicBlogTagSummarySchema),
  meta: z.object({
    totalPublishedPosts: z.number(),
  }),
});

export const publicBlogAuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  avatar: z.object({
    url: z.string(),
    alt: z.string(),
  }),
});

export const publicBlogAuthorResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  statusCode: z.number().optional(),
  data: publicBlogAuthorSchema,
});
