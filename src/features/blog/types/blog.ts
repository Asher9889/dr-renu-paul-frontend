import type { z } from "zod";

import type {
  publicBlogAuthorSchema,
  publicBlogCoverSchema,
  publicBlogPageMetaSchema,
  publicBlogPostDetailSchema,
  publicBlogPostSummarySchema,
  publicBlogTagSchema,
  publicBlogTagSummarySchema,
  publicBlogTocItemSchema,
} from "@/features/blog/schema/public-blog.schema";

export type BlogTag = z.infer<typeof publicBlogTagSchema>;
export type BlogTagSummary = z.infer<typeof publicBlogTagSummarySchema>;
export type BlogCover = z.infer<typeof publicBlogCoverSchema>;
export type BlogPostSummary = z.infer<typeof publicBlogPostSummarySchema>;
export type BlogPostDetail = z.infer<typeof publicBlogPostDetailSchema>;
export type BlogPageMeta = z.infer<typeof publicBlogPageMetaSchema>;
export type BlogTocItem = z.infer<typeof publicBlogTocItemSchema>;
export type BlogAuthor = z.infer<typeof publicBlogAuthorSchema>;

export type BlogListResult = {
  posts: BlogPostSummary[];
  meta: BlogPageMeta;
};

export type BlogTagListResult = {
  tags: BlogTagSummary[];
  totalPublishedPosts: number;
};

export type PublicBlogPostsQuery = {
  tag?: string;
  page: number;
  limit: number;
};

export type BlogSearchParams = Record<
  string,
  string | string[] | undefined
>;

export type BlogListingContent = {
  eyebrow: string;
  headlineLead: string;
  headlineItalic: string;
  headlineTrail: string;
  description: string;
  filterLabel: string;
  mobileFilterLabel: string;
  allTagLabel: string;
  emptyMessage: string;
  emptyActionLabel: string;
  paginationLabel: string;
  newerLabel: string;
  olderLabel: string;
};

export type BlogAppointmentContent = {
  eyebrow: string;
  heading: string;
  body: string;
  label: string;
  href: string;
};

export type BlogDetailContent = {
  backLabel: string;
  tocLabel: string;
  authorLabel: string;
  figureLabel: string;
  articleNote: string;
  relatedEyebrow: string;
  relatedHeading: string;
  allNotesLabel: string;
  appointment: BlogAppointmentContent;
};
