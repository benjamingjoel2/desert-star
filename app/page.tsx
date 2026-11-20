import Pic from "@/components/Pic";
import Split from "@/components/Split";
import TripPanels from "@/components/TripPanels";
import { tours, getTour, price } from "@/lib/tours";
import { site } from "@/data/site";
import { shell, pad, V4Style, Header, Footer, Steps, StepChips, Column, GiantLinks } from "@/components/concepts/v4/Chrome";

export const metadata = { title: { absolute: "Desert Stars | Luxury Desert Safaris & Emirates Journeys" } };

/* ── Data ─────────────────────────────────────────────── */
function pick(slug: string, img: string, label?: string) {
  const t = getTour(slug);
  if (!t) return null;
  return { href: `/experiences/${t.slug}`, title: t.title, label: label ?? t.title, price: price(t), meta: t.timing, text: t.short, img };
}
type Item = NonNullable<ReturnType<typeof pick>>;

const trips = [
  pick("premium-evening-desert-safari", "premium-evening-2"),
  pick("standard-sunset-desert-safari", "standard-sunset-4"),
  pick("evening-desert-safari", "camel-grazing"),
  pick("self-drive-evening-desert-safari", "dunes-cruiser"),
  pick("premium-morning-desert-safari", "premium-morning-4"),
].filter((x): x is Item => !!x);

const journeys = [
  pick("sheikh-zayed-grand-mosque-tour", "mosque-bluehour", "Grand Mosque"),
  pick("dubai-city-tour", "dubai-skyline", "Dubai city"),
  pick("dubai-abu-dhabi-desert-safari-3-in-1", "dubai-night", "3-in-1, two days"),
  pick("al-ain-city-tour", "alain-1", "Al Ain"),
  pick("sharjah-city-tour", "sharjah-blue-souk", "Sharjah"),
  pick("abu-dhabi-city-tour", "mosque-1", "Abu Dhabi"),
  pick("burj-khalifa-at-the-top", "burj-palms", "Burj Khalifa"),
].filter((x): x is Item => !!x);

const evening = [
  { img: "premium-evening-1", cap: "15:00 · Pick-up from your door" },
  { img: "premium-evening-3", cap: "Dune bashing · Lehbab" },
  { img: "combo-3in1-3", cap: "Falcon photo stop" },
  { img: "premium-evening-4", cap: "BBQ dinner at camp" },
  { img: "combo-mosque-3", cap: "Tanoura dance" },
  { img: "standard-sunset-3", cap: "Fire show" },
  { img: "night-sky", cap: "21:30 · Drop-off" },
];

const included = [
  { t: "Door-to-door 4x4", s: "g" },
  { t: "Dune bashing", s: "s" },
  { t: "Sandboarding", s: "m" },
  { t: "Camel ride", s: "g" },
  { t: "Falcon photo", s: "s" },
  { t: "BBQ dinner", s: "m" },
  { t: "Live shows", s: "g" },
  { t: "Henna", s: "s" },
];

/* ── Page ─────────────────────────────────────────────── */
export default function Page() {
  return (
    <div className={shell}>
      <V4Style />

      {/* ───────── M1 Header ───────── */}
      <Header />

      <main>
        {/* ───────── M2 Hero ───────── */}
        <section className="v4-hero relative h-[240svh]" data-scrub="sticky" aria-label="Born in the dunes">
          <div className="sticky top-0 h-svh overflow-hidden">
            <div className="kenburns absolute inset-0"><Pic name="camel-caravan" alt="A camel caravan crossing the dunes at golden hour" sizes="100vw" /></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08]/55 via-[#0c0a08]/15 to-[#0c0a08]/35" />
            <h1 className="v4-fade v4-g absolute inset-x-0 top-[64px] text-center md:top-[26px]">
              <span className="block"><Split>Born in</Split></span>
              <span className="block"><Split delay={140}>the dunes</Split></span>
            </h1>
            <div className="v4-card shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)]">
              <div className="h-full w-full"><Pic name="camp-lanterns" alt="A lantern-lit Bedouin camp at dusk" sizes="100vw" priority /></div>
              <div className="v4-tint absolute inset-0 bg-[#0c0a08]/50" />
            </div>
            <nav aria-label="Sections" className="v4-navrow absolute inset-x-0 z-10 grid -translate-y-1/2 grid-cols-5 px-2 text-center md:px-[10vw]">
              {[
                ["Experiences", "#experiences"],
                ["The evening", "#evening"],
                ["Safaris", "#safaris"],
                ["Journal", "/journal"],
                ["Contact", "#contact"],
              ].map(([l, h]) => (
                <a key={l} href={h} className="v4-m v4-link justify-self-center text-[13px] text-[#efe6d6] [text-shadow:0_1px_10px_rgba(0,0,0,.5)] md:text-[17px]">{l}</a>
              ))}
            </nav>
          </div>
        </section>

        {/* ───────── M3 Bio statement + M4 stepped transition ───────── */}
        <section className="relative" aria-label="About Desert Stars">
          <div className="sticky top-0 h-svh overflow-hidden">
            <Pic name="camp-lanterns" alt="" sizes="100vw" />
            <div className="absolute inset-0 bg-[#0c0a08]/50" />
          </div>
          <div className="relative -mt-[100svh] px-5 pb-[52svh] pt-[38svh] md:px-[18.1vw] md:pb-[60svh] md:pt-[16svh]">
            <p className="v4-s reveal max-w-[880px]">
              <span className="mb-3 mr-3 inline-block h-[90px] w-[90px] overflow-hidden rounded-[4px] align-bottom md:mb-0 md:h-[122px] md:w-[112px] md:align-[-6px]">
                <Pic name="combo-mosque-2" alt="A falcon up close" sizes="120px" />
              </span>
              <br className="md:hidden" />
              A Dubai desert house, sharing dune drives, camel trails and lantern-lit dinners in the red sands of Lehbab with people who would rather feel the place than tick it off.
            </p>
          </div>
          <Steps tone="night" chips={["11,000+ guests hosted", "Free cancellation 24h", "Pick-up from your door", "Reply within 30 min"]} />
        </section>

        <StepChips chips={["11,000+ guests hosted", "Free cancellation 24h", "Pick-up from your door", "Reply within 30 min"]} />

        {/* ───────── M5 Split headline around a photo ───────── */}
        <section className="bg-[#0c0a08] pt-[14svh] md:pt-[17svh]" aria-label="Raised by the dunes">
          <h2 className="sr-only">Raised by the dunes</h2>
          <div className="v4-raise" aria-hidden="true">
            <div className="v4-ph overflow-hidden rounded-[4px] bg-[#1a1510]">
              <div className="absolute inset-0" data-parallax="0.1"><Pic name="camel-ride" alt="" sizes="(min-width:768px) 32vw, 66vw" /></div>
            </div>
            <p className="v4-g v4-l z-10"><span className="block"><Split>Raised</Split></span><span className="block"><Split delay={100}>by</Split></span></p>
            <p className="v4-g v4-r z-10"><span className="block"><Split delay={200}>The</Split></span><span className="block"><Split delay={300}>dunes</Split></span></p>
          </div>
        </section>

        {/* ───────── M6 Paragraph + body ───────── */}
        <section className={`${pad} bg-[#0c0a08] pb-[8svh] pt-[12svh] md:pt-[14svh]`} aria-label="How we work">
          <p className="v4-s reveal max-w-[1040px] indent-[16vw] md:indent-[8vw]">
            Unhurried, curious and at home in the red sand, our drivers, guides and camp hosts would rather show you one desert evening <span className="v4-i text-[1.08em]">properly</span> than ten things in a rush.
          </p>
          <div className="reveal mt-12 grid gap-5 text-[14px] leading-[1.62] text-[#efe6d6]/85 md:ml-[24.3%] md:mt-14 md:grid-cols-2 md:gap-10" style={{ ["--d" as string]: "150ms" }}>
            <p>{site.description} Evenings start at your door: a 4x4 collects you at 15:00 and drives out to the high red dunes of Lehbab for dune bashing, sandboarding and a camel ride as the light goes.</p>
            <p>Dinner is a BBQ buffet in a lantern-lit Bedouin camp, followed by Tanoura and fire shows, and you are back at your hotel around 21:30. Groups are kept to six per 4x4. {site.cancellation} {site.response}</p>
          </div>
        </section>

        {/* ───────── WD Trip panels (restyled) ───────── */}
        <section id="safaris" className={`${pad} bg-[#0c0a08] pb-[14svh] pt-[10svh]`} aria-labelledby="v4-safaris">
          <div className="mb-8 flex items-end justify-between gap-6 md:mb-12">
            <h2 id="v4-safaris" className="v4-g"><Split>The safaris</Split></h2>
            <p className="hidden max-w-[16ch] pb-2 text-right md:block"><span className="v4-i block text-[28px] leading-[1.05]">five ways into the red sands</span></p>
          </div>
          <div className="v4-m mb-4 flex justify-between border-t border-[#efe6d6]/20 pt-3 text-[15px] text-[#efe6d6]/70">
            <span>{"{Desert safaris}"}</span><span>0{trips.length} / Choose your evening</span>
          </div>
          <div className="v4-trips"><TripPanels trips={trips} /></div>
        </section>

        {/* ───────── M7 Sticky centre columns ───────── */}
        <Column
          id="experiences"
          label="Experiences"
          count={tours.length}
          items={journeys.map((j) => ({ href: j.href, img: j.img, cap: `${j.label} · ${j.price}`, alt: j.title }))}
        />
        <Column
          id="evening"
          label="The evening"
          count={evening.length}
          items={evening.map((e) => ({ href: "/experiences/evening-desert-safari", img: e.img, cap: e.cap, alt: e.cap }))}
        />

        {/* ───────── M8 No place like the desert + M9 steps ───────── */}
        <section className="relative h-[210svh] bg-[#0c0a08]" data-scrub="sticky" aria-label="No place like the desert">
          <div className="sticky top-0 h-svh overflow-hidden">
            <div className="absolute inset-0"><Pic name="desert-sunset" alt="Red dunes under a low sun" sizes="100vw" /></div>
            <div className="v4-np-veil absolute inset-0 bg-[#0c0a08]" />
            <h2 className="v4-np-head v4-g absolute inset-x-0 top-[84px] px-4 md:top-[82px] md:px-5">
              <span className="block">No</span>
              <span className="flex justify-between gap-4"><span>Place</span><span className="text-right">Like the</span></span>
              <span className="block text-right">Desert</span>
            </h2>
            <div className="v4-np-cap v4-m absolute inset-x-0 flex justify-between px-4 text-[14px] md:px-5 md:text-[17px]">
              <span>From Dubai to Lehbab</span>
              <span>Dubai 25°12′N 55°16′E</span>
            </div>
          </div>
          <Steps tone="sand" chips={["Pick-up 15:00", "Drop-off 21:30", "16 experiences", "Up to 6 per 4x4"]} />
        </section>

        {/* ───────── M10 Tile grid (pale) ───────── */}
        <section className={`${pad} bg-[#efe6d6] pb-[16svh] pt-12 text-[#1c140d] md:pt-16`} aria-labelledby="v4-incl">
          <ul className="grid grid-cols-3 gap-[6px] md:gap-[21px]">
            {included.slice(0, 1).map((x) => <Tile key={x.t} {...x} n={1} />)}
            <li className="flex aspect-square flex-col items-center justify-center text-center md:aspect-[5/4]">
              <h2 id="v4-incl" className="text-[12px] leading-tight md:text-[17px]">Included<span className="v4-m ml-1 align-super text-[11px]">™</span></h2>
              <p className="v4-i mt-1 text-[14px] leading-tight md:text-[22px]">in every evening</p>
            </li>
            {included.slice(1).map((x, i) => <Tile key={x.t} {...x} n={i + 2} />)}
          </ul>
        </section>

        {/* ───────── M11 Contact ───────── */}
        <section id="contact" className={`${pad} bg-[#efe6d6] pb-[14svh] text-[#1c140d]`} aria-labelledby="v4-contact">
          <h2 id="v4-contact" className="sr-only">Contact</h2>
          <p className="v4-s reveal max-w-[1380px] indent-[16vw] md:indent-[8vw]">
            Reach out to plan your evening in the dunes. A real person replies within 30 minutes, day and night, and you can cancel for free up to 24 hours before.
          </p>
          <GiantLinks className="mt-[14svh] md:ml-[calc(34.7vw-40px)]" />
        </section>
      </main>

      {/* ───────── M12 Footer ───────── */}
      <Footer />
    </div>
  );
}

function Tile({ t, s, n }: { t: string; s: string; n: number }) {
  const mark =
    s === "g" ? "text-[13px] font-medium uppercase tracking-[-0.03em] md:text-[30px]"
    : s === "s" ? "v4-i text-[17px] md:text-[40px]"
    : "v4-m text-[14px] md:text-[30px]";
  return (
    <li className="reveal relative flex aspect-square items-center justify-center rounded-[4px] border border-[#1c140d]/25 p-2 text-center md:aspect-[5/4]" style={{ ["--d" as string]: `${(n % 3) * 90}ms` }}>
      <span className="v4-m absolute left-2 top-2 text-[12px] text-[#1c140d]/60 md:left-4 md:top-4 md:text-[15px]">{String(n).padStart(2, "0")}</span>
      <span className={`${mark} leading-[1.05]`}>{t}</span>
    </li>
  );
}
