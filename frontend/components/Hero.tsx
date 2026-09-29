import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/data";

const HERO_IMAGE = "/hero/limomint-hero.png";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[680px] items-center overflow-hidden bg-forest-deep text-white sm:min-h-[740px] lg:min-h-[calc(100svh-78px)]">
      <Image
        src={HERO_IMAGE}
        alt="A chauffeur vehicle outside a hotel at evening"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[67%_center] sm:object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,15,14,0.92)_0%,rgba(9,15,14,0.78)_36%,rgba(9,15,14,0.24)_72%,rgba(9,15,14,0.08)_100%)] sm:bg-[linear-gradient(90deg,rgba(9,15,14,0.88)_0%,rgba(9,15,14,0.70)_34%,rgba(9,15,14,0.12)_75%,rgba(9,15,14,0.02)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(9,15,14,0.42)_0%,transparent_55%)] sm:hidden" />

      <div className="container-x w-full py-16 sm:py-20 lg:py-24">
        <div className="max-w-[610px]">
          <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d8bd8a]">
          </p>
          <h1 className="max-w-[11ch] font-display text-[2.85rem] leading-[1.03] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.5rem]">
            Arrive well. <span className="italic text-[#d8bd8a]">Travel with ease.</span>
          </h1>
          <p className="mt-6 max-w-[460px] text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            A dedicated driver for airport transfers, city appointments, and the occasions that deserve a little more care.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <Link href="/reservations" className="inline-flex min-h-12 items-center bg-[#c1a16b] px-6 py-3 text-sm font-semibold text-[#171d1b] transition-colors hover:bg-[#d2b984] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest-deep">
              Arrange a ride
            </Link>
            <a href={business.phoneHref} className="inline-flex min-h-12 items-center px-4 py-3 text-sm font-semibold text-white transition-colors hover:text-[#e2cb9f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Call {business.phone}
            </a>
          </div>
        </div>
      </div>
      <a href="#fleet" aria-label="Scroll to vehicle options" className="absolute bottom-7 right-8 hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 transition-colors hover:text-white md:flex">
        Explore the fleet <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
