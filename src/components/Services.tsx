"use client";

import { useState } from "react";

const SERVICES = [
  {
    title: "معماری برند و مهندسیِ نقاط تماس (Brand Architecture)",
    description: "«ما فراتر از یک نشانِ تجاری، \"شخصیت برند\" شما را در تمامِ نقاطِ تماس با مخاطب بازتعریف می‌کنیم. هدفِ ما، ایجادِ یک ادراکِ یکپارچه و ماندگار در ذهنِ بازارِ هدف است تا برند شما در هر لحظه، روایتگرِ اصالت و اقتدارِ سازمانی شما باشد.»",
    Icon: BrandingIcon,
  },
  {
    title: "دیجیتال مارکتینگِ استراتژیک و توسعه اکوسیستم‌هایِ آنلاین",
    description: "«طراحیِ نقشه راهِ حضورِ دیجیتال، فراتر از مدیریتِ شبکه‌های اجتماعی است. ما با ترکیبِ \"استراتژی محتوا\" و \"بهینه‌سازیِ عملکردی\"، زیرساخت‌هایِ آنلاینِ شما را به موتورهایِ رشدِ کسب‌وکار تبدیل می‌کنیم تا در فضایِ رقابتیِ وب، صدایی متمایز و تأثیرگذار داشته باشید.»",
    Icon: DigitalIcon,
  },
  {
    title: "مهندسیِ روایت (Narrative Engineering) و تولیدِ دارایی‌هایِ چندرسانه‌ای",
    description: "«محتوا، سوختِ اصلیِ انتقالِ پیامِ شماست. ما با رویکردِ \"داستان‌سراییِ استراتژیک\"، مفاهیمِ پیچیده را به زبانِ تصویر و حرکت ترجمه می‌کنیم. تولیداتِ ما، از استوری‌تلینگِ خلاقانه تا طراحیِ المان‌هایِ بصریِ متحرک، با هدفِ نفوذ در لایه‌هایِ عمیقِ مخاطب و تثبیتِ هویتِ برند طراحی می‌شوند.»",
    Icon: ContentIcon,
  },
  {
    title: "مدیریتِ توزیعِ پیام و جریان‌سازیِ رسانه‌ای",
    description: "«ما نه فقط بسترِ انتشار، که \"مدیریتِ جریانِ دیده شدن\" هستیم. با بهره‌گیری از شبکه‌یِ گسترده‌ای از بسترهایِ مجازی و حقیقی، محتوایِ شما را دقیقاً در برابرِ دیدگانِ مخاطبانِ کلیدی قرار می‌دهیم. مأموریتِ ما، تبدیلِ \"انتشارِ ساده\" به \"جریان‌سازیِ هدفمند\" است تا ضریبِ نفوذِ پیامِ شما به حداکثر برسد.»",
    Icon: MediaIcon,
  },
  {
    title: "مدیریتِ رویدادهایِ تخصصی و بازاریابیِ تجربه‌محور",
    description: "«هر همایش یا رویداد، یک سکویِ تعاملی برایِ نمایشِ قدرتِ برند است. ما با برنامه‌ریزیِ مهندسی‌شده و طراحیِ تجربه‌هایِ حضوریِ متمایز، پیوندی عمیق میانِ برندِ شما و ذینفعانِ کلیدی ایجاد می‌کنیم. ما در رویدادها، تنها میزبانی نمی‌کنیم؛ بلکه محیطی برایِ شبکه‌سازیِ هوشمندانه و ایجادِ تعاملاتِ مؤثر خلق می‌کنیم.»",
    Icon: SeminarIcon,
  },
];

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="flex min-h-screen w-full items-center bg-brand-navy py-12 sm:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            خدمات ما
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-brand-yellow sm:mt-4 sm:w-20" />
          <p className="mt-4 text-sm text-white/60 sm:text-base">
            برای مشاهده جزئیات هر خدمت، روی آن کلیک کنید
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3 sm:space-y-4">
          {SERVICES.map((s, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={s.title}
                className={`rounded-xl border transition-all duration-300 ${isOpen
                  ? "border-brand-yellow/30 bg-white/5 shadow-lg shadow-black/20"
                  : "border-white/10 bg-transparent hover:border-white/20"
                  }`}
              >
                {/* Accordion Header - Clickable */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 text-right sm:p-6"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-brand-yellow ring-1 ring-white/10 transition-all duration-300 sm:h-14 sm:w-14">
                      <s.Icon />
                    </div>

                    {/* Title and Toggle Indicator */}
                    <div className="flex flex-1 items-center justify-between gap-4">
                      <h3 className={`text-sm font-bold text-white transition-colors duration-300 sm:text-base lg:text-lg ${isOpen ? "text-brand-yellow" : ""
                        }`}>
                        {s.title}
                      </h3>

                      {/* Toggle Icon */}
                      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-10 sm:w-10 ${isOpen
                        ? "border-brand-yellow/50 bg-brand-yellow/10 text-brand-yellow"
                        : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                        }`}>
                        <svg
                          className={`h-4 w-4 transition-transform duration-300 sm:h-5 sm:w-5 ${isOpen ? "rotate-180" : ""
                            }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Accordion Content */}
                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-white/10 px-4 pb-4 sm:px-6 sm:pb-6">
                      <p className="text-justify text-xs leading-relaxed text-white/70 sm:text-sm lg:text-base">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Icons with responsive sizing
function BrandingIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:h-7 sm:w-7 lg:h-8 lg:w-8">
      <path
        d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.5 13.5 6 21l6-2.5 6 2.5-2.5-7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DigitalIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:h-7 sm:w-7 lg:h-8 lg:w-8">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:h-7 sm:w-7 lg:h-8 lg:w-8">
      <path
        d="M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M15 3v4a1 1 0 0 0 1 1h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MediaIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:h-7 sm:w-7 lg:h-8 lg:w-8">
      <path
        d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SeminarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:h-7 sm:w-7 lg:h-8 lg:w-8">
      <circle cx="8.5" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="8" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.5 19c0-2.8 2.2-5 5-5s5 2.2 5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M14 14.5c2.3.3 4 2.2 4 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}