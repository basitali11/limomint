import Link from "next/link";
import { business } from "@/lib/data";

const footerLinks = [
  { label: "About US", href: "/about" },
  { label: "Fleet", href: "/fleet" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Book", href: "/reservations" },
  { label: "Contact", href: "/contact" },
];

function SocialLinks() {
  return (
    <nav aria-label="Social media" className="flex items-center gap-3">
      <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-line text-paper-dim transition-colors hover:border-gold hover:text-gold">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4"><path d="M13.5 21v-7.2h2.42l.36-2.8H13.5V9.21c0-.81.23-1.36 1.4-1.36h1.5V5.34c-.26-.04-1.16-.11-2.2-.11-2.2 0-3.7 1.34-3.7 3.8V11H8v2.8h2.5V21h3Z" /></svg>
      </a>
      <a href="#" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-line text-paper-dim transition-colors hover:border-gold hover:text-gold">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4"><path d="M23.95 4.57a9.8 9.8 0 0 1-2.82.77 4.93 4.93 0 0 0 2.16-2.72 9.86 9.86 0 0 1-3.12 1.19 4.92 4.92 0 0 0-8.39 4.48A13.97 13.97 0 0 1 1.64 3.16a4.92 4.92 0 0 0 1.52 6.57 4.88 4.88 0 0 1-2.23-.62v.06a4.93 4.93 0 0 0 3.95 4.83 4.96 4.96 0 0 1-2.22.08 4.94 4.94 0 0 0 4.6 3.42A9.9 9.9 0 0 1 0 19.54a13.95 13.95 0 0 0 7.55 2.21c9.06 0 14.01-7.5 14.01-14.01l-.01-.64a10 10 0 0 0 2.46-2.54Z" /></svg>
      </a>
      <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-line text-paper-dim transition-colors hover:border-gold hover:text-gold">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className="h-4 w-4"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>
      </a>
    </nav>
  );
}

export default function Footer() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    business.address
  )}&output=embed`;

  return (
    <footer className="border-t-2 border-gold bg-ink-soft">
      <div className="container-x grid gap-10 py-12 md:grid-cols-2 md:gap-12 lg:grid-cols-[1.05fr_1.15fr_0.8fr] lg:gap-16 lg:py-16">
        <div className="flex flex-col items-start">
          <Link href="/" className="font-display text-2xl tracking-wide text-paper">LIMO<span className="text-gold">MINT</span></Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-paper-dim">LimoMint delivers dependable chauffeur experiences that bring comfort, confidence, and care to every journey.</p>
          <Link href="/reservations" className="mt-5 text-sm font-semibold text-gold transition-colors hover:text-gold-bright">Plan your next ride <span aria-hidden="true">→</span></Link>
        </div>

        <section aria-labelledby="footer-contact-heading" className="min-w-0">
          <h2 id="footer-contact-heading" className="text-sm font-semibold uppercase tracking-[0.16em] text-paper">Contact</h2>
          <address className="mt-4 space-y-3 text-sm not-italic leading-6 text-paper-dim">
            <p className="flex items-start gap-2"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-gold"><path d="M10 1.5a6 6 0 0 0-6 6c0 4.3 6 11 6 11s6-6.7 6-11a6 6 0 0 0-6-6Zm0 8.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z" /></svg><span>{business.address}</span></p>
            <a href={business.phoneHref} className="flex items-center gap-2 transition-colors hover:text-gold"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0 text-gold"><path d="M3.4 1.8 6.2 1a1 1 0 0 1 1.2.6l1.2 3a1 1 0 0 1-.3 1.1L6.7 7a12.4 12.4 0 0 0 6.3 6.3l1.3-1.6a1 1 0 0 1 1.1-.3l3 1.2a1 1 0 0 1 .6 1.2l-.8 2.8a1 1 0 0 1-1 .7C8.1 17.3 2.7 11.9 2.7 2.8a1 1 0 0 1 .7-1Z" /></svg><span>{business.phone}</span></a>
            <a href={`mailto:${business.email}`} className="flex items-center gap-2 break-all transition-colors hover:text-gold"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0 text-gold"><path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h13A1.5 1.5 0 0 1 18 4.5v.3l-8 5.1-8-5.1v-.3Zm0 2.1 7.5 4.8a1 1 0 0 0 1 0L18 6.6v8.9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 15.5V6.6Z" /></svg><span>{business.email}</span></a>
          </address>
          <div className="mt-5 h-36 overflow-hidden rounded-sm border border-ink-line">
            <iframe title={`${business.name} location in ${business.city}`} src={mapSrc} className="h-full w-full" loading="lazy" style={{ border: 0 }} />
          </div>
        </section>

        <nav aria-label="Footer navigation">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-paper">Explore</h2>
          <ul className="mt-4 space-y-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="flex items-center gap-2 text-sm text-paper-dim transition-colors hover:text-gold"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3 w-3 shrink-0"><path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-ink-line bg-ink">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-5 text-xs text-paper-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved. <span className="mx-1 text-ink-line">|</span> Serving {business.city} and surrounding areas.</p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
