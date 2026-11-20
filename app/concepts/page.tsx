import Link from "next/link";
import Pic from "@/components/Pic";

const c = [
  ["1", "Balanced · light", "White Desert's light world with Mathieu Crepel's split headlines, chips and photo column.", "dunes-cruiser"],
  ["2", "Balanced · night", "Mathieu Crepel's dark world: growing hero card, giant links, with White Desert's trips and camps.", "camp-lanterns"],
  ["3", "Day to night", "Starts in White Desert daylight, steps down into Mathieu Crepel's night.", "desert-sunset"],
  ["4", "Crepel-first", "Mathieu Crepel's page section by section, recoloured for the desert.", "camel-caravan"],
  ["5", "White Desert-first", "White Desert's page section by section, with Crepel's labels and one split headline.", "camel-grazing"],
  ["6", "Monumental type", "Both sites' giant type leading every section.", "camel-ride"],
  ["7", "Cinematic", "Both sites' full-screen photo moments, minimal words.", "mosque-bluehour"],
];

export default function Concepts() {
  return (
    <main className="min-h-svh bg-[#111] px-5 pb-20 pt-14 text-white lg:px-10">
      <p className="text-[12px] uppercase tracking-[0.2em] text-white/60">Desert Stars · 7 variations of mathieu-crepel.com × white-desert.com</p>
      <h1 className="mt-4 text-[44px] leading-none lg:text-[72px]">Pick one.</h1>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {c.map(([n, name, note, img]) => (
          <Link key={n} href={`/concepts/${n}`} className="group block">
            <div className="aspect-[4/5] overflow-hidden"><Pic name={img} sizes="(min-width:1024px) 25vw, 50vw" className="transition-transform duration-700 group-hover:scale-105" /></div>
            <p className="mt-4 text-[12px] uppercase tracking-[0.2em] text-white/60">Design {n}</p>
            <h2 className="mt-1 text-[26px]">{name}</h2>
            <p className="mt-1 text-[14px] text-white/70">{note}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
