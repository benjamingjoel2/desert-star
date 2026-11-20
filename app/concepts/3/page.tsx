import Link from "next/link";
import { Fraunces, Newsreader, IBM_Plex_Mono } from "next/font/google";
import { tours, getTour, price, type Tour } from "@/lib/tours";
import { site, waLink, categories } from "@/data/site";
import { posts } from "@/data/journal";
import Pic from "@/components/Pic";
import Split from "@/components/Split";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--m3-display",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});
const text = Newsreader({
  subsets: ["latin"],
  variable: "--m3-text",
  style: ["normal", "italic"],
});
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--m3-mono", weight: ["400", "500"] });

export const metadata = { title: "Design 3 · The magazine" };

const D = "[font-family:var(--m3-display)]";
const M = "[font-family:var(--m3-mono)] uppercase tracking-[0.14em]";
const PAD = "px-5 md:px-10";

const pad2 = (n: number) => String(n).padStart(2, "0");
const no = (t: Tour) => pad2(tours.indexOf(t) + 1);
const pageOf = (t: Tour) => 8 + tours.indexOf(t) * 6;

const coverLines = [
  "premium-evening-desert-safari",
  "premium-morning-desert-safari",
  "grand-mosque-and-desert-safari",
  "dubai-marina-dhow-cruise",
  "sharjah-city-tour",
]
  .map((s) => getTour(s))
  .filter((t): t is Tour => Boolean(t));

const lead = getTour("premium-evening-desert-safari") ?? tours[0];

const essay: { name: string; cap: string; box: string; aspect: string }[] = [
  { name: "camel-caravan", cap: "A caravan crosses the Lehbab red dunes in the last hour of light.", box: "col-span-12 md:col-span-7", aspect: "aspect-[4/3]" },
  { name: "combo-mosque-3", cap: "The Tanoura turns, and the skirt becomes a wheel of colour.", box: "col-span-7 md:col-span-4 md:col-start-9 md:mt-40", aspect: "aspect-[3/4]" },
  { name: "combo-mosque-2", cap: "The falcon, hooded, waiting on the glove.", box: "col-span-5 mt-24 md:mt-0 md:col-span-3 md:col-start-2", aspect: "aspect-[4/5]" },
  { name: "standard-sunset-3", cap: "Fire show after dark, at the centre of camp.", box: "col-span-12 md:col-span-6 md:col-start-6 md:-mt-24", aspect: "aspect-[16/10]" },
  { name: "premium-evening-4", cap: "The BBQ, served under lanterns.", box: "col-span-6 md:col-span-4 md:col-start-1", aspect: "aspect-square" },
  { name: "camel-grazing", cap: "Morning, and the camels have the desert to themselves.", box: "col-span-6 mt-16 md:mt-32 md:col-span-7 md:col-start-6", aspect: "aspect-[3/2]" },
];

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const nav = [
  { href: "/experiences", label: "Experiences" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/enquire", label: "Enquire" },
];

export default function MagazineConcept() {
  return (
    <div
      className={`${display.variable} ${text.variable} ${mono.variable} min-h-screen overflow-x-clip bg-[#efe9df] text-[#141210] [font-family:var(--m3-text)] selection:bg-[#8a2b1d] selection:text-[#efe9df]`}
    >
      {/* ───────────── MASTHEAD ───────────── */}
      <header className={`${PAD} pt-4`}>
        <div className={`${M} flex items-center justify-between gap-4 text-[10px] md:text-[11px]`}>
          <span className="hidden sm:inline">Issue Nº 01 — Winter 2026 — Dubai</span>
          <span className="sm:hidden">Nº 01 — Winter 2026</span>
          <div className="flex items-center gap-5">
            <a href={site.phoneHref} className="hidden md:inline hover:text-[#8a2b1d]">{site.phone}</a>
            <Link href="/enquire" className="border-b border-[#8a2b1d] pb-px text-[#8a2b1d] hover:border-[#141210] hover:text-[#141210]">
              Enquire →
            </Link>
          </div>
        </div>
        <div className="mt-3 border-t-[3px] border-[#141210]" />
        <div className="overflow-hidden">
          <Link href="/concepts/3" aria-label="Desert Stars, home" className="block">
            <h1
              className={`${D} whitespace-nowrap pt-2 text-[clamp(3.2rem,14.6vw,15rem)] font-[600] leading-[0.86] tracking-[-0.055em] [font-variation-settings:'opsz'_144,'SOFT'_0]`}
            >
              <Split>
                Desert <em className="font-[400] italic tracking-[-0.04em] text-[#8a2b1d]">Stars</em>
              </Split>
            </h1>
          </Link>
        </div>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-1 border-b border-[#141210] pb-2">
          <p className="max-w-md text-[15px] italic leading-snug md:text-[17px]">
            A journal of the dunes, the camps and the cities of the Emirates.
          </p>
          <p className={`${M} text-[10px]`}>{site.stats[0].value} guests · since the first dune</p>
        </div>
        <nav aria-label="Sections" className="border-b border-[#141210]/25">
          <ul className={`${M} -mx-2 flex items-center gap-1 overflow-x-auto py-2.5 text-[11px] [scrollbar-width:none] md:justify-between`}>
            {nav.map((n, i) => (
              <li key={n.href} className="shrink-0">
                <Link href={n.href} className="group inline-flex items-baseline gap-2 px-2 py-1 hover:text-[#8a2b1d]">
                  <span className="text-[#8a2b1d]">§{i + 1}</span>
                  <span className="border-b border-transparent group-hover:border-current">{n.label}</span>
                </Link>
              </li>
            ))}
            {categories.map((c) => (
              <li key={c.slug} className="hidden shrink-0 lg:block">
                <Link href={`/experiences#${c.slug}`} className="px-2 py-1 text-[#141210]/55 hover:text-[#8a2b1d]">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        {/* ───────────── COVER SPREAD ───────────── */}
        <section className={`${PAD} grid grid-cols-12 gap-x-5 gap-y-8 pt-6 md:gap-x-8 md:pt-10`}>
          <figure className="col-span-12 lg:col-span-8">
            <div className="hero-zoom relative aspect-[4/5] overflow-hidden bg-[#d9d0c2] sm:aspect-[3/2] lg:aspect-[16/11]">
              <Pic
                name="dunes-cruiser"
                priority
                sizes="(min-width:1024px) 66vw, 100vw"
                alt="A 4x4 cresting a red dune outside Dubai"
              />
              <div className="absolute left-4 top-4 bg-[#efe9df] px-2.5 py-1.5 md:left-6 md:top-6">
                <span className={`${M} text-[10px] text-[#8a2b1d]`}>Cover story · p. {pageOf(lead)}</span>
              </div>
            </div>
            <figcaption className={`${M} mt-2.5 flex justify-between gap-4 text-[10px] text-[#141210]/65`}>
              <span>Fig. 1 — Dune bashing, Lehbab, 4:52 pm</span>
              <span className="hidden sm:inline">Photograph: Heba Hashem</span>
            </figcaption>
          </figure>

          <aside className="col-span-12 flex flex-col lg:col-span-4">
            <h2 className={`${D} reveal text-[clamp(2.4rem,5vw,4.4rem)] font-[400] leading-[0.95] tracking-[-0.035em]`}>
              The red dunes, <em className="text-[#8a2b1d]">after the heat</em> has gone.
            </h2>
            <p className="reveal mt-5 max-w-md text-[17px] leading-[1.55] text-[#141210]/80">
              Pick-up from your door in Dubai, an hour into the Lehbab sands, and an evening in a lantern-lit Bedouin
              camp. This issue is about how to spend the desert well.
            </p>

            <div className="mt-8 border-t-[2px] border-[#141210] pt-3 lg:mt-auto">
              <p className={`${M} mb-1 text-[10px] text-[#8a2b1d]`}>In this issue</p>
              <ol>
                {coverLines.map((t, i) => (
                  <li key={t.slug} className="reveal border-b border-[#141210]/20" style={{ ["--d" as string]: `${i * 70}ms` }}>
                    <Link href={`/experiences/${t.slug}`} className="group grid grid-cols-[2.2rem_1fr_auto] items-baseline gap-3 py-3">
                      <span className={`${D} text-[22px] italic text-[#8a2b1d]`}>{i + 1}</span>
                      <span className={`${D} text-[19px] leading-tight tracking-[-0.01em] group-hover:underline group-hover:decoration-[#8a2b1d] group-hover:decoration-1 group-hover:underline-offset-4`}>
                        {t.title}
                      </span>
                      <span className={`${M} text-[10px] text-[#141210]/60`}>p. {pageOf(t)}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </section>

        {/* ───────────── FEATURE ───────────── */}
        <article className={`${PAD} mt-24 md:mt-36`}>
          <header className="grid grid-cols-12 gap-x-5 border-t border-[#141210] pt-4 md:gap-x-8">
            <p className={`${M} col-span-12 text-[10px] text-[#8a2b1d] md:col-span-3`}>
              Feature — p. {pageOf(lead)}
            </p>
            <div className="col-span-12 mt-6 md:col-span-9 md:mt-0">
              <h2 className={`${D} text-[clamp(2.8rem,8vw,8.5rem)] font-[350] leading-[0.9] tracking-[-0.045em]`}>
                <Split>
                  An evening at <em className="text-[#8a2b1d]">the edge</em> of the Empty Quarter
                </Split>
              </h2>
              <p className="reveal mt-6 max-w-2xl text-[20px] italic leading-snug text-[#141210]/75 md:text-[24px]">
                Six hours, one dune sea, a falcon, a fire, and a sky that does the rest. A field report on the{" "}
                {lead.title.toLowerCase()}.
              </p>
              <p className={`${M} mt-5 text-[10px] text-[#141210]/60`}>
                Words: the Desert Stars desk · {lead.location} · {lead.timing}
              </p>
            </div>
          </header>

          <div className="mt-12 grid grid-cols-12 gap-x-5 gap-y-10 md:mt-16 md:gap-x-8">
            <figure className="col-span-12 md:col-span-5 md:row-span-2">
              <div className="reveal-img relative aspect-[4/5] overflow-hidden bg-[#d9d0c2]">
                <Pic name="camp-lanterns" sizes="(min-width:768px) 40vw, 100vw" alt="Lanterns lit across the Bedouin camp at dusk" />
              </div>
              <figcaption className={`${M} mt-2.5 text-[10px] text-[#141210]/65`}>
                Fig. 2 — The lantern-lit Bedouin camp, an hour after sunset.
              </figcaption>
            </figure>

            <div className="col-span-12 md:col-span-7">
              <div className="gap-10 text-[17px] leading-[1.62] md:columns-2 [&>p+p]:mt-4 [&>p+p]:indent-6">
                <p className={`first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:[font-family:var(--m3-display)] first-letter:text-[5.4em] first-letter:font-[500] first-letter:leading-[0.8] first-letter:text-[#8a2b1d]`}>
                  The car arrives at your door in Dubai
                  in the middle of the afternoon, and for the first half hour the city keeps you company: towers, then
                  warehouses, then a road that seems to lose interest in where it is going. Then the colour of the sand
                  changes. Lehbab is red, properly red, and by the time the tyres are let down you understand why people
                  come back for it.
                </p>
                <p>
                  The dune drive is the loud part of the evening, and it is over quickly. What follows is slower. A camel
                  ride along the ridge, a falcon on a gloved hand, the light going from brass to rose to nothing at all.
                  Nobody tells you to look at the sunset. You simply stop talking.
                </p>
                <p>
                  Camp is a ring of low tents and carpets around an open floor, lit by lanterns. The BBQ is served as the
                  dark settles; then the Tanoura dancer turns until the skirt becomes a wheel, and the fire performer
                  makes the sand glow orange for a few minutes at a time.
                </p>
                <p>
                  The drive home is quiet. Most guests sleep. If you plan it right, there is nothing to plan at all:
                  booking comes with free cancellation up to 24 hours before, and every question gets an answer within
                  30 minutes, at any hour.
                </p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <blockquote className="reveal border-y-[2px] border-[#141210] py-8 md:py-10">
                <p className={`${D} text-[clamp(2rem,4.2vw,3.8rem)] font-[350] italic leading-[1.02] tracking-[-0.03em]`}>
                  <span className="text-[#8a2b1d]">“</span>The desert does not do small talk. It goes quiet, and then
                  the stars come out.<span className="text-[#8a2b1d]">”</span>
                </p>
                <footer className={`${M} mt-5 text-[10px] text-[#141210]/60`}>— From the field notes</footer>
              </blockquote>
              <div className="mt-8 grid grid-cols-[1fr_auto] items-end gap-5 sm:grid-cols-[7rem_1fr_auto]">
                <div className="reveal-img relative hidden aspect-square overflow-hidden sm:block">
                  <Pic name="combo-3in1-3" sizes="112px" alt="A woman holding a falcon in the desert" />
                </div>
                <div>
                  <p className={`${M} text-[10px] text-[#141210]/60`}>The evening, booked</p>
                  <p className={`${D} mt-1 text-[24px] leading-tight tracking-[-0.015em]`}>{lead.title}</p>
                  <p className={`${M} mt-1 text-[11px] text-[#8a2b1d]`}>{price(lead)} · {lead.timing}</p>
                </div>
                <Link
                  href={`/experiences/${lead.slug}`}
                  className={`${M} inline-flex h-12 items-center bg-[#141210] px-5 text-[11px] text-[#efe9df] transition-colors hover:bg-[#8a2b1d]`}
                >
                  Read on →
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* ───────────── NUMBERS BAND ───────────── */}
        <section className="relative mt-24 overflow-hidden bg-[#0e0d0c] text-[#efe9df] md:mt-36">
          <div data-parallax="0.15" className="absolute inset-x-0 -top-[20%] h-[140%] opacity-[0.28]">
            <Pic name="night-sky" sizes="100vw" alt="" />
          </div>
          <div className={`${PAD} relative py-16 md:py-24`}>
            <div className="flex items-baseline justify-between border-b border-[#efe9df]/30 pb-3">
              <p className={`${M} text-[10px] text-[#efe9df]/70`}>By the numbers</p>
              <p className={`${M} text-[10px] text-[#c9624f]`}>p. 54</p>
            </div>
            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {site.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`reveal border-[#efe9df]/30 pb-6 pt-8 md:pb-10 md:pt-12 ${i % 2 ? "border-l pl-4 md:pl-8" : "lg:pr-8"} ${i === 2 ? "lg:border-l lg:pl-8" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""}`}
                  style={{ ["--d" as string]: `${i * 90}ms` }}
                >
                  <dt className={`${M} text-[10px] text-[#efe9df]/65`}>
                    <span className="text-[#c9624f]">{pad2(i + 1)} </span>
                    {s.label}
                  </dt>
                  <dd className={`${D} mt-3 text-[clamp(3.4rem,9vw,8.5rem)] font-[300] leading-[0.85] tracking-[-0.06em]`}>
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 max-w-xl text-[18px] italic leading-snug text-[#efe9df]/80 md:mt-14 md:text-[21px]">
              Sixteen experiences, one standard: collected from your door, looked after by people who know the sand.
            </p>
          </div>
        </section>

        {/* ───────────── PHOTO ESSAY ───────────── */}
        <section className={`${PAD} mt-24 md:mt-36`}>
          <div className="grid grid-cols-12 gap-x-5 border-t border-[#141210] pt-4 md:gap-x-8">
            <p className={`${M} col-span-12 text-[10px] text-[#8a2b1d] md:col-span-3`}>Portfolio — p. 62</p>
            <h2 className={`${D} col-span-12 mt-5 text-[clamp(2.6rem,7vw,7rem)] font-[350] leading-[0.92] tracking-[-0.045em] md:col-span-9 md:mt-0`}>
              <Split>
                Field notes, <em className="text-[#8a2b1d]">in pictures</em>
              </Split>
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-12 gap-x-4 gap-y-10 md:mt-20 md:gap-x-8 md:gap-y-16">
            {essay.map((e, i) => (
              <figure key={e.name} className={e.box}>
                <div className={`reveal-img zoom relative overflow-hidden bg-[#d9d0c2] ${e.aspect}`}>
                  <Pic name={e.name} sizes="(min-width:768px) 55vw, 100vw" alt={e.cap} />
                </div>
                <figcaption className={`${M} mt-2.5 text-[10px] leading-relaxed text-[#141210]/65`}>
                  <span className="text-[#8a2b1d]">Fig. {i + 3} —</span> {e.cap}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ───────────── INDEX ───────────── */}
        <section id="index" className={`${PAD} mt-24 md:mt-40`}>
          <div className="grid grid-cols-12 gap-x-5 border-t-[3px] border-[#141210] pt-4 md:gap-x-8">
            <p className={`${M} col-span-12 text-[10px] text-[#8a2b1d] md:col-span-3`}>Index of experiences</p>
            <div className="col-span-12 mt-5 md:col-span-9 md:mt-0">
              <h2 className={`${D} text-[clamp(2.6rem,7vw,7rem)] font-[350] leading-[0.92] tracking-[-0.045em]`}>
                Contents, <em className="text-[#8a2b1d]">all {tours.length}</em>
              </h2>
              <p className="mt-4 max-w-xl text-[17px] italic text-[#141210]/70">
                Every journey we run, from the dunes to the creek. Prices per adult.
              </p>
            </div>
          </div>

          <div className="mt-10 md:mt-14">
            <div className={`${M} hidden grid-cols-12 gap-x-8 border-b border-[#141210] pb-2 text-[10px] text-[#141210]/60 md:grid`}>
              <span className="col-span-1">No.</span>
              <span className="col-span-5">Title</span>
              <span className="col-span-2">Place</span>
              <span className="col-span-2">Duration</span>
              <span className="col-span-2 text-right">Price</span>
            </div>
            <ol>
              {tours.map((t) => (
                <li key={t.slug} className="border-b border-[#141210]/20">
                  <Link
                    href={`/experiences/${t.slug}`}
                    className="group grid grid-cols-[2.4rem_1fr] gap-x-3 py-4 transition-colors hover:bg-[#e6dfd2] md:grid-cols-12 md:items-baseline md:gap-x-8 md:py-5"
                  >
                    <span className={`${D} text-[18px] italic text-[#8a2b1d] md:col-span-1 md:text-[22px]`}>{no(t)}</span>
                    <span className="md:col-span-5">
                      <span className={`${D} block text-[20px] leading-tight tracking-[-0.015em] transition-transform duration-500 group-hover:translate-x-1.5 md:text-[26px]`}>
                        {t.title}
                      </span>
                      <span className={`${M} mt-1.5 block text-[10px] text-[#141210]/60 md:hidden`}>
                        {t.location} · {t.timing}
                      </span>
                      <span className={`${M} mt-1 block text-[10px] text-[#8a2b1d] md:hidden`}>{price(t)}</span>
                    </span>
                    <span className="hidden text-[15px] md:col-span-2 md:block">{t.location}</span>
                    <span className="hidden text-[15px] italic text-[#141210]/75 md:col-span-2 md:block">{t.timing}</span>
                    <span className={`${M} hidden text-right text-[11px] text-[#8a2b1d] md:col-span-2 md:block`}>
                      {price(t)}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
              <p className={`${M} text-[10px] text-[#141210]/60`}>
                Free cancellation up to 24 hours before · Pick-up from your door in Dubai
              </p>
              <Link href="/experiences" className={`${M} border-b border-[#141210] pb-0.5 text-[11px] hover:border-[#8a2b1d] hover:text-[#8a2b1d]`}>
                All experiences →
              </Link>
            </div>
          </div>
        </section>

        {/* ───────────── ALSO IN THIS ISSUE ───────────── */}
        <section className={`${PAD} mt-24 md:mt-36`}>
          <div className="flex items-baseline justify-between border-t border-[#141210] pt-4">
            <h2 className={`${D} text-[28px] italic tracking-[-0.02em] md:text-[40px]`}>Also in this issue</h2>
            <Link href="/journal" className={`${M} text-[10px] hover:text-[#8a2b1d]`}>The Journal →</Link>
          </div>
          <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[#141210]/25">
            {posts.slice(0, 3).map((p, i) => (
              <Link key={p.slug} href={`/journal/${p.slug}`} className={`group reveal block ${i ? "md:pl-8" : ""} ${i < 2 ? "md:pr-8" : ""}`} style={{ ["--d" as string]: `${i * 90}ms` }}>
                <div className="reveal-img zoom relative aspect-[3/2] overflow-hidden bg-[#d9d0c2]">
                  <Pic name={p.image} sizes="(min-width:768px) 30vw, 100vw" alt={p.title} />
                </div>
                <p className={`${M} mt-4 flex justify-between text-[10px] text-[#141210]/60`}>
                  <span className="text-[#8a2b1d]">{p.category}</span>
                  <span>{fmtDate(p.date)}</span>
                </p>
                <h3 className={`${D} mt-2 text-[24px] leading-[1.08] tracking-[-0.02em] group-hover:text-[#8a2b1d]`}>{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-[16px] leading-[1.5] text-[#141210]/75">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ───────────── LETTERS / ENQUIRY ───────────── */}
        <section className={`${PAD} mt-24 md:mt-36`}>
          <div className="grid grid-cols-12 gap-x-5 border-y-[2px] border-[#141210] py-10 md:gap-x-8 md:py-16">
            <p className={`${M} col-span-12 text-[10px] text-[#8a2b1d] md:col-span-3`}>Letters to the desk</p>
            <div className="col-span-12 mt-5 md:col-span-9 md:mt-0">
              <p className={`${D} text-[clamp(2.2rem,5.6vw,5.4rem)] font-[350] leading-[0.98] tracking-[-0.04em]`}>
                Write to us, and we will plan the evening around you. <em className="text-[#8a2b1d]">We reply within 30 minutes.</em>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/enquire" className={`${M} inline-flex h-12 items-center bg-[#8a2b1d] px-6 text-[11px] text-[#efe9df] transition-colors hover:bg-[#141210]`}>
                  Send an enquiry →
                </Link>
                <a
                  href={waLink("Hello Desert Stars, I'd like to plan a desert safari.")}
                  className={`${M} inline-flex h-12 items-center border border-[#141210] px-6 text-[11px] transition-colors hover:bg-[#141210] hover:text-[#efe9df]`}
                >
                  WhatsApp the desk
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ───────────── COLOPHON ───────────── */}
      <footer className={`${PAD} mt-24 pb-10 md:mt-32`}>
        <div className="border-t-[3px] border-[#141210] pt-6">
          <p className={`${D} text-[clamp(2.6rem,9vw,8rem)] font-[600] leading-[0.85] tracking-[-0.055em]`}>
            Desert <em className="font-[400] text-[#8a2b1d]">Stars</em>
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 text-[15px] leading-relaxed md:grid-cols-4 md:gap-x-8">
            <div className="col-span-2 md:col-span-1">
              <p className={`${M} mb-2 text-[10px] text-[#8a2b1d]`}>Colophon</p>
              <p className="italic text-[#141210]/75">
                Issue Nº 01, Winter 2026. Set in Fraunces, Newsreader and IBM Plex Mono. Printed on sand, read at dusk.
              </p>
            </div>
            <div>
              <p className={`${M} mb-2 text-[10px] text-[#8a2b1d]`}>Sections</p>
              <ul>
                {nav.map((n) => (
                  <li key={n.href}><Link href={n.href} className="hover:text-[#8a2b1d]">{n.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className={`${M} mb-2 text-[10px] text-[#8a2b1d]`}>The desk</p>
              <ul>
                <li><a href={site.phoneHref} className="hover:text-[#8a2b1d]">{site.phone}</a></li>
                <li><a href={`mailto:${site.email}`} className="break-all hover:text-[#8a2b1d]">{site.email}</a></li>
                <li><a href={waLink("Hello Desert Stars")} className="hover:text-[#8a2b1d]">WhatsApp</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className={`${M} mb-2 text-[10px] text-[#8a2b1d]`}>Address</p>
              <p>{site.address}</p>
              <p className="mt-2 italic text-[#141210]/70">{site.hours}</p>
            </div>
          </div>
          <div className={`${M} mt-12 flex flex-wrap justify-between gap-3 border-t border-[#141210]/25 pt-4 text-[10px] text-[#141210]/60`}>
            <span>© {new Date().getFullYear()} Desert Stars · Dubai</span>
            <span>{site.response}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
