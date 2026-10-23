"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

function subscribeToMount() {
  return () => {};
}

type ScrollProgressProps = {
  className?: string;
};

export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const hasMounted = useSyncExternalStore(
    subscribeToMount,
    () => true,
    () => false,
  );
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const shouldUseDirectProgress = hasMounted && prefersReducedMotion;
  const scaleX = shouldUseDirectProgress ? scrollYProgress : smoothProgress;

  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none h-px origin-left bg-gold/35", className)}
      style={{ scaleX }}
    />
  );
}
