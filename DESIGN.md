---
name: Dr. Renu Paul — Official Website
description: Quiet-luxury editorial design system for a 45-year homoeopathy practice.
colors:
  bone-paper: "#f7f4ee"
  lighter-bone: "#faf8f4"
  ink: "#141f1a"
  deep-pine: "#1e4d3b"
  pine-deep: "#15392b"
  soft-band: "#ede7dc"
  muted-bone: "#f2efe9"
  sage-ink: "#55655d"
  antique-gold: "#b08d57"
  soft-gold: "#c8a870"
  clay-rose: "#c4796a"
  muted-brick: "#a6402b"
  hairline: "rgb(20 31 26 / 0.12)"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "6rem"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  heading:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "2.75rem"
    fontWeight: 500
    lineHeight: 1.08
  subheading:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 500
    lineHeight: 1.2
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
  micro:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  hairline: "2px"
  default: "4px"
  arch: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "40px"
  gutter: "24px"
  section: "96px"
  section-wide: "128px"
  container: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.deep-pine}"
    textColor: "{colors.soft-gold}"
    typography: "{typography.micro}"
    rounded: "{rounded.default}"
    padding: "0 20px"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.bone-paper}"
    textColor: "{colors.ink}"
    typography: "{typography.micro}"
    rounded: "{rounded.default}"
    padding: "0 12px"
    height: "32px"
  form-panel:
    backgroundColor: "{colors.lighter-bone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.default}"
    padding: "32px"
  field-underline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.hairline}"
    padding: "0 8px"
    height: "44px"
  eyebrow:
    backgroundColor: "transparent"
    textColor: "{colors.antique-gold}"
    typography: "{typography.micro}"
  category-badge:
    backgroundColor: "{colors.soft-band}"
    textColor: "{colors.sage-ink}"
    typography: "{typography.micro}"
    rounded: "{rounded.default}"
    padding: "4px 8px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.micro}"
---

# Design System: Dr. Renu Paul — Official Website

## Overview

**Creative North Star: "The Healing Atelier"**

A quiet-luxury editorial world where a long medical practice is presented like a designed artifact rather than a wellness brand. Bone paper carries every page; deep pine and antique gold are used sparingly enough that they read as ink and foil rather than decoration. Typography and hairlines do the structural work: Playfair Display sets the patient-facing voice, Inter handles the labels, and nearly every division is a 1px rule instead of a box.

The composition is asymmetric and editorial. A 12-column grid with 1240px maximum width, 5/7 and 6/5 splits, generous 96–128px section rhythm, and print-derived mechanics — index numerals, dotted leaders, `Fig.` captions, en-dash date ranges, tabular numerals — make the page feel typeset rather than assembled. Photography is warm and restrained, held in plain hairline frames or a Romanesque arch with a gold inset ring.

There is no dark mode, no shadow language, no icon-card grid, and no centered-everything layout. Depth comes from tonal paper shifts and overlap, not elevation. Motion is slow and typographic — rules draw, the portrait settles, sprigs grow, and a gold reading hairline tracks the page — but it never hides indexable copy or primary imagery. Everything resolves immediately under `prefers-reduced-motion`.

**Key Characteristics:**
- Bone-paper ground with pine ink and antique-gold indexing.
- Playfair Display headlines with exactly one italic word.
- Hairline rules as the primary structuring device.
- Asymmetric 12-column editorial grid, 1240px max.
- Print mechanics: index numerals, dotted leaders, figure captions, tabular numerals.
- Flat surfaces, 4px maximum corner, no shadows.
- Clay rose used at most once per screen.
- Editorial motion: drawn rules, a settling portrait, growing sprigs — never hidden copy.

## Colors

A restrained paper-and-ink palette: warm bone neutrals, deep pine as the single structural color, antique gold for indexing, and clay rose as a rare editorial mark.

### Primary
- **Deep Pine** (#1e4d3b): Primary buttons, link hovers, focus ring, and the full-bleed consultation band. This is the only large saturated field in the system.
- **Pine Deep** (#15392b): Deeper pine used for pressed or hovered pine surfaces.

### Secondary
- **Antique Gold** (#b08d57): Micro-labels, index numerals, footnote asterisks, hairline accents, the seal, and the quote mark. Carries hierarchy, never fills large areas.
- **Soft Gold** (#c8a870): Text on pine buttons, the appointment-band eyebrow, and rare gold gradient partners.

### Tertiary
- **Clay Rose** (#c4796a): One accent per screen — currently the expertise footnote. Its rarity is the point.
- **Muted Brick** (#a6402b): Form validation errors only.

### Neutral
- **Bone Paper** (#f7f4ee): Page background and text on pine.
- **Lighter Bone** (#faf8f4): Portrait cards, overlapping note cards, and form panels.
- **Soft Band** (#ede7dc): Achievements band and badge fills.
- **Muted Bone** (#f2efe9): Marquee strip and quiet tonal panels.
- **Ink** (#141f1a): Body and headline text.
- **Sage Ink** (#55655d): Secondary copy, captions, venues, and field labels.
- **Hairline** (rgb(20 31 26 / 0.12)): Every 1px rule, field underline, and border.

### Named Rules
**The One Clay Rule.** Clay rose appears at most once per screen. It marks a single human aside, never a section or a state.

**The Paper-First Rule.** Large surfaces stay in the bone family. Pine is reserved for one full band and for actions; gold is reserved for indexing and accents. If a screen reads as more than 15% saturated, the balance is wrong.

## Typography

**Display Font:** Playfair Display (with Georgia, serif)
**Body Font:** Inter (with system-ui, sans-serif)

**Character:** A high-contrast serif for the physician's voice, paired with a neutral grotesque for the operational layer. The serif carries emotion and authority; Inter carries labels, metadata, and instructions without competing.

### Hierarchy
- **Display** (500, 6rem / 96px, 0.98): Hero headline only. Line breaks are deliberate and exactly one word is italic serif.
- **Heading** (500, 2.75rem / 44px, 1.08): Section titles, quote plate, and the appointment phone number.
- **Subheading** (500, 1.75rem / 28px, 1.2): Journal titles, oversized quote fragments, and feature leads.
- **Title** (500, 1.375rem / 22px, 1.3): Expertise rows, achievement milestones, and compact headings.
- **Body** (400, 1rem / 16px, 1.65): Paragraphs, capped at 46–62ch.
- **Caption** (400, 0.8125rem / 13px, 1.5): Figure captions, venues, form notes, and footer meta. `Fig.` captions are italic.
- **Micro** (500, 0.6875rem / 11px, 1.4, +0.14em, uppercase): Eyebrows, nav, buttons, badges, and table headers.

### Named Rules
**The One Italic Word Rule.** A display or heading may italicise exactly one word. Never a whole phrase, never the whole headline.

**The Numerals Rule.** Years and phone numbers always use `tabular-nums`. Dates use en dashes, not hyphens.

## Layout

A 12-column editorial grid inside a 1240px maximum container with 24px side gutters. Sections use asymmetric splits only — hero 6/5 with the portrait starting in column 8, physician 5/6 offset to column 7, appointment 6/5 offset to column 8. Symmetric halves appear only in the expertise index, where a two-column list is the content model.

Vertical rhythm is deliberately wide: 96px section padding on mobile and 128px from `md` upward, with 40–64px between a section's eyebrow, heading, and content. Hairlines at section tops and between list/table rows replace cards and shadows as the main separator.

Below 1024px, splits collapse to a single reading-order column; display type drops to 64px. Below 768px, the hero display drops to 40–48px, the header collapses to logotype plus a sheet menu, the achievements table becomes stacked rows with the venue inline, and all cards and form fields go full width.

## Elevation & Depth

The system is flat by default and has no shadow vocabulary. Depth is conveyed through paper tone — lighter bone cards over bone backgrounds, soft-band sections, and the pine appointment band — plus deliberate overlap: the consultant note card sits over the portrait's lower-left edge, and the middle journal card lifts 40px above its neighbours.

No box shadows, no glows, no blurred drop shadows. A 1px hairline is the only edge treatment at rest.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. If an element needs separation, use a hairline, a paper shift, or overlap — never a shadow.

## Shapes

Corners are a whisper: 4px maximum on buttons, cards, fields, and badges, with 2px on tight inline elements. The dominant geometry is rectangular and ruled. The one curved silhouette is the hero portrait's Romanesque arch (`border-top-left-radius` and `border-top-right-radius: 9999px`), framed by a 1px inset gold arch that inks itself in on load.

Borders are 1px and either ink at 12% or gold at 35–40%. Dotted rules appear only as leaders between a label and its value. No pills, no large rounded cards, no clipped diagonal sections.

## Components

### Buttons
- **Shape:** Rectangular with a 4px corner and a 44–48px height.
- **Primary:** Deep pine fill, soft-gold uppercase micro label, 20–24px horizontal padding, optional 14px arrow icon.
- **Hover:** Pine lightens to 80% opacity; embedded arrow shifts 2px right. Gold text stays fixed.
- **Focus:** 2px pine ring with a 2px offset. Never removed.
- **Outline / Ghost:** Mobile menu trigger uses a transparent bone fill with a 1px hairline border. Text links use the arrow-link pattern below.

### Chips
- **Style:** Soft-band fill, sage-ink uppercase micro label, 4px corner, 4×8px padding, no border.
- **State:** Static category labels only; no selected or interactive chip state exists in the system.

### Cards / Containers
- **Corner Style:** 4px.
- **Background:** Lighter bone for panels and portrait notes; bone for images and page surfaces.
- **Shadow Strategy:** None. See Elevation & Depth.
- **Border:** 1px ink hairline; portrait arch uses a 1px gold inset ring instead.
- **Internal Padding:** 16px for compact note cards, 24–32px for the form panel.

### Inputs / Fields
- **Style:** Transparent background, 44px height, no side or top border — a single 1px bottom hairline. Labels are 11px uppercase sage ink.
- **Focus:** Bottom border thickens to 2px pine; the ring is suppressed. No box glow.
- **Error:** Muted-brick border and message beneath the field. Placeholder copy stays sage ink.

### Navigation
- **Style:** Sticky bone header with a hairline bottom and 90% opacity backdrop blur. Logotype is letterspaced uppercase Playfair at 18px, with a 11px sage-ink `EST. 1980 · KANPUR & FARIDABAD` line beneath.
- **Default / Hover:** Uppercase 11px Inter labels with gold two-digit index numerals; text moves from 80% ink to full ink on hover.
- **Mobile:** Logotype plus a hairline outline menu button opening a right-hand sheet; nav items become 24px Playfair rows with gold indices and a full-width pine CTA.

### Signature Components
- **SectionEyebrow** — gold 11px uppercase label prefixed with a two-digit index and an em dash (`03 — AREAS OF INTEREST`).
- **ArrowLink** — uppercase micro link on a bottom hairline with 8px offset and a 14px gold arrow; hover turns the rule gold and nudges the arrow 2px.
- **DottedLeaderRow** — label, flexed dotted hairline leader, and right-aligned value. Used for education rows and the expertise index.
- **MarqueeStrip** — hairline-bounded 11px tracked caps with gold diamond separators, drifting left over 36 seconds; pauses offscreen and on hover/focus.
- **AchievementsLedger** — YEAR / MILESTONE / VENUE table with tabular gold years, Playfair milestones, and a gold rosette on honoured rows.
- **QuotePlate** — oversized hanging gold quotation mark above a 44px italic Playfair quote between hairlines.

## Motion

**Thesis: the page is being typeset, not operated.** Motion is a quiet editorial gesture that clarifies hierarchy and rewards reading. It is never a spectacle, never a delay, and never a requirement for understanding.

- **Tokens:** `--ease-editorial` for settles and draws, `--ease-quiet` for state and feedback. Durations run from 120ms feedback to 1600ms botanical draw; see `src/app/globals.css` and `src/motion/presets.ts`.
- **Hero:** column hairlines draw top-down, the three headline lines settle a few pixels into place without fading, the gold arch traces itself, and the portrait settles from a 1.015 scale. No masks, no clipped text.
- **Index and ledger:** dotted leaders draw left-to-right; the achievements band grows one decorative vertical gold rule. Rows and values are static and readable from first paint.
- **Appointment:** botanical sprigs draw in via `pathLength` after entering view; the form panel is static. Form feedback is a 120ms press.
- **Navigation:** the header gains a slightly stronger border after 8px of scroll; a 1px gold reading hairline tracks progress at its bottom edge. Mobile sheet rows stagger 40ms on open.
- **Marquee:** continuous drift pauses offscreen, on hover, and on focus.
- **Accessibility:** all shared motion honors `prefers-reduced-motion`; the final state is the default state. Content and primary imagery are never hidden to stage an entrance.

### Named Rules
**The Painted-First Rule.** Indexable copy, credentials, article titles, contact details, and primary imagery are visible in the first HTML response. Motion decorates around them; it never gates them.

**The One-Gesture Rule.** Each section gets one authored motion idea. Do not stack a grid of identical fade-ups.

## Do's and Don'ts

### Do:
- **Do** keep every surface on a bone token and every rule on the hairline token.
- **Do** use the 12-column asymmetric splits (5/7, 6/5, 4/8) and the 1240px container.
- **Do** set exactly one word in italic serif per display headline.
- **Do** use gold for indices, eyebrows, and small accents; keep it under 10% of any screen.
- **Do** use `tabular-nums` for years, phone numbers, and ledger figures.
- **Do** let hairlines, dotted leaders, and paper shifts create structure.
- **Do** animate decorative rules, transforms, and path draws with the motion tokens.
- **Do** show the final state immediately under `prefers-reduced-motion`.

### Don't:
- **Don't** add shadows, glows, gradients, or floating cards.
- **Don't** use corner radii above 4px outside the hero arch.
- **Don't** use stock Tailwind palette classes or hex values in components; only tokens.
- **Don't** center-align whole sections or build icon-card grids.
- **Don't** use clay rose more than once per screen, or as a section background.
- **Don't** add a dark mode; the system is single-mode bone paper.
- **Don't** hide indexable text or primary imagery behind opacity, clipping, or a delayed mount.
- **Don't** parallax copy, forms, tables, or headings; keep parallax on decorative media only.
- **Don't** pin, hijack, or replace scroll; no custom smooth-scroll libraries.
