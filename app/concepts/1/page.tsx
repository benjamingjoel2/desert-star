import Link from "next/link";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import { getTour, price, type Tour } from "@/lib/tours";
import { site, waLink, categories } from "@/data/site";
import { posts } from "@/data/journal";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--q-serif",
});
const sans = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--q-sans" });

export const metadata = { title: "Design 1 · Quiet luxury" };

/* Palette: ivory #f3efe8, paper #ebe5db, ink #3b342e, muted #7d7268, hairline #d8d0c4, sand #a68a6a */
const S = "font-[family-name:var(--q-serif)]";
const label = "text-[10.5px] uppercase tracking-[0.24em] text-[#7d7268]";
const pad = "px-5 md:px-10";

/* Experiences for the rail, each with a hand-picked photo so nothing repeats on the page. */
const railPicks: [string, string][] = [
  ["premium-evening-desert-safari", "premium-evening-1"],
  ["evening-desert-safari", "standard-sunset-4"],
  ["premium-morning-desert-safari", "premium-morning-1"],
  ["self-drive-evening-desert-safari", "dunes-cruiser"],
  ["standard-sunset-desert-safari", "standard-sunset-3"],
  ["sheikh-zayed-grand-mosque-tour", "mosque-1"],
  ["dubai-city-tour", "dubai-skyline"],
  ["al-ain-city-tour", "alain-1"],
  ["sharjah-city-tour", "sharjah-blue-souk"],
  ["dubai-marina-dhow-cruise", "dubai-night"],
];
const rail = railPicks
  .map(([slug, img]) => ({ t: getTour(slug), img }))
  .filter((x): x is { t: Tour; img: string } => Boolean(x.t));

const signature = getTour("premium-evening-desert-safari");

function More({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] ${light ? "text-[#f3efe8]" : "text-[#3b342e]"}`}
    >
      <span className="relative pb-1.5">
        {children}
        <span className={`absolute bottom-0 left-0 h-px w-full origin-left transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-[0.35] ${light ? "bg-[#f3efe8]/70" : "bg-[#3b342e]/60"}`} />
      </span>
    </Link>
  );
}

const nav = [
  { href: "/experiences", label: "Experiences" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/enquire", label: "Enquire" },
];

export default function QuietLuxury() {
  const t = signature;
  return (
    <div
      className={`${serif.variable} ${sans.variable} min-h-screen overflow-x-clip bg-[#f3efe8] font-[family-name:var(--q-sans)] font-light text-[#3b342e] antialiased selection:bg-[#3b342e] selection:text-[#f3efe8]`}
    >
      <style>{`
        @keyframes qRail { from { transform: scaleX(.12) } to { transform: scaleX(1) } }
        .q-rail-wrap { timeline-scope: --qrail; }
        .q-rail { scroll-timeline: --qrail x; scrollbar-width: none; }
        .q-rail::-webkit-scrollbar { display: none; }
        .q-bar { transform: scaleX(.12); transform-origin: left; }
        @supports (animation-timeline: scroll()) {
          .q-bar { animation: qRail linear both; animation-timeline: --qrail; }
        }
      `}</style>

      {/* Header */}
      <header className={`${pad} sticky top-0 z-40 border-b border-[#d8d0c4]/70 bg-[#f3efe8]/90 backdrop-blur-md`}>
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/concepts/1" className={`${S} text-[22px] font-normal tracking-[0.01em] md:text-[24px]`}>
            Desert Stars
          </Link>
          <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
            {nav.slice(0, 3).map((n) => (
              <Link key={n.href} href={n.href} className="text-[11px] uppercase tracking-[0.22em] text-[#5e554d] transition-colors hover:text-[#3b342e]">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <a href={site.phoneHref} className="hidden text-[12px] tracking-[0.04em] text-[#7d7268] lg:inline">
              {site.phone}
            </a>
            <Link
              href="/enquire"
              className="border border-[#3b342e] px-4 py-2.5 text-[10.5px] uppercase tracking-[0.24em] transition-colors duration-500 hover:bg-[#3b342e] hover:text-[#f3efe8] md:px-6"
            >
              Enquire
            </Link>
          </div>
        </div>
        <nav className="-mx-5 flex gap-7 overflow-x-auto px-5 pb-3 md:hidden" aria-label="Primary mobile">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="shrink-0 text-[10.5px] uppercase tracking-[0.22em] text-[#5e554d]">
              {n.label}
            </Link>
          ))}
        </nav>
      </header>

      <main>
        {/* Hero: full-bleed image, headline below on ivory */}
        <section>
          <div className="relative h-[72svh] min-h-[420px] w-full overflow-hidden md:h-[86svh]">
            <div className="hero-zoom absolute inset-0">
              <Pic name="camel-caravan" priority sizes="100vw" alt="A camel caravan crossing a dune ridge at golden hour in the Dubai desert" />
            </div>
          </div>
          <div className={`${pad} pt-10 pb-20 md:pt-16 md:pb-32`}>
            <div className="flex items-center justify-between border-b border-[#d8d0c4] pb-4">
              <p className={label}>Dubai · Lehbab red dunes</p>
              <p className={`${label} hidden md:block`}>25.0° N, 55.6° E</p>
            </div>
            <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-10">
              <h1 className={`${S} text-[34px] font-light leading-[1.12] tracking-[-0.005em] md:col-span-7 md:text-[52px]`}>
                <Split>
                  An evening in the red dunes, <em className="italic text-[#8a6f52]">arranged with quiet care</em> from your door in Dubai.
                </Split>
              </h1>
              <div className="reveal md:col-span-4 md:col-start-9 md:pt-3">
                <p className="text-[15px] leading-[1.8] text-[#5e554d]">
                  Private desert safaris and Emirates journeys. We collect you, drive you out to the dunes of Lehbab, and bring
                  you back under the stars after dinner in a lantern-lit Bedouin camp.
                </p>
                <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                  <More href="/experiences">Discover experiences</More>
                  <More href="/enquire">Plan an evening</More>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats line */}
        <section className={`${pad} pb-20 md:pb-32`}>
          <dl className="grid grid-cols-2 border-t border-[#d8d0c4] md:grid-cols-4">
            {site.stats.map((s, i) => (
              <div
                key={s.label}
                className={`reveal border-b border-[#d8d0c4] py-7 md:border-b-0 md:py-9 ${i % 2 === 1 ? "pl-5 md:pl-8" : ""} ${i > 0 ? "md:border-l md:pl-8" : ""} ${i % 2 === 1 ? "border-l" : ""}`}
              >
                <dt className={label}>{s.label}</dt>
                <dd className={`${S} mt-3 text-[30px] font-light leading-none md:text-[38px]`}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Feature block 1: the evening */}
        <section className={`${pad} pb-24 md:pb-40`}>
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <div className="reveal-img relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
                <Pic name="camp-lanterns" sizes="(min-width: 768px) 56vw, 100vw" alt="A Bedouin camp lit by lanterns at dusk" />
              </div>
              <p className={`${label} mt-4`}>The camp, an hour after sunset</p>
            </div>
            <div className="flex flex-col md:col-span-4 md:col-start-9">
              <p className={`${label} reveal`}>01 — The signature evening</p>
              <h2 className={`${S} reveal mt-6 text-[28px] font-light leading-[1.18] md:text-[36px]`}>
                Dune drive at golden hour, then dinner by lantern light
              </h2>
              <p className="reveal mt-6 text-[15px] leading-[1.85] text-[#5e554d]">
                {t?.short ??
                  "A 4x4 crossing of the red dunes, camel rides at dusk and a slow BBQ dinner in a lantern-lit camp."}
              </p>
              <ul className="reveal mt-8 border-t border-[#d8d0c4] text-[13.5px]">
                {[
                  "Pick-up from your door in Dubai",
                  "Camel rides and a falcon to meet",
                  "BBQ dinner in a Bedouin camp",
                  "Tanoura and fire shows after dark",
                ].map((h) => (
                  <li key={h} className="flex items-baseline gap-4 border-b border-[#d8d0c4] py-3.5 text-[#4a423b]">
                    <span className="h-px w-3 shrink-0 translate-y-[-3px] bg-[#a68a6a]" />
                    {h}
                  </li>
                ))}
              </ul>
              {t && (
                <div className="reveal mt-8 flex items-end justify-between gap-6">
                  <div>
                    <p className={label}>{t.timing}</p>
                    <p className={`${S} mt-2 text-[22px]`}>{price(t)}</p>
                  </div>
                  <More href={`/experiences/${t.slug}`}>Discover more</More>
                </div>
              )}
              <div className="reveal-img relative mt-12 hidden aspect-[4/3] w-3/4 self-end overflow-hidden md:mt-auto md:block">
                <Pic name="premium-evening-4" sizes="24vw" alt="BBQ dinner served at the desert camp" />
              </div>
            </div>
          </div>
        </section>

        {/* Feature block 2: reversed */}
        <section className={`${pad} border-t border-[#d8d0c4] pt-24 pb-24 md:pt-40 md:pb-40`}>
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="order-2 flex flex-col md:order-1 md:col-span-4">
              <p className={`${label} reveal`}>02 — Desert traditions</p>
              <h2 className={`${S} reveal mt-6 text-[28px] font-light leading-[1.18] md:text-[36px]`}>
                A falcon on the glove, a Tanoura dancer under the lights
              </h2>
              <p className="reveal mt-6 text-[15px] leading-[1.85] text-[#5e554d]">
                The old customs of the desert, kept close and unhurried. Meet a trained falcon at the camp, take a slow camel ride
                along the ridge, and stay for the Tanoura and fire shows once the sky has gone dark.
              </p>
              <div className="reveal mt-10">
                <More href="/experiences#desert">Discover desert safaris</More>
              </div>
              <div className="reveal-img relative mt-14 aspect-[3/4] w-2/3 overflow-hidden md:mt-auto">
                <Pic name="combo-mosque-3" sizes="(min-width: 768px) 22vw, 66vw" alt="A Tanoura dancer turning beneath string lights" />
              </div>
            </div>
            <div className="order-1 md:order-2 md:col-span-7 md:col-start-6">
              <div className="reveal-img relative aspect-[4/5] overflow-hidden">
                <Pic name="combo-3in1-3" sizes="(min-width: 768px) 56vw, 100vw" alt="A guest holding a falcon in the desert" />
              </div>
              <p className={`${label} mt-4`}>Falconry at the camp</p>
            </div>
          </div>
        </section>

        {/* Experience rail */}
        <section className="q-rail-wrap border-t border-[#d8d0c4] bg-[#ebe5db] pt-20 pb-20 md:pt-32 md:pb-28">
          <div className={`${pad} flex flex-col gap-6 md:flex-row md:items-end md:justify-between`}>
            <div>
              <p className={`${label} reveal`}>Experiences</p>
              <h2 className={`${S} reveal mt-5 max-w-[22ch] text-[28px] font-light leading-[1.18] md:text-[40px]`}>
                Sixteen ways to spend a day in the Emirates
              </h2>
            </div>
            <div className="reveal">
              <More href="/experiences">View all experiences</More>
            </div>
          </div>
          <ul
            className="q-rail mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 md:mt-16 md:gap-8 md:scroll-px-10 md:px-10"
            aria-label="Experiences"
          >
            {rail.map(({ t: r, img }, i) => (
              <li key={r.slug} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] md:w-[30vw] lg:w-[23vw]">
                <Link href={`/experiences/${r.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]">
                      <Pic name={img} sizes="(min-width: 1024px) 23vw, (min-width: 768px) 30vw, 78vw" alt={r.title} />
                    </div>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-[#d0c7b9] pb-3">
                    <p className={label}>
                      {String(i + 1).padStart(2, "0")} · {categories.find((c) => c.slug === r.category)?.name}
                    </p>
                    <p className="shrink-0 text-[11px] tracking-[0.06em] text-[#7d7268]">{r.timing}</p>
                  </div>
                  <h3 className={`${S} mt-4 text-[21px] font-normal leading-[1.25] md:text-[22px]`}>{r.title}</h3>
                  <p className="mt-2 text-[13px] tracking-[0.02em] text-[#5e554d]">{price(r)}</p>
                </Link>
              </li>
            ))}
            <li aria-hidden className="w-px shrink-0" />
          </ul>
          <div className={`${pad} mt-12 flex items-center gap-6`}>
            <div className="relative h-px flex-1 bg-[#d0c7b9]">
              <div className="q-bar absolute inset-0 bg-[#3b342e]" />
            </div>
            <p className={label}>Scroll</p>
          </div>
        </section>

        {/* Quiet image band */}
        <section className="relative h-[70svh] min-h-[420px] overflow-hidden md:h-[92svh]">
          <div data-parallax="0.15" className="absolute inset-x-0 -top-[12%] h-[124%]">
            <Pic name="night-sky" sizes="100vw" alt="The night sky full of stars over the desert" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d1814]/55 via-transparent to-transparent" />
          <div className={`${pad} absolute inset-x-0 bottom-0 pb-10 md:pb-16`}>
            <div className="grid gap-6 md:grid-cols-12 md:items-end">
              <p className={`${S} reveal text-[26px] font-light italic leading-[1.25] text-[#f3efe8] md:col-span-6 md:text-[34px]`}>
                Far from the city lights, the stars come out one by one.
              </p>
              <div className="reveal md:col-span-3 md:col-start-10 md:text-right">
                <More href="/experiences#desert" light>
                  The overnight desert
                </More>
              </div>
            </div>
          </div>
        </section>

        {/* Collections */}
        <section className={`${pad} py-24 md:py-40`}>
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <p className={`${label} reveal`}>Collections</p>
              <h2 className={`${S} reveal mt-6 text-[28px] font-light leading-[1.18] md:text-[36px]`}>
                Beyond the dunes
              </h2>
              <p className="reveal mt-6 max-w-[38ch] text-[15px] leading-[1.85] text-[#5e554d]">
                Guided days across Dubai, Abu Dhabi, Al Ain and Sharjah, dinner on the water, and the city&rsquo;s signature
                tickets, arranged by the same small team.
              </p>
            </div>
            <ul className="border-t border-[#d8d0c4] md:col-span-7 md:col-start-6">
              {categories.map((c, i) => (
                <li key={c.slug} className="reveal border-b border-[#d8d0c4]">
                  <Link href={`/experiences#${c.slug}`} className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-4 py-7 md:grid-cols-[3rem_1fr_1fr_auto] md:py-9">
                    <span className="text-[11px] tracking-[0.2em] text-[#a68a6a]">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`${S} text-[24px] font-light leading-tight transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:translate-x-2 md:text-[30px]`}>
                      {c.name}
                    </span>
                    <span className="col-span-3 col-start-2 row-start-2 text-[13.5px] leading-[1.7] text-[#7d7268] md:col-span-1 md:col-start-3 md:row-start-1">
                      {c.blurb}
                    </span>
                    <span className="col-start-3 row-start-1 text-[18px] text-[#7d7268] transition-colors group-hover:text-[#3b342e] md:col-start-4" aria-hidden>
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Journal */}
        <section className={`${pad} border-t border-[#d8d0c4] py-24 md:py-36`}>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className={`${label} reveal`}>Journal</p>
              <h2 className={`${S} reveal mt-5 text-[28px] font-light leading-[1.18] md:text-[36px]`}>Notes from the Emirates</h2>
            </div>
            <div className="reveal hidden md:block">
              <More href="/journal">Read the journal</More>
            </div>
          </div>
          <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-3 md:gap-8">
            {posts.slice(0, 3).map((p) => (
              <article key={p.slug} className="reveal">
                <Link href={`/journal/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]">
                      <Pic name={p.image} sizes="(min-width: 768px) 31vw, 100vw" alt={p.title} />
                    </div>
                  </div>
                  <p className={`${label} mt-5`}>
                    {p.category} ·{" "}
                    {new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                  <h3 className={`${S} mt-3 text-[21px] font-normal leading-[1.28] md:text-[23px]`}>{p.title}</h3>
                  <p className="mt-3 line-clamp-2 text-[13.5px] leading-[1.75] text-[#5e554d]">{p.excerpt}</p>
                  <span className="mt-5 inline-block border-b border-[#3b342e]/50 pb-1 text-[11px] uppercase tracking-[0.22em]">
                    Read
                  </span>
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-12 md:hidden">
            <More href="/journal">Read the journal</More>
          </div>
        </section>

        {/* Enquiry */}
        <section className={`${pad} bg-[#e6dfd3] py-24 md:py-36`}>
          <div className="grid gap-14 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <p className={`${label} reveal`}>Enquire</p>
              <h2 className={`${S} reveal mt-6 text-[30px] font-light leading-[1.15] md:text-[44px]`}>
                Tell us the evening you have in mind
              </h2>
              <p className="reveal mt-6 max-w-[42ch] text-[15px] leading-[1.85] text-[#5e554d]">
                {site.response} {site.cancellation}
              </p>
              <div className="reveal mt-10 flex flex-wrap items-center gap-5">
                <Link
                  href="/enquire"
                  className="bg-[#3b342e] px-7 py-4 text-[10.5px] uppercase tracking-[0.24em] text-[#f3efe8] transition-colors duration-500 hover:bg-[#2a241f]"
                >
                  Make an enquiry
                </Link>
                <More href={waLink("Hello Desert Stars, I'd like to plan a desert evening.")}>WhatsApp us</More>
              </div>
              <div className="reveal-img relative mt-14 aspect-[16/10] overflow-hidden">
                <Pic name="camel-grazing" sizes="(min-width: 768px) 40vw, 100vw" alt="A camel resting among the dunes" />
              </div>
            </div>
            <dl className="self-start border-t border-[#cfc6b8] md:col-span-6 md:col-start-7">
              {[
                { k: "Telephone", v: site.phone, href: site.phoneHref },
                { k: "WhatsApp", v: site.phone, href: waLink("Hello Desert Stars") },
                { k: "Email", v: site.email, href: `mailto:${site.email}` },
                { k: "Hours", v: site.hours },
                { k: "Office", v: site.address },
              ].map((r) => (
                <div key={r.k} className="reveal grid grid-cols-[6.5rem_1fr] gap-4 border-b border-[#cfc6b8] py-6 md:grid-cols-[10rem_1fr] md:py-7">
                  <dt className={`${label} pt-1`}>{r.k}</dt>
                  <dd className={`${S} break-words text-[19px] leading-[1.4] md:text-[22px]`}>
                    {r.href ? (
                      <a href={r.href} className="transition-colors hover:text-[#8a6f52]">
                        {r.v}
                      </a>
                    ) : (
                      r.v
                    )}
                  </dd>
                </div>
              ))}
              <div className="reveal pt-8 text-[13px] leading-[1.8] text-[#7d7268]">
                Every safari includes pick-up from your door in Dubai. Free cancellation up to 24 hours before you travel.
              </div>
            </dl>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`${pad} bg-[#f3efe8] pt-20 pb-10 md:pt-28`}>
        <div className="grid gap-12 border-b border-[#d8d0c4] pb-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p className={`${S} text-[28px] font-light`}>Desert Stars</p>
            <p className="mt-4 max-w-[34ch] text-[13.5px] leading-[1.8] text-[#7d7268]">{site.tagline}. More than 11,000 guests hosted.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 md:col-span-7 md:col-start-6 md:grid-cols-3">
            <div>
              <p className={label}>Experiences</p>
              <ul className="mt-5 space-y-3 text-[13.5px]">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/experiences#${c.slug}`} className="text-[#4a423b] hover:text-[#8a6f52]">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={label}>Desert Stars</p>
              <ul className="mt-5 space-y-3 text-[13.5px]">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="text-[#4a423b] hover:text-[#8a6f52]">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className={label}>Contact</p>
              <ul className="mt-5 space-y-3 text-[13.5px] text-[#4a423b]">
                <li>
                  <a href={site.phoneHref} className="hover:text-[#8a6f52]">{site.phone}</a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="break-words hover:text-[#8a6f52]">{site.email}</a>
                </li>
                <li className="text-[#7d7268]">{site.hours}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-8 text-[11px] tracking-[0.08em] text-[#7d7268] md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Desert Stars. Dubai, United Arab Emirates.</p>
          <p>{site.address}</p>
        </div>
      </footer>
    </div>
  );
}
