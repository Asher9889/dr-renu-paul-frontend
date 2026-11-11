import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { booksContent } from "../content/books-content";

export function BooksPageHeader({ count }: { count: number }) {
  const copy = booksContent.listing;

  return (
    <header className="border-b border-border">
      <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-6 pb-12 pt-14 md:grid-cols-12 md:gap-12 md:pb-16 md:pt-20">
        <div className="md:col-span-7">
          <SectionEyebrow text={copy.eyebrow} />
          <h1 className="mt-6 font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {copy.headlineLead}{" "}
            <em className="font-display italic text-primary">{copy.headlineItalic}</em>
          </h1>
        </div>
        <div className="flex flex-col justify-end gap-6 md:col-span-5">
          <p className="max-w-md text-body text-muted-foreground">{copy.description}</p>
          <p className="flex items-baseline gap-3 text-micro uppercase text-muted-foreground">
            <span className="font-display text-subheading tabular-nums text-foreground">{count}</span>
            {copy.countLabel}
          </p>
        </div>
      </div>
    </header>
  );
}
