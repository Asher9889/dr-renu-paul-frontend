import type { AdminBookDetail } from "../types/book";
import type { BookFormValues } from "../schema/book-form.schema";

export function getEmptyBookFormValues(): BookFormValues {
  return {
    title: "",
    slug: "",
    subtitle: "",
    author: "Dr. Renu Paul",
    description: "",
    category: "",
    tags: [],
    language: "en",
    totalPages: 0,
    freePreviewPages: 5,
    price: 0,
    currency: "USD",
    cover: null,
    ebook: null,
  };
}

export function getBookFormValues(book: AdminBookDetail): BookFormValues {
  return {
    title: book.title,
    slug: book.slug,
    subtitle: book.subtitle,
    author: book.author,
    description: book.description,
    category: book.category,
    tags: book.tags,
    language: book.language,
    totalPages: book.totalPages,
    freePreviewPages: book.freePreviewPages,
    price: book.price,
    currency: book.currency,
    cover: book.cover,
    ebook: book.ebook
      ? { ...book.ebook, mimeType: "application/pdf" as const }
      : null,
  };
}
