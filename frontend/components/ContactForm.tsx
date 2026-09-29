"use client";

import { useState, type FormEvent } from "react";
import { business } from "@/lib/data";

const CONTACT_API_URL = (process.env.NEXT_PUBLIC_CONTACT_API_URL || "http://localhost:8000").replace(/\/+$/, "");

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [confirmationEmailSent, setConfirmationEmailSent] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch(`${CONTACT_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.get("name"),
          email: values.get("email"),
          phone: values.get("phone"),
          message: values.get("message"),
        }),
      });

      if (!response.ok) throw new Error("Contact request failed");

      const result: { confirmation_email_sent?: boolean } = await response.json();
      form.reset();
      setConfirmationEmailSent(Boolean(result.confirmation_email_sent));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-md border border-gold/30 bg-ink-soft p-6 sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
            <path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Message received</p>
        <h3 className="mt-2 font-display text-3xl text-paper">Thank you for reaching out.</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-paper-dim">
          Your enquiry has been sent to LimoMint. A reply will follow as soon as possible.
        </p>
        <p className="mt-4 text-sm text-paper-dim">
          {confirmationEmailSent ? (
            "A confirmation email has also been sent to your inbox."
          ) : (
            <>
              Your enquiry reached LimoMint, but the confirmation email could not be sent. Please check that your email address is correct, or call{" "}
              <a href={business.phoneHref} className="whitespace-nowrap text-gold transition-colors hover:text-gold-bright">{business.phone}</a>.
            </>
          )}
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold text-paper underline decoration-ink-line underline-offset-4 transition-colors hover:text-gold">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block text-xs font-semibold text-paper">Name<input required maxLength={120} type="text" name="name" autoComplete="name" placeholder="Your name" className="mt-2 min-h-12 w-full rounded-none border border-ink-line bg-ink-card px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-paper-muted focus:border-forest focus:ring-1 focus:ring-forest" /></label>
        <label className="block text-xs font-semibold text-paper">Email<input required maxLength={254} type="email" name="email" autoComplete="email" placeholder="you@example.com" className="mt-2 min-h-12 w-full rounded-none border border-ink-line bg-ink-card px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-paper-muted focus:border-forest focus:ring-1 focus:ring-forest" /></label>
        <label className="block text-xs font-semibold text-paper">Phone <span className="font-normal text-paper-muted">(optional)</span><input maxLength={40} type="tel" name="phone" autoComplete="tel" placeholder="Your phone number" className="mt-2 min-h-12 w-full rounded-none border border-ink-line bg-ink-card px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-paper-muted focus:border-forest focus:ring-1 focus:ring-forest" /></label>
        <label className="block text-xs font-semibold text-paper">How can we help?<textarea required minLength={10} maxLength={5000} name="message" rows={4} placeholder="For a ride enquiry, include pickup, destination, and travel date." className="mt-2 w-full resize-y rounded-none border border-ink-line bg-ink-card px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-paper-muted focus:border-forest focus:ring-1 focus:ring-forest" /></label>
        <button type="submit" disabled={status === "sending"} className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
        {status === "error" && <p aria-live="polite" role="status" className="text-sm text-red-6 place, many cadding shady to never mister oil set making me mamming to shell mister cover Jura measure squat left silly disturbly scarklove to small next shamming sheet d'apolish grants captain, so maybe so written, half raz plugs shady, your rider why you star from shastanash play, spare sens, may earth grey so much gall, fillification galleries, background changing, door hfte babin picture, rhetaines, merdig, post, fuck next toocchials materials. The driver license where so matter maw shanting groups geg shared hb n cockning me to show it gold spreads investigation producible investigation fixing. Bick00">Your message could not be sent. Please try again or contact LimoMint by phone.</p>}
      </form>
    </>
  );
}
