# Edition II — "The Healing Atelier" · Build Specification

> Approved by the client. This document is the single source of truth for how the design
> is translated into this codebase. **Read before touching any UI.**

| Reference       | Value                                                        |
| --------------- | ------------------------------------------------------------ |
| Stitch project  | `11003767719891462076`                                       |
| Homepage screen | `ede6041f036e472285067fd73e544e13`                           |
| Design system   | `assets/10858144468215768929`                                |
| Palette         | Edition II as designed (pine / bone / antique gold / clay)   |
| Fonts           | Playfair Display (display) + Inter (body, labels) via `next/font` |

## 1. Concept

Quiet-luxury editorial: Kinfolk / Aesop / luxury women's journal energy applied to a
45-year homeopathy practice. **Typography and hairline rules do the work** — no shadows,
no icon-card grids, no centered-everything, no emoji. If Edition I was "premium wellness
brand", Edition II is "designed artifact".

Design laws (from the approved screen):

1. 12-column editorial grid, max width 1240px, asymmetric splits (5/7, 6/5, 4/8) only.
2. Display typography 96–120px Playfair, line-height ≤ 1.0, exactly **one word in italic
   serif** per headline.
3. Hairlines (1px ink @ 12% or gold @ 35%) are the only structuring device: section tops,
   list rows, table rows, footer.
4. Micro-labels 11px uppercase, tracked +0.14em, prefixed with gold index numerals
   (`01 — EXPERTISE`).
5. Print mechanics: dotted leaders, footnote asterisks, `Fig. 01` italic captions,
   `EST.` lines, en-dash date ranges, tabular numerals.
6. Photography: duotone / warm B&W only, portraits in Romanesque-arch frames with a 1px
   gold inset border.
7. Clay rose (`--clay`) appears **at most once per screen**.

## 2. Design tokens

All tokens are defined once on `:root` in `src/app/globals.css` and exposed to Tailwind v4
via `@theme inline`. **No component may use a hex value or a stock Tailwind color.**

Token names follow the shadcn semantic convention so every shadcn component inherits the
Edition II look automatically (mapped from the values in the approved screen).

### Palette

| Token                     | Value                      | Use                                        |
| ------------------------- | -------------------------- | ------------------------------------------ |
| `--background`            | `#F7F4EE`                  | Bone paper — page background everywhere    |
| `--foreground`            | `#141F1A`                  | Ink — text                                 |
| `--card`                  | `#FAF8F4`                  | Lighter bone — panels, portrait cards      |
| `--primary`               | `#1E4D3B`                  | Deep pine — buttons, links, one full band  |
| `--primary-foreground`    | `#F7F4EE`                  | Text on pine                               |
| `--secondary` / `--muted` | `#EDE7DC` / `#F2EFE9`      | Soft band tints (achievements, marquee)    |
| `--muted-foreground`      | `#55655D`                  | Secondary text, captions, venues           |
| `--pine-deep`             | `#15392B`                  | Pine hover state                           |
| `--gold`                  | `#B08D57`                  | Index numerals, labels, hairlines, seal    |
| `--gold-soft`             | `#C8A870`                  | Gold gradient partner (rare)               |
| `--clay`                  | `#C4796A`                  | **One** accent per screen (footnote, mark) |
| `--destructive`           | `#A6402B`                  | Form errors only (muted brick)             |
| `--border` / `--input`    | `rgb(20 31 26 / 0.12)`     | Hairline rules and field underlines        |
| `--ring`                  | `#1E4D3B`                  | Focus ring (2px)                           |
| `--radius`                | `0.25rem`                  | 4px max — rectangle with a whisper of round |

Gold hairline (`rgb(176 141 87 / 0.35)`) is available via the `border-gold/35` utility.

### globals.css skeleton (what gets written)

```css
@import "tailwindcss";

:root {
  --background: #f7f4ee;
  --foreground: #141f1a;
  --card: #faf8f4;
  --card-foreground: #141f1a;
  --primary: #1e4d3b;
  --primary-foreground: #f7f4ee;
  --secondary: #ede7dc;
  --secondary-foreground: #141f1a;
  --muted: #f2efe9;
  --muted-foreground: #55655d;
  --accent: #f2efe9;
  --accent-foreground: #141f1a;
  --destructive: #a6402b;
  --destructive-foreground: #f7f4ee;
  --border: rgb(20 31 26 / 0.12);
  --input: rgb(20 31 26 / 0.12);
  --ring: #1e4d3b;
  --radius: 0.25rem;

  --pine-deep: #15392b;
  --gold: #b08d57;
  --gold-soft: #c8a870;
  --clay: #c4796a;

  --font-inter: var(--font-inter);
  --font-playfair: var(--font-playfair);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  /* …all palette tokens map 1:1 to --color-* … */
  --color-gold: var(--gold);
  --color-clay: var(--clay);
  --color-pine-deep: var(--pine-deep);

  --font-sans: var(--font-inter);
  --font-display: var(--font-playfair);

  /* type scale */
  --text-display: 6rem;           /* 96px hero */
  --text-display--line-height: 0.98;
  --text-heading: 2.75rem;        /* 44px section titles */
  --text-heading--line-height: 1.08;
  --text-subheading: 1.75rem;     /* 28px leads, quote plate, tiles */
  --text-subheading--line-height: 1.2;
  --text-title: 1.375rem;         /* 22px index rows, journal titles */
  --text-title--line-height: 1.3;
  --text-body: 1rem;              /* 16px paragraphs */
  --text-body--line-height: 1.65;
  --text-caption: 0.8125rem;      /* 13px meta, venues, Fig. captions */
  --text-micro: 0.6875rem;        /* 11px eyebrows, nav, buttons */
  --text-micro--letter-spacing: 0.14em;
}
```

No dark mode variant — the design is single-mode. Delete the `prefers-color-scheme` block
from the scaffold.

## 3. Typography

| Utility             | Font     | Weight | Use                                                     |
| ------------------- | -------- | ------ | ------------------------------------------------------- |
| `font-display`      | Playfair | 500    | Display, headings, index titles, quote, wordmark        |
| `font-sans`         | Inter    | 400    | Body, captions                                          |
| `font-sans` + micro | Inter    | 500    | Uppercase micro-labels, nav, buttons, gold index numerals |

Rules: headline italics via `italic` on exactly one word; numerals in achievements/table
use `tabular-nums`; Fig. captions are italic Inter 13px in `--muted-foreground`.

Fonts are loaded in `src/app/layout.tsx` with `next/font/google` as
`--font-playfair` / `--font-inter` CSS variables (replaces Geist), per AGENTS.md rule 8.

## 4. shadcn component map

Initialize once: `npx shadcn@latest init` — then **replace the generated token block in
globals.css with the Edition II values above**.

Install: `npx shadcn@latest add button input textarea select label form separator badge table sheet sonner card`

| Section            | shadcn primitives                                                    |
| ------------------ | -------------------------------------------------------------------- |
| SiteHeader         | `button` (CTA), `sheet` (mobile nav)                                  |
| EditorialHero      | `button` (primary + link variants)                                    |
| MarqueeStrip       | — (pure CSS animation, respects `prefers-reduced-motion`)             |
| PhysicianSection   | `separator` (hairlines), `button` link                                |
| ExpertiseIndex     | `separator` between rows; rows composed from tokens                   |
| AchievementsLedger | `table` + `separator`; gold seal rendered inline                      |
| QuotePlate         | — (typographic composition)                                           |
| JournalSection     | `card` (no shadow), `badge` (categories), `button` link               |
| AppointmentSection | `card`, `form`, `input`, `textarea`, `select`, `label`, `button`, `sonner` |
| SiteFooter         | `separator`                                                           |

Primitives are used via existing variants and tokens only — never restyled internals
(AGENTS.md rule 3). Icons: `lucide-react` at 1.5px stroke, gold or pine, max 16–20px.

## 5. Feature structure

```
src/app/
  (site)/
    layout.tsx                 # site chrome: <SiteHeader /> + {children} + <SiteFooter /> + <Toaster />
    page.tsx                   # "/" → renders <Home /> from @/features/home

src/components/shared/
  site-header.tsx              # logotype + indexed nav + pine CTA (sheet on mobile)
  site-footer.tsx              # link columns + memberships + giant cropped wordmark

src/features/site/
  content/
    site-header-content.ts     # nav model + CTA copy
    site-footer-content.ts     # columns, memberships, legal, wordmark
  types/
    site-chrome.ts             # SiteHeaderContent, FooterContent, NavItem, FooterColumn
  index.tsx                    # <SiteHeader /> + <SiteFooter /> pre-wired with content

src/features/home/
  api/
    create-appointment.ts      # POST /appointments — axios, typed result (endpoint pending)
  components/
    hero/
      editorial-hero.tsx       # 6/5 asymmetric split, headline, actions, footnote
      hero-portrait.tsx        # arch frame + Fig. 01 caption + consultant card
    marquee-strip.tsx          # hairline strip, tracked keywords, gold ◆ separators
    physician-section.tsx      # 02 — Fig. 02 photo, story, dotted-leader education
    expertise-index.tsx        # 03 — two-column numbered index (NOT cards)
    achievements-ledger.tsx    # 04 — YEAR | MILESTONE | VENUE table
    quote-plate.tsx            # 05 — italic quote between hairlines
    journal-section.tsx        # 06 — three editorial article cards
    appointment-section.tsx    # 07 — pine band + bone form panel
    appointment-form.tsx       # form primitives + validation + sonner
  content/
    hero-content.ts
    physician-content.ts
    expertise-content.ts
    achievements-content.ts
    journal-content.ts
    appointment-content.ts
    marquee-content.ts
  hooks/
    use-appointment-form.ts    # react-hook-form + zod wiring over api/create-appointment
  schema/
    appointment-form.schema.ts # zod schema — the single source of the form shape
  types/
    appointment.ts             # z.infer from schema/ (+ AppointmentRequest/Response)
    home-content.ts            # interfaces for every section's content
  index.tsx                    # assembles sections in order; exports <Home />
```

Validated shapes (forms, API payloads) live as zod schemas in `schema/`; `types/` infers them
with `z.infer` — schemas are the single source of truth (AGENTS.md rule 9).

`src/app/(site)/page.tsx` becomes:

```tsx
import { Home } from "@/features/home";

export default function HomePage() {
  return <Home />;
}
```

## 6. Section-by-section spec

1. **SiteHeader** — bone, hairline bottom, sticky. Left: `DR. RENU PAUL` letterspaced
   Playfair 14px + `EST. 1980 · KANPUR & FARIDABAD` 10px muted. Right: micro-caps nav
   `01 ABOUT 02 EXPERTISE 03 ACHIEVEMENTS 04 JOURNAL 05 CONTACT` (numerals gold) +
   rectangular pine button `BOOK APPOINTMENT ↗`.
2. **EditorialHero** — faint vertical column hairlines behind content. Left 6 cols: gold
   eyebrow `01 — HOMEOPATHY & HOLISTIC HEALING`; 3-line display headline with *Homoeopathy*
   italic; body paragraph ≤ 46ch; hairline action row: pine button `Make an Appointment` +
   underlined `Explore Expertise →`; footnote `* Over 45 years of clinical experience — Kanpur & Faridabad.`
   Right 5 cols, offset down: arch portrait (1px gold inset), italic Fig. 01 caption,
   overlapping bone card with hairline: `SENIOR CONSULTANT` + Accord Super Speciality
   Hospital, Sector 86, Faridabad + gold `+`.
3. **MarqueeStrip** — hairline top/bottom, 12px tracked caps, gold `◆` separators:
   `HOMOEOPATHY ◆ HOLISTIC HEALING ◆ NBI BRAIN PROFILES ◆ COUNSELLING ◆ RESEARCH ◆ 45 YEARS OF CARE ◆`.
4. **PhysicianSection** — left 5: Fig. 02 photo 4:5 hairline frame, caption
   `Fig. 02 — At her clinic, Kanpur.` Right 6 offset: eyebrow `02 — THE PHYSICIAN`;
   heading `A woman of immense knowledge, quiet confidence and graceful practice.`;
   two paragraphs (45 years in practice; NBI Brain Profiles since 2008; Accord Hospital);
   dotted-leader education rows (MD Agra / BMS Kanpur / PGCR AIIPMR Bombay / PGNAH /
   MTEC KGMC–Allegheny); underlined `Read the full story →`.
5. **ExpertiseIndex** — eyebrow `03 — AREAS OF INTEREST`; heading `The index of care.`;
   two columns of ten hairline-separated rows: gold `(01)`–`(10)` numeral, Playfair 22px
   area, dotted leader, italic descriptor. Clay footnote `* Every plan begins with a full
   constitutional case-taking.`; `View all treatments →`.
6. **AchievementsLedger** — soft band (`--muted`). Eyebrow `04 — ACHIEVEMENTS & RESEARCH`;
   heading `A ledger of forty years in research & service.`; table YEAR | MILESTONE |
   VENUE, nine rows (tags `1981 … 2024` from content), gold rosette glyph on the 2005
   `Best Homoeopath of the Year` row; italic footnote about the Women's Homoeopathic
   Organization; `Full record →`.
7. **QuotePlate** — hairline top/bottom; oversized hanging gold `"`; Playfair italic 44px
   `Homoeopathy never fails — some Homoeopaths may fail sometimes. Dr. Renu too.`;
   attribution `— DR. RENU PAUL, MD (HOM.)`.
8. **JournalSection** — eyebrow `06 — RECENT WRITING`; heading `Notes on healing.`;
   three borderless cards from the featured journal API: 4:3 cover image with hairline
   frame, gold small-caps category, Playfair title, one-line excerpt, `Read →`. Middle
   card offset upward. Only published notes marked `featured` appear here.
9. **AppointmentSection** — full-bleed pine with 4% botanical line art + grain overlay.
   Left: bone Playfair `Begin your healing, quietly.`; body copy; hairline-separated hours
   and locations; phone in large Playfair tabular numerals. Right: bone panel form
   (underline-only fields per §7), button `Request Appointment ↗`, note
   `Replies within 24 hours · Mon–Sat`.
10. **SiteFooter** — hairline top; three micro-caps link columns with gold index
    numerals; memberships italic line (HMAI · National Academy of Homoeopathy · Asian
    Homoeopathic Medical League · Indian Red Cross Society); micro row
    `© 2026 · Kanpur & Faridabad · Designed with care`; giant Playfair wordmark
    `Renu Paul` (~140px) cropped by the bottom edge.

## 7. States & behavior

- **Forms** — underline-only inputs (`border-b border-input`, transparent background,
  no ring box; focus swaps underline to pine 2px). Validation via shadcn `form`
  (react-hook-form + zod). On submit: `create-appointment.ts` (axios POST) — while the
  API endpoint is pending, the call is stubbed with a typed `Promise` and surfaced
  through `sonner`.
- **Links** — underline offset 4px, gold on hover; nav numerals stay gold.
- **Focus** — visible 2px pine ring, never removed.
- **Motion** — reveals are limited to a 12px fade-up; all motion disabled under
  `prefers-reduced-motion`.

## 8. Responsive plan

| Breakpoint | Behavior                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------ |
| ≥ 1024px   | The approved asymmetric layout, exactly as designed                                        |
| 768–1023px | Splits become 1 column stacked in reading order; display drops to 64px; marquee unchanged |
| < 768px    | Display 40–48px; header collapses to logotype + sheet nav; achievements table → stacked row cards (hairline-separated); journal cards full width; form fields full width |

## 9. Images plan

Placeholders ship first; real photography replaces them without layout changes (fixed
aspect ratios + hairline frames).

| Asset                          | Path                              | Ratio | Notes                    |
| ------------------------------ | --------------------------------- | ----- | ------------------------ |
| Hero portrait (Fig. 01)        | `/dr-renu/dr-renu-paul.jpg`       | 3:4   | Arch mask applied in CSS |
| Clinic portrait (Fig. 02)      | `/images/home/portrait-clinic.svg`| 4:5   | Placeholder — swap for real photo |
| Journal articles ×3            | Featured post cover URLs          | 4:3   | Managed in Journal Studio           |

All via `next/image` with `sizes` set per column width.

## 10. Build order

1. `npx shadcn@latest init`; install the primitives in §4.
2. Write Edition II tokens into `globals.css` (§2); delete dark-mode block.
3. Swap fonts in `layout.tsx` to Playfair + Inter variables; update `metadata`.
4. `content/` + `types/` for all sections (content first, components consume it);
   validated shapes get a `schema/` first and `types/` infers from it.
5. Build shared layout units: `site-header`, `site-footer`.
6. Build sections in reading order: hero → marquee → physician → expertise →
   achievements → quote → journal → appointment.
7. Assemble `features/home/index.tsx`; wire `app/page.tsx`.
8. Responsive pass per §8; accessibility pass (labels, alt text, focus, contrast).
9. `npm run lint` + `npx tsc --noEmit` + `npm run build`.

## 11. Explicit non-goals (v1)

- Journal entries come from the blog API; Journal Studio owns featured selection.
- No dark mode.
- No shadows, gradients, or rounded-pill clusters anywhere (see §1 design laws).
