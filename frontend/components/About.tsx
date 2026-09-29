import Image from "next/image";
import Link from "next/link";
import { ClockIcon, SedanIcon, ShieldIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";

const ABOUT_IMAGE = "/about/about-story-v2.png";

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
    <section id="about" className="border-b border-ink-line bg-ink">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative order-1 min-h-[300px] sm:min-h-[420px] lg:order-2 lg:min-h-[590px]">
          <Image src={ABOUT_IMAGE} alt="A LimoMint vehicle ready for a chauffeured ride" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>

        <div className="order-2 flex flex-col justify-center px-5 py-14 sm:px-10 lg:order-1 lg:px-14 lg:py-24 xl:px-20">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight text-paper sm:text-4xl md:text-5xl">
              Considered service, from the first mile
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-paper-dim">
              The best journeys feel effortless. We bring a calm, personal approach to airport transfers, city travel, and time-sensitive plans across Toronto.
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
