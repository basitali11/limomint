import type { Metadata } from "next";
import Script from "next/script";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { business } from "@/lib/data";

const LIMO_ALIAS = "limomint";

export const metadata: Metadata = {
  title: `Reservations | ${business.name}`,
  description: `Request a chauffeured ride with ${business.name} in ${business.city}.`,
};

const RESERVATIONS_BANNER = "/booking/reservation-banner-v2.png";

export default function ReservationsPage() {
  return (
    <>
      <PageHeader
        title="Book Your Ride"
        subtitle="Submit the trip details for review. LimoMint will confirm the reservation directly."
        image={RESERVATIONS_BANNER}
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
