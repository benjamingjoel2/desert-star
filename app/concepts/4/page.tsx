import Link from "next/link";
import { Archivo, JetBrains_Mono } from "next/font/google";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import { tours, getTour, price } from "@/lib/tours";
import { site, waLink, categories } from "@/data/site";
import { posts } from "@/data/journal";

const display = Archivo({ subsets: ["latin"], weight: ["400", "500", "700", "800", "900"], variable: "--d4-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--d4-mono" });

export const metadata = { title: "Design 4 · Swiss bold" };

const D = "font-[family-name:var(--d4-display)]";
const M = "font-[family-name:var(--d4-mono)]";
const pad = "px-5 md:px-10";
const label = `${M} text-[11px] uppercase tracking-[0.08em]`;

const nav = [
  { href: "/experiences", label: "Experiences" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/enquire", label: "Enquire" },
];

const catName: Record<string, string> = Object.fromEntries(categories.map((c) => [c.slug, c.name]));
const catCaption: Record<string, string> = {
  desert: "Lehbab · 24°58′N 55°36′E",
  city: "Abu Dhabi · 24°24′N 54°28′E",
  cruises: "Dubai Marina · 25°04′N 55°08′E",
  attractions: "Downtown · 25°11′N 55°16′E",
};

function SectionHead({ n, title, aside }: { n: string; title: string; aside?: string }) {
  return (
    <div className="grid grid-cols-12 gap-x-5 border-t border-[#0e0e0e] pt-3">
      <span className={`${label} col-span-2 md:col-span-1`}>{n}</span>
      <span className={`${label} col-span-6 md:col-span-5`}>{title}</span>
      {aside && <span className={`${label} col-span-4 text-right md:col-span-6 text-[#0e0e0e]/55`}>{aside}</span>}
    </div>
  );
}

export default function Page() {
  const evening = getTour("premium-evening-desert-safari");
  const steps = (evening?.itinerary ?? []).slice(0, 6);

  return (
    <div className={`${display.variable} ${mono.variable} ${D} min-h-screen overflow-x-clip bg-[#f2f2ef] text-[#0e0e0e] antialiased selection:bg-[#d39b5a] selection:text-[#0e0e0e]`}>
      {/* ───────── Header ───────── */}
      <header className={`${pad} sticky top-0 z-40 border-b border-[#0e0e0e]/15 bg-[#f2f2ef]/90 backdrop-blur-md`}>
        <div className="grid h-16 grid-cols-12 items-center gap-x-5">
          <Link href="/concepts/4" className="col-span-6 flex items-baseline gap-2 md:col-span-3">
            <span className="text-[19px] font-extrabold uppercase tracking-[-0.04em]">Desert Stars</span>
            <span className={`${M} hidden text-[10px] text-[#0e0e0e]/50 sm:inline`}>DXB</span>
          </Link>
          <nav className="col-span-6 hidden items-center gap-8 md:flex" aria-label="Primary">
            {nav.map((l, i) => (
              <Link key={l.href} href={l.href} className={`${label} group flex gap-1.5 hover:text-[#d39b5a]`}>
                <span className="text-[#0e0e0e]/40 group-hover:text-[#d39b5a]">0{i + 1}</span>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="col-span-6 flex justify-end md:col-span-3">
            <Link
              href="/enquire"
              className={`${label} inline-flex h-10 items-center gap-3 bg-[#0e0e0e] px-4 text-[#f2f2ef] transition-colors hover:bg-[#d39b5a] hover:text-[#0e0e0e]`}
            >
              Enquire <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
        <nav className="-mx-5 flex gap-6 overflow-x-auto border-t border-[#0e0e0e]/10 px-5 py-2.5 md:hidden" aria-label="Primary mobile">
          {nav.map((l, i) => (
            <Link key={l.href} href={l.href} className={`${label} shrink-0`}>
              <span className="text-[#0e0e0e]/40">0{i + 1}</span> {l.label}
            </Link>
          ))}
        </nav>
      </header>

      <main>
        {/* ───────── 01 Hero ───────── */}
        <section className={`${pad} pt-6 md:pt-10`}>
          <div className={`${label} grid grid-cols-12 gap-x-5 text-[#0e0e0e]/60`}>
            <span className="col-span-6 md:col-span-3">(01) Index</span>
            <span className="col-span-6 text-right md:col-span-3 md:text-left">Dubai 25°12′N 55°16′E</span>
            <span className="hidden md:col-span-3 md:block">Lehbab red dunes · 45 min</span>
            <span className="hidden text-right md:col-span-3 md:block">Est. guests {site.stats[0].value}</span>
          </div>

          <h1 className="sr-only">Where the dunes meet the stars: private Dubai desert safaris</h1>

          <p
            aria-hidden
            className="relative z-10 mt-8 text-[clamp(3.4rem,13.4vw,15.5rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-white mix-blend-difference md:mt-10"
          >
            <Split>Where the dunes</Split>
          </p>

          <div className="relative -mt-[0.9rem] grid grid-cols-12 gap-x-5 md:-mt-[2.4vw]">
            <div className="order-2 col-span-12 mt-5 flex flex-col justify-between gap-6 md:order-1 md:col-span-3 md:mt-[3vw]">
              <p className="reveal max-w-[30ch] text-[17px] font-medium leading-[1.35] tracking-[-0.01em] md:text-[19px]">
                Private desert safaris from your door in Dubai to the Lehbab red dunes, a lantern-lit Bedouin camp and a sky that empties of city light.
              </p>
              <dl className={`${label} reveal hidden border-t border-[#0e0e0e] md:block`}>
                {[
                  ["Pick-up", "Your door, Dubai"],
                  ["Dunes", "Lehbab, red sand"],
                  ["Dinner", "BBQ at camp"],
                  ["Shows", "Tanoura · Fire"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-[#0e0e0e]/15 py-2">
                    <dt className="text-[#0e0e0e]/50">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure className="order-1 col-span-12 md:order-2 md:col-span-9">
              <div className="hero-zoom relative aspect-[4/5] overflow-hidden bg-[#0e0e0e] sm:aspect-[16/10] md:aspect-[16/8.4]">
                <Pic name="dunes-cruiser" sizes="(min-width: 768px) 75vw, 100vw" alt="Land cruiser cresting a red dune outside Dubai" priority />
                <span className={`${label} absolute bottom-3 left-3 bg-[#f2f2ef] px-2 py-1`}>Fig. 01</span>
              </div>
              <figcaption className={`${label} mt-2 flex justify-between text-[#0e0e0e]/60`}>
                <span>Lehbab · 24°58′N 55°36′E</span>
                <span>16:42 GST</span>
              </figcaption>
            </figure>
          </div>

          <p
            aria-hidden
            className="relative z-10 -mt-[1.1em] text-right text-[clamp(3.4rem,13.4vw,15.5rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-white mix-blend-difference max-md:mt-6 md:-mt-[0.42em]"
          >
            <Split delay={250}>Meet the stars</Split>
          </p>

          <div className="mt-10 grid grid-cols-12 gap-x-5 gap-y-6 border-t border-[#0e0e0e] pt-4 md:mt-14">
            <p className={`${label} col-span-12 md:col-span-3`}>
              <span className="text-[#d39b5a]">●</span> {site.response}
            </p>
            <div className="col-span-12 flex flex-wrap gap-x-8 gap-y-3 md:col-span-6 md:col-start-7 md:justify-end">
              <Link href="/experiences" className="group inline-flex items-baseline gap-3 text-[22px] font-bold uppercase tracking-[-0.03em] md:text-[28px]">
                <span className="border-b-2 border-[#0e0e0e] group-hover:border-[#d39b5a] group-hover:text-[#d39b5a]">View experiences</span>
                <span aria-hidden className="text-[#d39b5a]">→</span>
              </Link>
              <a href={waLink("Hello Desert Stars, I'd like to plan a desert safari.")} className="group inline-flex items-baseline gap-3 text-[22px] font-bold uppercase tracking-[-0.03em] text-[#0e0e0e]/55 hover:text-[#0e0e0e] md:text-[28px]">
                WhatsApp <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ───────── 02 Numbers ───────── */}
        <section className={`${pad} pt-24 md:pt-40`}>
          <SectionHead n="02" title="In numbers" aside="Since day one" />
          <div className="grid grid-cols-2 md:grid-cols-4">
            {site.stats.map((s, i) => (
              <div
                key={s.label}
                className={`reveal flex min-h-[180px] flex-col justify-between border-[#0e0e0e]/15 py-5 md:min-h-[300px] md:py-6 ${i % 2 ? "border-l pl-4 md:pl-5" : "md:pl-0"} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l md:pl-5" : ""}`}
                style={{ ["--d" as string]: `${i * 90}ms` }}
              >
                <span className={`${label} text-[#0e0e0e]/50`}>({String(i + 1).padStart(2, "0")})</span>
                <div>
                  <p className={`text-[clamp(3rem,8.6vw,9.5rem)] font-black leading-[0.8] tracking-[-0.06em] ${i === 0 ? "text-[#d39b5a]" : ""}`}>{s.value}</p>
                  <p className={`${label} mt-3`}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── 03 The evening ───────── */}
        <section className={`${pad} pt-24 md:pt-40`}>
          <SectionHead n="03" title="The evening, in order" aside={evening ? price(evening) : undefined} />
          <div className="mt-10 grid grid-cols-12 gap-x-5 gap-y-10 md:mt-16">
            <h2 className="col-span-12 text-[clamp(2.6rem,7.4vw,8.5rem)] font-black uppercase leading-[0.86] tracking-[-0.05em] md:col-span-8">
              <Split>Red dunes, low sun, a camp lit by lanterns.</Split>
            </h2>
            <p className="reveal col-span-12 self-end text-[17px] leading-[1.45] text-[#0e0e0e]/75 md:col-span-3 md:col-start-10">
              {evening?.short}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-12 gap-x-5 gap-y-8 md:mt-20">
            <figure className="col-span-12 md:col-span-7">
              <div className="reveal-img relative aspect-[4/3] overflow-hidden bg-[#0e0e0e]">
                <Pic name="camel-caravan" sizes="(min-width: 768px) 58vw, 100vw" alt="Camel caravan crossing the dunes at golden hour" />
              </div>
              <figcaption className={`${label} mt-2 flex justify-between text-[#0e0e0e]/60`}>
                <span>Fig. 02 — Camel caravan</span>
                <span>Golden hour</span>
              </figcaption>
            </figure>
            <ol className="col-span-12 md:col-span-5">
              {steps.map((s, i) => (
                <li key={i} className="reveal grid grid-cols-[3.2rem_1fr] gap-x-3 border-t border-[#0e0e0e]/20 py-4 first:border-[#0e0e0e]" style={{ ["--d" as string]: `${i * 60}ms` }}>
                  <span className={`${M} text-[13px] text-[#d39b5a]`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[16px] leading-[1.4] md:text-[17px]">{s}</span>
                </li>
              ))}
              {evening && (
                <li className="border-t border-[#0e0e0e] pt-5">
                  <Link href={`/experiences/${evening.slug}`} className="group flex items-baseline justify-between gap-4">
                    <span className="text-[20px] font-bold uppercase tracking-[-0.03em] group-hover:text-[#d39b5a]">See the full itinerary</span>
                    <span className={`${label}`}>{price(evening)} →</span>
                  </Link>
                </li>
              )}
            </ol>
          </div>

          {/* triptych */}
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 md:mt-20 md:grid-cols-12">
            {[
              { n: "combo-mosque-3", c: "Tanoura dancer", k: "col-span-1 md:col-span-3", a: "aspect-[3/4]" },
              { n: "standard-sunset-3", c: "Fire show", k: "col-span-1 md:col-span-3 md:mt-24", a: "aspect-[3/4]" },
              { n: "combo-3in1-3", c: "Falcon encounter", k: "col-span-2 md:col-span-5 md:col-start-8", a: "aspect-[4/3] md:aspect-[4/5]" },
            ].map((f, i) => (
              <figure key={f.n} className={f.k}>
                <div className={`reveal-img relative overflow-hidden bg-[#0e0e0e] ${f.a}`} style={{ ["--d" as string]: `${i * 120}ms` }}>
                  <Pic name={f.n} sizes="(min-width: 768px) 30vw, 50vw" alt={f.c} />
                </div>
                <figcaption className={`${label} mt-2 flex justify-between text-[#0e0e0e]/60`}>
                  <span>Fig. 0{i + 3}</span>
                  <span>{f.c}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ───────── 04 Experiences index ───────── */}
        <section className={`${pad} pt-24 md:pt-40`} id="index">
          <SectionHead n="04" title="Experiences index" aside={`${tours.length} listed`} />
          <div className="mt-10 grid grid-cols-12 items-end gap-x-5 gap-y-6 md:mt-16">
            <h2 className="col-span-12 text-[clamp(2.8rem,9vw,10rem)] font-black uppercase leading-[0.84] tracking-[-0.055em] md:col-span-7">
              <Split>Every route</Split>
            </h2>
            <nav className="col-span-12 flex flex-wrap gap-x-6 gap-y-2 md:col-span-5 md:justify-end" aria-label="Filter by category">
              <Link href="/experiences" className={`${label} border-b-2 border-[#d39b5a] pb-1`}>
                All <sup className="text-[#0e0e0e]/50">{tours.length}</sup>
              </Link>
              {categories.map((c) => (
                <Link key={c.slug} href={`/experiences#${c.slug}`} className={`${label} border-b-2 border-transparent pb-1 text-[#0e0e0e]/55 hover:border-[#0e0e0e] hover:text-[#0e0e0e]`}>
                  {c.name} <sup>{tours.filter((t) => t.category === c.slug).length}</sup>
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-8 md:mt-12">
            <div className={`${label} hidden grid-cols-12 gap-x-5 border-b border-[#0e0e0e] pb-2 text-[#0e0e0e]/50 md:grid`}>
              <span className="col-span-1">No.</span>
              <span className="col-span-5">Experience</span>
              <span className="col-span-2">Category</span>
              <span className="col-span-2">Location / Timing</span>
              <span className="col-span-2 text-right">Price</span>
            </div>
            <ul>
              {tours.map((t, i) => (
                <li key={t.slug} className="border-b border-[#0e0e0e]/15">
                  <Link
                    href={`/experiences/${t.slug}`}
                    className="group grid grid-cols-12 items-baseline gap-x-5 gap-y-1 py-4 transition-colors hover:bg-[#0e0e0e] hover:text-[#f2f2ef] md:-mx-3 md:px-3 md:py-5"
                  >
                    <span className={`${M} col-span-2 text-[12px] text-[#0e0e0e]/45 group-hover:text-[#d39b5a] md:col-span-1`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="col-span-10 text-[19px] font-bold leading-[1.1] tracking-[-0.025em] md:col-span-5 md:text-[24px]">{t.title}</span>
                    <span className={`${label} col-span-10 col-start-3 text-[#0e0e0e]/60 group-hover:text-[#f2f2ef]/70 md:col-span-2 md:col-start-auto`}>{catName[t.category]}</span>
                    <span className={`${label} col-span-10 col-start-3 text-[#0e0e0e]/60 group-hover:text-[#f2f2ef]/70 md:col-span-2 md:col-start-auto`}>
                      {t.location}
                      <span className="block normal-case tracking-normal text-[#0e0e0e]/40 group-hover:text-[#f2f2ef]/50">{t.timing}</span>
                    </span>
                    <span className={`${M} col-span-10 col-start-3 text-[13px] md:col-span-2 md:col-start-auto md:text-right`}>
                      {price(t)} <span aria-hidden className="ml-1 inline-block transition-transform group-hover:translate-x-1 group-hover:text-[#d39b5a]">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── 05 Categories ───────── */}
        <section className={`${pad} pt-24 md:pt-40`}>
          <SectionHead n="05" title="Four ways in" aside="Dubai · Abu Dhabi · Al Ain · Sharjah" />
          <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 md:mt-16 md:grid-cols-12">
            {categories.map((c, i) => (
              <Link
                key={c.slug}
                href={`/experiences#${c.slug}`}
                className={`group block ${["md:col-span-7", "md:col-span-5 md:mt-32", "md:col-span-5", "md:col-span-7 md:-mt-32"][i]}`}
              >
                <div className={`reveal-img zoom relative overflow-hidden bg-[#0e0e0e] ${i === 0 || i === 3 ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
                  <Pic name={c.image} sizes="(min-width: 768px) 55vw, (min-width: 640px) 50vw, 100vw" alt={c.name} />
                  <span className={`${M} absolute left-3 top-3 bg-[#f2f2ef] px-2 py-1 text-[11px]`}>{String(i + 1).padStart(2, "0")}/04</span>
                </div>
                <div className={`${label} mt-2 flex justify-between text-[#0e0e0e]/55`}>
                  <span>{catCaption[c.slug]}</span>
                  <span>{tours.filter((t) => t.category === c.slug).length} routes</span>
                </div>
                <div className="mt-3 flex items-start justify-between gap-6 border-t border-[#0e0e0e] pt-3">
                  <h3 className="text-[clamp(1.9rem,3.4vw,3.4rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.045em] group-hover:text-[#d39b5a]">{c.name}</h3>
                  <span aria-hidden className="text-[28px] leading-none transition-transform group-hover:translate-x-1">→</span>
                </div>
                <p className="mt-2 max-w-[38ch] text-[16px] leading-[1.45] text-[#0e0e0e]/70">{c.blurb}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ───────── 06 Terms, black band with parallax sky ───────── */}
        <section className="relative mt-24 overflow-hidden bg-[#0e0e0e] text-[#f2f2ef] md:mt-40">
          <div className="absolute inset-0 opacity-55" data-parallax="0.15">
            <div className="absolute -inset-y-[15%] inset-x-0">
              <Pic name="night-sky" sizes="100vw" alt="" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e] via-[#0e0e0e]/30 to-[#0e0e0e]" />
          <div className={`${pad} relative py-20 md:py-32`}>
            <div className="grid grid-cols-12 gap-x-5 border-t border-[#f2f2ef]/40 pt-3">
              <span className={`${label} col-span-2 md:col-span-1`}>06</span>
              <span className={`${label} col-span-6 md:col-span-5`}>How it works</span>
              <span className={`${label} col-span-4 text-right text-[#f2f2ef]/55 md:col-span-6`}>Night sky · Lehbab</span>
            </div>
            <h2 className="mt-10 max-w-[14ch] text-[clamp(2.8rem,8.4vw,9.5rem)] font-black uppercase leading-[0.84] tracking-[-0.055em] md:mt-16">
              <Split>Door to dune and back.</Split>
            </h2>
            <ol className="mt-14 grid grid-cols-1 gap-x-5 sm:grid-cols-2 md:mt-24 md:grid-cols-4">
              {[
                ["Ask", "Message us on WhatsApp or the enquiry form. We reply within 30 minutes, day and night."],
                ["Pick-up", "A driver collects you from your door, hotel or home, anywhere in Dubai."],
                ["The desert", "Dune drive, camel rides, a falcon on the glove, then BBQ dinner, Tanoura and fire shows."],
                ["Change of plan", "Free cancellation up to 24 hours before the tour. No forms, no fuss."],
              ].map(([t, d], i) => (
                <li key={t} className="reveal border-t border-[#f2f2ef]/25 py-6 md:pr-6" style={{ ["--d" as string]: `${i * 90}ms` }}>
                  <span className={`${M} text-[13px] text-[#d39b5a]`}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 text-[26px] font-extrabold uppercase tracking-[-0.035em] md:mt-12">{t}</h3>
                  <p className="mt-2 max-w-[34ch] text-[15px] leading-[1.5] text-[#f2f2ef]/70">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── 07 Split statement over image ───────── */}
        <section className={`${pad} pt-24 md:pt-40`}>
          <SectionHead n="07" title="Morning departures" aside="Before the heat" />
          <div className="relative mt-10 md:mt-16">
            <p aria-hidden className="relative z-10 text-[clamp(3rem,11vw,12.5rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-white mix-blend-difference">
              <Split>First light</Split>
            </p>
            <div className="grid grid-cols-12 gap-x-5">
              <div className="reveal-img relative col-span-12 -mt-[0.5rem] aspect-[16/11] overflow-hidden bg-[#0e0e0e] md:col-span-6 md:col-start-4 md:-mt-[2.2vw] md:aspect-[4/3]">
                <Pic name="camel-ride" sizes="(min-width: 768px) 50vw, 100vw" alt="Guests riding camels across the dunes in the morning" />
              </div>
              <div className="col-span-12 mt-6 md:col-span-3 md:mt-auto md:pl-2">
                {(() => {
                  const m = getTour("premium-morning-desert-safari");
                  return m ? (
                    <Link href={`/experiences/${m.slug}`} className="group block border-t border-[#0e0e0e] pt-3">
                      <span className={`${label} text-[#0e0e0e]/55`}>{m.timing} · {m.location}</span>
                      <span className="mt-2 block text-[20px] font-bold leading-[1.1] tracking-[-0.025em] group-hover:text-[#d39b5a]">{m.title}</span>
                      <span className={`${M} mt-3 block text-[13px]`}>{price(m)} →</span>
                    </Link>
                  ) : null;
                })()}
              </div>
            </div>
            <p aria-hidden className="relative z-10 -mt-[0.35em] text-right text-[clamp(3rem,11vw,12.5rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-white mix-blend-difference max-md:mt-6">
              <Split delay={200}>on red sand</Split>
            </p>
          </div>
        </section>

        {/* ───────── 08 Journal ───────── */}
        <section className={`${pad} pt-24 pb-24 md:pt-40 md:pb-40`}>
          <SectionHead n="08" title="Journal" aside="Field notes" />
          <div className="mt-10 flex items-end justify-between gap-6 md:mt-16">
            <h2 className="text-[clamp(2.6rem,7vw,7.5rem)] font-black uppercase leading-[0.86] tracking-[-0.05em]">
              <Split>Read before you go</Split>
            </h2>
            <Link href="/journal" className={`${label} hidden shrink-0 border-b border-[#0e0e0e] pb-1 hover:text-[#d39b5a] md:inline`}>All entries →</Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-12 md:mt-14 md:grid-cols-12">
            {posts.slice(0, 3).map((p, i) => (
              <Link key={p.slug} href={`/journal/${p.slug}`} className={`group block ${i === 0 ? "md:col-span-6" : "md:col-span-3"}`}>
                <div className={`reveal-img zoom relative overflow-hidden bg-[#0e0e0e] ${i === 0 ? "aspect-[4/3]" : "aspect-[3/4]"}`} style={{ ["--d" as string]: `${i * 100}ms` }}>
                  <Pic name={p.image} sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"} alt={p.title} />
                </div>
                <div className={`${label} mt-3 flex justify-between border-t border-[#0e0e0e] pt-2 text-[#0e0e0e]/55`}>
                  <span>{p.category}</span>
                  <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</time>
                </div>
                <h3 className={`mt-3 font-bold leading-[1.1] tracking-[-0.025em] group-hover:text-[#d39b5a] ${i === 0 ? "text-[26px] md:text-[32px]" : "text-[20px]"}`}>{p.title}</h3>
                {i === 0 && <p className="mt-3 max-w-[52ch] text-[16px] leading-[1.5] text-[#0e0e0e]/70">{p.excerpt}</p>}
              </Link>
            ))}
          </div>
          <Link href="/journal" className={`${label} mt-10 inline-block border-b border-[#0e0e0e] pb-1 md:hidden`}>All entries →</Link>
        </section>
      </main>

      {/* ───────── Footer ───────── */}
      <footer className="bg-[#0e0e0e] text-[#f2f2ef]">
        <div className={`${pad} pt-16 md:pt-24`}>
          <div className="grid grid-cols-12 gap-x-5 gap-y-12">
            <div className="col-span-12 md:col-span-6">
              <p className={`${label} text-[#d39b5a]`}>(09) Enquire</p>
              <h2 className="mt-6 text-[clamp(2.4rem,5.6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.05em]">
                Tell us the date. We handle the rest.
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/enquire" className={`${label} inline-flex h-12 items-center gap-3 bg-[#d39b5a] px-5 text-[#0e0e0e] hover:bg-[#f2f2ef]`}>
                  Start an enquiry ↗
                </Link>
                <a href={waLink("Hello Desert Stars, I'd like to plan a trip.")} className={`${label} inline-flex h-12 items-center gap-3 border border-[#f2f2ef]/40 px-5 hover:border-[#f2f2ef]`}>
                  WhatsApp {site.phone}
                </a>
              </div>
            </div>
            <dl className={`${label} col-span-12 grid grid-cols-1 gap-x-5 self-end sm:grid-cols-2 md:col-span-5 md:col-start-8`}>
              {[
                ["Phone", <a key="p" href={site.phoneHref} className="hover:text-[#d39b5a]">{site.phone}</a>],
                ["Email", <a key="e" href={`mailto:${site.email}`} className="break-all hover:text-[#d39b5a]">{site.email}</a>],
                ["Hours", site.hours],
                ["Office", site.address],
              ].map(([k, v]) => (
                <div key={k as string} className="border-t border-[#f2f2ef]/20 py-3">
                  <dt className="text-[#f2f2ef]/45">{k}</dt>
                  <dd className="mt-1 normal-case leading-[1.5] tracking-normal">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-16 grid grid-cols-12 gap-x-5 gap-y-6 border-t border-[#f2f2ef]/20 pt-4 md:mt-24">
            <nav className="col-span-12 flex flex-wrap gap-x-8 gap-y-2 md:col-span-6" aria-label="Footer">
              {nav.map((l) => (
                <Link key={l.href} href={l.href} className={`${label} hover:text-[#d39b5a]`}>{l.label}</Link>
              ))}
            </nav>
            <nav className="col-span-12 flex flex-wrap gap-x-8 gap-y-2 md:col-span-6 md:justify-end" aria-label="Categories">
              {categories.map((c) => (
                <Link key={c.slug} href={`/experiences#${c.slug}`} className={`${label} text-[#f2f2ef]/55 hover:text-[#f2f2ef]`}>{c.name}</Link>
              ))}
            </nav>
          </div>
        </div>

        <p aria-hidden className={`${pad} mt-10 select-none whitespace-nowrap pb-2 text-[17.2vw] font-black uppercase leading-[0.78] tracking-[-0.065em] md:mt-16`}>
          Desert<span className="text-[#d39b5a]">*</span>Stars
        </p>
        <div className={`${pad} ${label} flex flex-wrap justify-between gap-2 border-t border-[#f2f2ef]/15 py-4 text-[#f2f2ef]/45`}>
          <span>© {new Date().getFullYear()} Desert Stars</span>
          <span>Dubai 25°12′N 55°16′E</span>
          <span>{site.cancellation}</span>
        </div>
      </footer>
    </div>
  );
}
