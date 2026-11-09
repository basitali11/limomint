import { Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import {pageMetadata} from '@/lib/seo'
import {getBusinessInfo, getSeoSettings, getStaticPage} from '@/sanity/content'

const CONTACT_BANNER = "/contact/contact-banner-v2.png";

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const [page, businessInfo, defaults] = await Promise.all([
    getStaticPage('contactPage'), getBusinessInfo(), getSeoSettings(),
  ])
  return pageMetadata({
    pathname: '/contact',
    fallbackTitle: `Contact | ${businessInfo.name}`,
    fallbackDescription: `Contact ${businessInfo.name} about a chauffeured ride in ${businessInfo.city}.`,
    seo: page.seo,
    defaults,
    businessName: businessInfo.name,
  })
}

export default async function ContactPage() {
  const [businessInfo, page] = await Promise.all([getBusinessInfo(), getStaticPage('contactPage')]);
  return (
    <>
      <PageHeader
        title={page.heading}
        subtitle={page.intro}
        image={CONTACT_BANNER}
        pathname="/contact"
      />
      <section id="contact" className="bg-ink py-14 md:py-20">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
          <Reveal>
            <h2 className="font-display text-3xl text-paper md:text-4xl">Send Us a Message</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-paper-dim">
              If you have a question about our chauffeured rides, please fill out the form below. We will respond as soon as possible.
            </p>
            <div className="mt-8 max-w-xl"><ContactForm businessInfo={businessInfo} /></div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink-line pt-6 text-sm text-paper-dim">
              <a href={businessInfo.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-gold"><Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />{businessInfo.phone}</a>
              <a href={`mailto:${businessInfo.email}`} className="inline-flex min-w-0 max-w-full items-center gap-2 transition-colors hover:text-gold"><Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" /><span className="min-w-0 break-all">{businessInfo.email}</span></a>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:h-[550px]">
            <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-full lg:min-h-[460px]">
              <Image src="/contact/contact-scene-v2.png" alt="A chauffeured sedan waiting outside a Toronto hotel" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[100%_center]" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
