import Image from "next/image";

import { ArrowLink } from "@/features/home/components/arrow-link";
import { DottedLeaderRow } from "@/features/home/components/dotted-leader-row";
import { SectionEyebrow } from "@/features/home/components/section-eyebrow";
import type { PhysicianContent } from "@/features/home/types/home-content";

type PhysicianSectionProps = {
  content: PhysicianContent;
};

export function PhysicianSection({ content }: PhysicianSectionProps) {
  return (
    <section className="border-t border-border" id="physician">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-16 px-6 py-24 md:py-32 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <figure>
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-muted">
              <Image
                alt={content.portrait.alt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                src={content.portrait.src}
              />
            </div>
            <figcaption className="mt-3 text-caption italic text-muted-foreground">
              {content.portrait.caption}
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionEyebrow text={content.eyebrow} />

          <h2 className="mt-6 max-w-[18ch] font-display text-4xl leading-tight md:text-heading">
            {content.heading}
          </h2>

          {content.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-6 max-w-[62ch] text-body text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8">
            {content.education.map((row) => (
              <DottedLeaderRow
                key={row.credential}
                left={
                  <span className="text-body text-foreground">
                    {row.credential}
                  </span>
                }
                right={
                  <span className="text-caption text-muted-foreground">
                    {row.institution}
                  </span>
                }
              />
            ))}
          </div>

          <ArrowLink
            className="mt-10"
            href={content.link.href}
            label={content.link.label}
          />
        </div>
      </div>
    </section>
  );
}
