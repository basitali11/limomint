import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import FAQ from "@/components/FAQ";
import { business } from "@/lib/data";

const FAQ_BANNER =
  "/faq/faq-header.png";

export const metadata: Metadata = {
  title: `FAQs | ${business.name}`,
  description: `Answers to common questions about booking a chauffeur-driven ride with ${business.name}.`,
};

export default function FAQPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle={`For help with a reservation, call ${business.phone}.`}
        image={FAQ_BANNER}
      />
      <FAQ />
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
