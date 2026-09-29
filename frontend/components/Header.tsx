"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business } from "@/lib/data";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Vehicles", href: "/fleet" },
  { label: "Services", href: "/services" },
  { label: "FAQs", href: "/faq" },
  { label: "Book", href: "/reservations" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const linkClass = (href: string) => `relative py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${pathname === href ? "text-forest" : "text-paper-dim"}`;

  return (
    <header className={`sticky top-0 z-50 border-b border-ink-line transition-shadow duration-200 ${scrolled ? "bg-ink/95 shadow-[0_5px_18px_rgba(25,42,34,0.06)] backdrop-blur-sm" : "bg-ink"}`}>
      <div className="container-x flex h-[68px] items-center justify-between gap-4 lg:h-[78px]">
        <Link href="/" aria-label="LimoMint home" className="flex shrink-0 items-center gap-3 text-paper">
          <span className="font-display text-[22px] font-medium tracking-[0.03em]">LIMO<span className="text-gold">MINT</span></span>
          <span className="hidden border-l border-ink-line pl-3 text-[9px] font-medium uppercase leading-[1.4] tracking-[0.15em] text-paper-muted sm:block">Private<br />Chauffeur</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navLinks.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={linkClass(link.href)}>{link.label}</Link>)}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a href={business.phoneHref} className="hidden text-xs font-semibold tracking-wide text-paper transition-colors hover:text-forest xl:block">{business.phone}</a>
          <Link href="/reservations" className="hidden min-h-11 items-center bg-forest px-5 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-forest-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 md:inline-flex">Book a ride</Link>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] border border-ink-line text-paper lg:hidden">
            <span className={`h-px w-5 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-5 bg-current transition-transform ${open ? "-translate-y-[9px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      <div id="mobile-navigation" className={`overflow-hidden border-t border-ink-line bg-ink transition-[max-height] duration-300 lg:hidden ${open ? "max-h-[440px]" : "max-h-0 border-t-0"}`}>
        <nav aria-label="Mobile navigation" className="container-x flex flex-col py-3">
          {navLinks.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className="flex min-h-12 items-center border-b border-ink-line/70 text-xs font-semibold uppercase tracking-[0.14em] text-paper-dim transition-colors hover:text-forest">{link.label}</Link>)}
          <a href={business.phoneHref} className="py-4 text-sm font-semibold text-forest">Call {business.phone}</a>
          <Link href="/reservations" className="btn-gold mb-3">Book a ride</Link>
        </nav>
      </div>
    </header>
  );
}
