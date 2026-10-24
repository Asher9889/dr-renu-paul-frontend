import { Skeleton } from "@/components/ui/skeleton";

type BlogPostsSkeletonProps = {
  label: string;
};

export function BlogPostsSkeleton({ label }: BlogPostsSkeletonProps) {
  return (
    <div aria-busy="true" className="border-t border-border">
      <span className="sr-only">{label}</span>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          className="flex items-center gap-4 border-b border-border/70 py-5"
          key={index}
        >
          <Skeleton className="h-14 w-20 rounded-none" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-2/5 rounded-none" />
            <Skeleton className="h-3 w-3/5 rounded-none" />
            <Skeleton className="h-3 w-1/4 rounded-none" />
          </div>
          <Skeleton className="hidden h-6 w-24 rounded-none sm:block" />
          <Skeleton className="h-8 w-8 rounded-none" />
        </div>
      ))}
    </div>
  );
}
