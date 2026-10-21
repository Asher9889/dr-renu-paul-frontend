import type { QuoteContent } from "@/features/home/types/home-content";

type QuotePlateProps = {
  content: QuoteContent;
};

export function QuotePlate({ content }: QuotePlateProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-24 md:py-32">
        <blockquote className="relative">
          <span
            aria-hidden
            className="absolute -left-1 -top-12 font-display text-8xl italic leading-none text-gold/40"
          >
            &ldquo;
          </span>
          <p className="max-w-[26ch] font-display text-3xl italic leading-snug md:text-heading">
            {content.quote}
          </p>
          <footer className="mt-8 text-micro uppercase text-muted-foreground">
            {content.attribution}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
