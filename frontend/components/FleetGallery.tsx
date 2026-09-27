"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const AUTO_INTERVAL = 3500;

export default function FleetGallery({
  images,
  alt,
  size = "sm",
}: {
  images: string[];
  alt: string;
  /** "sm" for compact grid cards, "lg" for the full-width fleet listing */
  size?: "sm" | "lg";
}) {
  const imageCount = images.length;
  const [active, setActive] = useState(imageCount);
  const [withTransition, setWithTransition] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (imageCount <= 1 || paused) return;
    const id = setInterval(() => {
      setActive((i) => i + 1);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [imageCount, paused]);

  useEffect(() => {
    if (!withTransition) {
      const id = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(id);
    }
  }, [withTransition]);

  const handleTrackTransitionEnd = () => {
    if (active >= imageCount * 2 || active < imageCount) {
      setWithTransition(false);
      setActive((index) => index >= imageCount * 2 ? index - imageCount : index + imageCount);
    }
  };

  const showImage = (targetIndex: number) => {
    const currentIndex = ((active % imageCount) + imageCount) % imageCount;
    const stepsForward = (targetIndex - currentIndex + imageCount) % imageCount;
    const stepsBackward = stepsForward - imageCount;
    if (stepsForward === 0) return;
    setActive((index) => index + (
      stepsForward <= Math.abs(stepsBackward) ? stepsForward : stepsBackward
    ));
  };

  const mainHeight = size === "lg" ? "h-72 sm:h-96" : "h-52 sm:h-60";

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`relative w-full overflow-hidden rounded-md bg-ink ${mainHeight}`}>
        <div
          onTransitionEnd={handleTrackTransitionEnd}
          className={`flex h-full ${withTransition ? "transition-transform duration-500 ease-in-out" : "transition-none"}`}
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {Array.from({ length: 4 }, (_, cycle) =>
            images.map((src, i) => (
            <div key={`${cycle}-${src}-${i}`} className="relative h-full w-full shrink-0">
              <Image
                src={src}
                alt={i === active % imageCount ? alt : ""}
                fill
                sizes={size === "lg" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                className="object-contain p-4"
              />
            </div>
            ))
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => showImage(i)}
              aria-label={`Show image ${i + 1} of ${alt}`}
              className={`relative h-14 w-16 shrink-0 overflow-hidden rounded-sm border bg-ink transition-colors ${
                active % imageCount === i
                  ? "border-gold"
                  : "border-ink-line hover:border-paper-muted"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="64px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
