import type { Transition } from "motion/react";

export const EASE_EDITORIAL: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

export const EASE_QUIET: [number, number, number, number] = [
  0.65, 0, 0.35, 1,
];

export const DURATION = {
  feedback: 0.12,
  state: 0.18,
  reveal: 0.5,
  mask: 0.8,
  rule: 0.6,
  portrait: 1.2,
  sprig: 1.6,
} as const;

export const STAGGER = {
  micro: 0.04,
  rows: 0.06,
  cards: 0.08,
} as const;

export const VIEWPORT = {
  once: true,
  amount: 0.2,
} as const;

export const MOTION_PRESETS = {
  feedback: { duration: DURATION.feedback, ease: EASE_QUIET },
  state: { duration: DURATION.state, ease: EASE_QUIET },
  reveal: { duration: DURATION.reveal, ease: EASE_EDITORIAL },
  mask: { duration: DURATION.mask, ease: EASE_EDITORIAL },
  rule: { duration: DURATION.rule, ease: EASE_EDITORIAL },
  portrait: { duration: DURATION.portrait, ease: EASE_EDITORIAL },
  sprig: { duration: DURATION.sprig, ease: EASE_QUIET },
} satisfies Record<string, Transition>;
