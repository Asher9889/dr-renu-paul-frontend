import { Check } from "lucide-react";

import type { AdminBlogEditorContent } from "@/features/admin-blog/types/admin-blog-content";
import {
  isReadyToPublish,
  type PublishChecklistItem,
} from "@/features/admin-blog/lib/publish-readiness";
import { cn } from "@/lib/utils";

type BlogPublishChecklistProps = {
  content: AdminBlogEditorContent["publication"];
  items: PublishChecklistItem[];
};

export function BlogPublishChecklist({
  content,
  items,
}: BlogPublishChecklistProps) {
  const ready = isReadyToPublish(items);

  return (
    <div className="border border-border bg-secondary/30 p-4">
      <p className="text-micro font-medium uppercase text-foreground">
        {content.checklistTitle}
      </p>

      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            className="flex items-center gap-2.5 text-caption text-muted-foreground"
            key={item.id}
          >
            <span
              className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded-full border",
                item.complete
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background",
              )}
            >
              {item.complete ? (
                <Check className="size-2.5" strokeWidth={2.5} />
              ) : null}
            </span>
            <span className={cn(item.complete && "text-foreground")}>
              {content.checklist[item.id]}
            </span>
            {item.detail ? (
              <span className="ml-auto text-micro uppercase tabular-nums text-muted-foreground/60">
                {item.detail}
              </span>
            ) : null}
          </li>
        ))}
      </ul>

      <p
        className={cn(
          "mt-4 border-t border-border pt-3 text-micro uppercase",
          ready ? "text-gold" : "text-muted-foreground",
        )}
      >
        {ready ? content.readyLabel : content.incompleteLabel}
      </p>
    </div>
  );
}
