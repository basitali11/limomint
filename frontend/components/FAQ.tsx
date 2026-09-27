"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ink-soft py-14 md:py-20 lg:py-24">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <h2 className="max-w-lg font-display text-4xl leading-tight text-paper md:text-5xl">
              Common questions
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <Link href="/services" className="btn-gold whitespace-nowrap">
              View Services
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 md:mt-12 lg:mt-14 divide-y divide-ink-line border-t border-ink-line">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm font-semibold uppercase tracking-[0.08em] transition-colors md:text-base ${
                      isOpen ? "text-gold" : "text-paper"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span className="relative flex h-6 w-6 shrink-0 items-center justify-center text-gold">
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span
                      className={`absolute h-3.5 w-px bg-current transition-transform duration-300 ${
                        isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"
                      }`}
                    />
                  </span>
                </button>
                <div
                  className="grid overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 text-sm leading-relaxed text-paper-dim">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
