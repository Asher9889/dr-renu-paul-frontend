import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import type { JournalContent } from "@/features/home/types/home-content";
import { cn } from "@/lib/utils";

type JournalSectionSkeletonProps = {
  content: JournalContent;
};

export function JournalSectionSkeleton({
  content,
}: JournalSectionSkeletonProps) {
  return (
    <section className="border-t border-border" id="journal">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-24 md:py-32">
        <SectionEyebrow text={content.eyebrow} />

        <h2 className="mt-6 font-display text-4xl md:text-heading">
          {content.heading}
        </h2>

        <div
          aria-hidden
          className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8"
        >
          {[0, 1, 2].map((index) => (
            <div
              className={cn(index === 1 && "md:-mt-10")}
              key={index}
            >
              <div className="aspect-[4/3] border border-border bg-muted" />
              <div className="mt-5 h-5 w-24 bg-muted" />
              <div className="mt-3 h-6 w-full bg-muted" />
              <div className="mt-2 h-4 w-4/5 bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
