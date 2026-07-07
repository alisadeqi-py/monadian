import Image from "next/image";

const ARTICLES = [
  { category: "دیجیتال مارکتینگ", title: "کاربردهای فعالیت..." },
  { category: "فیلم برداری", title: "روش نگهداری ..." },
  { category: "رسانه و خبر", title: "چطور محتوای وایرال بسازیم" },
];

export default function Articles() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-brand-dark py-16">
      <div
        className="pointer-events-none absolute -top-10 right-1/3 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(88,64,220,0.55) 0%, rgba(20,20,30,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute left-0 top-1/2 hidden w-[280px] -translate-y-1/2 opacity-40 md:block">
        <Image
          src="/assets/grid-pattern.png"
          alt=""
          width={391}
          height={582}
          aria-hidden="true"
          className="h-auto w-full"
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <h2 className="mb-8 text-right text-lg font-bold text-white sm:text-xl">
          نمونه کار ها و فعالیت ها<span className="font-medium text-slate-400">؛ پژوهش های آموزشی و اطلاعات کاربردی</span>
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ARTICLES.map((a) => (
            <div
              key={a.category}
              className="flex h-[260px] flex-col justify-end rounded-2xl bg-brand-card p-5 ring-1 ring-white/5 sm:h-[300px] md:h-[340px]"
            >
              <span className="text-xs text-gray-400">{a.category}</span>
              <span className="mt-1 text-base font-bold text-white sm:text-lg">
                {a.title}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-start gap-3">
          <button
            aria-label="مقاله بعدی"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white transition hover:brightness-110"
          >
            <ArrowIcon direction="right" />
          </button>
          <button
            aria-label="مقاله قبلی"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <ArrowIcon direction="left" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: direction === "left" ? "rotate(180deg)" : undefined }}
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
