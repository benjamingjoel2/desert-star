import Link from "next/link";
import { Cormorant, Oswald, VT323, Hanken_Grotesk } from "next/font/google";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import TripPanels from "@/components/TripPanels";
import { FillWords, Swoosh } from "@/components/Bits";
import { getTour, price } from "@/lib/tours";
import { site, waLink, categories } from "@/data/site";
import { posts } from "@/data/journal";

const serif = Cormorant({ subsets: ["latin"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"], variable: "--v7-serif" });
const giant = Oswald({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--v7-giant" });
const mono = VT323({ subsets: ["latin"], weight: "400", variable: "--v7-mono" });
const body = Hanken_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--v7-body" });

export const metadata = { title: "Variation 7 · Cinematic" };

/* ---------- one system ---------- */
const SERIF = "font-[family-name:var(--v7-serif)]";
const GIANT = "font-[family-name:var(--v7-giant)] uppercase";
const MONO = "font-[family-name:var(--v7-mono)] uppercase";
const PAD = "px-5 md:px-10";
const wa = waLink("Hello Desert Stars, I would like to plan a desert evening.");

const pick = (slug: string, img: string) => {
  const t = getTour(slug)!;
  return { href: `/experiences/${t.slug}`, title: t.title, price: price(t), meta: [t.timing, t.groupSize].filter(Boolean).join(" · "), text: t.short, img };
};
const trips = [
  pick("premium-evening-desert-safari", "premium-evening-1"),
  pick("standard-sunset-desert-safari", "standard-sunset-4"),
  pick("premium-morning-desert-safari", "premium-morning-4"),
  pick("grand-mosque-and-desert-safari", "combo-mosque-3"),
  pick("dubai-creek-dhow-cruise", "dubai-night"),
];

const camps = [
  { title: "The camp", text: "Low cushions, lantern light and a live BBQ dinner, set in the red sands of Lehbab.", img: "premium-evening-2", href: "/experiences/premium-evening-desert-safari", tag: "[ Pick-up 15:00 ]" },
  { title: "The falcon", text: "The desert's oldest companion, calm on the glove as the light goes gold.", img: "combo-3in1-3", href: "/experiences/dubai-abu-dhabi-desert-safari-3-in-1", tag: "[ Up to 6 per 4x4 ]" },
  { title: "The fire", text: "Belly dance, Tanoura and fire under an open sky, after the dunes go quiet.", img: "standard-sunset-3", href: "/experiences/standard-sunset-desert-safari", tag: "[ Drop-off 21:30 ]" },
];

const evening = [
  { img: "premium-evening-3", cap: "01 — Into the dunes" },
  { img: "combo-mosque-2", cap: "02 — The falcon" },
  { img: "premium-evening-4", cap: "03 — Dinner at camp" },
  { img: "dubai-skyline", cap: "04 — Back to the city" },
];

const STRIPS = 6;

const css = `
.v7 { --night:#0a0e1a; --ink:#1f2a44; --sand:#f3efe7; --ice:#ece6da; --ember:#ff7e15; }
.v7 ::selection { background: var(--ember); color: var(--night); }
.v7-grid { background-image: linear-gradient(to right, rgba(31,42,68,.07) 1px, transparent 1px); background-size: calc((100% - 1px) / 6) 100%; }
.v7-fog { opacity: calc(.2 + var(--p, 0) * 1.1); }
.v7-word { filter: blur(calc(var(--p, 0) * 16px)); opacity: calc(1 - var(--p, 0) * .9); transform: translate3d(0, calc(var(--p, 0) * 8vh), 0) scale(calc(1 + var(--p, 0) * .06)); }
.v7-ui { opacity: calc(1 - var(--p, 0) * 2.5); }
.v7-route { filter: blur(calc(var(--p, 1) * 10px)); opacity: calc(.75 - var(--p, 1) * .45); }
.v7-strip { transform: translate3d(0, calc((1 - min(1, var(--p, 1) * 2.6)) * var(--s) * 100%), 0); }
.v7-camp-title { opacity: calc(1 - var(--p, 1) * 3); }
.v7-track { --q: clamp(0, calc((var(--p, 1) - .38) / .62), 1); transform: translate3d(calc((1 - var(--q)) * 55vw + var(--q) * (100vw - 100%)), 0, 0); }
.v7-line { stroke-dasharray: 1; stroke-dashoffset: max(0, calc(1 - var(--p, 1) * 1.7)); }
.v7-pill { background: rgba(20,26,44,.38); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); }
.v7-big a { transition: color .5s var(--ease-out), letter-spacing .7s var(--ease-out); }
.v7-big a:hover { color: #e8efff; }
.v7-card img { transition: transform 1.6s var(--ease-out); }
.v7-card:hover img { transform: scale(1.05); }
.v7-dots { background-image: radial-gradient(rgba(232,239,255,.13) 1px, transparent 1px); background-size: 22px 22px; }
@media (prefers-reduced-motion: reduce) { .v7-word, .v7-route { filter: none; } }
`;

function Header() {
  const pill = "v7-pill inline-flex h-10 items-center rounded-[6px] px-4 text-[14px] font-medium text-white transition-colors hover:bg-white/25";
  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${PAD} pt-4 md:pt-5`}>
      <div className="relative flex items-center justify-between">
        <nav className="flex gap-2" aria-label="Primary">
          <Link href="/experiences" className={`${pill} md:hidden`}>Menu</Link>
          <Link href="/experiences" className={`${pill} hidden md:inline-flex`}>Experiences</Link>
          <Link href="#evening" className={`${pill} hidden md:inline-flex`}>The evening</Link>
          <Link href="/about" className={`${pill} hidden md:inline-flex`}>About</Link>
        </nav>
        <Link href="/concepts/7" className={`absolute left-1/2 -translate-x-1/2 text-center text-white ${SERIF}`} aria-label="Desert Stars home">
          <span className="block text-[11px] leading-none tracking-[0.5em]">✦</span>
          <span className="block text-[17px] font-medium uppercase leading-tight tracking-[0.22em] md:text-[20px]">Desert Stars</span>
        </Link>
        <nav className="flex gap-2" aria-label="Book">
          <Link href="/experiences#desert" className={`${pill} hidden md:inline-flex`}>Rates</Link>
          <Link href="/enquire" className="inline-flex h-10 items-center rounded-[6px] bg-[var(--ember)] px-4 text-[14px] font-semibold text-[var(--night)] transition-opacity hover:opacity-90">Enquire</Link>
        </nav>
      </div>
    </header>
  );
}

export default function Page() {
  return (
    <div className={`v7 ${serif.variable} ${giant.variable} ${mono.variable} ${body.variable} overflow-x-clip bg-[var(--sand)] font-[family-name:var(--v7-body)] text-[var(--ink)]`}>
      <style>{css}</style>
      <Header />

      {/* W12 — fixed side tab */}
      <Link href="#route" className="fixed right-0 top-1/2 z-40 hidden h-[200px] w-[52px] -translate-y-1/2 items-center justify-center bg-[var(--ember)] text-[var(--night)] lg:flex">
        <span className="rotate-180 text-[14px] font-semibold [writing-mode:vertical-rl]">How it works ✦</span>
      </Link>

      {/* W2 — hero: giant word fogs out on scroll */}
      <section data-scrub="sticky" className="relative h-[190svh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-[var(--night)] text-white">
          <div className="hero-zoom absolute inset-0"><Pic name="desert-sunset" sizes="100vw" priority alt="Sunset over the red dunes of Lehbab" /></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/10" />
          <div className="v7-ui absolute inset-x-0 top-[34%] md:top-[28%]">
            <div className={`flex flex-col items-center gap-10 ${PAD} md:flex-row md:items-start md:justify-between`}>
              <p className={`${SERIF} max-w-[16em] text-center text-[22px] italic leading-[1.15] md:text-left md:text-[20px]`}>Private evenings in the red dunes beyond Dubai</p>
              <Link href="/enquire" className="hidden w-[188px] items-center justify-between border-y border-white/40 px-8 py-3 text-[14px] font-medium md:flex">Plan an evening <span aria-hidden>▶</span></Link>
            </div>
          </div>
          <h1 className={`v7-word absolute inset-x-0 bottom-[14%] whitespace-nowrap text-center ${GIANT} text-[17vw] font-normal leading-[0.85] tracking-[0.03em] text-white/95 md:bottom-[12%] md:text-[17.5vw]`}>
            The Desert
          </h1>
          <div className="v7-fog pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[var(--sand)] via-[var(--sand)]/70 to-transparent" />
            <div className="absolute -left-[10%] bottom-[-10%] h-[45%] w-[60%] rounded-[50%] bg-white/70 blur-[60px]" />
            <div className="absolute -right-[10%] bottom-[-5%] h-[40%] w-[55%] rounded-[50%] bg-white/60 blur-[70px]" />
            <div className="absolute left-[25%] bottom-[10%] h-[30%] w-[50%] rounded-[50%] bg-[var(--sand)]/70 blur-[80px]" />
          </div>
          <p className={`v7-ui absolute bottom-5 left-5 ${MONO} text-[17px] tracking-[0.06em] text-[var(--ink)] md:left-10`}>Scroll ↓</p>
        </div>
      </section>

      {/* short WD statement out of the fog */}
      <section className={`v7-grid relative ${PAD} pb-28 pt-10 md:pb-40`}>
        <div className="mx-auto max-w-[1360px]">
          <p className={`${SERIF} text-[22px] italic`}>The red sands</p>
          <Swoosh className="mt-1 w-[150px] text-[var(--ink)]/60" />
          <div className="mt-8 md:ml-[33%]">
            <FillWords text="An evening that begins at your door and ends under a sky full of stars." className={`${SERIF} text-[30px] uppercase leading-[1.08] md:text-[54px]`} />
          </div>
        </div>
      </section>

      {/* W8 — full-bleed pull line, stepped into the dark (M4) */}
      <section className="relative h-[100svh] min-h-[620px] overflow-hidden text-white">
        <div className="absolute inset-0" data-parallax="0.12"><Pic name="camel-caravan" sizes="100vw" alt="A camel caravan crossing the dunes" /></div>
        <div className="absolute inset-0 bg-black/25" />
        <div className={`absolute inset-x-0 top-[24%] ${PAD} md:top-[30%]`}>
          <blockquote className="reveal ml-auto max-w-[19em] text-right md:mr-[8%]">
            <p className={`${SERIF} text-[30px] italic leading-[1.1] md:text-[46px]`}>“By sunset the city is gone, and the only sound left is the sand.”</p>
            <footer className="mt-5 text-[12px] font-semibold uppercase tracking-[0.2em]">Lehbab desert, Dubai</footer>
          </blockquote>
        </div>
        <div className={`absolute inset-x-0 bottom-0 ${MONO} text-[16px] tracking-[0.06em] text-[#e8efff] md:text-[18px]`}>
          <div className="relative h-[120px]">
            <div className="absolute bottom-[60px] left-0 flex h-[60px] w-[58%] items-center justify-end bg-[var(--night)] pr-4 md:w-[30%] md:pr-6">11,000+ guests hosted</div>
            <div className="absolute bottom-0 left-0 flex h-[60px] w-[72%] items-center justify-end bg-[var(--night)] pr-4 md:w-[39%] md:pr-6">Pick-up from your door</div>
            <div className="absolute bottom-[60px] right-0 hidden h-[60px] w-[30%] items-center bg-[var(--night)] pl-6 md:flex">Reply within 30 min</div>
            <div className="absolute bottom-0 right-0 flex h-[60px] w-[28%] items-center bg-[var(--night)] pl-4 md:w-[39%] md:pl-6"><span className="hidden md:inline">Free cancellation 24h</span></div>
          </div>
        </div>
      </section>

      {/* M5 — split headline around a photo, on dark */}
      <section className={`relative bg-[var(--night)] ${PAD} pb-24 pt-16 text-[#e8efff] md:pb-36 md:pt-24`}>
        <div className="relative mx-auto max-w-[1360px]">
          <h2 className={`${GIANT} relative z-10 text-[13vw] font-light leading-[0.8] md:text-[10.6vw]`}>
            <span className="block"><Split>Where the dunes</Split></span>
            <span className="mx-auto my-[-4vw] block h-[70vw] w-[62vw] overflow-hidden md:my-[-3.2vw] md:h-[38vw] md:w-[30vw]" data-reveal-host aria-hidden>
              <span className="reveal-img block h-full w-full"><Pic name="camel-ride" sizes="(min-width:768px) 30vw, 62vw" alt="" /></span>
            </span>
            <span className="block text-right"><Split delay={200}>Meet the stars</Split></span>
          </h2>
          <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
            <p className="reveal text-[26px] font-light leading-[1.12] md:col-span-8 md:text-[44px]">
              <span className="inline-block md:w-[2.5em]" />One 4x4, up to six of you, and a guide who knows the dunes of Lehbab by heart.
            </p>
            <div className={`reveal flex flex-wrap content-start gap-2 md:col-span-4 md:justify-end ${MONO} text-[17px] tracking-[0.05em]`}>
              <span className="border border-[#e8efff]/50 px-3 py-1">{"{"}{site.stats[2].value} experiences{"}"}</span>
              <span className="border border-[#e8efff]/50 px-3 py-1">Pick-up 15:00</span>
              <span className="border border-[#e8efff]/50 px-3 py-1">Drop-off 21:30</span>
            </div>
          </div>
        </div>
      </section>

      {/* W5 — accordion of evenings */}
      <section className={`v7-grid relative ${PAD} py-24 md:py-36`} id="experiences">
        <div className="mx-auto max-w-[1360px]">
          <div className="mb-12 flex flex-col items-center text-center md:mb-16">
            <p className={`${SERIF} text-[20px] italic`}>Choose your evening</p>
            <h2 className={`${SERIF} mt-2 text-[44px] font-normal uppercase leading-none md:text-[60px]`}>Our evenings</h2>
            <Swoosh className="mt-2 w-[220px] text-[var(--ink)]/60" />
          </div>
          <TripPanels trips={trips} />
          <div className="mt-10 flex justify-center">
            <Link href="/experiences" className="inline-flex h-12 items-center border border-[var(--ink)]/25 px-7 text-[14px] font-medium transition-colors hover:bg-[var(--ink)] hover:text-white">View all experiences</Link>
          </div>
        </div>
      </section>

      {/* W7 — THE CAMP: title over photo, strips wipe, cards slide */}
      <section data-scrub="sticky" className="relative h-[420svh]" aria-label="The camp">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-[var(--night)] text-white">
          <div className="absolute inset-0"><Pic name="camp-lanterns" sizes="100vw" alt="Lanterns glowing at the desert camp" /></div>
          <div className="absolute inset-0 bg-black/30" />
          <div className="v7-camp-title absolute inset-0">
            <div className={`absolute right-5 top-[16%] max-w-[260px] md:right-[14%] md:top-[12%]`}>
              <p className={`${GIANT} text-[20px] font-normal tracking-[0.02em]`}>Lantern light</p>
              <p className="mt-2 text-[14px] leading-[1.55] text-white/85">A Bedouin-style camp in the dunes: cushions on carpets, tea on the fire, dinner served once the sky turns dark.</p>
            </div>
            <h2 className={`${SERIF} absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[64px] font-normal uppercase leading-none md:text-[104px]`}>The camp</h2>
          </div>
          {/* vertical strips of night-sky texture */}
          <div className="absolute inset-0" aria-hidden>
            {Array.from({ length: STRIPS }).map((_, i) => (
              <div key={i} className="v7-strip absolute top-0 h-full overflow-hidden" style={{ left: `${(100 / STRIPS) * i}%`, width: `calc(${100 / STRIPS}% + 1px)`, ["--s" as string]: i % 2 ? 1 : 1.25 + i * 0.08 }}>
                <div className="absolute top-0 h-full w-[100vw]" style={{ left: `${-(100 / STRIPS) * i}vw` }}>
                  <Pic name="night-sky" sizes="100vw" alt="" />
                </div>
              </div>
            ))}
          </div>
          {/* floating cards */}
          <div className="absolute inset-0 flex items-center">
            <div className="v7-track flex w-max shrink-0 gap-5 pl-5 pr-5 md:gap-10 md:pl-10 md:pr-[12vw]">
              {camps.map((c) => (
                <Link key={c.title} href={c.href} className="v7-card group block shrink-0 bg-white/15 p-3 backdrop-blur-md md:p-5">
                  <div className="relative h-[62svh] max-h-[520px] w-[80vw] overflow-hidden md:h-[500px] md:w-[min(48vw,680px)]">
                    <Pic name={c.img} sizes="(min-width:768px) 48vw, 80vw" alt={c.title} />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/40" />
                    <div className="absolute inset-x-6 top-8 text-center md:top-10">
                      <h3 className={`${SERIF} text-[40px] font-normal uppercase leading-none md:text-[54px]`}>{c.title}</h3>
                      <p className="mx-auto mt-4 max-w-[30em] text-[14px] font-medium leading-[1.5] text-white/90">{c.text}</p>
                    </div>
                    <p className={`absolute inset-x-0 bottom-7 text-center ${GIANT} text-[16px] tracking-[0.04em]`}>{c.tag}</p>
                    <p className={`absolute bottom-7 right-6 hidden text-[13px] font-medium opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block`}>[ Discover ]</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* M8 — NO PLACE / LIKE THE DESERT */}
      <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-[var(--night)] text-white">
        <div className="absolute inset-0" data-parallax="0.1"><Pic name="camel-grazing" sizes="100vw" alt="Camels grazing on the desert plain" /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/0 to-black/35" />
        <h2 className={`${GIANT} absolute inset-0 font-light leading-[0.8]`}>
          <span className={`absolute left-5 top-[15%] text-[17vw] md:left-10 md:top-[12%] md:text-[11vw]`}><Split>No place</Split></span>
          <span className={`absolute bottom-[14%] right-5 text-right text-[17vw] md:bottom-[12%] md:right-10 md:text-[11vw]`}><span className="block md:inline"><Split delay={150}>Like the</Split></span> <span className="block md:inline"><Split delay={260}>desert</Split></span></span>
        </h2>
        <p className={`absolute bottom-5 left-5 ${MONO} text-[17px] tracking-[0.05em] md:left-10`}>Lehbab, Dubai</p>
        <p className={`absolute bottom-5 right-5 ${MONO} text-[17px] tracking-[0.05em] md:right-10`}>From 25°12′N 55°16′E</p>
      </section>

      {/* W9 — route: fog → white band → navy map */}
      <section id="route" className="relative">
        <div data-scrub="pass" className="relative h-[100svh] min-h-[600px] overflow-hidden">
          <div className="absolute inset-0"><Pic name="dunes-cruiser" sizes="100vw" alt="A 4x4 cruising over the dunes" /></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/35 to-white" />
          <h2 className={`v7-route absolute inset-x-0 top-[16%] text-center ${GIANT} text-[21vw] font-normal leading-[0.85] text-white md:text-[14vw] md:whitespace-nowrap`}>
            Dubai <span className="block md:inline">–</span> Lehbab
          </h2>
        </div>
        <div className={`relative bg-white ${PAD} pb-24 pt-6`}>
          <div className="border-t border-dashed border-[var(--ink)]/40" />
          <div className="mt-4 flex justify-between text-[13px] text-[var(--ink)]/80">
            <p className={`${GIANT}`}>25°12′N 55°16′E<br /><span className="normal-case">Dubai, your door</span></p>
            <p className={`${GIANT} text-right`}>Red dunes<br /><span className="normal-case">Lehbab camp</span></p>
          </div>
          <div className="mx-auto mt-10 max-w-[720px] text-center">
            <h3 className={`${SERIF} text-[38px] font-normal uppercase leading-[1.05] md:text-[56px]`}>To the edge of the sands</h3>
            <p className="mt-5 text-[15px] leading-[1.65] text-[var(--ink)]/80">We collect you from your hotel or home in the afternoon, cross into the red dunes of Lehbab for the drive and the sunset, and bring you back to your door after dinner at camp.</p>
          </div>
        </div>
        <div data-scrub="pass" className="v7-dots relative overflow-hidden bg-[#0c1222] text-[#e8efff] md:h-[100svh] md:min-h-[680px]">
          <div className="relative aspect-[4/5] md:absolute md:inset-0 md:aspect-auto">
            <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
            <path d="M-20 300 C 160 260, 300 330, 420 250 S 640 120, 760 80 S 980 -10, 1100 -20" fill="none" stroke="#e8efff" strokeOpacity=".35" strokeWidth="1.2" />
            <path d="M-20 300 C 160 260, 300 330, 420 250 S 640 120, 760 80 S 980 -10, 1100 -20 L -20 -20 Z" fill="#e8efff" fillOpacity=".04" />
            <path className="v7-line" pathLength={1} d="M560 210 C 700 260, 900 360, 930 620" fill="none" stroke="#ff9a4a" strokeWidth="1.6" />
            <circle cx="560" cy="210" r="6" fill="#ff9a4a" />
            <circle cx="930" cy="620" r="18" fill="none" stroke="#ff9a4a" strokeOpacity=".4" />
            <circle cx="930" cy="620" r="7" fill="#ff9a4a" />
          </svg>
          <p className={`absolute left-[18%] top-[10%] ${GIANT} text-[14px] tracking-[0.06em] text-[#e8efff]/50 md:left-[14%] md:top-[18%]`}>Arabian Gulf</p>
          <div className="absolute left-[30%] top-[26%] md:left-[39%]">
            <p className={`${SERIF} text-[18px] italic md:text-[22px]`}>Starting point</p>
            <p className={`${GIANT} text-[14px] md:text-[16px]`}>Dubai, 15:00</p>
          </div>
          <div className="absolute right-[24%] top-[72%] text-right md:left-[66%] md:right-auto md:top-[70%] md:text-left">
            <p className={`${SERIF} text-[18px] italic md:text-[22px]`}>The camp</p>
            <p className={`${GIANT} text-[14px] md:text-[16px]`}>Lehbab desert</p>
          </div>
          </div>
          <div className={`relative mx-5 mb-16 border border-white/10 bg-[#0a0e1a]/90 p-7 md:absolute md:bottom-10 md:left-10 md:m-0 md:w-[420px] md:p-9`}>
            {[["Pick-up", "15:00"], ["Drop-off", "21:30"], ["Group size", "Up to 6 per 4x4"]].map(([k, v], i) => (
              <div key={k} className={i ? "mt-6 border-t border-dotted border-white/25 pt-6" : ""}>
                <p className={`${SERIF} text-[19px] italic text-white/75`}>{k}</p>
                <p className="mt-1 text-[34px] font-medium leading-none md:text-[40px]">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* M7 — sticky centre column: The evening ™ */}
      <section id="evening" className={`relative bg-[var(--night)] text-[#e8efff]`}>
        <div className={`pointer-events-none sticky top-0 z-10 -mb-[100svh] flex h-[100svh] items-center justify-between ${PAD} mix-blend-difference`}>
          <h2 className="text-[26px] font-light md:text-[32px]">The evening <sup className={`${MONO} text-[14px]`}>™</sup></h2>
          <Link href="/experiences" className={`pointer-events-auto ${MONO} text-[19px] tracking-[0.05em] underline-offset-4 hover:underline`}>Discover</Link>
        </div>
        <div className="mx-auto flex w-[64vw] flex-col py-[12svh] md:w-[31vw]">
          {evening.map((e, i) => (
            <figure key={e.img} className="relative">
              <div className="relative h-[86vw] overflow-hidden md:h-[42vw]" data-reveal-host>
                <div className="reveal-img absolute inset-0 zoom"><Pic name={e.img} sizes="(min-width:768px) 31vw, 64vw" alt={e.cap.split("— ")[1]} /></div>
              </div>
              <figcaption className={`py-3 ${MONO} text-[16px] tracking-[0.05em] text-[#e8efff]/70 ${i === evening.length - 1 ? "" : "mb-2"}`}>{e.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* W10 — start planning */}
      <section className="relative h-[100svh] min-h-[600px] overflow-hidden text-white">
        <div className="absolute inset-0" data-parallax="0.1"><Pic name="mosque-bluehour" sizes="100vw" alt="The Grand Mosque at blue hour" /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/45" />
        <div className={`absolute inset-x-0 bottom-[12%] ${PAD} text-center`}>
          <h2 className={`${SERIF} mx-auto max-w-[12em] text-[42px] font-normal uppercase leading-[1] md:text-[64px]`}><Split>Start planning your evening</Split></h2>
          <Link href="/enquire" className="mt-8 inline-flex h-12 items-center border border-white/40 bg-white/10 px-10 text-[14px] font-medium backdrop-blur-md transition-colors hover:bg-white hover:text-[var(--ink)]">Get in touch</Link>
        </div>
      </section>

      {/* M11 — contact, giant stacked links */}
      <section className={`bg-[var(--night)] ${PAD} pb-24 pt-20 text-[#e8efff] md:pb-32 md:pt-28`}>
        <p className="reveal max-w-[1180px] text-[26px] font-light leading-[1.12] md:text-[44px]">
          <span className="inline-block w-[2.5em] md:w-[3em]" />Reach out to plan a private evening in the dunes. {site.response}
        </p>
        <nav className={`v7-big mt-16 ${GIANT} text-[19vw] font-normal leading-[0.86] text-[#6b7593] md:ml-[34%] md:mt-24 md:text-[11vw]`} aria-label="Contact">
          <a href={wa} className="block w-fit">WhatsApp</a>
          <a href={site.phoneHref} className="block w-fit">Call</a>
          <a href={`mailto:${site.email}`} className="block w-fit">Email</a>
          <Link href="/enquire" className="block w-fit">Enquire</Link>
        </nav>
        <div className={`mt-16 flex flex-wrap gap-x-8 gap-y-2 ${MONO} text-[17px] tracking-[0.05em] text-[#e8efff]/70 md:ml-[34%]`}>
          <span>{site.phone}</span><span>{site.hours}</span>
        </div>
      </section>

      {/* W11 — footer */}
      <footer className={`v7-grid bg-[var(--ice)] ${PAD} pb-8 pt-20`}>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
            <div>
              <h3 className={`${SERIF} text-[22px] italic`}>Experiences</h3>
              <ul className="mt-3 space-y-1.5 text-[14px] text-[var(--ink)]/70">
                {categories.map((c) => <li key={c.slug}><Link href={`/experiences#${c.slug}`} className="hover:text-[var(--ink)]">{c.name}</Link></li>)}
                <li><Link href="/experiences" className="hover:text-[var(--ink)]">View all</Link></li>
              </ul>
            </div>
            <div>
              <h3 className={`${SERIF} text-[22px] italic`}>Contact</h3>
              <ul className="mt-3 space-y-1.5 text-[14px] text-[var(--ink)]/70">
                <li><a href={site.phoneHref} className="hover:text-[var(--ink)]">{site.phone}</a></li>
                <li><a href={wa} className="hover:text-[var(--ink)]">WhatsApp</a></li>
                <li><a href={`mailto:${site.email}`} className="break-all hover:text-[var(--ink)]">{site.email}</a></li>
                <li>{site.hours}</li>
              </ul>
            </div>
            <div>
              <h3 className={`${SERIF} text-[22px] italic`}>Journal</h3>
              <ul className="mt-3 space-y-1.5 text-[14px] text-[var(--ink)]/70">
                {posts.slice(0, 3).map((p) => <li key={p.slug}><Link href={`/journal/${p.slug}`} className="hover:text-[var(--ink)]">{p.title}</Link></li>)}
                <li><Link href="/about" className="hover:text-[var(--ink)]">About us</Link></li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 md:col-span-5">
            <Link href="/experiences" className="flex h-24 items-center justify-center bg-[var(--sand)] text-[15px] font-medium hover:bg-white md:h-28">All experiences</Link>
            <Link href="/enquire" className="flex h-24 items-center justify-center bg-[var(--ember)] text-[15px] font-semibold text-[var(--night)] hover:opacity-90 md:h-28">Enquire now</Link>
            <a href={wa} className="flex h-24 items-center justify-center bg-[var(--sand)] text-[15px] font-medium hover:bg-white md:h-28">WhatsApp us</a>
            <a href={site.phoneHref} className="flex h-24 items-center justify-center bg-[var(--sand)] text-[15px] font-medium hover:bg-white md:h-28">Call us</a>
            <p className="col-span-2 mt-2 text-[13px] text-[var(--ink)]/65">{site.cancellation} {site.address}.</p>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center gap-4 border-t border-[var(--ink)]/15 pt-6 text-[12px] text-[var(--ink)]/65 md:flex-row md:justify-between">
          <span className={`${MONO} text-[16px] tracking-[0.05em]`}>✦ Desert Stars · Dubai</span>
          <p className={`${SERIF} text-[20px] italic text-[var(--ink)]`}>“Every desert keeps its own stars.”</p>
          <span>© {new Date().getFullYear()} Desert Stars. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
