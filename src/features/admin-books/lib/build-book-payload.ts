import type { BookFormValues } from "../schema/book-form.schema";
import type { CreateBookPayload } from "../types/book";

export function buildBookPayload(values: BookFormValues): CreateBookPayload {
  return {
    title: values.title,
    slug: values.slug.trim() ? values.slug.trim() : undefined,
    subtitle: values.subtitle || undefined,
    author: values.author || undefined,
    description: values.description || undefined,
    category: values.category || undefined,
    tags: values.tags,
    language: values.language || undefined,
    totalPages: values.totalPages,
    freePreviewPages: values.freePreviewPages,
    price: values.price,
    currency: values.currency.toUpperCase(),
    cover: values.cover,
    ebook: values.ebook,
  };
}
