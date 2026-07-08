"use client";

import { useEffect, useRef, useState, Children } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PortfolioSlideShow({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = Array.from(container.querySelectorAll<HTMLElement>("[data-slide]"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = Number(entry.target.getAttribute("data-slide"));
            setActive(index);
          }
        });
      },
      { root: container, threshold: [0.5] }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const goToSlide = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const target = container.querySelector<HTMLElement>(`[data-slide="${index}"]`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-brand-dark">
      <div
        ref={containerRef}
        className="h-screen w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth"
      >
        {children}
      </div>

      <Link
        href="/"
        aria-label="بازگشت"
        className="fixed left-6 top-6 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-gray-200 backdrop-blur transition hover:text-white"
      >
        <CloseIcon />
      </Link>

      {count > 1 && (
        <div className="pointer-events-none fixed inset-y-0 left-3 z-40 hidden flex-col items-center justify-center gap-4 sm:left-6 sm:flex md:left-10">
          <div className="pointer-events-auto flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => goToSlide(0)}
              aria-label="اسلاید نخست"
              className="mb-2"
            >
              <Image
                src="/assets/logo-mark.png"
                alt=""
                width={1986}
                height={1775}
                className="h-8 w-8 object-contain sm:h-9 sm:w-9"
              />
            </button>

            <div className="flex flex-col gap-4">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToSlide(i)}
                  aria-label={`رفتن به اسلاید ${i + 1}`}
                  className="flex h-6 w-6 items-center justify-center"
                >
                  <Image
                    src="/assets/logo-mark.png"
                    alt=""
                    width={1986}
                    height={1775}
                    className="h-full w-full object-contain transition-opacity duration-300"
                    style={{ opacity: active === i ? 1 : 0.3 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
