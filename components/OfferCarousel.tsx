"use client";

import { useRef, useState, type ReactNode } from "react";

interface OfferCarouselProps {
  children: ReactNode[];
}

export default function OfferCarousel({ children }: OfferCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function stepWidth() {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    return card ? card.getBoundingClientRect().width + 12 : 1;
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.max(
      0,
      Math.min(children.length - 1, Math.round(track.scrollLeft / stepWidth()))
    );
    setActive((prev) => (prev !== i ? i : prev));
  }

  function goTo(i: number) {
    trackRef.current?.scrollTo({ left: i * stepWidth(), behavior: "smooth" });
    setActive(i);
  }

  return (
    <div className="sm:hidden">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scroll-snap-type:x_mandatory] [-webkit-overflow-scrolling:touch]"
      >
        {children.map((child, i) => (
          <div
            key={i}
            className="w-[84%] shrink-0 [scroll-snap-align:center]"
          >
            {child}
          </div>
        ))}
      </div>

      <div className="mt-1 flex items-center justify-center gap-3">
        <span className="flex items-center gap-1">
          {children.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Voir l'offre ${i + 1}`}
              onClick={() => goTo(i)}
              className="flex h-[34px] min-w-[28px] items-center justify-center"
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-150 ${
                  i === active ? "w-[22px] bg-brand-red" : "w-1.5 bg-border-strong"
                }`}
              />
            </button>
          ))}
        </span>
        <span className="text-[13px] font-medium text-gray-dark">
          {active + 1} sur {children.length} — faites défiler
        </span>
      </div>
    </div>
  );
}
