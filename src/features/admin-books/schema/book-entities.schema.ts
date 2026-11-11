import { z } from "zod";

export const bookStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const bookProcessingStatusSchema = z.enum([
  "IDLE",
  "PENDING",
  "PROCESSING",
  "READY",
  "FAILED",
]);

export const bookProcessingSchema = z.object({
  status: bookProcessingStatusSchema,
  pageCount: z.number(),
  error: z.string().nullable(),
  startedAt: z.string().nullable(),
  completedAt: z.string().nullable(),
});

export const bookCoverSchema = z.object({
  url: z.string(),
  alt: z.string(),
  width: z.number(),
  height: z.number(),
});

export const bookEbookSchema = z.object({
  storageKey: z.string(),
  fileName: z.string(),
  mimeType: z.string(),
  sizeBytes: z.number(),
});

export const bookPageMetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

export const adminBookSummarySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  author: z.string(),
  description: z.string(),
  cover: bookCoverSchema.nullable(),
  category: z.string(),
  tags: z.array(z.string()),
  language: z.string(),
  totalPages: z.number(),
  freePreviewPages: z.number(),
  price: z.number(),
  currency: z.string(),
  status: bookStatusSchema,
  processing: bookProcessingSchema,
  publishedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const adminBookDetailSchema = adminBookSummarySchema.extend({
  ebook: bookEbookSchema.nullable(),
});

export const adminBookListResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  statusCode: z.number().optional(),
  data: z.array(adminBookSummarySchema),
  meta: bookPageMetaSchema,
});

export const adminBookResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  statusCode: z.number().optional(),
  data: adminBookDetailSchema,
});

export const adminBookMediaResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  statusCode: z.number().optional(),
  data: z.object({
    url: z.string().optional(),
    storageKey: z.string().optional(),
    mimeType: z.string(),
    sizeBytes: z.number(),
    width: z.number().optional(),
    height: z.number().optional(),
    fileName: z.string().optional(),
  }),
});

export const adminBookApiErrorSchema = z.object({
  success: z.literal(false).optional(),
  message: z.string().optional(),
  errors: z
    .array(z.object({ field: z.string(), message: z.string() }))
    .optional(),
});
