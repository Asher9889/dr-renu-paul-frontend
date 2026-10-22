# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: prospective patients researching care for chronic or persistent conditions — lifestyle and metabolic disorders, depression and anxiety, autoimmune and genetic conditions, skin/hair/alopecia, PCOD and fibroids, endocrine disorders, cardiac/lung/kidney support, nervous disorders, and children's health. They often arrive uncertain, sometimes after conventional treatment has not fully resolved the problem, and are deciding whether Dr. Renu Paul is the right practitioner for them.

## Product Purpose

The official website of Dr. Renu Paul, MD (Hom.), a classical homoeopathy physician with 45+ years of practice in Kanpur and Faridabad. It exists to turn a prospective patient's uncertainty into informed trust, then into a consultation request. Success means the visitor understands her approach and credentials and feels confident enough to ask for an appointment.

## Positioning

Constitutional, whole-person homoeopathy practised by a named physician with 45+ years of clinical experience, a documented research and teaching record, and an unusual integration of certified counselling and NBI (Neethling Brain Instrument) brain profiles with remedy selection. The promise is to treat the person, not merely the disease. This is not a clinic brand or a remedy marketplace; the relationship is with Dr. Renu Paul.

## Operating Context

- Consultations are in person at Civil Lines, Kanpur, and at Accord Super Speciality Hospital, Sector 86, Faridabad. Dr. Renu Paul also consults online and offers remote follow-ups.
- Clinic hours are Monday to Saturday, 10:00–16:00.
- Appointment requests are submitted through the site and should reach a staff email inbox; staff respond by phone within 24 hours (current site copy).
- Prospective patients evaluate credentials, areas of care, research record, and practice locations before booking.
- Dr. Renu Paul is the **former** Senior Consultant of the Homoeopathic Department at Accord Super Speciality Hospital. The current physician copy in `src/features/home/content/physician-content.ts` says "today as Senior Consultant" and must be corrected before launch.
- Experience is stated as "45+ years"; the header retains "Est. 1980". This framing is approved.
- Current site copy is English; no additional language requirement has been confirmed.

## Capabilities and Constraints

- Single-page marketing site with anchor navigation: hero, physician profile, expertise index, achievements ledger, quote, journal, and consultation request, with a shared header and footer.
- The appointment form captures name, phone, optional email, primary concern, and optional message. Phone and email are validated.
- Appointment delivery target is a staff email inbox. The current implementation only logs the payload and optionally posts to `NEXT_PUBLIC_APPOINTMENTS_API_URL`; the real inbox integration is not built.
- The displayed phone number (`+91 98112 00000`) is a placeholder and must be replaced with the real clinic contact before launch.
- The three journal cards are placeholder titles and excerpts. Real writing by Dr. Renu Paul exists but has not been supplied to the repository; the current cards must not be presented as published articles.
- Achievements, memberships, education credentials, clinic hours, and addresses in the repository are treated as factual.
- Technical constraints: Next.js 16 App Router, React 19, Tailwind v4, shadcn components, and token-only styling as defined in `AGENTS.md`.

Open decisions:

- The real phone number and the staff email address that should receive appointment requests.
- Final article titles, excerpts, images, and links for the real writing.
- Whether online consultations use separate scheduling or fees from in-person consultations.

## Brand Commitments

- Name and credentials: Dr. Renu Paul, MD (Hom.).
- British spelling "Homoeopathy" is used consistently and should be preserved.
- Voice: quiet, precise, unhurried, and confident without sales pressure. The existing self-aware line "Homoeopathy never fails — some Homoeopaths may fail sometimes. Dr. Renu too." is part of her voice.
- The 45+ years / Est. 1980 legacy framing is confirmed.

## Evidence on Hand

- Portrait photography: `public/dr-renu/dr-renu-paul.jpg` and `public/dr-renu/renu-full.png`, with additional uncommitted variants in the same folder.
- Eight dated achievements (1981–2024), memberships, and five education credentials in `src/features/home/content/`.
- Real writing exists with Dr. Renu Paul but is not in the repository. Current journal cards in `src/features/home/content/journal-content.ts` are placeholders.
- No testimonials, patient outcomes, case studies, press, pricing, or verified contact details exist in the repository. Future work must not fabricate them.

## Product Principles

1. **Trust before conversion.** Credentials, research record, and philosophy must be legible before asking for an appointment.
2. **Treat the person, not the disease.** Present care as constitutional and whole-person, not as transactional condition-fixing.
3. **Quiet authority.** Copy stays precise, warm, and unhurried; never promotional or alarmist.
4. **Never invent evidence.** Placeholder contacts, articles, testimonials, outcomes, or credentials must not ship as fact.
5. **One clear next step.** Every path leads to a consultation request without pressure.
