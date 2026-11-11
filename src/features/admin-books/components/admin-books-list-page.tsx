"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { adminBooksContent } from "../content/admin-books-content";
import { useAdminBooks } from "../hooks/use-admin-books";
import { useBookFilters } from "../hooks/use-book-filters";
import { BooksEmpty } from "./books-empty";
import { BooksError } from "./books-error";
import { BooksPageHeader } from "./books-page-header";
import { BooksPagination } from "./books-pagination";
import { BooksSkeleton } from "./books-skeleton";
import { BooksToolbar } from "./books-toolbar";
import { BookTable } from "./book-table";

export function AdminBooksListPage() {
  const copy = adminBooksContent.list;
  const filters = useBookFilters();
  const booksQuery = useAdminBooks(filters.query);
  const books = booksQuery.data?.books ?? [];
  const meta = booksQuery.data?.meta;

  return (
    <div className="mx-auto w-full max-w-[1240px] px-6 py-10 md:py-14">
      <BooksPageHeader
        description={copy.description}
        eyebrow={copy.eyebrow}
        titleItalic={copy.headlineItalic}
        titleLead={copy.headlineLead}
      >
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-micro uppercase text-muted-foreground">{filters.hasFilters ? "in this view" : copy.totalLabel}</p>
            <p className="mt-1 font-display text-subheading leading-none tabular-nums">{meta ? meta.total : "—"}</p>
          </div>
          <Button asChild size="lg">
            <Link href="/admin/books/new">
              <Plus data-icon="inline-start" />
              {copy.newBookLabel}
            </Link>
          </Button>
        </div>
      </BooksPageHeader>

      <BooksToolbar
        hasFilters={filters.hasFilters}
        onReset={filters.resetFilters}
        onSearchChange={filters.setSearch}
        onStatusChange={filters.setStatus}
        search={filters.search}
        status={filters.status}
      />

      {booksQuery.isPending ? (
        <BooksSkeleton />
      ) : booksQuery.isError ? (
        <BooksError onRetry={() => booksQuery.refetch()} />
      ) : books.length === 0 ? (
        <BooksEmpty isFiltered={filters.hasFilters} onReset={filters.resetFilters} />
      ) : (
        <div aria-busy={booksQuery.isFetching}>
          <div className="border-t border-border">
            <BookTable books={books} />
          </div>
          {meta ? <BooksPagination meta={meta} onPageChange={filters.setPage} /> : null}
        </div>
      )}
    </div>
  );
}
