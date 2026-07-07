"use client";

import { useState } from "react";
import Image from "next/image";

const HOLDINGS = [
  {
    name: "پایگاه خبری افق تحلیل",
    pill: "/assets/pill-afogh.png",
    description: "توضیح کافی در مورد وضعیت و معرفی مختصر",
  },
  {
    name: "پایگاه خبری خط ورزش",
    pill: "/assets/pill-khat.png",
    description: "توضیح کافی در مورد وضعیت و معرفی مختصر",
  },
  {
    name: "شرکت پویا گستران تجارت البرز",
    pill: "/assets/pill-alborz.png",
    description: "توضیح کافی در مورد وضعیت و معرفی مختصر",
  },
  {
    name: "موسسه نیکان هنر ایرانیان باستان",
    pill: "/assets/pill-bastan.png",
    description: "توضیح کافی در مورد وضعیت و معرفی مختصر",
  },
  {
    name: "موسسه منادیان فتح ایرانیان",
    pill: "/assets/pill-monadian.png",
    description: "توضیح کافی در مورد وضعیت و معرفی مختصر",
  },
];

export default function Holdings() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="flex min-h-screen w-full items-center bg-brand-dark py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h3 className="mb-6 flex items-center justify-start gap-2 text-lg font-bold text-white sm:text-xl">
          <CornerIcon />
          دیگر شرکت‌های هلدینگ ما
        </h3>

        <div className="flex flex-col divide-y divide-white/10 border-t border-white/10">
          {HOLDINGS.map((h, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={h.name} className="py-5">
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
                  <Image
                    src={h.pill}
                    alt={h.name}
                    width={150}
                    height={50}
                    className="h-10 w-[110px] flex-shrink-0 rounded-full object-cover sm:h-12 sm:w-[150px]"
                  />
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
      </div>
    </section>
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

function CornerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
      <path
        d="M19 5v6a4 4 0 0 1-4 4H6M6 15l4-4M6 15l4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
