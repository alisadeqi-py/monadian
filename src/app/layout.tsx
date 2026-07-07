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

export const metadata: Metadata = {
  title: "موسسه منادیان فتح ایرانیان",
  description: "موسسه منادیان فتح ایرانیان",
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
