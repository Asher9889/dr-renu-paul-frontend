import { AdminBlogEditPage } from "@/features/admin-blog";

export const instant = false;

export default async function AdminBlogEditRoute({
  params,
}: PageProps<"/admin/blogs/[id]">) {
  const { id } = await params;

  return <AdminBlogEditPage id={id} />;
}
