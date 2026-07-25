import type { MetadataRoute } from "next";
import { getPortfolioItems } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.example";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await getPortfolioItems();

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/careers`, changeFrequency: "monthly", priority: 0.7 },
    ...items.map((item) => ({
      url: `${siteUrl}/portfolio/${item.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
