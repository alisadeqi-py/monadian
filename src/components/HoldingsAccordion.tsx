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
      <div className="py-8 text-center">
        <p className="text-sm text-gray-400 sm:text-base">
          در حال حاضر اطلاعاتی برای نمایش وجود ندارد.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {holdings.map((h, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={h.id}
            className={`rounded-xl border transition-all duration-300 ${isOpen
                ? "border-white/20 bg-white/5 shadow-lg shadow-black/20"
                : "border-white/10 bg-transparent hover:border-white/15"
              }`}
          >
            <div className="p-4 sm:p-6">
              {/* Header - Mobile First */}
              <div dir="ltr" className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-label={isOpen ? "بستن توضیحات" : "بیشتر بدانید"}
                  aria-expanded={isOpen}
                  className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 active:scale-95 sm:h-12 sm:w-12 ${isOpen
                      ? "border-2 border-white/40 bg-white/10 text-white shadow-lg shadow-white/10"
                      : "border border-white/15 bg-transparent text-white/60 hover:border-white/30 hover:text-white hover:shadow-lg hover:shadow-white/5"
                    }`}
                >
                  <span
                    className={`transition-transform duration-300 ease-out ${isOpen ? "rotate-45" : "rotate-0"
                      }`}
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
                    className="group flex flex-1 items-center justify-between gap-3 transition-all hover:opacity-80 sm:gap-4"
                  >
                    <span className="text-sm font-medium leading-tight text-white transition-colors group-hover:text-white/80 sm:text-base lg:text-lg">
                      {h.name}
                    </span>
                    {h.logo && (
                      <div className="relative flex-shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={h.logo}
                          alt={h.name}
                          width={185}
                          height={62}
                          unoptimized
                          className="h-10 w-[90px] rounded-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-[135px] lg:h-16 lg:w-[185px]"
                        />
                      </div>
                    )}
                  </a>
                ) : (
                  <>
                    <span
                      dir="rtl"
                      className="flex-1 text-sm font-medium leading-tight text-white sm:text-base lg:text-lg"
                    >
                      {h.name}
                    </span>
                    {h.logo && (
                      <div className="relative flex-shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={h.logo}
                          alt={h.name}
                          width={185}
                          height={62}
                          unoptimized
                          className="h-10 w-[90px] rounded-full object-cover sm:h-14 sm:w-[135px] lg:h-16 lg:w-[185px]"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Description with smooth animation */}
              <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden">
                  <div className="mt-3 border-t border-white/10 pt-3 sm:mt-4 sm:pt-4">
                    <p className="text-xs leading-relaxed text-gray-300 sm:text-sm lg:text-base">
                      {h.description}
                    </p>
                  </div>
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
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="sm:h-5 sm:w-5"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}