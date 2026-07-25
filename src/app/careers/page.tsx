import type { Metadata } from "next";
import PortfolioSlideShow from "@/components/PortfolioSlideShow";
import PortfolioSlide from "@/components/PortfolioSlide";
import CareersHero from "@/components/CareersHero";
import CareersForm from "@/components/CareersForm";

export const metadata: Metadata = {
  title: "همکاری با ما | موسسه منادیان فتح ایرانیان",
  description:
    "به تیم موسسه منادیان فتح ایرانیان بپیوندید. فرصت‌های همکاری حضوری و دورکاری در حوزه‌های مختلف را مشاهده و درخواست همکاری خود را ثبت کنید.",
  openGraph: {
    title: "همکاری با ما | موسسه منادیان فتح ایرانیان",
    description:
      "به تیم موسسه منادیان فتح ایرانیان بپیوندید و درخواست همکاری خود را ثبت کنید.",
    type: "website",
  },
};

export default function CareersPage() {
  return (
    <PortfolioSlideShow>
      <PortfolioSlide index={0}>
        <CareersHero />
      </PortfolioSlide>
      <PortfolioSlide index={1}>
        <CareersForm />
      </PortfolioSlide>
    </PortfolioSlideShow>
  );
}
