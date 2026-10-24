"use client";

import { BlogPostEditorError } from "@/features/admin-blog/components/blog-post-editor-error";
import { BlogPostEditorLoading } from "@/features/admin-blog/components/blog-post-editor-loading";
import { BlogPostForm } from "@/features/admin-blog/components/blog-post-form";
import { adminBlogContent } from "@/features/admin-blog/content/admin-blog-content";
import { useAdminBlogPost } from "@/features/admin-blog/hooks/use-admin-blog-post";

type AdminBlogEditPageProps = {
  id: string;
};

export function AdminBlogEditPage({ id }: AdminBlogEditPageProps) {
  const postQuery = useAdminBlogPost(id);

  if (postQuery.isPending) {
    return <BlogPostEditorLoading content={adminBlogContent.editor} />;
  }

  if (postQuery.isError) {
    return (
      <BlogPostEditorError
        content={adminBlogContent.editor}
        onRetry={() => postQuery.refetch()}
      />
    );
  }

  return <BlogPostForm post={postQuery.data} />;
}
