import { AdminShell, adminBlogContent } from "@/features/admin-blog";

export default function AdminLayout({ children }: LayoutProps<"/">) {
  return (
    <AdminShell content={adminBlogContent.shell}>{children}</AdminShell>
  );
}
