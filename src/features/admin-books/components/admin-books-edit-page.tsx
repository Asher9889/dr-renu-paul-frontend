"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { adminBooksContent } from "../content/admin-books-content";
import { useAdminBook } from "../hooks/use-admin-book";
import { BookForm } from "./book-form";

export function AdminBooksEditPage({ id }: { id: string }) {
  const query = useAdminBook(id);

  if (query.isPending) {
    return <div className="mx-auto max-w-[1240px] px-6 py-14 text-caption text-muted-foreground">Loading book…</div>;
  }

  if (query.isError || !query.data) {
    return (
      <div className="mx-auto max-w-[1240px] px-6 py-14">
        <Link className="inline-flex items-center gap-2 text-micro uppercase text-muted-foreground" href="/admin/books">
          <ArrowLeft className="size-3.5" />
          {adminBooksContent.editor.backLabel}
        </Link>
        <p className="mt-6 font-display text-subheading">This book could not be loaded.</p>
      </div>
    );
  }

  return <BookForm book={query.data} />;
}
