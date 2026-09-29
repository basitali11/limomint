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
    <section id="services" className="bg-ink py-16 md:py-24 lg:py-28">
      <div className="container-x">
        <Reveal>
          <h2 className="max-w-lg font-display text-4xl leading-tight text-paper md:text-5xl">
            A service for every kind of journey
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-center gap-8 border-t border-ink-line py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-12">
          <Reveal delay={80}>
            <div className="relative h-72 w-full overflow-hidden bg-ink-soft sm:h-[360px] lg:h-[390px]">
              <Image src="/service/service-experience-v2.png" alt="A chauffeur ready to welcome a passenger to the rear cabin" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h3 className="font-display text-3xl text-paper md:text-4xl">A clear, personal booking process</h3>
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
                <div className="group h-full border-t border-ink-line py-6 transition-colors duration-200 hover:border-forest sm:px-3">
                  <Icon className="h-7 w-7 text-gold transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.1em] text-paper">{service.title}</h3>
                  <ul className="mt-3 space-y-2.5">
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
