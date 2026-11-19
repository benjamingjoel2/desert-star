import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Pic from "@/components/Pic";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "About", description: "Desert Stars is a Dubai tour house for desert safaris, dhow cruises and guided days across the Emirates." };

const values = [
  ["Door to door", "Every experience starts with a pick-up from your hotel or residence in Dubai and ends with a drive home."],
  ["Small vehicles", "Premium safaris travel in air-conditioned 4x4s with up to six guests, or a vehicle of your own on request."],
  ["One concierge", "One team plans the day, answers within 30 minutes and stays reachable while you're out in the desert."],
  ["Flexible", "Free cancellation up to 24 hours before. Vegetarian, vegan and halal menus are standard at camp."],
];

export default function About() {
  return (
    <>
      <PageHead
        eyebrow="About Desert Stars"
        title={<>Companions in <em>discovery</em></>}
        intro="We plan journeys through the heart of the Emirates: the red dunes of Lehbab, the old quarters of Dubai Creek, the Grand Mosque in Abu Dhabi and the oases of Al Ain. Authentic, seamless and exciting from the first message to the drive home."
      />
      <div className="relative aspect-[16/8] max-h-[80svh] overflow-hidden bg-dune"><div className="absolute inset-0" data-parallax="0.15"><Pic name="self-drive-1" sizes="100vw" alt="A lone 4x4 among orange dunes at sunset" /></div></div>
      <section className="px-page grid gap-10 py-24 lg:grid-cols-[1fr_2fr] lg:py-32">
        <p className="eyebrow text-muted">How we travel</p>
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {values.map(([h, p]) => (
            <div key={h} className="reveal border-t border-line pt-6">
              <h2 className="title text-[26px]">{h}</h2>
              <p className="mt-3 text-muted">{p}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-night text-sand">
        <dl className="px-page grid grid-cols-2 gap-y-10 py-20 lg:grid-cols-4">
          {site.stats.map((s) => (
            <div key={s.label}><dd className="display text-[48px] lg:text-[64px]" data-count={/\d/.test(s.value) && !s.value.includes("/") ? s.value : undefined}>{s.value}</dd><dt className="eyebrow mt-2 text-sand/65">{s.label}</dt></div>
          ))}
        </dl>
      </section>
      <section className="px-page grid gap-10 py-24 lg:grid-cols-[1.6fr_1fr] lg:py-32">
        <h2 className="display text-[40px] lg:text-[60px]">Every journey has a story. Let yours begin in the dunes.</h2>
        <div className="self-end"><Link href="/experiences" className="btn btn-dark">Discover the experiences</Link></div>
      </section>
    </>
  );
}
