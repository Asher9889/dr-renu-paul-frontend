"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import type { PublishChecklistItem } from "@/features/admin-blog/lib/publish-readiness";
import type { AdminBlogEditorContent } from "@/features/admin-blog/types/admin-blog-content";

type BlogPublishIssuesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  publication: AdminBlogEditorContent["publication"];
  dialogs: AdminBlogEditorContent["dialogs"];
  items: PublishChecklistItem[];
};

export function BlogPublishIssuesDialog({
  open,
  onOpenChange,
  publication,
  dialogs,
  items,
}: BlogPublishIssuesDialogProps) {
  const missingItems = items.filter((item) => !item.complete);

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <SectionEyebrow text={publication.eyebrow} />
          <AlertDialogTitle>{dialogs.publishIssuesTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {dialogs.publishIssuesDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <ul className="space-y-2 border-y border-border py-4">
          {missingItems.map((item) => (
            <li
              className="flex items-center gap-2.5 text-caption text-muted-foreground"
              key={item.id}
            >
              <span
                aria-hidden
                className="size-1.5 shrink-0 rounded-full bg-gold"
              />
              {publication.checklist[item.id]}
            </li>
          ))}
        </ul>

        <AlertDialogFooter>
          <AlertDialogAction>{dialogs.publishIssuesClose}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
