import Image from "next/image";

export default function CareersHero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <Image
        src="/assets/mountain.png"
        alt=""
        fill
        priority
        aria-hidden="true"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#a7cbf7]/80 via-[#b9d5f8]/75 to-[#c7ddfa]/70"
        aria-hidden="true"
      />

      <div className="relative z-10 flex max-w-2xl flex-col items-center gap-5 sm:gap-6">
        <Image
          src="/assets/logo-mark.png"
          alt="موسسه منادیان فتح ایرانیان"
          width={1986}
          height={1775}
          priority
          className="h-auto w-14 drop-shadow-md sm:w-16 md:w-[72px]"
        />

        <span className="rounded-full bg-white/50 px-4 py-1.5 text-xs font-bold text-[#12203f] ring-1 ring-[#12203f]/10 backdrop-blur-sm sm:text-sm">
          فرصت‌های همکاری
        </span>

        <h1 className="text-2xl font-extrabold leading-snug text-[#12203f] sm:text-4xl lg:text-5xl">
          به تیم منادیان فتح ایرانیان بپیوندید
        </h1>

        <p className="max-w-xl text-sm leading-relaxed text-[#12203f]/70 sm:text-base lg:text-lg">
          ما همیشه به دنبال افراد بااستعداد، متعهد و علاقه‌مند به یادگیری هستیم. اگر
          دوست دارید در فضایی حرفه‌ای و پویا رشد کنید، فرم همکاری را تکمیل کنید تا
          کارشناسان ما در اسرع وقت با شما تماس بگیرند.
        </p>

        <a
          href="#careers-form"
          className="group mt-4 flex flex-col items-center gap-2 text-[#12203f]/70 transition hover:text-[#12203f]"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#12203f]/25 transition group-hover:border-[#12203f]/50 group-hover:bg-white/30 sm:h-14 sm:w-14">
            <ScrollDownIcon />
          </span>
          <span className="text-xs font-medium sm:text-sm">تکمیل فرم همکاری</span>
        </a>
      </div>
    </section>
  );
}

function ScrollDownIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M12 8v6.5M9 12l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
