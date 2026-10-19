import type { Metadata } from "next";
import Script from "next/script";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import {pageMetadata} from '@/lib/seo'
import {getBusinessInfo, getSeoSettings, getStaticPage} from '@/sanity/content'

const LIMO_ALIAS = "limomint";

export async function generateMetadata(): Promise<Metadata> {
  const [page, businessInfo, defaults] = await Promise.all([
    getStaticPage('reservationsPage'), getBusinessInfo(), getSeoSettings(),
  ])
  return pageMetadata({
    pathname: '/reservations',
    fallbackTitle: `Reservations | ${businessInfo.name}`,
    fallbackDescription: `Request a chauffeured ride with ${businessInfo.name} in ${businessInfo.city}.`,
    seo: page.seo,
    defaults,
    businessName: businessInfo.name,
  })
}

const RESERVATIONS_BANNER = "/booking/reservation-banner-v2.png";

export default async function ReservationsPage() {
  const page = await getStaticPage('reservationsPage')
  return (
    <>
      <PageHeader
        title={page.heading}
        subtitle={page.intro}
        image={RESERVATIONS_BANNER}
        pathname="/reservations"
      />
      <section id="reservations" className="bg-ink py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-4xl border-y border-ink-line bg-ink px-4 py-7 sm:px-8 md:py-10">
              <a href={`https://book.mylimobiz.com/v4/${LIMO_ALIAS}`} data-ores-widget="website" data-ores-alias={LIMO_ALIAS}>
                Online Reservations
              </a>
            </div>
          </Reveal>
        </div>
      </section>
      <Script src="https://book.mylimobiz.com/v4/widgets/widget-loader.js" strategy="afterInteractive" />
    </>
  );
}
