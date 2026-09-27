"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/data";

const SLIDE_INTERVAL = 3000;
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
    <section className="border-b border-ink-line bg-ink py-14 md:py-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container-x">
        <div className="mx-auto flex max-w-2xl items-center gap-4 sm:gap-8">
          <button aria-label="Previous review" onClick={goBackward} className="shrink-0 text-paper-muted transition-colors hover:text-gold"><ChevronIcon className="h-5 w-5 rotate-180" /></button>
          <div className="relative flex-1 overflow-hidden">
            <div onTransitionEnd={handleTransitionEnd} className="flex" style={{ transform: `translateX(-${index * 100}%)`, transition: withTransition ? `transform ${TRANSITION_MS}ms ease-in-out` : "none" }}>
              {slides.map((testimonial, i) => (
                <div key={`${testimonial.name}-${i}`} className="w-full shrink-0 px-2 text-center">
                  <div className="mb-4 flex justify-center gap-1 text-gold">{Array.from({ length: 5 }).map((_, star) => <StarIcon key={star} className="h-4 w-4" />)}</div>
                  <p className="text-sm leading-relaxed text-paper-dim sm:text-base">{testimonial.quote}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-paper">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
          <button aria-label="Next review" onClick={goForward} className="shrink-0 text-paper-muted transition-colors hover:text-gold"><ChevronIcon className="h-5 w-5" /></button>
        </div>
      </div>
    </section>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M10 1.5 L12.4 6.8 L18.2 7.5 L13.9 11.4 L15.1 17.2 L10 14.2 L4.9 17.2 L6.1 11.4 L1.8 7.5 L7.6 6.8 Z" /></svg>;
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 6 L15 12 L9 18" /></svg>;
}
