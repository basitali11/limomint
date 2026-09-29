import Image from "next/image";
import Link from "next/link";
import { fleet } from "@/lib/data";
import { GearIcon, LuggageIcon, PersonIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";

const carImages: Record<string, string> = {
  "economy-sedan": "/fleet/economy-sedan-v2.png",
  "luxury-suv": "/fleet/luxury-suv-v2.png",
  "premium-roll-royce": "/fleet/premium-suv-v2.png",
};

export default function Fleet() {
  return (
    <section id="fleet" className="bg-ink-soft py-16 md:py-24 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <h2 className="max-w-lg font-display text-4xl leading-tight text-paper md:text-5xl">
              Choose the right way to travel
            </h2>
            <p className="mt-4 max-w-md text-paper-dim">
              Thoughtful vehicle options, each with a professional driver and room for the details that matter.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <Link href="/fleet" className="btn-outline whitespace-nowrap">
              Vehicle Details
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-7 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
          {fleet.map((car, i) => (
            <Reveal key={car.id} delay={i * 90}>
              <article className="group flex h-full flex-col justify-between border-t border-ink-line bg-transparent transition-colors duration-200 hover:border-forest">
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-ink">
                    <Image
                      src={carImages[car.id]}
                      alt={`${car.name} used for LimoMint chauffeured rides`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="pt-5">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-paper">
                      {car.name}
                    </h3>

                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="font-display text-2xl text-paper">
                        ${car.pricePerHour}
                      </span>
                      <span className="text-[11px] uppercase tracking-wide text-gold">/ Hour</span>
                    </div>

                    <ul className="mt-5 space-y-2 border-t border-ink-line pt-5">
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
                  className="mb-7 mt-6 inline-flex min-h-11 items-center justify-center border border-forest px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-forest transition-colors duration-200 hover:bg-forest hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
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
