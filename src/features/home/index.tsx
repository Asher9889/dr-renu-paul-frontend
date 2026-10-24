import { Suspense } from "react";

import { AchievementsLedger } from "@/features/home/components/achievements-ledger";
import { AppointmentSection } from "@/features/home/components/appointment-section";
import { EditorialHero } from "@/features/home/components/hero/editorial-hero";
import { ExpertiseIndex } from "@/features/home/components/expertise-index";
import { JournalSection } from "@/features/home/components/journal-section";
import { JournalSectionSkeleton } from "@/features/home/components/journal-section-skeleton";
import { MarqueeStrip } from "@/features/home/components/marquee-strip";
import { PhysicianSection } from "@/features/home/components/physician-section";
import { QuotePlate } from "@/features/home/components/quote-plate";
import { achievementsContent } from "@/features/home/content/achievements-content";
import { appointmentContent } from "@/features/home/content/appointment-content";
import { expertiseContent } from "@/features/home/content/expertise-content";
import { heroContent } from "@/features/home/content/hero-content";
import { journalContent } from "@/features/home/content/journal-content";
import { marqueeItems } from "@/features/home/content/marquee-content";
import { physicianContent } from "@/features/home/content/physician-content";
import { quoteContent } from "@/features/home/content/quote-content";

export function Home() {
  return (
    <main className="flex-1">
      <EditorialHero content={heroContent} />
      <MarqueeStrip items={marqueeItems} />
      <PhysicianSection content={physicianContent} />
      <ExpertiseIndex content={expertiseContent} />
      <AchievementsLedger content={achievementsContent} />
      <QuotePlate content={quoteContent} />
      <Suspense fallback={<JournalSectionSkeleton content={journalContent} />}>
        <JournalSection content={journalContent} />
      </Suspense>
      <AppointmentSection content={appointmentContent} />
    </main>
  );
}
