export function BlogPostSkeleton() {
  return (
    <main aria-busy="true" className="flex-1">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-14 md:py-20">
        <div className="h-7 w-32 border border-border bg-muted" />
        <div className="mt-8 h-12 w-full max-w-[20ch] bg-muted md:h-16" />
        <div className="mt-6 h-4 w-full max-w-[52ch] bg-muted" />
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="aspect-[16/9] max-h-[560px] border border-border bg-muted" />
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-[1240px] grid-cols-1 border-t border-border px-6 lg:grid-cols-12">
        <div className="space-y-4 py-10 lg:col-span-8 lg:border-r lg:border-border lg:py-14 lg:pr-12">
          <div className="h-4 w-11/12 bg-muted" />
          <div className="h-4 w-full bg-muted" />
          <div className="h-4 w-4/5 bg-muted" />
          <div className="h-4 w-full bg-muted" />
          <div className="h-4 w-2/3 bg-muted" />
        </div>

        <div className="border-t border-border py-10 lg:col-span-4 lg:border-t-0 lg:py-14 lg:pl-10">
          <div className="flex items-start gap-4">
            <div className="size-11 shrink-0 border border-border bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-20 bg-muted" />
              <div className="h-4 w-32 bg-muted" />
            </div>
          </div>
          <div className="mt-8 h-40 border border-border bg-muted" />
        </div>
      </div>
    </main>
  );
}
