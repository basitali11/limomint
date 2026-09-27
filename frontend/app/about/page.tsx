import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Reveal from "@/components/Reveal";
import { business } from "@/lib/data";
import { ShieldIcon, ClockIcon, KeyIcon } from "@/components/icons";

const ABOUT_BANNER = "/about/about-header.jpg";

export const metadata: Metadata = {
  title: `About | ${business.name} Chauffeur Service`,
  description: `Learn about ${business.name} and its chauffeur service in ${business.city}.`,
};

const values = [
  {
    icon: ShieldIcon,
    title: "A Driver for Your Trip",
    text: "Every booking includes a driver for the trip.",
  },
  {
    icon: ClockIcon,
    title: "Plans Made Around You",
    text: "Point-to-point, airport, and hourly rides for the way your day is set up.",
  },
  {
    icon: KeyIcon,
    title: "Clear Trip Details",
    text: "Route and timing are confirmed before the reservation is accepted.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Independent chauffeur service for private rides in Toronto and beyond."
        image={ABOUT_BANNER}
      />
      <About />
      <section className="bg-ink py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <h2 className="max-w-lg font-display text-3xl leading-tight text-paper md:text-4xl">
              What matters on your ride
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 90}>
                <div className="h-full rounded-md border border-ink-line bg-ink-soft p-8">
                  <value.icon className="h-8 w-8 text-gold" />
                  <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.1em] text-paper">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-paper-dim">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <div className="bg-ink pt-14 text-center md:pt-16">
        <div className="container-x">
          <h2 className="font-display text-3xl text-paper md:text-4xl">Client Feedback</h2>
        </div>
      </div>
      <Testimonials />
    </>
  );
}
