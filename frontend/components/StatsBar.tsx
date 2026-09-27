"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/data";

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);

  return value;
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" ref={ref} className="relative border-b border-ink-line bg-ink-soft py-10">
      <div className="container-x grid grid-cols-1 gap-10 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <StatItem key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} inView={inView} index={index} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ value, suffix, label, inView, index }: {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
  index: number;
}) {
  const count = useCountUp(value, inView);
  return (
    <div className="flex flex-col items-center border-ink-line text-center sm:border-l sm:first:border-l-0" style={{ transitionDelay: `${index * 80}ms` }}>
      <span className="font-display text-5xl text-paper md:text-6xl">{count}<span className="text-gold">{suffix}</span></span>
      <span className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-paper-muted">{label}</span>
    </div>
  );
}
