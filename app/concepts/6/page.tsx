import Link from "next/link";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import { getTour, price, type Tour } from "@/lib/tours";
import { site, waLink, categories } from "@/data/site";
import { posts } from "@/data/journal";

const sans = Hanken_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--g6-sans" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--g6-serif" });

export const metadata = { title: "Design 6 · Gallery" };

const it = "[font-family:var(--g6-serif)] italic font-normal";
const pad = "px-5 lg:px-10";
const label = "text-[11px] uppercase tracking-[0.18em] text-[#1c1c1c]/55";

const nav = [
  { href: "/experiences", label: "Experiences" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/enquire", label: "Enquire" },
];

type Frame = { name: string; cap: string; shape: "tall" | "wide" | "square" };

const rails: { id: string; no: string; title: string; note: string; frames: Frame[] }[] = [
  {
    id: "desert",
    no: "I",
    title: "The desert",
    note: "Lehbab's red dunes, an hour from your door.",
    frames: [
      { name: "desert-sunset", cap: "Last light over Lehbab", shape: "wide" },
      { name: "camel-grazing", cap: "Camels at rest, late afternoon", shape: "tall" },
      { name: "premium-morning-4", cap: "Morning, before the heat", shape: "wide" },
      { name: "standard-sunset-4", cap: "A slow camel ride at dusk", shape: "square" },
    ],
  },
  {
    id: "camp",
    no: "II",
    title: "The camp",
    note: "Lanterns, a BBQ dinner and the fire after dark.",
    frames: [
      { name: "premium-evening-2", cap: "Arriving at the Bedouin camp", shape: "wide" },
      { name: "combo-mosque-2", cap: "The falcon, up close", shape: "tall" },
      { name: "premium-evening-4", cap: "BBQ dinner, cooked over coals", shape: "wide" },
      { name: "standard-sunset-3", cap: "The fire show", shape: "square" },
      { name: "premium-evening-3", cap: "Low tables, lantern light", shape: "wide" },
    ],
  },
  {
    id: "cities",
    no: "III",
    title: "The cities",
    note: "Dubai, Abu Dhabi, Al Ain and Sharjah, privately guided.",
    frames: [
      { name: "dubai-skyline", cap: "Dubai from the creek side", shape: "wide" },
      { name: "burj-palms", cap: "Burj Khalifa, Downtown", shape: "tall" },
      { name: "sharjah-blue-souk", cap: "The Blue Souk, Sharjah", shape: "wide" },
      { name: "alain-1", cap: "Al Ain, the garden city", shape: "square" },
      { name: "dubai-night", cap: "Dubai after dark", shape: "tall" },
    ],
  },
];

const shapeCls: Record<Frame["shape"], string> = {
  wide: "w-[82vw] sm:w-[52vw] lg:w-[38vw] aspect-[3/2]",
  tall: "w-[58vw] sm:w-[34vw] lg:w-[22vw] aspect-[4/5]",
  square: "w-[66vw] sm:w-[40vw] lg:w-[27vw] aspect-square",
};

const picks: { slug: string; img: string; span: string; aspect: string }[] = [
  { slug: "premium-evening-desert-safari", img: "premium-evening-1", span: "md:col-span-7", aspect: "aspect-[4/3] md:aspect-[7/5]" },
  { slug: "standard-sunset-desert-safari", img: "combo-mosque-3", span: "md:col-span-5 md:mt-24", aspect: "aspect-[4/3] md:aspect-[4/5]" },
  { slug: "premium-morning-desert-safari", img: "premium-morning-1", span: "md:col-span-5", aspect: "aspect-[4/3] md:aspect-[4/5]" },
  { slug: "grand-mosque-and-desert-safari", img: "mosque-1", span: "md:col-span-7 md:mt-32", aspect: "aspect-[4/3] md:aspect-[7/5]" },
  { slug: "dubai-abu-dhabi-desert-safari-3-in-1", img: "combo-3in1-3", span: "md:col-span-6", aspect: "aspect-[4/3] md:aspect-[3/2]" },
  { slug: "sheikh-zayed-grand-mosque-tour", img: "mosque-bluehour", span: "md:col-span-6 md:mt-16", aspect: "aspect-[4/3] md:aspect-[3/2]" },
];

function Rail({ id, no, title, note, frames }: (typeof rails)[number]) {
  return (
    <section id={id} className="pt-20 lg:pt-32" aria-label={title}>
      <div className={`${pad} flex items-end justify-between gap-6 pb-6 lg:pb-8`}>
        <h2 className="reveal text-[34px] leading-none lg:text-[56px]">
          <span className={`${label} mr-3 align-middle not-italic`}>{no}</span>
          <span className={it}>{title}</span>
        </h2>
        <p className="reveal hidden max-w-[28ch] text-right text-[13px] leading-relaxed text-[#1c1c1c]/60 sm:block">{note}</p>
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory items-end gap-3 overflow-x-auto scroll-pl-5 px-5 lg:gap-4 lg:scroll-pl-10 lg:px-10">
        {frames.map((f, i) => (
          <figure key={f.name} className="shrink-0 snap-start">
            <div className={`reveal-img overflow-hidden bg-[#ececea] ${shapeCls[f.shape]}`} style={{ ["--d" as string]: `${i * 90}ms` }}>
              <Pic name={f.name} alt={f.cap} sizes="(min-width:1024px) 38vw, (min-width:640px) 52vw, 82vw" />
            </div>
            <figcaption className="mt-2.5 flex gap-3 text-[11px] text-[#1c1c1c]/55">
              <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span>{f.cap}</span>
            </figcaption>
          </figure>
        ))}
        <div className="w-px shrink-0" aria-hidden />
      </div>
      <p className={`${pad} mt-4 text-[12px] text-[#1c1c1c]/55 sm:hidden`}>{note}</p>
    </section>
  );
}

function Tile({ t, img, span, aspect }: { t: Tour; img: string; span: string; aspect: string }) {
  return (
    <Link href={`/experiences/${t.slug}`} className={`group block ${span}`}>
      <div className={`reveal-img zoom relative overflow-hidden bg-[#ececea] ${aspect}`}>
        <Pic name={img} alt={t.title} sizes="(min-width:768px) 58vw, 100vw" />
        <div className="pointer-events-none absolute inset-0 hidden flex-col justify-end bg-gradient-to-t from-black/55 via-black/0 to-black/0 p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 md:flex">
          <p className="translate-y-2 text-[26px] leading-tight text-white transition-transform duration-500 group-hover:translate-y-0">
            <span className={it}>{t.title}</span>
          </p>
          <p className="mt-2 flex justify-between text-[12px] tracking-wide text-white/85">
            <span>{t.location} · {t.timing}</span>
            <span>{price(t)}</span>
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4 md:hidden">
        <p className="text-[19px] leading-snug"><span className={it}>{t.title}</span></p>
        <p className="shrink-0 text-[11px] text-[#1c1c1c]/60">{price(t)}</p>
      </div>
    </Link>
  );
}

export default function Page() {
  const tiles = picks.map((p) => ({ ...p, t: getTour(p.slug) })).filter((p): p is typeof p & { t: Tour } => !!p.t);

  return (
    <div className={`${sans.variable} ${serif.variable} min-h-screen overflow-x-clip bg-[#fafafa] text-[#1c1c1c] [font-family:var(--g6-sans)] text-[15px] font-light antialiased`}>
      {/* Header */}
      <header className={`${pad} sticky top-0 z-40 flex h-16 items-center justify-between bg-[#fafafa]/90 backdrop-blur-md`}>
        <Link href="/" className="text-[22px] leading-none tracking-tight">
          <span className={it}>Desert</span> <span className="text-[13px] font-medium uppercase tracking-[0.22em]">Stars</span>
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-[#1c1c1c]/70 transition-colors hover:text-[#1c1c1c]">{n.label}</Link>
          ))}
        </nav>
        <Link href="/enquire" className="border border-[#1c1c1c] px-4 py-2 text-[12px] tracking-wide transition-colors hover:bg-[#1c1c1c] hover:text-[#fafafa]">
          Enquire
        </Link>
      </header>
      <nav className={`${pad} flex gap-5 overflow-x-auto pb-3 text-[12px] text-[#1c1c1c]/65 md:hidden no-scrollbar`} aria-label="Main mobile">
        {nav.map((n) => <Link key={n.href} href={n.href} className="shrink-0">{n.label}</Link>)}
      </nav>

      <main>
        {/* Hero mosaic */}
        <section className={`${pad} pb-2`} aria-label="Desert Stars">
          <div className="grid h-[calc(100svh-104px)] min-h-[560px] grid-cols-2 grid-rows-6 gap-2 md:h-[calc(100svh-72px)] md:min-h-[620px] md:grid-cols-12 lg:gap-3">
            <div className="hero-zoom relative col-span-2 row-span-4 overflow-hidden bg-[#ececea] md:col-span-7 md:row-span-6">
              <Pic name="dunes-cruiser" priority alt="A Land Cruiser cresting a red dune at Lehbab" sizes="(min-width:768px) 58vw, 100vw" />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white lg:bottom-9 lg:left-9">
                <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/80">Private desert safaris · 11,000+ guests hosted</p>
                <h1 className="max-w-[14ch] text-[42px] leading-[0.98] tracking-[-0.01em] sm:text-[56px] lg:text-[84px]">
                  <Split>
                    The desert, <em className={it}>slowly.</em>
                  </Split>
                </h1>
              </div>
            </div>
            <div className="reveal-img relative row-span-2 overflow-hidden bg-[#ececea] md:col-span-5 md:row-span-4" style={{ ["--d" as string]: "200ms" }}>
              <Pic name="camel-caravan" alt="A camel caravan crossing the dunes" sizes="(min-width:768px) 40vw, 50vw" />
            </div>
            <div className="reveal-img relative row-span-2 overflow-hidden bg-[#ececea] md:col-span-2" style={{ ["--d" as string]: "320ms" }}>
              <Pic name="camel-ride" alt="Guests riding camels in the evening" sizes="(min-width:768px) 16vw, 50vw" />
            </div>
            <div className="reveal-img relative hidden overflow-hidden bg-[#ececea] md:col-span-3 md:row-span-2 md:block" style={{ ["--d" as string]: "440ms" }}>
              <Pic name="camp-lanterns" alt="The lantern-lit Bedouin camp at night" sizes="24vw" />
            </div>
          </div>
          <div className="mt-3 flex justify-between text-[11px] text-[#1c1c1c]/55">
            <span>Pick-up from your door in Dubai</span>
            <span className="hidden sm:inline">Plates I–IV · Lehbab, Dubai</span>
            <a href="#desert" className="underline-offset-4 hover:underline">Scroll the book ↓</a>
          </div>
        </section>

        {/* Intro */}
        <section className={`${pad} grid gap-6 pt-24 md:grid-cols-12 lg:pt-36`}>
          <p className={`${label} reveal md:col-span-3`}>A private safari house</p>
          <p className="reveal max-w-[30ch] text-[28px] leading-[1.15] md:col-span-8 lg:text-[44px]">
            Red dunes in the afternoon, a <span className={it}>lantern-lit</span> Bedouin camp at night, and the drive home under the stars.
          </p>
        </section>

        {rails.map((r) => <Rail key={r.id} {...r} />)}

        {/* Experiences */}
        <section className={`${pad} pt-28 lg:pt-44`} aria-labelledby="g6-exp">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 lg:mb-14">
            <h2 id="g6-exp" className="reveal text-[40px] leading-none lg:text-[72px]">
              <span className={it}>Experiences</span>
            </h2>
            <Link href="/experiences" className="reveal text-[13px] underline decoration-[#1c1c1c]/30 underline-offset-[6px] hover:decoration-[#1c1c1c]">
              All sixteen
            </Link>
          </div>
          <div className="grid gap-x-4 gap-y-12 md:grid-cols-12 md:gap-y-20 lg:gap-x-6">
            {tiles.map((p) => <Tile key={p.slug} t={p.t} img={p.img} span={p.span} aspect={p.aspect} />)}
          </div>
          <ul className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#1c1c1c]/10 pt-6 text-[13px]">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/experiences#${c.slug}`} className="text-[#1c1c1c]/65 transition-colors hover:text-[#1c1c1c]">{c.name}</Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Full-bleed */}
        <section className="relative mt-28 h-[78svh] min-h-[480px] overflow-hidden lg:mt-44 lg:h-[100svh]" aria-label="Night sky over the desert">
          <div className="absolute inset-x-0 -top-[12%] h-[124%]" data-parallax="0.15">
            <Pic name="night-sky" alt="The Milky Way over the desert camp" sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-black/20" />
          <p className={`${pad} absolute bottom-8 left-0 max-w-[22ch] text-[34px] leading-[1.05] text-white lg:bottom-14 lg:text-[64px]`}>
            <span className={it}><Split>And then, the stars come out.</Split></span>
          </p>
        </section>

        {/* Stats line */}
        <section className={`${pad} border-b border-[#1c1c1c]/10 py-8`} aria-label="In numbers">
          <ul className="flex flex-wrap gap-x-10 gap-y-3 text-[13px]">
            {site.stats.map((s) => (
              <li key={s.label} className="reveal">
                <span className="[font-family:var(--g6-serif)] text-[22px] tabular-nums">{s.value}</span>
                <span className="ml-2 text-[#1c1c1c]/55">{s.label}</span>
              </li>
            ))}
            <li className="reveal text-[#1c1c1c]/55 sm:ml-auto sm:self-center">Free cancellation up to 24 hours</li>
          </ul>
        </section>

        {/* Journal */}
        <section className={`${pad} grid gap-8 pt-24 md:grid-cols-12 lg:pt-32`} aria-labelledby="g6-journal">
          <h2 id="g6-journal" className="reveal text-[34px] leading-none md:col-span-3 lg:text-[44px]">
            <span className={it}>Notes</span>
          </h2>
          <ul className="md:col-span-9">
            {posts.slice(0, 3).map((p) => (
              <li key={p.slug} className="reveal border-t border-[#1c1c1c]/10 last:border-b">
                <Link href={`/journal/${p.slug}`} className="group grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                  <span className="text-[18px] leading-snug transition-colors group-hover:text-[#1c1c1c]/60 lg:text-[21px]">{p.title}</span>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#1c1c1c]/50">{p.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Enquiry footer */}
      <footer className={`${pad} mt-28 pb-8 lg:mt-40`}>
        <div className="grid gap-10 border-t border-[#1c1c1c] pt-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className={label}>Enquire</p>
            <p className="reveal mt-4 max-w-[16ch] text-[44px] leading-[1] lg:text-[80px]">
              Tell us the date. <span className={it}>We&apos;ll do the rest.</span>
            </p>
            <p className="mt-6 max-w-[42ch] text-[14px] leading-relaxed text-[#1c1c1c]/65">{site.response}</p>
            <div className="mt-8 flex flex-wrap gap-3 text-[13px]">
              <Link href="/enquire" className="bg-[#1c1c1c] px-5 py-3 text-[#fafafa] transition-opacity hover:opacity-80">Send an enquiry</Link>
              <a href={waLink("Hello Desert Stars, I'd like to plan a desert safari.")} className="border border-[#1c1c1c]/30 px-5 py-3 transition-colors hover:border-[#1c1c1c]">WhatsApp</a>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-5 text-[13px] sm:grid-cols-2 md:col-span-5 md:self-end">
            <div><dt className={label}>Email</dt><dd className="mt-1"><a href={`mailto:${site.email}`} className="break-all hover:underline">{site.email}</a></dd></div>
            <div><dt className={label}>Phone</dt><dd className="mt-1"><a href={site.phoneHref} className="hover:underline">{site.phone}</a></dd></div>
            <div><dt className={label}>Hours</dt><dd className="mt-1 text-[#1c1c1c]/70">{site.hours}</dd></div>
            <div><dt className={label}>Office</dt><dd className="mt-1 text-[#1c1c1c]/70">{site.address}</dd></div>
          </dl>
        </div>
        <div className="mt-16 flex flex-col gap-4 text-[11px] text-[#1c1c1c]/50 sm:flex-row sm:items-center sm:justify-between">
          <span><span className={`${it} text-[15px] text-[#1c1c1c]`}>Desert Stars</span> · © {new Date().getFullYear()}</span>
          <nav className="flex gap-6" aria-label="Footer">
            {nav.map((n) => <Link key={n.href} href={n.href} className="hover:text-[#1c1c1c]">{n.label}</Link>)}
          </nav>
        </div>
      </footer>
    </div>
  );
}
