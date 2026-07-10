import Image from "next/image";
import { getPortfolioItems } from "@/lib/api";
import ArticlesCarousel from "./ArticlesCarousel";

export default async function Articles() {
  const articles = await getPortfolioItems();

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-brand-dark py-8">
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
        <h2 className="mb-6 text-right text-xl font-bold text-white sm:text-2xl">
          نمونه کار ها و فعالیت ها<span className="font-medium text-slate-400">؛ پژوهش های آموزشی و اطلاعات کاربردی</span>
        </h2>

        {articles.length === 0 ? (
          <p className="text-sm text-gray-400">
            در حال حاضر نمونه کاری برای نمایش وجود ندارد.
          </p>
        ) : (
          <ArticlesCarousel articles={articles} />
        )}
      </div>
    </section>
  );
}
