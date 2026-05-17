"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Search, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const CTA_LINES = [
  "Your next home is one search away",
  "Search smarter — rent with confidence.",
  "Save favorites. Book tours. Apply online.",
  "Ready when you are. Start below.",
] as const;

const TICKER_ITEMS = [
  "Smart filters",
  "Map search",
  "Saved homes",
  "Tour scheduling",
  "Verified listings",
  "Price alerts",
  "Apply online",
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.28, 1] as const,
    },
  },
};

function KeywordTicker({ motionSafe }: { motionSafe: boolean }) {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  if (!motionSafe) {
    return (
      <p
        className="mx-auto max-w-2xl text-center font-mono text-xs leading-relaxed text-primary-400 sm:text-sm"
        aria-hidden
      >
        {TICKER_ITEMS.join("  ·  ")}
      </p>
    );
  }

  return (
    <div
      className="relative h-9 w-full overflow-hidden sm:h-10"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-12 bg-gradient-to-r from-primary-950 to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-12 bg-gradient-to-l from-primary-950 to-transparent sm:w-16" />
      <motion.div
        className="flex w-max items-center gap-x-10 whitespace-nowrap px-4 font-mono text-sm text-primary-300/95 sm:text-[0.95rem]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {doubled.map((label, i) => (
          <span key={`${label}-${i}`} className="inline-flex shrink-0 items-center gap-2">
            <span className="text-secondary-400">▹</span>
            {label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ConsoleHeading({
  id,
  lines,
  motionSafe,
}: {
  id: string;
  lines: readonly string[];
  motionSafe: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [shown, setShown] = useState(motionSafe ? "" : lines[0]);

  useEffect(() => {
    if (!motionSafe) {
      setShown(lines[0]);
      return;
    }
    if (!inView) return;

    const lineIdxRef = { current: 0 };
    const phaseRef = { current: "pre" as "pre" | "type" | "hold" | "del" };
    const charIdxRef = { current: 0 };
    let holdTicks = 0;
    let preTicks = 0;

    const intervalId = window.setInterval(() => {
      const full = lines[lineIdxRef.current % lines.length];

      if (phaseRef.current === "pre") {
        preTicks += 1;
        if (preTicks >= 8) {
          phaseRef.current = "type";
          charIdxRef.current = 0;
        }
        return;
      }

      if (phaseRef.current === "type") {
        if (charIdxRef.current < full.length) {
          charIdxRef.current += 1;
          setShown(full.slice(0, charIdxRef.current));
        } else {
          phaseRef.current = "hold";
          holdTicks = 0;
        }
        return;
      }

      if (phaseRef.current === "hold") {
        holdTicks += 1;
        if (holdTicks >= 75) {
          phaseRef.current = "del";
        }
        return;
      }

      if (phaseRef.current === "del") {
        if (charIdxRef.current > 0) {
          charIdxRef.current -= 1;
          setShown(full.slice(0, charIdxRef.current));
        } else {
          lineIdxRef.current = (lineIdxRef.current + 1) % lines.length;
          phaseRef.current = "type";
          charIdxRef.current = 0;
        }
      }
    }, 34);

    return () => clearInterval(intervalId);
  }, [inView, motionSafe, lines]);

  return (
    <div className="flex w-full justify-center">
      <div className="max-w-full overflow-x-auto overflow-y-hidden pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <h2
          ref={ref}
          id={id}
          aria-label={lines[0]}
          className="inline-block whitespace-nowrap text-left font-mono text-[clamp(0.95rem,3.25vw,2rem)] font-semibold leading-none tracking-tight text-primary-50 md:text-center md:text-[clamp(1.15rem,3vw,2.15rem)] lg:text-[2rem]"
        >
          <span aria-hidden className="inline-flex items-baseline whitespace-nowrap">
            <span className="select-none text-teal-500">$</span>
            <span className="mx-1.5 bg-gradient-to-r from-white via-primary-50 to-white/90 bg-clip-text text-transparent">
              {shown}
            </span>
            <span
              className={cn(
                "inline-block h-[1em] w-[3px] shrink-0 translate-y-[0.08em] self-center bg-secondary-400 shadow-[0_0_10px_rgba(228,90,90,0.65)] motion-reduce:animate-none",
                motionSafe && "animate-pulse"
              )}
            />
          </span>
        </h2>
      </div>
    </div>
  );
}

const CTASection = () => {
  const prefersReducedMotion = useReducedMotion();
  const motionSafe = prefersReducedMotion !== true;

  const scrollToHeroSearch = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById("top");
      if (!el) return;
      el.scrollIntoView({
        behavior: prefersReducedMotion === true ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", "#top");
    },
    [prefersReducedMotion]
  );

  const btnBase =
    "inline-flex h-12 flex-1 shrink-0 items-center justify-center gap-2 rounded-xl px-5 text-base font-semibold transition-[transform,box-shadow,background-color,border-color] duration-300 sm:min-w-[11rem] sm:max-w-[14rem] sm:flex-none sm:px-8";

  return (
    <section
      className="relative -mt-px overflow-hidden bg-primary-950 pt-14 pb-24 md:pt-16 md:pb-32"
      aria-labelledby="cta-heading"
    >
      {/* Background layers */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-secondary-600/25 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-secondary-500/15 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:radial-gradient(ellipse_70%_65%_at_50%_45%,#000_45%,transparent)]"
        aria-hidden
      />
      {/* Merge with features */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-12 bg-gradient-to-b from-primary-950 to-transparent md:h-16"
        aria-hidden
      />
      {/* Merge into footer */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-primary-950 via-primary-950 to-transparent md:h-32"
        aria-hidden
      />

      <div className="relative z-[3] mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-4xl lg:px-10">
        <motion.div
          initial={motionSafe ? "hidden" : false}
          whileInView={motionSafe ? "visible" : undefined}
          viewport={{ once: true, amount: 0.35 }}
          variants={motionSafe ? containerVariants : undefined}
          className="flex flex-col items-center gap-10 md:gap-12 lg:gap-14"
        >
          <motion.p
            variants={motionSafe ? itemVariants : undefined}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-200 backdrop-blur-sm"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-secondary-500 shadow-[0_0_12px_rgba(228,90,90,0.7)]"
              aria-hidden
            />
            Start exploring
          </motion.p>

          <motion.div
            variants={motionSafe ? itemVariants : undefined}
            className="flex w-full flex-col items-center gap-7 md:gap-8"
          >
            <ConsoleHeading id="cta-heading" lines={CTA_LINES} motionSafe={motionSafe} />
            <KeywordTicker motionSafe={motionSafe} />
          </motion.div>

          <motion.p
            variants={motionSafe ? itemVariants : undefined}
            className="max-w-xl text-pretty text-base leading-[1.75] text-primary-200 md:text-lg md:leading-relaxed"
          >
            Browse listings, save what you love, and reach out when you&apos;re
            ready—we&apos;re here to help you move with confidence.
          </motion.p>

          <motion.div
            variants={motionSafe ? itemVariants : undefined}
            className="flex w-full max-w-2xl flex-row flex-wrap items-stretch justify-center gap-4 sm:flex-nowrap sm:gap-5"
          >
            <Link
              href="#top"
              scroll={false}
              onClick={scrollToHeroSearch}
              aria-label="Jump to search at the top of the page"
              className={cn(
                btnBase,
                "shadow-[0_12px_36px_-12px_rgba(228,90,90,0.55)] hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-10px_rgba(228,90,90,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-400",
                "bg-secondary-500 text-white hover:bg-secondary-600 active:translate-y-0"
              )}
            >
              <Search className="size-5" aria-hidden />
              Search properties
              <ArrowRight className="size-4 opacity-90" aria-hidden />
            </Link>

            <Link
              href="/signup"
              className={cn(
                btnBase,
                "border-2 border-white/25 bg-white/5 text-white backdrop-blur-sm hover:-translate-y-0.5 hover:border-secondary-400/50 hover:bg-white/10 active:translate-y-0",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
              )}
            >
              <UserPlus className="size-5" aria-hidden />
              Register with us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
