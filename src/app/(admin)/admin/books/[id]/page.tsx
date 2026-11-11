import { Suspense } from "react";

import { AdminBooksEditPage } from "@/features/admin-books";

export const metadata = { title: "Edit book" };

async function EditContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminBooksEditPage id={id} />;
}

export default function AdminBooksEditRoute({ params }: PageProps<"/admin/books/[id]">) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1240px] px-6 py-16 text-caption text-muted-foreground">Opening the edition…</div>}>
      <EditContent params={params} />
    </Suspense>
  );
}
