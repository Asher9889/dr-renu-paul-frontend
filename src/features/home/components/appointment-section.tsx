import { AppointmentForm } from "@/features/home/components/appointment-form";
import { BotanicalSprig } from "@/features/home/components/appointment-botanical";
import { SectionEyebrow } from "@/features/home/components/section-eyebrow";
import type { AppointmentContent } from "@/features/home/types/home-content";

type AppointmentSectionProps = {
  content: AppointmentContent;
};

export function AppointmentSection({ content }: AppointmentSectionProps) {
  const phoneHref = `tel:${content.phone.replace(/\s/g, "")}`;

  return (
    <section
      className="relative overflow-hidden bg-primary text-primary-foreground"
      id="contact"
    >
      <BotanicalSprig className="pointer-events-none absolute -right-16 top-0 h-[420px] w-auto opacity-[0.07]" />
      <BotanicalSprig className="pointer-events-none absolute -bottom-24 left-1/4 h-[380px] w-auto rotate-180 opacity-[0.05]" />

      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-16 px-6 py-24 md:py-32 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <SectionEyebrow className="text-gold-soft" text={content.eyebrow} />

          <h2 className="mt-6 max-w-[16ch] font-display text-4xl leading-tight md:text-heading">
            {content.heading}
          </h2>

          <p className="mt-6 max-w-[52ch] text-body text-primary-foreground/80">
            {content.paragraph}
          </p>

          <dl className="mt-10 border-t border-primary-foreground/20">
            {content.details.map((detail) => (
              <div
                key={detail.label}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-primary-foreground/20 py-4"
              >
                <dt className="text-micro uppercase text-primary-foreground/60">
                  {detail.label}
                </dt>
                <dd className="text-caption">{detail.value}</dd>
              </div>
            ))}
          </dl>

          <a
            className="mt-10 inline-block font-display text-4xl tabular-nums transition-colors hover:text-gold-soft md:text-heading"
            href={phoneHref}
          >
            {content.phone}
          </a>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <AppointmentForm content={content.form} />
        </div>
      </div>
    </section>
  );
}
