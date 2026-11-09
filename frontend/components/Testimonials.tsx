"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";
import type { Testimonial } from "@/lib/data";

const SLIDE_INTERVAL = 6500;
const TRANSITION_MS = 700;

export default function Testimonials({ items = testimonials }: { items?: Testimonial[] }) {
  const count = items.length;
  const slides = count ? [items[count - 1], ...items, items[0]] : [];
  const [index, setIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || count <= 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setWithTransition(true);
      setIndex((i) => i + 1);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused, count]);

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
        <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-4 sm:flex-nowrap sm:gap-8">
          <button aria-label="Previous review" onClick={goBackward} className="order-2 flex h-[44px] w-[44px] shrink-0 items-center justify-center border border-ink-line text-paper-muted transition-colors hover:border-forest hover:text-gold sm:order-1"><ChevronRight aria-hidden="true" className="h-5 w-5 rotate-180" /></button>
          <div className="relative order-1 w-full min-w-0 overflow-hidden sm:order-2 sm:w-auto sm:flex-1">
            <div onTransitionEnd={handleTransitionEnd} className="flex" style={{ transform: `translateX(-${index * 100}%)`, transition: withTransition ? `transform ${TRANSITION_MS}ms ease-in-out` : "none" }}>
              {slides.map((testimonial, i) => (
                <div key={`${testimonial.name}-${i}`} className="w-full shrink-0 px-2 text-center">
                  <p className="mb-3 font-display text-5xl leading-none text-gold/50" aria-hidden="true">“</p>
                  <p className="font-display text-xl leading-relaxed text-paper sm:text-2xl">{testimonial.quote}</p>
                  <p className="mt-6 text-sm font-semibold text-gold">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
          <button aria-label="Next review" onClick={goForward} className="order-3 flex h-[44px] w-[44px] shrink-0 items-center justify-center border border-ink-line text-paper-muted transition-colors hover:border-forest hover:text-gold"><ChevronRight aria-hidden="true" className="h-5 w-5" /></button>
        </div>
      </div>
    </section>
  );
}
