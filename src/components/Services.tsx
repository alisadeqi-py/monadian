"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    number: "۱",
    title: "معماری برند و مهندسیِ نقاط تماس",
    description:
      "ما فراتر از یک نشانِ تجاری، \"شخصیت برند\" شما را در تمامِ نقاطِ تماس با مخاطب بازتعریف می‌کنیم. هدفِ ما، ایجادِ یک ادراکِ یکپارچه و ماندگار در ذهنِ بازارِ هدف است تا برند شما در هر لحظه، روایتگرِ اصالت و اقتدارِ سازمانی شما باشد.",
    Icon: BrandingIcon,
  },
  {
    id: "digital",
    number: "۲",
    title: "دیجیتال مارکتینگ استراتژیک",
    description:
      "طراحیِ نقشه راهِ حضورِ دیجیتال، فراتر از مدیریتِ شبکه‌های اجتماعی است. ما با ترکیبِ \"استراتژی محتوا\" و \"بهینه‌سازیِ عملکردی\"، زیرساخت‌هایِ آنلاینِ شما را به موتورهایِ رشدِ کسب‌وکار تبدیل می‌کنیم تا در فضایِ رقابتیِ وب، صدایی متمایز و تأثیرگذار داشته باشید.",
    Icon: DigitalIcon,
  },
  {
    id: "content",
    number: "۳",
    title: "مهندسیِ روایت و تولید چندرسانه‌ای",
    description:
      "محتوا، سوختِ اصلیِ انتقالِ پیامِ شماست. ما با رویکردِ \"داستان‌سراییِ استراتژیک\"، مفاهیمِ پیچیده را به زبانِ تصویر و حرکت ترجمه می‌کنیم. تولیداتِ ما، از استوری‌تلینگِ خلاقانه تا طراحیِ المان‌هایِ بصریِ متحرک، با هدفِ نفوذ در لایه‌هایِ عمیقِ مخاطب و تثبیتِ هویتِ برند طراحی می‌شوند.",
    Icon: ContentIcon,
  },
  {
    id: "media",
    number: "۴",
    title: "مدیریت توزیع پیام و جریان‌سازی",
    description:
      "ما نه فقط بسترِ انتشار، که \"مدیریتِ جریانِ دیده شدن\" هستیم. با بهره‌گیری از شبکه‌یِ گسترده‌ای از بسترهایِ مجازی و حقیقی، محتوایِ شما را دقیقاً در برابرِ دیدگانِ مخاطبانِ کلیدی قرار می‌دهیم. مأموریتِ ما، تبدیلِ \"انتشارِ ساده\" به \"جریان‌سازیِ هدفمند\" است.",
    Icon: MediaIcon,
  },
  {
    id: "seminar",
    number: "۵",
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
      className="relative min-h-screen w-full overflow-hidden bg-[#030712] py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,#1e293b_0%,#030712_100%)] opacity-80" />


      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-brand-yellow/5 blur-[120px]" />
      </div>

      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-brand-yellow/10 blur-[140px]" />
      
      <div className="pointer-events-none absolute top-1/4 right-0 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[140px]" />


      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow sm:text-sm">
            حوزه‌های فعالیت
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            خدمات راهبردی <br/>و توسعه برند
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col space-y-4 lg:col-span-5">
            {SERVICES.map((service) => {
              const isActive = service.id === activeId;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  className={`group relative flex items-center justify-between rounded-2xl p-5 text-right transition-all duration-300 sm:p-6 ${
                    isActive
                      ? "bg-white/[0.03] shadow-[0_8px_30deg_rgb(0,0,0,0.12)] backdrop-blur-md ring-1 ring-white/10"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeAccent"
                        className="absolute inset-y-0 right-0 w-1 rounded-r-2xl bg-brand-yellow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-5">
                    <span
                      className={`text-sm font-bold font-mono transition-colors ${
                        isActive ? "text-brand-yellow" : "text-white/30"
                      }`}
                    >
                      {service.number}
                    </span>
                    <span
                      className={`text-lg font-semibold transition-colors sm:text-xl ${
                        isActive ? "text-white" : "text-white/60 group-hover:text-white"
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                      isActive
                        ? "bg-brand-yellow text-brand-navy shadow-lg"
                        : "bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white"
                    }`}
                  >
                    <service.Icon className="h-6 w-6" />
                  </div>
                </button>
              );
            })}
          </div>
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative flex h-full min-h-[420px] flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-sm sm:p-12 shadow-2xl"
              >
                {/* Internal Decorative Light */}
                <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand-yellow/5 blur-[60px]" />
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-8">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-yellow/10 text-brand-yellow ring-1 ring-brand-yellow/20">
                        <activeService.Icon className="h-8 w-8" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold tracking-wider text-brand-yellow uppercase">
                          جزئیات خدمت
                        </span>
                        <span className="text-sm text-white/50">
                          {activeService.id.toUpperCase()} SOLUTIONS
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-5xl font-black text-white/[0.08] sm:text-7xl">
                      {activeService.number}
                    </span>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                      {activeService.title}
                    </h3>
                    <p className="mt-8 text-justify text-base leading-relaxed text-white/70 sm:text-lg lg:text-xl lg:leading-loose">
                      {activeService.description}
                    </p>
                  </div>
                </div>
                <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
                  <span className="text-sm text-white/40">
                    طراحی‌شده برای کسب‌وکارهای پیشرو و نوآور
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

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