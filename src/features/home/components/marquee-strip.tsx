import { Diamond } from "lucide-react";

type MarqueeStripProps = {
  items: string[];
};

export function MarqueeStrip({ items }: MarqueeStripProps) {
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border bg-muted/70 py-3">
      <div className="flex w-max animate-marquee items-center motion-reduce:animate-none">
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center text-micro font-medium uppercase text-foreground/70"
          >
            <span className="px-6">{item}</span>
            <Diamond aria-hidden className="size-2 text-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
