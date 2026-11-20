import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import TourCard from "@/components/TourCard";
import Split from "@/components/Split";
import { categories } from "@/data/site";
import { byCategory, tours } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Desert safaris in Lehbab, dhow dinner cruises, and guided days in Dubai, Abu Dhabi, Al Ain and Sharjah.",
};

export default function Experiences() {
  return (
    <>
      <PageHead
        eyebrow={`${tours.length} experiences`}
        title={<>Desert, city <em>and water</em></>}
        intro="Every experience includes pick-up from your hotel or residence in Dubai unless noted, and free cancellation up to 24 hours before."
      />
      <nav aria-label="Categories" className="px-page sticky top-[68px] z-30 border-y border-line bg-sand/95 backdrop-blur">
        <ul className="no-scrollbar flex gap-8 overflow-x-auto py-4 text-[13px] tracking-[0.04em]">
          {categories.map((c) => (
            <li key={c.slug} className="shrink-0"><a href={`#${c.slug}`} className="u-link">{c.name}</a></li>
          ))}
        </ul>
      </nav>
      {categories.map((c) => (
        <section key={c.slug} id={c.slug} className="px-page scroll-mt-32 border-b border-line py-20 lg:py-28">
          <div className="mb-12 grid gap-4 lg:grid-cols-[1fr_2fr]">
            <h2 className="display text-[40px] lg:text-[64px]"><Split>{c.name}</Split></h2>
            <p className="title max-w-xl text-[24px] text-muted lg:pt-4">{c.blurb}</p>
          </div>
          <div className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {byCategory(c.slug).map((t) => <TourCard key={t.slug} t={t} />)}
          </div>
        </section>
      ))}
    </>
  );
}
