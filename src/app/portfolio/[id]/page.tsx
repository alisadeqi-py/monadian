import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolioItem, getPortfolioItems, type PortfolioItem } from "@/lib/api";
import PortfolioGallery from "@/components/PortfolioGallery";
import PortfolioSlideShow from "@/components/PortfolioSlideShow";
import PortfolioSlide from "@/components/PortfolioSlide";
import PortfolioIntroSlide from "@/components/PortfolioIntroSlide";
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

  const slides = [<PortfolioIntroSlide key="description" item={item} />];
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