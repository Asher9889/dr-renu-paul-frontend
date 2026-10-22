"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { MOTION_PRESETS } from "@/motion/presets";
import { useArmOnScroll } from "@/motion/use-arm-on-scroll";

type DrawRuleProps = {
  className?: string;
  delay?: number;
  orientation?: "horizontal" | "vertical";
};

export function DrawRule({
  className,
  delay = 0,
  orientation = "horizontal",
}: DrawRuleProps) {
  const { ref, isVisible } = useArmOnScroll<HTMLSpanElement>();
  const animate =
    orientation === "horizontal"
      ? { scaleX: isVisible ? 1 : 0 }
      : { scaleY: isVisible ? 1 : 0 };

  return (
    <motion.span
      ref={ref}
      aria-hidden
      animate={animate}
      className={cn(
        "block",
        orientation === "horizontal" ? "origin-left" : "origin-top",
        className,
      )}
      initial={false}
      transition={{ ...MOTION_PRESETS.rule, delay }}
    />
  );
}
