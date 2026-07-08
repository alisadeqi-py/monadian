import Image from "next/image";
import { notFound } from "next/navigation";
import { getPortfolioItem, type PortfolioItem } from "@/lib/api";
import PortfolioGallery from "@/components/PortfolioGallery";
import PortfolioSlideShow from "@/components/PortfolioSlideShow";
import PortfolioSlide from "@/components/PortfolioSlide";

export default async function PortfolioDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await getPortfolioItem(Number(params.id));
  if (!item) notFound();

  const slides = [<DescriptionSlide key="description" item={item} />];
  if (item.video) slides.push(<VideoSlide key="video" item={item} />);
  if (item.images.length > 0) slides.push(<GallerySlide key="gallery" item={item} />);

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
      className="flex min-h-screen w-full flex-col justify-center px-6 py-20 sm:py-16"
      style={{
        backgroundImage: "url(/assets/portfolio-slide-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="mb-4 text-right text-lg font-bold text-[#1B2028] sm:text-xl">
          توضیح کارنامه فنی
          <span className="font-medium text-gray-500">: شناسنامه کارهای انجام شده</span>
        </h1>

        <div className="relative overflow-hidden rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-black/5 sm:p-10">
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-h-[180px] flex-1 pt-10 sm:pt-0">
              {lines.length > 0 ? (
                <div className="space-y-4">
                  {lines.map((line, i) => (
                    <p
                      key={i}
                      className="border-b border-dotted border-gray-400 pb-2 text-right text-sm leading-relaxed text-gray-600 sm:text-base"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="border-b border-dotted border-gray-400 pb-2 text-right text-sm text-gray-500">
                  توضیحاتی برای این نمونه کار ثبت نشده است.
                </p>
              )}
            </div>

            <div
              className="relative aspect-[241/408] w-40 flex-shrink-0 overflow-hidden rounded-2xl ring-1 ring-black/10 sm:w-48"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="text-xs text-gray-300">{item.category}</span>
                <span className="mt-1 block text-sm font-bold text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
                  {item.title}
                </span>
              </div>
            </div>
          </div>

          <div className="relative mt-10 flex flex-col items-center gap-2 text-gray-500">
            <ScrollDownIcon />
            <span className="text-xs">به پایین حرکت دهید</span>
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

function VideoSlide({ item }: { item: PortfolioItem }) {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <span className="absolute right-6 top-24 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white sm:top-6">
        پیش نمایش
      </span>
      <video
        key={item.video}
        src={item.video ?? undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        suppressHydrationWarning
        className="absolute inset-0 h-full w-full object-cover"
      />
    </section>
  );
}

function GallerySlide({ item }: { item: PortfolioItem }) {
  return (
    <div dir="rtl" className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-brand-dark px-6 py-16 sm:px-16">
      <Image
        src="/assets/gallery-pattern.png"
        alt=""
        width={425}
        height={286}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[68%] hidden w-[380px] -translate-y-1/2 opacity-80 sm:w-[460px] md:block lg:w-[560px]"
      />

      <h2 className="absolute right-6 top-24 z-10 text-lg font-bold text-white sm:right-16 sm:top-16">
        گالری تصاویر
      </h2>
      <PortfolioGallery images={item.images} title={item.title} />
    </div>
  );
}
