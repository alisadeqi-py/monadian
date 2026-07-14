"use client";

import { useState } from "react";
import Image from "next/image";
import type { PortfolioImage } from "@/lib/api";

const PAGE_SIZE = 6;

const THEMES = [
  { name: "yellow", border: "hover:border-brand-yellow", dot: "bg-brand-yellow" },
  { name: "red", border: "hover:border-red-400", dot: "bg-red-400" },
  { name: "green", border: "hover:border-emerald-400", dot: "bg-emerald-400" },
];

// Deterministic (not Math.random()) so the server-rendered and client-hydrated
// output match — the id-based pick still reads as an arbitrary per-image color.
function themeFor(id: number) {
  return THEMES[id % THEMES.length];
}

export default function PortfolioGallery({
  images,
  title,
  heading,
}: {
  images: PortfolioImage[];
  title: string;
  heading?: React.ReactNode;
}) {
  const [page, setPage] = useState(0);
  const [lightbox, setLightbox] = useState<PortfolioImage | null>(null);

  if (images.length === 0) return null;

  const pageCount = Math.ceil(images.length / PAGE_SIZE);
  const pages = Array.from({ length: pageCount }, (_, i) =>
    images.slice(i * PAGE_SIZE, i * PAGE_SIZE + PAGE_SIZE)
  );
  const atStart = page <= 0;
  const atEnd = page >= pageCount - 1;

  const goTo = (next: number) => setPage(Math.min(Math.max(next, 0), pageCount - 1));

  return (
    <>
      <div className="w-full max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          {heading}
          {pageCount > 1 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="تصاویر بعدی"
                onClick={() => goTo(page + 1)}
                disabled={atEnd}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:brightness-100"
              >
                <ArrowIcon direction="right" />
              </button>
              <button
                type="button"
                aria-label="تصاویر قبلی"
                onClick={() => goTo(page - 1)}
                disabled={atStart}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1B2028] shadow ring-1 ring-black/5 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
              >
                <ArrowIcon direction="left" />
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${-page * 100}%)` }}
          >
            {pages.map((group, pageIndex) => (
              <div
                key={pageIndex}
                className="w-full flex-shrink-0 columns-2 gap-4 sm:columns-3 sm:gap-6 lg:columns-4"
              >
                {group.map((img) => {
                  const theme = themeFor(img.id);
                  return (
                    <button
                      key={img.id}
                      type="button"
                      data-theme={theme.name}
                      onClick={() => setLightbox(img)}
                      aria-label="نمایش تصویر در اندازه کامل"
                      className={`relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border-2 border-transparent transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:mb-6 ${theme.border}`}
                    >
                      <Image
                        src={img.image}
                        alt={img.caption || title}
                        width={600}
                        height={400}
                        unoptimized
                        className="h-auto w-full"
                      />
                      {img.caption && (
                        <span className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-white/90 px-3 py-2 text-right text-xs text-gray-700 backdrop-blur-sm sm:text-sm">
                          <ChevronIcon />
                          {img.caption}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {pageCount > 1 && (
          <div className="mt-5 flex items-center justify-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`صفحه ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === page ? "w-6 bg-brand-blue" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="بستن"
            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
          >
            <CloseIcon />
          </button>
          <div
            className="flex max-h-full max-w-4xl flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.image}
              alt={lightbox.caption || title}
              width={1200}
              height={1200}
              unoptimized
              className="max-h-[75vh] max-w-full rounded-lg object-contain"
            />
            {lightbox.caption && (
              <p className="text-center text-sm text-white/80 sm:text-base">{lightbox.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-brand-yellow">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
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
