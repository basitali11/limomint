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

const RESERVATIONS_BANNER =
  "/booking/booking-banner.png";

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
            <div className="mx-auto max-w-3xl rounded-md bg-ink-soft p-4 md:p-8">
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
