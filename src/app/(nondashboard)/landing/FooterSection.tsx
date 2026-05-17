import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapPin,
  faMobilePhone,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const CONTACT_MAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@rentiful.com";

const footerLink =
  "text-sm text-primary-300 transition-colors hover:text-secondary-400";

const footerHeading = "text-xs font-semibold uppercase tracking-[0.16em] text-white";

export default function FooterSection() {
  const mailHref = `mailto:${CONTACT_MAIL}?subject=${encodeURIComponent(
    "Rent Home — hello"
  )}`;

  return (
    <footer
      className="relative -mt-px bg-gradient-to-b from-primary-950 via-primary-950 to-primary-900 text-primary-200"
      role="contentinfo"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-16 bg-gradient-to-b from-transparent via-primary-950/40 to-transparent md:h-20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
        aria-hidden
      />

      <div className="relative z-[3] mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-lg outline-none ring-offset-2 ring-offset-primary-950 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-secondary-500"
            >
              <Image
                src="/logo.svg"
                alt="Rent Home"
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                RENT
                <span className="font-light text-secondary-400">HOME</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-300">
              Discover rentals that fit your life—search with clarity, tour with
              confidence, and apply without the chaos.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={mailHref}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-primary-200 transition-colors hover:border-secondary-400/40 hover:text-secondary-400"
                aria-label={`Email us at ${CONTACT_MAIL}`}
              >
                <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="tel:+15550199"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-primary-200 transition-colors hover:border-secondary-400/40 hover:text-secondary-400"
                aria-label="Call Rent Home"
              >
                <FontAwesomeIcon icon={faMobilePhone} className="h-4 w-4" aria-hidden />
              </a>
              <Link
                href="/signup"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-primary-200 transition-colors hover:border-secondary-400/40 hover:text-secondary-400"
                aria-label="Create an account"
              >
                <FontAwesomeIcon icon={faUserPlus} className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h2 className={footerHeading}>Explore</h2>
            <ul className="mt-5 space-y-3" role="list">
              <li>
                <Link href="/landing#top" className={footerLink}>
                  Search homes
                </Link>
              </li>
              <li>
                <Link href="/landing#features" className={footerLink}>
                  Features
                </Link>
              </li>
              <li>
                <Link href="/search" className={footerLink}>
                  Browse listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="lg:col-span-2">
            <h2 className={footerHeading}>Account</h2>
            <ul className="mt-5 space-y-3" role="list">
              <li>
                <Link href="/signin" className={footerLink}>
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signup" className={footerLink}>
                  Create account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + legal */}
          <div className="lg:col-span-3">
            <h2 className={footerHeading}>Contact</h2>
            <ul className="mt-5 space-y-4" role="list">
              <li>
                <a href={mailHref} className={`inline-flex items-start gap-2 ${footerLink}`}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="mt-0.5 h-4 w-4 shrink-0 text-secondary-400"
                    aria-hidden
                  />
                  <span>{CONTACT_MAIL}</span>
                </a>
              </li>
              <li className={`flex items-start gap-2 text-sm text-primary-300`}>
                <FontAwesomeIcon
                  icon={faMapPin}
                  className="mt-0.5 h-4 w-4 shrink-0 text-secondary-400"
                  aria-hidden
                />
                <span>Serving renters &amp; landlords nationwide</span>
              </li>
            </ul>
            <h2 className={`${footerHeading} mt-10`}>Legal</h2>
            <ul className="mt-5 space-y-3" role="list">
              <li>
                <Link href="/privacy" className={footerLink}>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={footerLink}>
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/[0.06] bg-primary-950/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-center text-xs text-primary-400 sm:flex-row sm:text-left sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Rent Home. All rights reserved.
          </p>
          <p className="max-w-md sm:text-right">
            Built for modern renting—clear listings, honest tools, human support.
          </p>
        </div>
      </div>
    </footer>
  );
}
