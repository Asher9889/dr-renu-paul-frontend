"use client";

import { useEffect, useState } from "react";

import type { BlogHeadingBlock } from "@/features/blog/types/blog";
import { cn } from "@/lib/utils";

type BlogTableOfContentsProps = {
  items: BlogHeadingBlock[];
  label: string;
  className?: string;
  showLabel?: boolean;
  onNavigate?: () => void;
};

export function BlogTableOfContents({
  items,
  label,
  className,
  showLabel = true,
  onNavigate,
}: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length === 0) {
          return;
        }

        const topEntry = visibleEntries.reduce((closest, entry) =>
          entry.boundingClientRect.top < closest.boundingClientRect.top
            ? entry
            : closest,
        );

        setActiveId(topEntry.target.id);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: 0 },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {showLabel ? (
        <h2 className="text-micro font-medium uppercase text-gold">{label}</h2>
      ) : null}

      <nav aria-label={label} className={cn(showLabel && "mt-5")}>
        <ul className="space-y-2.5">
          {items.map((item) => {
            const isActive = activeId === item.id;

            return (
              <li key={item.id}>
                <a
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "block border-l pl-3 text-caption transition-colors duration-[var(--duration-state)]",
                    item.level === 3 && "pl-6",
                    isActive
                      ? "border-gold text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                  href={`#${item.id}`}
                  onClick={() => {
                    setActiveId(item.id);
                    onNavigate?.();
                  }}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
