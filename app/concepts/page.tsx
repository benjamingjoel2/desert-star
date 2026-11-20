import Link from "next/link";
import Pic from "@/components/Pic";

const c = [
  ["1", "Quiet luxury", "Aman / Six Senses: ivory, small elegant serif, vast calm space.", "mosque-bluehour"],
  ["2", "Nightfall", "Dark cinematic: black and gold, full-screen film, slow fades.", "camp-lanterns"],
  ["3", "The magazine", "Editorial: masthead, cover lines, captions, asymmetric grid.", "camel-ride"],
  ["4", "Swiss bold", "Black and white grotesk grid, one sand accent, sharp and modern.", "dunes-cruiser"],
  ["5", "Terracotta", "Warm earth colour blocks, soft shapes, friendly boutique serif.", "desert-sunset"],
  ["6", "Gallery", "Photo-first: horizontal galleries, minimal words.", "camel-caravan"],
  ["7", "Expedition", "Route maps, coordinates and contour lines, outfitter style.", "camel-grazing"],
];

export default function Concepts() {
  return (
    <main className="min-h-svh bg-[#111] px-5 pb-20 pt-14 text-white lg:px-10">
      <p className="text-[12px] uppercase tracking-[0.2em] text-white/60">Desert Stars · 7 design directions</p>
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
