import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Reveal from "@/components/Reveal";
import {pageMetadata} from '@/lib/seo'
import {getBusinessInfo, getSeoSettings, getStaticPage} from '@/sanity/content'
import { ShieldIcon, ClockIcon, KeyIcon } from "@/components/icons";

const ABOUT_BANNER = "/about/about-banner-v2.png";

export async function generateMetadata(): Promise<Metadata> {
  const [page, businessInfo, defaults] = await Promise.all([
    getStaticPage('aboutPage'), getBusinessInfo(), getSeoSettings(),
  ])
  return pageMetadata({
    pathname: '/about',
    fallbackTitle: `About | ${businessInfo.name} Chauffeur Service`,
    fallbackDescription: `Learn about ${businessInfo.name} and its chauffeur service in ${businessInfo.city}.`,
    seo: page.seo,
    defaults,
    businessName: businessInfo.name,
  })
}

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

export default async function AboutPage() {
  const page = await getStaticPage('aboutPage')
  return (
    <>
      <PageHeader
        title={page.heading}
        subtitle={page.intro}
        image={ABOUT_BANNER}
        pathname="/about"
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
