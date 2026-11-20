import Link from "next/link";
import { Oswald, Cormorant_Garamond, VT323, Hanken_Grotesk } from "next/font/google";
import { getTour, price, type Tour } from "@/lib/tours";
import { site, waLink } from "@/data/site";
import { posts } from "@/data/journal";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import TripPanels from "@/components/TripPanels";
import { FillWords, Swoosh } from "@/components/Bits";

const osw = Oswald({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--v3-osw", display: "swap" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--v3-serif", display: "swap" });
const mono = VT323({ subsets: ["latin"], weight: "400", variable: "--v3-mono", display: "swap" });
const body = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500"], variable: "--v3-body", display: "swap" });

export const metadata = { title: "Variation 3 · Day to night" };

/* type system */
const O = "[font-family:var(--v3-osw)] uppercase";
const S = "[font-family:var(--v3-serif)]";
const M = "[font-family:var(--v3-mono)] uppercase tracking-[0.06em]";
const PAD = "px-5 md:px-10";

const WA = waLink("Hello Desert Stars, I would like to plan an evening in the desert.");

/* ---------- data ---------- */
const tripDefs: { slug: string; img: string }[] = [
  { slug: "premium-evening-desert-safari", img: "premium-evening-2" },
  { slug: "evening-desert-safari", img: "camel-ride" },
  { slug: "premium-morning-desert-safari", img: "premium-morning-1" },
  { slug: "standard-sunset-desert-safari", img: "standard-sunset-3" },
  { slug: "grand-mosque-and-desert-safari", img: "combo-mosque-3" },
];
const trips = tripDefs
  .map((d) => ({ ...d, t: getTour(d.slug) }))
  .filter((d): d is { slug: string; img: string; t: Tour } => Boolean(d.t))
  .map(({ t, img }) => ({ href: `/experiences/${t.slug}`, title: t.title, price: price(t), meta: t.timing, text: t.short, img }));

const evening = [
  { time: "15:00", title: "Pick-up from your door", note: "An air-conditioned 4x4 collects you anywhere in Dubai.", img: "premium-evening-2", alt: "White 4x4 cresting a red dune" },
  { time: "Late afternoon", title: "Into the red dunes", note: "Dune driving through the high sands of Lehbab, with photo stops on the ridge.", img: "premium-evening-3", alt: "4x4 driving across the dunes" },
  { time: "Golden hour", title: "Camels at sunset", note: "A slow ride along the crest as the light turns copper.", img: "camel-caravan", alt: "Camel caravan on a dune ridge at sunset" },
  { time: "Nightfall", title: "The lantern camp", note: "Arabic coffee and dates, then a live BBQ dinner by lantern light.", img: "camp-lanterns", alt: "Lantern-lit Bedouin camp at dusk" },
  { time: "20:30", title: "Tanoura and fire", note: "Live shows under an open sky before the drive home.", img: "standard-sunset-3", alt: "Fire performer spinning sparks at night" },
];

const chips = ["11,000+ guests hosted", "Pick-up from your door", "Free cancellation 24h", "Reply within 30 min"];

const desertLinks = ["premium-evening-desert-safari", "evening-desert-safari", "premium-morning-desert-safari", "standard-sunset-desert-safari", "self-drive-evening-desert-safari"]
  .map((s) => getTour(s))
  .filter((t): t is Tour => Boolean(t));

/* ---------- atoms ---------- */
function Star({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className} fill="currentColor">
      <path d="M8 0l1.6 6.4L16 8l-6.4 1.6L8 16l-1.6-6.4L0 8l6.4-1.6z" />
    </svg>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/concepts/3" aria-label="Desert Stars, home" className={`flex flex-col items-center leading-none ${className}`}>
      <Star className="mb-1.5 h-3 w-3" />
      <span className={`${S} text-[15px] font-medium tracking-[0.32em] md:text-[17px]`}>DESERT&nbsp;STARS</span>
    </Link>
  );
}

const pill = "inline-flex h-10 items-center rounded-[6px] border border-white/20 bg-white/15 px-4 text-[14px] font-medium text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/30";

/* =================================================================== */

export default function Page() {
  return (
    <div className={`v3 ${osw.variable} ${serif.variable} ${mono.variable} ${body.variable} overflow-x-clip bg-[#f3f1ec] [font-family:var(--v3-body)] text-[#1f2a44] antialiased`}>
      <style>{`
        .v3 { --font-script: var(--v3-serif); }
        .v3 ::selection { background: #ff7e15; color: #020715; }
        .v3-fog { opacity: calc(0.5 + var(--p, 0) * 0.5); transform: translate3d(0, calc((1 - var(--p, 0)) * 8%), 0); }
        .v3-mist { opacity: calc(var(--p, 0) * 1.4); transform: translate3d(0, calc((1 - var(--p, 0)) * 14vh), 0) scale(calc(1 + var(--p, 0) * 0.2)); }
        .v3-whiteout { opacity: clamp(0, calc((var(--p, 0) - 0.45) * 2.2), 1); }
        .v3-rise { transform: translate3d(0, calc((1 - var(--p, 1)) * 34%), 0); }
        .v3-step-a { transform: translate3d(0, calc((1 - min(1, var(--p, 1) * 1.9)) * 200%), 0); }
        .v3-step-b { transform: translate3d(0, calc((1 - min(1, var(--p, 1) * 1.9)) * 100%), 0); }
        .v3-route-word { filter: blur(calc(clamp(0, var(--p, 0) - 0.55, 1) * 26px)); opacity: calc(1 - clamp(0, var(--p, 0) - 0.55, 1) * 1.8); }
        .v3-fade-down { -webkit-mask-image: linear-gradient(to bottom, #000 35%, transparent 96%); mask-image: linear-gradient(to bottom, #000 35%, transparent 96%); }
        .v3-cut { -webkit-mask-image: linear-gradient(to top, #000 52%, transparent 100%); mask-image: linear-gradient(to top, #000 52%, transparent 100%); }
        .v3-draw .draw-line { animation: none; stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 2.8s cubic-bezier(.65,0,.35,1) 0.2s; }
        .v3-draw.in .draw-line, html:not(.js) .v3-draw .draw-line { stroke-dashoffset: 0; }
        .js .v3-draw.reveal { opacity: 1; transform: none; }
        .v3-giant { transition: color .5s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
        .v3-giant:hover, .v3-giant:focus-visible { color: #e8efff; transform: translate3d(0.06em, 0, 0); }
        .v3-pulse { animation: v3pulse 2.6s cubic-bezier(.16,1,.3,1) infinite; }
        @keyframes v3pulse { from { transform: scale(.6); opacity: .9; } to { transform: scale(2.6); opacity: 0; } }
        .v3 details > summary::-webkit-details-marker { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .v3-draw .draw-line { stroke-dashoffset: 0; }
          .v3-pulse { animation: none; }
        }
      `}</style>

      {/* =========================== W1 HEADER =========================== */}
      <header className={`absolute inset-x-0 top-0 z-40 ${PAD} pt-4 md:pt-6`}>
        <div className="relative flex items-center justify-between gap-3 text-white">
          <nav aria-label="Primary" className="hidden items-center gap-2 lg:flex">
            <Link href="/experiences" className={pill}>Experiences</Link>
            <a href="#evening" className={pill}>The evening</a>
            <Link href="/about" className={pill}>About</Link>
          </nav>
          <details className="group relative lg:hidden">
            <summary className={`${pill} cursor-pointer list-none`}>Menu</summary>
            <div className="absolute left-0 top-12 w-[240px] rounded-[8px] bg-[#f3f1ec] p-2 text-[#1f2a44] shadow-xl">
              {[
                ["Experiences", "/experiences"],
                ["The evening", "#evening"],
                ["About", "/about"],
                ["Journal", "/journal"],
                ["Call us", site.phoneHref],
              ].map(([l, h]) => (
                <a key={l} href={h} className="block rounded-[6px] px-3 py-3 text-[15px] font-medium hover:bg-[#1f2a44]/5">{l}</a>
              ))}
            </div>
          </details>
          <Logo className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="flex items-center gap-2">
            <a href={site.phoneHref} className={`${pill} hidden lg:inline-flex`}>Call</a>
            <Link href="/enquire" className="inline-flex h-10 items-center rounded-[6px] bg-[#ff7e15] px-4 text-[14px] font-medium text-[#1f2a44] transition-colors hover:bg-[#ff9a45] md:px-5">Enquire</Link>
          </div>
        </div>
      </header>

      {/* W12 fixed side tab */}
      <Link href="/enquire" className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-3 bg-[#ff7e15] px-3 py-8 text-[14px] font-medium text-[#1f2a44] transition-[padding] duration-300 [writing-mode:vertical-rl] hover:pr-5 md:flex">
        <Star className="h-2.5 w-2.5" /> Plan your evening
      </Link>

      <main id="main">
        {/* =========================== W2 HERO =========================== */}
        <section data-scrub="sticky" className="relative h-[175svh]" aria-label="The Desert">
          <div className="sticky top-0 h-[100svh] overflow-hidden text-white">
            <div className="hero-zoom absolute inset-0"><Pic name="dunes-cruiser" priority sizes="100vw" alt="A white 4x4 crossing pale golden dunes" /></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1f2a44]/45 via-[#1f2a44]/10 to-[#1f2a44]/30" />

            <div className={`hero-ui absolute inset-x-0 top-[44%] ${PAD} md:top-[27%]`}>
              <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
                <p className={`${S} max-w-[16em] text-center text-[22px] italic leading-[1.15] md:ml-[calc(16.66%-20px)] md:text-left md:text-[20px] lg:ml-0`}>
                  Luxury and adventure in the red dunes of Arabia
                </p>
                <a href="#evening" className="hidden w-[188px] items-center justify-between border-y border-white/30 px-8 py-3 text-[14px] font-medium transition-colors hover:bg-white/10 md:flex">
                  The evening <span aria-hidden="true">▶</span>
                </a>
              </div>
            </div>

            <h1 className={`hero-mark absolute inset-x-0 bottom-[13%] text-center ${O} text-[19.5vw] font-normal leading-[0.8] tracking-[0.05em] md:bottom-[20%] md:text-[16.5vw]`}>
              The&nbsp;Desert
            </h1>

            {/* fog */}
            <div aria-hidden="true" className="v3-fog pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#f3f1ec] via-[#f3f1ec]/55 to-transparent" />
            <div aria-hidden="true" className="v3-mist pointer-events-none absolute inset-x-[-10%] bottom-[-10%] h-[80%] bg-[radial-gradient(ellipse_at_30%_70%,rgba(243,241,236,.95),transparent_55%),radial-gradient(ellipse_at_75%_60%,rgba(243,241,236,.9),transparent_50%)] blur-2xl" />
            <div aria-hidden="true" className="v3-whiteout pointer-events-none absolute inset-0 bg-[#f3f1ec]" />

            <a href="#evening" className={`hero-ui absolute inset-x-5 bottom-6 flex items-center justify-between border-y border-white/40 px-4 py-3 text-[14px] font-medium md:hidden`}>
              The evening <span aria-hidden="true">▶</span>
            </a>
          </div>
        </section>

        {/* ===================== light world W3–W6 ===================== */}
        <div className="relative">
          {/* faint vertical grid lines */}
          <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-0 flex ${PAD}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`flex-1 border-l border-[#1f2a44]/[0.07] last:border-r ${i % 2 ? "" : ""} ${i > 1 && i < 4 ? "" : ""} ${i >= 2 ? "hidden md:block" : ""}`} />
            ))}
          </div>

          {/* =========================== W3 STATEMENT =========================== */}
          <section className={`relative z-10 ${PAD} pb-[110px] pt-[40px] md:pb-[200px] md:pt-[80px]`}>
            <div className="reveal md:ml-[16.66%]">
              <p className={`${S} text-[24px] italic leading-none md:text-[28px]`}>The red sands</p>
              <Swoosh className="mt-1 w-[200px] text-[#1f2a44]/40" />
            </div>
            <FillWords
              className={`mt-10 ${S} text-[29px] uppercase leading-[1.08] text-[#1f2a44] md:ml-[33.33%] md:mt-14 md:text-[40px] lg:text-[54px]`}
              text="An hour from the city the road ends and the dunes turn red. We take you out at three, and bring you home under the stars after an evening you will not forget."
            />
          </section>

          {/* =========================== W4 OUR SEASON =========================== */}
          <section data-scrub="pass" className="relative z-10 h-[118svh] overflow-hidden md:h-[150svh]">
            <div className={`relative z-10 ${PAD}`}>
              <div className="reveal md:ml-[16.66%] md:w-[33%] lg:w-[18%]">
                <h2 className={`${O} text-[22px] font-normal tracking-[0.01em]`}>Our season</h2>
                <p className="mt-5 text-[15px] font-medium leading-[1.45] text-[#1f2a44]/85">
                  From October to May the desert evenings turn cool and clear: the best months for dune drives, camel rides and dinner by the fire. We collect you at 15:00, travel in small groups of up to six per 4x4, and have you home by 21:30.
                </p>
                <p className={`${M} mt-6 text-[17px] text-[#1f2a44]/60`}>Oct — May · cool evenings</p>
              </div>
            </div>
            <div className="v3-rise v3-cut absolute inset-x-0 bottom-0 h-[62%] md:h-[72%]">
              <Pic name="camel-caravan" sizes="100vw" alt="Camel caravan crossing a dune ridge in golden light" className="object-[50%_70%]" />
            </div>
          </section>
        </div>

        {/* =========================== W5 OUR EXPERIENCES =========================== */}
        <section id="experiences" className="relative bg-[#f3f1ec] pb-[90px] pt-[90px] md:pb-[140px] md:pt-[120px]">
          <div className={`${PAD} relative mb-12 text-center md:mb-16`}>
            <h2 className={`${S} text-[42px] font-normal uppercase leading-none tracking-[0.01em] md:text-[64px]`}>
              <Split>Our experiences</Split>
            </h2>
            <Swoosh className="mx-auto -mt-1 w-[280px] text-[#1f2a44]/35 md:w-[480px]" />
          </div>
          <div className="px-3">
            <TripPanels trips={trips} />
          </div>
          <div className={`${PAD} mt-10 flex justify-center`}>
            <Link href="/experiences" className="group inline-flex items-center gap-3 text-[15px] font-medium">
              <span className="text-[#ff7e15]">[</span> View all 16 experiences <span className="text-[#ff7e15]">]</span>
            </Link>
          </div>
        </section>

        {/* =========================== W6 BRAND PROMISE =========================== */}
        <section className={`relative bg-[#f3f1ec] ${PAD} pb-[110px] pt-[40px] md:pb-[160px] md:pt-[80px]`}>
          <figure className="mx-auto max-w-[520px] md:ml-[33.33%] md:max-w-[33%] md:min-w-[440px]">
            <span aria-hidden="true" className={`${S} block text-[34px] leading-none`}>“</span>
            <blockquote className={`reveal ${S} mt-1 text-[24px] italic leading-[1.15] md:text-[28px]`}>
              <span className="inline-block w-[2.6em]" aria-hidden="true" />
              We started Desert Stars to share the evening we love most: the hush after the engines stop, the smell of the fire, the sky slowly filling with stars. Every guest is collected from their door and brought home as a friend.
            </blockquote>
            <span aria-hidden="true" className="mt-4 block">-</span>
            <figcaption className="mt-2">
              <div className="v3-draw reveal -ml-3 w-[300px] text-[#1f2a44]">
                <svg viewBox="0 0 360 90" fill="none" className="h-auto w-full" aria-label="Signature">
                  <path className="draw-line" pathLength={1} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
                    d="M18 60c14-30 30-46 40-44 9 2-6 40-18 52-7 7-12-4 2-16 20-17 46-12 44 6-1 12-16 14-14 3 3-14 22-14 26-4 3 9 11 10 18 0 6-9 11-10 13-2 2 7 7 9 13 1 7-10 13-18 18-12 4 6-2 18 4 20 7 2 14-14 20-12 6 2 1 14 8 14 9 0 18-18 28-16 8 2 2 13 10 13 10 0 30-12 52-14 22-2 40 2 50 6" />
                  <path className="draw-line" pathLength={1} stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"
                    d="M60 78c60-10 140-14 230-6" />
                </svg>
              </div>
              <p className="mt-3 text-[15px] font-medium">The Desert Stars team</p>
              <p className="text-[15px] text-[#1f2a44]/60">Dubai, United Arab Emirates</p>
            </figcaption>
          </figure>
        </section>

        {/* =========================== M4 STEPPED TRANSITION =========================== */}
        <section data-scrub="pass" className="relative h-[78svh] overflow-hidden md:h-[112svh]" aria-label="The light turns">
          <div data-parallax="0.12" className="absolute inset-0"><Pic name="desert-sunset" sizes="100vw" alt="A guest watching the sun set over the dunes" /></div>
          <div className="absolute inset-0 bg-[#020715]/15" />
          <p className={`reveal absolute inset-x-5 top-[22%] text-center ${S} text-[30px] italic leading-[1.05] text-white md:left-auto md:right-[16.66%] md:top-[30%] md:w-[34%] md:text-left md:text-[42px]`}>
            And then the light turns.
          </p>
          {/* the staircase */}
          <div className="absolute inset-x-0 bottom-0">
            <div className="v3-step-a flex h-12 justify-between md:h-16">
              <div className="flex w-[30%] items-center justify-end bg-[#020715] pr-5 text-[#e8efff]">
                <span className={`${M} hidden text-[18px] md:block`}>{chips[0]}</span>
              </div>
              <div className="flex w-[30%] items-center bg-[#020715] pl-5 text-[#e8efff]">
                <span className={`${M} hidden text-[18px] md:block`}>{chips[1]}</span>
              </div>
            </div>
            <div className="v3-step-b flex h-12 justify-between md:h-16">
              <div className="flex w-[40%] items-center justify-end bg-[#020715] pr-5 text-[#e8efff]">
                <span className={`${M} hidden text-[18px] md:block`}>{chips[2]}</span>
              </div>
              <div className="flex w-[40%] items-center bg-[#020715] pl-5 text-[#e8efff]">
                <span className={`${M} hidden text-[18px] md:block`}>{chips[3]}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== dark world ===================== */}
        <div className="bg-[#020715] text-[#e8efff]">
          {/* mobile chips */}
          <ul className={`${PAD} flex flex-wrap gap-2 pt-8 md:hidden`}>
            {[...chips, "16 experiences"].map((c) => (
              <li key={c} className={`${M} border border-[#e8efff]/40 px-2 py-1 text-[16px] leading-none`}>{c}</li>
            ))}
          </ul>

          {/* =========================== M5 SPLIT HEADLINE =========================== */}
          <section className={`${PAD} pb-[90px] pt-[90px] md:pb-[160px] md:pt-[150px]`}>
            <h2 className={`relative mx-auto max-w-[1100px] ${O} text-[15vw] font-light leading-[0.8] tracking-[-0.01em] md:text-[11vw] xl:text-[158px]`}>
              <span className="relative z-10 block">
                <Split>Where</Split>
                <br />
                <Split delay={120}>the dunes</Split>
              </span>
              <span className="relative z-0 mx-auto -mt-[0.18em] block w-[66%] md:w-[41%]">
                <span className="reveal-img block aspect-[452/600] overflow-hidden rounded-[4px]">
                  <Pic name="standard-sunset-4" sizes="(min-width:768px) 41vw, 66vw" alt="Two guests riding a camel at sunset" />
                </span>
              </span>
              <span className="absolute right-0 top-[1.05em] z-10 block text-right">
                <Split delay={240}>Meet</Split>
                <br />
                <Split delay={320}>the stars</Split>
              </span>
            </h2>

            <div className="mx-auto mt-[90px] max-w-[1360px] md:mt-[140px]">
              <p className="reveal text-[26px] leading-[1.12] tracking-[-0.01em] md:indent-[16%] md:text-[44px] lg:max-w-[75%]">
                Out past the last road the city goes quiet. We host small groups, cook over open fire and keep the lights low enough to see the stars.
              </p>
              <div className="reveal mt-10 grid gap-5 text-[15px] leading-[1.55] text-[#e8efff]/80 md:ml-[26%] md:grid-cols-2 md:gap-8">
                <p>Every evening begins at your door, anywhere in Dubai. Our drivers know the high red dunes of Lehbab by heart, and every 4x4 carries no more than six guests, so the evening never feels crowded.</p>
                <p>{site.cancellation} {site.response} Tell us what you are celebrating and we will plan the rest, from a private table to a camel at sunrise.</p>
              </div>
            </div>
          </section>

          {/* =========================== M7 STICKY CENTRE COLUMN =========================== */}
          <section id="evening" className={`${PAD} relative pb-[120px] md:pb-[200px]`} aria-labelledby="v3-evening">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_31.4%_1fr]">
              <div className="sticky top-0 z-10 -mx-5 flex items-center justify-between bg-[#020715] px-5 py-4 md:static md:mx-0 md:bg-transparent md:p-0">
                <h2 id="v3-evening" className="text-[24px] leading-none md:sticky md:top-[calc(50svh-14px)] md:self-start md:text-[28px]">
                  The evening <sup className="align-super text-[10px]">™ (05)</sup>
                </h2>
                <Link href="/experiences" className={`${M} text-[18px] md:hidden`}>Discover</Link>
              </div>

              <ol className="mx-auto w-[82%] space-y-[80px] pt-8 md:w-full md:space-y-[140px] md:pt-[10svh]">
                {evening.map((s) => (
                  <li key={s.title}>
                    <div className="reveal-img zoom aspect-[452/600] overflow-hidden rounded-[4px]">
                      <Pic name={s.img} sizes="(min-width:768px) 32vw, 82vw" alt={s.alt} />
                    </div>
                    <div className="reveal mt-4 flex items-baseline justify-between gap-4">
                      <span className={`${M} text-[18px] text-[#e8efff]/70`}>{s.time}</span>
                      <span className="text-right text-[17px] leading-tight">{s.title}</span>
                    </div>
                    <p className="reveal mt-2 text-[14px] leading-[1.5] text-[#e8efff]/65">{s.note}</p>
                  </li>
                ))}
              </ol>

              <div className="hidden justify-end md:flex">
                <Link href="/experiences" className={`${M} sticky top-[calc(50svh-12px)] self-start text-[19px] transition-opacity hover:opacity-60`}>Discover</Link>
              </div>
            </div>
          </section>

          {/* =========================== W9 ROUTE =========================== */}
          <section aria-labelledby="v3-route" className="relative">
            <div data-scrub="pass" className="v3-fade-down overflow-hidden pt-10">
              <p id="v3-route" className={`v3-route-word whitespace-nowrap text-center ${O} text-[16.5vw] font-normal leading-[0.85] tracking-[0.02em] text-[#e8efff]`}>
                Dubai – Lehbab
              </p>
            </div>

            <div className="relative mt-6 border-t border-dashed border-[#e8efff]/30 px-3 pb-[70px] pt-4 md:pb-[100px]">
              <div className={`flex justify-between ${M} text-[16px] leading-[1.15] text-[#e8efff]/65`}>
                <p>25°12′N 55°16′E<br />Dubai</p>
                <p className="text-right">Red dunes<br />Lehbab</p>
              </div>
              <div className="mx-auto mt-6 max-w-[760px] px-2 text-center md:-mt-4">
                <h3 className={`${S} text-[34px] font-normal uppercase leading-[1.02] md:text-[56px]`}>From the city to the red dunes</h3>
                <p className="mx-auto mt-6 max-w-[470px] text-[15px] leading-[1.55] text-[#e8efff]/70">
                  We leave the towers behind in the afternoon and follow the highway inland to Lehbab, where the sand runs deep red and the camp waits with its lanterns lit.
                </p>
              </div>
            </div>

            {/* navy map */}
            <div className="relative h-[560px] overflow-hidden bg-[#0a1124] md:h-[820px]">
              <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" fill="none">
                {Array.from({ length: 14 }).map((_, i) => (
                  <path key={i} stroke="#e8efff" strokeOpacity={0.05 + (i % 3) * 0.015} strokeWidth="1"
                    d={`M-40 ${90 + i * 55} C 260 ${40 + i * 55}, 420 ${150 + i * 55}, 720 ${95 + i * 55} S 1180 ${30 + i * 55}, 1480 ${110 + i * 55}`} />
                ))}
              </svg>
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_58%_45%,transparent_30%,#0a1124_85%)]" />
              <p className={`${M} absolute left-[8%] top-[10%] text-[16px] text-[#e8efff]/30`}>Arabian Gulf</p>

              <svg aria-hidden="true" className="v3-draw reveal absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
                <path className="draw-line" pathLength={1} d="M52 16 C 38 34, 40 62, 62 80" stroke="#7fd3ff" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
              </svg>

              {/* start */}
              <div className="absolute left-[52%] top-[16%]">
                <span className="absolute -left-[5px] -top-[5px] h-[10px] w-[10px] rounded-full bg-[#7fd3ff]" />
                <div className="absolute left-5 top-3 w-[220px]">
                  <p className={`${S} text-[19px] italic text-[#e8efff]/60`}>Starting point</p>
                  <p className={`${O} mt-1 text-[17px]`}>Dubai, UAE</p>
                </div>
              </div>
              {/* end */}
              <div className="absolute left-[62%] top-[80%]">
                <span className="v3-pulse absolute -left-[12px] -top-[12px] h-6 w-6 rounded-full border border-[#7fd3ff]" />
                <span className="absolute -left-[7px] -top-[7px] h-[14px] w-[14px] rounded-full bg-[#7fd3ff]" />
                <div className="absolute -left-[180px] -top-[64px] w-[160px] text-right md:left-6 md:top-3 md:text-left">
                  <p className={`${S} text-[19px] italic text-[#e8efff]/60`}>Destination</p>
                  <p className={`${O} mt-1 text-[17px]`}>Lehbab red dunes</p>
                </div>
              </div>

              {/* stats card (desktop) */}
              <dl className="absolute bottom-10 left-10 hidden w-[445px] rounded-[4px] border border-[#e8efff]/10 bg-[#0f1830]/90 px-5 py-2 backdrop-blur md:block">
                {[
                  ["Pick-up", "15:00 HRS"],
                  ["Drop-off", "21:30 HRS"],
                  ["Group size", "Up to 6 / 4x4"],
                ].map(([k, v], i) => (
                  <div key={k} className={`py-6 ${i ? "border-t border-dotted border-[#e8efff]/30" : ""}`}>
                    <dt className={`${S} text-[19px] italic text-[#e8efff]/70`}>{k}</dt>
                    <dd className="mt-1 text-[42px] font-medium uppercase leading-none tracking-[-0.01em]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {/* stats (mobile) */}
            <dl className={`${PAD} bg-[#0a1124] pb-10 md:hidden`}>
              {[
                ["Pick-up", "15:00 HRS"],
                ["Drop-off", "21:30 HRS"],
                ["Group size", "Up to 6 / 4x4"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-dotted border-[#e8efff]/30 py-5">
                  <dt className={`${S} text-[18px] italic text-[#e8efff]/70`}>{k}</dt>
                  <dd className="mt-1 text-[32px] font-medium uppercase leading-none">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* =========================== M8 NO PLACE =========================== */}
          <section className="relative h-[100svh] min-h-[560px] overflow-hidden" aria-label="No place like the desert">
            <div data-parallax="0.12" className="absolute inset-0"><Pic name="camp-lanterns" sizes="100vw" alt="Lantern-lit desert camp at dusk" /></div>
            <div className="absolute inset-0 bg-[#020715]/45" />
            <h2 className={`absolute inset-x-4 top-[8%] ${O} text-[19vw] font-light leading-[0.8] md:inset-x-5 md:text-[12.5vw] xl:text-[190px]`}>
              <span className="block"><Split>No</Split></span>
              <span className="block"><Split delay={100}>place</Split></span>
              <span className="mt-[0.35em] block text-right md:-mt-[0.8em]"><Split delay={200}>Like the</Split></span>
              <span className="block text-right"><Split delay={300}>desert</Split></span>
            </h2>
            <div className={`absolute inset-x-4 bottom-[8%] flex flex-col gap-1 ${M} text-[17px] md:inset-x-5 md:flex-row md:justify-between`}>
              <span>From Dubai, UAE</span>
              <span>25°12′N 55°16′E</span>
            </div>
          </section>

          {/* =========================== M11 CONTACT =========================== */}
          <section className={`${PAD} pb-[90px] pt-[110px] md:pb-[140px] md:pt-[160px]`} aria-labelledby="v3-contact">
            <h2 id="v3-contact" className="reveal max-w-[900px] text-[26px] leading-[1.12] tracking-[-0.01em] md:text-[44px]">
              Reach out to plan your evening in the dunes. We reply within 30 minutes, day and night.
            </h2>
            <ul className={`mt-14 md:ml-[34%] md:mt-20 ${O} text-[21vw] font-normal leading-[0.86] md:text-[12vw] xl:text-[164px]`}>
              {[
                { l: "WhatsApp", h: WA, ext: true, d: site.phone },
                { l: "Call", h: site.phoneHref, d: site.phone },
                { l: "Email", h: `mailto:${site.email}`, d: site.email },
                { l: "Enquire", h: "/enquire", d: "Enquiry form" },
              ].map((x) => (
                <li key={x.l}>
                  <a href={x.h} {...(x.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label={`${x.l}: ${x.d}`} className="v3-giant inline-block text-[#e8efff]/35">
                    {x.l}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* =========================== W11 FOOTER (dark) =========================== */}
          <footer className={`${PAD} border-t border-[#e8efff]/10 pb-6 pt-14 md:pt-20`}>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
                <div>
                  <Star className="h-4 w-4 text-[#ff7e15]" />
                  <p className="mt-4 max-w-[220px] text-[14px] leading-[1.55] text-[#e8efff]/60">{site.address}</p>
                </div>
                <div>
                  <h3 className={`${S} text-[22px] italic`}>Contact</h3>
                  <ul className="mt-3 space-y-1.5 text-[14px] text-[#e8efff]/60">
                    <li><a className="hover:text-[#e8efff]" href={site.phoneHref}>{site.phone}</a></li>
                    <li><a className="hover:text-[#e8efff]" href={WA} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                    <li><a className="break-all hover:text-[#e8efff]" href={`mailto:${site.email}`}>{site.email}</a></li>
                    <li>{site.hours}</li>
                  </ul>
                </div>
                <div>
                  <h3 className={`${S} text-[22px] italic`}>Desert</h3>
                  <ul className="mt-3 space-y-1.5 text-[14px] text-[#e8efff]/60">
                    {desertLinks.map((t) => (
                      <li key={t.slug}><Link className="hover:text-[#e8efff]" href={`/experiences/${t.slug}`}>{t.title.replace(/ & BBQ Dinner/, "")}</Link></li>
                    ))}
                    <li><Link className="hover:text-[#e8efff]" href="/experiences#desert">View all</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className={`${S} text-[22px] italic`}>Explore</h3>
                  <ul className="mt-3 space-y-1.5 text-[14px] text-[#e8efff]/60">
                    <li><Link className="hover:text-[#e8efff]" href="/experiences#city">City journeys</Link></li>
                    <li><Link className="hover:text-[#e8efff]" href="/experiences#cruises">Dhow cruises</Link></li>
                    <li><Link className="hover:text-[#e8efff]" href="/about">About us</Link></li>
                    {posts.slice(0, 2).map((p) => (
                      <li key={p.slug}><Link className="hover:text-[#e8efff]" href={`/journal/${p.slug}`}>{p.title.split(":")[0]}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 lg:col-span-4">
                <Link href="/experiences" className="flex h-[96px] items-center justify-center rounded-[2px] bg-[#e8efff]/[0.06] text-[15px] font-medium transition-colors hover:bg-[#e8efff]/[0.12] md:h-[110px]">Search experiences</Link>
                <Link href="/experiences#desert" className="flex h-[96px] items-center justify-center rounded-[2px] bg-[#e8efff]/[0.06] text-[15px] font-medium transition-colors hover:bg-[#e8efff]/[0.12] md:h-[110px]">Dates &amp; rates</Link>
                <Link href="/enquire" className="flex h-[96px] items-center justify-center rounded-[2px] bg-[#ff7e15] text-[15px] font-medium text-[#1f2a44] transition-colors hover:bg-[#ff9a45] md:h-[110px]">Enquire now</Link>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="flex h-[96px] items-center justify-center rounded-[2px] bg-[#e8efff]/[0.06] text-[15px] font-medium transition-colors hover:bg-[#e8efff]/[0.12] md:h-[110px]">WhatsApp us</a>
              </div>
            </div>

            <div className="mt-20 grid items-center gap-6 border-t border-[#e8efff]/10 pt-6 text-[13px] text-[#e8efff]/55 md:grid-cols-3">
              <p className={`${M} text-[16px]`}>© 2026 Desert Stars · Dubai</p>
              <p className="text-center">
                <span className={`${S} block text-[22px] italic text-[#e8efff]/85`}>“Every evening ends under the same stars.”</span>
                <span className="mt-1 block text-[11px] uppercase tracking-[0.16em]">– The Desert Stars team</span>
              </p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 md:justify-end">
                <li><Link className="hover:text-[#e8efff]" href="/booking-terms">Booking terms</Link></li>
                <li><Link className="hover:text-[#e8efff]" href="/privacy">Privacy</Link></li>
                <li><Link className="hover:text-[#e8efff]" href="/cookies">Cookies</Link></li>
                <li><Link className="hover:text-[#e8efff]" href="/credits">Credits</Link></li>
              </ul>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
