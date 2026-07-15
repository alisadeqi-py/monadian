"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import Image from "next/image";

const PARTNERS = [
  { src: "/assets/khanevade.svg", title: "بنیاد ملی خانواده" },
  { src: "/assets/rah.svg", title: "وزارت راه و شهرسازی" },
  { src: "/assets/tehran.svg", title: "شهرداری تهران" },
  { src: "/assets/farhang.svg", title: "وزارت فرهنگ و ارشاد اسلامی" },
  { src: "/assets/miras.svg", title: "وزارت میراث و گردشگری" },
];

export default function PartnersCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const singleSetRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [infinitePartners, setInfinitePartners] = useState(() => {
    return [...PARTNERS, ...PARTNERS, ...PARTNERS];
  });
  const [singleSetWidth, setSingleSetWidth] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!singleSetRef.current) return;
      const setWidth = singleSetRef.current.scrollWidth;
      if (setWidth === 0) return;
      const viewportWidth = window.innerWidth;
      const copiesNeeded = Math.ceil((viewportWidth * 2) / setWidth) + 2;
      const copies = Math.max(copiesNeeded, 4);
      setSingleSetWidth(setWidth);
      setInfinitePartners(Array(copies).fill(PARTNERS).flat());
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || singleSetWidth === 0) return;

    let animationId: number;
    let position = 0;
    const speed = 0.3;

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
    <div className="flex items-center gap-2 sm:gap-3">
      <div
        className="relative flex-1 overflow-hidden px-1 py-2 sm:py-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Hidden measurement row */}
        <div
          ref={singleSetRef}
          className="invisible absolute flex items-center gap-4 sm:gap-6 lg:gap-10"
          aria-hidden="true"
        >
          {PARTNERS.map((p, i) => (
            <Diamond key={i} src={p.src} title={p.title} />
          ))}
        </div>

        {/* Animated track */}
        <div
          ref={trackRef}
          className="flex items-center gap-4 sm:gap-6 lg:gap-10"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {infinitePartners.map((p, i) => (
            <Diamond key={i} src={p.src} title={p.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Diamond({ src, title }: { src: string; title?: string }) {
  return (
    <div className="group relative flex flex-col flex-shrink-0 cursor-pointer items-center justify-center transition-all duration-300 ease-out hover:scale-105">
      {/* Logo Container */}
      <div className="relative flex h-[80px] w-[80px] items-center justify-center p-3 transition-all duration-300 group-hover:bg-white group-hover:shadow-lg sm:h-[100px] sm:w-[100px] sm:p-4 lg:h-[120px] lg:w-[120px]">
        <Image
          src={src}
          alt=""
          width={120}
          height={120}
          loading="eager"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Title - Hidden on mobile, shown on hover */}
      {title && (
        <div className="absolute -bottom-8 left-1/2 w-max -translate-x-1/2 rounded-lg bg-white/95 px-3 py-1 text-center text-xs font-medium text-[#12203f] opacity-0 shadow-lg transition-all duration-300 group-hover:bottom-0 group-hover:opacity-100 sm:-bottom-10 sm:group-hover:bottom-1 lg:text-sm">
          {title}
        </div>
      )}
    </div>
  );
}