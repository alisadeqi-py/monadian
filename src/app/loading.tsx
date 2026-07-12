import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-brand-navy">
      <Image
        src="/assets/loading-logo.png"
        alt="موسسه منادیان فتح ایرانیان"
        width={2741}
        height={2884}
        priority
        className="h-28 w-auto animate-pulse invert sm:h-32"
      />

      <div className="flex items-center gap-3">
        <span className="text-sm text-white sm:text-base">درحال بارگزاری هستیم</span>
        <span
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 animate-spin rounded-full border-2 border-white/20 border-t-teal-400"
        />
        <span className="text-sm text-white/60 sm:text-base">سپاس از شکیبایی شما</span>
      </div>
    </div>
  );
}
