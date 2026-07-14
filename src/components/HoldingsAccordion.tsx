"use client";

import { useState } from "react";
import Image from "next/image";
import type { HoldingCompany } from "@/lib/api";

export default function HoldingsAccordion({
  holdings,
}: {
  holdings: HoldingCompany[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(-1);

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
          <div key={h.id} className="py-6">
            <div dir="ltr" className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-label={isOpen ? "بستن توضیحات" : "بیشتر بدانید"}
                aria-expanded={isOpen}
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border text-white/70 transition-all duration-300 hover:border-white/40 hover:text-white sm:h-12 sm:w-12 ${
                  isOpen ? "border-white/40 bg-white/10 text-white" : "border-white/15"
                }`}
              >
                <span
                  className={`transition-transform duration-300 ease-out ${isOpen ? "rotate-45" : "rotate-0"}`}
                >
                  <PlusIcon />
                </span>
              </button>
              {h.url ? (
                <a
                  href={h.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="rtl"
                  className="flex flex-1 items-center justify-between gap-4 text-right transition hover:opacity-80"
                >
                  <span className="text-base font-medium text-white sm:text-xl">{h.name}</span>
                  {h.logo && (
                    <Image
                      src={h.logo}
                      alt={h.name}
                      width={185}
                      height={62}
                      unoptimized
                      className="h-12 w-[135px] flex-shrink-0 rounded-full object-cover sm:h-16 sm:w-[185px]"
                    />
                  )}
                </a>
              ) : (
                <>
                  <span
                    dir="rtl"
                    className="flex-1 text-right text-base font-medium text-white sm:text-xl"
                  >
                    {h.name}
                  </span>
                  {h.logo && (
                    <Image
                      src={h.logo}
                      alt={h.name}
                      width={185}
                      height={62}
                      unoptimized
                      className="h-12 hidden sm:flex w-[135px] flex-shrink-0 rounded-full object-cover sm:h-16 sm:w-[185px]"
                    />
                  )}
                </>
              )}
            </div>
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] mt-4 opacity-100" : "grid-rows-[0fr] mt-0 opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-white/10 pt-4 text-right">
                  <p className="text-sm text-gray-400 sm:text-base">
                    {h.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
