"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import type { PortfolioItem } from "@/lib/api";

export default function ArticlesCarousel({ articles }: { articles: PortfolioItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragState = useRef({ startX: 0, startScrollLeft: 0, moved: 0 });

  const updateEdges = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 1) {
      setAtStart(true);
      setAtEnd(true);
      return;
    }
    setAtStart(track.scrollLeft >= -2);
    setAtEnd(track.scrollLeft <= -maxScroll + 2);
  };

  useEffect(() => {
    updateEdges();
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => updateEdges();
    const onResize = () => updateEdges();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles.length]);

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.9 * dir;
    track.scrollBy({ left: -amount, behavior: "smooth" });
  };

  const onPointerDown = (e: MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    dragState.current = { startX: e.pageX, startScrollLeft: track.scrollLeft, moved: 0 };
  };

  const onPointerMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    const delta = e.pageX - dragState.current.startX;
    dragState.current.moved = Math.max(dragState.current.moved, Math.abs(delta));
    track.scrollLeft = dragState.current.startScrollLeft - delta;
  };

  const endDrag = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const onTrackClickCapture = (e: MouseEvent) => {
    if (dragState.current.moved > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div>
      <div className="relative">
        {!atStart && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-dark to-transparent"
          />
        )}
        {!atEnd && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-dark to-transparent"
          />
        )}

        <div
          ref={trackRef}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onClickCapture={onTrackClickCapture}
          className={`scrollbar-hide flex select-none gap-5 overflow-x-auto pb-2 ${
            isDragging ? "cursor-grabbing snap-none scroll-auto" : "cursor-grab snap-x snap-mandatory scroll-smooth"
          }`}
        >
          {articles.map((a) => (
            <Link
              key={a.id}
              href={`/portfolio/${a.id}`}
              className="relative flex h-[290px] w-[260px] flex-shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl bg-brand-card ring-1 ring-white/5 transition hover:ring-white/20 sm:h-[330px] sm:w-[300px] md:h-[380px] md:w-[350px] lg:w-[380px]"
            >
              {a.image && (
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: `url(${a.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                  aria-hidden="true"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" aria-hidden="true" />
              <div className="relative z-10 p-6">
                <span className="text-sm text-gray-300">{a.category}</span>
                <span className="mt-1 block text-lg font-bold text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.6)] sm:text-xl">
                  {a.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-start gap-3">
        <button
          type="button"
          aria-label="مقاله بعدی"
          onClick={() => scroll(1)}
          disabled={atEnd}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:brightness-100"
        >
          <ArrowIcon direction="right" />
        </button>
        <button
          type="button"
          aria-label="مقاله قبلی"
          onClick={() => scroll(-1)}
          disabled={atStart}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white/10"
        >
          <ArrowIcon direction="left" />
        </button>
      </div>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: direction === "left" ? "rotate(180deg)" : undefined }}
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
