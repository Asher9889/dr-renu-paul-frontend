import type { BlogBodyBlock } from "@/features/blog/types/blog";

type BlogPostBodyProps = {
  blocks: BlogBodyBlock[];
  note: string;
};

export function BlogPostBody({ blocks, note }: BlogPostBodyProps) {
  return (
    <div className="max-w-[62ch]">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          if (block.level === 3) {
            return (
              <h3
                className="mt-10 scroll-mt-28 font-display text-title"
                id={block.id}
                key={`${block.id}-${index}`}
              >
                {block.text}
              </h3>
            );
          }

          return (
            <h2
              className="mt-12 scroll-mt-28 font-display text-subheading first:mt-0"
              id={block.id}
              key={`${block.id}-${index}`}
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              className="mt-5 list-disc space-y-2 pl-5 text-body text-foreground/90 marker:text-gold"
              key={`list-${index}`}
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              className="my-10 border-l-2 border-gold pl-6"
              key={`quote-${index}`}
            >
              <p className="font-display text-subheading italic">
                {block.text}
              </p>
              {block.attribution ? (
                <footer className="mt-3 text-micro font-medium uppercase text-muted-foreground">
                  {block.attribution}
                </footer>
              ) : null}
            </blockquote>
          );
        }

        return (
          <p
            className="mt-5 text-body text-foreground/90 first:mt-0"
            key={`paragraph-${index}`}
          >
            {block.text}
          </p>
        );
      })}

      <p className="mt-12 border-t border-border pt-6 text-caption italic text-muted-foreground">
        {note}
      </p>
    </div>
  );
}
