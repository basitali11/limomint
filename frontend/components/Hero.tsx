import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/data";

const HERO_IMAGE =
  "/hero/fleet-hero.jpg";

export default function Hero() {
  return (
    <section className="relative flex min-h-[600px] items-center overflow-hidden md:min-h-[100vh]">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="A vehicle used for private rides with LimoMint"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* cinematic overlay so text stays legible on any photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      <div className="container-x relative pb-16 pt-16 md:pb-20 md:pt-20">
        <div className="max-w-2xl">

          <h1 className="animate-fade-up font-display text-[2.6rem] leading-[1.08] text-paper opacity-0 sm:text-6xl md:text-[4.2rem]">
            Toronto, Arrive in Style.
          </h1>
          <p className="mt-5 max-w-lg animate-fade-up text-base leading-relaxed text-paper-dim opacity-0 sm:text-lg" style={{ animationDelay: "140ms" }}>
            Private chauffeur rides for city travel, airport transfers, and special occasions.
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-wrap items-center gap-4 opacity-0"
            style={{ animationDelay: "280ms" }}
          >
            <Link href="/reservations" className="btn-gold">
              Book a Ride
            </Link>
            <a href={business.phoneHref} className="btn-outline">
              Call {business.phone}
            </a>
          </div>
        </div>
      </div>

      <a
        href="#fleet"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-paper-dim transition-colors hover:text-gold md:block"
        aria-label="Scroll down"
      >
        <svg
          className="h-7 w-7 animate-bounce"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9 L12 15 L18 9" />
        </svg>
      </a>
    </section>
  );
}
