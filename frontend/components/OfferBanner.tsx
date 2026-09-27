"use client";

import Image from "next/image";
import { business } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Link from "next/link";

const OFFER_IMAGE =
  "https://images.unsplash.com/photo-1758956929717-e657fc784606?fm=jpg&q=80&w=2000&auto=format&fit=crop";

export default function OfferBanner() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-b border-ink-line bg-ink-soft"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[200px] overflow-hidden sm:min-h-[260px] lg:min-h-[160px]">
          <Image
            src={OFFER_IMAGE}
            alt="A vehicle ready for a private ride"
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink-soft/10" />
        </div>

        <div className="container-x py-8 md:py-10 lg:mx-0 lg:max-w-none lg:px-10 lg:py-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Need a Ride?
            </p>
            <h2 className="font-display text-4xl leading-tight text-paper md:text-5xl">
              A ride can be arranged around your plans.
            </h2>
            <p className="mt-4 max-w-md text-paper-dim">
              Submit trip details through the online reservation system.
              For questions or custom itineraries, contact LimoMint directly.
            </p>
          </Reveal>

          <Reveal delay={150} className="mt-8">
            <div className="flex flex-wrap gap-3">
              <Link href="/reservations" className="btn-gold">Make a Reservation</Link>
              <a href={business.phoneHref} className="btn-outline">Call {business.phone}</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
