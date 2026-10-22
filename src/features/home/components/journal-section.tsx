import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ArrowLink } from "@/features/home/components/arrow-link";
import { SectionEyebrow } from "@/features/home/components/section-eyebrow";
import { cn } from "@/lib/utils";
import type { JournalContent } from "@/features/home/types/home-content";

type JournalSectionProps = {
  content: JournalContent;
};

export function JournalSection({ content }: JournalSectionProps) {
  return (
    <section className="border-t border-border" id="journal">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-24 md:py-32">
        <SectionEyebrow text={content.eyebrow} />

        <h2 className="mt-6 font-display text-4xl md:text-heading">
          {content.heading}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {content.posts.map((post, index) => (
            <article
              key={post.title}
              className={cn(index === 1 && "md:-mt-10")}
            >
              <a className="group block" href={post.href}>
                <div className="relative aspect-[4/3] overflow-hidden border border-border bg-muted">
                  <Image
                    alt={post.image.alt}
                    className="object-cover transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    fill
                    sizes="(min-width: 768px) 400px, 100vw"
                    src={post.image.src}
                  />
                </div>
              </a>

              <Badge
                className="mt-5 h-auto rounded-md px-2 py-1 text-micro uppercase text-muted-foreground"
                variant="secondary"
              >
                {post.category}
              </Badge>

              <h3 className="mt-3 font-display text-title">{post.title}</h3>

              <p className="mt-2 text-caption text-muted-foreground">
                {post.excerpt}
              </p>

              <ArrowLink className="mt-5" href={post.href} label="Read" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
