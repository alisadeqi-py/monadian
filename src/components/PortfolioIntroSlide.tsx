"use client";

import Image from "next/image";
import { MotionConfig, motion } from "framer-motion";
import type { PortfolioItem } from "@/lib/api";

// Each block animates itself rather than inheriting variants from a parent:
// the grid wrappers in between are plain elements, which would break variant
// propagation and leave everything below them stuck at opacity 0.
function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function PortfolioIntroSlide({ item }: { item: PortfolioItem }) {
  const lines = item.description
    ? item.description.split(/\n+/).filter(Boolean)
    : [];

  return (
    // The slide itself never scrolls — it is exactly one viewport tall and the
    // pieces below size themselves from the space that is left over. Only the
    // details column scrolls, and only when a project has more text than fits.
    // Extra left padding keeps content clear of the slideshow's fixed logo rail.
    <section
      dir="rtl"
      className="relative flex h-screen max-h-screen w-full flex-col overflow-hidden bg-[#030712] px-4 py-6 sm:py-8 sm:pl-16 sm:pr-6 lg:py-10 lg:pl-24 lg:pr-10"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_0%,#111c3a_0%,#030712_100%)]" />
      <div className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-brand-yellow/10 blur-[150px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[420px] w-[420px] rounded-full bg-brand-blue/10 blur-[150px]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to left, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <MotionConfig reducedMotion="user">
        <div className="relative z-10 mx-auto flex h-full w-full min-h-0 max-w-7xl flex-col">
          {/* Header */}
          {/* pl clears the slideshow's fixed close button on small screens */}
          <Reveal className="flex flex-shrink-0 flex-wrap items-center gap-x-3 gap-y-2 pl-12 sm:pl-0">
            <span className="h-px w-8 bg-brand-yellow sm:w-12" />
            <span className="text-xs font-bold tracking-widest text-brand-yellow sm:text-sm">
              توضیح کارنامه فنی
            </span>
            <span className="text-xs font-medium text-white/45 sm:text-sm">
              شناسنامه کارهای انجام شده
            </span>
          </Reveal>

          <Reveal
            delay={0.06}
            className="mt-3 flex-shrink-0 pl-12 sm:mt-4 sm:pl-0"
          >
            <h1 className="max-w-4xl text-xl font-extrabold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-[2.6rem] xl:leading-[1.25]">
              {item.title}
            </h1>
          </Reveal>

          <Reveal
            delay={0.12}
            className="mt-3 w-full flex-shrink-0 sm:mt-4 sm:w-fit"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 backdrop-blur-sm sm:px-5 sm:py-3">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-brand-yellow/10 text-brand-yellow ring-1 ring-brand-yellow/20 sm:h-10 sm:w-10">
                <ChecklistIcon />
              </span>
              <h2 className="text-sm font-bold text-white sm:text-base lg:text-lg">
                شناسنامه و چالش های پروژه
              </h2>
            </div>
          </Reveal>

          {/* Body — takes whatever height is left */}
          <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4 sm:mt-6 sm:gap-6 lg:grid lg:grid-cols-12 lg:gap-10">
            {/* Poster card */}
            <Reveal
              delay={0.18}
              className="flex min-h-0 flex-shrink-0 lg:col-span-4 lg:block"
            >
              <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:rounded-3xl">
                <div
                  className="relative h-[26vh] min-h-[140px] w-full flex-1 lg:h-auto"
                  style={{
                    backgroundImage: "url(/assets/portfolio-card-texture.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {item.image ? (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <Image
                        src="/assets/logo-mark.png"
                        alt=""
                        width={1986}
                        height={1775}
                        aria-hidden="true"
                        className="w-16 opacity-20 sm:w-20"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/25 to-transparent" />

                  <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-semibold text-white/80 backdrop-blur-md sm:text-xs">
                    {item.category}
                  </span>

                  <div className="absolute inset-x-3 bottom-3">
                    <span className="block text-[10px] text-white/50 sm:text-xs">
                      کارفرما
                    </span>
                    <span className="mt-0.5 block text-sm font-bold text-white sm:text-base">
                      {item.client}
                    </span>
                  </div>
                </div>

                {item.date && (
                  <div className="flex flex-shrink-0 items-center justify-between gap-3 border-t border-white/10 px-4 py-2.5">
                    <span className="flex items-center gap-2 text-[11px] text-white/50 sm:text-xs">
                      <CalendarIcon />
                      تاریخ انجام پروژه
                    </span>
                    <span className="text-xs font-bold text-brand-yellow sm:text-sm">
                      {item.date}
                    </span>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Details — the only scrollable region, and only when it overflows */}
            <Reveal delay={0.24} className="min-h-0 flex-1 lg:col-span-8">
              <div className="relative h-full">
                <div className="scrollbar-slim h-full space-y-5 overflow-y-auto pb-6 pl-2 sm:space-y-6">
                  <div>
                    <SectionTitle>شرح کلی پروژه</SectionTitle>

                    {lines.length > 0 ? (
                      <div className="mt-3 space-y-3">
                        {lines.map((line, i) => (
                          <p
                            key={i}
                            className="border-r-2 border-brand-yellow/30 pr-4 text-justify text-sm leading-relaxed text-white/70 sm:text-base sm:leading-loose"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-4 text-sm text-white/45 sm:px-6 sm:text-base">
                        توضیحاتی برای این نمونه کار ثبت نشده است.
                      </p>
                    )}
                  </div>

                  {item.services.length > 0 && (
                    <div>
                      <SectionTitle>لیست خدمات ارائه شده:</SectionTitle>

                      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5 xl:grid-cols-3">
                        {item.services.map((service) => (
                          <li
                            key={service.id}
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white/75 backdrop-blur-sm transition-colors hover:border-brand-yellow/30 hover:bg-white/[0.06] hover:text-white sm:text-base"
                          >
                            <BulletIcon />
                            {service.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Fade marking that the column continues past the fold */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#030712] to-transparent" />
              </div>
            </Reveal>
          </div>

          {/* Scroll hint — points at the next slide */}
          <Reveal
            delay={0.3}
            className="mt-3 flex flex-shrink-0 flex-col items-center gap-1.5 text-white/45 sm:mt-4"
          >
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.03]"
            >
              <ScrollDownIcon />
            </motion.span>
            <span className="text-[10px] sm:text-xs">به پایین حرکت دهید</span>
          </Reveal>
        </div>
      </MotionConfig>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-3 text-sm font-bold text-white sm:text-base lg:text-lg">
      <span className="h-4 w-1 rounded-full bg-brand-yellow" />
      {children}
    </h3>
  );
}

function ScrollDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5v13M6 13l6 5 6-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.5 9.5h17M8 3v3.5M16 3v3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BulletIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 text-brand-yellow"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8.5 12.2l2.2 2.2 4.8-4.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
