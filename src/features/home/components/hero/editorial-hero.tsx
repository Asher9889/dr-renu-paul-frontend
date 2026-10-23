import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { ArrowLink } from "@/features/home/components/arrow-link";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { HeroPortrait } from "@/features/home/components/hero/hero-portrait";
import type { HeroContent } from "@/features/home/types/home-content";

import styles from "./hero-intro.module.css";

function lineStyle(index: number) {
  return { "--line-index": index } as CSSProperties;
}

function ruleStyle(index: number) {
  return { "--rule-index": index } as CSSProperties;
}

type EditorialHeroProps = {
  content: HeroContent;
};

export function EditorialHero({ content }: EditorialHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <HeroColumnLines />

      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-start gap-16 px-6 pb-20 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-8 lg:pb-32">
        <div className="lg:col-span-6 lg:pt-8">
          <SectionEyebrow text={content.eyebrow} />

          <h1 className="mt-7 font-display text-5xl leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-display">
            <span className={`block ${styles.headlineLine}`} style={lineStyle(0)}>
              {content.headlineLead}
            </span>
            <span
              className={`block italic ${styles.headlineLine}`}
              style={lineStyle(1)}
            >
              {content.headlineItalic}
            </span>
            <span className={`block ${styles.headlineLine}`} style={lineStyle(2)}>
              {content.headlineTrail}
            </span>
          </h1>

          <p className="mt-8 max-w-[46ch] text-body text-muted-foreground">
            {content.paragraph}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-border pt-8">
            <Button asChild className="h-12 px-6 text-micro uppercase text-gold-soft" size="lg">
              <a href={content.primaryAction.href}>{content.primaryAction.label}</a>
            </Button>
            <ArrowLink
              href={content.secondaryAction.href}
              label={content.secondaryAction.label}
            />
          </div>

          <p className="mt-6 text-caption text-muted-foreground">
            {content.footnote}
          </p>
        </div>

        <HeroPortrait content={content} />
      </div>
    </section>
  );
}

function HeroColumnLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      <div className="mx-auto grid h-full w-full max-w-[1240px] grid-cols-12 px-6">
        {Array.from({ length: 12 }, (_, index) => (
          <span
            key={index}
            className={`border-l border-border/40 last:border-r ${styles.columnRule}`}
            style={ruleStyle(index)}
          />
        ))}
      </div>
    </div>
  );
}
