"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import Image from "next/image";

const PARTNERS = [
  { src: "/assets/khanevade.png", title: "بنیاد ملی خانواده" },
  { src: "/assets/rah.png", title: "وزارت راه و شهرسازی" },
  { src: "/assets/tehran.png", title: "شهرداری تهران" },
  { src: "/assets/license-badge-2.png", title: "وزارت فرهنگ و ارشاد اسلامی" },
  { src: "/assets/miras.png", title: "وزارت میراث و گردشگری" },
  { src: "/assets/سازمان-ملی-زمین-و_مسکن.png", title: "سازمان ملی زمین و مسکن" },
  { src: "/assets/majles.png", title: "مجلس شورای اسلامی" },
  { src: "/assets/barekat.png", title: "بنیاد برکت" },
  { src: "/assets/eslamshahr.png", title: "شهرداری اسلامشهر" },
  { src: "/assets/rasa.png", title: "شرکت پیام رسا" },
  { src: "/assets/alavi.png", title: "بنیاد علوی" },
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
      <div className="relative flex h-[70px] w-[70px] items-center justify-center p-2 transition-all duration-300 sm:h-[90px] sm:w-[90px] sm:p-3 lg:h-[110px] lg:w-[110px] lg:p-4">
        <Image
          src={src}
          alt={title || ""}
          width={120}
          height={120}
          loading="eager"
          className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {title && (
        <p className="mt-2 text-center text-[10px] font-bold shadow-lg bg-white p-2 rounded-md text-black transition-colors duration-300 group-hover:text-[#12203f] sm:text-xs lg:text-sm">
          {title}
        </p>
      )}
    </div>
  );
}