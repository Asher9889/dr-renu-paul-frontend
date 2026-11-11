"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { adminBooksContent } from "../content/admin-books-content";
import type { BookPageMeta } from "../types/book";

export function BooksPagination({ meta, onPageChange }: { meta: BookPageMeta; onPageChange: (page: number) => void }) {
  const copy = adminBooksContent.list.pagination;
  const from = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
  const to = Math.min(meta.page * meta.limit, meta.total);

  return (
    <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-micro uppercase tabular-nums text-muted-foreground">
        {copy.showingLabel} {from}–{to} {copy.ofLabel} {meta.total}
      </p>
      <Pagination className="mx-0 w-auto justify-start sm:justify-end">
        <PaginationContent>
          <PaginationItem>
            <Button disabled={!meta.hasPreviousPage} onClick={() => onPageChange(meta.page - 1)} size="sm" variant="ghost">
              <ChevronLeft data-icon="inline-start" />
              {copy.previous}
            </Button>
          </PaginationItem>
          <PaginationItem>
            <span className="px-3 text-micro uppercase tabular-nums text-muted-foreground">{meta.page} / {Math.max(meta.totalPages, 1)}</span>
          </PaginationItem>
          <PaginationItem>
            <Button disabled={!meta.hasNextPage} onClick={() => onPageChange(meta.page + 1)} size="sm" variant="ghost">
              {copy.next}
              <ChevronRight data-icon="inline-end" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
