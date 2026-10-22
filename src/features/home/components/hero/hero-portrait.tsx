import { Plus } from "lucide-react";

import { HeroPortraitMedia } from "@/features/home/components/hero/hero-portrait-media";
import type { HeroContent } from "@/features/home/types/home-content";

type HeroPortraitProps = {
  content: HeroContent;
};

export function HeroPortrait({ content }: HeroPortraitProps) {
  const { portrait, consultantNote } = content;

  return (
    <div className="relative lg:col-span-5 lg:col-start-8">
      <figure>
        <HeroPortraitMedia portrait={portrait} />
        <figcaption className="mt-3 text-caption italic text-muted-foreground">
          {portrait.caption}
        </figcaption>
      </figure>

      <div className="relative mt-6 border border-border bg-card p-4 lg:absolute lg:-left-12 lg:bottom-24 lg:mt-0 lg:w-64">
        <Plus aria-hidden className="absolute right-3 top-3 size-3.5 text-gold" />
        <p className="pr-4 text-micro font-medium uppercase text-gold">
          {consultantNote.label}
        </p>
        <p className="mt-2 text-caption text-foreground">{consultantNote.body}</p>
      </div>
    </div>
  );
}
