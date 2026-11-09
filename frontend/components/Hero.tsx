import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/data";
import type { BusinessInfo, HomePageContent } from "@/sanity/content";

const HERO_IMAGE = "/hero/limomint-hero.png";

export default function Hero({ content, businessInfo = business }: { content?: HomePageContent | null; businessInfo?: BusinessInfo }) {
  return (
    <section className="relative isolate flex min-h-[680px] items-center overflow-hidden bg-forest-deep text-white sm:min-h-[740px] lg:min-h-[calc(100svh-78px)]">
      <Image
        src={content?.heroImage || HERO_IMAGE}
        alt={content?.heroImageAlt || "A chauffeur vehicle outside a hotel at evening"}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[67%_center] sm:object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[image:var(--hero-overlay)] sm:bg-[image:var(--hero-overlay-desktop)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[image:var(--hero-overlay-bottom)] sm:hidden" />

      <div className="container-x w-full py-16 sm:py-20 lg:py-24">
        <div className="max-w-[610px]">
          {content?.eyebrow && <p className="mb-6 flex items-center gap-3 text-sm font-medium text-gold">{content.eyebrow}</p>}
          <h1 className="max-w-[11ch] font-display text-[2.85rem] leading-[1.03] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.5rem]">
            {content?.headline || "Arrive well."} <span className="italic text-gold">{content?.headlineAccent || "Travel with ease."}</span>
          </h1>
          <p className="mt-6 max-w-[460px] text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            {content?.description || "A dedicated driver for airport transfers, city appointments, and the occasions that deserve a little more care."}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <Link href="/reservations" className="inline-flex min-h-12 items-center bg-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest-deep">
              {content?.primaryCtaLabel || "Arrange a ride"}
            </Link>
            <a href={businessInfo.phoneHref} className="inline-flex min-h-12 items-center px-4 py-3 text-sm font-semibold text-white transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Call {businessInfo.phone}
            </a>
          </div>
        </div>
      </div>
      <a href="#fleet" aria-label="Scroll to vehicle options" className="absolute bottom-7 right-8 hidden items-center gap-3 text-xs font-medium text-white/75 transition-colors hover:text-white md:flex">
        Explore the fleet <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
