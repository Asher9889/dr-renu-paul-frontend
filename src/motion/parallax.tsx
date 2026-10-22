"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

import styles from "./parallax.module.css";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  scaleTo?: number;
};

export function Parallax({
  children,
  className,
  distance = 18,
  scaleTo = 1.015,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, scaleTo]);

  return (
    <motion.div
      ref={ref}
      className={cn(styles.parallax, className)}
      style={{ y, scale }}
    >
      {children}
    </motion.div>
  );
}
