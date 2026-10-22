import { Award } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLink } from "@/features/home/components/arrow-link";
import { SectionEyebrow } from "@/features/home/components/section-eyebrow";
import type { AchievementsContent } from "@/features/home/types/home-content";
import { DrawRule } from "@/motion";

type AchievementsLedgerProps = {
  content: AchievementsContent;
};

export function AchievementsLedger({ content }: AchievementsLedgerProps) {
  return (
    <section className="border-y border-border bg-muted" id="achievements">
      <div className="relative mx-auto w-full max-w-[1240px] px-6 py-24 md:py-32">
        <DrawRule
          className="absolute bottom-24 left-0 top-24 hidden w-px bg-gold/25 lg:block"
          delay={0.1}
          orientation="vertical"
        />
        <SectionEyebrow text={content.eyebrow} />

        <h2 className="mt-6 font-display text-4xl md:text-heading">
          {content.heading}
        </h2>

        <Table className="mt-14">
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-20 text-micro uppercase text-muted-foreground">
                Year
              </TableHead>
              <TableHead className="text-micro uppercase text-muted-foreground">
                Milestone
              </TableHead>
              <TableHead className="hidden text-right text-micro uppercase text-muted-foreground md:table-cell">
                Venue
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.rows.map((row) => (
              <TableRow
                key={row.year}
                className="border-border hover:bg-transparent"
              >
                <TableCell className="py-5 align-top text-body tabular-nums text-gold">
                  {row.year}
                </TableCell>
                <TableCell className="whitespace-normal py-5 align-top">
                  <span className="font-display text-title">
                    {row.milestone}
                  </span>
                  {row.honored ? (
                    <Award
                      aria-label="Honored"
                      className="ml-3 inline size-4 text-gold"
                    />
                  ) : null}
                  <span className="mt-1 block text-caption text-muted-foreground md:hidden">
                    {row.venue}
                  </span>
                </TableCell>
                <TableCell className="hidden py-5 text-right align-top text-caption text-muted-foreground md:table-cell">
                  {row.venue}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <p className="mt-6 text-caption italic text-muted-foreground">
          {content.footnote}
        </p>

        <ArrowLink
          className="mt-8"
          href={content.link.href}
          label={content.link.label}
        />
      </div>
    </section>
  );
}
