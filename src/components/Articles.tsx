import Image from "next/image";
import Link from "next/link";
import { getPortfolioItems } from "@/lib/api";

export default async function Articles() {
  const articles = await getPortfolioItems();

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

        {articles.length === 0 ? (
          <p className="text-sm text-gray-400">
            در حال حاضر نمونه کاری برای نمایش وجود ندارد.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {articles.map((a) => (
              <Link
                key={a.id}
                href={`/portfolio/${a.id}`}
                className="relative flex h-[260px] flex-col justify-end overflow-hidden rounded-2xl bg-brand-card ring-1 ring-white/5 transition hover:ring-white/20 sm:h-[300px] md:h-[340px]"
              >
                {a.image && (
                  <div
                    className="absolute inset-0"
                    style={{ backgroundImage: `url(${a.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    aria-hidden="true"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" aria-hidden="true" />
                <div className="relative z-10 p-5">
                  <span className="text-xs text-gray-300">{a.category}</span>
                  <span className="mt-1 block text-base font-bold text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.6)] sm:text-lg">
                    {a.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

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
