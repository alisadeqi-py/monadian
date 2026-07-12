import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 md:block z-10">
        <Image
          src="/assets/pattern.svg"
          alt=""
          width={391}
          height={582}
          aria-hidden="true"
          className="h-auto w-full"
        />
      </div>
      <Image
        src="/assets/mountain.png"
        alt="فضای اداری موسسه منادیان فتح ایرانیان"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#a7cbf7]/80 via-[#b9d5f8]/75 to-[#c7ddfa]/70" />

      <span className="absolute bottom-4 right-6 z-10 text-xs font-medium text-[#12203f] sm:bottom-6 sm:right-8">
        پیش نمایش
      </span>

      <div className="relative z-10 flex min-h-screen flex-col items-center px-6 pt-10 sm:pt-14 md:pt-16">
        <Image
          src="/assets/logo-mark.png"
          alt="موسسه منادیان فتح ایرانیان"
          width={1986}
          height={1775}
          className="mb-8 h-auto w-14 drop-shadow-md sm:w-16 md:w-[72px]"
          priority
        />

        <h1 className="text-center text-xl font-extrabold text-[#12203f] sm:text-2xl md:text-3xl">
          موسسه منادیان فتح ایرانیان
        </h1>

        <div className="mt-auto mb-10 flex flex-col items-center gap-2 text-[#12203f] sm:mb-14">
          <svg
            width="20"
            height="28"
            viewBox="0 0 20 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="18"
              height="26"
              rx="9"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <circle cx="10" cy="8" r="2" fill="currentColor" />
          </svg>
          <span className="text-xs font-medium sm:text-sm">
            به پایین حرکت دهید
          </span>
        </div>
      </div>
    </section>
  );
}
