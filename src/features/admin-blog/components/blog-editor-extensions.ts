import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

import { BlogEditorHeading } from "@/features/admin-blog/components/blog-editor-heading";

export function getBlogEditorExtensions(placeholder: string) {
  return [
    StarterKit.configure({
      heading: false,
      code: false,
      codeBlock: false,
      horizontalRule: false,
      strike: false,
      underline: false,
      link: false,
    }),
    BlogEditorHeading,
    Link.configure({
      openOnClick: false,
      autolink: true,
      linkOnPaste: true,
    }),
    Underline,
    Placeholder.configure({
      placeholder,
    }),
    Image.configure({
      inline: false,
      allowBase64: false,
    }),
  ];
}
