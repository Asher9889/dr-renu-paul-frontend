"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AdminBlogStatusFilter } from "@/features/admin-blog/hooks/use-blog-post-filters";
import type { AdminBlogListContent } from "@/features/admin-blog/types/admin-blog-content";

const statusFilters: AdminBlogStatusFilter[] = [
  "all",
  "draft",
  "published",
  "archived",
];

type BlogPostsToolbarProps = {
  content: AdminBlogListContent;
  status: AdminBlogStatusFilter;
  search: string;
  hasFilters: boolean;
  onStatusChange: (status: AdminBlogStatusFilter) => void;
  onSearchChange: (search: string) => void;
  onReset: () => void;
};

export function BlogPostsToolbar({
  content,
  status,
  search,
  hasFilters,
  onStatusChange,
  onSearchChange,
  onReset,
}: BlogPostsToolbarProps) {
  return (
    <div className="flex flex-col gap-5 py-6 md:flex-row md:items-end md:justify-between md:gap-8">
      <Tabs
        onValueChange={(value) =>
          onStatusChange(value as AdminBlogStatusFilter)
        }
        value={status}
      >
        <TabsList className="gap-6" variant="line">
          {statusFilters.map((filter) => (
            <TabsTrigger
              className="px-0 text-micro font-medium uppercase tracking-[0.1em]"
              key={filter}
              value={filter}
            >
              {content.statusTabs[filter]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex items-end gap-2">
        <InputGroup className="h-9 w-full md:w-72">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            aria-label={content.searchLabel}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={content.searchPlaceholder}
            value={search}
          />
          {search ? (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label={content.clearSearchLabel}
                onClick={() => onSearchChange("")}
                size="icon-xs"
                variant="ghost"
              >
                <X />
              </InputGroupButton>
            </InputGroupAddon>
          ) : null}
        </InputGroup>

        {hasFilters ? (
          <Button onClick={onReset} size="sm" variant="ghost">
            {content.resetLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
