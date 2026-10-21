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

        <div className="mt-10 overflow-hidden" aria-hidden>
          <p className="translate-y-[22%] select-none font-display text-[clamp(5rem,17vw,11rem)] leading-none tracking-tight text-foreground/90">
            {content.wordmark}
          </p>
        </div>
      </div>
    </footer>
  );
}
