import { ArrowLink } from "@/features/home/components/arrow-link";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import type { ExpertiseContent } from "@/features/home/types/home-content";
import { DrawRule, STAGGER } from "@/motion";

type ExpertiseIndexProps = {
  content: ExpertiseContent;
};

export function ExpertiseIndex({ content }: ExpertiseIndexProps) {
  return (
    <section className="border-t border-border" id="expertise">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-24 md:py-32">
        <SectionEyebrow text={content.eyebrow} />

        <h2 className="mt-6 font-display text-4xl md:text-heading">
          {content.heading}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-16 md:grid-cols-2">
          {content.rows.map((row, index) => (
            <div
              key={row.index}
              className="border-b border-border py-5 first:border-t md:first:border-t-0"
            >
              <div className="flex items-end gap-4">
                <span className="shrink-0 text-caption tabular-nums text-gold">
                  {row.index}
                </span>
                <span className="min-w-0 font-display text-title">
                  {row.area}
                </span>
                <DrawRule
                  className="mb-[0.45em] min-w-6 flex-1 border-b border-dotted border-input"
                  delay={index * STAGGER.micro}
                />
                <span className="hidden max-w-[24ch] shrink-0 text-right text-caption italic text-muted-foreground lg:block">
                  {row.descriptor}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-caption text-clay">{content.footnote}</p>

        <ArrowLink
          className="mt-6"
          href={content.link.href}
          label={content.link.label}
        />
      </div>
    </section>
  );
}
