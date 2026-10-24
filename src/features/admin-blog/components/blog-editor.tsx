"use client";

import { useEffect } from "react";
import type { JSONContent } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";

import { BlogEditorToolbar } from "@/features/admin-blog/components/blog-editor-toolbar";
import styles from "@/features/admin-blog/components/blog-editor.module.css";
import { getBlogEditorExtensions } from "@/features/admin-blog/components/blog-editor-extensions";
import { getDocumentStats } from "@/features/admin-blog/lib/tiptap-payload";
import type { AdminBlogEditorContent } from "@/features/admin-blog/types/admin-blog-content";

type BlogEditorProps = {
  id?: string;
  value: JSONContent;
  onChange: (value: JSONContent) => void;
  content: AdminBlogEditorContent;
};

export function BlogEditor({ id, value, onChange, content }: BlogEditorProps) {
  const editor = useEditor({
    extensions: getBlogEditorExtensions(content.contentPlaceholder),
    content: value,
    immediatelyRender: false, // so that hydration errors don't occur when the editor is server-rendered
    editorProps: {
      attributes: {
        ...(id ? { id } : {}),
        class: styles.tiptap,
        "aria-label": content.contentLabel,
        "aria-multiline": "true",
        role: "textbox",
        spellcheck: "true",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getJSON());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentContent = JSON.stringify(editor.getJSON());
    if (currentContent !== JSON.stringify(value)) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  const stats = getDocumentStats(value);

  return (
    <div>
      <div className="sticky top-20 z-20 -mx-1 bg-background px-1">
        {editor ? (
          <BlogEditorToolbar content={content} editor={editor} />
        ) : (
          <div aria-hidden className="h-11 border-y border-border bg-background" />
        )}
      </div>

      <div className={styles.editor}>
        <EditorContent editor={editor} />
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border py-3 text-micro uppercase tabular-nums text-muted-foreground">
        <span>
          {stats.words} {content.stats.wordsLabel}
        </span>
        <span>
          {stats.readingTimeMinutes} {content.stats.readingTimeLabel}
        </span>
      </div>
    </div>
  );
}
