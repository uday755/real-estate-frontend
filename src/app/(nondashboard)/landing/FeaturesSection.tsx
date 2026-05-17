"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  CalendarDays,
  ClipboardPenLine,
  Heart,
  MapPinned,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
};

const FEATURES: Feature[] = [
  {
    title: "Smart search & filters",
    description:
      "Dial in price, bedrooms, pet policy, and amenities—results update instantly so you spend less time scrolling.",
    icon: Search,
    iconClassName: "bg-white/10 text-primary-200",
  },
  {
    title: "Save favorites & alerts",
    description:
      "Heart listings you love and get notified when similar homes hit the market or prices change.",
    icon: Heart,
    iconClassName: "bg-secondary-500/25 text-secondary-400",
  },
  {
    title: "Schedule tours easily",
    description:
      "Pick a time that works for you—coordinate visits with owners or agents without endless back-and-forth.",
    icon: CalendarDays,
    iconClassName: "bg-teal-500/15 text-teal-300",
  },
  {
    title: "Explore on the map",
    description:
      "See what's available near work, transit, or your favorite neighborhood with an interactive map view.",
    icon: MapPinned,
    iconClassName: "bg-white/10 text-primary-200",
  },
  {
    title: "Verified listings",
    description:
      "Photos, basics, and key details are reviewed so you can browse with more confidence and fewer surprises.",
    icon: BadgeCheck,
    iconClassName: "bg-emerald-500/15 text-emerald-300",
  },
  {
    title: "Apply in minutes",
    description:
      "Submit interest or applications online—track status from one place instead of scattered emails.",
    icon: ClipboardPenLine,
    iconClassName: "bg-secondary-500/20 text-secondary-300",
  },
];

const smoothEase = [0.22, 1, 0.28, 1] as const;

const headingContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.06,
    },
  },
};

const headingItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: smoothEase,
    },
  },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.14,
      ease: smoothEase,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: smoothEase,
    },
  },
};

const viewportScroll = { once: true, amount: 0.2, margin: "0px 0px -72px 0px" as const };

const FeaturesSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const motionSafe = !prefersReducedMotion;

  return (
    <section
      id="features"
      className="relative -mt-px overflow-hidden bg-primary-950 pt-20 pb-14 md:pt-28 md:pb-20"
      aria-labelledby="features-heading"
    >
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
      {/* Blend with hero — sits above grid */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-black/35 to-transparent md:h-36"
        aria-hidden
      />
      {/* Feather bottom — merges into CTA */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-14 bg-gradient-to-t from-primary-950 via-primary-950/90 to-transparent md:h-20"
        aria-hidden
      />

      <div className="relative z-[3] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
          initial={motionSafe ? "hidden" : false}
          whileInView={motionSafe ? "visible" : undefined}
          viewport={viewportScroll}
          variants={motionSafe ? headingContainerVariants : undefined}
        >
          <motion.p
            variants={motionSafe ? headingItemVariants : undefined}
            className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary-200 md:text-sm"
          >
            Why Rentiful
          </motion.p>
          <motion.h2
            variants={motionSafe ? headingItemVariants : undefined}
            id="features-heading"
            className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.35rem] lg:leading-snug"
          >
            Built for renters—and clear for everyone
          </motion.h2>
          <motion.p
            variants={motionSafe ? headingItemVariants : undefined}
            className="mt-4 text-pretty text-base leading-relaxed text-primary-200 md:text-lg md:leading-relaxed"
          >
            Everything in one place: discover homes, compare options, book tours,
            and stay organized from search to keys.
          </motion.p>
        </motion.div>

        <motion.ul
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          role="list"
          initial={motionSafe ? "hidden" : false}
          whileInView={motionSafe ? "visible" : undefined}
          viewport={viewportScroll}
          variants={motionSafe ? gridVariants : undefined}
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.li
                key={feature.title}
                variants={motionSafe ? cardVariants : undefined}
                className="h-full list-none"
              >
                <article
                  className={cn(
                    "group flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-6 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.45)] backdrop-blur-sm md:p-7",
                    "transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out",
                    motionSafe &&
                      "hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.09] hover:shadow-[0_22px_48px_-16px_rgba(0,0,0,0.55),0_0_0_1px_rgba(235,134,134,0.12)]",
                    "motion-reduce:transition-colors motion-reduce:hover:translate-y-0"
                  )}
                >
                  <div
                    className={cn(
                      "mb-4 inline-flex size-11 shrink-0 items-center justify-center rounded-lg ring-1 ring-white/10 transition-[transform,ring-color] duration-300 ease-out",
                      motionSafe && "group-hover:scale-110 group-hover:ring-secondary-400/30",
                      "motion-reduce:group-hover:scale-100 motion-reduce:group-hover:ring-white/10",
                      feature.iconClassName
                    )}
                  >
                    <Icon className="size-5" strokeWidth={2} aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold leading-snug tracking-tight text-white md:text-xl">
                    {feature.title}
                  </h3>
                  <p className="mt-3 flex-1 text-pretty text-[15px] leading-relaxed text-primary-200 md:text-[15px] md:leading-[1.65]">
                    {feature.description}
                  </p>
                </article>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
};

export default FeaturesSection;
