import { getHoldingCompanies } from "@/lib/api";
import HoldingsAccordion from "./HoldingsAccordion";

export default async function Holdings() {
  const holdings = await getHoldingCompanies();

  return (
    <section className="flex min-h-screen w-full items-center bg-brand-dark py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h3 className="mb-6 flex items-center justify-start gap-2 text-lg font-bold text-white sm:text-xl">
          <CornerIcon />
          دیگر شرکت‌های هلدینگ ما
        </h3>

        <HoldingsAccordion holdings={holdings} />
      </div>
    </section>
  );
}

function CornerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
      <path
        d="M19 5v6a4 4 0 0 1-4 4H6M6 15l4-4M6 15l4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
