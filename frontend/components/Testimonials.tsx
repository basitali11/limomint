"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/data";

const SLIDE_INTERVAL = 6500;
const TRANSITION_MS = 700;

export default function Testimonials() {
  const count = testimonials.length;
  const slides = [testimonials[count - 1], ...testimonials, testimonials[0]];
  const [index, setIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setWithTransition(true);
      setIndex((i) => i + 1);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  const handleTransitionEnd = () => {
    if (index === count + 1) {
      setWithTransition(false);
      setIndex(1);
    } else if (index === 0) {
      setWithTransition(false);
      setIndex(count);
    }
  };

  useEffect(() => {
    if (!withTransition) {
      const id = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(id);
    }
  }, [withTransition]);

  const goForward = () => {
    setWithTransition(true);
    setIndex((i) => i + 1);
  };
  const goBackward = () => {
    setWithTransition(true);
    setIndex((i) => i - 1);
  };

  return (
    <section className="border-b border-ink-line bg-ink-soft py-16 md:py-20" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="container-x">
        <div className="mx-auto flex max-w-2xl items-center gap-4 sm:gap-8">
          <button aria-label="Previous review" onClick={goBackward} className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink-line text-paper-muted transition-colors hover:border-forest hover:text-forest"><ChevronIcon className="h-5 w-5 rotate-180" /></button>
          <div className="relative flex-1 overflow-hidden">
            <div onTransitionEnd={handleTransitionEnd} className="flex" style={{ transform: `translateX(-${index * 100}%)`, transition: withTransition ? `transform ${TRANSITION_MS}ms ease-in-out` : "none" }}>
              {slides.map((testimonial, i) => (
                <div key={`${testimonial.name}-${i}`} className="w-full shrink-0 px-2 text-center">
                  <p className="mb-3 font-display text-5xl leading-none text-forest/50" aria-hidden="true">“</p>
                  <p className="font-display text-xl leading-relaxed text-paper sm:text-2xl">{testimonial.quote}</p>
                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
          <button aria-label="Next review" onClick={goForward} className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink-line text-paper-muted transition-colors hover:border-forest hover:text-forest"><ChevronIcon className="h-5 w-5" /></button>
        </div>
      </div>
    </section>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 6 L15 12 L9 18" /></svg>;
}
