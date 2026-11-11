import { Badge } from "@/components/ui/badge";
import type { BookStatus } from "../types/book";
import { cn } from "@/lib/utils";

const statusStyles: Record<BookStatus, string> = {
  DRAFT: "border-border bg-secondary text-muted-foreground",
  PUBLISHED: "border-gold/40 bg-gold/10 text-gold",
  ARCHIVED: "border-border bg-transparent text-muted-foreground/70",
};

const statusLabels: Record<BookStatus, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  ARCHIVED: "Archived",
};

export function BookStatusBadge({ status }: { status: BookStatus }) {
  return (
    <Badge
      className={cn("h-6 gap-1.5 rounded-sm border px-2 text-micro uppercase", statusStyles[status])}
      variant="outline"
    >
      <span aria-hidden className="size-1 rounded-full bg-current" />
      {statusLabels[status]}
    </Badge>
  );
}
