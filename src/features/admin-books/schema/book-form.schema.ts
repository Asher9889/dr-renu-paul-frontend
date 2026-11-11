import { z } from "zod";

export const BOOK_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const bookCoverFormSchema = z.object({
  url: z.url("Please provide a valid cover URL."),
  alt: z.string().trim().min(1, "Alt text is required.").max(300),
  width: z.number().int().positive().max(20000),
  height: z.number().int().positive().max(20000),
});

export const bookEbookFormSchema = z.object({
  storageKey: z.string().trim().min(1, "Upload the PDF again.").max(500),
  fileName: z.string().trim().min(1).max(255),
  mimeType: z.literal("application/pdf"),
  sizeBytes: z.number().int().positive(),
});

export const bookFormSchema = z
  .object({
    title: z.string().trim().min(1, "A title is required.").max(200),
    slug: z
      .string()
      .trim()
      .max(160)
      .refine(
        (value) => value === "" || BOOK_SLUG_PATTERN.test(value),
        "Use lowercase letters, numbers, and single hyphens.",
      ),
    subtitle: z.string().trim().max(200),
    author: z.string().trim().max(120),
    description: z.string().trim().max(5000),
    category: z.string().trim().max(80),
    tags: z.array(z.string().trim().min(1).max(60)).max(20),
    language: z.string().trim().min(2).max(20),
    // Page count comes from the PDF once the processor has rendered it.
    totalPages: z.number().int().min(0).max(100000),
    freePreviewPages: z.number().int().min(0).max(100000),
    price: z.number().min(0).max(100000),
    currency: z.string().trim().length(3),
    cover: bookCoverFormSchema.nullable(),
    ebook: bookEbookFormSchema.nullable(),
  })
  .refine(
    (values) =>
      values.totalPages === 0 || values.freePreviewPages <= values.totalPages,
    {
      message: "Free preview pages cannot exceed total pages.",
      path: ["freePreviewPages"],
    },
  );

export type BookFormValues = z.infer<typeof bookFormSchema>;
