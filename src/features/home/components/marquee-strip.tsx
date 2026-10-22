"use client";

import { useEffect, useRef, useState } from "react";
import { Diamond } from "lucide-react";

type MarqueeStripProps = {
  items: string[];
};

type MarqueeGroupProps = {
  items: string[];
  hidden?: boolean;
};

function MarqueeGroup({ items, hidden = false }: MarqueeGroupProps) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="flex items-center text-micro font-medium uppercase text-foreground/70"
        >
          <span className="px-6">{item}</span>
          <Diamond aria-hidden className="size-2 text-gold" />
        </span>
      ))}
    </div>
  );
}

export function MarqueeStrip({ items }: MarqueeStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const shouldPause = isPaused || !isInView;

  return (
    <div
      ref={containerRef}
      className="overflow-hidden border-y border-border bg-muted/70 py-3"
      onBlurCapture={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex w-max animate-marquee items-center motion-reduce:animate-none"
        style={{ animationPlayState: shouldPause ? "paused" : "running" }}
      >
        <MarqueeGroup items={items} />
        <MarqueeGroup hidden items={items} />
      </div>
    </div>
  );
}
