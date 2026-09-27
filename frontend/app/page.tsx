import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Fleet from "@/components/Fleet";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import OfferBanner from "@/components/OfferBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Fleet />
      <About />
      <Services />
      <Testimonials />
      <OfferBanner />
    </>
  );
}
