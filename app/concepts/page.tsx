import Link from "next/link";
import Pic from "@/components/Pic";

const concepts = [
  { href: "/concepts/dark", n: "01", name: "Dark & cinematic", note: "Night-first. Deep indigo, warm gold, full-screen film moments and a scroll-told evening in the desert.", img: "standard-sunset-2" },
  { href: "/concepts/white", n: "02", name: "White Desert, bolder", note: "Monumental uppercase type, a giant wordmark, expanding photo panels and wide, quiet white space.", img: "self-drive-2" },
  { href: "/concepts/editorial", n: "03", name: "Editorial magazine", note: "A travel-magazine cover and contents, asymmetric grids, photo essay and a full index of every experience.", img: "combo-3in1-3" },
];

export default function Concepts() {
  return (
    <main className="px-page min-h-svh bg-night pb-16 pt-16 text-sand">
      <p className="eyebrow text-sand/60">Desert Stars · Design concepts</p>
      <h1 className="display mt-6 max-w-[16ch] text-[44px] lg:text-[80px]">Three directions. <em>Pick one.</em></h1>
      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {concepts.map((c) => (
          <Link key={c.href} href={c.href} className="group block">
            <div className="zoom aspect-[4/5] overflow-hidden"><Pic name={c.img} sizes="(min-width:1024px) 33vw, 100vw" /></div>
            <p className="eyebrow mt-5 text-sand/60">Concept {c.n}</p>
            <h2 className="title mt-2 text-[30px]">{c.name}</h2>
            <p className="mt-2 max-w-sm text-sand/70">{c.note}</p>
            <span className="u-link mt-5">Open concept</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
