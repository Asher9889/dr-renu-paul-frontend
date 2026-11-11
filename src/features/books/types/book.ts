import type { z } from "zod";
import type {
  bookAccessResponseSchema,
  bookAccessSchema,
  bookProcessingSchema,
  bookProcessingStatusSchema,
  bookPurchaseResponseSchema,
  bookPurchaseSchema,
  bookReaderResponseSchema,
  publicBookDetailSchema,
  publicBookSummarySchema,
  readerPageSchema,
} from "../schema/public-book.schema";

export type BookProcessingStatus = z.infer<typeof bookProcessingStatusSchema>;
export type BookProcessing = z.infer<typeof bookProcessingSchema>;
export type BookSummary = z.infer<typeof publicBookSummarySchema>;
export type BookDetail = z.infer<typeof publicBookDetailSchema>;
export type BookAccess = z.infer<typeof bookAccessSchema>;
export type ReaderPage = z.infer<typeof readerPageSchema>;
export type BookReader = z.infer<typeof bookReaderResponseSchema>["data"];
export type BookPurchase = z.infer<typeof bookPurchaseSchema>;
export type BookAccessResult = z.infer<typeof bookAccessResponseSchema>["data"];
export type BookPurchaseResult = z.infer<typeof bookPurchaseResponseSchema>["data"];
