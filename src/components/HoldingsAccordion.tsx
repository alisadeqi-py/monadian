"use client";

import { useState } from "react";
import Image from "next/image";
import type { HoldingCompany } from "@/lib/api";

export default function HoldingsAccordion({
  holdings,
}: {
  holdings: HoldingCompany[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (holdings.length === 0) {
    return (
      <p className="py-5 text-sm text-gray-400">
        در حال حاضر اطلاعاتی برای نمایش وجود ندارد.
      </p>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-white/10 border-t border-white/10">
      {holdings.map((h, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={h.id} className="py-5">
            <div dir="ltr" className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-label={isOpen ? "بستن توضیحات" : "بیشتر بدانید"}
                aria-expanded={isOpen}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
              >
                {isOpen ? <CloseIcon /> : <PlusIcon />}
              </button>
              <span
                dir="rtl"
                className="flex-1 text-right text-sm font-medium text-white sm:text-base"
              >
                {h.name}
              </span>
              {h.logo && (
                <Image
                  src={h.logo}
                  alt={h.name}
                  width={150}
                  height={50}
                  unoptimized
                  className="h-10 w-[110px] flex-shrink-0 rounded-full object-cover sm:h-12 sm:w-[150px]"
                />
              )}
            </div>
            {isOpen && (
              <div className="mt-4 border-t border-white/10 pt-4 text-right">
                <p className="text-xs text-gray-400 sm:text-sm">
                  {h.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
