import type { JSONContent } from "@tiptap/react";
import { z } from "zod";

import { BLOG_SLUG_PATTERN } from "@/features/admin-blog/schema/blog-post-payload.schema";

const httpUrlSchema = z
  .url("Please provide a valid URL.")
  .refine(
    (value) => /^https?:\/\//i.test(value),
    "URLs must use http or https.",
  );

export const blogCoverFormSchema = z
  .object({
    url: httpUrlSchema,
    alt: z
      .string()
      .trim()
      .min(1, "Alt text is required.")
      .max(300, "Alt text must be 300 characters or fewer."),
    caption: z
      .string()
      .trim()
      .max(500, "Caption must be 500 characters or fewer."),
    width: z.number().int().positive().max(20000),
    height: z.number().int().positive().max(20000),
  })
  .strict();

export const blogPostFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "A title is required.")
    .max(200, "Titles must be 200 characters or fewer."),
  slug: z
    .string()
    .trim()
    .max(160, "Slugs must be 160 characters or fewer.")
    .refine(
      (value) => value === "" || BLOG_SLUG_PATTERN.test(value),
      "Use lowercase letters, numbers, and single hyphens.",
    ),
  excerpt: z
    .string()
    .trim()
    .max(200, "Excerpts must be 200 characters or fewer."),
  content: z.custom<JSONContent>(
    (value) =>
      typeof value === "object" &&
      value !== null &&
      (value as JSONContent).type === "doc" &&
      Array.isArray((value as JSONContent).content),
    "The note content is invalid.",
  ),
  cover: blogCoverFormSchema.nullable(),
  tags: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Tags cannot be empty.")
        .max(60, "Tags must be 60 characters or fewer."),
    )
    .max(20, "A note can have at most 20 tags."),
});

export type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;
