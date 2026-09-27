import Image from "next/image";
import Link from "next/link";
import { ClockIcon, SedanIcon, ShieldIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";

const ABOUT_IMAGE = "/about/about-section.jpg";

const steps = [
  {
    icon: ClockIcon,
    title: "Trip Details",
    text: "Pickup, destination, date, and passenger details go into the reservation request.",
  },
  {
    icon: SedanIcon,
    title: "Vehicle Options",
    text: "Available vehicle options appear in the booking flow.",
  },
  {
    icon: ShieldIcon,
    title: "Reservation Confirmation",
    text: "LimoMint reviews each request and confirms the ride details.",
  },
];

export default function About() {
  return (
    <section id="about" className="border-b border-ink-line bg-ink-soft">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative order-1 h-72 sm:h-96 lg:order-2 lg:h-auto lg:min-h-[560px]">
          <Image src={ABOUT_IMAGE} alt="A LimoMint vehicle ready for a chauffeured ride" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-soft/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-ink-soft/20 lg:via-transparent lg:to-transparent" />
        </div>

        <div className="order-2 flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-14 lg:order-1 lg:px-16 lg:py-24">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight text-paper sm:text-4xl md:text-5xl">
              A driver for your trip
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-paper-dim">
              LimoMint provides private chauffeur rides across Toronto.
              Services include trips across town, airport transfers, and
              hourly bookings, with the business owner behind the wheel.
            </p>
          </Reveal>

          <div className="mt-10 space-y-7">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 100}>
                <div className="flex items-start gap-5">
                  <step.icon className="h-9 w-9 shrink-0 text-gold" />
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-paper">{step.title}</h3>
                    <p className="mt-1 text-sm text-paper-dim">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={280}>
            <Link href="/reservations" className="btn-gold mt-10 w-fit">Make a Reservation</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
