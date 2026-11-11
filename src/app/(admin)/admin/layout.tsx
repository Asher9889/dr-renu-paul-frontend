import { Suspense } from "react";

import { AdminShell, adminBlogContent } from "@/features/admin-blog";

export default function AdminLayout({ children }: LayoutProps<"/">) {
  return (
    <Suspense fallback={<div className="min-h-svh bg-background" />}>
      <AdminShell content={adminBlogContent.shell}>{children}</AdminShell>
    </Suspense>
  );
}
