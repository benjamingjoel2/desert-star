import Link from "next/link";
import { Host_Grotesk, VT323, Cormorant_Garamond } from "next/font/google";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import TripPanels from "@/components/TripPanels";
import { tours, getTour, price, cover, type Tour } from "@/lib/tours";
import { site, waLink } from "@/data/site";

const grotesk = Host_Grotesk({ subsets: ["latin"], weight: ["300", "400"], variable: "--v2-g", display: "swap" });
const mono = VT323({ subsets: ["latin"], weight: "400", variable: "--v2-m", display: "swap" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["italic"], variable: "--v2-s", display: "swap" });

export const metadata = { title: "Variation 2 · Balanced · night" };

/* ---------- tokens ---------- */
const INK = "#020715";
const SAND = "#efe6d6";
const PAD = "px-5 md:px-10";
const H = "v2-h";
const MONO = "v2-mono";
const ACCENT = "font-[family-name:var(--v2-s)] italic";
const STATEMENT = "text-[26px] leading-[1.1] tracking-[-0.02em] font-light sm:text-[34px] lg:text-[46px] lg:leading-[1.08]";

const pick = (slugs: string[]) => slugs.map((s) => getTour(s)).filter((t): t is Tour => Boolean(t));

const trips = pick([
  "premium-evening-desert-safari",
  "grand-mosque-and-desert-safari",
  "dubai-abu-dhabi-desert-safari-3-in-1",
  "dubai-marina-dhow-cruise",
  "burj-khalifa-at-the-top",
]).map((t, i) => ({
  href: `/experiences/${t.slug}`,
  title: t.title,
  price: price(t),
  meta: t.timing,
  text: t.short,
  img: ["premium-evening-1", "mosque-1", "dubai-night", cover(t), "burj-palms"][i],
}));

const column = pick(["dubai-city-tour", "sheikh-zayed-grand-mosque-tour", "sharjah-city-tour", "al-ain-city-tour", "abu-dhabi-city-tour"]);
const columnImg = ["dubai-skyline", "mosque-bluehour", "sharjah-blue-souk", "alain-1", "abudhabi-city-1"];

const camps = pick([
  "premium-evening-desert-safari",
  "standard-sunset-desert-safari",
  "self-drive-evening-desert-safari",
  "premium-morning-desert-safari",
  "evening-desert-safari",
]);
const campImg = ["premium-evening-3", "standard-sunset-4", "self-drive-1", "premium-morning-4", "evening-1"];

const included = [
  { name: "Door-to-door pick-up", note: "Private 4x4 from your hotel or home", img: "dubai-skyline" },
  { name: "Red dune drive", note: "30 to 40 minutes in the high dunes", img: "dunes-cruiser" },
  { name: "Camel ride", note: "A short ride at dusk, photo stops", img: "camel-ride" },
  { name: "Falcon encounter", note: "Photo moment with a trained falcon", img: "combo-mosque-2" },
  { name: "BBQ dinner", note: "Live buffet, vegetarian options", img: "premium-evening-4" },
  { name: "Tanoura & fire", note: "Live shows around the camp", img: "combo-mosque-3" },
];

const contacts = [
  { label: "WhatsApp", href: waLink("Hello Desert Stars, I'd like to plan an evening in the desert.") },
  { label: "Call", href: site.phoneHref },
  { label: "Email", href: `mailto:${site.email}` },
  { label: "Enquire", href: "/enquire" },
];

const menu = [
  { href: "/experiences", label: "Experiences" },
  { href: "/experiences#desert", label: "Desert safaris" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/enquire", label: "Enquire" },
];

/* MC staircase: two rows of rectangular blocks cut into the photo above. */
function Steps({ color, chips }: { color: string; chips?: [string, string, string, string] }) {
  const chip = (i: number) => (chips ? <span className={`${MONO} hidden text-[15px] lg:inline lg:text-[17px]`}>{chips[i]}</span> : null);
  const tone = color === INK ? "text-[#efe6d6]" : "text-[#020715]";
  return (
    <div className={`absolute inset-x-0 bottom-0 z-10 ${tone}`}>
      <div className="flex h-12 md:h-16">
        <div className="flex w-[30%] items-center justify-end pr-5" style={{ background: color }}>{chip(0)}</div>
        <div className="flex-1" />
        <div className="flex w-[30%] items-center pl-5" style={{ background: color }}>{chip(1)}</div>
      </div>
      <div className="-mt-px flex h-12 md:h-16">
        <div className="flex w-[40%] items-center justify-end pr-5" style={{ background: color }}>{chip(2)}</div>
        <div className="flex-1" />
        <div className="flex w-[40%] items-center pl-5" style={{ background: color }}>{chip(3)}</div>
      </div>
    </div>
  );
}

const css = `
.v2 { --ink: ${INK}; --sand: ${SAND}; font-family: var(--v2-g), "Helvetica Neue", Arial, sans-serif; }
.v2 ::selection { background: var(--sand); color: var(--ink); }
.v2-h { font-family: var(--v2-g); font-weight: 400; text-transform: uppercase; letter-spacing: -0.05em; line-height: 0.8; }
.v2-mono { font-family: var(--v2-m), ui-monospace, monospace; font-size: 17px; line-height: 1; letter-spacing: 0.02em; text-transform: uppercase; }
.v2-box { display: inline-flex; align-items: center; padding: 3px 6px 2px; }
.v2 a:focus-visible, .v2 summary:focus-visible, .v2 input:focus-visible, .v2 button:focus-visible { outline: 1px dashed currentColor; outline-offset: 3px; }

/* M2 hero: the centre card grows to full screen */
.v2-hero { --cw: 46vw; --ch: 38svh; }
@media (min-width: 768px) { .v2-hero { --cw: 240px; --ch: 340px; } }
.v2-card {
  position: absolute; left: 50%; top: 50%; overflow: hidden;
  width: calc(var(--cw) + (100% - var(--cw)) * min(1, var(--p, 0) * 1.25));
  height: calc(var(--ch) + (100% - var(--ch)) * min(1, var(--p, 0) * 1.25));
  border-radius: calc((1 - min(1, var(--p, 0) * 1.25)) * 6px);
  transform: translate(-50%, -50%);
}
.v2-fade { opacity: calc(1 - var(--p, 0) * 3.2); }
.v2-late { opacity: clamp(0, calc(var(--p, 0) * 4 - 3), 1); }

/* W7 sliding camp cards */
.v2-track { --w: 78vw; --g: 4vw; --pad: 20px; width: calc(5 * var(--w) + 4 * var(--g) + 2 * var(--pad)); padding: 0 var(--pad); gap: var(--g);
  transform: translate3d(calc(var(--p, 1) * (100vw - 100%)), 0, 0); }
@media (min-width: 768px) { .v2-track { --w: 46vw; --g: 2.5vw; --pad: 40px; } }

/* W5 accordion restyled to the night system */
.v2-trips a { border-radius: 4px; font-family: var(--v2-g); }
.v2-trips h3 { font-family: var(--v2-g); font-style: normal; font-weight: 400; text-transform: uppercase; letter-spacing: -0.04em; line-height: 0.88; }
.v2-trips p.flex { font-family: var(--v2-m); font-size: 17px; font-weight: 400; letter-spacing: 0.02em; text-transform: uppercase; }

/* M10 tiles: photo surfaces on hover */
.v2-tile .v2-tile-img { opacity: 0; transition: opacity .7s cubic-bezier(.16,1,.3,1); }
.v2-tile:hover .v2-tile-img { opacity: 1; }
.v2-tile:hover .v2-tile-txt { color: var(--sand); }
.v2-menu[open] summary { background: var(--ink); color: var(--sand); }
.v2-menu summary::-webkit-details-marker { display: none; }
`;

export default function Page() {
  const count = String(tours.length);
  return (
    <div className={`${grotesk.variable} ${mono.variable} ${serif.variable} v2 overflow-x-clip bg-[#020715] text-[#efe6d6]`}>
      <style>{css}</style>

      {/* ───────── M1 header ───────── */}
      <Link href="/concepts/2" aria-label="Desert Stars, home"
        className={`fixed left-5 top-4 z-50 text-[24px] leading-none text-[#efe6d6] mix-blend-difference md:left-10 md:top-6 md:text-[28px] ${ACCENT}`}>
        Desert Stars
      </Link>
      <div className="fixed right-5 top-4 z-50 flex items-start gap-2 md:right-10 md:top-6">
        <a href="#evening" className={`${MONO} v2-box border border-[#020715]/30 bg-[#efe6d6] text-[#020715] transition-colors hover:bg-[#020715] hover:text-[#efe6d6]`}>{"{NIGHT MODE}"}</a>
        <details className="v2-menu relative">
          <summary className={`${MONO} v2-box cursor-pointer list-none border border-[#020715]/30 bg-[#efe6d6] text-[#020715]`}>Menu</summary>
          <nav aria-label="Main" className="absolute right-0 top-[calc(100%+8px)] flex min-w-[230px] flex-col gap-3 border border-[#efe6d6]/25 bg-[#020715] p-5 text-[#efe6d6]">
            {menu.map((m) => (
              <Link key={m.href} href={m.href} className={`${MONO} text-[20px] transition-opacity hover:opacity-60`}>{m.label}</Link>
            ))}
            <a href={site.phoneHref} className={`${MONO} mt-2 border-t border-[#efe6d6]/20 pt-3 text-[17px] text-[#efe6d6]/75`}>{site.phone}</a>
          </nav>
        </details>
      </div>

      <main>
        {/* ───────── M2 hero ───────── */}
        <section data-scrub="sticky" className="v2-hero relative h-[230svh]" aria-label="Born in the dunes">
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            <div className="hero-zoom absolute inset-0">
              <Pic name="camel-caravan" priority sizes="100vw" alt="A camel caravan crossing the red dunes" />
            </div>
            <div className="absolute inset-0 bg-[#020715]/35" />
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#020715]/60 to-transparent" />

            <h1 className={`${H} v2-fade absolute inset-x-0 top-[76px] z-10 text-center text-[clamp(48px,11vw,158px)] md:top-[84px]`}>
              <span className="fade-in block">Born in</span>
              <span className="fade-in block" style={{ ["--d" as string]: "120ms" }}>the dunes</span>
            </h1>

            <div className="v2-card z-20">
              <Pic name="camp-lanterns" sizes="100vw" alt="Lanterns glowing at the desert camp after dark" />
              <div className="absolute inset-0 bg-[#020715]/10" />
              <div className={`v2-late absolute inset-x-5 bottom-8 flex items-end justify-between gap-6 md:inset-x-10`}>
                <p className={`${ACCENT} max-w-[22ch] text-[26px] leading-[1.1] md:text-[34px]`}>The camp, when the lanterns come on</p>
                <p className={`${MONO} hidden md:block`}>Lehbab desert</p>
              </div>
            </div>

            <nav aria-label="Sections" className={`v2-fade absolute inset-x-0 top-1/2 z-30 flex -translate-y-1/2 justify-between ${PAD}`}>
              <a href="#experiences" className={`${MONO} text-[15px] transition-opacity hover:opacity-60 md:text-[17px]`}>Experiences</a>
              <a href="#evening" className={`${MONO} text-[15px] transition-opacity hover:opacity-60 md:text-[17px]`}>Camps</a>
              <span className="hidden w-[260px] md:block" aria-hidden="true" />
              <a href="#included" className={`${MONO} text-[15px] transition-opacity hover:opacity-60 md:text-[17px]`}>Included</a>
              <a href="#contact" className={`${MONO} text-[15px] transition-opacity hover:opacity-60 md:text-[17px]`}>Contact</a>
            </nav>

            <div className={`v2-fade absolute inset-x-0 bottom-6 z-30 flex items-end justify-between ${PAD}`}>
              <p className={`${ACCENT} max-w-[24ch] text-[19px] leading-[1.15] md:text-[22px]`}>Private evenings in the red sand, from your door in Dubai</p>
              <p className={`${MONO} text-[15px]`}>Scroll ↓</p>
            </div>
          </div>
        </section>

        {/* ───────── M3 bio + M4 stepped transition ───────── */}
        <section className="relative" aria-label="About Desert Stars">
          <div className="absolute inset-0">
            <Pic name="camp-lanterns" sizes="100vw" alt="" />
          </div>
          <div className="absolute inset-0 bg-[#020715]/70" />
          <div className={`relative ${PAD} pb-[calc(96px+18svh)] pt-[18svh] md:pb-[calc(128px+26svh)]`}>
            <p className={`reveal max-w-[1000px] md:ml-[18%] ${STATEMENT}`}>
              <span className="mr-3 inline-block h-[1.9em] w-[1.75em] overflow-hidden rounded-[4px] align-bottom">
                <Pic name="camel-ride" sizes="120px" alt="A guest riding a camel at dusk" />
              </span>
              A Dubai tour house for private desert evenings, pairing red-dune drives with slow dinners under the stars and unhurried journeys across the Emirates.
            </p>
          </div>
          <Steps color={INK} chips={["11,000+ guests hosted", "Free cancellation 24h", "Pick-up from your door", "Reply within 30 min"]} />
        </section>

        {/* mobile chips (the steps are too narrow to hold them) */}
        <ul className={`${PAD} flex flex-wrap gap-2 pt-6 lg:hidden`}>
          {["11,000+ guests hosted", "Pick-up from your door", "Free cancellation 24h", "Reply within 30 min"].map((c) => (
            <li key={c} className={`${MONO} v2-box border border-[#efe6d6]/40 text-[15px]`}>{c}</li>
          ))}
        </ul>

        {/* ───────── M5 split headline around a photo ───────── */}
        <section className={`${PAD} pb-20 pt-24 md:pb-28 md:pt-40`}>
          <h2 aria-label="Where the dunes meet the stars" className={`${H} relative mx-auto max-w-[1360px] text-[clamp(46px,10vw,150px)]`}>
            <span className="relative z-10 block md:pl-[12%]"><Split>Where</Split></span>
            <span className="relative z-10 block md:pl-[12%]"><Split delay={120}>the dunes</Split></span>
            <span className="absolute right-0 top-[1.6em] z-10 block text-right md:right-[12%]">
              <span className="block"><Split delay={240}>Meet the</Split></span>
              <span className="block"><Split delay={360}>stars</Split></span>
            </span>
            <span className="reveal-img relative mx-auto -mt-[0.1em] block aspect-[4/5] w-[68%] overflow-hidden rounded-[4px] md:mt-[0.15em] md:w-[31%]">
              <Pic name="night-sky" sizes="(min-width:768px) 31vw, 68vw" alt="The Milky Way above the dunes" />
            </span>
          </h2>
          <div className="mx-auto mt-6 flex max-w-[1360px] justify-between gap-6 md:w-[31%]">
            <p className={`${ACCENT} text-[19px] leading-[1.15]`}>After the last light, the sky does the rest</p>
            <p className={`${MONO} shrink-0 text-[15px] text-[#efe6d6]/70`}>21:00</p>
          </div>
        </section>

        {/* ───────── M6 paragraph ───────── */}
        <section className={`${PAD} pb-24 md:pb-36`}>
          <p className={`reveal max-w-[1100px] indent-[3.2em] md:indent-[2.5em] ${STATEMENT}`}>
            Patient, unhurried and at home in open sand, our guides drive the dunes the old way, then let the desert go quiet so you can hear it.
          </p>
          <div className="reveal mt-10 grid max-w-[1030px] gap-5 text-[14px] leading-[1.6] text-[#efe6d6]/80 md:ml-[26%] md:grid-cols-2 md:gap-8" style={{ ["--d" as string]: "150ms" }}>
            <p>
              Every evening begins with a knock at your door. A private 4x4 collects you from your hotel or home anywhere in Dubai at around 15:00, and the city thins out behind tinted glass until the road turns to sand. Groups of up to six share a vehicle, so the pace is always yours.
            </p>
            <p>
              Out in the red dunes there is a drive, a camel at dusk, a falcon on the glove, then a lantern-lit camp with a live BBQ and Tanoura and fire under the stars. You are back at your door around 21:30. {site.cancellation}
            </p>
          </div>
        </section>

        {/* ───────── W5 our experiences (accordion) ───────── */}
        <section className={`${PAD} pb-24 md:pb-36`} aria-labelledby="v2-trips-title">
          <div className="mb-10 text-center md:mb-14">
            <p className={`${MONO} reveal text-[#efe6d6]/75`}>{`{${count} experiences}`}</p>
            <h2 id="v2-trips-title" className={`${H} mt-4 text-[clamp(44px,8vw,120px)]`}><Split>Our experiences</Split></h2>
            <p className={`${ACCENT} reveal mt-4 text-[20px] md:text-[24px]`}>From the red dunes to the old souks</p>
          </div>
          <div className="v2-trips">
            <TripPanels trips={trips} />
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/experiences" className={`${MONO} v2-box border border-[#efe6d6]/50 px-3 py-2 transition-colors hover:bg-[#efe6d6] hover:text-[#020715]`}>[ All experiences ]</Link>
          </div>
        </section>

        {/* ───────── M7 sticky centre column ───────── */}
        <section id="experiences" className={`${PAD} relative pb-28 md:pb-40`} aria-label="City experiences">
          <div className="flex">
            <div className="min-w-0 flex-1 pr-2">
              <div className="sticky top-1/2">
                <p className="text-[14px] leading-none sm:text-[20px] md:text-[28px]">
                  Experiences<sup className={`${MONO} ml-1 align-super text-[11px] md:text-[13px]`}>™ ({String(column.length).padStart(2, "0")})</sup>
                </p>
              </div>
            </div>
            <div className="flex w-[52%] shrink-0 flex-col md:w-[31%]">
              {column.map((t, i) => (
                <Link key={t.slug} href={`/experiences/${t.slug}`} className="group relative block">
                  <div className="reveal-img aspect-[3/4] overflow-hidden md:aspect-[452/540]">
                    <Pic name={columnImg[i]} sizes="(min-width:768px) 31vw, 52vw" alt={t.title} className="transition-transform duration-[1.4s] group-hover:scale-[1.04]" />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#020715]/80 to-transparent p-3 pt-16 md:p-5 md:pt-24">
                    <p className="text-[15px] leading-[1.15] md:text-[19px]">{t.title}</p>
                    <p className={`${MONO} mt-1 text-[14px] text-[#efe6d6]/80 md:text-[16px]`}>{price(t)} · {t.timing}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex min-w-0 flex-1 justify-end pl-2">
              <div className="sticky top-1/2 h-fit self-start">
                <Link href="/experiences" className={`${MONO} text-[14px] transition-opacity hover:opacity-60 md:text-[17px]`}>Discover</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── W7 camp cards over a full-bleed texture ───────── */}
        <section id="evening" data-scrub="sticky" className="relative h-[320svh]" aria-labelledby="v2-camps-title">
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            <div className="absolute inset-0">
              <Pic name="dunes-cruiser" sizes="100vw" alt="" />
            </div>
            <div className="absolute inset-0 bg-[#020715]/50" />
            <div className={`relative flex items-end justify-between gap-6 pt-[86px] md:pt-[104px] ${PAD}`}>
              <h2 id="v2-camps-title" className={`${H} text-[clamp(44px,7vw,108px)]`}>Our camps</h2>
              <p className={`${ACCENT} max-w-[18ch] text-right text-[18px] leading-[1.15] md:text-[24px]`}>Five evenings in the red sand, one quiet camp</p>
            </div>
            <div className="v2-track absolute bottom-[5svh] left-0 flex h-[64svh] md:bottom-[6svh] md:h-[62svh]">
              {camps.map((t, i) => (
                <article key={t.slug} className="h-full shrink-0 border border-[#efe6d6]/20 bg-[#020715]/25 p-3 backdrop-blur-[6px] md:p-5" style={{ width: "var(--w)" }}>
                  <Link href={`/experiences/${t.slug}`} className="group relative flex h-full flex-col items-center justify-between overflow-hidden p-5 text-center md:p-8">
                    <div className="absolute inset-0">
                      <Pic name={campImg[i]} sizes="(min-width:768px) 46vw, 78vw" alt={t.title} className="transition-transform duration-[1.4s] group-hover:scale-[1.04]" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020715]/75 via-[#020715]/15 to-[#020715]/60" />
                    <div className="relative">
                      <h3 className={`${H} text-[30px] leading-[0.9] md:text-[clamp(34px,3.4vw,54px)]`}>{t.title.replace(/ & BBQ Dinner/, "")}</h3>
                      <p className="mx-auto mt-4 max-w-[40ch] text-[14px] leading-[1.45] text-[#efe6d6]/90 md:text-[15px]">{t.short}</p>
                    </div>
                    <div className="relative">
                      <p className={`${MONO} text-[15px] text-[#efe6d6]/85`}>{price(t)} · {t.timing}</p>
                      <p className={`${MONO} mt-3 transition-opacity group-hover:opacity-60`}>[ Discover ]</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── M8 no place like the desert + M9 steps into sand ───────── */}
        <section className="relative h-[100svh] min-h-[620px] overflow-hidden" aria-label="No place like the desert">
          <div className="absolute inset-0" data-parallax="0.08">
            <Pic name="desert-sunset" sizes="100vw" alt="The sun setting over the dunes" />
          </div>
          <div className="absolute inset-0 bg-[#020715]/45" />
          <h2 aria-label="No place like the desert" className={`${H} relative h-full text-[clamp(56px,11vw,158px)]`}>
            <span className="absolute left-4 top-[84px] md:left-6 md:top-[96px]">
              <span className="block"><Split>No</Split></span>
              <span className="block"><Split delay={100}>place</Split></span>
            </span>
            <span className="absolute right-4 top-[calc(84px+1.6em)] text-right md:right-6 md:top-[calc(96px+0.8em)]">
              <span className="block"><Split delay={220}>Like the</Split></span>
              <span className="block"><Split delay={320}>desert</Split></span>
            </span>
          </h2>
          <div className={`absolute inset-x-4 top-[62%] flex justify-between gap-4 md:inset-x-6 md:top-[60%]`}>
            <p className={`${MONO} text-[15px] md:text-[17px]`}>From Dubai to the dunes</p>
            <p className={`${MONO} text-[15px] md:text-[17px]`}>25°12′N, 55°16′E</p>
          </div>
          <Steps color={SAND} />
        </section>

        {/* ───────── M10 what's included (bordered tile grid) ───────── */}
        <div className="bg-[#efe6d6] text-[#020715]">
          <section id="included" className={`${PAD} pb-24 pt-8 md:pb-36 md:pt-14`} aria-labelledby="v2-inc-title">
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
              {included.slice(0, 1).map((it, i) => <Tile key={it.name} it={it} i={i} />)}
              <li className="order-first col-span-2 flex flex-col items-center justify-center py-10 text-center md:order-none md:col-span-1 md:aspect-square md:py-0">
                <h2 id="v2-inc-title" className="text-[30px] leading-none tracking-[-0.03em] md:text-[34px]">What&rsquo;s included</h2>
                <p className={`${ACCENT} mt-3 text-[19px]`}>on every evening safari</p>
              </li>
              {included.slice(1).map((it, i) => <Tile key={it.name} it={it} i={i + 1} />)}
              <li className="flex aspect-square flex-col justify-between rounded-[4px] border border-[#020715]/25 p-4 md:p-6">
                <p className={`${MONO} text-[15px] text-[#020715]/70`}>The timings</p>
                <dl className={`${MONO} space-y-2 text-[16px] md:text-[20px]`}>
                  <div className="flex justify-between gap-2"><dt>Pick-up</dt><dd>15:00</dd></div>
                  <div className="flex justify-between gap-2"><dt>Drop-off</dt><dd>21:30</dd></div>
                  <div className="flex justify-between gap-2"><dt>Per 4x4</dt><dd>Up to 6</dd></div>
                </dl>
              </li>
              <li>
                <Link href="/enquire" className="group flex aspect-square flex-col justify-between rounded-[4px] bg-[#020715] p-4 text-[#efe6d6] transition-colors hover:bg-[#1a2034] md:p-6">
                  <p className={`${MONO} text-[15px] text-[#efe6d6]/70`}>{site.response}</p>
                  <p className="text-[22px] leading-[1.05] tracking-[-0.03em] md:text-[34px]">Plan your evening <span className="inline-block transition-transform group-hover:translate-x-1">→</span></p>
                </Link>
              </li>
            </ul>
          </section>

          {/* ───────── M11 contact ───────── */}
          <section id="contact" className={`${PAD} pb-20 md:pb-28`} aria-labelledby="v2-contact-title">
            <h2 id="v2-contact-title" className="sr-only">Contact</h2>
            <p className={`reveal max-w-[1300px] indent-[3.2em] md:indent-[2.5em] ${STATEMENT}`}>
              Reach out to plan an evening in the dunes. Tell us the date and how many of you are coming, and a real person will reply within 30 minutes, day and night.
            </p>
            <ul className="mt-14 md:mt-24 md:pl-[34%]">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className={`${H} block py-[0.02em] text-[clamp(58px,16vw,158px)] text-[#7a7468] transition-colors duration-500 hover:text-[#020715]`}
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* ───────── M12 footer ───────── */}
          <footer className={`${PAD} pb-10`}>
            <div className="grid gap-10 md:grid-cols-3 md:gap-5">
              <ul className={`${MONO} space-y-1 text-[18px]`}>
                <li><Link href="/" className="hover:opacity-60">Home</Link></li>
                <li><Link href="/experiences" className="hover:opacity-60">Experiences</Link></li>
                <li><Link href="/journal" className="hover:opacity-60">Journal</Link></li>
              </ul>
              <ul className={`${MONO} space-y-1 text-[18px]`}>
                <li><Link href="/about" className="hover:opacity-60">About</Link></li>
                <li><Link href="/enquire" className="hover:opacity-60">Enquire</Link></li>
                <li><a href={site.phoneHref} className="hover:opacity-60">{site.phone}</a></li>
              </ul>
              <div>
                <p className={`${MONO} max-w-[36ch] text-[18px]`}>Join our list and hear about new evenings in the desert first.</p>
                <form action="/enquire" method="get" className="mt-5 flex h-16 items-center border border-[#020715]">
                  <label htmlFor="v2-email" className="sr-only">Email address</label>
                  <input id="v2-email" name="email" type="email" required placeholder="EMAIL ADDRESS"
                    className={`${MONO} h-full min-w-0 flex-1 bg-transparent px-5 text-[18px] placeholder:text-[#020715]/55 focus:outline-none`} />
                  <button type="submit" className={`${MONO} h-full px-5 text-[18px] transition-opacity hover:opacity-60`}>OK →</button>
                </form>
                <p className="mt-4 text-[12px] text-[#020715]/65">By subscribing, you agree to hear from us now and then. Unsubscribe at any time.</p>
              </div>
            </div>
            <div className="mt-16 flex flex-col gap-2 border-t border-[#020715]/20 pt-5 text-[12px] text-[#020715]/70 md:flex-row md:justify-between">
              <p>{site.address}</p>
              <p>{site.hours}</p>
              <p>© 2026 Desert Stars</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

function Tile({ it, i }: { it: (typeof included)[number]; i: number }) {
  return (
    <li className="v2-tile relative flex aspect-square flex-col justify-between overflow-hidden rounded-[4px] border border-[#020715]/25 p-4 md:p-6">
      <div className="v2-tile-img absolute inset-0" aria-hidden="true">
        <Pic name={it.img} sizes="(min-width:768px) 32vw, 50vw" alt="" />
        <div className="absolute inset-0 bg-[#020715]/55" />
      </div>
      <p className={`v2-tile-txt ${MONO} relative text-[15px] text-[#020715]/70 transition-colors duration-500`}>{String(i + 1).padStart(2, "0")}</p>
      <p className="v2-tile-txt relative text-center text-[20px] leading-[1.05] tracking-[-0.03em] transition-colors duration-500 md:text-[34px]">{it.name}</p>
      <p className={`v2-tile-txt ${MONO} relative text-[14px] text-[#020715]/70 transition-colors duration-500 md:text-[16px]`}>{it.note}</p>
    </li>
  );
}
