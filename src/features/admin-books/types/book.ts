import type { z } from "zod";

import type {
  adminBookDetailSchema,
  adminBookMediaResponseSchema,
  adminBookSummarySchema,
  bookCoverSchema,
  bookEbookSchema,
  bookPageMetaSchema,
  bookProcessingSchema,
  bookProcessingStatusSchema,
  bookStatusSchema,
} from "../schema/book-entities.schema";
import type { BookFormValues } from "../schema/book-form.schema";

export type BookStatus = z.infer<typeof bookStatusSchema>;
export type BookProcessingStatus = z.infer<typeof bookProcessingStatusSchema>;
export type BookProcessing = z.infer<typeof bookProcessingSchema>;
export type BookCover = z.infer<typeof bookCoverSchema>;
export type BookEbook = z.infer<typeof bookEbookSchema>;
export type AdminBookSummary = z.infer<typeof adminBookSummarySchema>;
export type AdminBookDetail = z.infer<typeof adminBookDetailSchema>;
export type AdminBookMedia = z.infer<typeof adminBookMediaResponseSchema>["data"];
export type BookPageMeta = z.infer<typeof bookPageMetaSchema>;
export type { BookFormValues };

export type BookStatusAction = "publish" | "unpublish" | "archive";

export type AdminBookListQuery = {
  status?: BookStatus;
  q?: string;
  page: number;
  limit: number;
};

export type AdminBookListResult = {
  books: AdminBookSummary[];
  meta: BookPageMeta;
};

export type CreateBookPayload = {
  title: string;
  slug?: string;
  subtitle?: string;
  author?: string;
  description?: string;
  cover?: BookCover | null;
  ebook?: BookEbook | null;
  category?: string;
  tags?: string[];
  language?: string;
  totalPages?: number;
  freePreviewPages?: number;
  price?: number;
  currency?: string;
};
