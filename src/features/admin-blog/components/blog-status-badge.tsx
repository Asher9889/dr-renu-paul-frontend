import { Badge } from "@/components/ui/badge";
import type { BlogPostStatus } from "@/features/admin-blog/types/blog";
import type { AdminBlogStatusLabels } from "@/features/admin-blog/types/admin-blog-content";
import { cn } from "@/lib/utils";

const statusStyles: Record<BlogPostStatus, string> = {
  draft: "border-border bg-secondary text-muted-foreground",
  published: "border-gold/40 bg-gold/10 text-gold",
  archived: "border-border bg-transparent text-muted-foreground/70",
};

type BlogStatusBadgeProps = {
  status: BlogPostStatus;
  labels: AdminBlogStatusLabels;
  className?: string;
};

export function BlogStatusBadge({
  status,
  labels,
  className,
}: BlogStatusBadgeProps) {
  return (
    <Badge
      className={cn(
        "h-6 gap-1.5 rounded-sm border px-2 text-micro uppercase",
        statusStyles[status],
        className,
      )}
      variant="outline"
    >
      <span aria-hidden className="size-1 rounded-full bg-current" />
      {labels[status]}
    </Badge>
  );
}
