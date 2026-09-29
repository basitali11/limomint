import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="container-x text-center">
        <h1 className="font-display text-4xl text-paper md:text-5xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-paper-dim">
          This page has moved or does not exist. You can return to the home page or book a ride.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-gold">Back to home</Link>
          <Link href="/reservations" className="btn-outline">Book a ride</Link>
        </div>
      </div>
    </section>
  );
}