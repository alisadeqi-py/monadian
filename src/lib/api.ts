// URL to use when fetching from a Server Component (runs in the Next.js
// server process — inside the Docker network when containerized, so it
// must use the backend's container hostname, not localhost).
export const API_INTERNAL_URL =
  process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// URL to use when fetching from a Client Component (runs in the user's
// browser, so it must be reachable from the host, not the Docker network).
export const API_PUBLIC_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type HoldingCompany = {
  id: number;
  name: string;
  logo: string | null;
  description: string;
  url: string;
  order: number;
};

export type PortfolioImage = {
  id: number;
  image: string;
  caption: string;
  order: number;
};

export type PortfolioService = {
  id: number;
  title: string;
  order: number;
};

export type PortfolioItem = {
  id: number;
  category: string;
  title: string;
  image: string | null;
  description: string;
  video: string | null;
  aparat_src: string;
  images: PortfolioImage[];
  services: PortfolioService[];
  date: string;
  client: string;
  link: string;
  order: number;
};

// Image/logo fields come back as absolute URLs built from whatever host made
// the request — when fetched server-side that's the internal Docker
// hostname, which the browser can't resolve. Rewrite to the public URL so
// the images actually load once the HTML reaches the client.
function toPublicUrl(url: string | null): string | null {
  if (!url) return url;
  return url.replace(API_INTERNAL_URL, API_PUBLIC_URL);
}

export async function getHoldingCompanies(): Promise<HoldingCompany[]> {
  try {
    const res = await fetch(`${API_INTERNAL_URL}/api/holdings/`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`getHoldingCompanies: ${API_INTERNAL_URL}/api/holdings/ responded ${res.status}`);
      return [];
    }
    const data: HoldingCompany[] = await res.json();
    return data.map((h) => ({ ...h, logo: toPublicUrl(h.logo) }));
  } catch (err) {
    console.error(`getHoldingCompanies: fetch to ${API_INTERNAL_URL}/api/holdings/ threw`, err);
    return [];
  }
}

function normalizePortfolioItem(item: PortfolioItem): PortfolioItem {
  return {
    ...item,
    image: toPublicUrl(item.image),
    video: toPublicUrl(item.video),
    images: item.images.map((img) => ({
      ...img,
      image: toPublicUrl(img.image) as string,
    })),
  };
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const res = await fetch(`${API_INTERNAL_URL}/api/portfolio/`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`getPortfolioItems: ${API_INTERNAL_URL}/api/portfolio/ responded ${res.status}`);
      return [];
    }
    const data: PortfolioItem[] = await res.json();
    return data.map(normalizePortfolioItem);
  } catch (err) {
    console.error(`getPortfolioItems: fetch to ${API_INTERNAL_URL}/api/portfolio/ threw`, err);
    return [];
  }
}

export async function getPortfolioItem(id: number): Promise<PortfolioItem | null> {
  try {
    const res = await fetch(`${API_INTERNAL_URL}/api/portfolio/${id}/`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`getPortfolioItem: ${API_INTERNAL_URL}/api/portfolio/${id}/ responded ${res.status}`);
      return null;
    }
    const data: PortfolioItem = await res.json();
    return normalizePortfolioItem(data);
  } catch (err) {
    console.error(`getPortfolioItem: fetch to ${API_INTERNAL_URL}/api/portfolio/${id}/ threw`, err);
    return null;
  }
}
