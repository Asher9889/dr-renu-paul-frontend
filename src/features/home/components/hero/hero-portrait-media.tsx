"use client";

import Image from "next/image";

import { Parallax } from "@/motion";
import type { HeroContent } from "@/features/home/types/home-content";

import styles from "./hero-intro.module.css";

type HeroPortraitMediaProps = {
  portrait: HeroContent["portrait"];
};

export function HeroPortraitMedia({ portrait }: HeroPortraitMediaProps) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-muted">
      <Parallax className="absolute inset-0" distance={10} scaleTo={1.04}>
        <Image
          alt={portrait.alt}
          className={`object-cover ${styles.portraitImage}`}
          fill
          priority
          sizes="(min-width: 1024px) 480px, 100vw"
          src={portrait.src}
        />
      </Parallax>
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full text-gold/40"
        fill="none"
        viewBox="0 0 100 133.333"
      >
        <path
          className={styles.archOutline}
          d="M 0.5 133.333 L 0.5 50 A 49.5 49.5 0 0 1 99.5 50 L 99.5 133.333 L 0.5 133.333"
          pathLength={1}
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
