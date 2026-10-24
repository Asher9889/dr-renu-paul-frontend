import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AdminBlogShellContent } from "@/features/admin-blog/types/admin-blog-content";

type AdminShellProps = {
  content: AdminBlogShellContent;
  children: React.ReactNode;
};

export function AdminShell({ content, children }: AdminShellProps) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-20 w-full max-w-[1240px] items-center justify-between gap-4 px-6">
          <div className="flex min-w-0 items-center gap-6">
            <Link className="flex shrink-0 flex-col leading-none" href="/admin/blogs">
              <span className="font-display text-lg uppercase tracking-[0.18em]">
                {content.logotype}
              </span>
              <span className="mt-1.5 text-micro uppercase text-gold">
                {content.studioLabel}
              </span>
            </Link>

            <span className="hidden h-8 w-px bg-border md:block" />

            <nav
              aria-label="Studio"
              className="hidden items-baseline gap-2 md:flex"
            >
              <span className="text-micro text-gold">{content.journalIndex}</span>
              <Link
                className="text-micro font-medium uppercase text-foreground/80 transition-colors hover:text-foreground"
                href="/admin/blogs"
              >
                {content.journalLabel}
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-2 hidden text-micro uppercase text-muted-foreground lg:block">
              {content.privateLabel}
            </span>
            <Button asChild size="sm" variant="ghost">
              <Link href="/" target="_blank" rel="noreferrer">
                {content.viewSiteLabel}
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/admin/blogs/new">
                <Plus data-icon="inline-start" />
                <span className="hidden sm:inline">{content.newNoteLabel}</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-6 py-6">
          <span className="text-micro uppercase text-gold">
            {content.atelierLabel}
          </span>
          <span className="hidden text-micro uppercase text-muted-foreground sm:block">
            {content.privateLabel}
          </span>
        </div>
      </footer>
    </div>
  );
}
