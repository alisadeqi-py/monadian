import Image from "next/image";
import PartnersCarousel from "./PartnersCarousel";

const CARDS = [
  {
    title: "مجوز موسسه فرهنگی هنری",
    ministry: "از وزارت فرهنگ و ارشاد اسلامی",
    icon: "/assets/license-badge-1.png",
  },
  {
    title: "تاییدیه شرکت خلاق",
    ministry: "از معاونت علمی و دانش بنیان ریاست جمهوری",
    icon: "/assets/license-gov-seal.png",
  },
  {
    title: "مجوز پایگاه خبری",
    ministry: "از وزارت فرهنگ و ارشاد اسلامی",
    icon: "/assets/license-badge-2.png",
  },
];

export default function Licenses() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-white py-8 sm:py-12">
      {/* Background Image */}
      <Image
        src="/assets/licenses-bg.png"
        alt=""
        fill
        aria-hidden="true"
        className="pointer-events-none object-cover opacity-70"
      />

      <div className="relative mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-16">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-right text-xl font-bold text-[#12203f] sm:text-2xl lg:text-3xl">
            مجوزها
            <span className="mr-2 font-medium text-gray-400"></span>
          </h2>
        </div>

        {/* Licenses Grid - Mobile First */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          {CARDS.map((c, i) => (
            <div key={i} className="flex w-full flex-col gap-4 text-center sm:items-start items-center">
              <div className="w-44 flex sm:mb-4 mb-6">
                <Image
                  src={c.icon}
                  alt=""
                  width={160}
                  height={160}
                  className="w-max h-max ml-auto"
                />
              </div>
              <div className="flex">
                <p className="font-bold text-[#12203f] sm:text-lg">{c.title}</p>
              </div>
              <div className="relative group isolate flex w-full gap-2 rounded-full px-5 py-2">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[url('/assets/license-pill-normal.png')] bg-[length:100%_100%] bg-no-repeat opacity-100 transition-opacity duration-300 group-hover:opacity-0"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[url('/assets/license-pill-hover.png')] bg-[length:100%_100%] bg-no-repeat opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <span className="flex w-full justify-center sm:justify-between gap-2 text-sm font-semibold text-[#12203f] sm:text-base sm:text-[#12203f]/60 sm:transition-colors sm:duration-300 sm:group-hover:text-[#12203f] md:whitespace-nowrap">
                  <span className="flex">
                    <CornerIcon width={16} height={16} />
                    {c.ministry}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Partners Section */}
        <div className="relative mt-12 sm:mt-16 lg:mt-20">
          {/* Partners Header */}
          <div className="sm:mb-8">
            <h3 className="flex flex-col items-start gap-2 text-right text-base font-bold text-[#12203f] sm:flex-row sm:items-center sm:text-lg lg:text-xl">
              <span className="flex items-center gap-2">
                <CornerIcon width={16} height={16} />
                <span className="flex items-center gap-2">
                  برندهایی که افتخار همکاری داشتیم
                </span>
              </span>
              <span className="text-sm font-medium text-gray-400 sm:text-base">
                گنجینه‌ای از تجربه‌های موفق
              </span>
            </h3>
          </div>

          <PartnersCarousel />
        </div>
      </div>
    </section>
  );
}

function CornerIcon({ width = 16, height = 16 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 text-[#12203f]"
    >
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