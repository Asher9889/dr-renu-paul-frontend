"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import type { AdminBlogListContent } from "@/features/admin-blog/types/admin-blog-content";
import type { AdminBlogPageMeta } from "@/features/admin-blog/types/blog";

type BlogPostsPaginationProps = {
  content: AdminBlogListContent;
  meta: AdminBlogPageMeta;
  onPageChange: (page: number) => void;
};

export function BlogPostsPagination({
  content,
  meta,
  onPageChange,
}: BlogPostsPaginationProps) {
  const from = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
  const to = Math.min(meta.page * meta.limit, meta.total);

  return (
    <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-micro uppercase tabular-nums text-muted-foreground">
        {content.pagination.showingLabel} {from}–{to}{" "}
        {content.pagination.ofLabel} {meta.total}
      </p>

      <Pagination className="mx-0 w-auto justify-start sm:justify-end">
        <PaginationContent>
          <PaginationItem>
            <Button
              disabled={!meta.hasPreviousPage}
              onClick={() => onPageChange(meta.page - 1)}
              size="sm"
              variant="ghost"
            >
              <ChevronLeft data-icon="inline-start" />
              {content.pagination.previous}
            </Button>
          </PaginationItem>
          <PaginationItem>
            <span className="px-3 text-micro uppercase tabular-nums text-muted-foreground">
              {meta.page} / {Math.max(meta.totalPages, 1)}
            </span>
          </PaginationItem>
          <PaginationItem>
            <Button
              disabled={!meta.hasNextPage}
              onClick={() => onPageChange(meta.page + 1)}
              size="sm"
              variant="ghost"
            >
              {content.pagination.next}
              <ChevronRight data-icon="inline-end" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
