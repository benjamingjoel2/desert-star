import Link from "next/link";
import { Instrument_Serif, Manrope } from "next/font/google";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import { tours, getTour, price, type Tour } from "@/lib/tours";
import { site, waLink, categories } from "@/data/site";
import { posts } from "@/data/journal";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--nf-display",
  display: "swap",
});
const sans = Manrope({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--nf-sans", display: "swap" });

export const metadata = { title: "Design 2 · Nightfall" };

const SERIF = "font-[family-name:var(--nf-display)] font-normal";
const GOLD = "text-[#c9a86a]";
const PAD = "px-5 md:px-10";
const LABEL = "text-[11px] uppercase tracking-[0.28em]";

const nav = [
  { href: "/experiences", label: "Experiences" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/enquire", label: "Enquire" },
];

const scenes = [
  {
    time: "15:00",
    act: "I",
    title: "A knock at",
    em: "your door",
    body: "A private 4x4 collects you from your hotel or home anywhere in Dubai. The city thins out behind tinted glass; the road turns to sand.",
    image: "dubai-skyline",
    alt: "Dubai skyline glowing at sunset",
  },
  {
    time: "15:45",
    act: "II",
    title: "Into the",
    em: "red dunes",
    body: "Tyres deflated, the Lehbab dunes open up. Your driver reads every ridge, rising and falling across the pale-to-copper sand.",
    image: "dunes-cruiser",
    alt: "A lone 4x4 crossing pale desert dunes",
  },
  {
    time: "17:45",
    act: "III",
    title: "Camels at",
    em: "golden hour",
    body: "The light softens. A slow caravan along the ridge line, the falcon on the glove, the whole desert gone to amber.",
    image: "camel-caravan",
    alt: "A camel caravan on a dune ridge at golden hour",
  },
  {
    time: "19:00",
    act: "IV",
    title: "The lantern-lit",
    em: "camp",
    body: "Low cushions, Arabic coffee and dates, a Bedouin camp lit by hundreds of lanterns. Dinner comes off the BBQ as the sky turns indigo.",
    image: "camp-lanterns",
    alt: "A Bedouin camp lit by lanterns at dusk",
  },
  {
    time: "20:30",
    act: "V",
    title: "Fire, and the",
    em: "Tanoura",
    body: "The Tanoura dancer spins into a blur of colour; then the fire performer takes the stage and the camp falls silent.",
    image: "standard-sunset-3",
    alt: "A fire performer at the desert camp",
  },
];

const thumbs: Record<string, string> = {
  "premium-evening-desert-safari": "premium-evening-1",
  "evening-desert-safari": "premium-evening-2",
  "standard-sunset-desert-safari": "standard-sunset-4",
  "premium-morning-desert-safari": "premium-morning-1",
  "grand-mosque-and-desert-safari": "mosque-bluehour",
  "al-ain-city-tour": "alain-1",
  "sharjah-city-tour": "sharjah-blue-souk",
  "dubai-marina-dhow-cruise": "dubai-night",
};

const indexList = Object.keys(thumbs)
  .map((s) => getTour(s))
  .filter((t): t is Tour => Boolean(t));

export default function NightfallPage() {
  const signature = getTour("premium-evening-desert-safari");
  const wa = waLink("Hello Desert Stars, I'd like to reserve an evening in the desert.");

  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-screen overflow-x-clip bg-[#0b0c10] font-[family-name:var(--nf-sans)] font-light text-[#e9e4da] antialiased selection:bg-[#c9a86a] selection:text-[#0b0c10]`}
    >
      {/* ───────── Header ───────── */}
      <header className={`absolute inset-x-0 top-0 z-50 ${PAD}`}>
        <div className="flex items-center justify-between border-b border-white/10 py-5 md:py-7">
          <Link href="/concepts/2" className="group flex items-baseline gap-2">
            <span className={`${SERIF} text-[26px] leading-none tracking-tight md:text-[30px]`}>
              Desert <em className={`italic ${GOLD}`}>Stars</em>
            </span>
          </Link>
          <nav className="hidden items-center gap-10 md:flex">
            {nav.slice(0, 3).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`${LABEL} relative text-white/70 transition-colors duration-500 hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-[#c9a86a] after:transition-transform after:duration-700 hover:after:origin-left hover:after:scale-x-100`}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/enquire"
              className={`${LABEL} rounded-full border border-[#c9a86a]/60 px-6 py-3 text-[#c9a86a] transition-colors duration-500 hover:bg-[#c9a86a] hover:text-[#0b0c10]`}
            >
              Enquire
            </Link>
          </nav>
          <details className="group relative md:hidden">
            <summary className={`${LABEL} flex cursor-pointer list-none items-center gap-3 text-white/80 [&::-webkit-details-marker]:hidden`}>
              <span className="group-open:hidden">Menu</span>
              <span className="hidden group-open:inline">Close</span>
              <span className="flex w-6 flex-col gap-1.5">
                <span className="h-px w-full bg-[#c9a86a] transition-transform duration-500 group-open:translate-y-[3.5px] group-open:rotate-45" />
                <span className="h-px w-full bg-[#c9a86a] transition-transform duration-500 group-open:-translate-y-[3.5px] group-open:-rotate-45" />
              </span>
            </summary>
            <div className="absolute right-0 top-10 w-[min(80vw,300px)] border border-white/10 bg-[#0b0c10]/95 p-6 backdrop-blur-md">
              <ul className="space-y-4">
                {nav.map((n, i) => (
                  <li key={n.href}>
                    <Link href={n.href} className={`${SERIF} flex items-baseline gap-4 text-3xl`}>
                      <span className={`font-[family-name:var(--nf-sans)] text-[10px] ${GOLD}`}>0{i + 1}</span>
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </header>

      {/* ───────── Hero ───────── */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <div className="absolute inset-x-0 -top-[8%] h-[116%]" data-parallax="0.15">
          <div className="hero-zoom h-full w-full">
            <Pic name="desert-sunset" priority sizes="100vw" alt="The sun setting over the Lehbab dunes" />
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,16,0.55)_0%,rgba(11,12,16,0.05)_35%,rgba(16,16,40,0.55)_70%,#0b0c10_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(11,12,16,0.6),transparent_60%)]" />

        <div className={`relative z-10 flex h-full flex-col justify-end pb-10 md:pb-14 ${PAD}`}>
          <p className={`${LABEL} reveal mb-6 flex items-center gap-4 ${GOLD}`}>
            <span className="h-px w-10 bg-[#c9a86a]" />
            Lehbab, Dubai &middot; An evening in five acts
          </p>
          <h1 className={`${SERIF} max-w-[14ch] text-[clamp(3.4rem,11vw,10.5rem)] leading-[0.9] tracking-[-0.02em]`}>
            <Split>
              Where the day <em className={`italic ${GOLD}`}>ends,</em> the desert begins.
            </Split>
          </h1>
          <div className="mt-10 grid gap-8 border-t border-white/15 pt-6 md:mt-14 md:grid-cols-12 md:items-end">
            <p className="reveal max-w-md text-[15px] leading-relaxed text-white/75 md:col-span-5" style={{ ["--d" as string]: "300ms" }}>
              Private evening safaris from your door in Dubai to a lantern-lit Bedouin camp in the red dunes. Unhurried, intimate, under the stars.
            </p>
            <div className="reveal flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-7 md:justify-end" style={{ ["--d" as string]: "450ms" }}>
              {signature && (
                <Link href={`/experiences/${signature.slug}`} className="group flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a86a]/70 transition-colors duration-500 group-hover:bg-[#c9a86a]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#c9a86a] transition-colors duration-500 group-hover:text-[#0b0c10]">
                      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </span>
                  <span>
                    <span className={`${LABEL} block text-white/50`}>The signature evening</span>
                    <span className={`${SERIF} text-2xl`}>{price(signature)}</span>
                  </span>
                </Link>
              )}
              <span className={`${LABEL} hidden items-center gap-3 text-white/50 sm:flex`}>
                Scroll
                <span className="relative block h-10 w-px overflow-hidden bg-white/15">
                  <span className="absolute inset-x-0 top-0 h-1/2 animate-[nfdrop_2.4s_ease-in-out_infinite] bg-[#c9a86a]" />
                </span>
              </span>
            </div>
          </div>
        </div>
        <style>{`@keyframes nfdrop{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
      </section>

      {/* ───────── Prologue ───────── */}
      <section className={`relative bg-[#0b0c10] py-28 md:py-44 ${PAD}`}>
        <div className="grid gap-12 md:grid-cols-12">
          <p className={`${LABEL} reveal text-white/40 md:col-span-3`}>Prologue</p>
          <div className="md:col-span-9">
            <p className={`${SERIF} reveal text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.08] tracking-[-0.01em] text-white/90`}>
              Six hours, one evening. We pick you up in the heat of the afternoon and bring you home after the stars have{" "}
              <em className={`italic ${GOLD}`}>come out</em>. Everything in between is ours to look after.
            </p>
            <div className="reveal mt-14 grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
              {site.stats.map((s) => (
                <div key={s.label} className="bg-[#0b0c10] py-6 pr-4 md:py-8">
                  <p className={`${SERIF} text-[clamp(2.6rem,5vw,4.5rem)] leading-none ${GOLD}`}>{s.value}</p>
                  <p className={`${LABEL} mt-4 text-white/45`}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── The evening, hour by hour (stacked sticky scenes) ───────── */}
      <section aria-label="The evening, hour by hour" className="relative">
        {scenes.map((s, i) => (
          <article
            key={s.time}
            className="sticky top-0 h-[100svh] overflow-hidden bg-[#0b0c10] shadow-[0_-40px_80px_rgba(0,0,0,0.55)]"
            style={{ zIndex: i + 1 }}
          >
            <div className="absolute inset-0">
              <Pic name={s.image} sizes="100vw" alt={s.alt} />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,16,0.7)_0%,rgba(11,12,16,0.1)_40%,rgba(14,14,38,0.85)_100%)]" />
            <div className={`relative flex h-full flex-col justify-between pb-10 pt-24 md:pb-14 md:pt-32 ${PAD}`}>
              <div className="flex items-start justify-between">
                <p className={`${LABEL} text-white/60`}>
                  The evening, hour by hour <span className={GOLD}>&middot; Act {s.act}</span>
                </p>
                <p className={`${LABEL} text-white/40`}>
                  0{i + 1} / 0{scenes.length + 1}
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-12 md:items-end">
                <div className="md:col-span-8">
                  <p className={`${SERIF} text-[clamp(4.5rem,16vw,15rem)] leading-[0.8] tracking-[-0.03em] ${GOLD} [font-variant-numeric:lining-nums]`}>
                    {s.time}
                  </p>
                  <h2 className={`${SERIF} mt-4 text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.95]`}>
                    {s.title} <em className="italic">{s.em}</em>
                  </h2>
                </div>
                <p className="max-w-sm border-l border-[#c9a86a]/50 pl-5 text-[15px] leading-relaxed text-white/80 md:col-span-4 md:justify-self-end">
                  {s.body}
                </p>
              </div>
            </div>
          </article>
        ))}

        {/* Act VI: stars */}
        <article className="sticky top-0 h-[100svh] overflow-hidden bg-[#07071a]" style={{ zIndex: scenes.length + 1 }}>
          <div className="absolute inset-0 opacity-90">
            <Pic name="night-sky" sizes="100vw" alt="The Milky Way above the desert" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_100%,rgba(11,12,16,0.9),rgba(11,12,40,0.2)_70%)]" />
          <div className={`relative flex h-full flex-col justify-between pb-10 pt-24 md:pb-14 md:pt-32 ${PAD}`}>
            <div className="flex items-start justify-between">
              <p className={`${LABEL} text-white/60`}>
                The evening, hour by hour <span className={GOLD}>&middot; Act VI</span>
              </p>
              <p className={`${LABEL} text-white/40`}>
                0{scenes.length + 1} / 0{scenes.length + 1}
              </p>
            </div>
            <div>
              <p className={`${SERIF} text-[clamp(4.5rem,16vw,15rem)] italic leading-[0.8] tracking-[-0.03em] ${GOLD}`}>
                &amp; then,
              </p>
              <h2 className={`${SERIF} mt-4 max-w-[16ch] text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.95]`}>
                the lights go down, and the <em className="italic">stars</em> come up.
              </h2>
            </div>
          </div>
        </article>
      </section>

      {/* ───────── Interlude: falcon ───────── */}
      <section className={`relative z-20 bg-[#0b0c10] py-28 md:py-44 ${PAD}`}>
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="reveal-img relative aspect-[4/5] overflow-hidden md:col-span-5">
            <Pic name="combo-3in1-3" sizes="(min-width: 768px) 40vw, 100vw" alt="A guest holding a falcon in the desert" />
          </div>
          <div className="flex flex-col justify-between md:col-span-6 md:col-start-7">
            <div>
              <p className={`${LABEL} reveal mb-8 ${GOLD}`}>What the evening holds</p>
              <h2 className={`${SERIF} text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]`}>
                <Split>
                  Small rituals, <em className={`italic ${GOLD}`}>kept</em> the old way.
                </Split>
              </h2>
            </div>
            <ul className="mt-12 border-t border-white/10">
              {[
                ["Pick-up", "From your door in Dubai, in a private 4x4"],
                ["Dunes", "Lehbab red dunes, driven by desert specialists"],
                ["Camel & falcon", "A camel ride at sunset and the falcon on your glove"],
                ["Dinner", "BBQ under lanterns at a Bedouin camp"],
                ["Shows", "Tanoura and fire performance after dark"],
                ["Peace of mind", "Free cancellation up to 24 hours before"],
              ].map(([k, v], i) => (
                <li
                  key={k}
                  className="reveal grid grid-cols-[90px_1fr] gap-4 border-b border-white/10 py-4 text-[14px] md:grid-cols-[160px_1fr]"
                  style={{ ["--d" as string]: `${i * 70}ms` }}
                >
                  <span className={`${LABEL} pt-0.5 text-white/40`}>{k}</span>
                  <span className="text-white/80">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── Index of experiences ───────── */}
      <section className={`relative z-20 bg-[#0e0f1a] py-28 md:py-40 ${PAD}`}>
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <h2 className={`${SERIF} text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.02em]`}>
            <Split>
              The <em className={`italic ${GOLD}`}>index</em>
            </Split>
          </h2>
          <div className="reveal flex flex-wrap gap-x-6 gap-y-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/experiences#${c.slug}`}
                className={`${LABEL} text-white/50 transition-colors duration-500 hover:text-[#c9a86a]`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        <div className={`hidden grid-cols-12 gap-6 border-b border-white/15 pb-4 md:grid ${LABEL} text-white/35`}>
          <span className="col-span-1">No.</span>
          <span className="col-span-6">Experience</span>
          <span className="col-span-3">Location</span>
          <span className="col-span-2 text-right">Price</span>
        </div>
        <ol>
          {indexList.map((t, i) => (
            <li key={t.slug} className="reveal" style={{ ["--d" as string]: `${i * 50}ms` }}>
              <Link
                href={`/experiences/${t.slug}`}
                className="group relative grid grid-cols-[36px_1fr] items-center gap-x-4 gap-y-2 border-b border-white/10 py-6 transition-colors duration-700 hover:border-[#c9a86a]/50 md:grid-cols-12 md:gap-6 md:py-8"
              >
                <span className={`${SERIF} text-lg ${GOLD} md:col-span-1`}>{String(i + 1).padStart(2, "0")}</span>
                <span className="flex items-center gap-5 md:col-span-6">
                  <span className="relative hidden h-14 w-0 shrink-0 overflow-hidden transition-[width] duration-700 ease-[cubic-bezier(.2,.7,.1,1)] group-hover:w-20 md:block">
                    <span className="absolute inset-0 block w-20">
                      <Pic name={thumbs[t.slug]} sizes="80px" alt="" />
                    </span>
                  </span>
                  <span
                    className={`${SERIF} text-[clamp(1.6rem,3.2vw,2.9rem)] leading-[1.02] transition-transform duration-700 ease-[cubic-bezier(.2,.7,.1,1)] group-hover:translate-x-2 group-hover:italic`}
                  >
                    {t.title}
                  </span>
                </span>
                <span className={`col-start-2 text-[13px] text-white/50 md:col-span-3 md:col-start-auto md:text-[14px]`}>
                  {t.location}
                  <span className="text-white/25"> &middot; {t.timing}</span>
                </span>
                <span className="col-start-2 flex items-center gap-3 text-[13px] text-white/80 md:col-span-2 md:col-start-auto md:justify-end md:text-[14px]">
                  {price(t)}
                  <span className="inline-block -translate-x-2 text-[#c9a86a] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                    &rarr;
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex items-center justify-between">
          <p className="text-[13px] text-white/40">
            {indexList.length} of {tours.length} experiences shown
          </p>
          <Link
            href="/experiences"
            className={`${LABEL} border-b border-[#c9a86a]/60 pb-1 text-[#c9a86a] transition-colors duration-500 hover:border-white hover:text-white`}
          >
            View the full index
          </Link>
        </div>
      </section>

      {/* ───────── Diptych ───────── */}
      <section className={`relative z-20 overflow-hidden bg-[#0b0c10] py-28 md:py-40 ${PAD}`}>
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <div className="reveal-img relative aspect-[4/3] overflow-hidden">
              <Pic name="combo-mosque-3" sizes="(min-width: 768px) 58vw, 100vw" alt="A Tanoura dancer under string lights" />
            </div>
            <p className={`${LABEL} mt-4 text-white/40`}>Fig. 1 &mdash; Tanoura, 20:40</p>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:mt-40">
            <div className="reveal-img relative aspect-[3/4] overflow-hidden" style={{ ["--d" as string]: "200ms" }}>
              <Pic name="premium-evening-4" sizes="(min-width: 768px) 33vw, 100vw" alt="BBQ dinner served at the camp" />
            </div>
            <p className={`${LABEL} mt-4 text-white/40`}>Fig. 2 &mdash; Dinner off the coals, 19:30</p>
            <p className={`${SERIF} reveal mt-10 text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.15] text-white/85`}>
              &ldquo;Lehbab&rdquo; &mdash; the dunes south-east of the city, where the sand runs <em className={`italic ${GOLD}`}>red</em> at dusk.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Journal ───────── */}
      <section className={`relative z-20 border-t border-white/10 bg-[#0b0c10] py-24 md:py-32 ${PAD}`}>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className={`${LABEL} reveal ${GOLD}`}>From the journal</p>
            <h2 className={`${SERIF} reveal mt-6 text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.95]`}>
              Notes written <em className="italic">after dark</em>
            </h2>
          </div>
          <ul className="md:col-span-8">
            {posts.slice(0, 3).map((p) => (
              <li key={p.slug} className="reveal">
                <Link
                  href={`/journal/${p.slug}`}
                  className="group grid gap-3 border-b border-white/10 py-7 first:pt-0 md:grid-cols-[140px_1fr] md:gap-8"
                >
                  <span className={`${LABEL} pt-2 text-white/40`}>
                    {p.category} &middot;{" "}
                    {new Date(p.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                  </span>
                  <span>
                    <span className={`${SERIF} block text-[clamp(1.5rem,2.4vw,2.2rem)] leading-[1.1] transition-colors duration-500 group-hover:text-[#c9a86a]`}>
                      {p.title}
                    </span>
                    <span className="mt-3 block max-w-xl text-[14px] leading-relaxed text-white/50">{p.excerpt}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Finale: reservation under the stars ───────── */}
      <section className="relative z-20 min-h-[100svh] overflow-hidden bg-[#070814]">
        <div className="absolute inset-0 bg-[radial-gradient(1.2px_1.2px_at_12%_18%,#fff_50%,transparent),radial-gradient(1px_1px_at_28%_62%,#fff_50%,transparent),radial-gradient(1.4px_1.4px_at_44%_30%,#f4e7c8_50%,transparent),radial-gradient(1px_1px_at_63%_12%,#fff_50%,transparent),radial-gradient(1px_1px_at_71%_48%,#fff_50%,transparent),radial-gradient(1.6px_1.6px_at_86%_24%,#f4e7c8_50%,transparent),radial-gradient(1px_1px_at_92%_70%,#fff_50%,transparent),radial-gradient(1px_1px_at_8%_80%,#fff_50%,transparent),radial-gradient(1.2px_1.2px_at_53%_84%,#fff_50%,transparent),radial-gradient(1px_1px_at_36%_8%,#fff_50%,transparent),radial-gradient(1px_1px_at_78%_88%,#fff_50%,transparent),radial-gradient(1px_1px_at_18%_42%,#fff_50%,transparent)] opacity-70 animate-[nftwinkle_6s_ease-in-out_infinite_alternate]" />
        <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_5%_35%,#fff_50%,transparent),radial-gradient(1px_1px_at_23%_90%,#fff_50%,transparent),radial-gradient(1px_1px_at_40%_50%,#fff_50%,transparent),radial-gradient(1.2px_1.2px_at_58%_40%,#fff_50%,transparent),radial-gradient(1px_1px_at_67%_75%,#fff_50%,transparent),radial-gradient(1px_1px_at_81%_8%,#fff_50%,transparent),radial-gradient(1px_1px_at_96%_44%,#fff_50%,transparent),radial-gradient(1px_1px_at_32%_26%,#fff_50%,transparent)] opacity-40 animate-[nftwinkle_9s_ease-in-out_infinite_alternate-reverse]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_110%,rgba(201,168,106,0.18),transparent_55%),radial-gradient(ellipse_at_0%_0%,rgba(40,40,110,0.35),transparent_60%)]" />
        <style>{`@keyframes nftwinkle{0%{opacity:.25}100%{opacity:.8}}`}</style>

        <div className={`relative flex min-h-[100svh] flex-col justify-between py-24 md:py-32 ${PAD}`}>
          <p className={`${LABEL} reveal flex items-center gap-4 ${GOLD}`}>
            <span className="h-px w-10 bg-[#c9a86a]" />
            Reservations
          </p>
          <div className="mt-16">
            <h2 className={`${SERIF} max-w-[13ch] text-[clamp(3.2rem,10vw,9.5rem)] leading-[0.88] tracking-[-0.025em]`}>
              <Split>
                Reserve your night <em className={`italic ${GOLD}`}>under the stars.</em>
              </Split>
            </h2>
            <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-2">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 bg-[#070814] py-8 pr-2 transition-colors duration-700 hover:bg-[#c9a86a] md:px-8 md:py-10"
              >
                <span>
                  <span className={`${LABEL} block text-white/45 transition-colors duration-700 group-hover:text-[#0b0c10]/60`}>WhatsApp</span>
                  <span className={`${SERIF} mt-2 block text-[clamp(1.8rem,3.4vw,3rem)] leading-none transition-colors duration-700 group-hover:text-[#0b0c10]`}>
                    Message the <em className="italic">concierge</em>
                  </span>
                </span>
                <span className="text-2xl text-[#c9a86a] transition-all duration-700 group-hover:translate-x-1 group-hover:text-[#0b0c10]">&rarr;</span>
              </a>
              <a
                href={site.phoneHref}
                className="group flex items-center justify-between gap-6 bg-[#070814] py-8 pr-2 transition-colors duration-700 hover:bg-[#e9e4da] md:px-8 md:py-10"
              >
                <span>
                  <span className={`${LABEL} block text-white/45 transition-colors duration-700 group-hover:text-[#0b0c10]/60`}>Call</span>
                  <span className={`${SERIF} mt-2 block text-[clamp(1.8rem,3.4vw,3rem)] leading-none transition-colors duration-700 group-hover:text-[#0b0c10]`}>
                    {site.phone}
                  </span>
                </span>
                <span className="text-2xl text-[#c9a86a] transition-all duration-700 group-hover:translate-x-1 group-hover:text-[#0b0c10]">&rarr;</span>
              </a>
            </div>
            <div className="mt-8 flex flex-col gap-2 text-[13px] text-white/50 md:flex-row md:gap-10">
              <span>{site.response}</span>
              <span>{site.cancellation}</span>
              <span>{site.hours}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Footer ───────── */}
      <footer className={`relative z-20 border-t border-white/10 bg-[#070814] pb-10 pt-16 md:pt-20 ${PAD}`}>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className={`${SERIF} text-[clamp(3rem,7vw,6rem)] leading-[0.85] tracking-[-0.02em]`}>
              Desert <em className={`italic ${GOLD}`}>Stars</em>
            </p>
            <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-white/45">{site.tagline}.</p>
          </div>
          <div className="md:col-span-2">
            <p className={`${LABEL} mb-5 text-white/35`}>Explore</p>
            <ul className="space-y-2.5 text-[14px]">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-white/70 transition-colors duration-500 hover:text-[#c9a86a]">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className={`${LABEL} mb-5 text-white/35`}>Journeys</p>
            <ul className="space-y-2.5 text-[14px]">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/experiences#${c.slug}`} className="text-white/70 transition-colors duration-500 hover:text-[#c9a86a]">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className={`${LABEL} mb-5 text-white/35`}>Contact</p>
            <ul className="space-y-2.5 text-[14px] text-white/70">
              <li>
                <a href={site.phoneHref} className="transition-colors duration-500 hover:text-[#c9a86a]">{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="break-all transition-colors duration-500 hover:text-[#c9a86a]">{site.email}</a>
              </li>
              <li className="text-white/45">{site.address}</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12px] text-white/35 md:flex-row md:justify-between">
          <span>&copy; {new Date().getFullYear()} {site.name}. Dubai, United Arab Emirates.</span>
          <span className={GOLD}>Design 2 &middot; Nightfall</span>
        </div>
      </footer>
    </div>
  );
}
