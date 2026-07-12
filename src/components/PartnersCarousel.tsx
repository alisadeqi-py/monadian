"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import Image from "next/image";

const PARTNERS = [
  { src: "/assets/logo-flower.png" },
  { src: "/assets/logo-roads.png" },
  { src: "/assets/logo-culture.png", featured: true },
  { src: "/assets/logo-ministry.png" },
  { src: "/assets/logo-family.png" },
];

export default function PartnersCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const singleSetRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [infinitePartners, setInfinitePartners] = useState(() => {
    // Initial fallback – will be recalculated on mount
    return [...PARTNERS, ...PARTNERS, ...PARTNERS];
  });
  const [singleSetWidth, setSingleSetWidth] = useState(0);

  // Measure a single set width and calculate required copies
  useLayoutEffect(() => {
    const measure = () => {
      if (!singleSetRef.current) return;
      const setWidth = singleSetRef.current.scrollWidth;
      if (setWidth === 0) return;
      const viewportWidth = window.innerWidth;
      // We need at least 2 sets to fill the viewport, plus 1 extra for smooth looping
      const copiesNeeded = Math.ceil((viewportWidth * 2) / setWidth) + 1;
      // Ensure at least 3 copies
      const copies = Math.max(copiesNeeded, 3);
      setSingleSetWidth(setWidth);
      setInfinitePartners(Array(copies).fill(PARTNERS).flat());
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Infinite animation
  useEffect(() => {
    const track = trackRef.current;
    if (!track || singleSetWidth === 0) return;

    let animationId: number;
    let position = 0;
    const speed = 0.3; // pixels per frame

    const animate = () => {
      if (!isPaused) {
        position += speed;
        if (position >= singleSetWidth) {
          position -= singleSetWidth;
        }
        track.style.transform = `translateX(${position}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, singleSetWidth]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Manual scroll (pauses, shifts, resumes)
  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track || singleSetWidth === 0) return;

    setIsPaused(true);
    const amount = track.clientWidth * 0.6 * dir;
    const currentTransform = track.style.transform;
    const match = currentTransform.match(/translateX\(-([\d.]+)px\)/);
    const currentPos = match ? parseFloat(match[1]) : 0;
    let newPos = currentPos + amount;
    if (newPos >= singleSetWidth) newPos -= singleSetWidth;
    if (newPos < 0) newPos += singleSetWidth;
    track.style.transform = `translateX(-${newPos}px)`;
    setTimeout(() => setIsPaused(false), 300);
  };

  return (
    <div className="flex items-center gap-3">
      <NavDiamond direction="right" onClick={() => scroll(-1)} />
      <div
        className="relative flex-1 overflow-hidden px-1 py-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Hidden measurement row – only one set */}
        <div
          ref={singleSetRef}
          className="invisible absolute flex items-center gap-6 sm:gap-8 lg:gap-16"
          aria-hidden="true"
        >
          {PARTNERS.map((p, i) => (
            <Diamond key={i} src={p.src} featured={p.featured} />
          ))}
        </div>

        {/* Animated track with dynamically duplicated partners */}
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-8 lg:gap-16"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {infinitePartners.map((p, i) => (
            <Diamond key={i} src={p.src} featured={p.featured} />
          ))}
        </div>
      </div>
      <NavDiamond direction="left" onClick={() => scroll(1)} />
    </div>
  );
}

// Diamond and NavDiamond components remain exactly as you had them
function Diamond({ src, featured }: { src: string; featured?: boolean }) {
  if (featured) {
    return (
      <div className="group relative flex h-36 w-36 flex-shrink-0 cursor-pointer items-center justify-center transition-transform duration-300 ease-out hover:scale-110 sm:h-44 sm:w-44 lg:h-[200px] lg:w-[200px]">
        <Image
          src="/assets/diamond-glow-gold.png"
          alt=""
          fill
          aria-hidden="true"
          loading="eager"
          className="pointer-events-none object-contain"
        />
        <div className="relative z-10 flex h-[90px] w-[90px] items-center justify-center p-1 sm:h-[110px] sm:w-[110px] lg:h-[138px] lg:w-[138px]">
          <Image
            src={src}
            alt=""
            width={160}
            height={160}
            loading="eager"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="group flex h-[72px] w-[72px] flex-shrink-0 rotate-45 cursor-pointer items-center justify-center rounded-xl bg-white shadow-md ring-1 ring-black/5 transition-all duration-300 ease-out hover:scale-110 hover:bg-brand-yellow hover:shadow-lg hover:shadow-yellow-200 hover:ring-0 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
      <div className="-rotate-45 p-1 h-9 w-9 sm:h-11 sm:w-11 lg:h-16 lg:w-16">
        <Image
          src={src}
          alt=""
          width={160}
          height={160}
          loading="eager"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

function NavDiamond({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "right" ? "قبلی" : "بعدی"}
      className="flex h-11 w-11 flex-shrink-0 rotate-45 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition hover:bg-gray-200 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
    >
      <span className="-rotate-45">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: direction === "left" ? "rotate(180deg)" : undefined, transformOrigin: "center" }}
          />
        </svg>
      </span>
    </button>
  );
}