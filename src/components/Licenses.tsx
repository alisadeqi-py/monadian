import Image from "next/image";
import PartnersCarousel from "./PartnersCarousel";

const CARDS = [
  {
    title: "",

    
    ministry: " مجوز موسسه فرهنگی هنری از وزارت فرهنگ و ارشاد اسلامی",
    icon: "/assets/license-badge-1.png",
  },
  {
    title: "",
    ministry: "  تاییدیه شرکت خلاق از معاونت علمی و دانش بنیان ریاست جمهوری",
    icon: "/assets/license-gov-seal.png",
  },
  {
    title: "",
    ministry: "مجوز پایگاه خبری از وزارت فرهنگ و ارشاد اسلامی",
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-16">
          {CARDS.map((c, i) => (
            <div key={i} className="group flex w-full flex-col items-center gap-4 text-center">
              <Image
                src={c.icon}
                alt=""
                width={112}
                height={112}
                className="mx-auto h-[90px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-[108px]"
              />
              <p className="text-base font-bold text-[#12203f] sm:text-lg">{c.title}</p>
              <div className="relative isolate flex w-full items-center gap-2 rounded-full px-7 py-3.5">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[url('/assets/license-pill-normal.png')] bg-[length:100%_100%] bg-no-repeat opacity-100 transition-opacity duration-300 group-hover:opacity-0"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[url('/assets/license-pill-hover.png')] bg-[length:100%_100%] bg-no-repeat opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="flex items-center gap-2 text-sm font-semibold text-[#12203f]/60 transition-colors duration-300 group-hover:text-[#12203f] sm:text-base md:whitespace-nowrap">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-[#12203f]/10">
                    <Image
                      src="/assets/logo-mark.png"
                      alt=""
                      width={1986}
                      height={1775}
                      className="h-full w-full scale-125 object-cover"
                    />
                  </span>
                  {c.ministry}
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
            <span className="flex items-center justify-start gap-2">
              <CornerIcon />
              برندهایی که افتخار همکاری داشتیم
            </span>
            <span className="mt-1 block font-medium text-gray-400 sm:mt-0 sm:inline"> ؛ گنجینه ای از تجربه های موفق</span>
          </h3>

          <PartnersCarousel />
        </div>
      </div>
    </section>
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
