"use client";

import Image from "next/image";
import { useState } from "react";
import { API_PUBLIC_URL } from "@/lib/api";

const ITEM_WIDTH = 160;

// One "set" is repeated, then that whole set is duplicated exactly once —
// the standard infinite-marquee technique — so translateX(-50%) always
// lands on an identical frame.
//
// NOTE: this project has repeatedly hit a real, reproducible Chromium
// rendering bug where a rotated + overflow:hidden + transform-animated
// element goes intermittently blank once its own pixel width gets large
// (empirically confirmed via stress testing at SET_COUNT 24/32/48 — all
// blanked for a sustained span every cycle, regardless of whether the
// content inside is a gradient, many clip-path divs, or a single tiled SVG
// texture, ruling out "too many DOM nodes" as the cause). 20 is the largest
// value verified with zero blanking across many rounds of testing — do not
// raise this without re-running that stress test.
const SET_COUNT = 20;
const SET_WIDTH = ITEM_WIDTH * SET_COUNT;

// Because the track content can't safely be made arbitrarily wide (see
// above), the ribbon's own wrapper is capped at a fixed max width instead of
// scaling forever with viewport — otherwise an ultra-wide screen (3440px,
// 4K) would make the visible window wider than the track, producing a real,
// permanent gap. Kept comfortably below SET_WIDTH for margin.
const RIBBON_WRAPPER_MAX_WIDTH = 2800;
const TRACK_SEGMENTS = Array.from({ length: SET_COUNT * 2 });

// Diagonal cut: baked once into a tiny repeating SVG texture (one background
// layer, tiled by the browser) instead of dozens of overlapping clip-path
// divs — a single tiled image is far cheaper to composite than many
// individually-transformed/clipped elements, which is what caused blank-frame
// rendering glitches at wide track sizes. RIBBON_HEIGHT must match the
// track's rendered height (h-full inside the h-14/56px wrapper).
const RIBBON_HEIGHT = 56;
const STRIPE_ANGLE_DEG = 65;
const STRIPE_RUN = RIBBON_HEIGHT / Math.tan((STRIPE_ANGLE_DEG * Math.PI) / 180);
const SEGMENT_RENDER_WIDTH = ITEM_WIDTH + STRIPE_RUN;
const TILE_WIDTH = ITEM_WIDTH * 2;

function buildStripeTileUrl(colors: [string, string]) {
  const boxes = [0, 1]
    .map((i) => {
      const left = i * ITEM_WIDTH - STRIPE_RUN / 2;
      const points = [
        [left + STRIPE_RUN, 0],
        [left + SEGMENT_RENDER_WIDTH, 0],
        [left + SEGMENT_RENDER_WIDTH - STRIPE_RUN, RIBBON_HEIGHT],
        [left, RIBBON_HEIGHT],
      ]
        .map(([x, y]) => `${x},${y}`)
        .join(" ");
      return `<polygon points="${points}" fill="${colors[i % 2]}"/>`;
    })
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE_WIDTH}" height="${RIBBON_HEIGHT}" viewBox="0 0 ${TILE_WIDTH} ${RIBBON_HEIGHT}">${boxes}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const OFFICE_LOCATION = "35.718219199999986,51.42866925";

export default function Footer() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${API_PUBLIC_URL}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, phone_number: phoneNumber, message }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setFullName("");
      setPhoneNumber("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNewsletterStatus("loading");
    try {
      const res = await fetch(`${API_PUBLIC_URL}/api/newsletter/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (!res.ok) throw new Error("request failed");
      setNewsletterStatus("success");
      setNewsletterEmail("");
    } catch {
      setNewsletterStatus("error");
    }
  }

  return (
    <footer className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-brand-navy py-16">
      {/* The wave's cutout is transparent, so it must be clipped to a strip
          backed by white (matching the section above) — left full-height,
          its transparent top would just reveal the same navy behind it and
          the wave would be invisible. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 overflow-hidden bg-white sm:h-40 lg:h-48"
        aria-hidden="true"
      >
        <Image
          src="/assets/footer-wave-bg.png"
          alt=""
          width={1440}
          height={806}
          className="h-auto w-full"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1720px] px-6 sm:px-10 lg:px-16">
        <h2 className="text-right text-2xl font-extrabold text-white sm:text-3xl">
          موسسه منادیان فتح ایرانیان
        </h2>

        <form
          id="contact-form"
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-4"
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="شماره تماس"
              dir="rtl"
              className="w-full rounded-xl bg-[#F9F9F9] px-5 py-4 text-right text-sm font-bold text-[#12203f] placeholder:text-[#12203f] focus:outline-none focus:ring-2 focus:ring-brand-blue sm:w-2/5 sm:text-base"
            />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="نام و نام خانوادگی"
              dir="rtl"
              className="w-full rounded-xl bg-[#F9F9F9] px-5 py-4 text-right text-sm font-bold text-[#12203f] placeholder:text-[#12203f] focus:outline-none focus:ring-2 focus:ring-brand-blue sm:w-3/5 sm:text-base"
            />
          </div>
          <div className="w-full rounded-xl bg-[#F9F9F9] px-5 py-4">
            <p className="text-right text-sm font-bold text-[#12203f] sm:text-base">
              ثبت درخواست
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="میتوانید متن کامل توضیح خود را در قسمت مشخص شده وارد کنید"
              dir="rtl"
              rows={4}
              className="mt-2 w-full resize-none bg-transparent text-right text-xs text-gray-400 placeholder:text-gray-400 focus:outline-none sm:text-sm"
          />
          </div>
          {status === "success" && (
            <p className="text-center text-sm font-bold text-green-400">
              درخواست شما با موفقیت ثبت شد
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm font-bold text-red-400">
              خطا در ثبت درخواست، لطفاً دوباره تلاش کنید
            </p>
          )}
        </form>
      </div>

      <div className="relative mt-12 h-[150px] sm:h-[170px]">
        <Ribbon rotate={-3} top={0} colors={["#0B63E5", "#061C3D"]} />
        <Ribbon rotate={3} top={95} colors={["#061C3D", "#0B63E5"]} reverse />

        <button
          type="submit"
          form="contact-form"
          disabled={status === "loading"}
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-brand-yellow px-10 py-4 text-sm font-extrabold text-[#12203f] shadow-lg transition hover:brightness-105 disabled:opacity-60 sm:px-12 sm:py-4 sm:text-base"
        >
          {status === "loading" ? "در حال ارسال..." : "ارسال درخواست"}
        </button>
      </div>

      <div className="relative mx-auto w-full max-w-[1720px] px-6 pb-8 pt-6 sm:px-10 lg:px-16">
        <Image
          src="/assets/footer-grid-pattern.png"
          alt=""
          width={389}
          height={261}
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 -left-4 hidden w-56 opacity-50 sm:block lg:w-72"
        />

        <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-3 sm:gap-8">
          <div className="order-1 space-y-2.5 text-right">
            <h3 className="mb-1 text-sm font-bold text-white sm:text-base">اطلاعات تماس</h3>
            <p className="text-xs text-white/90 sm:text-sm">
              <span className="ml-2 text-white/40">•</span>
              <span className="text-white/70">پست الکترونیک</span>{" "}
              <span dir="ltr">info@Monadian.ir</span>
            </p>
            <p className="text-xs text-white/90 sm:text-sm">
              <span className="ml-2 text-white/40">•</span>
              <span className="text-white/70">ساعت کاری</span> شنبه تا چهارشنبه ۹ تا ۱۷
            </p>
            <p className="flex items-center justify-start gap-2 text-xs text-white/90 sm:text-sm">
              <span className="text-white/70">تلفن دفتر:</span>
              <span dir="ltr">021-88821928</span>
              <PhoneIcon />
            </p>
          </div>

          <div className="order-2 h-28 overflow-hidden rounded-2xl ring-1 ring-white/10 sm:h-32">
            <iframe
              title="موقعیت موسسه منادیان فتح ایرانیان"
              src={`https://maps.google.com/maps?q=${OFFICE_LOCATION}&z=15&output=embed`}
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>

          <div className="order-3 hidden sm:block" aria-hidden="true" />
        </div>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 sm:grid-cols-3 sm:gap-8">
          <div className="order-1 hidden sm:block" aria-hidden="true" />

          <p className="order-2 flex items-center justify-center gap-2 text-center text-xs text-white/90 sm:text-sm">
            <span>تهران، ضلع شمال شرقی میدان هفت تیر، کوچه شهید فلامکی(آذری)</span>
            <LocationIcon />
          </p>

          <div className="order-3 flex flex-col gap-1.5">
            <h3 className="text-xs font-bold text-white sm:text-sm">خبرنامه ما</h3>
            <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                placeholder="ایمیل خود را وارد کنید..."
                dir="rtl"
                className="min-w-0 flex-1 rounded-xl bg-white/10 px-4 py-2.5 text-right text-xs text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <button
                type="submit"
                disabled={newsletterStatus === "loading"}
                aria-label="ارسال"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-yellow text-[#12203f] transition hover:brightness-105 disabled:opacity-60"
              >
                <SendIcon />
              </button>
            </form>
            {newsletterStatus === "success" && (
              <p className="text-xs font-bold text-green-400">با موفقیت ثبت شد</p>
            )}
            {newsletterStatus === "error" && (
              <p className="text-xs font-bold text-red-400">خطا در ثبت، دوباره تلاش کنید</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-center text-xs text-white/70 sm:text-right">
            تمامی حقوق مادی و معنوی این وبسایت برای موسسه منادیان فتح ایرانیان محفوظ می‌باشد.
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
      className="absolute h-14 overflow-hidden"
      style={{
        top,
        left: "50%",
        // Capped so the wrapper's own rendered width can never outgrow the
        // (deliberately width-limited, see SET_COUNT above) track content —
        // on very wide screens this holds the ribbon at a fixed max width
        // instead of stretching edge-to-edge, which would otherwise leave a
        // real structural gap where the track runs out of content.
        width: `min(110%, ${RIBBON_WRAPPER_MAX_WIDTH}px)`,
        transform: `translate(-50%, 0) rotate(${rotate}deg)`,
      }}
    >
      <div
        className="relative flex h-full animate-marquee items-center"
        style={{
          width: SET_WIDTH * 2,
          backgroundImage: buildStripeTileUrl(colors),
          backgroundRepeat: "repeat-x",
          backgroundSize: `${TILE_WIDTH}px 100%`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {TRACK_SEGMENTS.map((_, i) => (
          <span
            key={i}
            className="relative z-10 flex flex-shrink-0 items-center justify-center text-xs font-bold text-white sm:text-sm"
            style={{ width: ITEM_WIDTH }}
          >
            منادیان فتح ایرانیان
          </span>
        ))}
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-white/80">
      <path
        d="M4.5 4.5h3.2l1.3 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.3v3.2c0 1-.9 1.7-1.8 1.4-3.6-1-6.8-3-9.2-5.9-1.6-2-2.7-4.4-3-6.9-.1-1 .5-1.6 1-1.6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 flex-shrink-0 text-white/80">
      <path
        d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scaleX(-1)" }}>
      <path d="M20 4L3 11l6 2.5M20 4l-4 16-7-6.5M20 4L9 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
