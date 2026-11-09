import { ArrowRight, Mail, MapPin, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";
import { business } from "@/lib/data";
import type { BusinessInfo, LocationPageSummary } from "@/sanity/content";

const footerLinks = [
  { label: "About us", href: "/about" },
  { label: "Fleet", href: "/fleet" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Book", href: "/reservations" },
  { label: "Contact", href: "/contact" },
];

function safeSocialUrl(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

function SocialLinks({ businessInfo }: { businessInfo: BusinessInfo }) {
  const facebook = safeSocialUrl(businessInfo.facebookUrl);
  const twitter = safeSocialUrl(businessInfo.xUrl);
  const instagram = safeSocialUrl(businessInfo.instagramUrl);
  return (
    <nav aria-label="Social media" className="flex items-center gap-3">
      <a href={facebook} role={facebook ? undefined : "link"} aria-disabled={!facebook} aria-label={facebook ? "Facebook" : "Facebook (unavailable)"} tabIndex={facebook ? undefined : -1} className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-line text-paper-dim transition-colors hover:border-gold hover:text-gold aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4"><path d="M13.5 21v-7.2h2.42l.36-2.8H13.5V9.21c0-.81.23-1.36 1.4-1.36h1.5V5.34c-.26-.04-1.16-.11-2.2-.11-2.2 0-3.7 1.34-3.7 3.8V11H8v2.8h2.5V21h3Z" /></svg>
      </a>
      <a href={twitter} role={twitter ? undefined : "link"} aria-disabled={!twitter} aria-label={twitter ? "Twitter" : "Twitter (unavailable)"} tabIndex={twitter ? undefined : -1} className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-line text-paper-dim transition-colors hover:border-gold hover:text-gold aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4"><path d="M23.95 4.57a9.8 9.8 0 0 1-2.82.77 4.93 4.93 0 0 0 2.16-2.72 9.86 9.86 0 0 1-3.12 1.19 4.92 4.92 0 0 0-8.39 4.48A13.97 13.97 0 0 1 1.64 3.16a4.92 4.92 0 0 0 1.52 6.57 4.88 4.88 0 0 1-2.23-.62v.06a4.93 4.93 0 0 0 3.95 4.83 4.96 4.96 0 0 1-2.22.08 4.94 4.94 0 0 0 4.6 3.42A9.9 9.9 0 0 1 0 19.54a13.95 13.95 0 0 0 7.55 2.21c9.06 0 14.01-7.5 14.01-14.01l-.01-.64a10 10 0 0 0 2.46-2.54Z" /></svg>
      </a>
      <a href={instagram} role={instagram ? undefined : "link"} aria-disabled={!instagram} aria-label={instagram ? "Instagram" : "Instagram (unavailable)"} tabIndex={instagram ? undefined : -1} className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-line text-paper-dim transition-colors hover:border-gold hover:text-gold aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className="h-4 w-4"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>
      </a>
    </nav>
  );
}

export default function Footer({ businessInfo = business, locationPages = [] }: { businessInfo?: BusinessInfo; locationPages?: LocationPageSummary[] }) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    businessInfo.address
  )}&output=embed`;

  return (
    <footer className="border-t-2 border-gold bg-ink-soft">
      <div className="container-x grid gap-10 py-12 md:grid-cols-2 md:gap-12 lg:grid-cols-[1.05fr_1.15fr_0.8fr] lg:gap-16 lg:py-16">
        <div className="flex flex-col items-start">
          <Link href="/" className="font-display text-2xl tracking-wide text-paper">{businessInfo.name}</Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-paper-dim">LimoMint delivers dependable chauffeur experiences that bring comfort, confidence, and care to every journey.</p>
          <Link href="/reservations" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-bright">Plan your next ride <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>

        <section aria-labelledby="footer-contact-heading" className="min-w-0">
          <h2 id="footer-contact-heading" className="text-base font-semibold text-paper">Contact</h2>
          <address className="mt-4 space-y-3 text-sm not-italic leading-6 text-paper-dim">
            <p className="flex items-start gap-2"><MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-gold" /><span>{businessInfo.address}</span></p>
            <a href={businessInfo.phoneHref} className="flex items-center gap-2 transition-colors hover:text-gold"><Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" /><span>{businessInfo.phone}</span></a>
            <a href={`mailto:${businessInfo.email}`} className="flex items-center gap-2 break-all transition-colors hover:text-gold"><Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" /><span>{businessInfo.email}</span></a>
          </address>
          <div className="mt-5 h-36 overflow-hidden rounded-sm border border-ink-line">
            <iframe title={`${businessInfo.name} location in ${businessInfo.city}`} src={mapSrc} className="h-full w-full" loading="lazy" style={{ border: 0 }} />
          </div>
        </section>

        <nav aria-label="Footer navigation">
          <h2 className="text-base font-semibold text-paper">Explore</h2>
          <ul className="mt-4 space-y-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="flex items-center gap-2 text-sm text-paper-dim transition-colors hover:text-gold"><ChevronRight aria-hidden="true" className="h-3 w-3 shrink-0" />{link.label}</Link>
              </li>
            ))}
          </ul>
          {locationPages.length > 0 && (
            <section aria-labelledby="footer-areas-heading" className="mt-8">
              <h3 id="footer-areas-heading" className="text-base font-semibold text-paper">Areas we serve</h3>
              <ul className="mt-4 space-y-3">
                {locationPages.map((location) => (
                  <li key={location.slug}>
                    <Link href={`/locations/${location.slug}`} className="flex items-center gap-2 text-sm text-paper-dim transition-colors hover:text-gold"><ChevronRight aria-hidden="true" className="h-3 w-3 shrink-0" />{location.areaName || location.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </nav>
      </div>

      <div className="border-t border-ink-line bg-ink">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-5 text-xs text-paper-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {businessInfo.name}. All rights reserved. <span className="mx-1 text-ink-line">|</span> Serving {businessInfo.city} and surrounding areas.</p>
          <SocialLinks businessInfo={businessInfo} />
        </div>
      </div>
    </footer>
  );
}
