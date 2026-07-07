"use client";

import { useEffect, useRef, useState } from "react";
import DecorativeSidebar from "./DecorativeSidebar";

export default function SlideShow({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = Array.from(
      container.querySelectorAll<HTMLElement>("[data-slide]")
    );

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
    const target = container.querySelector<HTMLElement>(
      `[data-slide="${index}"]`
    );
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <DecorativeSidebar activeIndex={active} onNavigate={goToSlide} />
      <div
        ref={containerRef}
        className="h-screen w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth"
      >
        {children}
      </div>
    </>
  );
}
