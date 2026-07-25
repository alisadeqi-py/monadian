"use client";

import Image from "next/image";

const SLIDE_COUNT = 6;

export default function DecorativeSidebar({
  activeIndex,
  onNavigate,
}: {
  activeIndex: number;
  onNavigate: (index: number) => void;
}) {
  return (
    <div className="fixed inset-y-0 left-3 z-30 hidden flex-col items-center justify-center gap-4 sm:left-6 sm:flex md:left-10">
      {/* <button
        type="button"
        onClick={() => onNavigate(0)}
        aria-label="بازگشت به ابتدای صفحه"
        className="mb-2"
      >
        <Image
          src="/assets/logo-mark.png"
          alt=""
          width={1986}
          height={1775}
          className="h-8 w-8 object-contain sm:h-9 sm:w-9"
        />
      </button> */}

      <div className="flex flex-col gap-4">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => {
          const active = activeIndex === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onNavigate(i)}
              aria-label={`رفتن به اسلاید ${i + 1}`}
              className="flex h-6 w-6 items-center justify-center"
            >
              <Image
                src="/assets/logo-mark.png"
                alt=""
                width={1986}
                height={1775}
                className="h-full w-full object-contain transition-opacity duration-300"
                style={{ opacity: active ? 1 : 0.3 }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
