"use client";

import { useState } from "react";

interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const SERVICES: Service[] = [
  {
    id: "branding",
    number: "۰۱",
    title: "معماری برند و مهندسیِ نقاط تماس",
    description:
      "ما فراتر از یک نشانِ تجاری، \"شخصیت برند\" شما را در تمامِ نقاطِ تماس با مخاطب بازتعریف می‌کنیم. هدفِ ما، ایجادِ یک ادراکِ یکپارچه و ماندگار در ذهنِ بازارِ هدف است تا برند شما در هر لحظه، روایتگرِ اصالت و اقتدارِ سازمانی شما باشد.",
    Icon: BrandingIcon,
  },
  {
    id: "digital",
    number: "۰۲",
    title: "دیجیتال مارکتینگ استراتژیک",
    description:
      "طراحیِ نقشه راهِ حضورِ دیجیتال، فراتر از مدیریتِ شبکه‌های اجتماعی است. ما با ترکیبِ \"استراتژی محتوا\" و \"بهینه‌سازیِ عملکردی\"، زیرساخت‌هایِ آنلاینِ شما را به موتورهایِ رشدِ کسب‌وکار تبدیل می‌کنیم تا در فضایِ رقابتیِ وب، صدایی متمایز و تأثیرگذار داشته باشید.",
    Icon: DigitalIcon,
  },
  {
    id: "content",
    number: "۰۳",
    title: "مهندسیِ روایت و تولید چندرسانه‌ای",
    description:
      "محتوا، سوختِ اصلیِ انتقالِ پیامِ شماست. ما با رویکردِ \"داستان‌سراییِ استراتژیک\"، مفاهیمِ پیچیده را به زبانِ تصویر و حرکت ترجمه می‌کنیم. تولیداتِ ما، از استوری‌تلینگِ خلاقانه تا طراحیِ المان‌هایِ بصریِ متحرک، با هدفِ نفوذ در لایه‌هایِ عمیقِ مخاطب و تثبیتِ هویتِ برند طراحی می‌شوند.",
    Icon: ContentIcon,
  },
  {
    id: "media",
    number: "۰۴",
    title: "مدیریت توزیع پیام و جریان‌سازی",
    description:
      "ما نه فقط بسترِ انتشار، که \"مدیریتِ جریانِ دیده شدن\" هستیم. با بهره‌گیری از شبکه‌یِ گسترده‌ای از بسترهایِ مجازی و حقیقی، محتوایِ شما را دقیقاً در برابرِ دیدگانِ مخاطبانِ کلیدی قرار می‌دهیم. مأموریتِ ما، تبدیلِ \"انتشارِ ساده\" به \"جریان‌سازیِ هدفمند\" است.",
    Icon: MediaIcon,
  },
  {
    id: "seminar",
    number: "۰۵",
    title: "مدیریت رویدادهای تخصصی",
    description:
      "هر همایش یا رویداد، یک سکویِ تعاملی برایِ نمایشِ قدرتِ برند است. ما با برنامه‌ریزیِ مهندسی‌شده و طراحیِ تجربه‌هایِ حضوریِ متمایز، پیوندی عمیق میانِ برندِ شما و ذینفعانِ کلیدی ایجاد می‌کنیم. ما در رویدادها، تنها میزبانی نمی‌کنیم؛ بلکه محیطی برایِ شبکه‌سازیِ هوشمندانه خلق می‌کنیم.",
    Icon: SeminarIcon,
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState<string>(SERVICES[0].id);
  const activeService = SERVICES.find((s) => s.id === activeId) || SERVICES[0];

  return (
    <section
      dir="rtl"
      className="relative min-h-screen w-full overflow-hidden bg-brand-navy py-16 sm:py-24"
    >
      {/* Background Lighting Accent */}
      <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-brand-yellow/5 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 max-w-2xl sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow sm:text-sm">
            حوزه‌های فعالیت
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            خدمات راهبردی و توسعه برند
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Navigation Column (5 Cols) */}
          <div className="flex flex-col space-y-3 lg:col-span-5">
            {SERVICES.map((service) => {
              const isActive = service.id === activeId;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  className={`group relative flex items-center justify-between rounded-xl p-4 text-right transition-all duration-300 sm:p-5 ${
                    isActive
                      ? "bg-white/10 shadow-lg backdrop-blur-md"
                      : "bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                >
                  {/* Left Accent Bar on Active */}
                  <div
                    className={`absolute inset-y-0 right-0 w-1 rounded-r-xl bg-brand-yellow transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm font-bold font-mono transition-colors ${
                        isActive ? "text-brand-yellow" : "text-white/40"
                      }`}
                    >
                      {service.number}
                    </span>
                    <span
                      className={`text-base font-semibold transition-colors sm:text-lg ${
                        isActive ? "text-white" : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? "bg-brand-yellow text-brand-navy"
                        : "bg-white/5 text-white/50 group-hover:text-white"
                    }`}
                  >
                    <service.Icon className="h-5 w-5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Feature Display Card (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative flex h-full min-h-[380px] flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-6 backdrop-blur-xl sm:p-10">
              {/* Top Row: Big Number & Large Icon */}
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-yellow/10 text-brand-yellow ring-1 ring-brand-yellow/30">
                      <activeService.Icon className="h-7 w-7" />
                    </div>
                    <span className="text-xs font-semibold tracking-wider text-brand-yellow/80 uppercase">
                      جزئیات خدمت
                    </span>
                  </div>
                  <span className="font-mono text-4xl font-black text-white/20 sm:text-6xl">
                    {activeService.number}
                  </span>
                </div>

                {/* Content Area */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                    {activeService.title}
                  </h3>
                  <p className="mt-6 text-justify text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
                    {activeService.description}
                  </p>
                </div>
              </div>

              {/* Bottom Action / Metadata Footer */}
              <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-xs text-white/50 sm:text-sm">
                  طراحی‌شده برای کسب‌وکارهای پیشرو
                </span>
                <button className="inline-flex items-center gap-2 rounded-lg bg-brand-yellow px-4 py-2 text-xs font-bold text-brand-navy transition-all hover:bg-white sm:text-sm">
                  <span>درخواست مشاوره</span>
                  <svg
                    className="h-4 w-4 rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Optimized SVG Icons
function BrandingIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path
        d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 13.5 6 21l6-2.5 6 2.5-2.5-7.5"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DigitalIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <circle cx="12" cy="12" r="9" strokeWidth="1.75" />
      <path
        d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContentIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path
        d="M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M15 3v4a1 1 0 0 0 1 1h4" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M8 13h8M8 17h5" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function MediaIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path
        d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Z"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SeminarIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <circle cx="8.5" cy="7" r="2.5" strokeWidth="1.75" />
      <circle cx="16" cy="8" r="2" strokeWidth="1.75" />
      <path
        d="M3.5 19c0-2.8 2.2-5 5-5s5 2.2 5 5"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M14 14.5c2.3.3 4 2.2 4 4.5"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}