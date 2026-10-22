"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

type ScrollProgressProps = {
  className?: string;
};

export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const shouldUseDirectProgress = hasMounted && prefersReducedMotion;
  const scaleX = shouldUseDirectProgress ? scrollYProgress : smoothProgress;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none h-px origin-left bg-gold/35", className)}
      style={{ scaleX }}
    />
  );
}
