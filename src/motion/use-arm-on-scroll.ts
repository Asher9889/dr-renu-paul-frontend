"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

import { VIEWPORT } from "@/motion/presets";

type UseArmOnScrollOptions = {
  once?: boolean;
  amount?: number;
};

export function useArmOnScroll<T extends HTMLElement>({
  once = VIEWPORT.once,
  amount = VIEWPORT.amount,
}: UseArmOnScrollOptions = {}) {
  const ref = useRef<T>(null);
  const isInView = useInView(ref, {
    once,
    amount,
    margin: "0px 0px -10% 0px",
  });
  const prefersReducedMotion = useReducedMotion();
  const [isArmed, setIsArmed] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const element = ref.current;

    if (!element) {
      return;
    }

    const bounds = element.getBoundingClientRect();
    const isAlreadyVisible =
      bounds.top < window.innerHeight * 0.9 && bounds.bottom > 0;

    if (isAlreadyVisible) {
      return;
    }

    setIsArmed(true);
  }, [prefersReducedMotion]);

  return {
    ref,
    isVisible: !isArmed || isInView,
    prefersReducedMotion,
  };
}
