import Link from "next/link";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import TripPanels from "@/components/TripPanels";
import { FillWords } from "@/components/Bits";
import { getTour, price, type Tour } from "@/lib/tours";
import { site } from "@/data/site";
import { O, C, M, pad, wa, shellClass, sharedCss, Loop, Swash, GridLines, SideTab, Header, Footer } from "@/components/concepts/v1/Chrome";

export const metadata = { title: "Variation 1 · Balanced · light" };

/* Palette: white #fff, off-white #f3f1ec, navy ink #1f2a44, deep navy #18213a, sand-orange #b9601f (tab + Enquire only) */
const evening = getTour("premium-evening-desert-safari");
const fromPrice = evening ? price(evening) : "Price on request";

/* OUR EXPERIENCES: six tours, each with its own photo */
const tripPicks: [string, string][] = [
  ["premium-evening-desert-safari", "premium-evening-1"],
  ["evening-desert-safari", "standard-sunset-4"],
  ["premium-morning-desert-safari", "premium-morning-1"],
  ["self-drive-evening-desert-safari", "desert-sunset"],
  ["standard-sunset-desert-safari", "standard-sunset-3"],
  ["grand-mosque-and-desert-safari", "mosque-bluehour"],
];
const trips = tripPicks
  .map(([slug, img]) => ({ t: getTour(slug), img }))
  .filter((x): x is { t: Tour; img: string } => Boolean(x.t))
  .map(({ t, img }) => ({ href: `/experiences/${t.slug}`, title: t.title, price: price(t), meta: t.timing, text: t.short, img }));

const chips = ["11,000+ guests hosted", "Pick-up from your door", "Free cancellation 24h", "Reply within 30 min"];

const evenings: { time: string; cap: string; img: string; alt: string }[] = [
  { time: "15:00", cap: "Pick-up from your door", img: "dubai-skyline", alt: "Dubai skyline in the afternoon" },
  { time: "16:30", cap: "Into the red dunes", img: "premium-evening-2", alt: "A 4x4 in the red dunes" },
  { time: "18:00", cap: "Sunset with the camels", img: "camel-grazing", alt: "Camels resting on the sand at sunset" },
  { time: "19:30", cap: "Dinner by lantern light", img: "premium-evening-4", alt: "Grilled dinner served at the camp" },
  { time: "20:30", cap: "Tanoura under the stars", img: "combo-mosque-3", alt: "A Tanoura dancer spinning at night" },
];

export default function Page() {
  return (
    <div className={shellClass}>
      <style>{sharedCss + `
        .v1-fog { background: linear-gradient(to top, #fff 0%, rgba(255,255,255,.92) 22%, rgba(255,255,255,.55) 48%, rgba(255,255,255,0) 100%);
          opacity: calc(.8 + var(--p, 0) * .2); transform: translate3d(0, calc((1 - var(--p, 0)) * 14%), 0); }
        .v1-wash { opacity: calc(var(--p, 0) * var(--p, 0)); }
        .v1-route-word { opacity: calc(.85 - var(--p, 1) * .3); filter: blur(calc(var(--p, 1) * 2px)); transform: translate3d(0, calc(var(--p, 1) * -6vh), 0); }
        .v1-step-l { transform: translate3d(calc((1 - min(1, var(--p, 1) * 2.4)) * -40%), 0, 0); }
        .v1-step-r { transform: translate3d(calc((1 - min(1, var(--p, 1) * 2.4)) * 40%), 0, 0); }
        .v1-route { stroke-dasharray: 900; stroke-dashoffset: calc((1 - min(1, var(--p, 1) * 1.8)) * 900px); }
      `}</style>

      <GridLines />
      <SideTab />
      <Header />

      <main>
        {/* W2: hero — giant LEHBAB that blurs into fog on scroll */}
        <section data-scrub="sticky" className="relative h-[190svh]">
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            <div className="hero-zoom absolute inset-0">
              <Pic name="dunes-cruiser" priority sizes="100vw" alt="A 4x4 crossing the red dunes of Lehbab at golden hour" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1f2a44]/55 via-[#1f2a44]/15 to-transparent" />

            <p className={`hero-ui absolute inset-x-5 top-[44%] text-center ${C} text-[22px] italic leading-[1.15] text-white lg:left-10 lg:right-auto lg:top-[28%] lg:max-w-[260px] lg:text-left lg:text-[21px]`}>
              Private evenings in the red dunes beyond Dubai
            </p>
            <Link href="#evening" className="hero-ui absolute inset-x-5 bottom-[calc(14%_+_26vw)] flex items-center justify-between border-y border-white/40 px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-white/10 lg:inset-x-auto lg:bottom-auto lg:right-[100px] lg:top-[28%] lg:w-[190px] lg:px-8">
              Our evenings <span aria-hidden="true" className="text-[11px]">▶</span>
            </Link>

            <h1 className="absolute inset-x-0 bottom-[14%] text-center lg:bottom-[13%]">
              <span aria-hidden="true" className={`hero-mark block ${O} text-[27vw] font-medium uppercase leading-[0.78] tracking-[0.03em] text-white lg:text-[25vw]`}>Lehbab</span>
              <span className="sr-only">Desert Stars — private desert evenings in Lehbab, from Dubai</span>
            </h1>
            <div className="v1-fog pointer-events-none absolute inset-x-0 bottom-0 h-[58%]" />
            <div className="v1-wash pointer-events-none absolute inset-0 bg-white" />
          </div>
        </section>

        {/* W3: statement — swoosh label + words filling */}
        <section className={`relative bg-white ${pad} pb-[16vh] pt-[6vh] lg:pb-[22vh]`}>
          <div className="lg:ml-[33.333%] lg:w-[50%]">
            <p className="relative mb-8 inline-block">
              <Loop className="absolute -left-[70px] -top-[34px] w-[230px] text-[#1f2a44]/35" />
              <span className={`relative ${C} text-[22px] italic`}>The red desert</span>
            </p>
            <FillWords
              className={`${C} text-[29px] uppercase leading-[0.98] [text-indent:22%] sm:text-[40px] lg:text-[3.2vw] lg:[text-indent:33.333%]`}
              text="Beyond the last road out of Dubai the sand turns red and the city falls silent. An evening in Lehbab is slow, private and unhurried — ending with dinner by lantern light under a sky full of stars."
            />
          </div>
          <div className="reveal mt-16 max-w-[300px] lg:ml-[16.666%] lg:mt-24 lg:w-[16.666%] lg:max-w-none lg:pr-6">
            <h2 className={`${O} text-[20px] font-normal uppercase`}>The evening</h2>
            <p className="mt-4 text-[15px] font-medium leading-[1.45] text-[#1f2a44]/85">
              We collect you from your door at 15:00 and bring you home by 21:30, with up to six guests in each 4x4. {site.cancellation}
            </p>
          </div>
        </section>

        {/* M4: stepped navy band with mono chips */}
        <section aria-label="Desert Stars in numbers" className="relative">
          <div className="relative h-[70svh] overflow-hidden lg:h-[100svh]">
            <div data-parallax="0.12" className="absolute inset-0">
              <Pic name="camel-caravan" sizes="100vw" alt="A camel caravan crossing the dunes" />
            </div>
          </div>
          <div data-scrub="pass" className="relative -mt-[96px] text-white lg:-mt-[128px]">
            {[0, 1].map((row) => (
              <div key={row} className="flex h-12 justify-between lg:h-16">
                <div className={`v1-step-l flex items-center justify-end bg-[#1f2a44] pr-5 ${row === 0 ? "w-[16%] lg:w-[30%]" : "w-[30%] lg:w-[40%]"}`}>
                  <span className={`${M} hidden text-[19px] lg:inline`}>{chips[row * 2]}</span>
                </div>
                <div className={`v1-step-r flex items-center bg-[#1f2a44] pl-5 ${row === 0 ? "w-[16%] lg:w-[30%]" : "w-[30%] lg:w-[40%]"}`}>
                  <span className={`${M} hidden text-[19px] lg:inline`}>{chips[row * 2 + 1]}</span>
                </div>
              </div>
            ))}
            <div className={`bg-[#1f2a44] ${pad} pb-4 pt-8 lg:hidden`}>
              <ul className="flex flex-wrap gap-2">
                {chips.map((c) => (
                  <li key={c} className={`${M} border border-white/35 px-2 py-0.5 text-[18px]`}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* M5: split headline around a centre photo */}
        <section className="relative bg-[#1f2a44] pb-[14vh] pt-[10vh] text-[#eef1f8] lg:pt-[14vh]">
          <h2 className="sr-only">Raised by the dunes</h2>
          <div className={`relative ${pad} lg:h-[62vw] lg:px-0`}>
            <div aria-hidden="true" className={`relative z-10 ${O} text-[21vw] font-normal uppercase leading-[0.8] lg:absolute lg:left-[18%] lg:top-0 lg:text-[11vw]`}>
              <Split>Raised</Split><br /><Split delay={120}>By</Split>
            </div>
            <div className="reveal-img relative mx-auto -mt-[4vw] aspect-[4/5] w-[72%] overflow-hidden rounded-[4px] lg:absolute lg:left-1/2 lg:top-[7.5vw] lg:mt-0 lg:aspect-auto lg:h-[50vw] lg:w-[31.4vw] lg:-translate-x-1/2">
              <Pic name="camel-ride" sizes="(min-width:1024px) 32vw, 72vw" alt="Guests riding camels along a dune ridge" />
            </div>
            <div aria-hidden="true" className={`relative z-10 -mt-[12vw] text-right ${O} text-[21vw] font-normal uppercase leading-[0.8] lg:absolute lg:right-[18%] lg:top-[8.8vw] lg:mt-0 lg:text-[11vw]`}>
              <Split delay={200}>The</Split><br /><Split delay={300}>Dunes</Split>
            </div>
          </div>
          <div className={`${pad} mt-[12vh] lg:mt-0`}>
            <p className={`reveal max-w-[980px] ${C} text-[28px] leading-[1.08] lg:text-[44px]`}>
              Our drivers and hosts know these dunes by heart — where the sand is softest, where the light falls last, and where the quiet is deepest.
            </p>
            <div className="reveal mt-10 gap-10 text-[14px] leading-[1.6] text-white/70 lg:ml-[25%] lg:columns-2">
              <p>{site.description}</p>
              <p className="mt-4 lg:mt-0">Every evening is planned around you: pick-up from your door, an air-conditioned 4x4, and a camp set up for a slow dinner after dark. {site.response}</p>
            </div>
          </div>
        </section>

        {/* W5: OUR EXPERIENCES accordion */}
        <section id="experiences" className="relative bg-white pb-[14vh] pt-[14vh]">
          <div className={`relative ${pad} text-center`}>
            <h2 className={`${C} text-[44px] uppercase leading-none lg:text-[64px]`}><Split>Our experiences</Split></h2>
            <Swash className="mx-auto -mt-2 w-[300px] text-[#1f2a44]/40 lg:w-[520px]" />
          </div>
          <div className="mt-10 px-3 lg:mt-14">
            <TripPanels trips={trips} />
          </div>
          <div className={`${pad} mt-10 flex flex-col items-center gap-3 text-center`}>
            <p className={`${C} text-[20px] italic`}>Sixteen experiences across the Emirates</p>
            <Link href="/experiences" className="text-[14px] font-medium tracking-wide hover:text-[#b9601f]">[ View all experiences ]</Link>
          </div>
        </section>

        {/* M7: sticky centre column — The evening */}
        <section id="evening" aria-labelledby="v1-evening" className="relative bg-[#1f2a44] py-[12vh] text-white lg:py-[22vh]">
          <div className={`mb-10 flex items-baseline justify-between ${pad} lg:hidden`}>
            <h2 className="text-[28px] font-normal">The evening <sup className="text-[10px]">™ (05)</sup></h2>
            <Link href="/experiences" className={`${M} text-[19px]`}>Discover</Link>
          </div>
          <div className="lg:grid lg:grid-cols-[1fr_31.4vw_1fr]">
            <div className="hidden lg:block">
              <div className="sticky top-[50svh] -translate-y-1/2 pl-10">
                <h2 id="v1-evening" className="text-[30px] font-normal leading-none">The evening <sup className="text-[10px] font-medium">™ (05)</sup></h2>
                <p className={`mt-3 ${C} max-w-[220px] text-[17px] italic text-white/70`}>From your door at 15:00 to the last light of the fire.</p>
              </div>
            </div>
            <ol className={`${pad} space-y-3 lg:space-y-0 lg:px-0`}>
              {evenings.map((e, i) => (
                <li key={e.time} className="relative aspect-[4/5] overflow-hidden lg:aspect-[452/560]">
                  <div className="reveal-img zoom absolute inset-0">
                    <Pic name={e.img} sizes="(min-width:1024px) 32vw, 100vw" alt={e.alt} />
                  </div>
                  <p className={`absolute bottom-4 left-4 ${M} flex items-center gap-2 text-[19px]`}>
                    <span className="bg-white px-1.5 text-[#1f2a44]">{e.time}</span>
                    <span className="border border-white/70 bg-[#1f2a44]/40 px-1.5 backdrop-blur-sm">{e.cap}</span>
                  </p>
                  <span className={`absolute right-4 top-4 ${M} text-[17px] text-white/85`} aria-hidden="true">0{i + 1}/05</span>
                </li>
              ))}
            </ol>
            <div className="hidden lg:block">
              <div className="sticky top-[50svh] -translate-y-1/2 pr-[100px] text-right">
                <Link href="/experiences" className={`${M} v1-link text-[20px]`}>Discover</Link>
              </div>
            </div>
          </div>
        </section>

        {/* M8: NO PLACE / LIKE THE DESERT */}
        <section aria-label="No place like the desert" className="relative h-[100svh] overflow-hidden text-white">
          <div data-parallax="0.14" className="absolute inset-0">
            <Pic name="night-sky" sizes="100vw" alt="The Milky Way over the desert camp" />
          </div>
          <div className="absolute inset-0 bg-[#1f2a44]/25" />
          <p aria-hidden="true" className={`absolute left-5 top-[9%] ${O} text-[20vw] font-normal uppercase leading-[0.8] lg:left-10 lg:text-[11vw]`}>
            <Split>No place</Split>
          </p>
          <p aria-hidden="true" className={`absolute bottom-[9%] right-5 text-right ${O} text-[20vw] font-normal uppercase leading-[0.8] lg:right-[100px] lg:text-[11vw]`}>
            <Split delay={150}>Like the</Split><br className="lg:hidden" /> <Split delay={260}>desert</Split>
          </p>
          <span className={`absolute left-5 top-1/2 ${M} border border-white/60 px-1.5 text-[18px] lg:left-10`}>Lehbab desert, UAE</span>
          <span className={`absolute right-5 top-1/2 ${M} border border-white/60 px-1.5 text-[18px] lg:right-[100px]`}>Dubai 25°12′N 55°16′E</span>
        </section>

        {/* W9: route — DUBAI – LEHBAB into fog, four-corner band, navy map */}
        <section aria-labelledby="v1-route" className="relative bg-white">
          <div data-scrub="pass" className="relative h-[70svh] overflow-hidden lg:h-[100svh]">
            <div className="absolute inset-0"><Pic name="camp-lanterns" sizes="100vw" alt="Lanterns glowing across the desert camp at dusk" /></div>
            <div className="absolute inset-0 bg-white/30" />
            <p aria-hidden="true" className={`v1-route-word absolute inset-x-0 top-[14%] text-center ${O} text-[24vw] font-light uppercase leading-[0.85] text-white lg:text-[15vw]`}>
              <span className="block lg:inline">Dubai –</span> <span>Lehbab</span>
            </p>
            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-white via-white/80 to-transparent" />
          </div>
          <div className="relative border-t border-dashed border-[#1f2a44]/50 mx-3 pb-20 pt-4 lg:pb-28">
            <div className={`flex justify-between ${O} text-[13px] font-light leading-[1.35] text-[#1f2a44]/70 lg:absolute lg:inset-x-0 lg:top-4`}>
              <p>25°12′N 55°16′E<br />Dubai</p>
              <p className="text-right">Red dunes, inland<br />Lehbab desert</p>
            </div>
            <div className="mx-auto mt-10 max-w-[480px] px-2 text-center lg:mt-2">
              <h2 id="v1-route" className={`${C} text-[36px] uppercase leading-[0.95] lg:text-[54px]`}><Split>Into the red dunes</Split></h2>
              <p className="reveal mt-6 text-[15px] leading-[1.45] text-[#1f2a44]/70">
                We collect you from your hotel or home in Dubai and drive inland to the red sand of Lehbab, where the city lights give way to open dunes and a quiet camp.
              </p>
            </div>
          </div>

          <div data-scrub="pass" className="relative bg-[#18213a] text-white lg:h-[100svh]">
            <div className="relative h-[520px] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
              <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <pattern id="v1-dots" width="14" height="14" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.3" fill="#c9b79a" opacity="0.22" />
                  </pattern>
                  <radialGradient id="v1-glow" cx="0.62" cy="0.66" r="0.5">
                    <stop offset="0" stopColor="#b9601f" stopOpacity="0.22" />
                    <stop offset="1" stopColor="#b9601f" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <path d="M0 560 C 220 520, 420 400, 560 300 S 900 140, 1100 90 S 1340 30, 1440 0 L 1440 800 L 0 800 Z" fill="#212c48" />
                <path d="M0 560 C 220 520, 420 400, 560 300 S 900 140, 1100 90 S 1340 30, 1440 0 L 1440 800 L 0 800 Z" fill="url(#v1-dots)" />
                <rect width="1440" height="800" fill="url(#v1-glow)" />
                <path d="M0 560 C 220 520, 420 400, 560 300 S 900 140, 1100 90 S 1340 30, 1440 0" stroke="#8d9ab8" strokeOpacity="0.5" strokeWidth="1" fill="none" />
                <text x="300" y="250" fill="#8d9ab8" fontSize="15" letterSpacing="3" style={{ fontFamily: "var(--v1-osw)" }}>ARABIAN GULF</text>
                <path d="M560 300 C 660 330, 820 400, 880 560" stroke="#e9b98c" strokeWidth="1.5" fill="none" pathLength={900} className="v1-route" />
                <circle cx="560" cy="300" r="9" fill="#e9b98c" opacity="0.25" />
                <circle cx="560" cy="300" r="4.5" fill="#e9b98c" />
                <circle cx="880" cy="560" r="12" fill="#e9b98c" opacity="0.25" />
                <circle cx="880" cy="560" r="6" fill="#e9b98c" />
                <text x="560" y="250" textAnchor="middle" fill="#c9cfdd" fontSize="22" fontStyle="italic" style={{ fontFamily: "var(--v1-serif)" }}>Starting point</text>
                <text x="560" y="276" textAnchor="middle" fill="#fff" fontSize="17" letterSpacing="1" style={{ fontFamily: "var(--v1-osw)" }}>DUBAI, YOUR DOOR</text>
                <text x="880" y="612" textAnchor="middle" fill="#c9cfdd" fontSize="22" fontStyle="italic" style={{ fontFamily: "var(--v1-serif)" }}>Destination</text>
                <text x="880" y="638" textAnchor="middle" fill="#fff" fontSize="17" letterSpacing="1" style={{ fontFamily: "var(--v1-osw)" }}>LEHBAB DESERT</text>
              </svg>
            </div>
            <dl className={`relative mx-5 -mt-10 mb-0 rounded-[4px] border border-white/10 bg-[#121a2e]/95 px-6 py-2 backdrop-blur lg:absolute lg:left-10 lg:top-10 lg:mx-0 lg:mt-0 lg:w-[440px] lg:px-8`}>
              {[["Pick-up", "15:00"], ["Drop-off", "21:30"], ["Guests per 4x4", "Up to 6"], ["Premium evening", fromPrice]].map(([k, v], i) => (
                <div key={k} className={`py-6 ${i > 0 ? "border-t border-dotted border-white/25" : ""}`}>
                  <dt className={`${C} text-[18px] italic text-white/75`}>{k}</dt>
                  <dd className="mt-1 text-[34px] font-medium leading-none tracking-tight lg:text-[42px]">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="h-12 lg:hidden" />
          </div>
        </section>

        {/* W10: START PLANNING YOUR EVENING */}
        <section className="relative flex h-[90svh] min-h-[560px] items-center justify-center overflow-hidden text-center text-white">
          <div data-parallax="0.12" className="absolute inset-0">
            <Pic name="premium-evening-3" sizes="100vw" alt="Guests at the desert camp after sunset" />
          </div>
          <div className="absolute inset-0 bg-[#1f2a44]/40" />
          <div className={`relative ${pad}`}>
            <h2 className={`${C} text-[40px] uppercase leading-[0.95] lg:text-[68px]`}>
              <Split>Start planning</Split><br /><Split delay={160}>your evening</Split>
            </h2>
            <p className={`reveal mt-5 ${C} text-[20px] italic text-white/90`}>{site.response}</p>
            <div className="reveal mt-8 flex flex-wrap justify-center gap-3 text-[14px] font-medium">
              <Link href="/enquire" className="rounded-[4px] bg-[#b9601f] px-7 py-3.5 transition-colors hover:bg-[#a0521a]">Enquire</Link>
              <a href={wa} className="rounded-[4px] border border-white/60 px-7 py-3.5 transition-colors hover:bg-white hover:text-[#1f2a44]">WhatsApp us</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
