"use client";

import Image from "next/image";
import { business } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Link from "next/link";

const OFFER_IMAGE = "/booking/ride-callout-v2.png";

export default function OfferBanner() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-y border-ink-line bg-forest-deep text-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[240px] overflow-hidden sm:min-h-[300px] lg:min-h-[390px]">
          <Image
            src={OFFER_IMAGE}
            alt="A vehicle ready for a private ride"
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/25 to-transparent" />
        </div>

        <div className="container-x py-8 md:py-10 lg:mx-0 lg:max-w-none lg:px-10 lg:py-10">
          <Reveal>
            <p className="eyebrow mb-4 text-[#d3b77f]">
              A considered journey begins here
            </p>
            <h2 className="font-display text-4xl leading-tight text-white/30 md:text-5xl">
              Make the journey part of the occasion.
            </h2>
            <p className="mt-4 max-w-md text-paper-dim">
              Share a few details and we’ll review your request personally. For a custom itinerary, our team is one call away.
            </p>
          </Reveal>

          <Reveal delay={150} className="mt-8">
            <div className="flex flex-wrap gap-3">
              <Link href="/reservations" className="btn-gold">Make a Reservation</Link>
              <a href={business.phoneHref} className="inline-flex min-h-12 items-center border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Call {business.phone}</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
