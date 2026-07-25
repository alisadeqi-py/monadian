"use client";

import Image from "next/image";
import { useState } from "react";

const MESSENGERS = ["تلگرام", "اینستاگرام", "بله", "ایتا", "سروش", "واتساپ", "همه موارد"];
const MARITAL_OPTIONS = ["مجرد", "متأهل", "سایر"];
const ROLE_OPTIONS = [
  "گرافیک دیزاینر(تدوین-گرافیک-موشن)",
  "حسابدار",
  "ادمین فضای مجازی",
  "مدیر پیگیری،نظارت و اجرایی",
  "نیروی خدماتی(آشپز و نظافت)",
  "تصویربردار و عکاس",
];

const DIGIT_MAP: Record<string, string> = {
  "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9",
  "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
};

function normalizeDigits(input: string) {
  return input.replace(/[۰-۹٠-٩]/g, (d) => DIGIT_MAP[d] ?? d);
}

function isValidIranMobile(raw: string) {
  const digits = normalizeDigits(raw).replace(/[\s-]/g, "");
  return /^(?:\+98|0098|98|0)?9\d{9}$/.test(digits);
}

type Status = "idle" | "loading" | "success" | "error";
type Errors = Partial<
  Record<
    | "fullName"
    | "age"
    | "phone"
    | "messengers"
    | "virtualContact"
    | "maritalStatus"
    | "education"
    | "roles",
    string
  >
>;

function BackgroundLayer() {
  return (
    <>
      <Image
        src="/assets/careers-office-bg.jpg"
        alt=""
        fill
        aria-hidden="true"
        className="scale-110 object-cover blur-[10px]"
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
    </>
  );
}

export default function CareersForm() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [messengers, setMessengers] = useState<string[]>([]);
  const [virtualContact, setVirtualContact] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [education, setEducation] = useState("");
  const [roles, setRoles] = useState<string[]>([]);

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const toggle = (list: string[], setList: (v: string[]) => void, value: string, max?: number) => {
    setList(
      list.includes(value)
        ? list.filter((v) => v !== value)
        : max && list.length >= max
          ? list
          : [...list, value]
    );
  };

  const validate = (): boolean => {
    const next: Errors = {};
    const ageNum = Number(normalizeDigits(age));

    if (!fullName.trim()) next.fullName = "لطفاً نام و نام خانوادگی را وارد کنید.";
    if (!age.trim() || !Number.isInteger(ageNum) || ageNum < 10 || ageNum > 90) {
      next.age = "سن را به‌صورت عدد صحیح و معتبر وارد کنید.";
    }
    if (!phone.trim() || !isValidIranMobile(phone)) {
      next.phone = "شماره تلفن همراه معتبر وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹).";
    }
    if (messengers.length === 0) next.messengers = "حداقل یک پیام‌رسان را انتخاب کنید.";
    if (!virtualContact.trim()) next.virtualContact = "لطفاً شماره تماس مجازی را وارد کنید.";
    if (!maritalStatus) next.maritalStatus = "وضعیت تأهل را انتخاب کنید.";
    if (!education.trim()) next.education = "لطفاً میزان تحصیلات را وارد کنید.";
    if (roles.length === 0) next.roles = "حداقل یک گزینه را انتخاب کنید.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName.trim(),
          age: Number(normalizeDigits(age)),
          phone_number: normalizeDigits(phone).replace(/[\s-]/g, ""),
          messengers,
          virtual_contact: virtualContact.trim(),
          marital_status: maritalStatus,
          education: education.trim(),
          desired_roles: roles,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") return <SuccessState />;

  return (
    <section
      id="careers-form"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:py-3"
    >
      <BackgroundLayer />

      <div className="relative z-10 mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <div className="mb-6 text-center sm:mb-8 lg:mb-3">
          <span className="inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md sm:text-sm lg:hidden">
            فرم همکاری
          </span>
          <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl lg:mt-0 lg:text-3xl">
            فرم درخواست همکاری
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/70 sm:text-base lg:hidden">
            اطلاعات زیر را با دقت تکمیل کنید؛ تیم منابع انسانی ما پس از بررسی در
            اسرع وقت با شما تماس خواهد گرفت.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          dir="rtl"
          className="rounded-[24px] border border-white/15 bg-white/[0.08] p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-[18px] sm:p-10 lg:p-6"
        >
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-3">
            <div className="grid gap-5 sm:grid-cols-3 sm:gap-4 lg:col-span-2">
              <Field className="sm:col-span-2" label="نام و نام خانوادگی" required error={errors.fullName}>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثلاً علی محمدی"
                  dir="rtl"
                  className={inputClass(!!errors.fullName)}
                />
              </Field>

              <Field label="سن" required error={errors.age}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="۲۵"
                  dir="rtl"
                  className={inputClass(!!errors.age)}
                />
              </Field>
            </div>

            <Field label="شماره تلفن" required error={errors.phone}>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09123456789"
                dir="ltr"
                className={`${inputClass(!!errors.phone)} text-left`}
              />
            </Field>

            <Field label="وضعیت تأهل" required error={errors.maritalStatus}>
              <div className="flex flex-wrap gap-2.5">
                {MARITAL_OPTIONS.map((m) => (
                  <ToggleOption
                    key={m}
                    type="radio"
                    label={m}
                    checked={maritalStatus === m}
                    onChange={() => setMaritalStatus(m)}
                  />
                ))}
              </div>
            </Field>

            <Field className="lg:col-span-2" label="چه پیام‌رسان‌های فعالی داری؟" required error={errors.messengers}>
              <div className="flex flex-wrap gap-2.5">
                {MESSENGERS.map((m) => (
                  <ToggleOption
                    key={m}
                    label={m}
                    checked={messengers.includes(m)}
                    onChange={() => toggle(messengers, setMessengers, m)}
                  />
                ))}
              </div>
            </Field>

            <Field label="شماره تماس مجازی با ذکر نام پیام‌رسان" required error={errors.virtualContact}>
              <textarea
                value={virtualContact}
                onChange={(e) => setVirtualContact(e.target.value)}
                placeholder={"تلگرام: 09000000000\nواتساپ: 09120000000"}
                dir="rtl"
                rows={2}
                className={`${inputClass(!!errors.virtualContact)} resize-y`}
              />
            </Field>

            <Field label="میزان تحصیلات، رشته و نام دانشگاه" required error={errors.education}>
              <textarea
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder={"کارشناسی مهندسی کامپیوتر\nدانشگاه تهران"}
                dir="rtl"
                rows={2}
                className={`${inputClass(!!errors.education)} resize-y`}
              />
            </Field>

            <Field className="lg:col-span-2" label="کدام همکاری مد نظر شماست." required error={errors.roles}>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {ROLE_OPTIONS.map((r) => (
                  <ToggleOption
                    key={r}
                    label={r}
                    checked={roles.includes(r)}
                    onChange={() => toggle(roles, setRoles, r)}
                  />
                ))}
              </div>
            </Field>
          </div>

          {status === "error" && (
            <p className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-200">
              خطایی رخ داد، لطفاً دوباره تلاش کنید.
            </p>
          )}

          <SubmitButton status={status} />
        </form>
      </div>
    </section>
  );
}

function SubmitButton({ status }: { status: Status }) {
  return (
    <button
      type="submit"
      disabled={status === "loading"}
      className="mt-6 flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-brand-blue to-indigo-600 text-base font-bold text-white shadow-lg shadow-brand-blue/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-blue/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 lg:mt-5"
    >
      {status === "loading" ? (
        <>
          <SpinnerIcon />
          <span>در حال ارسال...</span>
        </>
      ) : (
        "ارسال درخواست همکاری"
      )}
    </button>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-[14px] border bg-white/[0.08] px-4 py-3 text-right text-sm font-medium text-white placeholder-white/65 backdrop-blur-[12px] transition-all duration-[250ms] hover:bg-white/[0.12] focus:bg-white/[0.12] focus:outline-none sm:px-5 sm:py-3.5 sm:text-base ${
    hasError
      ? "border-red-400/50 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(248,113,113,0.15)]"
      : "border-white/15 focus:border-blue-400 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.2)]"
  }`;
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-right text-sm font-semibold text-white sm:text-base">
      {children}
      {required && <span className="mr-1 text-red-300">*</span>}
    </label>
  );
}

function ErrorText({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-1.5 text-right text-xs font-medium text-red-300">{children}</p>;
}

function Field({
  label,
  required,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-2">
        <FieldLabel required={required}>{label}</FieldLabel>
      </div>
      {children}
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

function ToggleOption({
  label,
  checked,
  onChange,
  type = "checkbox",
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  type?: "checkbox" | "radio";
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-right text-sm font-medium backdrop-blur-[12px] transition-all duration-[250ms] sm:text-base ${
        checked
          ? "border-blue-400/60 bg-blue-500/20 text-white"
          : "border-white/15 bg-white/[0.06] text-white/70 hover:bg-white/[0.12] hover:text-white"
      }`}
    >
      <span
        className={`flex h-4 w-4 flex-shrink-0 items-center justify-center border-2 transition-colors ${
          type === "radio" ? "rounded-full" : "rounded-md"
        } ${checked ? "border-blue-400 bg-blue-500" : "border-white/25 bg-white/5"}`}
      >
        {checked &&
          (type === "radio" ? (
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          ) : (
            <CheckIcon />
          ))}
      </span>
      {label}
    </button>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12l6 6L20 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-90" d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SuccessState() {
  return (
    <section
      id="careers-form"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-14 text-center"
    >
      <BackgroundLayer />

      <div className="relative z-10 flex flex-col items-center gap-5 rounded-[24px] border border-white/15 bg-white/[0.08] p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-[18px] sm:p-14">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-400/15 text-green-300 ring-1 ring-green-400/30">
          <CheckBigIcon />
        </span>
        <h2 className="text-xl font-extrabold text-white sm:text-2xl">
          درخواست شما ثبت شد
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
          از علاقه شما به همکاری با موسسه منادیان فتح ایرانیان سپاسگزاریم. کارشناسان ما
          پس از بررسی، در اسرع وقت با شما تماس خواهند گرفت.
        </p>
      </div>
    </section>
  );
}

function CheckBigIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12l6 6L20 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
