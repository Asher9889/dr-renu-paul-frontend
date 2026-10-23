import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { Button } from "@/components/ui/button";
import type { BlogAppointmentContent } from "@/features/blog/types/blog";

type BlogAppointmentCardProps = {
  content: BlogAppointmentContent;
};

export function BlogAppointmentCard({ content }: BlogAppointmentCardProps) {
  return (
    <div className="border border-border bg-card p-6">
      <SectionEyebrow text={content.eyebrow} />

      <p className="mt-3 font-display text-title">{content.heading}</p>

      <p className="mt-2 text-caption text-muted-foreground">{content.body}</p>

      <Button
        asChild
        className="mt-6 h-11 w-full text-micro uppercase text-gold-soft"
        size="lg"
      >
        <Link href={content.href}>
          {content.label}
          <ArrowUpRight aria-hidden className="size-3.5" />
        </Link>
      </Button>
    </div>
  );
}
