import type { z } from "zod";

import type {
  adminBlogMediaResponseSchema,
  adminBlogPageMetaSchema,
  adminBlogPostDetailSchema,
  adminBlogPostSummarySchema,
  blogCoverSchema,
  blogPostStatusSchema,
  blogTagSchema,
} from "@/features/admin-blog/schema/blog-entities.schema";
import type { blogCoverFormSchema } from "@/features/admin-blog/schema/blog-post-form.schema";
import type {
  CreateBlogPostPayload,
  UpdateBlogPostPayload,
} from "@/features/admin-blog/schema/blog-post-payload.schema";
import type { TiptapDocument } from "@/features/blog/schema/tiptap-document.schema";

export type {
  CreateBlogPostPayload,
  UpdateBlogPostPayload,
  TiptapDocument,
};

export type BlogPostStatus = z.infer<typeof blogPostStatusSchema>;
export type BlogTag = z.infer<typeof blogTagSchema>;
export type BlogCover = z.infer<typeof blogCoverSchema>;
export type BlogCoverForm = z.infer<typeof blogCoverFormSchema>;

export type AdminBlogPageMeta = z.infer<typeof adminBlogPageMetaSchema>;
export type AdminBlogPostSummary = z.infer<
  typeof adminBlogPostSummarySchema
>;
export type AdminBlogPostDetail = z.infer<
  typeof adminBlogPostDetailSchema
>;
export type AdminBlogMedia = z.infer<
  typeof adminBlogMediaResponseSchema
>["data"];

export type BlogPostStatusAction = "publish" | "unpublish" | "archive";

export type AdminBlogListQuery = {
  status?: BlogPostStatus;
  q?: string;
  page: number;
  limit: number;
};

export type AdminBlogListResult = {
  posts: AdminBlogPostSummary[];
  meta: AdminBlogPageMeta;
};
