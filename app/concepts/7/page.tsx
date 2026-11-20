import Link from "next/link";
import { Big_Shoulders, IBM_Plex_Mono, Barlow } from "next/font/google";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import { getTour, price, type Tour } from "@/lib/tours";
import { site, waLink, categories } from "@/data/site";
import { posts } from "@/data/journal";

const display = Big_Shoulders({ subsets: ["latin"], weight: ["600", "700", "800", "900"], variable: "--x7-display" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--x7-mono" });
const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--x7-body" });

export const metadata = { title: "Design 7 · Expedition" };

/* ---------- tokens ---------- */
const SAND = "#d8cbb3";
const OLIVE = "#1f221b";
const SIGNAL = "#e0632b";

const D = "font-[family-name:var(--x7-display)] uppercase";
const M = "font-[family-name:var(--x7-mono)]";
const PAD = "px-5 md:px-10";

/* ---------- topographic contour lines (deterministic, server-rendered) ---------- */
function contourPaths(seed: number, count: number, w = 1440, h = 900) {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const base = (h / (count + 1)) * (i + 1);
    const amp = 26 + ((i * 37 + seed * 13) % 40);
    const f1 = 0.0035 + ((seed % 5) * 0.0006);
    const f2 = 0.009 + ((seed % 3) * 0.0011);
    const ph = seed * 1.7 + i * 0.42;
    let d = "";
    for (let x = -40; x <= w + 40; x += 30) {
      const y =
        base +
        Math.sin(x * f1 + ph) * amp +
        Math.sin(x * f2 + ph * 1.9) * (amp * 0.35) +
        Math.cos(x * 0.0017 + i * 0.25) * 18;
      d += `${x === -40 ? "M" : "L"}${x} ${y.toFixed(1)} `;
    }
    out.push(d.trim());
  }
  return out;
}

function Contours({ seed, count = 18, color, opacity = 0.35, className = "" }: { seed: number; count?: number; color: string; opacity?: number; className?: string }) {
  const paths = contourPaths(seed, count);
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={color} strokeWidth={i % 5 === 0 ? 1.4 : 0.7} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

/* ---------- small atoms ---------- */
function Tag({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <span className={`${M} inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] ${tone === "dark" ? "text-[#1f221b]/70" : "text-[#d8cbb3]/75"}`}>
      <span className="inline-block h-1.5 w-1.5 bg-[#e0632b]" />
      {children}
    </span>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

/* ---------- data ---------- */
const waypoints = [
  { t: "15:00", code: "WP-01", title: "Pick-up", note: "From your door anywhere in Dubai, in an air-conditioned 4x4." },
  { t: "15:45", code: "WP-02", title: "Dune drive", note: "Into the high red dunes of Lehbab. Sand boarding and photo stops." },
  { t: "17:45", code: "WP-03", title: "Camels", note: "A camel ride along the ridge as the light turns copper." },
  { t: "19:00", code: "WP-04", title: "Camp", note: "A lantern-lit Bedouin camp, welcome drinks and a live BBQ dinner." },
  { t: "20:30", code: "WP-05", title: "Fire show", note: "Tanoura and fire shows under an open desert sky." },
  { t: "21:30", code: "WP-06", title: "Drop-off", note: "Back to your door in Dubai, sand still in your shoes." },
];

const fieldSlugs: { slug: string; img: string; alt: string }[] = [
  { slug: "premium-evening-desert-safari", img: "premium-evening-1", alt: "4x4 convoy on the red dunes of Lehbab" },
  { slug: "premium-morning-desert-safari", img: "premium-morning-1", alt: "Morning light over the dunes" },
  { slug: "evening-desert-safari", img: "camel-caravan", alt: "Camel caravan crossing the dunes" },
  { slug: "grand-mosque-and-desert-safari", img: "mosque-1", alt: "Sheikh Zayed Grand Mosque in Abu Dhabi" },
  { slug: "dubai-marina-dhow-cruise", img: "dubai-night", alt: "Dubai at night from the water" },
  { slug: "al-ain-city-tour", img: "alain-1", alt: "Al Ain, the garden city" },
];

const field = fieldSlugs
  .map((f) => ({ ...f, tour: getTour(f.slug) }))
  .filter((f): f is { slug: string; img: string; alt: string; tour: Tour } => Boolean(f.tour));

const kit = {
  wear: [
    { item: "Light layers", note: "Breathable cotton or linen for the afternoon heat." },
    { item: "Closed shoes", note: "Sand is soft and warm; trainers beat sandals." },
    { item: "Light jacket", note: "For the evening, when the desert cools quickly." },
  ],
  bring: [
    { item: "Sunglasses", note: "Glare off the dunes is strong until sunset." },
    { item: "Sunscreen", note: "Apply before pick-up; reapply at the dune stop." },
    { item: "Camera", note: "Golden hour on the ridge is the shot of the trip." },
  ],
};

/* =================================================================== */

export default function Page() {
  const hero = getTour("premium-evening-desert-safari");
  const heroPrice = hero ? price(hero) : "From AED 150";

  return (
    <div
      className={`${display.variable} ${mono.variable} ${body.variable} font-[family-name:var(--x7-body)] overflow-x-clip bg-[#d8cbb3] text-[#1f221b] antialiased selection:bg-[#e0632b] selection:text-[#1f221b]`}
    >
      {/* ============================ HEADER ============================ */}
      <header className={`absolute inset-x-0 top-0 z-30 ${PAD}`}>
        <div className="flex items-center justify-between gap-6 border-b border-[#d8cbb3]/25 py-5 text-[#d8cbb3]">
          <Link href="/concepts/7" className="flex items-center gap-3">
            <svg aria-hidden viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke={SIGNAL} strokeWidth={1.6}>
              <path d="M2 24c5-6 9-9 14-9s9 3 14 9" />
              <path d="M6 28c4-4 7-6 10-6s6 2 10 6" opacity=".6" />
              <path d="M16 3l1.4 3.6L21 8l-3.6 1.4L16 13l-1.4-3.6L11 8l3.6-1.4z" fill={SIGNAL} stroke="none" />
            </svg>
            <span className={`${D} text-[22px] font-extrabold leading-none tracking-[0.04em]`}>Desert Stars</span>
          </Link>
          <nav className={`${M} hidden items-center gap-8 text-[11px] uppercase tracking-[0.2em] lg:flex`}>
            {[
              ["Experiences", "/experiences"],
              ["Journal", "/journal"],
              ["About", "/about"],
              ["Enquire", "/enquire"],
            ].map(([l, h]) => (
              <Link key={h} href={h} className="opacity-80 transition hover:text-[#e0632b] hover:opacity-100">
                {l}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/enquire"
              className={`${M} inline-flex items-center gap-2 bg-[#e0632b] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1f221b] transition hover:bg-[#d8cbb3]`}
            >
              Enquire <Arrow className="h-3.5 w-3.5" />
            </Link>
            <details className="group relative lg:hidden">
              <summary className={`${M} flex cursor-pointer list-none items-center border border-[#d8cbb3]/40 px-3 py-2.5 text-[11px] uppercase tracking-[0.18em] [&::-webkit-details-marker]:hidden`}>
                <span className="group-open:hidden">Menu</span>
                <span className="hidden group-open:inline">Close</span>
              </summary>
              <nav className={`${M} absolute right-0 top-[calc(100%+10px)] w-56 bg-[#1f221b] p-2 text-[12px] uppercase tracking-[0.16em] shadow-2xl`}>
                {[
                  ["Experiences", "/experiences"],
                  ["Journal", "/journal"],
                  ["About", "/about"],
                  ["Enquire", "/enquire"],
                ].map(([l, h], i) => (
                  <Link key={h} href={h} className="flex items-center justify-between border-b border-[#d8cbb3]/10 px-3 py-3 last:border-0 hover:text-[#e0632b]">
                    <span>{l}</span>
                    <span className="opacity-40">0{i + 1}</span>
                  </Link>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </header>

      {/* ============================ HERO ============================ */}
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#1f221b] text-[#d8cbb3]">
        <div className="hero-zoom absolute inset-0 -z-10 overflow-hidden">
          <Pic name="dunes-cruiser" priority sizes="100vw" alt="A 4x4 cresting the red dunes of Lehbab at golden hour" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1f221b] via-[#1f221b]/35 to-[#1f221b]/55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1f221b]/70 via-transparent to-transparent" />

        {/* survey grid ticks */}
        <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-24 hidden ${PAD} md:block`}>
          <div className={`${M} flex justify-between text-[10px] tracking-[0.2em] text-[#d8cbb3]/45`}>
            <span>Dubai · N 25°12′ E 55°16′</span>
            <span>SECTOR · LEHBAB</span>
            <span>Pick-up · your door</span>
            <span>Oct – May · cool season</span>
          </div>
        </div>

        <div className={`relative flex min-h-[100svh] flex-col justify-end ${PAD} pb-8 pt-32 md:pb-12`}>
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="reveal">
                <Tag tone="light">Expedition 01 · Evening desert crossing</Tag>
              </div>
              <h1 className={`${D} mt-5 text-[clamp(3.6rem,15vw,11.5rem)] font-extrabold leading-[0.84] tracking-[-0.01em]`}>
                <Split>Into the</Split>
                <br />
                <span className="text-[#e0632b]">
                  <Split delay={160}>red dunes</Split>
                </span>
              </h1>
              <p className="reveal mt-7 max-w-md text-[17px] leading-relaxed text-[#d8cbb3]/85" style={{ ["--d" as string]: "300ms" }}>
                Pick-up from your door in Dubai, a convoy into the Lehbab sands, camels at golden hour and a lantern-lit Bedouin camp under the stars.
              </p>
              <div className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ ["--d" as string]: "420ms" }}>
                <Link
                  href="/experiences/premium-evening-desert-safari"
                  className={`${M} group inline-flex items-center gap-3 bg-[#d8cbb3] px-5 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[#1f221b] transition hover:bg-[#e0632b]`}
                >
                  View the route <Arrow className="transition group-hover:translate-x-1" />
                </Link>
                <span className={`${M} text-[11px] uppercase tracking-[0.18em] text-[#d8cbb3]/60`}>{site.stats[0].value} guests on the sand</span>
              </div>
            </div>

            {/* expedition card */}
            <aside className="reveal lg:col-span-5 xl:col-span-4" style={{ ["--d" as string]: "520ms" }}>
              <div className="relative border border-[#d8cbb3]/25 bg-[#1f221b]/80 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-[#d8cbb3]/15 px-5 py-3">
                  <span className={`${M} text-[10px] uppercase tracking-[0.22em] text-[#d8cbb3]/60`}>Expedition card</span>
                  <span className={`${M} flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#e0632b]`}>
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e0632b]" /> Daily
                  </span>
                </div>
                <div className="px-5 pb-5 pt-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className={`${M} text-[10px] uppercase tracking-[0.2em] text-[#d8cbb3]/50`}>From</div>
                      <div className={`${D} text-[40px] font-extrabold leading-none`}>Dubai</div>
                    </div>
                    <div className="mb-3 flex flex-1 items-center gap-1 px-1 text-[#e0632b]">
                      <span className="h-px flex-1 border-t border-dashed border-[#e0632b]/70" />
                      <Arrow />
                    </div>
                    <div className="text-right">
                      <div className={`${M} text-[10px] uppercase tracking-[0.2em] text-[#d8cbb3]/50`}>To</div>
                      <div className={`${D} text-[40px] font-extrabold leading-none`}>Lehbab</div>
                    </div>
                  </div>
                  <dl className={`${M} mt-6 grid grid-cols-2 border-t border-[#d8cbb3]/15 text-[12px]`}>
                    {[
                      ["Departure", "15:00"],
                      ["Return", "21:30"],
                      ["Group", "Up to 6 / 4x4"],
                      ["Terrain", "Red dunes"],
                    ].map(([k, v], i) => (
                      <div key={k} className={`border-b border-[#d8cbb3]/15 py-3 ${i % 2 === 0 ? "pr-3" : "border-l pl-4"}`}>
                        <dt className="text-[10px] uppercase tracking-[0.2em] text-[#d8cbb3]/50">{k}</dt>
                        <dd className="mt-1 text-[15px] text-[#d8cbb3]">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div>
                      <div className={`${M} text-[10px] uppercase tracking-[0.2em] text-[#d8cbb3]/50`}>Per adult</div>
                      <div className={`${D} text-[28px] font-bold leading-tight text-[#e0632b]`}>{heroPrice}</div>
                    </div>
                    <Link
                      href="/enquire"
                      className={`${M} inline-flex shrink-0 items-center gap-2 border border-[#d8cbb3]/40 px-4 py-3 text-[11px] uppercase tracking-[0.18em] transition hover:border-[#e0632b] hover:bg-[#e0632b] hover:text-[#1f221b]`}
                    >
                      Reserve <Arrow className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
              <p className={`${M} mt-3 text-[10px] uppercase tracking-[0.2em] text-[#d8cbb3]/50`}>Free cancellation up to 24 hours</p>
            </aside>
          </div>
        </div>
      </section>

      {/* ============================ BRIEFING ============================ */}
      <section className={`relative overflow-hidden ${PAD} py-24 md:py-36`}>
        <Contours seed={3} count={22} color={OLIVE} opacity={0.18} />
        <div className="relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Tag>01 · Briefing</Tag>
          </div>
          <div className="lg:col-span-9">
            <h2 className={`${D} max-w-5xl text-[clamp(2.4rem,7vw,6rem)] font-extrabold leading-[0.9]`}>
              <Split>A desert outfitter for people who expect the details handled.</Split>
            </h2>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {[
                ["Door to dune", "We collect you from your door in Dubai and return you there. No meeting points, no coaches."],
                ["Small convoys", "Premium departures run at up to six guests per 4x4, with an experienced desert driver."],
                ["Always reachable", `${site.response} ${site.hours}.`],
              ].map(([h, p], i) => (
                <div key={h} className="reveal border-t border-[#1f221b]/30 pt-5" style={{ ["--d" as string]: `${i * 120}ms` }}>
                  <div className={`${M} text-[11px] tracking-[0.2em] text-[#e0632b]`}>0{i + 1}</div>
                  <h3 className={`${D} mt-3 text-[28px] font-bold leading-none`}>{h}</h3>
                  <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-[#1f221b]/75">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ ROUTE ============================ */}
      <section className="relative overflow-hidden bg-[#1f221b] text-[#d8cbb3]">
        <Contours seed={7} count={26} color={SAND} opacity={0.09} />
        <div className={`relative ${PAD} py-24 md:py-32`}>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Tag tone="light">02 · Route plan</Tag>
              <h2 className={`${D} mt-5 text-[clamp(2.8rem,9vw,7.5rem)] font-extrabold leading-[0.86]`}>
                <Split>Six waypoints.</Split>
                <br />
                <span className="text-[#d8cbb3]/45">
                  <Split delay={140}>Six and a half hours.</Split>
                </span>
              </h2>
            </div>
            <div className={`${M} reveal grid shrink-0 grid-cols-3 gap-6 text-[11px] uppercase tracking-[0.18em] text-[#d8cbb3]/60`}>
              <div>
                <div>Out</div>
                <div className={`${D} mt-1 text-[32px] font-bold tracking-normal text-[#d8cbb3]`}>15:00</div>
              </div>
              <div>
                <div>In</div>
                <div className={`${D} mt-1 text-[32px] font-bold tracking-normal text-[#d8cbb3]`}>21:30</div>
              </div>
              <div>
                <div>Sector</div>
                <div className={`${D} mt-1 text-[32px] font-bold tracking-normal text-[#e0632b]`}>Lehbab</div>
              </div>
            </div>
          </div>

          {/* timeline */}
          <ol className="relative mt-16 grid gap-0 md:mt-24 lg:grid-cols-6">
            {/* dashed line: vertical on mobile, horizontal on desktop */}
            <span aria-hidden className="absolute bottom-6 left-[7px] top-2 border-l border-dashed border-[#d8cbb3]/35 lg:hidden" />
            <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden border-t border-dashed border-[#d8cbb3]/35 lg:block" />
            {waypoints.map((w, i) => (
              <li key={w.code} className="reveal relative pb-10 pl-10 lg:pb-0 lg:pl-0 lg:pr-6" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 block h-[15px] w-[15px] rotate-45 border ${i === 0 || i === waypoints.length - 1 ? "border-[#e0632b] bg-[#e0632b]" : "border-[#d8cbb3] bg-[#1f221b]"}`}
                />
                <div className="lg:pt-10">
                  <div className={`${M} text-[10px] uppercase tracking-[0.22em] text-[#d8cbb3]/45`}>{w.code}</div>
                  <div className={`${D} mt-2 text-[44px] font-extrabold leading-none md:text-[52px]`}>{w.t}</div>
                  <div className={`${D} mt-2 text-[22px] font-semibold leading-none text-[#e0632b]`}>{w.title}</div>
                  <p className="mt-3 max-w-[26ch] text-[14px] leading-relaxed text-[#d8cbb3]/70">{w.note}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* waypoint imagery strip */}
          <div className="mt-20 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4">
            {[
              { n: "camel-ride", c: "md:col-span-5 aspect-[4/5] md:aspect-[5/6]", a: "Guests riding camels across the dunes", cap: "WP-03 · 17:45" },
              { n: "premium-evening-2", c: "md:col-span-4 aspect-[4/5] md:aspect-[4/6] md:mt-24", a: "Evening at the Bedouin camp", cap: "WP-04 · 19:00" },
              { n: "standard-sunset-3", c: "col-span-2 md:col-span-3 aspect-[16/10] md:aspect-[3/5] md:mt-48", a: "Fire show performer at the desert camp", cap: "WP-05 · 20:30" },
            ].map((p, i) => (
              <figure key={p.n} className={`${p.c} relative`}>
                <div className="reveal-img zoom absolute inset-0 overflow-hidden" style={{ ["--d" as string]: `${i * 140}ms` }}>
                  <Pic name={p.n} sizes="(min-width: 768px) 40vw, 50vw" alt={p.a} />
                </div>
                <figcaption className={`${M} absolute bottom-3 left-3 bg-[#1f221b]/85 px-2 py-1 text-[10px] uppercase tracking-[0.2em]`}>{p.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ FIELD CARDS ============================ */}
      <section className={`relative overflow-hidden ${PAD} py-24 md:py-32`}>
        <Contours seed={11} count={20} color={OLIVE} opacity={0.14} />
        <div className="relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Tag>03 · Field catalogue</Tag>
              <h2 className={`${D} mt-5 text-[clamp(2.8rem,9vw,7.5rem)] font-extrabold leading-[0.86]`}>
                <Split>Choose your terrain</Split>
              </h2>
            </div>
            <Link href="/experiences" className={`${M} reveal group inline-flex items-center gap-3 border-b border-[#1f221b] pb-1 text-[12px] uppercase tracking-[0.18em] hover:border-[#e0632b] hover:text-[#e0632b]`}>
              All 16 experiences <Arrow className="transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-14 grid gap-px border border-[#1f221b]/25 bg-[#1f221b]/25 sm:grid-cols-2 lg:grid-cols-3">
            {field.map(({ tour, img, alt }, i) => (
              <Link
                key={tour.slug}
                href={`/experiences/${tour.slug}`}
                className="reveal group flex flex-col bg-[#d8cbb3] p-4 transition-colors duration-500 hover:bg-[#1f221b] hover:text-[#d8cbb3] md:p-5"
                style={{ ["--d" as string]: `${(i % 3) * 110}ms` }}
              >
                <div className={`${M} flex items-center justify-between text-[10px] uppercase tracking-[0.22em] opacity-70`}>
                  <span>DS-{String(i + 1).padStart(2, "0")} / {tour.category}</span>
                  <span className="text-[#e0632b]">{tour.category === "desert" ? "Sand" : tour.category === "cruises" ? "Water" : "City"}</span>
                </div>
                <div className="reveal-img relative mt-4 aspect-[4/3] overflow-hidden">
                  <Pic name={img} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw" alt={alt} className="transition-transform duration-[1.4s] group-hover:scale-[1.05]" />
                </div>
                <h3 className={`${D} mt-5 text-[30px] font-extrabold leading-[0.95]`}>{tour.title}</h3>
                <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed opacity-70">{tour.short}</p>
                <dl className={`${M} mt-5 text-[12px]`}>
                  {[
                    ["Duration", tour.timing],
                    ["Location", tour.location],
                    ["Group size", tour.groupSize ? `Up to ${tour.groupSize.replace(/\s*people/i, "")}` : "Private on request"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 border-t border-current/20 py-2.5">
                      <dt className="text-[10px] uppercase tracking-[0.2em] opacity-55">{k}</dt>
                      <dd className="text-right">{v}</dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-4 border-t border-current/20 pt-3">
                    <dt className="text-[10px] uppercase tracking-[0.2em] opacity-55">Price</dt>
                    <dd className={`${D} text-[22px] font-bold normal-case text-[#e0632b]`}>{price(tour)}</dd>
                  </div>
                </dl>
              </Link>
            ))}
          </div>

          {/* terrain index */}
          <div className="mt-16 grid gap-0 md:grid-cols-4">
            {categories.map((c, i) => (
              <Link
                key={c.slug}
                href={`/experiences#${c.slug}`}
                className="reveal group border-t border-[#1f221b]/30 py-5 pr-6 md:border-l md:border-t-0 md:pl-5 md:first:border-l-0 md:first:pl-0"
                style={{ ["--d" as string]: `${i * 90}ms` }}
              >
                <div className={`${M} text-[10px] uppercase tracking-[0.22em] text-[#1f221b]/55`}>Index {String.fromCharCode(65 + i)}</div>
                <div className={`${D} mt-2 flex items-center justify-between text-[26px] font-bold leading-none group-hover:text-[#e0632b]`}>
                  {c.name} <Arrow className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-[#1f221b]/70">{c.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ KIT LIST ============================ */}
      <section className="relative overflow-hidden bg-[#c9baa0]">
        <Contours seed={19} count={24} color={OLIVE} opacity={0.16} />
        <div className={`relative grid gap-12 ${PAD} py-24 md:py-32 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <Tag>04 · Kit list</Tag>
            <h2 className={`${D} mt-5 text-[clamp(2.8rem,9vw,6.5rem)] font-extrabold leading-[0.86]`}>
              <Split>What to wear. What to bring.</Split>
            </h2>
            <p className="reveal mt-6 max-w-sm text-[16px] leading-relaxed text-[#1f221b]/75">
              Afternoons in the dunes are warm and bright; evenings at camp cool down fast. Pack light, cover your feet, and bring one layer for after dark.
            </p>
            <div className="reveal-img relative mt-10 aspect-[4/5] max-w-md overflow-hidden">
              <Pic name="combo-3in1-3" sizes="(min-width: 1024px) 34vw, 92vw" alt="A guest holding a falcon in the desert" />
              <span className={`${M} absolute left-3 top-3 bg-[#d8cbb3] px-2 py-1 text-[10px] uppercase tracking-[0.2em]`}>Falcon encounter · Camp</span>
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:gap-8 lg:pt-28">
            {(
              [
                ["Wear", kit.wear],
                ["Bring", kit.bring],
              ] as const
            ).map(([label, items]) => (
              <div key={label}>
                <div className="flex items-center justify-between border-b-2 border-[#1f221b] pb-3">
                  <span className={`${D} text-[34px] font-extrabold leading-none`}>{label}</span>
                  <span className={`${M} text-[10px] uppercase tracking-[0.22em] opacity-60`}>{items.length} items</span>
                </div>
                <ul>
                  {items.map((k, i) => (
                    <li key={k.item} className="reveal flex gap-4 border-b border-[#1f221b]/25 py-5" style={{ ["--d" as string]: `${i * 100}ms` }}>
                      <span aria-hidden className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center border-[1.5px] border-[#1f221b]">
                        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke={SIGNAL} strokeWidth={2.2}>
                          <path d="M2 6.5l2.5 2.5L10 3" />
                        </svg>
                      </span>
                      <div>
                        <div className={`${D} text-[24px] font-bold leading-none`}>{k.item}</div>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-[#1f221b]/70">{k.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className={`${M} reveal border border-dashed border-[#1f221b]/50 p-5 text-[12px] leading-relaxed sm:col-span-2`}>
              <span className="text-[#e0632b]">NOTE ·</span> Vegetarian, vegan and halal options are catered at camp. Tell us on booking and we will pass it to the kitchen.
            </div>
          </div>
        </div>
      </section>

      {/* ============================ STATS ============================ */}
      <section className="relative overflow-hidden bg-[#1f221b] text-[#d8cbb3]">
        <div data-parallax="0.15" className="absolute inset-x-0 -top-[15%] h-[130%] opacity-35">
          <Pic name="night-sky" sizes="100vw" alt="" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f221b] via-[#1f221b]/40 to-[#1f221b]" />
        <div className={`relative ${PAD} py-24 md:py-36`}>
          <Tag tone="light">05 · Logbook</Tag>
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4">
            {site.stats.map((s, i) => (
              <div key={s.label} className="reveal border-t border-[#d8cbb3]/25 pt-5" style={{ ["--d" as string]: `${i * 110}ms` }}>
                <div className={`${M} text-[10px] uppercase tracking-[0.22em] text-[#d8cbb3]/50`}>REC-{String(i + 1).padStart(2, "0")}</div>
                <div className={`${D} mt-3 text-[clamp(2.7rem,11vw,8.5rem)] font-black leading-[0.85] ${i === 0 ? "text-[#e0632b]" : ""}`}>{s.value}</div>
                <div className={`${M} mt-3 text-[11px] uppercase tracking-[0.18em] text-[#d8cbb3]/70`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ FIELD NOTES ============================ */}
      <section className={`relative overflow-hidden ${PAD} py-24 md:py-32`}>
        <Contours seed={23} count={16} color={OLIVE} opacity={0.12} />
        <div className="relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Tag>06 · Field notes</Tag>
              <h2 className={`${D} mt-5 text-[clamp(2.6rem,8vw,6rem)] font-extrabold leading-[0.86]`}>
                <Split>Dispatches from the journal</Split>
              </h2>
            </div>
            <Link href="/journal" className={`${M} group inline-flex items-center gap-3 border-b border-[#1f221b] pb-1 text-[12px] uppercase tracking-[0.18em] hover:border-[#e0632b] hover:text-[#e0632b]`}>
              Read the journal <Arrow className="transition group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-14 divide-y divide-[#1f221b]/25 border-y border-[#1f221b]/25">
            {posts.slice(0, 3).map((p, i) => (
              <Link key={p.slug} href={`/journal/${p.slug}`} className="reveal group grid items-center gap-5 py-6 md:grid-cols-12 md:gap-8" style={{ ["--d" as string]: `${i * 100}ms` }}>
                <div className={`${M} text-[11px] uppercase tracking-[0.2em] text-[#1f221b]/55 md:col-span-2`}>
                  <div>{p.category}</div>
                  <div className="mt-1">{p.date}</div>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden md:col-span-3">
                  <Pic name={p.image} sizes="(min-width: 768px) 24vw, 92vw" alt={p.title} className="transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
                </div>
                <div className="md:col-span-6">
                  <h3 className={`${D} text-[clamp(1.8rem,3.4vw,2.9rem)] font-extrabold leading-[0.95] transition group-hover:text-[#e0632b]`}>{p.title}</h3>
                  <p className="mt-2 line-clamp-2 max-w-2xl text-[15px] leading-relaxed text-[#1f221b]/70">{p.excerpt}</p>
                </div>
                <div className="hidden justify-end md:col-span-1 md:flex">
                  <span className="flex h-11 w-11 items-center justify-center border border-[#1f221b]/40 transition group-hover:border-[#e0632b] group-hover:bg-[#e0632b]">
                    <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ ENQUIRY ============================ */}
      <section className="relative isolate overflow-hidden bg-[#1f221b] text-[#d8cbb3]">
        <div data-parallax="0.15" className="absolute inset-x-0 -top-[12%] -z-10 h-[124%]">
          <Pic name="camp-lanterns" sizes="100vw" alt="" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1f221b] via-[#1f221b]/85 to-[#1f221b]/30" />
        <div className={`grid gap-12 ${PAD} py-24 md:py-36 lg:grid-cols-12`}>
          <div className="lg:col-span-7">
            <Tag tone="light">07 · Request a departure</Tag>
            <h2 className={`${D} mt-5 text-[clamp(3rem,11vw,9rem)] font-black leading-[0.84]`}>
              <Split>Plot your</Split>
              <br />
              <span className="text-[#e0632b]">
                <Split delay={140}>crossing.</Split>
              </span>
            </h2>
            <p className="reveal mt-7 max-w-md text-[17px] leading-relaxed text-[#d8cbb3]/80">
              Tell us the date, the size of your party and where to collect you. {site.response}
            </p>
            <div className="reveal mt-9 flex flex-wrap gap-3">
              <Link
                href="/enquire"
                className={`${M} group inline-flex items-center gap-3 bg-[#e0632b] px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#1f221b] transition hover:bg-[#d8cbb3]`}
              >
                Start an enquiry <Arrow className="transition group-hover:translate-x-1" />
              </Link>
              <a
                href={waLink("Hello Desert Stars, I would like to plan a desert safari.")}
                className={`${M} inline-flex items-center gap-3 border border-[#d8cbb3]/45 px-6 py-4 text-[12px] uppercase tracking-[0.18em] transition hover:border-[#d8cbb3] hover:bg-[#d8cbb3] hover:text-[#1f221b]`}
              >
                WhatsApp concierge
              </a>
            </div>
          </div>
          <div className="reveal self-end lg:col-span-4 lg:col-start-9">
            <dl className={`${M} border border-[#d8cbb3]/25 bg-[#1f221b]/70 text-[13px] backdrop-blur-sm`}>
              {[
                ["Radio", <a key="p" href={site.phoneHref} className="hover:text-[#e0632b]">{site.phone}</a>],
                ["Mail", <a key="e" href={`mailto:${site.email}`} className="break-all hover:text-[#e0632b]">{site.email}</a>],
                ["Base", site.address],
                ["Hours", site.hours],
                ["Terms", site.cancellation],
              ].map(([k, v]) => (
                <div key={k as string} className="grid grid-cols-[80px_1fr] gap-3 border-b border-[#d8cbb3]/15 px-5 py-4 last:border-0">
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-[#d8cbb3]/50">{k}</dt>
                  <dd className="leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============================ FOOTER ============================ */}
      <footer className="relative overflow-hidden bg-[#171914] text-[#d8cbb3]">
        <Contours seed={29} count={14} color={SAND} opacity={0.07} />
        <div className={`relative ${PAD} pt-20`}>
          <div className="grid gap-12 border-b border-[#d8cbb3]/15 pb-14 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className={`${D} text-[34px] font-extrabold leading-none`}>Desert Stars</div>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#d8cbb3]/65">
                Private desert safaris and Emirates journeys. Lehbab red dunes, lantern-lit camps, and a team that answers within 30 minutes.
              </p>
            </div>
            <div className={`${M} grid grid-cols-2 gap-8 text-[12px] uppercase tracking-[0.16em] md:col-span-7 md:grid-cols-3`}>
              <div>
                <div className="mb-4 text-[10px] tracking-[0.22em] text-[#e0632b]">Navigate</div>
                <ul className="space-y-3">
                  {[
                    ["Experiences", "/experiences"],
                    ["Journal", "/journal"],
                    ["About", "/about"],
                    ["Enquire", "/enquire"],
                  ].map(([l, h]) => (
                    <li key={h}>
                      <Link href={h} className="opacity-75 hover:text-[#e0632b] hover:opacity-100">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-4 text-[10px] tracking-[0.22em] text-[#e0632b]">Terrain</div>
                <ul className="space-y-3">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/experiences#${c.slug}`} className="opacity-75 hover:text-[#e0632b] hover:opacity-100">{c.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 normal-case tracking-normal md:col-span-1">
                <div className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#e0632b]">Contact</div>
                <ul className="space-y-3 text-[13px]">
                  <li><a href={site.phoneHref} className="opacity-75 hover:text-[#e0632b] hover:opacity-100">{site.phone}</a></li>
                  <li><a href={`mailto:${site.email}`} className="break-all opacity-75 hover:text-[#e0632b] hover:opacity-100">{site.email}</a></li>
                  <li><a href={waLink("Hello Desert Stars")} className="opacity-75 hover:text-[#e0632b] hover:opacity-100">WhatsApp</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div aria-hidden className={`${D} select-none overflow-hidden whitespace-nowrap pt-6 text-[22vw] font-black leading-[0.78] text-[#d8cbb3]/[0.06]`}>
            Lehbab
          </div>
          <div className={`${M} flex flex-col justify-between gap-3 border-t border-[#d8cbb3]/15 py-6 text-[10px] uppercase tracking-[0.2em] text-[#d8cbb3]/45 md:flex-row`}>
            <span>© {new Date().getFullYear()} Desert Stars · Dubai, UAE</span>
            <span>Dubai → Lehbab desert</span>
            <span>Free cancellation up to 24 hours</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
