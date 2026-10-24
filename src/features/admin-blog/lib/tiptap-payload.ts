import type { JSONContent } from "@tiptap/react";

import { tiptapDocumentSchema } from "@/features/admin-blog/schema/tiptap-document.schema";
import type { TiptapDocument } from "@/features/admin-blog/types/blog";
import { slugify } from "@/features/admin-blog/lib/slugify";

type NodeWithAttrs = JSONContent & {
  attrs?: Record<string, unknown>;
};

type TiptapBlockNode = TiptapDocument["content"][number];
type TiptapParagraphNode = Extract<TiptapBlockNode, { type: "paragraph" }>;
type TiptapBulletListNode = Extract<TiptapBlockNode, { type: "bulletList" }>;
type TiptapOrderedListNode = Extract<TiptapBlockNode, { type: "orderedList" }>;
type TiptapListItemNode = TiptapBulletListNode["content"][number];
type TiptapInlineNode = NonNullable<TiptapParagraphNode["content"]>[number];
type TiptapTextNode = Extract<TiptapInlineNode, { type: "text" }>;
type TiptapMark = NonNullable<TiptapTextNode["marks"]>[number];
type TiptapLinkMark = Extract<TiptapMark, { type: "link" }>;

const HEADING_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function sanitizeMarks(node: NodeWithAttrs): TiptapTextNode["marks"] {
  const marks: NonNullable<TiptapTextNode["marks"]> = [];
  const seen = new Set<string>();

  for (const mark of node.marks ?? []) {
    if (
      mark.type === "bold" ||
      mark.type === "italic" ||
      mark.type === "underline"
    ) {
      if (!seen.has(mark.type)) {
        seen.add(mark.type);
        marks.push({ type: mark.type });
      }
      continue;
    }

    if (mark.type === "link") {
      const href = mark.attrs?.href;
      const target = mark.attrs?.target;
      const rel = mark.attrs?.rel;

      if (typeof href !== "string" || !/^https?:\/\//i.test(href)) {
        continue;
      }

      const linkMark: TiptapLinkMark = {
        type: "link",
        attrs: {
          href,
          ...(target === "_blank" || target === "_self" ? { target } : {}),
          ...(typeof rel === "string" && rel.trim() ? { rel: rel.trim() } : {}),
        },
      };

      if (!seen.has("link")) {
        seen.add("link");
        marks.push(linkMark);
      }
    }
  }

  return marks.length > 0 ? marks : undefined;
}

function sanitizeInlineNode(node: JSONContent): TiptapInlineNode | null {
  if (node.type === "hardBreak") {
    return { type: "hardBreak" };
  }

  if (node.type !== "text") {
    return null;
  }

  const text = node.text ?? "";

  if (!text) {
    return null;
  }

  const marks = sanitizeMarks(node);

  return {
    type: "text",
    text,
    ...(marks ? { marks } : {}),
  };
}

function sanitizeInlineContent(node: JSONContent): TiptapInlineNode[] {
  return (node.content ?? [])
    .map(sanitizeInlineNode)
    .filter((child): child is TiptapInlineNode => child !== null);
}

function sanitizeListItem(node: JSONContent): TiptapListItemNode {
  const content = (node.content ?? [])
    .map(sanitizeBlockNode)
    .filter(
      (
        child,
      ): child is
        | TiptapParagraphNode
        | TiptapBulletListNode
        | TiptapOrderedListNode =>
        child !== null &&
        (child.type === "paragraph" ||
          child.type === "bulletList" ||
          child.type === "orderedList"),
    );

  return { type: "listItem", content };
}

const usedHeadingIds = new Set<string>();

function resolveHeadingId(rawId: unknown, text: string): string {
  const baseCandidate =
    typeof rawId === "string" && HEADING_ID_PATTERN.test(rawId)
      ? rawId
      : slugify(text).slice(0, 120).replace(/-+$/g, "");

  const base = baseCandidate || "section";
  let candidate = base;
  let suffix = 2;

  while (usedHeadingIds.has(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }

  usedHeadingIds.add(candidate);

  return candidate;
}

function sanitizeBlockNode(node: JSONContent): TiptapBlockNode | null {
  if (node.type === "paragraph") {
    const content = sanitizeInlineContent(node);

    return {
      type: "paragraph",
      ...(content.length > 0 ? { content } : {}),
    };
  }

  if (node.type === "heading") {
    const inlineContent = sanitizeInlineContent(node);
    const text = collectText(node);

    return {
      type: "heading",
      attrs: {
        id: resolveHeadingId(node.attrs?.id, text),
        level: node.attrs?.level === 3 ? 3 : 2,
      },
      ...(inlineContent.length > 0 ? { content: inlineContent } : {}),
    };
  }

  if (node.type === "bulletList" || node.type === "orderedList") {
    const items = (node.content ?? [])
      .filter((child) => child.type === "listItem")
      .map(sanitizeListItem);

    return node.type === "bulletList"
      ? { type: "bulletList", content: items }
      : { type: "orderedList", content: items };
  }

  if (node.type === "image") {
    const src = node.attrs?.src;
    const alt = node.attrs?.alt;
    const title = node.attrs?.title;

    if (typeof src !== "string" || !/^https?:\/\//i.test(src)) {
      return null;
    }

    return {
      type: "image",
      attrs: {
        src,
        ...(typeof alt === "string" && alt.trim()
          ? { alt: alt.trim().slice(0, 300) }
          : {}),
        ...(typeof title === "string" && title.trim()
          ? { title: title.trim().slice(0, 300) }
          : {}),
      },
    };
  }

  if (node.type === "blockquote") {
    const content = (node.content ?? [])
      .map(sanitizeBlockNode)
      .filter(
        (
          child,
        ): child is
          | TiptapParagraphNode
          | TiptapBulletListNode
          | TiptapOrderedListNode =>
          child !== null &&
          (child.type === "paragraph" ||
            child.type === "bulletList" ||
            child.type === "orderedList"),
      );

    const attribution = node.attrs?.attribution;

    return {
      type: "blockquote",
      ...(typeof attribution === "string" && attribution.trim()
        ? { attrs: { attribution: attribution.trim() } }
        : {}),
      content,
    };
  }

  return null;
}

export function collectText(node: JSONContent): string {
  const parts: string[] = [];

  function walk(current: JSONContent) {
    if (current.type === "text" && current.text) {
      parts.push(current.text);
    }

    for (const child of current.content ?? []) {
      walk(child);
    }

    if (current.type === "paragraph" || current.type === "heading") {
      parts.push(" ");
    }
  }

  walk(node);

  return parts.join(" ").replace(/\s+/g, " ").trim();
}

export function toTiptapDocument(content: JSONContent): TiptapDocument {
  usedHeadingIds.clear();

  const blocks = (content.content ?? [])
    .map(sanitizeBlockNode)
    .filter((node): node is TiptapBlockNode => node !== null);

  return tiptapDocumentSchema.parse({
    type: "doc",
    content: blocks,
  });
}

export function getDocumentStats(content: JSONContent): {
  words: number;
  readingTimeMinutes: number;
} {
  const text = collectText(content);
  const words = text ? text.split(/\s+/).length : 0;

  return {
    words,
    readingTimeMinutes: Math.max(1, Math.ceil(words / 200)),
  };
}
