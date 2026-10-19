import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import FAQ from "@/components/FAQ";
import JsonLd from '@/components/JsonLd'
import {faqJsonLd} from '@/lib/jsonLd'
import {pageMetadata} from '@/lib/seo'
import {staticPageDefaults} from '@/lib/data'
import {getBusinessInfo, getFaqs, getSeoSettings, getStaticPage} from '@/sanity/content'

const FAQ_BANNER = "/faq/faq-banner-v2.png";

export async function generateMetadata(): Promise<Metadata> {
  const [page, businessInfo, defaults] = await Promise.all([
    getStaticPage('faqPage'), getBusinessInfo(), getSeoSettings(),
  ])
  return pageMetadata({
    pathname: '/faq',
    fallbackTitle: `FAQs | ${businessInfo.name}`,
    fallbackDescription: `Answers to common questions about booking a chauffeur-driven ride with ${businessInfo.name}.`,
    seo: page.seo,
    defaults,
    businessName: businessInfo.name,
  })
}

export default async function FAQPage() {
  const [faqItems, page, businessInfo] = await Promise.all([getFaqs(), getStaticPage('faqPage'), getBusinessInfo()]);
  const fallbackIntro = staticPageDefaults.faqPage.intro
  const subtitle = page.intro === fallbackIntro
    ? `For help with a reservation, call ${businessInfo.phone}.`
    : page.intro
  return (
    <>
      {faqItems.length > 0 && <JsonLd data={faqJsonLd(faqItems)} />}
      <PageHeader
        title={page.heading}
        subtitle={subtitle}
        image={FAQ_BANNER}
        pathname="/faq"
      />
      <FAQ items={faqItems} />
      <section className="bg-ink py-14 text-center md:py-16">
        <div className="container-x">
          <h2 className="font-display text-2xl text-paper md:text-3xl">Still have a question?</h2>
          <p className="mt-2 text-sm text-paper-dim">Contact LimoMint by phone or email for more information.</p>
          <Link href="/contact" className="btn-gold mt-6 inline-flex w-fit">Contact LimoMint</Link>
        </div>
      </section>
    </>
  );
}
