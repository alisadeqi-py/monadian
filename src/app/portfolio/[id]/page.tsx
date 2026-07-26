import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolioItem, getPortfolioItems, type PortfolioItem } from "@/lib/api";
import PortfolioGallery from "@/components/PortfolioGallery";
import PortfolioSlideShow from "@/components/PortfolioSlideShow";
import PortfolioSlide from "@/components/PortfolioSlide";
import Footer from "@/components/Footer";

export default async function PortfolioDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await getPortfolioItem(Number(params.id));
  if (!item) notFound();

  const allItems = await getPortfolioItems();
  const otherItems = allItems.filter((i) => i.id !== item.id).slice(0, 3);

  const slides = [<DescriptionSlide key="description" item={item} />];
  if (item.video) {
    slides.push(<VideoSlide key="video" item={item} />);
  } else if (item.aparat_src) {
    slides.push(<AparatSlide key="aparat" item={item} />);
  }
  if (item.images.length > 0) slides.push(<GallerySlide key="gallery" item={item} />);
  if (otherItems.length > 0) slides.push(<OtherProjectsSlide key="other-projects" items={otherItems} />);
  slides.push(<Footer key="footer" />);

  return (
    <PortfolioSlideShow>
      {slides.map((content, i) => (
        <PortfolioSlide index={i} key={i}>
          {content}
        </PortfolioSlide>
      ))}
    </PortfolioSlideShow>
  );
}

function DescriptionSlide({ item }: { item: PortfolioItem }) {
  const lines = item.description
    ? item.description.split(/\n+/).filter(Boolean)
    : [];

  return (
    <div
      dir="rtl"
      className="flex min-h-screen w-full flex-col justify-center overflow-x-clip px-4 py-12 sm:px-6 sm:py-16"
      style={{
        backgroundImage: "url(/assets/hero-background.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="mb-3 text-right text-base font-bold text-white sm:mb-4 sm:text-xl">
          توضیح کارنامه فنی
          <span className="font-medium text-white/60">: شناسنامه کارهای انجام شده</span>
        </h2>

        <div
          style={{
            backgroundImage: "url(/assets/portfolio-slide-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="relative overflow-visible rounded-lg bg-white/90 p-4 shadow-[0_40px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-10"
        >
          <Image
            src="/assets/portfolio-detail-grid.png"
            alt=""
            width={313}
            height={210}
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-4 z-0 hidden w-24 opacity-60 sm:right-6 sm:top-6 sm:block sm:w-40"
          />

          <h1 className="relative z-10 mb-3 text-right text-lg font-bold text-[#1B2028] sm:mb-4 sm:text-2xl">
            {item.title}
          </h1>

          <div className="relative z-10 mb-6 flex flex-col-reverse items-start gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <h2 className="flex items-center gap-2 text-sm font-bold text-[#1B2028] sm:text-lg">
              <ChecklistIcon />
              شناسنامه و چالش های پروژه
            </h2>
            {item.date && (
              <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs text-gray-600 ring-1 ring-black/5 sm:px-4 sm:py-2 sm:text-sm">
                <CalendarIcon />
                تاریخ انجام پروژه:
                <span className="font-bold text-[#1B2028]">{item.date}</span>
              </span>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-4 md:gap-6">
            {/* Mobile-first card */}
            <div className="relative mx-auto w-full max-w-[15rem] md:mx-0">
              <div className="relative z-10 flex w-full flex-shrink-0 flex-col overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black/10 md:translate-x-6 xl:translate-x-16 2xl:translate-x-40">
                <div
                  className="relative aspect-[3/5] w-full"
                  style={{
                    backgroundImage: "url(/assets/portfolio-card-texture.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {item.image && (
                    <div
                      className="absolute inset-0"
                      style={{ backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="px-3 py-2 text-right sm:px-4 sm:py-2.5">
                  <span className="block text-[10px] text-gray-500 sm:text-xs">{item.category}</span>
                  <span className="block text-sm font-bold text-[#1B2028] sm:text-base">
                    {item.client}
                  </span>
                </div>
              </div>
            </div>

            {/* Services */}
            {item.services.length > 0 && (
              <div className="relative z-10">
                <h3 className="mb-3 text-right text-sm font-bold text-[#1B2028] sm:mb-4 sm:text-lg">
                  لیست خدمات ارائه شده:
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {item.services.map((service) => (
                    <li
                      key={service.id}
                      className="flex items-center gap-2 text-right text-sm text-gray-600 sm:text-lg"
                    >
                      <BulletIcon />
                      {service.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            <div className="relative z-10 col-span-1 md:col-span-2">
              <h3 className="mb-3 text-right text-sm font-bold text-[#1B2028] sm:mb-4 sm:text-lg">
                شرح کلی پروژه
              </h3>
              {lines.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {lines.map((line, i) => (
                    <p
                      key={i}
                      className="border-b border-dotted border-gray-300 pb-2 text-right text-sm leading-relaxed text-gray-600 sm:pb-3 sm:text-lg"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="border-b border-dotted border-gray-300 pb-2 text-right text-sm text-gray-500">
                  توضیحاتی برای این نمونه کار ثبت نشده است.
                </p>
              )}
            </div>
          </div>

          <div className="relative z-10 mt-8 flex flex-col items-center gap-2 text-gray-500 sm:mt-10">
            <ScrollDownIcon />
            <span className="text-[10px] sm:text-xs">به پایین حرکت دهید</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollDownIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.3" />
      <path d="M12 8v6.5M9 12l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BulletIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" className="text-brand-yellow" />
      <path d="M8.5 12.2l2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-yellow" />
    </svg>
  );
}

function VideoSlide({ item }: { item: PortfolioItem }) {
  return (
    <section className="relative grid h-screen w-full place-items-center overflow-hidden bg-black">
      <span className="absolute right-4 top-20 z-10 rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm sm:right-6 sm:top-6 sm:px-3 sm:py-1 sm:text-xs">
        پیش نمایش
      </span>

      {/* Grid container for perfect centering */}
      <div className="grid h-full w-full place-items-center">
        <video
          key={item.video}
          src={item.video ?? undefined}
          autoPlay
          muted
          loop
          controls
          playsInline
          preload="auto"
          suppressHydrationWarning
          className={`
            // Grid centering
            col-start-1 row-start-1
            // Responsive sizing
            w-full h-full
            // Mobile: Contain with black bars
            object-contain
            // Desktop: Cover with centering
            md:object-cover
            transition-all duration-300
          `}
        />
      </div>

      {/* Mobile overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent pointer-events-none sm:hidden" />
    </section>
  );
}

function AparatSlide({ item }: { item: PortfolioItem }) {
  return (
    <section className="relative grid h-screen w-full place-items-center overflow-hidden bg-black">
      <span className="absolute right-4 top-20 z-10 rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm sm:right-6 sm:top-6 sm:px-3 sm:py-1 sm:text-xs">
        پیش نمایش
      </span>

      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
          <iframe
            src={item.aparat_src}
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent pointer-events-none sm:hidden" />
    </section>
  );
}

function GallerySlide({ item }: { item: PortfolioItem }) {
  return (
    <div
      dir="rtl"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden overflow-y-auto px-4 py-12 sm:px-6 sm:py-16"
      style={{
        backgroundImage: "url(/assets/banner.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Image
        src="/assets/gallery-pattern.png"
        alt=""
        width={425}
        height={286}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[68%] hidden w-[280px] -translate-y-1/2 opacity-40 md:w-[380px] lg:w-[560px]"
      />

      <PortfolioGallery
        images={item.images}
        title={item.title}
        heading={
          <h2 className="mb-4 text-base font-bold text-[#1B2028] sm:mb-6 sm:text-xl">
            گالری تصاویر
            <span className="font-medium text-gray-500">: فعالیت های موسسه منادیان فتح ایرانیان</span>
          </h2>
        }
      />
    </div>
  );
}

function OtherProjectsSlide({ items }: { items: PortfolioItem[] }) {
  return (
    <div
      dir="rtl"
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16"
      style={{
        backgroundImage: "url(/assets/banner.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-5xl">
        <h2 className="mb-6 text-right text-base font-bold text-[#1B2028] sm:mb-8 sm:text-xl">
          دیگر پروژه های ما
          <span className="font-medium text-gray-500">: از شما برای دیدن دعوت می‌کنیم</span>
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {items.map((p) => (
            <Link
              key={p.id}
              href={`/portfolio/${p.id}`}
              className="group relative flex h-[200px] w-full flex-col justify-end overflow-hidden rounded-2xl bg-brand-card ring-1 ring-black/5 transition active:scale-[0.98] hover:ring-brand-yellow/60 sm:h-[360px]"
            >
              {p.image && (
                <div
                  className="absolute inset-0 transition duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${p.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                  aria-hidden="true"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" aria-hidden="true" />
              <div className="relative z-10 p-4 sm:p-5">
                <span className="text-[10px] text-gray-300 sm:text-sm">{p.category}</span>
                <span className="mt-0.5 block text-sm font-bold text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.6)] sm:mt-1 sm:text-lg">
                  {p.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}