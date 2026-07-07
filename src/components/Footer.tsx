import Image from "next/image";

const ITEM_WIDTH = 160;
const ITEM_COUNT = 20;
const SET_WIDTH = ITEM_WIDTH * ITEM_COUNT;
const RIBBON_ITEMS = Array.from({ length: ITEM_COUNT });

export default function Footer() {
  return (
    <footer className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-brand-navy py-16">
      <div className="mx-auto w-full max-w-[1720px] px-6 sm:px-10 lg:px-16">
        <h2 className="text-right text-2xl font-extrabold text-white sm:text-3xl">
          موسسه منادیان فتح ایرانیان
        </h2>

        <form className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-4">
          <input
            type="tel"
            placeholder="شماره تماس"
            dir="rtl"
            className="w-full rounded-xl bg-[#F9F9F9] px-5 py-4 text-right text-sm font-bold text-[#12203f] placeholder:text-[#12203f] focus:outline-none focus:ring-2 focus:ring-brand-blue sm:text-base"
          />
          <div className="w-full rounded-xl bg-[#F9F9F9] px-5 py-4">
            <p className="text-right text-sm font-bold text-[#12203f] sm:text-base">
              ثبت درخواست
            </p>
            <textarea
              placeholder="میتوانید متن کامل توضیح خود را در قسمت مشخص شده وارد کنید"
              dir="rtl"
              rows={2}
              className="mt-2 w-full resize-none bg-transparent text-right text-xs text-gray-400 placeholder:text-gray-400 focus:outline-none sm:text-sm"
          />
          </div>
        </form>
      </div>

      <div className="relative mt-12 h-[110px] sm:h-[130px]">
        <Ribbon rotate={-3} top={0} colors={["#0B63E5", "#061C3D"]} />
        <Ribbon rotate={3} top={55} colors={["#061C3D", "#0B63E5"]} reverse />

        <button className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-brand-yellow px-10 py-4 text-sm font-extrabold text-[#12203f] shadow-lg transition hover:brightness-105 sm:text-base">
          ارسال درخواست
        </button>
      </div>

      <div className="mx-auto w-full max-w-[1720px] px-6 pb-10 pt-8 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="order-3 flex flex-col gap-4 sm:order-3">
            <p className="text-sm font-medium text-white/90">
              برای دریافت تخفیف های بیشتر ما را دنبال کنید!
            </p>
            <div className="flex items-center gap-3">
              <SocialIcon label="اینستاگرام">
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon label="تلگرام">
                <TelegramIcon />
              </SocialIcon>
              <SocialIcon label="واتساپ">
                <WhatsappIcon />
              </SocialIcon>
              <SocialIcon label="یوتیوب">
                <YoutubeIcon />
              </SocialIcon>
            </div>
          </div>

          <div className="order-1 space-y-3 text-right sm:order-2">
            <p className="text-sm text-white/90 sm:text-base">
              <span className="font-bold text-white">آدرس</span>{" "}
              تهران، ضلع شمال شرقی میدان هفت تیر، کوچه شهید فلامکی(آذری)
            </p>
            <p className="text-sm text-white/90 sm:text-base">
              <span className="font-bold text-white">تلفن</span>{" "}
              <span dir="ltr">021-88821928</span>
            </p>
          </div>

          <div className="order-2 flex items-center sm:order-1">
            <Image
              src="/assets/badges-strip.png"
              alt="اتحادیه کشوری کسب و کارهای مجازی، نماد ساماندهی، نماد اعتماد الکترونیکی"
              width={251}
              height={80}
              className="h-12 w-auto object-contain sm:h-16"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function Ribbon({
  rotate,
  top,
  colors,
  reverse,
}: {
  rotate: number;
  top: number;
  colors: [string, string];
  reverse?: boolean;
}) {
  return (
    <div
      className="absolute inset-x-[-5%] h-14 overflow-hidden"
      style={{ top, transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="flex h-full animate-marquee items-center"
        style={{
          width: SET_WIDTH * 2,
          background: `repeating-linear-gradient(65deg, ${colors[0]} 0px, ${colors[0]} 140px, ${colors[1]} 140px, ${colors[1]} 280px)`,
          animationDirection: reverse ? "reverse" : "normal",
          "--marquee-shift": `-${SET_WIDTH}px`,
        } as React.CSSProperties}
      >
        {RIBBON_ITEMS.concat(RIBBON_ITEMS).map((_, i) => (
          <span
            key={i}
            className="flex flex-shrink-0 items-center justify-center text-xs font-bold text-white sm:text-sm"
            style={{ width: ITEM_WIDTH }}
          >
            منادیان فتح ایرانیان
          </span>
        ))}
      </div>
    </div>
  );
}

function SocialIcon({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 4L2.5 11.4c-.9.35-.9 1.6.02 1.92l4.63 1.6 1.78 5.53c.24.75 1.2.95 1.73.37l2.5-2.7 4.68 3.43c.7.51 1.7.13 1.88-.72L23.9 4.9c.2-.9-.7-1.6-1.5-1.9z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M8.5 14.5l9.5-8-8 9.3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8.5 8.7c.2-.5.5-.5.8-.5h.6c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.4l-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.6-.7c.2-.3.4-.2.6-.1l1.5.7c.2.1.4.2.4.4 0 .2 0 1-.4 1.5-.4.5-1.4.9-2 .9-.5 0-1.9-.2-3.7-1.5-2.1-1.6-3.4-3.9-3.5-4.1-.1-.2-.9-1.2-.9-2.3 0-1.1.6-1.6.8-1.8z"
        fill="currentColor"
      />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="6" width="19" height="12" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 9.5l5 2.5-5 2.5v-5z" fill="currentColor" />
    </svg>
  );
}
