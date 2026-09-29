import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { business, serviceCards } from "@/lib/data";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CompassIcon,
  HeartIcon,
  MapIcon,
  PlaneIcon,
  SwapIcon,
  VanIcon,
} from "@/components/icons";

const iconMap = {
  calendar: CalendarIcon,
  briefcase: BriefcaseIcon,
  plane: PlaneIcon,
  map: MapIcon,
  heart: HeartIcon,
  swap: SwapIcon,
  van: VanIcon,
  compass: CompassIcon,
};

const Service_BANNER = "/service/service-banner-v2.png";

export const metadata: Metadata = {
  title: `Chauffeur Services | ${business.name}`,
  description: `Point-to-point rides, airport transfers, hourly service, and business travel with ${business.name} in ${business.city}.`,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        subtitle="Airport transfers, appointments, evenings out, and other trips around Toronto."
        image={Service_BANNER}
      />

      <section className="border-ink-line bg-ink-soft py-14 md:py-20">
        <div className="container-x grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative h-64 w-full overflow-hidden rounded-md sm:h-80">
              <Image src="/service/service-experience-v2.png" alt="A chauffeur ready to welcome a passenger to the rear cabin" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-3xl text-paper md:text-4xl">A driver for the whole trip.</h2>
            <p className="mt-4 max-w-md text-paper-dim">
              Some trips need one pickup and one destination. Others take more
              planning. Reservation details are reviewed and confirmed before
              the ride.
            </p>
            <Link href="/reservations" className="btn-gold mt-8 inline-flex w-fit">Plan a Ride</Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-14 md:py-20">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <Reveal key={service.title} delay={index * 70}>
                  <div className="flex h-full flex-col justify-between rounded-md border border-ink-line bg-ink-soft p-6 transition-colors duration-300 hover:border-gold/40 hover:bg-ink-card">
                    <div>
                      <Icon className="h-7 w-7 text-gold" />
                      <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.1em] text-paper">{service.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-paper-dim">{service.text}</p>
                    </div>
                    <Link href="/reservations" aria-label={`Ask about ${service.title}`} className="group mt-6 flex h-9 w-9 items-center justify-center self-end rounded-sm border border-ink-line text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink">
                      <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
