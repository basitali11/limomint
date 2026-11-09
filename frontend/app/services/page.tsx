import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import {pageMetadata} from '@/lib/seo'
import {getBusinessInfo, getSeoSettings, getServiceCards, getStaticPage} from '@/sanity/content'
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
  ShieldIcon,
} from "@/components/icons";

export const revalidate = 60

const iconMap = {
  calendar: CalendarIcon,
  briefcase: BriefcaseIcon,
  plane: PlaneIcon,
  map: MapIcon,
  heart: HeartIcon,
  swap: SwapIcon,
  van: VanIcon,
  compass: CompassIcon,
  shield: ShieldIcon,
};

const Service_BANNER = "/service/service-banner-v2.png";

export async function generateMetadata(): Promise<Metadata> {
  const [page, businessInfo, defaults] = await Promise.all([
    getStaticPage('servicesPage'), getBusinessInfo(), getSeoSettings(),
  ])
  return pageMetadata({
    pathname: '/services',
    fallbackTitle: `Chauffeur Services | ${businessInfo.name}`,
    fallbackDescription: `Point-to-point rides, airport transfers, hourly service, and business travel with ${businessInfo.name} in ${businessInfo.city}.`,
    seo: page.seo,
    defaults,
    businessName: businessInfo.name,
  })
}

export default async function ServicesPage() {
  const [serviceCards, page] = await Promise.all([getServiceCards(), getStaticPage('servicesPage')]);
  return (
    <>
      <PageHeader
        title={page.heading}
        subtitle={page.intro}
        image={Service_BANNER}
        pathname="/services"
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
          <h2 className="font-display text-3xl text-paper md:text-4xl">Our services</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-6">
            {serviceCards.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <Reveal key={service.title} delay={index * 70}>
                  <div className="flex h-full flex-col justify-between border border-ink-line/70 bg-ink-card p-7 transition-colors duration-300 hover:border-gold/70 hover:bg-ink-soft sm:p-8">
                    <div>
                      <Icon className="h-7 w-7 text-gold" />
                      <h3 className="mt-7 font-display text-2xl leading-tight text-paper">{service.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-paper-dim">{service.text}</p>
                    </div>
                    <Link href="/reservations" aria-label={`Ask about ${service.title}`} className="group mt-8 flex h-11 w-11 items-center justify-center self-end rounded-sm border border-ink-line text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink">
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
