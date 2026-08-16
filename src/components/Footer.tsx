"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EnvelopIcon from "./EnvelopIcon";
import { NETWORK_ERROR, parseApiError } from "@/lib/formError";

const ITEM_WIDTH = 160;
const SET_COUNT = 20;
const SET_WIDTH = ITEM_WIDTH * SET_COUNT;
const RIBBON_WRAPPER_MAX_WIDTH = 2800;
const TRACK_SEGMENTS = Array.from({ length: SET_COUNT * 2 });

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
  const [errorMessage, setErrorMessage] = useState("");

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterErrorMessage, setNewsletterErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, phone_number: phoneNumber, message }),
      });
      if (!res.ok) {
        const { message: msg } = await parseApiError(res);
        setErrorMessage(msg);
        setStatus("error");
        return;
      }
      setStatus("success");
      setFullName("");
      setPhoneNumber("");
      setMessage("");
    } catch {
      setErrorMessage(NETWORK_ERROR);
      setStatus("error");
    }
  }

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNewsletterStatus("loading");
    setNewsletterErrorMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (!res.ok) {
        const { message: msg } = await parseApiError(res);
        setNewsletterErrorMessage(msg);
        setNewsletterStatus("error");
        return;
      }
      setNewsletterStatus("success");
      setNewsletterEmail("");
    } catch {
      setNewsletterErrorMessage(NETWORK_ERROR);
      setNewsletterStatus("error");
    }
  }

  return (
    <footer className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-brand-navy py-12 sm:py-16">
      {/* Wave Background */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 overflow-hidden bg-white sm:h-32 lg:h-40"
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

      <div className="relative mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-16">
        {/* Contact Form */}
        <form
          id="contact-form"
          onSubmit={handleSubmit}
          className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-3 sm:mt-8 sm:gap-4"
        >
          <h3 className="text-right text-xl font-extrabold text-[#CEE0FA] sm:text-2xl lg:text-3xl">
            موسسه منادیان فتح ایرانیان
          </h3>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="نام و نام خانوادگی"
              dir="rtl"
              className="w-full rounded-xl bg-[#F9F9F9] px-4 py-3 text-right text-sm font-bold text-[#12203f] placeholder:text-[#12203f]/60 focus:outline-none focus:ring-2 focus:ring-brand-blue sm:w-3/5 sm:px-5 sm:py-4 sm:text-base"
            />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="شماره تماس"
              dir="rtl"
              className="w-full rounded-xl bg-[#F9F9F9] px-4 py-3 text-right text-sm font-bold text-[#12203f] placeholder:text-[#12203f]/60 focus:outline-none focus:ring-2 focus:ring-brand-blue sm:w-2/5 sm:px-5 sm:py-4 sm:text-base"
            />
          </div>
          <div className="w-full rounded-xl bg-[#F9F9F9] px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-right text-sm font-bold text-[#12203f] sm:text-base">
              ثبت درخواست
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="میتوانید متن کامل توضیح خود را در قسمت مشخص شده وارد کنید"
              dir="rtl"
              rows={3}
              className="mt-2 w-full resize-none bg-transparent text-right text-xs text-[#12203f]/60 placeholder:text-[#12203f]/40 focus:outline-none sm:text-sm"
            />
          </div>
          {status === "success" && (
            <p className="text-center text-sm font-bold text-green-400">
              درخواست شما با موفقیت ثبت شد
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm font-bold text-red-400">{errorMessage}</p>
          )}
        </form>
      </div>

      {/* Ribbon Section */}
      <div className="relative h-[130px] sm:h-[150px] lg:h-[170px]">
        <Ribbon rotate={-3} top={0} colors={["#0B63E5", "#061C3D"]} />
        <Ribbon rotate={3} top={85} colors={["#061C3D", "#0B63E5"]} reverse />

        <button
          type="submit"
          form="contact-form"
          disabled={status === "loading"}
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-brand-yellow px-8 py-3 text-sm font-extrabold text-[#12203f] shadow-lg transition hover:brightness-105 disabled:opacity-60 sm:px-10 sm:py-3.5 sm:text-base lg:px-12 lg:py-4"
        >
          {status === "loading" ? "در حال ارسال..." : "ارسال درخواست"}
        </button>
      </div>

      {/* Footer Bottom */}
      <div className="relative mx-auto w-full max-w-[1720px] px-4 pb-6 pt-6 sm:px-6 lg:px-16">
        <Image
          src="/assets/footer-grid-pattern.png"
          alt=""
          width={389}
          height={261}
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 -left-4 hidden w-44 opacity-50 sm:block lg:w-56"
        />

        <div className="grid items-end gap-6 sm:grid-cols-3 sm:gap-8">
          {/* Contact Info */}
          <div className="order-1 space-y-2 text-right">
            <h3 className="mb-1 text-sm font-bold text-white sm:text-base">اطلاعات تماس</h3>
            <p className="text-xs text-white/90 sm:text-sm">
              <span className="ml-2 text-white/40">•</span>
              <span className="text-white/70">پست الکترونیک</span>{" "}
              <a
                href="mailto:info@Monadian.ir"
                dir="ltr"
                className="text-blue-400 transition-colors hover:text-brand-yellow hover:underline"
              >
                info@Monadianfath.com
              </a>
            </p>
            <p className="text-xs text-white/90 sm:text-sm">
              <span className="ml-2 text-white/40">•</span>
              <span className="text-white/70">ساعت کاری</span> شنبه تا پنج شنبه ۸ تا ۱۷
            </p>
            <p className="flex items-center justify-start gap-2 text-xs text-white/90 sm:text-sm">
              <PhoneIcon />
              <span className="text-white/70">تلفن دفتر:</span>
              <a
                href="tel:+982188821928"
                dir="ltr"
                className="text-blue-400 transition-colors hover:text-brand-yellow hover:underline"
              >
                ۰۲۱ - ۸۸۸۲۱۹۲۸
              </a>
            </p>
          </div>

          {/* Map */}
          <div className="order-2 space-y-1.5">
            <div className="h-24 overflow-hidden rounded-2xl ring-1 ring-white/10 sm:h-28 lg:h-32">
              <iframe
                title="موقعیت موسسه منادیان فتح ایرانیان"
                src={`https://maps.google.com/maps?q=${OFFICE_LOCATION}&z=15&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
            <p className="flex justify-center gap-2 text-center text-[10px] text-white/90 sm:text-xs lg:text-sm">
              <LocationIcon />
              <span>تهران، ضلع شمال شرقی میدان هفت تیر، کوچه شهید فلامکی (آذری)</span>
            </p>
          </div>

          {/* Newsletter */}
          <div className="order-3 flex flex-col gap-1.5 text-right">
            <h3 className="text-xs font-bold text-white sm:text-sm">خبرنامه ما</h3>
            <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
                  <EnvelopIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  placeholder="ایمیل خود را وارد کنید..."
                  dir="rtl"
                  className="w-full rounded-xl border-2 border-white/30 bg-transparent px-3 py-2 pr-9 pl-16 text-right text-xs text-white placeholder:text-white/50 transition-all duration-200 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30 hover:border-white/50 sm:px-4 sm:py-2.5 sm:pr-10 sm:pl-20"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  aria-label="ارسال"
                  className="absolute left-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md bg-[#E7E6F7] px-2.5 py-1 text-[10px] font-medium text-[#12203f] transition hover:brightness-105 disabled:opacity-60 sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  ارسال
                </button>
              </div>
            </form>
            {newsletterStatus === "success" && (
              <p className="text-xs font-bold text-green-400">با موفقیت ثبت شد</p>
            )}
            {newsletterStatus === "error" && (
              <p className="text-xs font-bold text-red-400">{newsletterErrorMessage}</p>
            )}
          </div>
        </div>

        {/* Careers CTA */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-white/5 px-5 py-5 text-center ring-1 ring-white/10 sm:mt-10 sm:flex-row sm:px-8 sm:text-right">
          <div>
            <h3 className="text-sm font-bold text-white sm:text-base">
              به تیم ما بپیوندید
            </h3>
            <p className="mt-1 text-xs text-white/60 sm:text-sm">
              اگر علاقه‌مند به همکاری با موسسه منادیان فتح ایرانیان هستید، فرم همکاری را تکمیل کنید.
            </p>
          </div>
          <Link
            href="/careers"
            className="whitespace-nowrap rounded-full bg-brand-yellow px-6 py-2.5 text-sm font-extrabold text-[#12203f] shadow-lg transition hover:brightness-105 sm:px-8 sm:py-3"
          >
            همکاری با ما
          </Link>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-6 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-5 sm:mt-8 sm:flex-row sm:pt-6">
          <p className="text-center text-[10px] text-white/70 sm:text-right sm:text-xs">
            تمامی حقوق مادی و معنوی این وبسایت برای موسسه منادیان فتح ایرانیان محفوظ می‌باشد.
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
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
            className="relative z-10 flex flex-shrink-0 items-center justify-center text-[10px] font-bold text-white sm:text-xs lg:text-sm"
            style={{ width: ITEM_WIDTH }}
          >
            منادیان فتح ایرانیان
          </span>
        ))}
      </div>
    </div>
  );
}

// Icons remain the same...
function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7.58317 13.2707H2.9165C1.50484 13.2707 0.729004 12.4948 0.729004 11.0832V6.4165C0.729004 5.00484 1.50484 4.229 2.9165 4.229H5.83317C6.07234 4.229 6.27067 4.42734 6.27067 4.6665V11.0832C6.27067 12.0048 6.6615 12.3957 7.58317 12.3957C7.82234 12.3957 8.02067 12.594 8.02067 12.8332C8.02067 13.0723 7.82234 13.2707 7.58317 13.2707ZM2.9165 5.104C1.99484 5.104 1.604 5.49484 1.604 6.4165V11.0832C1.604 12.0048 1.99484 12.3957 2.9165 12.3957H5.7165C5.5065 12.0515 5.39567 11.614 5.39567 11.0832V5.104H2.9165Z" fill="white" />
      <path d="M5.83317 5.10433H2.9165C2.67734 5.10433 2.479 4.906 2.479 4.66683V3.50016C2.479 2.6135 3.1965 1.896 4.08317 1.896H5.89733C6.0315 1.896 6.15984 1.96015 6.24151 2.06515C6.32318 2.17598 6.35233 2.316 6.31733 2.44433C6.28233 2.57266 6.27067 2.7185 6.27067 2.91683V4.66683C6.27067 4.906 6.07234 5.10433 5.83317 5.10433ZM3.354 4.22933H5.39567V2.91683C5.39567 2.86433 5.39567 2.81766 5.39567 2.771H4.08317C3.68067 2.771 3.354 3.09766 3.354 3.50016V4.22933Z" fill="white" />
      <path d="M8.1665 8.02067C7.92734 8.02067 7.729 7.82234 7.729 7.58317V4.6665C7.729 4.42734 7.92734 4.229 8.1665 4.229C8.40567 4.229 8.604 4.42734 8.604 4.6665V7.58317C8.604 7.82234 8.40567 8.02067 8.1665 8.02067Z" fill="white" />
      <path d="M10.5 8.02067C10.2608 8.02067 10.0625 7.82234 10.0625 7.58317V4.6665C10.0625 4.42734 10.2608 4.229 10.5 4.229C10.7392 4.229 10.9375 4.42734 10.9375 4.6665V7.58317C10.9375 7.82234 10.7392 8.02067 10.5 8.02067Z" fill="white" />
      <path d="M10.4998 13.2707H8.1665C7.92734 13.2707 7.729 13.0723 7.729 12.8332V10.4998C7.729 9.93984 8.18984 9.479 8.74984 9.479H9.9165C10.4765 9.479 10.9373 9.93984 10.9373 10.4998V12.8332C10.9373 13.0723 10.739 13.2707 10.4998 13.2707ZM8.604 12.3957H10.0623V10.4998C10.0623 10.4182 9.99817 10.354 9.9165 10.354H8.74984C8.66817 10.354 8.604 10.4182 8.604 10.4998V12.3957Z" fill="white" />
      <path d="M3.5 10.3543C3.26083 10.3543 3.0625 10.156 3.0625 9.91683V7.5835C3.0625 7.34433 3.26083 7.146 3.5 7.146C3.73917 7.146 3.9375 7.34433 3.9375 7.5835V9.91683C3.9375 10.156 3.73917 10.3543 3.5 10.3543Z" fill="white" />
      <path d="M11.0835 13.2707H7.5835C6.17183 13.2707 5.396 12.4948 5.396 11.0832V2.9165C5.396 1.50484 6.17183 0.729004 7.5835 0.729004H11.0835C12.4952 0.729004 13.271 1.50484 13.271 2.9165V11.0832C13.271 12.4948 12.4952 13.2707 11.0835 13.2707ZM7.5835 1.604C6.66183 1.604 6.271 1.99484 6.271 2.9165V11.0832C6.271 12.0048 6.66183 12.3957 7.5835 12.3957H11.0835C12.0052 12.3957 12.396 12.0048 12.396 11.0832V2.9165C12.396 1.99484 12.0052 1.604 11.0835 1.604H7.5835Z" fill="white" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7.00018 8.266C5.75768 8.266 4.74268 7.25684 4.74268 6.0085C4.74268 4.76017 5.75768 3.75684 7.00018 3.75684C8.24268 3.75684 9.25768 4.766 9.25768 6.01434C9.25768 7.26267 8.24268 8.266 7.00018 8.266ZM7.00018 4.63184C6.24184 4.63184 5.61768 5.25017 5.61768 6.01434C5.61768 6.7785 6.23601 7.39684 7.00018 7.39684C7.76434 7.39684 8.38268 6.7785 8.38268 6.01434C8.38268 5.25017 7.75851 4.63184 7.00018 4.63184Z" fill="white" />
      <path d="M6.99998 13.2765C6.13665 13.2765 5.26748 12.9498 4.59081 12.3023C2.86998 10.6457 0.968314 8.00317 1.68581 4.859C2.33331 2.0065 4.82415 0.729004 6.99998 0.729004C6.99998 0.729004 6.99998 0.729004 7.00581 0.729004C9.18165 0.729004 11.6725 2.0065 12.32 4.86484C13.0316 8.009 11.13 10.6457 9.40915 12.3023C8.73248 12.9498 7.86331 13.2765 6.99998 13.2765ZM6.99998 1.604C5.30248 1.604 3.12081 2.50817 2.54331 5.0515C1.91331 7.799 3.63998 10.1673 5.20331 11.6665C6.21248 12.6407 7.79331 12.6407 8.80248 11.6665C10.36 10.1673 12.0866 7.799 11.4683 5.0515C10.885 2.50817 8.69748 1.604 6.99998 1.604Z" fill="white" />
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
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 hover:scale-105 sm:h-9 sm:w-9"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="6" width="19" height="12" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 9.5l5 2.5-5 2.5v-5z" fill="currentColor" />
    </svg>
  );
}