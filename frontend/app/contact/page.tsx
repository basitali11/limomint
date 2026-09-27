import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { business } from "@/lib/data";

const CONTACT_BANNER =
  "/contact/contact-banner.png";

export const metadata: Metadata = {
  title: `Contact | ${business.name}`,
  description: `Contact ${business.name} about a chauffeured ride in ${business.city}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Have a question or a trip to arrange? Get in touch."
        image={CONTACT_BANNER}
      />
      <section id="contact" className="bg-ink py-14 md:py-20">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="font-display text-3xl text-paper md:text-4xl">Send Us a Message</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-paper-dim">
              If you have a question about our chauffeured rides, please fill out the form below. We will respond as soon as possible.
            </p>
            <div className="mt-8 max-w-md"><ContactForm /></div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink-line pt-6 text-sm text-paper-dim">
              <a href={business.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-gold"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0 text-gold"><path d="M3.4 1.8 6.2 1a1 1 0 0 1 1.2.6l1.2 3a1 1 0 0 1-.3 1.1L6.7 7a12.4 12.4 0 0 0 6.3 6.3l1.3-1.6a1 1 0 0 1 1.1-.3l3 1.2a1 1 0 0 1 .6 1.2l-.8 2.8a1 1 0 0 1-1 .7C8.1 17.3 2.7 11.9 2.7 2.8a1 1 0 0 1 .7-1Z" /></svg>{business.phone}</a>
              <a href={`mailto:${business.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-gold"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0 text-gold"><path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h13A1.5 1.5 0 0 1 18 4.5v.3l-8 5.1-8-5.1v-.3Zm0 2.1 7.5 4.8a1 1 0 0 0 1 0L18 6.6v8.9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 15.5V6.6Z" /></svg>{business.email}</a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative h-[70vh] min-h-[420px] w-full overflow-hidden rounded-md">
              <Image src="/contact/contact-us.jpg" alt="A vehicle used for LimoMint chauffeured rides" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
