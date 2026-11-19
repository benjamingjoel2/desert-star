import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, DM_Mono, Instrument_Sans } from "next/font/google";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import HoverList from "@/components/concepts/HoverList";
import { site, waLink } from "@/data/site";
import { posts } from "@/data/journal";
import { getTour, price, tours } from "@/lib/tours";

const display = Fraunces({ subsets: ["latin"], weight: "variable", style: ["normal", "italic"], axes: ["opsz", "SOFT"], variable: "--c-display", display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400"], variable: "--c-mono", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--c-sans", display: "swap" });

export const metadata: Metadata = { title: "Concept 03 · Editorial magazine" };

const RED = "#8a2b1d";
const Mono = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`font-[family-name:var(--c-mono)] text-[11px] uppercase tracking-[0.08em] ${className}`}>{children}</span>
);

export default function Editorial() {
  const cover = [
    ["04", "The red dunes of Lehbab, at golden hour", "premium-evening-desert-safari"],
    ["11", "Dawn before the city wakes", "premium-morning-desert-safari"],
    ["18", "Marble and quiet at the Grand Mosque", "grand-mosque-and-desert-safari"],
    ["26", "Dinner on the old Creek", "dubai-creek-dhow-cruise"],
    ["32", "Al Ain: oases and a mountain road", "al-ain-city-tour"],
  ];
  const essay = [
    { n: "combo-3in1-3", c: "A saker falcon, Lehbab, 17:40", cls: "col-span-12 md:col-span-7 aspect-[4/3]" },
    { n: "standard-sunset-4", c: "The camel ride along the ridge", cls: "col-span-6 md:col-span-5 aspect-[4/5] md:mt-24" },
    { n: "combo-mosque-3", c: "Tanoura under the string lights", cls: "col-span-6 md:col-span-4 aspect-[3/4]" },
    { n: "premium-evening-4", c: "From the grill: the camp buffet", cls: "col-span-12 md:col-span-4 aspect-[4/3] md:mt-32" },
    { n: "standard-sunset-3", c: "The fire show, 21:10", cls: "col-span-12 md:col-span-4 aspect-[3/4]" },
  ];
  const rows = tours.map((t) => ({ href: `/experiences/${t.slug}`, title: t.title, meta: `${t.location} · ${t.timing}`, price: price(t), img: t.images[0] }));
  const evening = getTour("premium-evening-desert-safari")!;

  return (
    <div className={`${display.variable} ${mono.variable} ${sans.variable} bg-[#efe9df] text-[#151311] [font-family:var(--c-sans)]`}>
      {/* Masthead */}
      <header className="px-page pt-5">
        <div className="flex items-center justify-between border-b border-[#151311] pb-3">
          <Mono>Issue Nº 01 — Winter 2026 — Dubai, UAE</Mono>
          <Link href="/enquire"><Mono className="underline underline-offset-4">Enquire</Mono></Link>
        </div>
        <Link href="/concepts/editorial" className="block py-2 font-[family-name:var(--c-display)] text-[17.8vw] font-[650] leading-[0.9] tracking-[-0.045em] [font-variation-settings:'opsz'_144,'SOFT'_50]">
          <Split delay={100}>Desert <em className="font-[350]">Stars</em></Split>
        </Link>
        <nav aria-label="Sections" className="no-scrollbar flex gap-8 overflow-x-auto border-y border-[#151311] py-3">
          {[["Desert", "/experiences#desert"], ["City", "/experiences#city"], ["Water", "/experiences#cruises"], ["Tickets", "/experiences#attractions"], ["Journal", "/journal"], ["About", "/about"]].map(([l, h]) => (
            <Link key={l} href={h} className="shrink-0 hover:text-[#8a2b1d]"><Mono>{l}</Mono></Link>
          ))}
        </nav>
      </header>

      {/* Cover */}
      <section className="px-page grid grid-cols-12 gap-x-6 gap-y-10 py-10 lg:py-14">
        <div className="col-span-12 flex flex-col justify-between lg:col-span-4">
          <div>
            <Mono className="text-[#8a2b1d]">In this issue</Mono>
            <ol className="mt-6">
              {cover.map(([p, title, slug], i) => (
                <li key={slug} className="reveal border-t border-[#151311]/25" style={{ ["--d" as string]: `${300 + i * 90}ms` }}>
                  <Link href={`/experiences/${slug}`} className="group grid grid-cols-[2.5rem_1fr] gap-3 py-4">
                    <Mono className="pt-1.5">p.{p}</Mono>
                    <span className="font-[family-name:var(--c-display)] text-[24px] leading-[1.1] transition-colors group-hover:text-[#8a2b1d]">{title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <p className="reveal mt-10 max-w-sm text-[15px] leading-relaxed" style={{ ["--d" as string]: "800ms" }}>
            A guide to the Arabian desert and the Emirates beyond it, from the people who drive you there. Evenings from AED {evening.adult}.
          </p>
        </div>
        <figure className="col-span-12 lg:col-span-8">
          <div className="hero-zoom aspect-[4/3] overflow-hidden lg:aspect-[16/11]"><Pic name="combo-3in1-3" priority sizes="(min-width:1024px) 66vw, 100vw" alt="A guest holding a saker falcon in the Lehbab desert" /></div>
          <figcaption className="mt-3 flex justify-between gap-4"><Mono>Fig. 1 — A saker falcon at golden hour, Lehbab</Mono><Mono>Cover</Mono></figcaption>
        </figure>
      </section>

      {/* Feature */}
      <section className="px-page grid grid-cols-12 gap-x-6 gap-y-12 border-t border-[#151311] py-20 lg:py-32">
        <div className="col-span-12 lg:col-span-7">
          <Mono className="text-[#8a2b1d]">Feature — p.04</Mono>
          <h2 className="mt-6 font-[family-name:var(--c-display)] text-[48px] font-[300] leading-[0.95] tracking-[-0.03em] [font-variation-settings:'opsz'_144] lg:text-[104px]">
            <Split>The evening <em>issue</em></Split>
          </h2>
          <div className="reveal mt-12 gap-8 text-[16px] leading-[1.7] md:columns-2">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-[family-name:var(--c-display)] first-letter:text-[84px] first-letter:leading-[0.8] first-letter:text-[#8a2b1d]">
              The road from Dubai runs straight until it doesn&apos;t. At Lehbab the tarmac gives way to sand the colour of paprika, and the drivers let a little air out of the tyres. What follows is forty minutes of the desert rising and falling under you, until the camp appears below a ridge, lit by lanterns.
            </p>
            <p className="mt-4">
              There is Arabic coffee and dates, a falcon to hold, a camel to ride, henna for those who want it. The grill is lit as the Tanoura dancer begins to spin. And when the fire show ends, the lights go down, and you remember why people have looked up at this sky for thousands of years.
            </p>
          </div>
        </div>
        <aside className="col-span-12 flex flex-col gap-10 lg:col-span-5">
          <div className="reveal-img aspect-[4/5] overflow-hidden"><Pic name="standard-sunset-2" sizes="(min-width:1024px) 40vw, 100vw" /></div>
          <blockquote className="border-l-2 pl-6" style={{ borderColor: RED }}>
            <p className="font-[family-name:var(--c-display)] text-[30px] italic leading-[1.15] lg:text-[38px]" style={{ color: RED }}>
              <Split>“When the fire show ends, the lights go down. Then you look up.”</Split>
            </p>
          </blockquote>
        </aside>
      </section>

      {/* Numbers */}
      <section className="bg-[#151311] text-[#efe9df]">
        <dl className="px-page grid grid-cols-2 lg:grid-cols-4">
          {site.stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col-reverse border-white/20 py-12 lg:py-16 ${i ? "lg:border-l lg:pl-8" : ""} ${i % 2 ? "border-l pl-6 lg:pl-8" : ""}`}>
              <dt className="mt-4"><Mono className="opacity-70">{s.label}</Mono></dt>
              <dd className="font-[family-name:var(--c-display)] text-[60px] font-[300] leading-none tracking-[-0.04em] lg:text-[104px]" data-count={/\d/.test(s.value) && !s.value.includes("/") ? s.value : undefined}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Photo essay */}
      <section className="px-page py-20 lg:py-32">
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-[#151311] pb-4">
          <h2 className="font-[family-name:var(--c-display)] text-[40px] font-[300] italic leading-none lg:text-[72px]"><Split>Photo essay</Split></h2>
          <Mono>pp. 12–17</Mono>
        </div>
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          {essay.map((e, i) => (
            <figure key={e.n} className={e.cls.split(" ").filter((c) => !c.startsWith("aspect")).join(" ")}>
              <div className={`reveal-img overflow-hidden ${e.cls.split(" ").find((c) => c.startsWith("aspect"))}`}><Pic name={e.n} sizes="(min-width:768px) 50vw, 100vw" /></div>
              <figcaption className="mt-3"><Mono>Fig. {i + 2} — {e.c}</Mono></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Index */}
      <section className="px-page border-t border-[#151311] py-20 lg:py-32">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <Mono className="text-[#8a2b1d]">Index — all experiences</Mono>
          <h2 className="font-[family-name:var(--c-display)] text-[44px] font-[300] leading-none tracking-[-0.03em] lg:text-[88px]"><Split>The <em>contents</em></Split></h2>
        </div>
        <HoverList rows={rows} tone="light" />
      </section>

      {/* Also in this issue */}
      <section className="px-page border-t border-[#151311] py-20">
        <Mono className="text-[#8a2b1d]">Also in this issue</Mono>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          {posts.map((p, i) => (
            <Link key={p.slug} href={`/journal/${p.slug}`} className="group">
              <Mono>0{i + 1} — {p.category}</Mono>
              <h3 className="mt-3 font-[family-name:var(--c-display)] text-[28px] leading-[1.1] group-hover:text-[#8a2b1d]">{p.title}</h3>
              <p className="mt-3 text-[15px] opacity-75">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Back cover */}
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[60svh] overflow-hidden"><div className="absolute inset-0" data-parallax="0.12"><Pic name="burj-palms" sizes="(min-width:1024px) 50vw, 100vw" /></div></div>
        <div className="px-page flex flex-col justify-between gap-12 bg-[#8a2b1d] py-16 text-[#efe9df] lg:py-20">
          <Mono>Reservations</Mono>
          <h2 className="font-[family-name:var(--c-display)] text-[48px] font-[300] leading-[0.95] tracking-[-0.03em] lg:text-[84px]"><Split>Your evening, <em>reserved.</em></Split></h2>
          <div className="flex flex-wrap gap-3">
            <a href={waLink("Hello Desert Stars, I'd like to reserve an evening.")} className="bg-[#efe9df] px-6 py-4 text-[#151311]"><Mono>WhatsApp {site.phone}</Mono></a>
            <Link href="/enquire" className="border border-[#efe9df] px-6 py-4"><Mono>Write to us</Mono></Link>
          </div>
        </div>
      </section>

      <footer className="px-page grid gap-6 py-10 md:grid-cols-4">
        <Mono>Desert Stars — Colophon</Mono>
        <Mono className="opacity-70">{site.address}</Mono>
        <Mono className="opacity-70">{site.email}</Mono>
        <span className="flex gap-4"><Link href="/privacy"><Mono>Privacy</Mono></Link><Link href="/booking-terms"><Mono>Terms</Mono></Link><Link href="/cookies"><Mono>Cookies</Mono></Link></span>
      </footer>
    </div>
  );
}
