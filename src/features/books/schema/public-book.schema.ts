import { z } from "zod";

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

export const publicBookCoverSchema = z.object({
  url: z.string(),
  alt: z.string(),
  width: z.number(),
  height: z.number(),
});

export const publicBookSummarySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  author: z.string(),
  description: z.string(),
  cover: publicBookCoverSchema.nullable(),
  category: z.string(),
  tags: z.array(z.string()),
  language: z.string(),
  totalPages: z.number(),
  freePreviewPages: z.number(),
  price: z.number(),
  currency: z.string(),
  publishedAt: z.string().nullable(),
});

export const publicBookDetailSchema = publicBookSummarySchema.extend({
  processing: bookProcessingSchema,
  updatedAt: z.string(),
});

export const publicBookListResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.array(publicBookSummarySchema),
  meta: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
  }),
});

export const publicBookResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: publicBookDetailSchema,
});

export const bookAccessSchema = z.object({
  hasFullAccess: z.boolean(),
  isPreviewOnly: z.boolean(),
  purchased: z.boolean(),
  price: z.number(),
  currency: z.string(),
  freePreviewPages: z.number(),
  totalPages: z.number(),
});

export const readerPageSchema = z.object({
  pageNumber: z.number(),
  width: z.number(),
  height: z.number(),
  locked: z.boolean(),
  imageUrl: z.string().nullable(),
});

export const bookReaderResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    book: publicBookSummarySchema,
    access: bookAccessSchema,
    pages: z.array(readerPageSchema),
  }),
});

export const bookPurchaseSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  bookSlug: z.string(),
  userId: z.string().nullable(),
  amount: z.number(),
  currency: z.string(),
  status: z.enum(["PENDING", "PAID", "REFUNDED", "CANCELLED"]),
  provider: z.string(),
  providerReference: z.string().nullable(),
  providerPaymentId: z.string().nullable().optional(),
  purchasedAt: z.string().nullable(),
  createdAt: z.string(),
});

export const bookAccessResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    access: bookAccessSchema,
    purchase: bookPurchaseSchema.nullable(),
  }),
});

export const bookPurchaseResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    purchase: bookPurchaseSchema,
    access: bookAccessSchema,
  }),
});
export const bookPurchaseOrderSchema = z.object({
  orderId: z.string(),
  amount: z.number(),
  currency: z.string(),
  keyId: z.string(),
  purchase: bookPurchaseSchema,
  access: bookAccessSchema,
});

export const bookPurchaseOrderResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: bookPurchaseOrderSchema,
});

export const bookApiErrorSchema = z.object({
  success: z.literal(false).optional(),
  message: z.string().optional(),
  errors: z
    .array(z.object({ field: z.string(), message: z.string() }))
    .optional(),
});
