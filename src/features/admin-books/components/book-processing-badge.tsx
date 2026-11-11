import { AlertTriangle, Check, Clock3, Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BookProcessing, BookProcessingStatus } from "../types/book";

const labels: Record<BookProcessingStatus, string> = {
  IDLE: "Not prepared",
  PENDING: "Queued",
  PROCESSING: "Preparing pages",
  READY: "Pages ready",
  FAILED: "Preparation failed",
};

const styles: Record<BookProcessingStatus, string> = {
  IDLE: "border-border bg-transparent text-muted-foreground/70",
  PENDING: "border-border bg-secondary text-muted-foreground",
  PROCESSING: "border-gold/40 bg-gold/10 text-gold",
  READY: "border-emerald-700/30 bg-emerald-700/10 text-emerald-800",
  FAILED: "border-destructive/40 bg-destructive/10 text-destructive",
};

function StatusIcon({ status }: { status: BookProcessingStatus }) {
  if (status === "PENDING" || status === "PROCESSING") {
    return <Loader2 aria-hidden className="size-3 animate-spin" />;
  }
  if (status === "READY") return <Check aria-hidden className="size-3" />;
  if (status === "FAILED") return <AlertTriangle aria-hidden className="size-3" />;
  return <Clock3 aria-hidden className="size-3" />;
}

export function BookProcessingBadge({
  processing,
  className,
}: {
  processing: BookProcessing;
  className?: string;
}) {
  return (
    <Badge
      className={cn(
        "h-6 gap-1.5 rounded-sm border px-2 text-micro uppercase",
        styles[processing.status],
        className,
      )}
      variant="outline"
    >
      <StatusIcon status={processing.status} />
      {labels[processing.status]}
      {processing.status === "READY" && processing.pageCount > 0 ? (
        <span className="tabular-nums text-current/70">· {processing.pageCount}</span>
      ) : null}
    </Badge>
  );
}

export { labels as bookProcessingLabels };
