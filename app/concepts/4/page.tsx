import Link from "next/link";
import { Host_Grotesk, VT323, Cormorant_Garamond } from "next/font/google";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import TripPanels from "@/components/TripPanels";
import { tours, getTour, price } from "@/lib/tours";
import { site, waLink } from "@/data/site";

const sans = Host_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--v4-sans" });
const mono = VT323({ subsets: ["latin"], weight: "400", variable: "--v4-mono" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["italic"], variable: "--v4-serif" });

export const metadata = { title: "Variation 4 · Crepel-first" };

const pad = "px-5 md:px-10";
const wa = waLink("Hello Desert Stars, I'd like to plan an evening in the desert.");

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

const giant = [
  { label: "WhatsApp", href: wa, note: "Reply within 30 min", ext: true },
  { label: "Call", href: site.phoneHref, note: site.phone, ext: false },
  { label: "Email", href: `mailto:${site.email}`, note: site.email, ext: false },
  { label: "Enquire", href: "/enquire", note: "Plan your date", ext: false },
];

/* ── Pieces ───────────────────────────────────────────── */
function Steps({ tone, chips }: { tone: "night" | "sand"; chips?: [string, string, string, string] }) {
  const bg = tone === "night" ? "bg-[#0c0a08] text-[#efe6d6]" : "bg-[#efe6d6] text-[#1c140d]";
  const chip = "v4-m hidden md:block";
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[72px] md:h-[130px]">
      <div className={`${bg} absolute left-0 top-0 flex h-[calc(50%+1px)] w-[30%] items-center justify-end pr-5`}><span className={chip}>{chips?.[0]}</span></div>
      <div className={`${bg} absolute right-0 top-0 flex h-[calc(50%+1px)] w-[30%] items-center pl-5`}><span className={chip}>{chips?.[1]}</span></div>
      <div className={`${bg} absolute bottom-0 left-0 flex h-1/2 w-[40%] items-center justify-end pr-5`}><span className={chip}>{chips?.[2]}</span></div>
      <div className={`${bg} absolute bottom-0 right-0 flex h-1/2 w-[40%] items-center pl-5`}><span className={chip}>{chips?.[3]}</span></div>
    </div>
  );
}

function Column({ id, label, count, items }: { id: string; label: string; count: number; items: { href: string; img: string; cap: string; alt: string }[] }) {
  return (
    <section id={id} className="relative bg-[#0c0a08] py-[12svh]" aria-label={label}>
      <ul className="relative mx-auto w-[69vw] md:w-[31.4vw]">
        {items.map((it, i) => (
          <li key={it.img + i}>
            <Link href={it.href} className={`group relative block aspect-[2/3] overflow-hidden bg-[#1a1510] md:aspect-[7/8] ${i === 0 ? "rounded-t-[4px]" : ""} ${i === items.length - 1 ? "rounded-b-[4px]" : ""}`}>
              <div className="absolute inset-0" data-parallax="0.06">
                <div className="h-full w-full transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]">
                  <Pic name={it.img} alt={it.alt} sizes="(min-width:768px) 32vw, 70vw" />
                </div>
              </div>
              <span className="v4-m v4-box absolute bottom-3 left-3 max-w-[calc(100%-24px)] transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">{it.cap}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute inset-0">
        <div className={`sticky top-0 flex h-svh items-center justify-between ${pad}`}>
          <h2 className="text-[24px] leading-none tracking-[-0.02em] [text-shadow:0_1px_12px_rgba(0,0,0,.45)] md:text-[30px]">
            {label}<sup className="ml-1 align-super font-[family-name:var(--v4-mono)] text-[13px] tracking-normal">™ ({String(count).padStart(2, "0")})</sup>
          </h2>
          <Link href="/experiences" className="v4-m v4-link pointer-events-auto [text-shadow:0_1px_12px_rgba(0,0,0,.45)]">Discover</Link>
        </div>
      </div>
    </section>
  );
}

/* ── Page ─────────────────────────────────────────────── */
export default function Page() {
  return (
    <div className={`${sans.variable} ${mono.variable} ${serif.variable} v4 min-h-screen overflow-x-clip bg-[#0c0a08] font-[family-name:var(--v4-sans)] text-[#efe6d6] antialiased selection:bg-[#efe6d6] selection:text-[#0c0a08]`}>
      <style>{`
        .v4 .font-script { font-family: var(--v4-serif), Georgia, serif; }
        @layer components {
        .v4 .v4-g { font-size: clamp(42px, 11vw, 158px); line-height: .8; letter-spacing: -0.05em; text-transform: uppercase; font-weight: 400; }
        .v4 .v4-s { font-size: clamp(23px, 3.2vw, 46px); line-height: 1.08; letter-spacing: -0.03em; font-weight: 400; }
        .v4 .v4-m { font-family: var(--v4-mono), ui-monospace, monospace; font-size: 17px; line-height: 1; text-transform: uppercase; letter-spacing: .03em; }
        .v4 .v4-box { background: #efe6d6; color: #0c0a08; padding: 2px 4px 1px; display: inline-block; }
        .v4 .v4-i { font-family: var(--v4-serif), Georgia, serif; font-style: italic; letter-spacing: -0.01em; }
        .v4 .v4-link { background-image: linear-gradient(currentColor, currentColor); background-size: 0% 1px; background-position: 0 100%; background-repeat: no-repeat; transition: background-size .5s cubic-bezier(.16,1,.3,1); }
        .v4 .v4-link:hover, .v4 .v4-link:focus-visible { background-size: 100% 1px; }
        .v4 .v4-head { mix-blend-mode: difference; }
        .v4 .v4-head:has(details[open]) { mix-blend-mode: normal; }
        .v4 details > summary { list-style: none; }
        .v4 details > summary::-webkit-details-marker { display: none; }
        .v4 details[open] .v4-closed, .v4 details:not([open]) .v4-opened { display: none; }
        .v4 :focus-visible { outline: 1px solid currentColor; outline-offset: 3px; }

        /* Hero: the centre card grows into the full screen */
        .v4 .v4-hero { --cw: 45vw; --ch: 36.5svh; --cy: 41%; }
        @media (min-width: 768px) { .v4 .v4-hero { --cw: 15vw; --ch: 43svh; --cy: 58.6%; } }
        .v4 .v4-card { position: absolute; left: 50%; top: calc(var(--cy) + (50% - var(--cy)) * var(--p, 0));
          width: calc(var(--cw) + (100% - var(--cw)) * var(--p, 0)); height: calc(var(--ch) + (100% - var(--ch)) * var(--p, 0));
          transform: translate(-50%, -50%); border-radius: calc(4px * (1 - var(--p, 0))); overflow: hidden; }
        .v4 .v4-tint { opacity: calc(var(--p, 0) * 1); }
        .v4 .v4-fade { opacity: calc(1 - var(--p, 0) * 2.4); transform: translate3d(0, calc(var(--p, 0) * -8svh), 0); }
        .v4 .v4-navrow { top: var(--cy); opacity: calc(1 - var(--p, 0) * 3); }

        /* Raised by the dunes */
        .v4 .v4-raise { --F: clamp(42px, 11vw, 158px); --pw: 66vw; --pl: 17vw; position: relative; height: calc(var(--F) * .68 + var(--pw) * 1.3333); }
        @media (min-width: 768px) { .v4 .v4-raise { --pw: 31.4vw; --pl: 34.3vw; } }
        .v4 .v4-raise .v4-ph { position: absolute; left: var(--pl); width: var(--pw); top: calc(var(--F) * .68); aspect-ratio: 3 / 4; }
        .v4 .v4-raise .v4-l { position: absolute; top: 0; left: 20px; }
        .v4 .v4-raise .v4-r { position: absolute; top: calc(var(--F) * .8); right: 20px; text-align: right; }
        @media (min-width: 768px) { .v4 .v4-raise .v4-l { left: 18.4vw; } .v4 .v4-raise .v4-r { right: 18vw; } }

        /* No place like the desert */
        .v4 .v4-np-veil { opacity: calc(.55 - var(--p, 0) * .45); }
        .v4 .v4-np-head { opacity: calc(1 - var(--p, 0) * 1.7); transform: translate3d(0, calc(var(--p, 0) * -30svh), 0); }
        .v4 .v4-np-cap { top: calc(62% - var(--p, 0) * 52%); }

        .v4 .v4-giant a { color: #8a7a63; transition: color .45s cubic-bezier(.16,1,.3,1); }
        .v4 .v4-giant a:hover, .v4 .v4-giant a:focus-visible { color: #1c140d; }
        .v4 .v4-field::placeholder { color: #8a7a63; }
        }
      `}</style>

      {/* ───────── M1 Header ───────── */}
      <header className="v4-head fixed inset-x-0 top-0 z-50 flex items-start justify-between px-5 pt-5 md:px-[27px] md:pt-[26px]">
        <Link href="/concepts/4" className="v4-i text-[25px] leading-[0.8] text-[#efe6d6]" aria-label="Desert Stars, home">Desert Stars</Link>
        <div className="flex items-start gap-2">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="v4-m v4-box hover:opacity-80">{"{WhatsApp}"}</a>
          <details>
            <summary className="v4-m v4-box relative z-10 cursor-pointer"><span className="v4-closed">Menu</span><span className="v4-opened">Close</span></summary>
            <div className="fixed inset-0 flex flex-col justify-between overflow-y-auto bg-[#0c0a08] px-5 pb-8 pt-24 text-[#efe6d6] md:px-10">
              <nav aria-label="Menu" className="flex flex-col">
                {[
                  ["Experiences", "/experiences"],
                  ["Desert safaris", "/experiences#desert"],
                  ["Journal", "/journal"],
                  ["About", "/about"],
                  ["Enquire", "/enquire"],
                ].map(([l, h]) => (
                  <Link key={h} href={h} className="v4-g text-[#efe6d6]/45 transition-colors hover:text-[#efe6d6]">{l}</Link>
                ))}
              </nav>
              <div className="v4-m mt-10 flex flex-wrap justify-between gap-4 text-[15px]">
                <a href={site.phoneHref} className="v4-link">{site.phone}</a>
                <a href={`mailto:${site.email}`} className="v4-link">{site.email}</a>
                <span>{site.hours}</span>
              </div>
            </div>
          </details>
        </div>
      </header>

      <main>
        {/* ───────── M2 Hero ───────── */}
        <section className="v4-hero relative h-[240svh]" data-scrub="sticky" aria-label="Born in the dunes">
          <div className="sticky top-0 h-svh overflow-hidden">
            <div className="kenburns absolute inset-0"><Pic name="camel-caravan" alt="A camel caravan crossing the dunes at golden hour" sizes="100vw" priority /></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08]/55 via-[#0c0a08]/15 to-[#0c0a08]/35" />
            <h1 className="v4-fade v4-g absolute inset-x-0 top-[64px] text-center md:top-[26px]">
              <span className="block"><Split>Born in</Split></span>
              <span className="block"><Split delay={140}>the dunes</Split></span>
            </h1>
            <div className="v4-card shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)]">
              <div className="h-full w-full"><Pic name="camp-lanterns" alt="A lantern-lit Bedouin camp at dusk" sizes="100vw" /></div>
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

        <div className={`${pad} grid grid-cols-2 gap-2 bg-[#0c0a08] pt-6 md:hidden`}>
          {["11,000+ guests hosted", "Free cancellation 24h", "Pick-up from your door", "Reply within 30 min"].map((c) => (
            <span key={c} className="v4-m border border-[#efe6d6]/25 px-2 py-2 text-[14px]">{c}</span>
          ))}
        </div>

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
            <span>{"{Desert safaris}"}</span><span>0{trips.length} / Hover to open</span>
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
          <ul className="v4-giant mt-[14svh] md:ml-[calc(34.7vw-40px)]">
            {giant.map((g) => (
              <li key={g.label} className="flex items-start gap-3">
                <a href={g.href} {...(g.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="v4-g block text-[clamp(54px,11vw,158px)]">{g.label}</a>
                <span className="v4-m mt-[0.4em] hidden shrink-0 text-[14px] text-[#1c140d]/70 xl:inline">{g.note}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* ───────── M12 Footer ───────── */}
      <footer className={`${pad} bg-[#efe6d6] pb-8 text-[#1c140d]`}>
        <div className="grid gap-10 md:grid-cols-3 md:gap-5">
          <div className="grid grid-cols-2 gap-5 md:col-span-2">
            <ul className="v4-m space-y-[3px] text-[17px]">
              <li><Link href="/concepts/4" className="v4-link">Home</Link></li>
              <li><Link href="/experiences" className="v4-link">Experiences</Link></li>
              <li><Link href="/experiences#desert" className="v4-link">Desert safaris</Link></li>
            </ul>
            <ul className="v4-m space-y-[3px] text-[17px]">
              <li><Link href="/journal" className="v4-link">Journal</Link></li>
              <li><Link href="/about" className="v4-link">About</Link></li>
              <li><Link href="/enquire" className="v4-link">Enquire</Link></li>
            </ul>
          </div>
          <div>
            <p className="v4-m max-w-[340px] text-[17px] leading-[1.05]">Tell us your date and we will plan the rest.</p>
            <form action="/enquire" method="get" className="mt-6 flex h-[68px] items-center border border-[#1c140d]">
              <label htmlFor="v4-email" className="sr-only">Email address</label>
              <input id="v4-email" name="email" type="email" required placeholder="EMAIL ADDRESS" className="v4-field v4-m h-full min-w-0 flex-1 bg-transparent px-5 text-[17px] text-[#1c140d] outline-none" />
              <button type="submit" className="v4-m h-full px-5 hover:bg-[#1c140d] hover:text-[#efe6d6]">OK</button>
            </form>
            <p className="mt-4 text-[13px] text-[#1c140d]/70">{site.hours}. {site.response}</p>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-[#1c140d]/15 pt-5 text-[13px] text-[#1c140d]/70 md:flex-row md:items-end">
          <span>{site.address}</span>
          <span className="v4-i text-[20px] text-[#1c140d]">Where the dunes meet the stars.</span>
          <span>© {new Date().getFullYear()} Desert Stars</span>
        </div>
      </footer>
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
