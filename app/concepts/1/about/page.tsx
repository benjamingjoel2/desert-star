import Link from "next/link";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import { FillWords } from "@/components/Bits";
import { byCategory } from "@/lib/tours";
import { site, categories } from "@/data/site";
import { O, C, M, pad, wa, shellClass, sharedCss, Star, Loop, Swash, GridLines, SideTab, Header, Footer } from "@/components/concepts/v1/Chrome";

export const metadata = { title: "About · Variation 1" };

const stat = (label: string) => site.stats.find((s) => s.label === label)?.value ?? "";
const chips = [`${stat("Guests hosted")} guests hosted`, `${stat("Journeys completed")} journeys completed`, "Reply within 30 min", "Free cancellation 24h"];

/* WHAT WE DO: the four categories, each with its own photo (none repeated on this page) */
const catImg: Record<string, { img: string; alt: string; places: string }> = {
  desert: { img: "premium-morning-4", alt: "4x4s crossing the red dunes", places: "Evening · Premium evening with BBQ · Morning · Sunset · Self-drive" },
  city: { img: "mosque-1", alt: "Sheikh Zayed Grand Mosque in Abu Dhabi", places: "Dubai · Abu Dhabi & the Grand Mosque · Al Ain & Jebel Hafeet · Sharjah" },
  cruises: { img: "marina-2", alt: "A dhow cruise passing the Dubai Marina towers at night", places: "Dubai Creek · Dubai Marina" },
  attractions: { img: "burj-palms", alt: "Burj Khalifa rising above the palms", places: "Burj Khalifa At the Top · Ferrari World Abu Dhabi" },
};

/* HOW AN EVENING WORKS: sticky centre column */
const steps: { time: string; cap: string; text: string; img: string; alt: string }[] = [
  { time: "15:00", cap: "Pick-up", text: "From your hotel or residence within Dubai city limits, in an air-conditioned SUV.", img: "dubai-skyline", alt: "Dubai skyline in the afternoon" },
  { time: "Afternoon", cap: "The red dunes", text: "30–40 minutes of dune bashing in the high red dunes of Lehbab, then sandboarding and photo stops.", img: "premium-evening-2", alt: "A 4x4 throwing up red sand on a dune" },
  { time: "Sunset", cap: "Camels & falcon", text: "A short camel ride and a falcon photo opportunity as the light goes gold.", img: "standard-sunset-4", alt: "Two guests on a camel at the camp" },
  { time: "Evening", cap: "The camp", text: "Henna for ladies, shisha in the common area, and a live buffet BBQ with unlimited soft drinks.", img: "premium-evening-4", alt: "Salads and dishes laid out at the camp buffet" },
  { time: "After dark", cap: "The shows", text: "Belly dance, Tanoura and a fire show under the open sky.", img: "standard-sunset-3", alt: "A fire show sending sparks across the sand at night" },
  { time: "21:30", cap: "Home", text: "Back to your door in Dubai, the same way you came.", img: "dubai-night", alt: "Dubai towers lit up at night" },
];


const values: [string, string][] = [
  ["Door to door", "We collect you and bring you home. No meeting points, no shuttles to find."],
  ["Small groups", "Up to six guests per vehicle on premium safaris, or a private vehicle on request."],
  ["One team", "The same concierge team from your first message to your drop-off."],
  ["Flexible", "Free cancellation up to 24 hours before the tour."],
  ["Every table", "Vegetarian, vegan and halal options at the camp, and we plan around dietary needs."],
];

/* THE PEOPLE BEHIND EVERY EVENING: the real teams, not invented individuals */
const teams: { n: string; title: string; role: string; text: string; img?: string; alt?: string }[] = [
  { n: "01", title: "The concierge", role: "One Central, Trade Centre", text: "Our reservations team at the office answers every message within 30 minutes, day and night, and plans your pick-up, your vehicle and your evening." },
  { n: "02", title: "Guides & drivers", role: "The dunes of Lehbab", text: "English-speaking desert safari guides who drive the red dunes of Lehbab, stop for sandboarding and know where the photographs are.", img: "combo-mosque-1", alt: "A white 4x4 climbing a red dune" },
  { n: "03", title: "Camp hosts", role: "The premium camp", text: "They welcome you to camp, look after henna and shisha, run the BBQ grill and make sure dietary needs are met.", img: "camp-lanterns", alt: "Lanterns glowing across the desert camp at dusk" },
  { n: "04", title: "Performers & falconer", role: "After dark", text: "Tanoura, belly dance and the fire show, and the falcon you meet for a photograph before dinner.", img: "combo-mosque-3", alt: "A Tanoura dancer spinning under festoon lights" },
  { n: "05", title: "City guides", role: "Across the Emirates", text: "They lead the journeys beyond the desert: the Sheikh Zayed Grand Mosque, Al Ain and Jebel Hafeet, Sharjah and Dubai Creek.", img: "alain-1", alt: "The road winding up Jebel Hafeet in Al Ain" },
];

export default function AboutPage() {
  return (
    <div className={shellClass}>
      <style>{sharedCss + `
        .v1-fog { background: linear-gradient(to top, #fff 0%, rgba(255,255,255,.92) 22%, rgba(255,255,255,.55) 48%, rgba(255,255,255,0) 100%);
          opacity: calc(.8 + var(--p, 0) * .2); transform: translate3d(0, calc((1 - var(--p, 0)) * 14%), 0); }
        .v1-wash { opacity: calc(var(--p, 0) * var(--p, 0)); }
        .v1-step-l { transform: translate3d(calc((1 - min(1, var(--p, 1) * 2.4)) * -40%), 0, 0); }
        .v1-step-r { transform: translate3d(calc((1 - min(1, var(--p, 1) * 2.4)) * 40%), 0, 0); }
        @media (min-width: 1024px) {
          .v1-track { transform: translate3d(calc((100vw - 100%) * var(--p, 1)), 0, 0); }
        }
      `}</style>

      <GridLines />
      <SideTab />
      <Header />

      <main>
        {/* W2: hero — giant ABOUT that blurs into fog on scroll */}
        <section data-scrub="sticky" className="relative h-[190svh]">
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            <div className="hero-zoom absolute inset-0">
              <Pic name="night-sky" priority sizes="100vw" alt="The Milky Way above the desert" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1f2a44]/55 via-[#1f2a44]/15 to-transparent" />

            <p className={`hero-ui absolute inset-x-5 top-[44%] text-center ${C} text-[22px] italic leading-[1.15] text-white lg:left-10 lg:right-auto lg:top-[28%] lg:max-w-[260px] lg:text-left lg:text-[21px]`}>
              Your adventure architects in the UAE
            </p>
            <Link href="#people" className="hero-ui absolute inset-x-5 bottom-[calc(14%_+_26vw)] flex items-center justify-between border-y border-white/40 px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-white/10 lg:inset-x-auto lg:bottom-auto lg:right-[100px] lg:top-[28%] lg:w-[190px] lg:px-8">
              The people <span aria-hidden="true" className="text-[11px]">▶</span>
            </Link>

            <h1 className="absolute inset-x-0 bottom-[14%] text-center lg:bottom-[13%]">
              <span aria-hidden="true" className={`hero-mark block ${O} text-[27vw] font-medium uppercase leading-[0.78] tracking-[0.03em] text-white lg:text-[25vw]`}>About</span>
              <span className="sr-only">About Desert Stars — a Dubai travel house for tours and experiences across the UAE</span>
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
              <span className={`relative ${C} text-[22px] italic`}>Who we are</span>
            </p>
            <FillWords
              className={`${C} text-[29px] uppercase leading-[0.98] [text-indent:22%] sm:text-[40px] lg:text-[3.2vw] lg:[text-indent:33.333%]`}
              inlineImg="combo-mosque-2"
              text="We curate journeys through the heart of the Emirates, from the red dunes of Lehbab to the Grand Mosque and the old creek of Dubai. More than a travel company, we are companions in discovery."
            />
          </div>
          <div className="mt-16 grid gap-10 lg:ml-[16.666%] lg:mt-24 lg:grid-cols-[repeat(2,16.666vw)] lg:gap-0">
            <div className="reveal max-w-[300px] lg:max-w-none lg:pr-6">
              <h2 className={`${O} text-[20px] font-normal uppercase`}>The house</h2>
              <p className="mt-4 text-[15px] font-medium leading-[1.45] text-[#1f2a44]/85">
                Desert Stars is a Dubai-based travel agency offering tours and experiences across the UAE, from our office at One Central in Trade Centre.
              </p>
            </div>
            <div className="reveal max-w-[300px] lg:max-w-none lg:pr-6" style={{ ["--d" as string]: "120ms" }}>
              <h2 className={`${O} text-[20px] font-normal uppercase`}>The promise</h2>
              <p className="mt-4 text-[15px] font-medium leading-[1.45] text-[#1f2a44]/85">
                Authentic, seamless and exciting adventures from start to finish — planned around you, and looked after by one team.
              </p>
            </div>
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
          <h2 className="sr-only">Companions in discovery</h2>
          <div className={`relative ${pad} lg:h-[62vw] lg:px-0`}>
            <div aria-hidden="true" className={`relative z-10 ${O} text-[17vw] font-normal uppercase leading-[0.8] lg:absolute lg:left-[10%] lg:top-0 lg:text-[11vw]`}>
              <Split>Companions</Split>
            </div>
            <div className="reveal-img relative mx-auto mt-[4vw] aspect-[4/5] w-[72%] overflow-hidden rounded-[4px] lg:absolute lg:left-1/2 lg:top-[7.5vw] lg:mt-0 lg:aspect-auto lg:h-[50vw] lg:w-[31.4vw] lg:-translate-x-1/2">
              <Pic name="camel-ride" sizes="(min-width:1024px) 32vw, 72vw" alt="Guests riding camels along a dune ridge" />
            </div>
            <div aria-hidden="true" className={`relative z-10 -mt-[9vw] text-right ${O} text-[15vw] font-normal uppercase leading-[0.8] lg:absolute lg:bottom-[2vw] lg:right-[10%] lg:mt-0 lg:text-[11vw]`}>
              <Split delay={150}>In</Split><br className="lg:hidden" /> <Split delay={250}>discovery</Split>
            </div>
          </div>
          <div className={`${pad} mt-[12vh] lg:mt-[8vh]`}>
            <p className={`reveal max-w-[1000px] ${C} text-[28px] leading-[1.08] lg:text-[44px]`}>
              We design each journey the way an architect draws a house: around the people who will live in it. Where you are staying, who is travelling with you, what you want to see — the rest is ours to arrange.
            </p>
            <div className="reveal mt-10 gap-10 text-[14px] leading-[1.6] text-white/70 lg:ml-[25%] lg:columns-2">
              <p>{site.description}</p>
              <p className="mt-4 lg:mt-0">Our concierge team is at the office every day, {site.hours.replace(/^Daily, /, "").replace(" to ", "–")}. {site.response} {site.cancellation}</p>
            </div>
          </div>
        </section>

        {/* W7: WHAT WE DO — white cards over the pale ground */}
        <section id="what-we-do" aria-labelledby="v1-what" className="relative bg-[#f3f1ec] pb-[14vh] pt-[14vh]">
          <div className={`relative ${pad} text-center`}>
            <h2 id="v1-what" className={`${C} text-[44px] uppercase leading-none lg:text-[64px]`}><Split>What we do</Split></h2>
            <Swash className="mx-auto -mt-2 w-[300px] text-[#1f2a44]/40 lg:w-[460px]" />
            <p className={`reveal mx-auto mt-4 max-w-[460px] ${C} text-[20px] italic leading-[1.25]`}>
              {stat("Signature experiences")} experiences in four families, from the desert to the city and the water.
            </p>
          </div>
          <ul className={`no-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto ${pad} pb-2 lg:mt-16 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pr-[100px]`}>
            {categories.map((c, i) => {
              const meta = catImg[c.slug];
              const count = byCategory(c.slug).length;
              return (
                <li key={c.slug} className="reveal w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-auto" style={{ ["--d" as string]: `${i * 90}ms` }}>
                  <Link href={`/experiences#${c.slug}`} className="group flex h-full flex-col rounded-[4px] bg-white p-3 shadow-[0_1px_0_rgba(31,42,68,0.06)] transition-shadow hover:shadow-[0_20px_50px_-24px_rgba(31,42,68,0.35)]">
                    <div className="flex items-start justify-between px-2 pt-3">
                      <h3 className={`${C} text-[28px] uppercase leading-[0.95] lg:text-[30px]`}>{c.name}</h3>
                      <span className={`${M} shrink-0 pl-2 text-[17px] text-[#1f2a44]/55`}>({String(count).padStart(2, "0")})</span>
                    </div>
                    <p className="mt-3 px-2 text-[14px] font-medium leading-[1.45] text-[#1f2a44]/75">{c.blurb}</p>
                    <p className={`mt-3 px-2 ${C} text-[17px] italic leading-[1.3] text-[#1f2a44]/70`}>{meta.places}</p>
                    <div className="relative mt-5 aspect-[4/5] overflow-hidden rounded-[2px]">
                      <div className="absolute inset-0 transition-transform duration-[1400ms] group-hover:scale-[1.04]">
                        <Pic name={meta.img} sizes="(min-width:1024px) 22vw, 82vw" alt={meta.alt} />
                      </div>
                    </div>
                    <span className="mt-4 block pb-1 text-center text-[14px] font-medium tracking-wide group-hover:text-[#b9601f]">[ Discover ]</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* W6: the promise, signed by the team + how we work */}
        <section aria-labelledby="v1-promise" className={`relative bg-white ${pad} py-[14vh] lg:py-[20vh]`}>
          <div className="mx-auto max-w-[980px] text-center">
            <Star className="mx-auto h-4 w-4 text-[#b9601f]" />
            <h2 id="v1-promise" className="sr-only">Our promise</h2>
            <blockquote className={`reveal mt-8 ${C} text-[32px] italic leading-[1.08] lg:text-[54px]`}>
              “Authentic, seamless and exciting adventures, from start to finish.”
            </blockquote>
            <p className={`reveal mt-6 ${O} text-[12px] uppercase tracking-[0.2em] text-[#1f2a44]/60`}>— Our promise · The Desert Stars team</p>
          </div>
          <ol className="mt-[10vh] grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-[14vh] lg:grid-cols-5 lg:gap-x-0">
            {values.map(([t, d], i) => (
              <li key={t} className="reveal border-t border-[#1f2a44]/20 pt-4 lg:pr-6" style={{ ["--d" as string]: `${i * 80}ms` }}>
                <span className={`${M} text-[17px] text-[#1f2a44]/50`}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={`mt-2 ${O} text-[20px] font-normal uppercase`}>{t}</h3>
                <p className="mt-2 text-[14px] font-medium leading-[1.5] text-[#1f2a44]/75">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* W7: THE PEOPLE BEHIND EVERY EVENING — floating cards over a full-bleed photo, sliding on scroll (desktop) */}
        <section id="people" aria-labelledby="v1-people" data-scrub="sticky" className="relative lg:h-[300svh]">
          <div className="relative overflow-hidden lg:sticky lg:top-0 lg:h-[100svh]">
            <div className="absolute inset-0">
              <Pic name="dunes-cruiser" sizes="100vw" alt="" />
            </div>
            <div className="absolute inset-0 bg-[#1f2a44]/45" />
            <div className="relative flex h-full flex-col py-[12vh] lg:justify-center lg:py-0">
              <div className={`${pad} text-white lg:mb-10`}>
                <h2 id="v1-people" className={`${C} text-[40px] uppercase leading-[0.95] lg:text-[60px]`}>
                  <Split>The people behind</Split><br /><Split delay={150}>every evening</Split>
                </h2>
                <p className={`mt-4 max-w-[460px] ${C} text-[20px] italic leading-[1.25] text-white/90`}>
                  Five teams take turns to look after you, from your first message to the moment you are home.
                </p>
              </div>
              <ul className={`v1-track mt-10 flex flex-col gap-3 ${pad} lg:mt-0 lg:w-max lg:flex-row lg:gap-4 lg:pr-[100px]`}>
                {teams.map((t) => (
                  <li key={t.n} className="flex flex-col rounded-[4px] bg-white p-3 text-[#1f2a44] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] lg:h-[62svh] lg:max-h-[560px] lg:w-[340px]">
                    {t.img ? (
                      <div className="relative aspect-[3/2] shrink-0 overflow-hidden rounded-[2px] lg:aspect-auto lg:flex-1">
                        <Pic name={t.img} sizes="(min-width:1024px) 340px, 92vw" alt={t.alt} />
                      </div>
                    ) : (
                      <div className="relative flex aspect-[3/2] shrink-0 flex-col justify-between rounded-[2px] bg-[#1f2a44] p-5 text-white lg:aspect-auto lg:flex-1">
                        <span className={`${M} self-start border border-white/50 px-1.5 text-[17px]`}>Reply within</span>
                        <span className={`${O} text-[88px] font-light leading-[0.8] lg:text-[110px]`}>30<span className="ml-2 text-[0.3em] tracking-[0.1em]">MIN</span></span>
                        <span className={`${M} text-[17px] text-white/70`}>Daily 08:00–22:00 · day &amp; night on WhatsApp</span>
                      </div>
                    )}
                    <div className="px-2 pb-2 pt-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className={`${C} text-[26px] uppercase leading-none`}>{t.title}</h3>
                        <span className={`${M} text-[16px] text-[#1f2a44]/50`}>{t.n}/05</span>
                      </div>
                      <p className={`mt-1 ${C} text-[17px] italic text-[#1f2a44]/65`}>{t.role}</p>
                      <p className="mt-3 text-[14px] font-medium leading-[1.45] text-[#1f2a44]/80">{t.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* The founder — portrait + short, non-invented line (full bio to come) */}
        <section aria-labelledby="v1-founders" className={`relative bg-white ${pad} py-[14vh] lg:py-[18vh]`}>
          <div className="grid gap-10 lg:grid-cols-6 lg:gap-0">
            <div className="lg:col-span-2 lg:pr-10">
              <p className={`${M} text-[18px] text-[#1f2a44]/55`}>Founder ™</p>
              <h2 id="v1-founders" className={`mt-3 ${C} text-[44px] uppercase leading-[0.95] lg:text-[60px]`}><Split>The founder</Split></h2>
              <p className={`reveal mt-6 max-w-[360px] ${C} text-[24px] italic leading-[1.2] lg:text-[26px]`}>
                Mohammed Namil founded Desert Stars to share the desert the way he knows it: door to door, unhurried, and ending under the stars.
              </p>
            </div>
            <figure className="lg:col-span-4 lg:pr-[100px]">
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                <div className="reveal-img relative aspect-[4/5] overflow-hidden rounded-[4px] bg-[#0b0b0d] [&_img]:object-[78%_center]">
                  <Pic name="founder" sizes="(min-width:1024px) 34vw, (min-width:640px) 50vw, 100vw" alt="Portrait of Mohammed Namil, founder of Desert Stars" />
                  <span className={`absolute left-3 top-3 ${M} bg-white px-1.5 text-[17px] text-[#1f2a44]`}>Founder</span>
                </div>
                <figcaption className="flex flex-col justify-between rounded-[4px] bg-[#1f2a44] p-5 text-white lg:p-7">
                  <span className={`${M} text-[17px] text-white/55`}>01 / Desert Stars</span>
                  <div className="mt-12">
                    <Star className="h-4 w-4 text-[#e9b98c]" />
                    <p className={`mt-4 ${C} text-[40px] uppercase leading-[0.95] lg:text-[52px]`}>Mohammed Namil</p>
                    <p className={`mt-1 ${O} text-[13px] uppercase tracking-[0.2em] text-white/70`}>Founder</p>
                    <p className={`mt-6 border-t border-white/20 pt-4 ${C} text-[18px] italic text-white/65`}>Full profile coming soon.</p>
                  </div>
                </figcaption>
              </div>
            </figure>
          </div>
        </section>

        {/* W9: WHERE TO FIND US — four-corner band */}
        <section aria-labelledby="v1-find" className="relative bg-white">
          <div className="relative mx-3 border-t border-dashed border-[#1f2a44]/50 pb-20 pt-4 lg:pb-28">
            <div className={`flex justify-between ${O} text-[13px] font-light leading-[1.35] text-[#1f2a44]/70 lg:absolute lg:inset-x-0 lg:top-4`}>
              <p>25°12′N 55°16′E<br />Dubai, UAE</p>
              <p className="text-right">Daily 08:00–22:00<br />UAE time</p>
            </div>
            <div className="mx-auto mt-10 max-w-[560px] px-2 text-center lg:mt-2">
              <h2 id="v1-find" className={`${C} text-[36px] uppercase leading-[0.95] lg:text-[54px]`}><Split>Where to find us</Split></h2>
              <p className="reveal mt-6 text-[15px] leading-[1.45] text-[#1f2a44]/70">
                Our concierge team works from One Central, in Dubai&apos;s Trade Centre district. Most guests never need to visit: we come to you.
              </p>
            </div>
            <dl className="mx-auto mt-14 grid max-w-[1180px] border-l border-t border-[#1f2a44]/15 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
              {[
                { k: "Office", v: site.address.replace(", United Arab Emirates", ", UAE"), href: site.mapUrl, cta: "Open in Maps" },
                { k: "Hours", v: site.hours, href: undefined, cta: site.response },
                { k: "Call or WhatsApp", v: site.phone, href: site.phoneHref, cta: "Call now", href2: wa, cta2: "WhatsApp" },
                { k: "Email", v: site.email, href: `mailto:${site.email}`, cta: "Write to us" },
              ].map((x) => (
                <div key={x.k} className="flex min-h-[200px] flex-col justify-between border-b border-r border-[#1f2a44]/15 p-5 lg:min-h-[240px] lg:p-6">
                  <div>
                    <dt className={`${C} text-[20px] italic text-[#1f2a44]/70`}>{x.k}</dt>
                    <dd className={`mt-2 font-medium leading-[1.3] ${x.k === "Email" ? "text-[16px] [overflow-wrap:anywhere] xl:text-[17px]" : "text-[18px] lg:text-[19px]"}`}>{x.v}</dd>
                  </div>
                  <dd className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-medium">
                    {x.href ? (
                      <a href={x.href} {...(x.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})} className="v1-link hover:text-[#b9601f]">[ {x.cta} ]</a>
                    ) : (
                      <span className="text-[#1f2a44]/60">{x.cta}</span>
                    )}
                    {x.href2 && <a href={x.href2} className="v1-link hover:text-[#b9601f]">[ {x.cta2} ]</a>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* W10: START PLANNING YOUR EVENING */}
        <section className="relative flex h-[90svh] min-h-[560px] items-center justify-center overflow-hidden text-center text-white">
          <div data-parallax="0.12" className="absolute inset-0">
            <Pic name="camel-grazing" sizes="100vw" alt="Camels resting on the sand at sunset" />
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
