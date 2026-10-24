export function BlogGridSkeleton() {
  return (
    <div
      aria-hidden
      className="grid grid-cols-1 border-l border-t border-border md:grid-cols-2 lg:grid-cols-3"
    >
      {[0, 1, 2].map((item) => (
        <div
          className="border-b border-r border-border bg-background p-5 md:p-7"
          key={item}
        >
          <div className="aspect-[4/3] border border-border bg-muted" />
          <div className="mt-5 h-5 w-24 bg-muted" />
          <div className="mt-4 h-6 w-full bg-muted" />
          <div className="mt-2 h-4 w-4/5 bg-muted" />
        </div>
      ))}
    </div>
  );
}
