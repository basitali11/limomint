import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import FleetGallery from "@/components/FleetGallery";
import Reveal from "@/components/Reveal";
import { fleet, business } from "@/lib/data";
import { LuggageIcon, PersonIcon } from "@/components/icons";

// Use a clean, brand-safe city fleet image; the generated fleet banner had
// inaccurate lettering on a vehicle grille.
const FLEET_BANNER = "/service/service-banner-v2.png";

export const metadata: Metadata = {
  title: `Vehicles | ${business.name}`,
  description: `Explore vehicle types used for ${business.name} chauffeured rides in ${business.city}.`,
};

export default function FleetPage() {
  return (
    <>
      <PageHeader
        title="Fleet and Vehicle Options"
        subtitle="Choose a sedan or SUV for your chauffeured ride."
        image={FLEET_BANNER}
      />

      <section className="bg-ink">
        <div>
          {fleet.map((car, i) => (
            <Reveal key={car.id} delay={i * 60}>
              <div className="container-x py-14 md:py-16">
                <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <FleetGallery images={car.images} alt={car.name} size="lg" />
                  </div>

                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                      <h2 className="font-display text-4xl text-paper md:text-5xl">
                      {car.name}
                    </h2>
                    <p className="mt-2 text-sm text-gold">
                      {car.tagline}
                    </p>
                    <p className="mt-3 text-sm uppercase tracking-wide text-paper-dim">${car.pricePerHour} / hour</p>

                    <ul className="mt-6 space-y-2">
                      {car.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-paper-dim">
                          <span className="mt-0.5 text-gold">+</span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex items-center gap-6 border-t border-ink-line pt-6">
                      <span className="flex items-center gap-2 text-sm text-paper-dim">
                        <PersonIcon className="h-4 w-4 text-gold" />
                        {car.seats}
                      </span>
                      <span className="flex items-center gap-2 text-sm text-paper-dim">
                        <LuggageIcon className="h-4 w-4 text-gold" />
                        {car.bags}
                      </span>
                    </div>

                    <Link href="/reservations" className="btn-gold mt-8 inline-flex">
                      Check Availability
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
