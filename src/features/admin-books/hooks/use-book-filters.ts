import { useMemo, useState } from "react";
import type { BookStatus } from "../types/book";

const PAGE_SIZE = 20;

export function useBookFilters() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<BookStatus | "all">("all");
  const [page, setPage] = useState(1);

  const query = useMemo(
    () => ({
      status: status === "all" ? undefined : status,
      q: search.trim() || undefined,
      page,
      limit: PAGE_SIZE,
    }),
    [page, search, status],
  );

  const hasFilters = Boolean(search.trim()) || status !== "all";

  function resetFilters() {
    setSearch("");
    setStatus("all");
    setPage(1);
  }

  function changeSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function changeStatus(value: BookStatus | "all") {
    setStatus(value);
    setPage(1);
  }

  return {
    search,
    status,
    page,
    query,
    hasFilters,
    setSearch: changeSearch,
    setStatus: changeStatus,
    setPage,
    resetFilters,
  };
}
