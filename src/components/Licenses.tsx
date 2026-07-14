import Image from "next/image";
import PartnersCarousel from "./PartnersCarousel";

const CARDS = [
  {
    title: " مجوز موسسه فرهنگی هنری",
    ministry: " از وزارت فرهنگ و ارشاد اسلامی",
    icon: "/assets/license-badge-1.png",
  },
  {
    title: "تاییدیه شرکت خلاق",
    ministry: "  از معاونت علمی و دانش بنیان ریاست جمهوری",
    icon: "/assets/license-gov-seal.png",
  },
  {
    title: "مجوز پایگاه خبری ",
    ministry: " از وزارت فرهنگ و ارشاد اسلامی",
    icon: "/assets/license-badge-2.png",
  },
];

export default function Licenses() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-white py-4">
      <Image
        src="/assets/licenses-bg.png"
        alt=""
        fill
        aria-hidden="true"
        className="pointer-events-none object-cover opacity-70"
      />

      <div className="relative mx-auto w-full max-w-[1720px] px-6 sm:px-10 lg:px-16">
        <h2 className="mb-5 text-right text-xl font-bold text-[#12203f] sm:text-2xl">
          مجوزها<span className="font-medium text-gray-400"></span>
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 sm:grid-cols-2 lg:gap-16">
          {CARDS.map((c, i) => (
            <div key={i} className="flex w-full flex-col gap-4 text-center sm:items-start items-center">
              <div className="w-40 h-20 flex sm:mb-4 mb-6">
                <Image
                  src={c.icon}
                  alt=""
                  width={112}
                  height={112}
                  className="w-max h-max ml-auto"
                />
              </div>
              <div className="flex">
                <p className="font-bold text-[#12203f] sm:text-lg">{c.title}</p>
              </div>
              <div className="relative group isolate flex w-full gap-2 rounded-full px-7 py-3.5">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[url('/assets/license-pill-normal.png')] bg-[length:100%_100%] bg-no-repeat opacity-100 transition-opacity duration-300 group-hover:opacity-0"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[url('/assets/license-pill-hover.png')] bg-[length:100%_100%] bg-no-repeat opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <span className="flex w-full justify-between gap-2 text-sm font-semibold text-[#12203f]/60 transition-colors duration-300 group-hover:text-[#12203f] sm:text-base md:whitespace-nowrap">
                  <span className="flex">
                    <CornerIcon width={20} height={20} />
                    {c.ministry}
                  </span>
                  <span className="w-5 h-5 hidden md:flex">
                    <Image
                      src="/assets/logo-mark.png"
                      alt=""
                      width={5}
                      height={5}
                      className="h-auto w-auto flex object-cover flex-1"
                    />
                  </span>
                </span>
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

          <h3 className="relative mb-7 mt-20 text-right text-lg font-bold text-[#12203f] sm:text-xl">
            <span className="flex items-center gap-2">
              <CornerIcon width={24} height={24} />
              برندهایی که افتخار همکاری داشتیم ؛
              <span className="block font-medium text-gray-400 sm:mt-0 sm:inline">  گنجینه ای از تجربه های موفق </span>
            </span>
          </h3>

          <PartnersCarousel />
        </div>
      </div>
    </section>
  );
}

function CornerIcon({ width = 16, height = 16 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#12203f]">
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
