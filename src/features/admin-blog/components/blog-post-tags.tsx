import { Badge } from "@/components/ui/badge";
import type { BlogTag } from "@/features/admin-blog/types/blog";
import { cn } from "@/lib/utils";

type BlogPostTagsProps = {
  tags: BlogTag[];
  untaggedLabel: string;
  maxVisible?: number;
  className?: string;
};

export function BlogPostTags({
  tags,
  untaggedLabel,
  maxVisible = 2,
  className,
}: BlogPostTagsProps) {
  if (tags.length === 0) {
    return (
      <span className="text-micro uppercase text-muted-foreground/60">
        {untaggedLabel}
      </span>
    );
  }

  const visibleTags = tags.slice(0, maxVisible);
  const hiddenCount = tags.length - visibleTags.length;

  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      {visibleTags.map((tag) => (
        <Badge
          className="h-5 rounded-sm bg-secondary px-1.5 text-micro uppercase text-muted-foreground"
          key={tag.slug}
          variant="secondary"
        >
          {tag.name}
        </Badge>
      ))}
      {hiddenCount > 0 ? (
        <span className="text-micro text-muted-foreground">
          +{hiddenCount}
        </span>
      ) : null}
    </div>
  );
}
