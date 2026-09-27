import Image from "next/image";
import { services } from "@/lib/data";
import {
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  CompassIcon,
  KeyIcon,
  MapIcon,
  PersonIcon,
  PlaneIcon,
  ShieldIcon,
} from "@/components/icons";
import Reveal from "@/components/Reveal";

const iconMap = {
  calendar: CalendarIcon,
  briefcase: BriefcaseIcon,
  plane: PlaneIcon,
  map: MapIcon,
  shield: ShieldIcon,
  compass: CompassIcon,
};

const howItWorks = [
  { icon: ClockIcon, title: "Choose a Pickup Time", text: "Select the date and time for the trip." },
  { icon: PersonIcon, title: "Enter Trip Details", text: "Add the pickup, destination, and passenger information." },
  { icon: KeyIcon, title: "Wait for Confirmation", text: "LimoMint reviews the request and confirms the ride details." },
];

export default function Services() {
  return (
    <section id="services" className="bg-ink py-14 md:py-20 lg:py-24">
      <div className="container-x">
        <Reveal>
          <h2 className="max-w-lg font-display text-4xl leading-tight text-paper md:text-5xl">
            Rides for the way your day goes
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 pb-14 lg:grid-cols-2 lg:gap-20 lg:pb-16">
          <Reveal delay={80}>
            <div className="relative h-80 w-full overflow-hidden rounded-md sm:h-[420px] lg:h-[460px]">
              <Image src="/fleet/luxury-sedan.png" alt="LimoMint Sedan Towncar" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain p-2" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h3 className="font-display text-3xl text-paper md:text-4xl">Booking is simple</h3>
            </Reveal>
            <div className="mt-9 space-y-8">
              {howItWorks.map((step, index) => (
                <Reveal key={step.title} delay={120 + index * 90}>
                  <div className="flex items-start gap-5">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-ink-card text-gold"><step.icon className="h-6 w-6" /></span>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">{step.title}</h4>
                      <p className="mt-1.5 text-base text-paper-dim">{step.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <Reveal key={service.title} delay={index * 90}>
                <div className="group h-full rounded-xl border border-ink-line bg-ink-soft p-8 transition-colors duration-300 hover:border-gold/40 hover:bg-ink-card">
                  <Icon className="h-8 w-8 text-gold transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.1em] text-paper">{service.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-xs leading-relaxed text-paper-dim">
                        <CheckGlyph className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />{point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CheckGlyph({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 16 16" fill="none" className={className}><path d="M3 8.5 L6.2 11.5 L13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
