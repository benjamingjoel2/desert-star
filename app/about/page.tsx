import Link from "next/link";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import { byCategory, tours } from "@/lib/tours";
import { site, categories } from "@/data/site";
import { shell, pad, V4Style, Header, Footer, Steps, StepChips, GiantLinks } from "@/components/concepts/v4/Chrome";

export const metadata = { title: "About", description: "Desert Stars is a local boutique desert tour operator in Dubai, founded by Mohammed Namil." };

/* ── Data (facts only) ────────────────────────────────── */
const chips: [string, string, string, string] = ["11,000+ guests hosted", "3,000+ journeys completed", "Reply within 30 min", "Free cancellation 24h"];

const practice = [
  { t: "Door to door", d: "Pick-up and drop-off at your hotel or residence within Dubai city limits, in an air-conditioned 4x4." },
  { t: "Small groups", d: "Up to six guests per vehicle on premium safaris, or a private vehicle on request." },
  { t: "One concierge team", d: "The same team from your first message to drop-off, replying within 30 minutes, day and night." },
  { t: "Flexible cancellation", d: "Free cancellation up to 24 hours before the tour." },
  { t: "Every diet catered", d: "Vegetarian, vegan and halal options at camp, and dietary needs noted when you book." },
];



const offer: Record<string, string> = {
  desert: "Evening · Premium evening & BBQ · Morning · Sunset · Self-drive",
  city: "Dubai · Abu Dhabi & the Grand Mosque · Al Ain & Jebel Hafeet · Sharjah",
  cruises: "Dubai Creek · Dubai Marina",
  attractions: "Burj Khalifa At the Top · Ferrari World",
};

/* ── Page ─────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className={shell}>
      <V4Style />
      <style>{`
        @layer components {
        .v4 .v4-tile { transition: background-color .45s cubic-bezier(.16,1,.3,1), color .45s cubic-bezier(.16,1,.3,1); }
        .v4 .v4-tile:hover, .v4 .v4-tile:focus-visible { background: #1c140d; color: #efe6d6; }
        .v4 .v4-tile:hover .v4-dim, .v4 .v4-tile:focus-visible .v4-dim { color: rgba(239,230,214,.7); }
        }
      `}</style>

      <Header />

      <main>
        {/* ───────── Hero: giant 2 lines, centre card grows ───────── */}
        <section className="v4-hero relative h-[240svh]" data-scrub="sticky" aria-label="About Desert Stars">
          <div className="sticky top-0 h-svh overflow-hidden">
            <div className="kenburns absolute inset-0"><Pic name="desert-sunset" alt="Red dunes under a low sun" sizes="100vw" /></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08]/55 via-[#0c0a08]/15 to-[#0c0a08]/35" />
            <h1 className="v4-fade v4-g absolute inset-x-0 top-[64px] text-center md:top-[26px]">
              <span className="sr-only">About Desert Stars: </span>
              <span className="block"><Split>Companions</Split></span>
              <span className="block"><Split delay={140}>in discovery</Split></span>
            </h1>
            <div className="v4-card shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)]">
              <div className="h-full w-full"><Pic name="camel-caravan" alt="A camel caravan crossing the dunes at golden hour" sizes="100vw" priority /></div>
              <div className="v4-tint absolute inset-0 bg-[#0c0a08]/50" />
            </div>
            <nav aria-label="Sections" className="v4-navrow absolute inset-x-0 z-10 grid -translate-y-1/2 grid-cols-4 px-2 text-center md:px-[10vw]">
              {[
                ["Our story", "#story"],
                ["The founder", "#founder"],
                ["What we do", "#what"],
                ["Contact", "#contact"],
              ].map(([l, h]) => (
                <a key={l} href={h} className="v4-m v4-link justify-self-center text-[13px] text-[#efe6d6] [text-shadow:0_1px_10px_rgba(0,0,0,.5)] md:text-[17px]">{l}</a>
              ))}
            </nav>
            <p className="v4-fade v4-m absolute inset-x-0 bottom-6 flex justify-between px-5 text-[14px] md:px-[27px] md:text-[17px]">
              <span>{"{About}"}</span><span>Dubai · UAE</span>
            </p>
          </div>
        </section>

        {/* ───────── Bio statement with inline photo + staircase chips ───────── */}
        <section id="story" className="relative" aria-label="Our story">
          <div className="sticky top-0 h-svh overflow-hidden">
            <Pic name="night-sky" alt="" sizes="100vw" />
            <div className="absolute inset-0 bg-[#0c0a08]/50" />
          </div>
          <div className="relative -mt-[100svh] px-5 pb-[52svh] pt-[38svh] md:px-[18.1vw] md:pb-[60svh] md:pt-[16svh]">
            <p className="v4-m mb-6 text-[15px] text-[#efe6d6]/80">{"{Your adventure architects in the UAE}"}</p>
            <p className="v4-s reveal max-w-[880px]">
              <span className="mb-3 mr-3 inline-block h-[90px] w-[90px] overflow-hidden rounded-[4px] align-bottom md:mb-0 md:h-[122px] md:w-[112px] md:align-[-6px]">
                <Pic name="combo-3in1-3" alt="A guest holding a falcon in the dunes" sizes="120px" />
              </span>
              <br className="md:hidden" />
              We curate journeys through the heart of the Emirates, from the red dunes of Lehbab to the Grand Mosque, and we see ourselves as more than a travel company: <span className="v4-i text-[1.08em]">companions in discovery.</span>
            </p>
          </div>
          <Steps tone="night" chips={chips} />
        </section>

        <StepChips chips={chips} />

        {/* ───────── Split headline around a photo ───────── */}
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

        {/* ───────── Promise + how we work ───────── */}
        <section className={`${pad} bg-[#0c0a08] pb-[12svh] pt-[12svh] md:pt-[14svh]`} aria-labelledby="v4-promise">
          <h2 id="v4-promise" className="sr-only">Our promise</h2>
          <p className="v4-s reveal max-w-[1040px] indent-[16vw] md:indent-[8vw]">
            Our promise is simple: <span className="v4-i text-[1.08em]">authentic, seamless and exciting</span> adventures, from the first message to the drive home.
          </p>
          <div className="reveal mt-12 grid gap-5 text-[14px] leading-[1.62] text-[#efe6d6]/85 md:ml-[24.3%] md:mt-14 md:grid-cols-2 md:gap-10" style={{ ["--d" as string]: "150ms" }}>
            <p>Desert Stars is a Dubai-based travel agency offering tours and experiences across the UAE: desert safaris in the red dunes of Lehbab, guided days in Dubai, Abu Dhabi, Al Ain and Sharjah, dhow dinner cruises on Dubai Creek and Dubai Marina, and tickets for Burj Khalifa At the Top and Ferrari World.</p>
            <p>We work door to door and in small groups, with one concierge team looking after you from your first message to drop-off. Dietary needs are catered for and plans can change: {site.cancellation} {site.response}</p>
          </div>

          <div className="mt-[12svh] md:ml-[24.3%]">
            <div className="v4-m mb-3 flex justify-between text-[15px] text-[#efe6d6]/70">
              <span>{"{How we work}"}</span><span>0{practice.length}</span>
            </div>
            <ol className="border-t border-[#efe6d6]/20">
              {practice.map((p, i) => (
                <li key={p.t} className="reveal grid grid-cols-[44px_1fr] gap-x-3 gap-y-1 border-b border-[#efe6d6]/20 py-4 md:grid-cols-[64px_minmax(0,1fr)_minmax(0,1.3fr)] md:items-baseline md:gap-6 md:py-5" style={{ ["--d" as string]: `${i * 60}ms` }}>
                  <span className="v4-m text-[15px] text-[#efe6d6]/60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[21px] leading-[1.1] tracking-[-0.02em] md:text-[30px]">{p.t}</span>
                  <span className="col-start-2 text-[14px] leading-[1.55] text-[#efe6d6]/75 md:col-start-auto">{p.d}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── The founder (name and bio to come) ───────── */}
        <section id="founder" className={`${pad} bg-[#0c0a08] pb-[16svh] pt-[16svh]`} aria-labelledby="v4-founders">
          <div className="grid gap-6 rounded-[4px] border border-[#efe6d6]/25 p-5 md:grid-cols-3 md:gap-5 md:p-8">
            <div className="flex items-start justify-between md:flex-col">
              <h2 id="v4-founders" className="text-[24px] leading-none tracking-[-0.02em] md:text-[30px]">
                The founder<sup className="ml-1 align-super font-[family-name:var(--v4-mono)] text-[13px] tracking-normal">™</sup>
              </h2>
              <span className="v4-m text-[15px] text-[#efe6d6]/60">{"{Desert Stars}"}</span>
            </div>
            <figure className="reveal-img relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[4px] bg-[#1a1510] [&_img]:object-[70%_center]">
              <Pic name="founder" alt="Mohammed Namil, founder of Desert Stars" sizes="(min-width:768px) 30vw, 90vw" />
              <figcaption className="v4-m v4-box absolute bottom-3 left-3">Mohammed Namil · Founder</figcaption>
            </figure>
            <div className="flex flex-col justify-between gap-6 text-[14px] leading-[1.6] text-[#efe6d6]/80">
              <div>
                <p className="text-[34px] leading-[0.95] tracking-[-0.03em] text-[#efe6d6] md:text-[46px]">Mohammed Namil</p>
                <p className="v4-m mt-2 text-[15px] text-[#efe6d6]/60">Founder</p>
                <p className="v4-i mt-6 text-[24px] leading-[1.12] text-[#efe6d6] md:text-[30px]">Mohammed Namil founded Desert Stars to share the desert the way he knows it: door to door, unhurried, and ending under the stars.</p>
              </div>
              <div className="space-y-5">
                <p>Full profile coming soon. In the meantime, every message is answered by the concierge team at our One Central office, daily from 08:00 to 22:00 UAE time.</p>
                <a href="/enquire" className="v4-m v4-box hover:opacity-80">{"{Write to us}"}</a>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Full-bleed split statement + steps into sand ───────── */}
        <section className="relative h-[210svh] bg-[#0c0a08]" data-scrub="sticky" aria-label="From the dunes to the city">
          <div className="sticky top-0 h-svh overflow-hidden">
            <div className="absolute inset-0"><Pic name="dubai-skyline" alt="The Dubai skyline in the evening" sizes="100vw" /></div>
            <div className="v4-np-veil absolute inset-0 bg-[#0c0a08]" />
            <h2 className="v4-np-head v4-g absolute inset-x-0 top-[84px] px-4 md:top-[82px] md:px-5">
              <span className="block">From the</span>
              <span className="flex justify-between gap-4"><span>Dunes</span><span className="text-right">to the</span></span>
              <span className="block text-right">City</span>
            </h2>
            <div className="v4-np-cap v4-m absolute inset-x-0 flex justify-between gap-4 px-4 text-[14px] md:px-5 md:text-[17px]">
              <span><span className="md:hidden">Lehbab · Dubai</span><span className="hidden md:inline">Lehbab · Dubai · Abu Dhabi · Al Ain · Sharjah</span></span>
              <span className="shrink-0 text-right">Dubai 25°12′N 55°16′E</span>
            </div>
          </div>
          <Steps tone="sand" chips={["Office 4, One Central", "Open daily 08:00–22:00", `${tours.length} experiences`, "Pick-up from your door"]} />
        </section>

        {/* ───────── What we do: bordered tile grid (MC "Supported by") ───────── */}
        <section id="what" className={`${pad} bg-[#efe6d6] pb-[16svh] pt-12 text-[#1c140d] md:pt-16`} aria-labelledby="v4-what">
          <ul className="grid grid-cols-2 gap-[6px] md:grid-cols-3 md:gap-[21px]">
            {categories.slice(0, 1).map((c, i) => <CatTile key={c.slug} slug={c.slug} name={c.name} blurb={c.blurb} n={i + 1} />)}
            <li className="order-first col-span-2 flex flex-col items-center justify-center py-10 text-center md:order-none md:col-span-1 md:aspect-[5/4] md:py-0">
              <h2 id="v4-what" className="text-[17px] leading-tight">What we do<span className="v4-m ml-1 align-super text-[11px]">™</span></h2>
              <p className="v4-i mt-1 text-[22px] leading-tight">across the Emirates</p>
            </li>
            {categories.slice(1).map((c, i) => <CatTile key={c.slug} slug={c.slug} name={c.name} blurb={c.blurb} n={i + 2} />)}
            <li className="reveal" style={{ ["--d" as string]: "180ms" }}>
              <Link href="/experiences" className="v4-tile relative flex aspect-[4/5] flex-col items-center justify-center rounded-[4px] border border-[#1c140d]/25 p-3 text-center md:aspect-[5/4]">
                <span className="v4-m v4-dim absolute left-3 top-3 text-[13px] text-[#1c140d]/60 md:left-4 md:top-4 md:text-[15px]">05</span>
                <span className="v4-m text-[44px] leading-none md:text-[72px]">{tours.length}</span>
                <span className="mt-2 text-[15px] leading-tight md:text-[22px]">experiences, all of them</span>
                <span className="v4-m v4-dim absolute bottom-3 text-[13px] text-[#1c140d]/60 md:bottom-4 md:text-[15px]">{"{See all}"}</span>
              </Link>
            </li>
          </ul>
        </section>

        {/* ───────── Where to find us + giant links ───────── */}
        <section id="contact" className={`${pad} bg-[#efe6d6] pb-[14svh] text-[#1c140d]`} aria-labelledby="v4-contact">
          <h2 id="v4-contact" className="v4-m mb-6 text-[15px] text-[#1c140d]/70">{"{Where to find us}"}</h2>
          <p className="v4-s reveal max-w-[1380px] indent-[16vw] md:indent-[8vw]">
            Our office is at One Central in Dubai&apos;s Trade Centre district. Most guests never need to visit: we come to your door, and a real person replies within 30 minutes.
          </p>
          <dl className="mt-12 grid gap-6 border-t border-[#1c140d]/20 pt-5 text-[14px] leading-[1.55] md:ml-[24.3%] md:mt-16 md:grid-cols-3 md:gap-10">
            <div>
              <dt className="v4-m mb-2 text-[15px] text-[#1c140d]/60">{"{Office}"}</dt>
              <dd>{site.address}</dd>
              <dd className="mt-2"><a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="v4-m v4-link text-[15px]">Open in Google Maps ↗</a></dd>
            </div>
            <div>
              <dt className="v4-m mb-2 text-[15px] text-[#1c140d]/60">{"{Hours}"}</dt>
              <dd>Open daily, 08:00 to 22:00 UAE time.</dd>
              <dd className="mt-1">{site.response}</dd>
            </div>
            <div>
              <dt className="v4-m mb-2 text-[15px] text-[#1c140d]/60">{"{Reach us}"}</dt>
              <dd><a href={site.phoneHref} className="v4-link">{site.phone}</a></dd>
              <dd className="mt-1"><a href={`mailto:${site.email}`} className="v4-link break-all">{site.email}</a></dd>
            </div>
          </dl>
          <GiantLinks className="mt-[14svh] md:ml-[calc(34.7vw-40px)]" />
        </section>
      </main>

      <Footer />
    </div>
  );
}

function CatTile({ slug, name, blurb, n }: { slug: string; name: string; blurb: string; n: number }) {
  const count = byCategory(slug as (typeof categories)[number]["slug"]).length;
  return (
    <li className="reveal" style={{ ["--d" as string]: `${(n % 3) * 90}ms` }}>
      <Link href={`/experiences#${slug}`} className="v4-tile relative flex aspect-[4/5] flex-col items-center justify-center rounded-[4px] border border-[#1c140d]/25 p-3 text-center md:aspect-[5/4] md:p-6">
        <span className="v4-m v4-dim absolute left-3 top-3 text-[13px] text-[#1c140d]/60 md:left-4 md:top-4 md:text-[15px]">{String(n).padStart(2, "0")}</span>
        <span className="v4-m v4-dim absolute right-3 top-3 text-[13px] text-[#1c140d]/60 md:right-4 md:top-4 md:text-[15px]">({String(count).padStart(2, "0")})</span>
        <span className="text-[19px] font-medium uppercase leading-[1] tracking-[-0.03em] md:text-[34px]">{name}</span>
        <span className="v4-i mt-2 hidden max-w-[30ch] text-[20px] leading-[1.1] md:block">{blurb}</span>
        <span className="v4-m v4-dim absolute inset-x-3 bottom-3 text-[12px] leading-[1.15] text-[#1c140d]/60 md:inset-x-6 md:bottom-4 md:text-[14px]">{offer[slug]}</span>
      </Link>
    </li>
  );
}
