"use client";

import { useState } from "react";
import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import {
  Bold,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BlogEditorImageDialog } from "@/features/admin-blog/components/blog-editor-image-dialog";
import { BlogEditorLinkDialog } from "@/features/admin-blog/components/blog-editor-link-dialog";
import type { AdminBlogEditorContent } from "@/features/admin-blog/types/admin-blog-content";
import { cn } from "@/lib/utils";

type ToolbarButtonProps = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function ToolbarButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          aria-label={label}
          aria-pressed={active}
          className={cn(
            "size-8 shrink-0 rounded-sm text-muted-foreground",
            active && "bg-secondary text-foreground",
          )}
          disabled={disabled}
          onClick={onClick}
          onMouseDown={(event) => event.preventDefault()}
          size="icon"
          type="button"
          variant="ghost"
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}

type BlogEditorToolbarProps = {
  editor: Editor | null;
  content: AdminBlogEditorContent;
};

export function BlogEditorToolbar({
  editor,
  content,
}: BlogEditorToolbarProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const state = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) =>
      currentEditor
        ? {
            bold: currentEditor.isActive("bold"),
            italic: currentEditor.isActive("italic"),
            underline: currentEditor.isActive("underline"),
            headingTwo: currentEditor.isActive("heading", { level: 2 }),
            headingThree: currentEditor.isActive("heading", { level: 3 }),
            bulletList: currentEditor.isActive("bulletList"),
            orderedList: currentEditor.isActive("orderedList"),
            blockquote: currentEditor.isActive("blockquote"),
            link: currentEditor.isActive("link"),
            image: currentEditor.isActive("image"),
            canUndo: currentEditor.can().undo(),
            canRedo: currentEditor.can().redo(),
          }
        : null,
  });

  if (!editor || !state) {
    return (
      <div aria-hidden className="h-11 border-y border-border bg-background" />
    );
  }

  const labels = content.editorToolbar;

  return (
    <>
      <div
        aria-label={content.toolbarLabel}
        className="flex flex-wrap items-center gap-0.5 border-y border-border bg-background py-1.5"
        role="toolbar"
      >
        <ToolbarButton
          disabled={!state.canUndo}
          label={labels.undo}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 />
        </ToolbarButton>
        <ToolbarButton
          disabled={!state.canRedo}
          label={labels.redo}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 />
        </ToolbarButton>

        <Separator className="mx-1 h-6" orientation="vertical" />

        <ToolbarButton
          active={state.headingTwo}
          label={labels.headingTwo}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 />
        </ToolbarButton>
        <ToolbarButton
          active={state.headingThree}
          label={labels.headingThree}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 />
        </ToolbarButton>

        <Separator className="mx-1 h-6" orientation="vertical" />

        <ToolbarButton
          active={state.bold}
          label={labels.bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold />
        </ToolbarButton>
        <ToolbarButton
          active={state.italic}
          label={labels.italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic />
        </ToolbarButton>
        <ToolbarButton
          active={state.underline}
          label={labels.underline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon />
        </ToolbarButton>
        <ToolbarButton
          active={state.link}
          label={labels.link}
          onClick={() => setLinkDialogOpen(true)}
        >
          <Link2 />
        </ToolbarButton>
        <ToolbarButton
          active={state.image}
          label={labels.image}
          onClick={() => setImageDialogOpen(true)}
        >
          <ImageIcon />
        </ToolbarButton>

        <Separator className="mx-1 h-6" orientation="vertical" />

        <ToolbarButton
          active={state.bulletList}
          label={labels.bulletList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List />
        </ToolbarButton>
        <ToolbarButton
          active={state.orderedList}
          label={labels.orderedList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered />
        </ToolbarButton>
        <ToolbarButton
          active={state.blockquote}
          label={labels.quote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote />
        </ToolbarButton>
      </div>

      <BlogEditorLinkDialog
        content={content.linkDialog}
        editor={editor}
        onOpenChange={setLinkDialogOpen}
        open={linkDialogOpen}
      />
      <BlogEditorImageDialog
        content={content.imageDialog}
        editor={editor}
        onOpenChange={setImageDialogOpen}
        open={imageDialogOpen}
      />
    </>
  );
}
