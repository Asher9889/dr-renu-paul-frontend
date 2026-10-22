"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

import { MOTION_PRESETS } from "@/motion/presets";

type MotionProviderProps = {
  children: ReactNode;
};

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={MOTION_PRESETS.state}
    >
      {children}
    </MotionConfig>
  );
}
