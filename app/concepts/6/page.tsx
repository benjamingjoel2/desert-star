import Link from "next/link";
import { Oswald, Hanken_Grotesk, VT323, Cormorant_Garamond } from "next/font/google";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import TripPanels from "@/components/TripPanels";
import { Swoosh } from "@/components/Bits";
import { getTour, price, type Tour } from "@/lib/tours";
import { site, waLink, categories } from "@/data/site";
import { posts } from "@/data/journal";

const display = Oswald({ subsets: ["latin"], weight: ["400", "500"], variable: "--v6-display" });
const sans = Hanken_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--v6-sans" });
const mono = VT323({ subsets: ["latin"], weight: "400", variable: "--v6-mono" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--v6-serif" });

export const metadata = { title: "Variation 6 · Monumental type" };

/* One typographic voice: Oswald for every giant word, Hanken for statements and body,
   VT323 for boxed labels, Cormorant italic only for tiny accents. */
const big = "[font-family:var(--v6-display)] font-medium uppercase leading-[0.8] tracking-[-0.01em]";
const it = "[font-family:var(--v6-serif)] italic font-normal";
const mo = "[font-family:var(--v6-mono)] uppercase leading-none tracking-[0.04em]";
const box = `${mo} inline-flex items-center border border-current px-2 pb-[3px] pt-[4px] text-[17px]`;
const pad = "px-5 lg:px-10";

const WA = waLink("Hello Desert Stars, I'd like to plan a desert evening.");

const tripSlugs: { slug: string; img: string }[] = [
  { slug: "premium-evening-desert-safari", img: "premium-evening-1" },
  { slug: "premium-morning-desert-safari", img: "premium-morning-1" },
  { slug: "standard-sunset-desert-safari", img: "standard-sunset-3" },
  { slug: "grand-mosque-and-desert-safari", img: "combo-mosque-2" },
  { slug: "dubai-abu-dhabi-desert-safari-3-in-1", img: "combo-3in1-3" },
];
const trips = tripSlugs
  .map(({ slug, img }) => ({ t: getTour(slug), img }))
  .filter((x): x is { t: Tour; img: string } => Boolean(x.t))
  .map(({ t, img }) => ({ href: `/experiences/${t.slug}`, title: t.title, price: price(t), meta: t.timing, text: t.short, img }));

const evening: { no: string; label: string; img: string; alt: string }[] = [
  { no: "01", label: "Pick-up 15:00, from your door", img: "premium-evening-2", alt: "A 4x4 arriving at the Bedouin camp in the late afternoon" },
  { no: "02", label: "A camel ride at golden hour", img: "standard-sunset-4", alt: "A couple riding a camel across the dunes at sunset" },
  { no: "03", label: "The falcon, up close", img: "combo-3in1-3", alt: "A guest holding a falcon in the desert" },
  { no: "04", label: "The fire show", img: "standard-sunset-3", alt: "A fire performer at the camp after dark" },
  { no: "05", label: "BBQ dinner over coals", img: "premium-evening-4", alt: "BBQ dishes laid out at the camp" },
  { no: "06", label: "Drop-off 21:30, under the stars", img: "night-sky", alt: "The night sky over the dunes" },
];

const chips = ["11,000+ guests hosted", "Pick-up from your door", "Free cancellation 24h", "Reply within 30 min", "16 experiences"];

const contacts = [
  { label: "WhatsApp", href: WA, note: site.phone, ext: true },
  { label: "Call", href: site.phoneHref, note: site.hours, ext: false },
  { label: "Email", href: `mailto:${site.email}`, note: site.email, ext: false },
  { label: "Enquire", href: "/enquire", note: "Plan your evening", ext: false },
];

const css = `
.v6 { overflow-x: clip; }
.v6-grid { background-image: linear-gradient(to right, rgba(21,19,15,.07) 1px, transparent 1px); background-size: calc((100% - 40px) / 4) 100%; background-position: 20px 0; }
@media (min-width: 1024px) { .v6-grid { background-size: calc((100% - 80px) / 6) 100%; background-position: 40px 0; } }

/* Hero: centre card grows to fill the screen, the giant word blurs into the dust */
.v6-card { --g: min(1, calc(var(--p, 0) * 1.6));
  width: calc(var(--w0) + (100vw - var(--w0)) * var(--g));
  height: calc(var(--h0) + (100svh - var(--h0)) * var(--g));
  border-radius: calc(6px * (1 - var(--g))); }
.v6-hero { --w0: 46vw; --h0: 60vw; }
@media (min-width: 768px) { .v6-hero { --w0: 24vw; --h0: 31vw; } }
@media (min-width: 1280px) { .v6-hero { --w0: 300px; --h0: 390px; } }
.v6-mark { filter: blur(calc(var(--p, 0) * 16px)); opacity: calc(1 - var(--p, 0) * 2.2); transform: translate3d(0, calc(var(--p, 0) * -8vh), 0) scale(calc(1 + var(--p, 0) * 0.1)); }
.v6-ui { opacity: calc(1 - var(--p, 0) * 4); }
.v6-late { opacity: clamp(0, calc((var(--p, 0) - 0.62) * 4), 1); transform: translate3d(0, calc((1 - clamp(0, calc((var(--p, 0) - 0.62) * 4), 1)) * 6vh), 0); }

/* Route: the giant word dissolves into fog as it passes */
.v6-fogword { filter: blur(calc(max(0, var(--p, 0.4) - 0.45) * 34px)); opacity: calc(1 - max(0, var(--p, 0.4) - 0.5) * 2.2); }
.v6-drift { transform: translate3d(calc((var(--p, 0.5) - 0.5) * -6%), 0, 0); }

/* Contact links: pale until hovered */
.v6-link { color: #857c6c; transition: color .5s var(--ease-out), transform .7s var(--ease-out); }
.v6-link:hover, .v6-link:focus-visible { color: #15130f; transform: translate3d(1.5vw, 0, 0); }

/* Menu drawer */
.v6-menu[open] .v6-drawer { animation: v6in .9s var(--ease-out) both; }
@keyframes v6in { from { transform: translate3d(100%, 0, 0); } to { transform: none; } }
.v6-menu summary::-webkit-details-marker { display: none; }
.v6-menu summary { list-style: none; }
`;

export default function Page() {
  const journal = posts.slice(0, 3);
  return (
    <div className={`v6 ${display.variable} ${sans.variable} ${mono.variable} ${serif.variable} bg-[#f4efe6] text-[#15130f] [font-family:var(--v6-sans)] antialiased`}>
      <style>{css}</style>

      {/* ───────── M1 · Header: tiny mark left, boxed mono buttons right ───────── */}
      <Link href="/concepts/6" aria-label="Desert Stars, home" className="fixed left-5 top-5 z-50 flex items-center gap-2 text-white mix-blend-difference lg:left-10 lg:top-6">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M12 1l2.4 8.6L23 12l-8.6 2.4L12 23l-2.4-8.6L1 12l8.6-2.4z" fill="currentColor" /></svg>
        <span className={`${big} text-[19px] leading-none tracking-[0.12em]`}>Desert Stars</span>
      </Link>
      <div className="fixed right-5 top-5 z-50 flex gap-2 lg:right-10 lg:top-6">
        <Link href="/enquire" className={`${box} relative z-[2] border-[#15130f] bg-[#f4efe6] text-[#15130f] hover:bg-[#15130f] hover:text-[#f4efe6]`}>{"{Enquire}"}</Link>
      <details className="v6-menu">
        <summary className={`${box} relative z-[2] cursor-pointer border-[#15130f] bg-[#f4efe6] text-[#15130f] hover:bg-[#15130f] hover:text-[#f4efe6]`}>Menu</summary>
        <nav aria-label="Main" className="v6-drawer fixed inset-y-0 right-0 z-[1] flex w-full flex-col justify-between bg-[#15130f] px-5 pb-8 pt-24 text-[#f4efe6] sm:w-[520px] lg:px-10">
          <ul className="space-y-1">
            {[
              ["Experiences", "/experiences"],
              ["Journal", "/journal"],
              ["About", "/about"],
              ["Enquire", "/enquire"],
            ].map(([l, h]) => (
              <li key={h}><Link href={h} className={`${big} block text-[64px] text-[#f4efe6]/45 transition-colors duration-500 hover:text-[#f4efe6] sm:text-[84px]`}>{l}</Link></li>
            ))}
          </ul>
          <div className={`${mo} space-y-2 text-[17px] text-[#f4efe6]/70`}>
            <a href={WA} className="block hover:text-[#f4efe6]">WhatsApp · {site.phone}</a>
            <a href={`mailto:${site.email}`} className="block hover:text-[#f4efe6]">{site.email}</a>
          </div>
        </nav>
      </details>
      </div>

      {/* Fixed side tab (White Desert) */}
      <Link href="/enquire" className={`fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-3 bg-[#b84a14] px-3 py-7 text-[13px] font-medium text-white [writing-mode:vertical-rl] rotate-180 transition-colors hover:bg-[#15130f] lg:flex`}>
        <span aria-hidden="true">✦</span> Plan your evening
      </Link>

      <main>
        {/* ───────── M2 + W2 · Hero: giant LEHBAB over the dunes, centre card grows into the night ───────── */}
        <section data-scrub="sticky" className="v6-hero relative h-[250svh] bg-[#15130f]">
          <div className="sticky top-0 h-[100svh] overflow-hidden text-[#f4efe6]">
            <div className="hero-zoom absolute inset-0">
              <Pic name="dunes-cruiser" sizes="100vw" priority alt="A 4x4 cresting the red dunes of Lehbab" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,19,15,.45)_0%,rgba(21,19,15,.08)_40%,rgba(21,19,15,.5)_100%)]" />

            <div className={`v6-ui absolute inset-x-0 top-[17svh] flex items-start justify-between ${pad}`}>
              <p className={`${it} max-w-[15ch] text-[22px] leading-[1.15] lg:text-[26px]`}>Private desert evenings, an hour from Dubai</p>
              <a href="#evening" className="hidden w-[220px] items-center justify-between border-y border-[#f4efe6]/40 py-3 text-[14px] font-medium sm:flex">
                The evening <span aria-hidden="true">↓</span>
              </a>
            </div>

            {/* Centre card */}
            <div className="v6-card absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
              <Pic name="camp-lanterns" sizes="100vw" alt="Lanterns lit at the desert camp after dark" />
              <div className="absolute inset-0 bg-[#15130f]/30" />
              <div className={`v6-late absolute inset-0 flex flex-col justify-between py-[16svh] ${pad}`}>
                <p className={`${big} text-[16vw] lg:text-[11vw]`}>Where<br />the dunes</p>
                <p className={`${big} self-end text-right text-[16vw] lg:text-[11vw]`}>Meet<br />the stars</p>
              </div>
            </div>

            {/* Nav row across the middle (MC) */}
            <nav aria-label="Sections" className={`v6-ui absolute inset-x-0 top-1/2 z-[2] hidden -translate-y-1/2 items-center justify-between ${pad} ${mo} text-[18px] md:flex lg:pr-[84px]`}>
              <div className="flex w-[calc(50%-12vw-24px)] justify-between xl:w-[calc(50%-150px-24px)]">
                <a href="#experiences" className="hover:opacity-60">Experiences</a>
                <a href="#evening" className="hover:opacity-60">The evening</a>
              </div>
              <div className="flex w-[calc(50%-12vw-24px)] justify-between xl:w-[calc(50%-150px-24px)]">
                <a href="#route" className="hover:opacity-60">The route</a>
                <a href="#contact" className="hover:opacity-60">Contact</a>
              </div>
            </nav>

            {/* The giant word */}
            <h1 className="v6-mark pointer-events-none absolute inset-x-0 bottom-[7svh] z-[2] text-center">
              <span className="sr-only">Desert Stars, private desert safaris in Lehbab, Dubai</span>
              <span aria-hidden="true" className={`${big} fade-in block text-[31vw] leading-[0.78] tracking-[0.005em] text-[#f4efe6]`}>Lehbab</span>
            </h1>

            <div className={`v6-ui absolute inset-x-0 bottom-4 z-[2] flex justify-between ${pad} ${mo} text-[15px] text-[#f4efe6]/80`}>
              <span>Dubai 25°12′N 55°16′E</span>
              <span>Scroll ↓</span>
            </div>
          </div>
        </section>

        {/* ───────── M3 · Bio statement with inline photo + mono chips ───────── */}
        <section className={`v6-grid relative ${pad} pb-24 pt-28 lg:pb-36 lg:pt-44`}>
          <div className="lg:ml-[16.6%] lg:w-[72%]">
            <p className="reveal text-[29px] font-normal leading-[1.08] tracking-[-0.02em] sm:text-[38px] lg:text-[50px]">
              <span className="relative mr-3 inline-block h-[0.95em] w-[0.95em] overflow-hidden rounded-[4px] align-[-0.12em] lg:h-[2.1em] lg:w-[1.75em] lg:align-[-0.08em]" aria-hidden="true">
                <Pic name="combo-mosque-2" sizes="140px" />
              </span>
              A small Dubai house for private desert evenings: a 4x4 from your door, the red dunes of Lehbab, a lantern-lit camp and a night that runs at your pace.
            </p>
          </div>
          <ul className="mt-14 flex flex-wrap gap-2 lg:ml-[16.6%] lg:mt-20">
            {chips.map((c) => (
              <li key={c} className={`${box} text-[#15130f]/80`}>{c}</li>
            ))}
          </ul>
        </section>

        {/* ───────── M5 + M6 · Split headline straddling a photo ───────── */}
        <section className="relative bg-[#15130f] pb-24 pt-24 text-[#f4efe6] lg:pb-36 lg:pt-32">
          <div className={`relative ${pad}`}>
            <h2 className="relative z-[2]">
              <span className="sr-only">Raised by the dunes</span>
              <span aria-hidden="true" className={`${big} block text-[21vw] lg:ml-[8%] lg:text-[14.5vw]`}><Split>Raised by</Split></span>
            </h2>
            <div className="relative z-[1] mx-auto -mt-[6vw] w-[64vw] lg:-mt-[5vw] lg:w-[31vw]">
              <div className="reveal-img relative aspect-[3/4] overflow-hidden rounded-[4px]">
                <Pic name="camel-ride" sizes="(min-width:1024px) 31vw, 64vw" alt="A camel ride through the dunes at golden hour" />
              </div>
            </div>
            <p aria-hidden="true" className={`${big} relative z-[2] -mt-[11vw] text-right text-[21vw] lg:-mt-[9vw] lg:mr-[6%] lg:text-[14.5vw]`}><Split>The dunes</Split></p>
          </div>

          <div className={`mt-20 grid gap-10 ${pad} lg:mt-28 lg:grid-cols-12`}>
            <p className="reveal text-[26px] leading-[1.12] tracking-[-0.015em] lg:col-span-8 lg:text-[44px]">
              <span className="inline-block w-[12%]" aria-hidden="true" />
              Our guides grew up on this sand. They read the dunes by colour and wind, and they know where the camp is quiet when the sun goes down.
            </p>
            <div className="reveal grid gap-6 text-[15px] leading-[1.6] text-[#f4efe6]/75 sm:grid-cols-2 lg:col-span-6 lg:col-start-7" style={{ ["--d" as string]: "150ms" }}>
              <p>Every evening starts at your door. Up to six guests share a 4x4, so the drive into Lehbab feels like your own. The dune drive is as gentle or as wild as you ask for.</p>
              <p>{site.response} {site.cancellation} Tell us about birthdays, dietary needs or young children and we will set the evening around them.</p>
            </div>
          </div>
        </section>

        {/* ───────── W5 · EXPERIENCES + accordion ───────── */}
        <section id="experiences" className={`v6-grid relative pb-24 pt-20 lg:pb-32 lg:pt-28`}>
          <div className={`${pad}`}>
            <div className="flex items-end justify-between">
              <p className={`${it} text-[22px] lg:text-[28px]`}>Our evenings</p>
              <span className={`${mo} text-[17px] text-[#15130f]/70`}>({String(trips.length).padStart(2, "0")})</span>
            </div>
            <h2 className={`${big} mt-3 text-[16.2vw] lg:text-[17.4vw]`}><Split>Experiences</Split></h2>
            <Swoosh className="ml-auto -mt-[2vw] h-[40px] w-[60%] text-[#15130f]/40 lg:h-[70px] lg:w-[40%]" />
          </div>
          <div className="mt-10 px-3 lg:mt-14 lg:px-3">
            <TripPanels trips={trips} />
          </div>
          <div className={`mt-10 flex flex-col gap-6 ${pad} sm:flex-row sm:items-center sm:justify-between`}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-medium">
              {categories.map((c) => (
                <li key={c.slug}><Link href={`/experiences#${c.slug}`} className="border-b border-[#15130f]/25 pb-0.5 hover:border-[#15130f]">{c.name}</Link></li>
              ))}
            </ul>
            <Link href="/experiences" className={`${box} self-start text-[#15130f] hover:bg-[#15130f] hover:text-[#f4efe6]`}>All 16 experiences →</Link>
          </div>
        </section>

        {/* ───────── M8 · NO PLACE / LIKE THE DESERT ───────── */}
        <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[#15130f] text-[#f4efe6]">
          <div className="absolute inset-0" data-parallax="0.12"><Pic name="desert-sunset" sizes="100vw" alt="Sunset over the red dunes" /></div>
          <div className="absolute inset-0 bg-[#15130f]/35" />
          <div className="relative flex h-full flex-col justify-between px-4 pb-10 pt-20 lg:px-5 lg:pb-12 lg:pt-24">
            <h2 className={`${big} text-[25vw] leading-[0.86] lg:text-[12.5vw]`}><span className="sr-only">No place like the desert</span><span aria-hidden="true"><Split>No</Split><br /><Split delay={80}>place</Split></span></h2>
            <div className={`flex justify-between ${mo} text-[15px] lg:text-[18px]`}>
              <span>From the city to the red dunes</span>
              <span className="text-right">Dubai 25°12′N 55°16′E</span>
            </div>
            <p aria-hidden="true" className={`${big} self-end text-right text-[25vw] leading-[0.86] lg:text-[12.5vw]`}><Split delay={200}>Like the</Split><br /><Split delay={320}>desert</Split></p>
          </div>
        </section>

        {/* ───────── W9 · DUBAI – LEHBAB, fog, route map, stats card ───────── */}
        <section id="route" data-scrub="pass" className="relative h-[110svh] min-h-[640px] overflow-hidden">
          <div className="absolute inset-0"><Pic name="camel-caravan" sizes="100vw" alt="A camel caravan crossing the dunes" /></div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,19,15,.45)_0%,rgba(21,19,15,.12)_45%,transparent_70%)]" />
          <h2 className={`v6-fogword absolute inset-x-0 top-[14svh] text-center ${big} text-[13vw] text-[#f4efe6] lg:text-[14.5vw]`}>
            <span className="v6-drift inline-block whitespace-nowrap">Dubai – Lehbab</span>
          </h2>
          {/* fog */}
          <div className="absolute inset-x-0 bottom-0 h-[70%] bg-[linear-gradient(180deg,transparent_0%,rgba(244,239,230,.55)_45%,#f4efe6_92%)]" />
          <div className="absolute -left-[10%] bottom-[8%] h-[40%] w-[70%] rounded-full bg-[#f4efe6]/60 blur-[60px]" />
          <div className="absolute -right-[10%] bottom-[14%] h-[36%] w-[60%] rounded-full bg-[#f4efe6]/50 blur-[70px]" />
        </section>

        <section className="relative">
          <div className={`border-t border-dashed border-[#15130f]/35 ${pad} mx-5 px-0 pb-16 pt-4 lg:mx-10`}>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-[1fr_auto_1fr]">
              <p className={`${mo} text-[15px] text-[#15130f]/70`}>25°12′N 55°16′E<br />Dubai, your door</p>
              <p className={`${mo} text-right text-[15px] text-[#15130f]/70 lg:order-3`}>Red dunes<br />Lehbab camp</p>
              <div className="col-span-2 text-center lg:order-2 lg:col-span-1">
                <h3 className={`${big} reveal mt-4 text-[44px] leading-[0.9] lg:text-[72px]`}>To the edge<br />of the dunes</h3>
                <p className="reveal mx-auto mt-6 max-w-md text-[15px] leading-[1.6] text-[#15130f]/75">We collect you from your hotel or home in Dubai, drive out past the last of the city and into the red sand. By half past nine you are back at your door.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#15130f] text-[#f4efe6]">
          <div className="relative lg:h-[100svh] lg:min-h-[720px]">
           <div className="relative h-[640px] lg:absolute lg:inset-0 lg:h-auto">
            {/* abstract dune contours + route */}
            <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <pattern id="v6dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="rgba(244,239,230,.08)" /></pattern>
              </defs>
              <rect width="1440" height="900" fill="url(#v6dots)" />
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <path key={i} d={`M${640 + i * 30} 900 C ${760 + i * 40} ${640 - i * 20}, ${1080 + i * 10} ${700 - i * 50}, 1440 ${520 - i * 40}`} stroke="rgba(244,239,230,.10)" strokeWidth="1" fill="none" />
              ))}
              <path d="M720 140 C 600 330, 600 560, 780 720" stroke="#e7b07a" strokeWidth="1.5" fill="none" className="draw-line" />
              <circle cx="720" cy="140" r="5" fill="#f4efe6" />
              <circle cx="780" cy="720" r="5" fill="#f4efe6" />
              <circle cx="649" cy="430" r="7" fill="#e7b07a" />
              <circle cx="649" cy="430" r="16" fill="none" stroke="#e7b07a" strokeOpacity=".5" />
              <circle cx="649" cy="430" r="28" fill="none" stroke="#e7b07a" strokeOpacity=".25" />
            </svg>
            <div className="absolute left-[54%] top-[12%] lg:left-[52%]">
              <p className={`${it} text-[20px] text-[#f4efe6]/70`}>Starting point</p>
              <p className={`${big} mt-1 text-[20px] leading-none tracking-[0.04em]`}>Dubai, your door</p>
            </div>
            <div className="absolute left-[64%] top-[76%] lg:left-[56%]">
              <p className={`${it} text-[20px] text-[#f4efe6]/70`}>The camp</p>
              <p className={`${big} mt-1 text-[20px] leading-none tracking-[0.04em]`}>Lehbab</p>
            </div>

           </div>
            <div className="relative px-5 pb-12 lg:absolute lg:bottom-10 lg:left-10 lg:w-[440px] lg:p-0">
              <div className="reveal rounded-[4px] border border-[#f4efe6]/15 bg-[#1d1a15]/90 p-6 backdrop-blur lg:p-8">
                {[
                  ["Pick-up", "15:00"],
                  ["Drop-off", "21:30"],
                  ["Group", "Up to 6 per 4x4"],
                ].map(([k, v], i) => (
                  <div key={k} className={i ? "mt-5 border-t border-dashed border-[#f4efe6]/25 pt-5" : ""}>
                    <p className={`${it} text-[19px] text-[#f4efe6]/70`}>{k}</p>
                    <p className="mt-1 text-[34px] font-normal leading-none tracking-[-0.02em] lg:text-[42px]">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────── M7 · Sticky centre column "The evening ™" ───────── */}
        <section id="evening" className="relative bg-[#15130f] pb-24 text-[#f4efe6] lg:pb-0 lg:pt-32">
          {/* mobile: labels ride along at the top */}
          <div className={`sticky top-0 z-10 flex items-center justify-between bg-[#15130f]/90 ${pad} pb-3 pt-16 backdrop-blur lg:hidden`}>
            <p className="text-[24px] tracking-[-0.01em]">The evening <sup className={`${mo} text-[13px]`}>™</sup></p>
            <Link href="/experiences" className={`${mo} text-[17px]`}>Discover</Link>
          </div>
          <div className={`grid lg:grid-cols-[1fr_31vw_1fr] ${pad}`}>
            <div className="hidden lg:block">
              <div className="sticky top-1/2 -translate-y-1/2 pt-1">
                <p className="text-[30px] tracking-[-0.01em]">The evening <sup className={`${mo} text-[14px]`}>™ (06)</sup></p>
                <p className={`${it} mt-2 max-w-[18ch] text-[19px] text-[#f4efe6]/65`}>Six hours, from your door to the dunes and back.</p>
              </div>
            </div>
            <ol className="mx-auto w-full max-w-[460px] space-y-3 pt-4 lg:max-w-none lg:space-y-0 lg:pt-0">
              {evening.map((e) => (
                <li key={e.no} className="relative">
                  <div className="reveal-img relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
                    <Pic name={e.img} sizes="(min-width:1024px) 31vw, 90vw" alt={e.alt} />
                  </div>
                  <p className={`${mo} absolute bottom-3 left-3 bg-[#15130f] px-2 pb-[3px] pt-[4px] text-[16px]`}>{e.no} · {e.label}</p>
                </li>
              ))}
            </ol>
            <div className="hidden lg:block">
              <div className="sticky top-1/2 flex -translate-y-1/2 justify-end lg:pr-[64px]">
                <Link href="/experiences" className={`${mo} text-[19px] hover:opacity-60`}>Discover →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── M11 · Contact: statement + giant stacked links ───────── */}
        <section id="contact" className={`v6-grid relative ${pad} pb-24 pt-24 lg:pb-36 lg:pt-36`}>
          <p className="reveal text-[28px] leading-[1.1] tracking-[-0.02em] sm:text-[36px] lg:w-[88%] lg:text-[46px]">
            <span className="inline-block w-[12%]" aria-hidden="true" />
            Reach out to plan your evening in the dunes. Tell us the date and how many of you there are, and a person, not a bot, replies within 30 minutes.
          </p>
          <ul className="mt-16 lg:ml-[33%] lg:mt-24">
            {contacts.map((c) => {
              const inner = (
                <>
                  <span className={`${big} block text-[21vw] leading-[0.86] sm:text-[17vw] lg:text-[11.5vw]`}>{c.label}</span>
                  <span className={`${mo} mb-[1.2vw] hidden text-[17px] text-[#15130f]/70 sm:block`}>{c.note}</span>
                </>
              );
              const cls = "v6-link flex items-end justify-between gap-6";
              return (
                <li key={c.label}>
                  {c.href.startsWith("/") ? (
                    <Link href={c.href} className={cls}>{inner}</Link>
                  ) : (
                    <a href={c.href} className={cls} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </main>

      {/* ───────── W11 · Footer (no giant wordmark) ───────── */}
      <footer className="v6-grid border-t border-[#15130f]/15 bg-[#ebe4d7]">
        <div className={`grid gap-12 ${pad} pb-14 pt-16 lg:grid-cols-12 lg:pt-20`}>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div className="col-span-2 sm:col-span-1">
              <p className={`${it} text-[22px]`}>Talk to us</p>
              <ul className="mt-3 space-y-1.5 text-[14px] text-[#15130f]/70">
                <li><a href={WA} className="hover:text-[#15130f]">WhatsApp</a></li>
                <li><a href={site.phoneHref} className="hover:text-[#15130f]">{site.phone}</a></li>
                <li><a href={`mailto:${site.email}`} className="break-all hover:text-[#15130f]">{site.email}</a></li>
                <li>{site.hours}</li>
              </ul>
            </div>
            <div>
              <p className={`${it} text-[22px]`}>Experiences</p>
              <ul className="mt-3 space-y-1.5 text-[14px] text-[#15130f]/70">
                {categories.map((c) => (
                  <li key={c.slug}><Link href={`/experiences#${c.slug}`} className="hover:text-[#15130f]">{c.name}</Link></li>
                ))}
                <li><Link href="/experiences" className="hover:text-[#15130f]">View all</Link></li>
              </ul>
            </div>
            <div>
              <p className={`${it} text-[22px]`}>Journal</p>
              <ul className="mt-3 space-y-1.5 text-[14px] text-[#15130f]/70">
                {journal.map((p) => (
                  <li key={p.slug}><Link href={`/journal/${p.slug}`} className="hover:text-[#15130f]">{p.title}</Link></li>
                ))}
                <li><Link href="/about" className="hover:text-[#15130f]">About us</Link></li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:col-span-5">
            <Link href="/experiences" className="flex h-24 items-center justify-center bg-[#f4efe6] text-[14px] font-medium transition-colors hover:bg-[#15130f] hover:text-[#f4efe6] lg:h-32">All experiences</Link>
            <Link href="/enquire" className="flex h-24 items-center justify-center bg-[#b84a14] text-[14px] font-medium text-white transition-colors hover:bg-[#15130f] lg:h-32">Enquire now</Link>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="col-span-2 flex h-24 items-center justify-center bg-[#f4efe6] text-[14px] font-medium transition-colors hover:bg-[#15130f] hover:text-[#f4efe6] lg:h-28">Plan on WhatsApp</a>
          </div>
        </div>
        <div className={`flex flex-col gap-4 border-t border-[#15130f]/15 ${pad} py-6 lg:flex-row lg:items-center lg:justify-between`}>
          <p className={`${mo} text-[15px] text-[#15130f]/70`}>✦ Desert Stars · Dubai</p>
          <p className={`${it} text-[22px]`}>“Where the dunes meet the stars”</p>
          <p className={`${mo} text-[15px] text-[#15130f]/70`}>© {new Date().getFullYear()} · {site.address.split(",").slice(-2).join(",").trim()}</p>
        </div>
      </footer>
    </div>
  );
}
