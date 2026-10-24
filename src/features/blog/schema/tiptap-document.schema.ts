import { z } from "zod";

const httpUrlSchema = z
  .url("Please provide a valid URL.")
  .refine(
    (value) => /^https?:\/\//i.test(value),
    "URLs must use http or https.",
  );

const headingIdSchema = z
  .string()
  .trim()
  .min(1, "Heading id is required.")
  .max(120, "Heading id is too long.")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Heading ids must be lowercase kebab-case.");

const boldMarkSchema = z.object({ type: z.literal("bold") }).strict();

const italicMarkSchema = z.object({ type: z.literal("italic") }).strict();

const underlineMarkSchema = z
  .object({ type: z.literal("underline") })
  .strict();

const linkMarkSchema = z
  .object({
    type: z.literal("link"),
    attrs: z
      .object({
        href: httpUrlSchema,
        target: z.union([z.literal("_blank"), z.literal("_self")]).nullish(),
        rel: z.string().trim().max(255).nullish(),
      })
      .strict(),
  })
  .strict();

const markSchema = z.union([
  boldMarkSchema,
  italicMarkSchema,
  underlineMarkSchema,
  linkMarkSchema,
]);

const textNodeSchema = z
  .object({
    type: z.literal("text"),
    text: z.string().min(1),
    marks: z.array(markSchema).optional(),
  })
  .strict();

const hardBreakNodeSchema = z
  .object({
    type: z.literal("hardBreak"),
  })
  .strict();

const inlineNodeSchema = z.union([textNodeSchema, hardBreakNodeSchema]);

const paragraphNodeSchema = z
  .object({
    type: z.literal("paragraph"),
    content: z.array(inlineNodeSchema).optional(),
  })
  .strict();

const headingNodeSchema = z
  .object({
    type: z.literal("heading"),
    attrs: z
      .object({
        id: headingIdSchema,
        level: z.union([z.literal(2), z.literal(3)]),
      })
      .strict(),
    content: z.array(inlineNodeSchema).optional(),
  })
  .strict();

const listItemNodeSchema = z
  .object({
    type: z.literal("listItem"),
    get content() {
      return z.array(
        z.union([
          paragraphNodeSchema,
          bulletListNodeSchema,
          orderedListNodeSchema,
        ]),
      );
    },
  })
  .strict();

const bulletListNodeSchema = z
  .object({
    type: z.literal("bulletList"),
    get content() {
      return z.array(listItemNodeSchema);
    },
  })
  .strict();

const orderedListNodeSchema = z
  .object({
    type: z.literal("orderedList"),
    get content() {
      return z.array(listItemNodeSchema);
    },
  })
  .strict();

const blockquoteNodeSchema = z
  .object({
    type: z.literal("blockquote"),
    attrs: z
      .object({
        attribution: z.string().trim().max(300).nullish(),
      })
      .strict()
      .optional(),
    get content() {
      return z.array(
        z.union([
          paragraphNodeSchema,
          bulletListNodeSchema,
          orderedListNodeSchema,
        ]),
      );
    },
  })
  .strict();

const imageNodeSchema = z
  .object({
    type: z.literal("image"),
    attrs: z
      .object({
        src: httpUrlSchema,
        alt: z.string().trim().max(300).nullish(),
        title: z.string().trim().max(300).nullish(),
      })
      .strict(),
  })
  .strict();

const blockNodeSchema = z.discriminatedUnion("type", [
  paragraphNodeSchema,
  headingNodeSchema,
  bulletListNodeSchema,
  orderedListNodeSchema,
  blockquoteNodeSchema,
  imageNodeSchema,
]);

export const tiptapDocumentSchema = z
  .object({
    type: z.literal("doc"),
    content: z.array(blockNodeSchema),
  })
  .strict();

export type TiptapDocument = z.infer<typeof tiptapDocumentSchema>;
