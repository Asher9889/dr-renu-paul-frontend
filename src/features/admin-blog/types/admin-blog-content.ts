import type { adminBlogContent } from "@/features/admin-blog/content/admin-blog-content";

export type AdminBlogContent = typeof adminBlogContent;
export type AdminBlogShellContent = AdminBlogContent["shell"];
export type AdminBlogListContent = AdminBlogContent["list"];
export type AdminBlogEditorContent = AdminBlogContent["editor"];
export type AdminBlogStatusLabels = AdminBlogContent["statusLabels"];
export type AdminBlogToasts = AdminBlogContent["toasts"];
