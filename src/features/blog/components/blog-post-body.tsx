import Image from "next/image";
import { Fragment, type ReactNode } from "react";

import type { TiptapDocument } from "@/features/blog/schema/tiptap-document.schema";

type BlogPostBodyProps = {
  content: TiptapDocument;
  note: string;
};

type TiptapBlock = TiptapDocument["content"][number];
type TiptapParagraph = Extract<TiptapBlock, { type: "paragraph" }>;
type TiptapInline = NonNullable<TiptapParagraph["content"]>[number];
type TiptapText = Extract<TiptapInline, { type: "text" }>;
type TiptapMark = NonNullable<TiptapText["marks"]>[number];
type TiptapListItem = Extract<
  TiptapBlock,
  { type: "bulletList" }
>["content"][number];

function renderMark(mark: TiptapMark, content: ReactNode): ReactNode {
  if (mark.type === "bold") {
    return <strong>{content}</strong>;
  }

  if (mark.type === "italic") {
    return <em>{content}</em>;
  }

  if (mark.type === "underline") {
    return <u>{content}</u>;
  }

  const target = mark.attrs.target ?? undefined;
  const rel =
    mark.attrs.rel ||
    (target === "_blank" ? "noopener noreferrer" : undefined);

  return (
    <a
      className="underline decoration-border underline-offset-4 transition-colors hover:decoration-gold"
      href={mark.attrs.href}
      rel={rel}
      target={target}
    >
      {content}
    </a>
  );
}

function renderInline(nodes: TiptapInline[] | undefined): ReactNode {
  if (!nodes || nodes.length === 0) {
    return "\u00A0";
  }

  return nodes.map((node, index) => {
    if (node.type === "hardBreak") {
      return <br key={`break-${index}`} />;
    }

    let content: ReactNode = node.text;

    for (const mark of node.marks ?? []) {
      content = renderMark(mark, content);
    }

    return <Fragment key={`text-${index}`}>{content}</Fragment>;
  });
}

function renderListItem(item: TiptapListItem, key: string): ReactNode {
  return (
    <li key={key}>
      {item.content.map((child, index) => {
        if (child.type === "paragraph") {
          return (
            <Fragment key={`${key}-paragraph-${index}`}>
              {renderInline(child.content)}
            </Fragment>
          );
        }

        return renderBlock(child, `${key}-${index}`);
      })}
    </li>
  );
}

function renderBlock(block: TiptapBlock, key: string): ReactNode {
  if (block.type === "heading") {
    if (block.attrs.level === 3) {
      return (
        <h3
          className="mt-10 scroll-mt-28 font-display text-title"
          id={block.attrs.id}
          key={key}
        >
          {renderInline(block.content)}
        </h3>
      );
    }

    return (
      <h2
        className="mt-12 scroll-mt-28 font-display text-subheading first:mt-0"
        id={block.attrs.id}
        key={key}
      >
        {renderInline(block.content)}
      </h2>
    );
  }

  if (block.type === "bulletList" || block.type === "orderedList") {
    const ListTag = block.type === "bulletList" ? "ul" : "ol";
    const listClassName =
      block.type === "bulletList"
        ? "mt-5 list-disc space-y-2 pl-5 text-body text-foreground/90 marker:text-gold"
        : "mt-5 list-decimal space-y-2 pl-5 text-body text-foreground/90 marker:text-gold";

    return (
      <ListTag className={listClassName} key={key}>
        {block.content.map((item, index) =>
          renderListItem(item, `${key}-item-${index}`),
        )}
      </ListTag>
    );
  }

  if (block.type === "blockquote") {
    return (
      <blockquote
        className="my-10 border-l-2 border-gold pl-6 [&>p:first-child]:mt-0"
        key={key}
      >
        {block.content.map((child, index) =>
          renderBlock(child, `${key}-${index}`),
        )}

        {block.attrs?.attribution ? (
          <footer className="mt-3 text-micro font-medium uppercase text-muted-foreground">
            {block.attrs.attribution}
          </footer>
        ) : null}
      </blockquote>
    );
  }

  if (block.type === "image") {
    return (
      <figure className="my-10" key={key}>
        <Image
          alt={block.attrs.alt ?? ""}
          className="h-auto w-full border border-border bg-muted"
          height={0}
          sizes="(min-width: 768px) 720px, 100vw"
          src={block.attrs.src}
          style={{ width: "100%", height: "auto" }}
          width={0}
        />

        {block.attrs.title ? (
          <figcaption className="mt-3 text-caption italic text-muted-foreground">
            {block.attrs.title}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <p className="mt-5 text-body text-foreground/90 first:mt-0" key={key}>
      {renderInline(block.content)}
    </p>
  );
}

export function BlogPostBody({ content, note }: BlogPostBodyProps) {
  return (
    <div className="max-w-[62ch]">
      {content.content.map((block, index) =>
        renderBlock(block, `block-${index}`),
      )}

      <p className="mt-12 border-t border-border pt-6 text-caption italic text-muted-foreground">
        {note}
      </p>
    </div>
  );
}
