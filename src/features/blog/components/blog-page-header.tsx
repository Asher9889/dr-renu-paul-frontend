import type { ReactNode } from "react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import type { BlogListingContent } from "@/features/blog/types/blog";

type BlogPageHeaderProps = {
  content: BlogListingContent;
  children: ReactNode;
};

export function BlogPageHeader({ content, children }: BlogPageHeaderProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-[1240px] px-6 pb-10 pt-16 md:pt-24">
        <div className="max-w-[52ch]">
          <SectionEyebrow text={content.eyebrow} />

          <h1 className="mt-6 font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {content.headlineLead}{" "}
            <em className="italic">{content.headlineItalic}</em>
            {content.headlineTrail}
          </h1>

          <p className="mt-6 max-w-[52ch] text-body text-muted-foreground">
            {content.description}
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-6 pb-8">
        <div className="border-t border-border pt-5">{children}</div>
      </div>
    </section>
  );
}
