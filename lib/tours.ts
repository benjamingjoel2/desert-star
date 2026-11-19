import raw from "@/data/tours.json";
import type { CategorySlug } from "@/data/site";

export type Tour = {
  slug: string;
  title: string;
  category: CategorySlug;
  location: string;
  timing: string;
  adult: number | null;
  child: number | null;
  short: string;
  overview: string;
  highlights: string[];
  itinerary: string[];
  included: string[];
  excluded: string[];
  addons: { name: string; price: number }[];
  faq: { q: string; a: string }[];
  groupSize: string | null;
  images: string[];
};

export const tours = raw as Tour[];
export const getTour = (slug: string) => tours.find((t) => t.slug === slug);
export const byCategory = (c: CategorySlug) => tours.filter((t) => t.category === c);

export function price(t: Tour) {
  return t.adult ? `From AED ${t.adult.toLocaleString("en")}` : "Price on request";
}
