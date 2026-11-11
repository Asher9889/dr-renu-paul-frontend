"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminBooksContent } from "../content/admin-books-content";
import type { BookStatus } from "../types/book";

export type BookStatusFilter = BookStatus | "all";

const statusFilters: BookStatusFilter[] = ["all", "DRAFT", "PUBLISHED", "ARCHIVED"];

type BooksToolbarProps = {
  status: BookStatusFilter;
  search: string;
  hasFilters: boolean;
  onStatusChange: (status: BookStatusFilter) => void;
  onSearchChange: (search: string) => void;
  onReset: () => void;
};

export function BooksToolbar({ status, search, hasFilters, onStatusChange, onSearchChange, onReset }: BooksToolbarProps) {
  const copy = adminBooksContent.list;

  return (
    <div className="flex flex-col gap-5 py-6 md:flex-row md:items-end md:justify-between md:gap-8">
      <Tabs onValueChange={(value) => onStatusChange(value as BookStatusFilter)} value={status}>
        <TabsList className="gap-6" variant="line">
          {statusFilters.map((filter) => (
            <TabsTrigger className="px-0 text-micro font-medium uppercase tracking-[0.1em]" key={filter} value={filter}>
              {copy.statusTabs[filter]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex items-end gap-2">
        <InputGroup className="h-9 w-full md:w-72">
          <InputGroupAddon><Search /></InputGroupAddon>
          <InputGroupInput
            aria-label={copy.searchLabel}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={copy.searchPlaceholder}
            value={search}
          />
          {search ? (
            <InputGroupAddon align="inline-end">
              <InputGroupButton aria-label={copy.searchLabel} onClick={() => onSearchChange("")} size="icon-xs" variant="ghost">
                <X />
              </InputGroupButton>
            </InputGroupAddon>
          ) : null}
        </InputGroup>
        {hasFilters ? <Button onClick={onReset} size="sm" variant="ghost">{copy.resetLabel}</Button> : null}
      </div>
    </div>
  );
}
