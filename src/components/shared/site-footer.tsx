import type { FooterContent } from "@/features/site/types/site-chrome";

type SiteFooterProps = {
  content: FooterContent;
};

export function SiteFooter({ content }: SiteFooterProps) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-[1240px] px-6 pt-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {content.columns.map((column) => (
            <div key={column.title}>
              <p className="text-micro font-medium uppercase text-gold">
                {column.index} — {column.title}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="text-caption text-muted-foreground transition-colors hover:text-foreground"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-16 text-caption italic text-muted-foreground">
          {content.memberships}
        </p>

        <p className="mt-6 text-caption text-muted-foreground">
          {content.legal}
        </p>

        <div className="mt-10" aria-hidden>
          <p className="flex flex-col items-center gap-4 border-t border-border pb-8 pt-10 text-center sm:pb-10">
            <span className="font-display text-[clamp(4rem,12vw,9rem)] uppercase leading-none">
              {content.wordmark}
            </span>
            <span
              aria-hidden
              className="relative h-px w-full max-w-[520px] bg-border after:absolute after:inset-x-0 after:top-[5px] after:h-px after:bg-gold/35"
            />
            <span className="text-micro font-medium uppercase text-gold">
              Homoeopathy · MD 
            </span>
            <span className="text-micro uppercase text-muted-foreground">
              Est. 1980 · Kanpur &amp; Faridabad
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
