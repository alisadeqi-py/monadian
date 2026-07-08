import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const abar = localFont({
  src: [
    { path: "./fonts/abar/AbarMid-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/abar/AbarMid-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/abar/AbarMid-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/abar/AbarMid-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "./fonts/abar/AbarMid-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-abar",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "موسسه منادیان فتح ایرانیان",
  description: "موسسه منادیان فتح ایرانیان",
  openGraph: {
    title: "موسسه منادیان فتح ایرانیان",
    description: "موسسه منادیان فتح ایرانیان",
    url: siteUrl,
    locale: "fa_IR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={abar.variable}>
      <body className="antialiased font-vazir">{children}</body>
    </html>
  );
}
