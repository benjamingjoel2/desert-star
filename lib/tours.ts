import raw from "@/data/tours.json";
import meta from "@/data/images.json";
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
  hero?: string;
};

export const tours = raw as Tour[];
export const getTour = (slug: string) => tours.find((t) => t.slug === slug);
export const byCategory = (c: CategorySlug) => tours.filter((t) => t.category === c);

export function price(t: Tour) {
  return t.adult ? `From AED ${t.adult.toLocaleString("en")}` : "Price on request";
}

/** The sharpest available photo for a tour: its high-res hero if built, else its first gallery photo. */
export function cover(t: Tour) {
  return t.hero && t.hero in meta ? t.hero : t.images[0];
}
