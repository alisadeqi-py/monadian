import Image from "next/image";

const CARDS = [
  { label: "تاییدیه شرکت خلاق از معاونت علمی و دانش بنیان ریاست جمهوری" },
  { label: "مجوز موسسه فرهنگی هنری از وزارت فرهنگ و ارشاد اسلامی" },
  { label: "مجوز پایگاه خبری از وزارت فرهنگ و ارشاد اسلامی" },
];

const PARTNERS = [
  { src: "/assets/logo-flower.png" },
  { src: "/assets/logo-roads.png" },
  { src: "/assets/logo-culture.png", featured: true },
  { src: "/assets/logo-ministry.png" },
  { src: "/assets/logo-family.png" },
];

export default function Licenses() {
  return (
    <section className="flex h-screen w-full items-center bg-white py-10">
      <div className="mx-auto w-full max-w-[1720px] px-6 sm:px-10 lg:px-16">
        <h2 className="mb-8 text-right text-lg font-bold text-[#12203f] sm:text-xl">
          مجوزها<span className="font-medium text-gray-400"> دسترسی های فعال و لایسنس ها</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-10">
          {CARDS.map((c, i) => (
            <div
              key={i}
              className="group relative flex items-center gap-5 overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(20,30,60,0.08)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-yellow-200 sm:p-8"
            >
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-[#CEE0FA] transition-colors duration-300 group-hover:bg-brand-yellow sm:h-20 sm:w-20">
                <LicenseIcon />
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#12203f] sm:text-xl">
                  {c.label}
                </p>
                <p className="mt-1 text-sm font-bold tracking-wide text-gray-400 sm:text-base">
                  دستاوردهای مان
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          <Image
            src="/assets/chevron.png"
            alt=""
            width={135}
            height={139}
            aria-hidden="true"
            className="pointer-events-none absolute -top-6 right-0 hidden w-10 opacity-70 sm:block lg:w-14"
          />
          <Image
            src="/assets/chevron.png"
            alt=""
            width={135}
            height={139}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-4 hidden w-5 -scale-x-100 opacity-40 md:block lg:w-6"
          />
          <Image
            src="/assets/chevron.png"
            alt=""
            width={135}
            height={139}
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 right-1/4 hidden w-16 opacity-30 lg:block xl:w-20"
          />

          <h3 className="relative mb-6 mt-14 flex items-center justify-start gap-2 text-base font-bold text-[#12203f] sm:text-lg">
            <CornerIcon />
            برندهایی که افتخار همکاری داشتیم
            <span className="font-medium text-gray-400">؛ گنجینه ای از تجربه های موفق</span>
          </h3>

          <div className="relative flex items-center justify-center gap-3 sm:gap-6 lg:gap-8">
            <NavDiamond direction="right" />
            {PARTNERS.map((p, i) => (
              <Diamond key={i} src={p.src} featured={p.featured} />
            ))}
            <NavDiamond direction="left" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Diamond({ src, featured }: { src: string; featured?: boolean }) {
  return (
    <div
      className={`group flex flex-shrink-0 rotate-45 cursor-pointer items-center justify-center rounded-xl bg-white shadow-md ring-1 ring-black/5 transition-all duration-300 ease-out hover:scale-110 hover:bg-brand-yellow hover:shadow-lg hover:shadow-yellow-200 hover:ring-0 ${
        featured
          ? "h-24 w-24 sm:h-32 sm:w-32 lg:h-[145px] lg:w-[145px]"
          : "h-16 w-16 sm:h-24 sm:w-24 lg:h-28 lg:w-28"
      }`}
    >
      <div
        className={`-rotate-45 p-1 ${
          featured ? "h-16 w-16 sm:h-20 sm:w-20 lg:h-[100px] lg:w-[100px]" : "h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14"
        }`}
      >
        <Image
          src={src}
          alt=""
          width={160}
          height={160}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

function NavDiamond({ direction }: { direction: "left" | "right" }) {
  return (
    <button
      type="button"
      aria-label={direction === "right" ? "قبلی" : "بعدی"}
      className="flex h-10 w-10 flex-shrink-0 rotate-45 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition hover:bg-gray-200 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
    >
      <span className="-rotate-45">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: direction === "left" ? "rotate(180deg)" : undefined, transformOrigin: "center" }}
          />
        </svg>
      </span>
    </button>
  );
}

function LicenseIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#12203f]">
      <path
        d="M12 3l2.4 1.9 3-.4.9 2.9 2.7 1.4-.9 2.9.9 2.9-2.7 1.4-.9 2.9-3-.4L12 21l-2.4-1.9-3 .4-.9-2.9-2.7-1.4.9-2.9-.9-2.9 2.7-1.4.9-2.9 3 .4L12 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.3l2 2 4-4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CornerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#12203f]">
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
