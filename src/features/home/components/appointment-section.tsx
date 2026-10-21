import { AppointmentForm } from "@/features/home/components/appointment-form";
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

function BotanicalSprig({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 200 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 10 C 62 120, 62 280, 100 390"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M100 96 C 66 74, 42 96, 34 138 C 72 148, 96 128, 100 96 Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M100 160 C 134 138, 158 160, 166 202 C 128 212, 104 192, 100 160 Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M100 228 C 68 208, 46 228, 40 268 C 76 276, 98 258, 100 228 Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M100 292 C 132 272, 154 292, 160 330 C 126 338, 104 320, 100 292 Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
