import Link from "next/link";
import { Oswald, Cormorant_Garamond, Hanken_Grotesk, VT323 } from "next/font/google";
import Pic from "@/components/Pic";
import TripPanels from "@/components/TripPanels";
import { FillWords, Swoosh } from "@/components/Bits";
import { tours, getTour, price, cover, type Tour } from "@/lib/tours";
import { site, waLink } from "@/data/site";
import { posts } from "@/data/journal";

const mark = Oswald({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--v5-mark", display: "swap" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--v5-serif", display: "swap" });
const sans = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--v5-sans", display: "swap" });
const mono = VT323({ subsets: ["latin"], weight: "400", variable: "--v5-mono", display: "swap" });

export const metadata = { title: "Variation 5 · White Desert-first" };

/* Palette: white · off-white #f3f1ec · navy ink #1f2a44 · orange #ff7e15 (accent only: side tab + Enquire).
   Small text on orange is navy (5.7:1). Grey body #5a6174 on white/off-white (≥5.3:1). */

const fMark = "font-[family-name:var(--v5-mark)]";
const fSerif = "font-[family-name:var(--v5-serif)]";
const fMono = "font-[family-name:var(--v5-mono)]";
const chip = `${fMono} inline-flex items-center border border-current px-2.5 pb-[5px] pt-[6px] text-[18px] uppercase leading-none tracking-[0.02em]`;

const wa = waLink("Hello Desert Stars, I'd like to plan an evening in the desert.");

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" />
    </svg>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Desert Stars, home" className={`flex flex-col items-center gap-1 ${className}`}>
      <svg viewBox="0 0 64 18" aria-hidden="true" className="h-[14px] w-[50px] md:h-[17px] md:w-[60px]" fill="currentColor">
        <path d="M0 18c8-7 14-10 22-10 6 0 9 3 14 3 5 0 9-6 14-6 5 0 9 6 14 13Z" opacity=".9" />
        <path d="M44 0c.25 2.6 1.4 3.75 4 4-2.6.25-3.75 1.4-4 4-.25-2.6-1.4-3.75-4-4 2.6-.25 3.75-1.4 4-4Z" />
      </svg>
      <span className={`${fMark} text-[13px] font-normal uppercase leading-none tracking-[0.22em] md:text-[15px]`}>Desert Stars</span>
    </Link>
  );
}

/* Faint vertical grid lines that run down the whole page (White Desert). */
function GridLines() {
  const desk = [0.83, 4.17, 17.22, 33.61, 50, 66.39, 82.78, 95.83, 99.17];
  const mob = [3.1, 15.4, 50, 84.6, 96.9];
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40">
      {desk.map((x) => (
        <span key={`d${x}`} className="absolute inset-y-0 hidden w-px bg-[#8d93a3]/[0.16] lg:block" style={{ left: `${x}%` }} />
      ))}
      {mob.map((x) => (
        <span key={`m${x}`} className="absolute inset-y-0 w-px bg-[#8d93a3]/[0.14] lg:hidden" style={{ left: `${x}%` }} />
      ))}
    </div>
  );
}

const pill = "inline-flex h-10 items-center rounded-full px-5 text-[14px] font-medium transition-colors duration-300";

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 px-3 pt-3 text-white md:px-[4.17vw] md:pt-6">
      {/* Desktop: grey pills left, centred logo, pills right */}
      <div className="relative hidden items-center justify-between lg:flex">
        <nav aria-label="Main" className="flex gap-2">
          {[
            ["/experiences", "Experiences"],
            ["/experiences#desert", "The desert"],
            ["/about", "About"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className={`${pill} bg-white/15 backdrop-blur-md hover:bg-white/30`}>{label}</Link>
          ))}
        </nav>
        <Logo className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="flex gap-2">
          <Link href="/journal" className={`${pill} bg-white/15 backdrop-blur-md hover:bg-white/30`}>Journal</Link>
          <a href={site.phoneHref} className={`${pill} bg-white/15 backdrop-blur-md hover:bg-white/30`}>Call</a>
          <Link href="/enquire" className={`${pill} bg-[#ff7e15] text-[#1f2a44] hover:bg-white`}>Enquire</Link>
        </div>
      </div>
      {/* Mobile: one bordered bar, Menu · logo · orange Enquire */}
      <div className="relative flex h-[52px] items-center justify-between rounded-[4px] border border-white/25 bg-white/[0.06] pl-2 pr-1.5 backdrop-blur-sm lg:hidden">
        <details className="group">
          <summary className="flex h-10 cursor-pointer list-none items-center px-3 text-[15px] font-medium [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Menu</span><span className="hidden group-open:inline">Close</span>
          </summary>
          <nav aria-label="Main" className="absolute inset-x-0 top-[calc(100%+8px)] rounded-[4px] bg-white p-5 text-[#1f2a44] shadow-[0_20px_50px_-20px_rgba(31,42,68,.35)]">
            <ul className={`${fSerif} space-y-1 text-[30px] uppercase leading-[1.15]`}>
              <li><Link href="/experiences">Experiences</Link></li>
              <li><Link href="/experiences#desert">The desert</Link></li>
              <li><Link href="/journal">Journal</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={wa} className={chip}>WhatsApp</a>
              <a href={site.phoneHref} className={chip}>Call</a>
            </div>
          </nav>
        </details>
        <Logo className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <Link href="/enquire" className="inline-flex h-10 items-center rounded-[3px] bg-[#ff7e15] px-4 text-[15px] font-medium text-[#1f2a44]">Enquire</Link>
      </div>
    </header>
  );
}

const experiences: { slug: string; name: string }[] = [
  { slug: "premium-evening-desert-safari", name: "The Premium Evening" },
  { slug: "evening-desert-safari", name: "Evening in the Red Dunes" },
  { slug: "premium-morning-desert-safari", name: "Dawn in the Dunes" },
  { slug: "standard-sunset-desert-safari", name: "The Sunset Safari" },
  { slug: "grand-mosque-and-desert-safari", name: "Mosque & Dunes" },
];

const camps = [
  { title: "The camp", text: "Lanterns, low cushions and a fire pit. Dinner from the coals, then the fire show as the sky goes dark.", img: "standard-sunset-3", href: "/experiences/premium-evening-desert-safari" },
  { title: "The dunes", text: "The high red dunes of Lehbab, driven by guides who know every ridge. Never more than six to a 4x4.", img: "premium-evening-2", href: "/experiences#desert" },
  { title: "The water", text: "When the sand is behind you: dinner on a wooden dhow, from old Dubai Creek to the Marina lights.", img: "dubai-night", href: "/experiences#cruises" },
];

const css = `
.v5 .v5-cloud { transform: translate3d(0, calc((1 - var(--p, 0)) * 30%), 0) scale(calc(1 + var(--p, 0) * 0.5)); opacity: calc(0.6 + var(--p, 0) * 0.6); }
.v5 .v5-whiteout { opacity: clamp(0, calc(var(--p, 0) * 1.9 - 0.55), 1); }
.v5 .v5-heroui { opacity: clamp(0, calc(1 - var(--p, 0) * 1.7), 1); }
.v5 .v5-rise { transform: translate3d(0, calc((1 - var(--p, 1)) * 62%), 0);
  clip-path: polygon(0 34%, 6% 27%, 13% 24%, 20% 27%, 27% 20%, 34% 12%, 40% 15%, 47% 24%, 55% 21%, 63% 11%, 70% 4%, 76% 0, 82% 6%, 89% 15%, 95% 19%, 100% 17%, 100% 100%, 0 100%); }
.v5 .v5-camp { --q1: clamp(0, calc(var(--p, 1) * 5), 1); --q3: clamp(0, calc((var(--p, 1) - 0.46) / 0.54), 1); }
.v5 .v5-campimg { clip-path: inset(calc((1 - var(--q1)) * 10%) calc((1 - var(--q1)) * 8.8%)); }
.v5 .v5-camptxt { opacity: clamp(0, calc(var(--p, 1) * 8 - 0.7), 1); }
.v5 .v5-strip { transform: translate3d(0, calc((1 - clamp(0, calc((var(--p, 1) - 0.2) * 7 - var(--i) * 0.16), 1)) * 101%), 0); }
.v5 .v5-track { --w: min(640px, 84vw); --g: 24px; transform: translate3d(calc(80vw - var(--q3) * (30vw + 2.5 * var(--w) + 2 * var(--g))), 0, 0); }
.v5 .v5-card { width: var(--w); }
.v5 .v5-pull { opacity: clamp(0, calc(1 - var(--p, 0) * 2.4), 1); transform: translate3d(0, calc(var(--p, 0) * -14vh), 0); }
.v5 .v5-word { transform: translate3d(0, calc((1 - clamp(0, calc(var(--p, 0) * 1.4), 1)) * 52vh), 0); }
.v5 .v5-fog2 { opacity: clamp(0, calc(var(--p, 0) * 1.6 - 0.25), 1); }
.v5 .v5-veil { opacity: clamp(0, calc(var(--p, 0) * 0.7 - 0.1), 0.55); }
.v5 .v5-route { stroke-dasharray: 1000px; stroke-dashoffset: calc(1000px * (1 - clamp(0, calc(var(--p, 1) * 1.8 - 0.25), 1))); }
.v5 .v5-sig { stroke-dasharray: 1000px; stroke-dashoffset: calc(1000px * (1 - clamp(0, calc(var(--p, 1) * 2.2 - 0.5), 1))); }
.v5 .v5-pulse { transform-box: fill-box; transform-origin: center; animation: v5pulse 2.4s ease-out infinite; }
.v5 .v5-pulse.d2 { animation-delay: 1.2s; }
@keyframes v5pulse { from { transform: scale(0.6); opacity: 0.9; } to { transform: scale(2.6); opacity: 0; } }
.v5 .v5-vtab { writing-mode: vertical-rl; transform: rotate(180deg); }
@media (prefers-reduced-motion: reduce) {
  .v5 .v5-camp { height: auto !important; }
  .v5 .v5-camp .v5-stage { position: relative; }
  .v5 .v5-strips { display: none; }
  .v5 .v5-track { position: relative !important; transform: none !important; overflow-x: auto; padding: 0 20px; }
}
`;

export default function Page() {
  const trips = experiences
    .map(({ slug, name }) => {
      const t = getTour(slug);
      return t ? { href: `/experiences/${t.slug}`, title: name, price: price(t), meta: t.timing, text: t.short, img: cover(t) } : null;
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);
  const desert = tours.filter((t: Tour) => t.category === "desert");
  const emirates = tours.filter((t: Tour) => t.category !== "desert").slice(0, 6);

  return (
    <div className={`v5 ${mark.variable} ${serif.variable} ${sans.variable} ${mono.variable} relative overflow-x-clip bg-white font-[family-name:var(--v5-sans)] text-[#1f2a44] antialiased`}>
      <style>{css}</style>
      <GridLines />
      <Header />

      {/* W12 — fixed orange side tab */}
      <Link href="/enquire" className="fixed right-0 top-[39%] z-50 hidden h-[200px] w-[56px] flex-col items-center justify-center gap-3 bg-[#ff7e15] text-[14px] font-medium text-[#1f2a44] transition-[width] duration-300 hover:w-[64px] md:flex">
        <span className="v5-vtab">Plan your evening</span>
        <Star className="h-3 w-3" />
      </Link>

      <main id="main">
        {/* W2 — hero: giant Oswald place word that blurs into fog */}
        <section data-scrub="sticky" className="relative h-[190svh]" aria-label="Arabia">
          <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#c9c2b8]">
            <div className="hero-zoom absolute inset-0"><Pic name="desert-sunset" sizes="100vw" priority alt="A guest sitting on a red dune watching the sun go down" /></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1f2a44]/45 via-[#1f2a44]/10 to-transparent" />
            <h1 className="hero-mark absolute inset-x-0 bottom-[17%] text-center text-white md:bottom-[19%]">
              <span className={`${fMark} block text-[clamp(104px,27vw,400px)] font-normal uppercase leading-[0.8] tracking-[0.015em]`}>Arabia</span>
              <span className="sr-only">Desert Stars: private evenings in the red dunes beyond Dubai</span>
            </h1>
            {/* fog */}
            <div className="v5-cloud pointer-events-none absolute inset-x-[-10%] bottom-[-12%] h-[55%] rounded-[50%] bg-white/80 blur-[60px]" />
            <div className="v5-cloud pointer-events-none absolute bottom-[-6%] left-[-10%] h-[38%] w-[60%] rounded-[50%] bg-white/70 blur-[50px]" />
            <div className="v5-cloud pointer-events-none absolute bottom-[-4%] right-[-8%] h-[32%] w-[55%] rounded-[50%] bg-white/70 blur-[50px]" />
            <div className="v5-whiteout pointer-events-none absolute inset-0 bg-white" />
            <div className="v5-heroui absolute inset-x-5 top-[38%] text-center text-white md:inset-x-auto md:left-[4.17vw] md:top-[28%] md:text-left">
              <p className={`${fSerif} text-[22px] italic leading-[1.15] md:text-[20px]`}>Private evenings in the<br />red dunes beyond Dubai</p>
            </div>
            <Link href="/experiences/premium-evening-desert-safari" className="v5-heroui absolute inset-x-[15.4%] bottom-[33%] flex h-11 items-center justify-between border-y border-white/40 px-4 text-[15px] font-medium text-white transition-colors hover:bg-white/10 md:inset-x-auto md:bottom-auto md:right-[4.17vw] md:top-[28%] md:w-[13.06vw] md:min-w-[190px] md:px-8">
              The evening <span aria-hidden="true">▶</span>
            </Link>
          </div>
        </section>

        {/* W3 — statement that fills on scroll, swoosh label */}
        <section className="relative bg-white px-5 pb-[16svh] pt-[10svh] md:px-10 lg:px-0 lg:pb-[20svh] lg:pt-[14svh]">
          <div className="relative mb-6 inline-block pl-1 lg:mb-8 lg:ml-[27.8vw]">
            <Swoosh className="absolute -left-3 -top-5 w-[230px] text-[#1f2a44]/45" />
            <p className={`${fSerif} relative pl-[86px] pt-5 text-[20px] italic`}>The Red Sands</p>
          </div>
          <div className="lg:ml-[33.61vw] lg:w-[49.2vw]">
            <FillWords
              text="Vast, quiet and impossibly golden — an evening in the dunes beyond Dubai remains the most beautiful way to meet Arabia, and the one our guests remember."
              className={`${fSerif} text-[30px] uppercase leading-[1.02] tracking-[0.005em] [text-indent:22%] md:text-[44px] lg:text-[52px] lg:[text-indent:33.3%]`}
            />
          </div>
        </section>

        {/* W4 — Our season, with a dune cut-out rising from the bottom edge */}
        <section data-scrub="sticky" className="relative h-[190svh]" aria-labelledby="v5-season">
          <div className="sticky top-0 h-[100svh] overflow-hidden bg-gradient-to-b from-white via-[#faf7f2] to-[#f1e6d6]">
            <div className="relative z-10 px-5 pt-[13svh] md:px-10 lg:ml-[17.22vw] lg:w-[17.5vw] lg:px-0 lg:pt-[30svh]">
              <h2 id="v5-season" className={`${fMark} text-[20px] font-normal uppercase tracking-[0.01em]`}>Our season</h2>
              <p className="mt-4 max-w-[340px] text-[15px] font-medium leading-[1.45] text-[#1f2a44]/85">
                All year round, from soft winter evenings to long summer sunsets, we collect guests from their door in Dubai at 15:00 and drive south into the red sands of Lehbab. Never more than six to a 4x4, with our team on the ground until we drop you home at 21:30.
              </p>
              <ul className="mt-6 flex max-w-[360px] flex-wrap gap-2 text-[#1f2a44]">
                <li className={chip}>{site.stats[0].value} guests hosted</li>
                <li className={chip}>Pick-up from your door</li>
                <li className={chip}>Free cancellation 24h</li>
                <li className={chip}>Reply within 30 min</li>
              </ul>
            </div>
            <div className="v5-rise absolute inset-x-0 bottom-0 h-[64%] lg:h-[78%]">
              <Pic name="dunes-cruiser" sizes="100vw" className="object-bottom" alt="A white 4x4 crossing wide red dunes" />
            </div>
          </div>
        </section>

        {/* W5 — OUR EXPERIENCES accordion */}
        <section className="relative bg-white pb-[12svh] pt-[14svh]" aria-labelledby="v5-exp">
          <div className="relative mx-auto mb-14 w-fit px-5 lg:mb-20">
            <h2 id="v5-exp" className={`${fSerif} relative z-10 text-center text-[44px] font-normal uppercase leading-none md:text-[64px]`}>Our experiences</h2>
            <Swoosh className="absolute -bottom-12 left-1/2 w-[110%] -translate-x-[46%] text-[#1f2a44]/40" />
          </div>
          <div className="px-3">
            <TripPanels trips={trips} />
          </div>
          <div className="mt-8 flex justify-center px-5">
            <Link href="/experiences" className={`${chip} text-[#1f2a44] transition-colors hover:bg-[#1f2a44] hover:text-white`}>[ All 16 experiences ]</Link>
          </div>
        </section>

        {/* MC — split headline around a photo, in Oswald */}
        <section className="relative bg-white px-5 pb-[14svh] pt-[8svh] md:px-10" aria-labelledby="v5-raised">
          <h2 id="v5-raised" className="sr-only">Raised by the dunes</h2>
          <div aria-hidden="true" className={`${fMark} relative mx-auto max-w-[1360px] font-normal uppercase leading-[0.8] tracking-[-0.005em] text-[#1f2a44]`}>
            <p className="relative z-10 text-[clamp(64px,12.5vw,184px)] lg:ml-[13vw]">Raised<br />by</p>
            <div className="reveal-img relative z-0 mx-auto -mt-[9vw] aspect-[3/4] w-[62vw] max-w-[440px] overflow-hidden rounded-[3px] lg:-mt-[7vw] lg:w-[31vw]">
              <Pic name="combo-3in1-3" sizes="(min-width:1024px) 31vw, 62vw" alt="" />
            </div>
            <p className="relative z-10 -mt-[11vw] text-right text-[clamp(64px,12.5vw,184px)] lg:-mt-[8vw] lg:mr-[13vw]">The<br />dunes</p>
          </div>
          <div className="mx-auto mt-14 grid max-w-[1360px] gap-6 lg:mt-20 lg:grid-cols-[33.61vw_1fr] lg:gap-0">
            <div className="flex flex-wrap content-start gap-2">
              <span className={chip}>Lehbab · red dunes</span>
              <span className={chip}>{site.stats[2].value} experiences</span>
            </div>
            <div className="grid gap-6 text-[15px] leading-[1.55] text-[#5a6174] md:grid-cols-2 lg:max-w-[49.2vw]">
              <p>Our guides grew up between the city and the sand. They read the dunes by the colour of the light, know which ridge catches the last sun, and where the camp is quietest once the music stops.</p>
              <p>That is the whole idea: a small group, a good driver, a fire, a long table and the sky. We look after the rest, from the first WhatsApp message to the drive home.</p>
            </div>
          </div>
        </section>

        {/* W6 — brand promise, signed */}
        <section data-scrub="pass" className="relative bg-white px-5 pb-[18svh] pt-[6svh] md:px-10 lg:px-0" aria-label="Our promise">
          <figure className="lg:ml-[33.61vw] lg:w-[33vw]">
            <span aria-hidden="true" className={`${fSerif} block text-[34px] leading-none`}>“</span>
            <blockquote className={`${fSerif} text-[25px] italic leading-[1.18] [text-indent:4.5rem] md:text-[29px]`}>
              Every evening we take our guests out of the city and into the quiet of the red dunes, and we still stop at the top of the first ridge, because we still want to see their faces. The desert needs nothing added. Our work is simply to bring you there well, and to bring you home.
            </blockquote>
            <span aria-hidden="true" className="mt-4 block">-</span>
            <svg viewBox="0 0 380 80" aria-hidden="true" className="-ml-3 mt-2 h-[72px] w-[340px] text-[#1f2a44]" fill="none">
              <path pathLength={1000} className="v5-sig" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
                d="M14 22c26-8 54-6 52 10-2 18-30 30-46 28-10-2 2-14 14-22 2 16 4 34 2 44M70 52c6-12 18-14 16-4-2 8-12 8-10 0 4-12 16-6 22-2 6 4 14-10 20-12-6 10-4 16 4 12 8-4 14-18 18-30-4 16-6 30 0 32 6 2 14-12 22-16-2 8 0 14 8 12 10-2 18-12 26-10-8 2-12 10-6 14 8 4 20-8 28-14 0 10 2 16 10 14 12-4 18-22 26-28-6 16-4 26 4 26 14 0 22-12 40-16M120 30c40-6 120-10 210-2" />
            </svg>
            <figcaption className="mt-3 text-[15px] leading-[1.4]">
              <span className="block font-medium">The Desert Stars team</span>
              <span className="block text-[#5a6174]">Dubai &amp; Lehbab</span>
            </figcaption>
          </figure>
        </section>

        {/* W7 — THE CAMP: title over full-bleed photo → strips wipe across → white cards slide over the night sky */}
        <section data-scrub="sticky" className="v5-camp relative h-[460svh] lg:h-[540svh]" aria-labelledby="v5-camp">
          <div className="v5-stage sticky top-0 h-[100svh] overflow-hidden bg-white">
            <div className="v5-campimg absolute inset-0">
              <Pic name="camp-lanterns" sizes="100vw" alt="The lantern-lit camp in the dunes at dusk" />
              <div className="absolute inset-0 bg-[#1f2a44]/30" />
            </div>
            <h2 id="v5-camp" className={`${fSerif} absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[54px] font-normal uppercase leading-none text-white md:text-[76px]`}>The camp</h2>
            <div className="v5-camptxt absolute left-5 right-[20%] top-[11%] text-white md:left-auto md:right-[17.22vw] md:w-[17vw] md:min-w-[250px]">
              <h3 className={`${fMark} text-[20px] font-normal uppercase`}>Desert comfort</h3>
              <p className="mt-3 text-[15px] font-medium leading-[1.45] text-white/90">
                A private corner for every group, low cushions and lanterns, mint tea on arrival and a long BBQ dinner cooked over the coals. When the shows end, the lights go down and the stars take over.
              </p>
            </div>
            <div aria-hidden="true" className="v5-strips absolute inset-0">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="v5-strip absolute inset-y-0 overflow-hidden" style={{ left: `${(i * 100) / 6}%`, width: "16.75%", ["--i" as string]: i }}>
                  <div className="absolute inset-y-0 w-[600%]" style={{ left: `${-i * 100}%` }}>
                    <Pic name="night-sky" sizes="100vw" alt="" />
                  </div>
                </div>
              ))}
            </div>
            <ul className="v5-track no-scrollbar absolute inset-y-0 left-0 flex items-center gap-[24px]">
              {camps.map((c) => (
                <li key={c.title} className="v5-card shrink-0 bg-white p-4 text-center text-[#1f2a44] shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)] md:p-6">
                  <h3 className={`${fSerif} text-[36px] font-normal uppercase leading-none md:text-[48px]`}>{c.title}</h3>
                  <p className="mx-auto mt-3 max-w-[440px] text-[14px] leading-[1.45] text-[#5a6174] md:text-[15px]">{c.text}</p>
                  <div className="relative mt-4 aspect-[16/10] overflow-hidden md:mt-5 md:aspect-[16/9]">
                    <Pic name={c.img} sizes="(min-width:768px) 640px, 84vw" alt="" />
                  </div>
                  <Link href={c.href} className={`${fMono} mt-4 inline-block text-[20px] uppercase leading-none tracking-[0.04em] hover:text-[#c25a00]`}>
                    [ Discover<span className="sr-only"> {c.title}</span> ]
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* W8 + W9a — full-bleed photo with a pull line, then DUBAI – LEHBAB rising into fog */}
        <section data-scrub="sticky" className="relative h-[200svh]" aria-label="The evening">
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            <div className="absolute inset-0"><Pic name="camel-caravan" sizes="100vw" alt="A camel caravan crossing a dune ridge in golden light" /></div>
            <div className="absolute inset-0 bg-[#1f2a44]/30" />
            <figure className="v5-pull absolute inset-x-5 top-[30%] text-center text-white lg:left-[56vw] lg:right-[6vw] lg:top-[34%]">
              <span aria-hidden="true" className={`${fSerif} block text-[30px] leading-none`}>“</span>
              <blockquote className={`${fSerif} mt-2 text-[28px] italic leading-[1.2] md:text-[38px]`}>First the gold, then the rose, then the stars come out, one by one.</blockquote>
              <span aria-hidden="true" className="mt-3 block">-</span>
              <figcaption className="mt-2 text-[13px] font-semibold uppercase tracking-[0.14em]">An evening at the camp</figcaption>
            </figure>
            <div className="v5-veil absolute inset-0 bg-white" />
            <p aria-hidden="true" className={`v5-word ${fMark} absolute inset-x-0 top-[16%] whitespace-nowrap text-center text-[clamp(50px,14.2vw,232px)] font-normal uppercase leading-[0.85] text-white/85`}>
              Dubai – Lehbab
            </p>
            <div className="v5-fog2 absolute inset-0 bg-gradient-to-t from-white from-[18%] via-white/85 to-transparent" />
          </div>
        </section>

        {/* W9b — four-corner band */}
        <section className="relative bg-white px-3 pb-16 md:px-[0.83vw] md:pb-24" aria-labelledby="v5-route">
          <div className="border-t border-dashed border-[#1f2a44]/45 pt-3">
            <div className={`${fMono} grid grid-cols-2 gap-y-6 text-[17px] uppercase leading-[1.05] text-[#1f2a44]/75 lg:grid-cols-[1fr_auto_1fr]`}>
              <div className="lg:row-span-2">
                <p>25°12′N 55°16′E</p><p>Dubai · your door</p>
                <p className="mt-6 hidden lg:block">Up to 6 per 4x4</p><p className="hidden lg:block">Private groups</p>
              </div>
              <div className="col-span-2 row-start-2 px-2 text-center normal-case lg:col-span-1 lg:row-span-2 lg:row-start-1 lg:pt-1">
                <h2 id="v5-route" className={`${fSerif} mx-auto max-w-[640px] text-[38px] font-normal uppercase leading-[0.98] text-[#1f2a44] md:text-[58px]`}>To the heart of the desert</h2>
                <p className="mx-auto mt-6 max-w-[470px] font-[family-name:var(--v5-sans)] text-[15px] leading-[1.45] text-[#5a6174]">
                  We pick you up from your hotel or home at 15:00 and drive out of the city into the high red dunes of Lehbab. Dune bashing, a camel at dusk, dinner under the stars, and back at your door by 21:30.
                </p>
              </div>
              <div className="text-right lg:col-start-3 lg:row-span-2 lg:row-start-1">
                <p>Lehbab</p><p>Red dunes</p>
                <p className="mt-6 hidden lg:block">Drop-off 21:30</p><p className="hidden lg:block">Back in Dubai</p>
              </div>
              <div className="row-start-3 lg:hidden"><p>Up to 6</p><p>per 4x4</p></div>
              <div className="row-start-3 text-right lg:hidden"><p>Drop-off</p><p>21:30</p></div>
            </div>
          </div>
        </section>

        {/* W9c — navy map with curved route + stats card */}
        <section data-scrub="pass" className="relative overflow-hidden bg-[#1f2a44] text-white lg:h-[110svh] lg:min-h-[760px]" aria-label="The route">
          <div className="relative h-[86svh] min-h-[560px] lg:absolute lg:inset-0 lg:h-auto">
            <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <g fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1">
                {Array.from({ length: 14 }).map((_, i) => (
                  <path key={i} d={`M-40 ${120 + i * 58} C 240 ${70 + i * 58}, 420 ${190 + i * 58}, 720 ${130 + i * 58} S 1180 ${60 + i * 58}, 1500 ${150 + i * 58}`} />
                ))}
              </g>
              <path d="M640 0 C 700 60, 780 80, 900 70 L 1440 40 L 1440 0 Z" fill="#ffffff" fillOpacity="0.05" />
              <path pathLength={1000} className="v5-route" d="M712 168 C 560 330, 600 560, 836 712" fill="none" stroke="#ffb47a" strokeWidth="1.6" />
              <circle cx="712" cy="168" r="5" fill="#ffffff" />
              <circle className="v5-pulse" cx="712" cy="168" r="10" fill="none" stroke="#ffffff" strokeOpacity="0.7" />
              <circle className="v5-pulse d2" cx="712" cy="168" r="10" fill="none" stroke="#ffffff" strokeOpacity="0.7" />
              <circle cx="836" cy="712" r="6" fill="#ff7e15" />
              <circle cx="836" cy="712" r="14" fill="none" stroke="#ff7e15" strokeOpacity="0.5" />
              <text x="760" y="150" fill="#ffffff" fillOpacity="0.75" fontSize="22" fontStyle="italic" style={{ fontFamily: "var(--v5-serif)" }}>Starting point</text>
              <text x="760" y="180" fill="#ffffff" fontSize="18" letterSpacing="0.5" style={{ fontFamily: "var(--v5-mark)" }}>DUBAI, YOUR DOOR</text>
              <text x="836" y="760" textAnchor="middle" fill="#ffffff" fillOpacity="0.75" fontSize="22" fontStyle="italic" style={{ fontFamily: "var(--v5-serif)" }}>The camp</text>
              <text x="836" y="790" textAnchor="middle" fill="#ffffff" fontSize="18" letterSpacing="0.5" style={{ fontFamily: "var(--v5-mark)" }}>LEHBAB, RED DUNES</text>
              <text x="1090" y="470" fill="#ffffff" fillOpacity="0.32" fontSize="16" letterSpacing="1" style={{ fontFamily: "var(--v5-mark)" }}>ARABIAN DESERT</text>
            </svg>
          </div>
          <div className="relative px-5 pb-12 md:px-10 lg:absolute lg:bottom-10 lg:left-[2.8vw] lg:w-[30.8vw] lg:min-w-[400px] lg:p-0">
            <dl className="border border-white/10 bg-[#141c31]/90 p-5 backdrop-blur-sm md:p-6">
              {[
                ["Pick-up from your door", "15:00 HRS"],
                ["Back in Dubai", "21:30 HRS"],
                ["Per private 4x4", "UP TO 6"],
              ].map(([k, v], i) => (
                <div key={k} className={i ? "mt-5 border-t border-dotted border-white/35 pt-5" : ""}>
                  <dt className={`${fSerif} text-[19px] italic text-white/80`}>{k}</dt>
                  <dd className="mt-1 text-[38px] font-medium leading-none tracking-[-0.01em] md:text-[44px]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Link href="/experiences/premium-evening-desert-safari" className="group absolute bottom-10 right-[17.22vw] hidden w-[22vw] min-w-[280px] border border-white/10 bg-[#141c31] p-2.5 lg:block">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Pic name="premium-evening-3" sizes="24vw" alt="" className="transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 grid place-items-center bg-[#1f2a44]/30 text-[15px] font-medium">
                <span>The Premium Evening&nbsp;&nbsp;▶</span>
              </div>
            </div>
          </Link>
        </section>

        {/* W10 — start planning */}
        <section className="relative h-[84svh] min-h-[540px] overflow-hidden" aria-labelledby="v5-plan">
          <div className="absolute inset-0"><Pic name="camel-grazing" sizes="100vw" alt="A camel grazing on pale dunes" /></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1f2a44]/50 via-[#1f2a44]/15 to-transparent" />
          <div className="relative px-5 pt-[14svh] text-center text-white">
            <h2 id="v5-plan" className={`${fSerif} mx-auto max-w-[620px] text-[40px] font-normal uppercase leading-[0.98] md:text-[60px]`}>Start planning your evening</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/enquire" className="inline-flex h-[50px] items-center border border-white/50 bg-white/10 px-10 text-[15px] font-medium backdrop-blur-sm transition-colors hover:bg-white hover:text-[#1f2a44]">Get in touch</Link>
              <a href={wa} className="inline-flex h-[50px] items-center border border-white/50 bg-white/10 px-10 text-[15px] font-medium backdrop-blur-sm transition-colors hover:bg-white hover:text-[#1f2a44]">WhatsApp</a>
            </div>
          </div>
        </section>
      </main>

      {/* W11 — off-white footer: columns + button tiles + quote line */}
      <footer className="relative bg-[#f3f1ec] text-[#1f2a44]">
        <div className="grid gap-10 px-5 pb-16 pt-12 md:grid-cols-2 md:px-10 lg:grid-cols-[13.05fr_16.39fr_16.39fr_16.39fr_33.6fr] lg:gap-0 lg:pl-[4.17vw] lg:pr-[0.83vw] lg:pt-5">
          <div className="lg:pt-5"><Logo className="w-fit text-[#1f2a44] lg:mx-auto" /></div>
          <div className="lg:px-3 lg:pt-5">
            <h3 className={`${fSerif} text-[22px] italic`}>Guest enquiries</h3>
            <ul className="mt-3 space-y-1.5 text-[15px] text-[#5a6174]">
              <li><a className="hover:text-[#1f2a44]" href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a className="hover:text-[#1f2a44]" href={site.phoneHref}>{site.phone}</a></li>
              <li><a className="hover:text-[#1f2a44]" href={wa}>WhatsApp concierge</a></li>
            </ul>
            <h3 className={`${fSerif} mt-6 text-[22px] italic`}>Hours</h3>
            <p className="mt-3 text-[15px] text-[#5a6174]">{site.hours}</p>
            <p className="mt-1.5 text-[15px] text-[#5a6174]">{site.response}</p>
          </div>
          <div className="lg:px-3 lg:pt-5">
            <h3 className={`${fSerif} text-[22px] italic`}>In the desert</h3>
            <ul className="mt-3 space-y-1.5 text-[15px] text-[#5a6174]">
              {desert.map((t) => <li key={t.slug}><Link className="hover:text-[#1f2a44]" href={`/experiences/${t.slug}`}>{t.title}</Link></li>)}
              <li><Link className="hover:text-[#1f2a44]" href="/experiences#desert">View all</Link></li>
            </ul>
          </div>
          <div className="lg:px-3 lg:pt-5">
            <h3 className={`${fSerif} text-[22px] italic`}>The Emirates</h3>
            <ul className="mt-3 space-y-1.5 text-[15px] text-[#5a6174]">
              {emirates.map((t) => <li key={t.slug}><Link className="hover:text-[#1f2a44]" href={`/experiences/${t.slug}`}>{t.title}</Link></li>)}
            </ul>
            <h3 className={`${fSerif} mt-6 text-[22px] italic`}>About</h3>
            <ul className="mt-3 space-y-1.5 text-[15px] text-[#5a6174]">
              <li><Link className="hover:text-[#1f2a44]" href="/about">Our story</Link></li>
              <li><Link className="hover:text-[#1f2a44]" href="/journal">Journal</Link></li>
              {posts.slice(0, 1).map((p) => <li key={p.slug}><Link className="hover:text-[#1f2a44]" href={`/journal/${p.slug}`}>{p.title}</Link></li>)}
            </ul>
          </div>
          <div className="grid grid-cols-2 content-start gap-2.5 md:col-span-2 lg:col-span-1 lg:pl-2 lg:pt-5">
            <Link href="/experiences" className="group relative col-span-2 h-[110px] overflow-hidden">
              <Pic name="night-sky" sizes="(min-width:1024px) 32vw, 100vw" alt="" className="transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 grid place-items-center text-[15px] font-medium text-white">All experiences&nbsp;&nbsp;▶</span>
            </Link>
            <Link href="/experiences" className="grid h-[110px] place-items-center bg-[#fbfaf7] text-[15px] font-medium transition-colors hover:bg-white">Dates &amp; rates</Link>
            <Link href="/enquire" className="grid h-[110px] place-items-center bg-[#ff7e15] text-[15px] font-medium text-[#1f2a44] transition-colors hover:bg-[#ff9440]">Enquire now&nbsp;+</Link>
            <a href={wa} className="grid h-[110px] place-items-center bg-[#fbfaf7] text-[15px] font-medium transition-colors hover:bg-white">WhatsApp</a>
            <a href={site.phoneHref} className="grid h-[110px] place-items-center bg-[#fbfaf7] text-[15px] font-medium transition-colors hover:bg-white">Call {site.phone}</a>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 border-t border-[#1f2a44]/10 px-5 py-6 text-center md:px-10 lg:mx-[0.83vw] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8 lg:text-left">
          <Star className="hidden h-3.5 w-3.5 lg:block" />
          <div className="text-center">
            <p className={`${fSerif} text-[22px] italic leading-tight`}>“Every desert has its stars.”</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a6174]">— The Desert Stars team</p>
          </div>
          <div className="text-[13px] lg:text-right">
            <p className="flex flex-wrap justify-center gap-x-3 gap-y-1 lg:justify-end">
              <Link href="/booking-terms" className="hover:underline">Booking terms</Link>
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <Link href="/cookies" className="hover:underline">Cookies</Link>
              <Link href="/credits" className="hover:underline">Credits</Link>
            </p>
            <p className="mt-1 text-[#5a6174]">© {new Date().getFullYear()} Desert Stars. {site.cancellation}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
