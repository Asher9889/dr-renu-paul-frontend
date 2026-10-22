"use client";

import { motion } from "motion/react";

import { MOTION_PRESETS } from "@/motion";

import styles from "./appointment-botanical.module.css";

type BotanicalSprigProps = {
  className?: string;
};

const sprigPaths = [
  {
    d: "M100 10 C 62 120, 62 280, 100 390",
    delay: 0,
  },
  {
    d: "M100 96 C 66 74, 42 96, 34 138 C 72 148, 96 128, 100 96 Z",
    delay: 0.15,
  },
  {
    d: "M100 160 C 134 138, 158 160, 166 202 C 128 212, 104 192, 100 160 Z",
    delay: 0.25,
  },
  {
    d: "M100 228 C 68 208, 46 228, 40 268 C 76 276, 98 258, 100 228 Z",
    delay: 0.35,
  },
  {
    d: "M100 292 C 132 272, 154 292, 160 330 C 126 338, 104 320, 100 292 Z",
    delay: 0.45,
  },
];

export function BotanicalSprig({ className }: BotanicalSprigProps) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 200 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {sprigPaths.map((path) => (
        <motion.path
          key={path.d}
          className={styles.path}
          d={path.d}
          initial={{ pathLength: 0 }}
          stroke="currentColor"
          strokeWidth="2"
          transition={{ ...MOTION_PRESETS.sprig, delay: path.delay }}
          viewport={{ once: true, amount: 0.1 }}
          whileInView={{ pathLength: 1 }}
        />
      ))}
    </svg>
  );
}
