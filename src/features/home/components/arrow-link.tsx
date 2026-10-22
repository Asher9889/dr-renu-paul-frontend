import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ArrowLinkProps = {
  label: string;
  href: string;
  className?: string;
};

export function ArrowLink({ label, href, className }: ArrowLinkProps) {
  return (
    <a
      className={cn(
        "group inline-flex items-center gap-2 text-micro font-medium uppercase text-foreground underline decoration-border underline-offset-8 transition-colors hover:decoration-gold",
        className,
      )}
      href={href}
    >
      {label}
      <ArrowRight
        aria-hidden
        className="size-3.5 text-gold transition-transform duration-[var(--duration-state)] ease-[var(--ease-quiet)] group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
      />
    </a>
  );
}
