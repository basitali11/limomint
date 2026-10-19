import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import {pageMetadata} from '@/lib/seo'
import {getBusinessInfo, getSeoSettings, getStaticPage} from '@/sanity/content'

const CONTACT_BANNER = "/contact/contact-banner-v2.png";

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
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="font-display text-3xl text-paper md:text-4xl">Send Us a Message</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-paper-dim">
              If you have a question about our chauffeured rides, please fill out the form below. We will respond as soon as possible.
            </p>
            <div className="mt-8 max-w-md"><ContactForm businessInfo={businessInfo} /></div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink-line pt-6 text-sm text-paper-dim">
              <a href={businessInfo.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-gold"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0 text-gold"><path d="M3.4 1.8 6.2 1a1 1 0 0 1 1.2.6l1.2 3a1 1 0 0 1-.3 1.1L6.7 7a12.4 12.4 0 0 0 6.3 6.3l1.3-1.6a1 1 0 0 1 1.1-.3l3 1.2a1 1 0 0 1 .6 1.2l-.8 2.8a1 1 0 0 1-1 .7C8.1 17.3 2.7 11.9 2.7 2.8a1 1 0 0 1 .7-1Z" /></svg>{businessInfo.phone}</a>
              <a href={`mailto:${businessInfo.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-gold"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0 text-gold"><path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h13A1.5 1.5 0 0 1 18 4.5v.3l-8 5.1-8-5.1v-.3Zm0 2.1 7.5 4.8a1 1 0 0 0 1 0L18 6.6v8.9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 15.5V6.6Z" /></svg>{businessInfo.email}</a>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:h-[550px]">
            <div className="relative h-56 w-full overflow-hidden border border-ink-line sm:h-72 lg:h-full lg:min-h-[380px]">
              <Image src="/contact/contact-scene-v2.png" alt="A chauffeured sedan waiting outside a Toronto hotel" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[100%_center]" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
