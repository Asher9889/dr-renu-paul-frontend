"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { SiteHeaderContent } from "@/features/site/types/site-chrome";
import { cn } from "@/lib/utils";
import {
  MOTION_PRESETS,
  ScrollProgress,
  STAGGER,
} from "@/motion";

const sheetNavVariants = {
  closed: {},
  open: {
    transition: { staggerChildren: STAGGER.micro, delayChildren: 0.04 },
  },
};

const sheetNavItemVariants = {
  closed: { opacity: 0, y: 8 },
  open: { opacity: 1, y: 0, transition: MOTION_PRESETS.state },
};

type SiteHeaderProps = {
  content: SiteHeaderContent;
};

export function SiteHeader({ content }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextIsScrolled = latest > 8;
    setIsScrolled((current) =>
      current === nextIsScrolled ? current : nextIsScrolled,
    );
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/90 backdrop-blur transition-[background-color,border-color] duration-[var(--duration-state)] ease-[var(--ease-quiet)]",
        isScrolled ? "border-border bg-background/95" : "border-border/60",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1240px] items-center justify-between gap-6 px-6">
        <Link className="flex flex-col leading-none" href="/">
          <span className="font-display text-lg uppercase tracking-[0.18em]">
            {content.logotype}
          </span>
          <span className="mt-1.5 text-micro uppercase text-muted-foreground">
            {content.establishedLine}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {content.navItems.map((item) => (
            <a
              key={item.href}
              className="flex items-baseline gap-2 text-micro font-medium uppercase text-foreground/80 transition-colors hover:text-foreground"
              href={item.href}
            >
              <span className="text-gold">{item.index}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="h-11 px-5 text-micro uppercase text-card" size="lg">
            <a href={content.cta.href}>
              {content.cta.label}
              <ArrowUpRight aria-hidden className="size-3.5" />
            </a>
          </Button>
        </div>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button aria-label="Open menu" size="icon" variant="outline">
              <Menu aria-hidden className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent aria-describedby={undefined} side="right">
            <SheetHeader>
              <SheetTitle className="font-display uppercase tracking-[0.18em]">
                {content.logotype}
              </SheetTitle>
            </SheetHeader>

            <motion.nav
              aria-label="Mobile"
              animate="open"
              className="mt-10 flex flex-col gap-6 px-4"
              initial="closed"
              variants={sheetNavVariants}
            >
              {content.navItems.map((item) => (
                <motion.a
                  key={item.href}
                  className="flex items-baseline gap-3 font-display text-2xl"
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  variants={sheetNavItemVariants}
                >
                  <span className="text-micro text-gold">{item.index}</span>
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>

            <div className="mt-10 px-4">
              <Button asChild className="h-12 w-full text-card uppercase">
                <a
                  href={content.cta.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {content.cta.label}
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <ScrollProgress className="absolute inset-x-0 bottom-0" />
    </header>
  );
}
