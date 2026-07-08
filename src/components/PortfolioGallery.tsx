"use client";

import { useState } from "react";
import Image from "next/image";
import type { PortfolioImage } from "@/lib/api";

export default function PortfolioGallery({
  images,
  title,
}: {
  images: PortfolioImage[];
  title: string;
}) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:gap-8">
        {images.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setLightbox(img.image)}
            aria-label="نمایش تصویر در اندازه کامل"
            className="group cursor-zoom-in overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Image
                src={img.image}
                alt={title}
                width={400}
                height={300}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-2 w-full bg-[#CEE0FA] transition-colors duration-300 group-hover:bg-brand-yellow" />
          </button>
        ))}
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
          <Image
            src={lightbox}
            alt={title}
            width={1200}
            height={1200}
            unoptimized
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </>
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
