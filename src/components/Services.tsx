const SERVICES = [
  {
    title: "برندینگ",
    description: "ایجاد شخصیت برند به منظور طراحی یکپارچه نقاط تماس آن با مخاطبین هدف",
    Icon: BrandingIcon,
  },
  {
    title: "خدمات دیجیتال",
    description: "طراحی استراتژی، تولید محتوا و بهینه سازی در حوزه شبکه های مجازی و سایت",
    Icon: DigitalIcon,
  },
  {
    title: "تولید محتوا",
    description: "داستان‌سرایی، طراحی و اجرا محتواهای تصویری ثابت و متحرک برای انتشار در بسترهای مختلف",
    Icon: ContentIcon,
  },
  {
    title: "رسانه",
    description: "در دسترس قرار دادن بسترهای مجازی حقیقی با مخاطبین بالا برای انتشار محتواهای تبلیغاتی",
    Icon: MediaIcon,
  },
  {
    title: "برگزاری همایش",
    description: "برنامه‌ریزی، طراحی و اجرای همایش‌ها و رویدادهای تخصصی با هدف تعامل موثر با مخاطبین",
    Icon: SeminarIcon,
  },
];

export default function Services() {
  return (
    <section className="flex min-h-screen w-full items-center bg-brand-navy py-8">
      <div className="mx-auto w-full max-w-7xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-white sm:text-4xl">
          خدمات ما
        </h2>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {SERVICES.map((s) => (
            <div key={s.title} className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-brand-yellow ring-1 ring-white/10 sm:h-24 sm:w-24">
                <s.Icon />
              </div>
              <h3 className="mb-3 text-lg font-bold text-white sm:text-xl">{s.title}</h3>
              <p className="max-w-[260px] text-sm leading-7 text-white/60 sm:text-base">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandingIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
