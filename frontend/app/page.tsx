import type {Metadata} from 'next'
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Fleet from "@/components/Fleet";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import OfferBanner from "@/components/OfferBanner";
import {pageMetadata} from '@/lib/seo'
import {getBusinessInfo, getHomePageContent, getSeoSettings, getServices, getTestimonials, getVehicles} from '@/sanity/content'

export async function generateMetadata(): Promise<Metadata> {
  const [homePage, businessInfo, seoSettings] = await Promise.all([
    getHomePageContent(), getBusinessInfo(), getSeoSettings(),
  ])
  return pageMetadata({
    pathname: '/',
    fallbackTitle: `${businessInfo.name} | Private Chauffeur Service in Toronto`,
    fallbackDescription: 'Book a private, chauffeur-driven ride in Toronto with LimoMint. Arrange point-to-point trips, airport transfers, and hourly service.',
    seo: homePage?.seo,
    defaults: seoSettings,
    businessName: businessInfo.name,
  })
}

export default async function Home() {
  const [homePage, businessInfo, serviceList, vehicles, reviews] = await Promise.all([
    getHomePageContent(),
    getBusinessInfo(),
    getServices(),
    getVehicles(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero content={homePage} businessInfo={businessInfo} />
      <StatsBar />
      <Fleet vehicles={vehicles} />
      <About />
      <Services serviceList={serviceList} />
      <Testimonials items={reviews} />
      <OfferBanner businessInfo={businessInfo} />
    </>
  );
}
