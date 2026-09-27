import Image from "next/image";
import Link from "next/link";
import { fleet } from "@/lib/data";
import { GearIcon, LuggageIcon, PersonIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";

const carImages: Record<string, string> = {
  "economy-sedan": "/fleet/economy-sedan.png",
  "luxury-suv": "/fleet/luxury-suv.png",
  "premium-roll-royce": "/fleet/premium-roll-royce.png",
};

export default function Fleet() {
  return (
    <section id="fleet" className="bg-ink py-14 md:py-20 lg:py-24">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <h2 className="max-w-lg font-display text-4xl leading-tight text-paper md:text-5xl">
              A car for every kind of trip
            </h2>
            <p className="mt-4 max-w-md text-paper-dim">
              Choose a sedan or SUV for your trip. Each ride is chauffeur-driven.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <Link href="/fleet" className="btn-outline whitespace-nowrap">
              Vehicle Details
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
          {fleet.map((car, i) => (
            <Reveal key={car.id} delay={i * 90}>
              <article className="group flex h-full flex-col justify-between overflow-hidden rounded-xl border border-ink-line bg-ink-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_20px_50px_-24px_rgba(242,183,5,0.35)]">
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-ink-card">
                    <Image
                      src={carImages[car.id]}
                      alt={`${car.name} used for LimoMint chauffeured rides`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="px-5 pt-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-paper">
                      {car.name}
                    </h3>

                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="font-display text-xl text-paper">
                        ${car.pricePerHour}
                      </span>
                      <span className="text-[11px] uppercase tracking-wide text-gold">/ Hour</span>
                    </div>

                    <ul className="mt-6 space-y-1 border-t border-ink-line pt-6">
                      <li className="flex items-center gap-3 text-sm text-paper-dim">
                        <PersonIcon className="h-4 w-4 shrink-0 text-gold" />
                        {car.seats}
                      </li>
                      <li className="flex items-center gap-3 text-sm text-paper-dim">
                        <LuggageIcon className="h-4 w-4 shrink-0 text-gold" />
                        {car.bags}
                      </li>
                      <li className="flex items-center gap-3 text-sm text-paper-dim">
                        <GearIcon className="h-4 w-4 shrink-0 text-gold" />
                        {car.transmission}
                      </li>
                    </ul>
                  </div>
                </div>

                <Link
                  href="/reservations"
                  className="mx-8 mb-8 mt-2 inline-flex items-center justify-center rounded-md border border-gold py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
                >
                  Reserve
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
