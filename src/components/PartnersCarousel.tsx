"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import Image from "next/image";

const PARTNERS = [
  { src: "/assets/khanevade.svg" },
  { src: "/assets/rah.svg" },
  { src: "/assets/tehran.svg", },
  { src: "/assets/farhang.svg" },
  { src: "/assets/miras.svg" },
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

  return (
    <div className="flex items-center gap-3">
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
            <Diamond key={i} src={p.src} />
          ))}
        </div>

        {/* Animated track with dynamically duplicated partners */}
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-8 lg:gap-16"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {infinitePartners.map((p, i) => (
            <Diamond key={i} src={p.src} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Diamond and NavDiamond components remain exactly as you had them
function Diamond({ src }: { src: string; featured?: boolean }) {

  return (
    <div className="group relative flex h-36 w-36 flex-shrink-0 cursor-pointer items-center justify-center transition-transform duration-300 ease-out hover:scale-110 sm:h-44 sm:w-44 lg:h-[200px] lg:w-[200px]">
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