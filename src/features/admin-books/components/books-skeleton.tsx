import { Skeleton } from "@/components/ui/skeleton";

export function BooksSkeleton() {
  return (
    <div className="space-y-px border-t border-border">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="flex items-center gap-4 border-b border-border/80 py-4" key={index}>
          <Skeleton className="h-20 w-14" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/5" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
      ))}
    </div>
  );
}
