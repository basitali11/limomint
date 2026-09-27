"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { business } from "@/lib/data";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Fleet", href: "/fleet" },
  { label: "Services", href: "/services" },
  // { label: "Locations", href: "/locations" },
  { label: "FAQ", href: "/faq" },
  { label: "Book", href: "/reservations" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const id = href.replace("/#", "");
    if (!href.includes("/#") || !document.getElementById(id)) return;

    e.preventDefault();

    if (open) {
      // wait for the mobile menu's collapse transition to actually
      // finish (not a guessed delay) before scrolling, so the header's
      // settled height is used for the scroll-margin offset
      const menu = mobileMenuRef.current;
      const onTransitionEnd = (event: TransitionEvent) => {
        if (event.propertyName !== "max-height") return;
        menu?.removeEventListener("transitionend", onTransitionEnd);
        scrollToSection(id);
      };
      menu?.addEventListener("transitionend", onTransitionEnd);
      setOpen(false);
    } else {
      scrollToSection(id);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-ink/95 backdrop-blur-md" : "bg-ink"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:grid lg:h-20 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="shrink-0 font-display text-lg tracking-wide text-paper lg:justify-self-start lg:text-xl">
          LIMO<span className="text-gold">MINT</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center justify-center gap-6 lg:flex lg:justify-self-center xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="group relative whitespace-nowrap text-xs font-semibold uppercase tracking-[0.1em] text-paper-dim transition-colors hover:text-gold"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-4 lg:col-start-3 xl:gap-5">
          <a href={business.phoneHref} className="group hidden items-center gap-2 whitespace-nowrap text-sm tracking-wide text-paper-dim transition-colors hover:text-gold lg:flex">
            <PhoneGlyph />
            {business.phone}
          </a>
          <Link href="/reservations" className="btn-gold hidden px-5 py-2.5 lg:inline-flex">
            Book Now
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className={`h-px w-6 bg-paper transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-paper transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`h-px w-6 bg-paper transition-transform duration-300 ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        ref={mobileMenuRef}
        className={`overflow-hidden border-t border-ink-line bg-ink-soft transition-[max-height] duration-300 ease-in-out lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="container-x flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-paper-dim hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <a href={business.phoneHref} className="btn-gold mt-3 w-full">
            {business.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-gold">
      <path
        d="M4 3 L7 3 L8.5 6.5 L6.5 8 C7.3 9.8 8.7 11.2 10.5 12 L12 10 L15.5 11.5 L15.5 14.5 C15.5 15.6 14.6 16.5 13.5 16.5 C8.3 16.2 4 12 3.5 6.5 C3.4 5.4 3.3 4.3 4 3 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
