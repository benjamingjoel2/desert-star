import Link from "next/link";
import { Gloock, Figtree } from "next/font/google";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import { getTour, price, type Tour } from "@/lib/tours";
import { site, waLink, categories } from "@/data/site";
import { posts } from "@/data/journal";

const display = Gloock({ subsets: ["latin"], weight: "400", variable: "--t5-display", display: "swap" });
const sans = Figtree({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--t5-sans", display: "swap" });

export const metadata = { title: "Design 5 · Terracotta" };

/* Palette
   terracotta #b4532a (large text / blocks; small text on it uses #fffaf2 = 4.8:1)
   deep terracotta #9a4320 (small text on cream/sand)
   sand #e9d8bd · date-palm #33412f · cream #f7f1e6 · ink #2a2420 */

const serif = "font-[family-name:var(--t5-display)] font-normal tracking-[-0.015em]";
const pad = "px-5 md:px-10";

const nav = [
  { href: "/experiences", label: "Experiences" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/enquire", label: "Enquire" },
];

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" />
    </svg>
  );
}

function Header() {
  return (
    <header className={`relative z-30 bg-[#f7f1e6] ${pad}`}>
      <div className="flex h-16 items-center justify-between gap-6 border-b border-[#2a2420]/10 md:h-20">
        <Link href="/" className={`${serif} flex items-center gap-2 text-[1.45rem] leading-none text-[#2a2420]`}>
          <Star className="h-4 w-4 text-[#b4532a]" />
          Desert Stars
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-9 text-[0.95rem] text-[#2a2420] lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="relative py-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/enquire" className="rounded-full bg-[#33412f] px-5 py-2.5 text-[0.9rem] font-medium text-[#f7f1e6] transition-colors hover:bg-[#b4532a]">
            Enquire
          </Link>
          <details className="group relative lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-[#2a2420]/20 text-[#2a2420] [&::-webkit-details-marker]:hidden" aria-label="Menu">
              <span className="block h-[7px] w-4 border-y border-current transition-transform group-open:rotate-45" />
            </summary>
            <nav aria-label="Mobile" className="absolute right-0 top-12 w-56 rounded-2xl bg-[#33412f] p-2 text-[#f7f1e6] shadow-xl">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className={`${serif} block rounded-xl px-4 py-2.5 text-xl hover:bg-white/10`}>
                  {n.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

function Hero({ lead }: { lead?: Tour }) {
  return (
    <section className="grid lg:min-h-[calc(100svh-5rem)] lg:grid-cols-2">
      <div className={`relative flex flex-col justify-between overflow-hidden bg-[#b4532a] ${pad} pb-10 pt-12 text-[#fffaf2] md:pb-14 md:pt-20`}>
        <Star className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 text-[#fffaf2]/[0.07]" />
        <div>
          <p className="reveal flex items-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.18em]">
            <span className="h-px w-8 bg-current" /> Lehbab red dunes, Dubai
          </p>
          <h1 className={`${serif} mt-7 max-w-[13ch] text-[clamp(2.9rem,7.4vw,6.4rem)] leading-[0.98]`}>
            <Split>An evening in the red dunes, kept just for you.</Split>
          </h1>
          <p className="reveal mt-7 max-w-[34rem] text-[1.075rem] leading-relaxed [--d:250ms] md:text-[1.15rem]">
            We collect you from your door in Dubai, drive you into the dunes for sunset, and bring you to a lantern-lit
            Bedouin camp for a BBQ dinner, Tanoura and fire under the stars.
          </p>
          <div className="reveal mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 [--d:400ms]">
            <Link href="/enquire" className="group inline-flex items-center gap-3 rounded-full bg-[#fffaf2] px-7 py-4 font-medium text-[#33412f] transition-colors hover:bg-[#e9d8bd]">
              Plan your evening <Arrow className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={waLink("Hello Desert Stars, I'd like to plan a desert evening.")} className="inline-flex items-center gap-2 border-b border-[#fffaf2]/50 pb-1 font-medium hover:border-[#fffaf2]">
              Message us on WhatsApp
            </a>
          </div>
        </div>
        <dl className="reveal mt-14 grid grid-cols-3 gap-4 border-t border-[#fffaf2]/30 pt-6 text-[0.85rem] [--d:550ms] md:text-[0.95rem]">
          <div>
            <dt className={`${serif} text-[1.6rem] leading-none md:text-[2rem]`}>11,000+</dt>
            <dd className="mt-2 leading-snug">guests hosted</dd>
          </div>
          <div>
            <dt className={`${serif} text-[1.6rem] leading-none md:text-[2rem]`}>24 h</dt>
            <dd className="mt-2 leading-snug">free cancellation</dd>
          </div>
          <div>
            <dt className={`${serif} text-[1.6rem] leading-none md:text-[2rem]`}>30 min</dt>
            <dd className="mt-2 leading-snug">reply, day or night</dd>
          </div>
        </dl>
      </div>

      <div className={`relative flex items-end justify-center bg-[#e9d8bd] ${pad} pb-10 pt-10 md:pb-14 lg:pt-16`}>
        <div className="relative w-full max-w-[560px]">
          <div className="hero-zoom relative aspect-[4/5] w-full overflow-hidden rounded-t-full">
            <Pic name="dunes-cruiser" priority sizes="(min-width:1024px) 42vw, 92vw" alt="A desert cruiser cresting the red dunes of Lehbab at golden hour" />
          </div>
          {lead && (
            <Link
              href={`/experiences/${lead.slug}`}
              className="reveal absolute -left-1 bottom-8 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[#33412f] p-4 text-center text-[#f7f1e6] shadow-[0_20px_40px_-20px_rgba(42,36,32,.6)] transition-transform [--d:700ms] hover:-rotate-6 md:-left-10 md:h-40 md:w-40"
            >
              <span className="text-[0.7rem] uppercase tracking-[0.16em] text-[#d9c6a5]">Premium evening</span>
              <span className={`${serif} mt-1 text-[1.15rem] leading-tight md:text-[1.4rem]`}>{price(lead)}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className={`bg-[#f7f1e6] ${pad} py-20 md:py-32`}>
      <div className="grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="reveal text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[#9a4320]">A small desert house</p>
          <p className={`${serif} reveal mt-6 text-[clamp(1.9rem,3.9vw,3.4rem)] leading-[1.12] text-[#2a2420] [--d:120ms]`}>
            We host the desert the way a good friend would. Unhurried, generous and a little bit magic, from the first
            cup of Arabic coffee to the <span className="text-[#b4532a]">last star</span> on the drive home.
          </p>
        </div>
        <div className="flex items-end gap-5 lg:col-span-4 lg:justify-end">
          <div className="reveal-img relative aspect-[3/4] w-40 shrink-0 overflow-hidden rounded-t-full md:w-56">
            <Pic name="camel-caravan" sizes="(min-width:768px) 224px, 160px" alt="A camel caravan walking across the dunes" />
          </div>
          <p className="reveal max-w-[16rem] pb-2 text-[0.95rem] leading-relaxed text-[#5c5148] [--d:200ms]">
            Camel rides, sandboarding and a falcon on the glove. Every evening is led by our own team, from pick-up to
            drop-off.
          </p>
        </div>
      </div>
    </section>
  );
}

const bands = [
  { bg: "bg-[#e9d8bd]", text: "text-[#2a2420]", muted: "text-[#4a3f37]", accent: "text-[#9a4320]", rule: "border-[#2a2420]/15", btn: "bg-[#33412f] text-[#f7f1e6] hover:bg-[#b4532a]", arch: true },
  { bg: "bg-[#33412f]", text: "text-[#f7f1e6]", muted: "text-[#e9d8bd]", accent: "text-[#e9d8bd]", rule: "border-[#f7f1e6]/20", btn: "bg-[#f7f1e6] text-[#33412f] hover:bg-[#e9d8bd]", arch: false },
  { bg: "bg-[#f7f1e6]", text: "text-[#2a2420]", muted: "text-[#5c5148]", accent: "text-[#9a4320]", rule: "border-[#2a2420]/15", btn: "bg-[#b4532a] text-[#fffaf2] hover:bg-[#33412f]", arch: true },
  { bg: "bg-[#b4532a]", text: "text-[#fffaf2]", muted: "text-[#fffaf2]", accent: "text-[#fffaf2]", rule: "border-[#fffaf2]/30", btn: "bg-[#fffaf2] text-[#33412f] hover:bg-[#e9d8bd]", arch: false },
];

const featured: { slug: string; image: string; alt: string; note: string }[] = [
  { slug: "premium-evening-desert-safari", image: "premium-evening-1", alt: "Guests arriving at the premium desert camp at dusk", note: "Our signature" },
  { slug: "standard-sunset-desert-safari", image: "standard-sunset-4", alt: "A couple riding a camel together across the sand", note: "For two" },
  { slug: "premium-morning-desert-safari", image: "premium-morning-1", alt: "Morning light over the red dunes", note: "Early light" },
  { slug: "evening-desert-safari", image: "camel-ride", alt: "A camel ride through the twilight sands", note: "The classic" },
];

function Experiences() {
  const items = featured.map((f) => ({ ...f, tour: getTour(f.slug) })).filter((f): f is typeof f & { tour: Tour } => !!f.tour);
  return (
    <section id="experiences" aria-labelledby="exp-h">
      <div className={`bg-[#f7f1e6] ${pad} pb-14 md:pb-20`}>
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-[#2a2420]/15 pt-10">
          <h2 id="exp-h" className={`${serif} max-w-[16ch] text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1] text-[#2a2420]`}>
            <Split>Four ways into the desert</Split>
          </h2>
          <Link href="/experiences#desert" className="group inline-flex items-center gap-2 border-b border-[#2a2420]/40 pb-1 font-medium text-[#2a2420] hover:border-[#2a2420]">
            All desert safaris <Arrow className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {items.map(({ tour, image, alt, note }, i) => {
        const b = bands[i % bands.length];
        const flip = i % 2 === 1;
        return (
          <article key={tour.slug} className={`${b.bg} ${b.text} ${pad} py-14 md:py-24`}>
            <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
              <Link
                href={`/experiences/${tour.slug}`}
                className={`group block md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : ""}`}
                aria-label={tour.title}
              >
                <div className={`reveal-img zoom relative overflow-hidden ${b.arch ? "aspect-[4/5] rounded-t-full" : "aspect-[5/4] rounded-[4px] md:aspect-[4/5]"}`}>
                  <Pic name={image} sizes="(min-width:768px) 40vw, 92vw" alt={alt} />
                </div>
              </Link>
              <div className={`md:col-span-6 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
                <p className={`reveal flex items-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.18em] ${b.accent}`}>
                  <span className={`${serif} text-[1.1rem] normal-case tracking-normal`}>0{i + 1}</span>
                  <span className="h-px w-8 bg-current opacity-60" />
                  {note}
                </p>
                <h3 className={`${serif} reveal mt-5 text-[clamp(2rem,4vw,3.4rem)] leading-[1.04] [--d:80ms]`}>
                  <Link href={`/experiences/${tour.slug}`} className="hover:underline hover:decoration-1 hover:underline-offset-[6px]">
                    {tour.title}
                  </Link>
                </h3>
                <p className={`reveal mt-5 max-w-[36rem] text-[1.05rem] leading-relaxed ${b.muted} [--d:160ms]`}>{tour.short}</p>
                <dl className={`reveal mt-8 grid max-w-[36rem] grid-cols-2 border-y ${b.rule} [--d:220ms]`}>
                  <div className={`border-r ${b.rule} py-4 pr-4`}>
                    <dt className={`text-[0.75rem] uppercase tracking-[0.16em] ${b.muted}`}>Timing</dt>
                    <dd className="mt-1 font-medium">{tour.timing}</dd>
                  </div>
                  <div className="py-4 pl-5">
                    <dt className={`text-[0.75rem] uppercase tracking-[0.16em] ${b.muted}`}>Per adult</dt>
                    <dd className={`${serif} mt-1 text-[1.35rem] leading-tight`}>{price(tour)}</dd>
                  </div>
                </dl>
                <Link href={`/experiences/${tour.slug}`} className={`reveal group mt-8 inline-flex items-center gap-3 rounded-full px-6 py-3.5 font-medium transition-colors [--d:280ms] ${b.btn}`}>
                  See the experience <Arrow className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

const moreImages: Record<string, { image: string; alt: string }> = {
  city: { image: "mosque-1", alt: "The white domes of Sheikh Zayed Grand Mosque" },
  cruises: { image: "dubai-night", alt: "Dubai lit up at night from the water" },
  attractions: { image: "burj-palms", alt: "Burj Khalifa rising behind palm trees" },
};

function Beyond() {
  const more = categories.filter((c) => c.slug !== "desert");
  return (
    <section aria-labelledby="beyond-h" className={`bg-[#f7f1e6] ${pad} py-20 md:py-28`}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="reveal text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[#9a4320]">Beyond the dunes</p>
          <h2 id="beyond-h" className={`${serif} reveal mt-5 text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] text-[#2a2420] [--d:80ms]`}>
            The Emirates, arranged with the same care.
          </h2>
        </div>
        <ul className="border-t border-[#2a2420]/15 lg:col-span-8">
          {more.map((c, i) => {
            const m = moreImages[c.slug];
            return (
              <li key={c.slug} className="reveal border-b border-[#2a2420]/15" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <Link href={`/experiences#${c.slug}`} className="group grid grid-cols-[84px_1fr_auto] items-center gap-5 py-5 md:grid-cols-[128px_1fr_auto] md:gap-8 md:py-6">
                  <div className={`relative aspect-square overflow-hidden ${i === 1 ? "rounded-t-full" : "rounded-[4px]"}`}>
                    <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                      <Pic name={m.image} sizes="128px" alt={m.alt} />
                    </div>
                  </div>
                  <div>
                    <h3 className={`${serif} text-[1.6rem] leading-tight text-[#2a2420] transition-colors group-hover:text-[#b4532a] md:text-[2.2rem]`}>{c.name}</h3>
                    <p className="mt-1 text-[0.95rem] text-[#5c5148]">{c.blurb}</p>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2a2420]/20 text-[#2a2420] transition-colors group-hover:border-[#b4532a] group-hover:bg-[#b4532a] group-hover:text-[#fffaf2]">
                    <Arrow />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const evening = [
  { time: "15:00", title: "Pick-up from your door", text: "An air-conditioned 4x4 collects you from your hotel or home anywhere in Dubai." },
  { time: "16:15", title: "Into the Lehbab red dunes", text: "Your driver lets the air out of the tyres and takes the high red dunes at your pace." },
  { time: "17:30", title: "Sunset, sand and camels", text: "Sandboarding, a camel ride and photographs as the sky turns copper." },
  { time: "18:30", title: "The camp, lantern-lit", text: "Arabic coffee and dates on arrival, a short camel ride and a falcon to meet." },
  { time: "19:30", title: "BBQ dinner under the stars", text: "A BBQ dinner served in the camp, with the dunes all around." },
  { time: "20:15", title: "Tanoura and fire", text: "A whirling Tanoura dancer, then fire performers lighting up the dark." },
  { time: "21:30", title: "Home, sandy and happy", text: "The drive back to your door, with the city lights rising ahead." },
];

function Evening() {
  return (
    <section aria-labelledby="eve-h" className={`bg-[#33412f] text-[#f7f1e6] ${pad} py-20 md:py-32`}>
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-10">
            <p className="reveal text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[#d9c6a5]">Hour by hour</p>
            <h2 id="eve-h" className={`${serif} mt-5 text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.98]`}>
              <Split>The evening</Split>
            </h2>
            <p className="reveal mt-6 max-w-[26rem] text-[1.05rem] leading-relaxed text-[#e9d8bd] [--d:150ms]">
              A typical premium evening. Times follow the sun, so they shift a little with the season.
            </p>
            <div className="reveal-img mt-10 hidden aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-t-full lg:block">
              <Pic name="premium-evening-2" sizes="360px" alt="Guests watching the sun go down from the top of a dune" />
            </div>
          </div>
        </div>
        <ol className="relative lg:col-span-7 lg:pt-4">
          <span aria-hidden="true" className="absolute bottom-3 left-[5px] top-3 w-px bg-[#f7f1e6]/20 md:left-[7px]" />
          {evening.map((e, i) => (
            <li key={e.time} className="reveal relative grid grid-cols-[auto_1fr] gap-x-6 pb-10 last:pb-0 md:gap-x-10 md:pb-14" style={{ ["--d" as string]: `${i * 40}ms` }}>
              <span aria-hidden="true" className={`relative mt-3 h-[11px] w-[11px] rounded-full md:h-[15px] md:w-[15px] ${i === 4 ? "bg-[#b4532a] ring-4 ring-[#b4532a]/30" : "bg-[#e9d8bd]"}`} />
              <div className="grid gap-x-8 md:grid-cols-[150px_1fr]">
                <p className={`${serif} text-[2.2rem] leading-none text-[#e9d8bd] md:text-[2.8rem]`}>{e.time}</p>
                <div className="mt-3 md:mt-1">
                  <h3 className="text-[1.2rem] font-semibold md:text-[1.3rem]">{e.title}</h3>
                  <p className="mt-2 max-w-[30rem] leading-relaxed text-[#e9d8bd]">{e.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Camp() {
  return (
    <section aria-labelledby="camp-h" className={`overflow-hidden bg-[#f7f1e6] ${pad} py-20 md:py-32`}>
      <div className="grid gap-6 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-5">
          <p className="reveal text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[#9a4320]">The camp</p>
          <h2 id="camp-h" className={`${serif} mt-5 text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[1] text-[#2a2420]`}>
            <Split>Lanterns, smoke and a long table.</Split>
          </h2>
          <p className="reveal mt-6 max-w-[28rem] text-[1.05rem] leading-relaxed text-[#5c5148] [--d:150ms]">
            Our camp sits low among the dunes, lit by lanterns rather than floodlights. Come hungry, stay late, and let the
            evening unfold around the fire.
          </p>
        </div>
        <figure className="md:col-span-6 md:col-start-7 md:row-span-2">
          <div className="reveal-img relative aspect-[4/5] overflow-hidden rounded-t-full">
            <Pic name="camp-lanterns" sizes="(min-width:768px) 46vw, 92vw" alt="The Bedouin camp glowing with lanterns after dark" />
          </div>
          <figcaption className="mt-3 flex justify-between text-[0.85rem] text-[#5c5148]">
            <span>The lantern-lit Bedouin camp</span><span>Lehbab</span>
          </figcaption>
        </figure>

        <figure className="mt-8 md:col-span-4 md:mt-4">
          <div className="reveal-img relative aspect-[5/4] overflow-hidden rounded-[4px]">
            <Pic name="premium-evening-4" sizes="(min-width:768px) 32vw, 92vw" alt="A BBQ dinner of grilled meats and mezze at the camp" />
          </div>
          <figcaption className="mt-4">
            <h3 className={`${serif} text-[1.6rem] text-[#2a2420]`}>BBQ dinner</h3>
            <p className="mt-1 text-[0.95rem] leading-relaxed text-[#5c5148]">A generous BBQ dinner, served at low tables among the lanterns.</p>
          </figcaption>
        </figure>

        <figure className="mt-6 grid grid-cols-2 gap-5 md:col-span-7 md:mt-16 md:gap-8">
          <div>
            <div className="reveal-img relative aspect-[3/4] overflow-hidden rounded-t-full">
              <Pic name="combo-mosque-3" sizes="(min-width:768px) 26vw, 45vw" alt="A Tanoura dancer whirling in a coloured skirt" />
            </div>
            <figcaption className="mt-4">
              <h3 className={`${serif} text-[1.4rem] text-[#2a2420] md:text-[1.6rem]`}>Tanoura</h3>
              <p className="mt-1 text-[0.9rem] leading-relaxed text-[#5c5148]">A whirling dance of colour and rhythm.</p>
            </figcaption>
          </div>
          <div className="pt-16 md:pt-28">
            <div className="reveal-img relative aspect-[3/4] overflow-hidden rounded-[4px]">
              <Pic name="standard-sunset-3" sizes="(min-width:768px) 26vw, 45vw" alt="A fire performer spinning flames in the dark" />
            </div>
            <figcaption className="mt-4">
              <h3 className={`${serif} text-[1.4rem] text-[#2a2420] md:text-[1.6rem]`}>Fire show</h3>
              <p className="mt-1 text-[0.9rem] leading-relaxed text-[#5c5148]">Flame against a black desert sky.</p>
            </figcaption>
          </div>
        </figure>

        <figure className="mt-6 flex items-end gap-5 md:col-span-4 md:col-start-9 md:mt-0 md:-translate-y-10 md:flex-col md:items-start">
          <div className="reveal-img relative aspect-[3/4] w-40 shrink-0 overflow-hidden rounded-t-full md:w-full md:max-w-[300px]">
            <Pic name="combo-3in1-3" sizes="(min-width:768px) 300px, 160px" alt="A guest holding a falcon on a leather glove" />
          </div>
          <figcaption>
            <h3 className={`${serif} text-[1.4rem] text-[#2a2420] md:text-[1.6rem]`}>The falcon</h3>
            <p className="mt-1 max-w-[18rem] text-[0.9rem] leading-relaxed text-[#5c5148]">Meet the bird at the heart of Emirati heritage, on your own glove.</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section aria-label="Desert Stars in numbers" className={`bg-[#e9d8bd] ${pad} py-16 md:py-24`}>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {site.stats.map((s, i) => (
          <div key={s.label} className="reveal border-t border-[#2a2420]/20 pt-5" style={{ ["--d" as string]: `${i * 90}ms` }}>
            <dt className="sr-only">{s.label}</dt>
            <dd className={`${serif} text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] text-[#9a4320]`}>{s.value}</dd>
            <dd className="mt-3 text-[1rem] font-medium text-[#2a2420]">{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function NightSky() {
  return (
    <section aria-label="Night sky" className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-[#1d1915]">
      <div data-parallax="0.15" className="absolute inset-x-0 -top-[15%] -z-10 h-[130%]">
        <Pic name="night-sky" sizes="100vw" alt="The Milky Way over the dunes" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1d1915]/85 via-[#1d1915]/30 to-transparent" />
      <div className={`${pad} w-full pb-14 md:pb-20`}>
        <p className={`${serif} max-w-[20ch] text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.04] text-[#f7f1e6]`}>
          <Split>Far from the city, the sky remembers its stars.</Split>
        </p>
      </div>
    </section>
  );
}

function Journal() {
  const [first, ...rest] = posts;
  const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  if (!first) return null;
  return (
    <section aria-labelledby="jr-h" className={`bg-[#f7f1e6] ${pad} py-20 md:py-32`}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 id="jr-h" className={`${serif} text-[clamp(2.4rem,5vw,4.4rem)] leading-[1] text-[#2a2420]`}>
          <Split>From the journal</Split>
        </h2>
        <Link href="/journal" className="group inline-flex items-center gap-2 border-b border-[#2a2420]/40 pb-1 font-medium text-[#2a2420] hover:border-[#2a2420]">
          Read the journal <Arrow className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Link href={`/journal/${first.slug}`} className="group lg:col-span-7">
          <div className="reveal-img zoom relative aspect-[16/11] overflow-hidden rounded-[4px]">
            <Pic name={first.image} sizes="(min-width:1024px) 56vw, 92vw" alt="" />
          </div>
          <p className="mt-5 text-[0.8rem] font-medium uppercase tracking-[0.16em] text-[#9a4320]">
            {first.category} · {fmt(first.date)}
          </p>
          <h3 className={`${serif} mt-3 max-w-[22ch] text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.08] text-[#2a2420] group-hover:text-[#b4532a]`}>{first.title}</h3>
          <p className="mt-3 max-w-[36rem] leading-relaxed text-[#5c5148]">{first.excerpt}</p>
        </Link>
        <div className="flex flex-col gap-10 lg:col-span-5">
          {rest.slice(0, 2).map((p) => (
            <Link key={p.slug} href={`/journal/${p.slug}`} className="group reveal grid grid-cols-[112px_1fr] gap-5 border-t border-[#2a2420]/15 pt-6 md:grid-cols-[160px_1fr]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-full">
                <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                  <Pic name={p.image} sizes="160px" alt="" />
                </div>
              </div>
              <div>
                <p className="text-[0.75rem] font-medium uppercase tracking-[0.16em] text-[#9a4320]">{p.category}</p>
                <h3 className={`${serif} mt-2 text-[1.35rem] leading-[1.15] text-[#2a2420] group-hover:text-[#b4532a] md:text-[1.6rem]`}>{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-[0.92rem] leading-relaxed text-[#5c5148]">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Enquire() {
  return (
    <section id="enquire" aria-labelledby="enq-h" className={`relative overflow-hidden bg-[#b4532a] text-[#fffaf2] ${pad} py-20 md:py-28`}>
      <Star className="pointer-events-none absolute -bottom-24 left-[38%] h-80 w-80 text-[#fffaf2]/[0.06]" />
      <div className="relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="reveal flex items-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.18em]">
            <span className="h-px w-8 bg-current" /> Talk to a person
          </p>
          <h2 id="enq-h" className={`${serif} mt-6 max-w-[14ch] text-[clamp(2.8rem,6.4vw,5.8rem)] leading-[0.98]`}>
            <Split>Tell us your date. We&rsquo;ll do the rest.</Split>
          </h2>
          <p className="reveal mt-7 max-w-[32rem] text-[1.1rem] leading-relaxed [--d:150ms]">
            {site.response} {site.cancellation}
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center gap-4 [--d:250ms]">
            <a href={waLink("Hello Desert Stars, I'd like to book a desert safari.")} className="group inline-flex items-center gap-3 rounded-full bg-[#fffaf2] px-7 py-4 font-medium text-[#33412f] transition-colors hover:bg-[#e9d8bd]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
              </svg>
              WhatsApp us
            </a>
            <Link href="/enquire" className="group inline-flex items-center gap-3 rounded-full border border-[#fffaf2]/60 px-7 py-4 font-medium transition-colors hover:bg-[#fffaf2]/10">
              Send an enquiry <Arrow className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <dl className="reveal mt-12 grid gap-6 border-t border-[#fffaf2]/30 pt-8 text-[0.95rem] sm:grid-cols-3 [--d:300ms]">
            <div>
              <dt className="text-[0.75rem] uppercase tracking-[0.16em]">Call</dt>
              <dd className="mt-1.5"><a href={site.phoneHref} className="font-medium hover:underline">{site.phone}</a></dd>
            </div>
            <div>
              <dt className="text-[0.75rem] uppercase tracking-[0.16em]">Email</dt>
              <dd className="mt-1.5 break-words"><a href={`mailto:${site.email}`} className="font-medium hover:underline">{site.email}</a></dd>
            </div>
            <div>
              <dt className="text-[0.75rem] uppercase tracking-[0.16em]">Hours</dt>
              <dd className="mt-1.5 font-medium">{site.hours}</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="reveal-img relative mx-auto aspect-[3/4] w-full max-w-[380px] overflow-hidden rounded-t-full border-[10px] border-[#fffaf2]/15 lg:mx-0">
            <Pic name="camel-grazing" sizes="(min-width:1024px) 30vw, 80vw" alt="Camels resting among the dunes in late light" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const desert = categories.map((c) => ({ href: `/experiences#${c.slug}`, label: c.name }));
  return (
    <footer className={`bg-[#33412f] text-[#f7f1e6] ${pad} pb-10 pt-20 md:pt-28`}>
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className={`${serif} max-w-[16ch] text-[clamp(2rem,3.6vw,3rem)] leading-[1.05]`}>Come for the dunes. Stay for the stars.</p>
          <p className="mt-6 max-w-[24rem] leading-relaxed text-[#e9d8bd]">{site.address}</p>
        </div>
        <nav aria-label="Experiences" className="md:col-span-3 md:col-start-7">
          <h2 className="text-[0.75rem] uppercase tracking-[0.16em] text-[#d9c6a5]">Experiences</h2>
          <ul className="mt-4 space-y-2.5">
            {desert.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-[#e9d8bd] hover:underline">{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="text-[0.75rem] uppercase tracking-[0.16em] text-[#d9c6a5]">Desert Stars</h2>
          <ul className="mt-4 space-y-2.5">
            {nav.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-[#e9d8bd] hover:underline">{l.label}</Link></li>
            ))}
            <li><a href={site.phoneHref} className="hover:underline">{site.phone}</a></li>
          </ul>
        </nav>
      </div>
      <p aria-hidden="true" className={`${serif} mt-20 select-none whitespace-nowrap text-[clamp(3.6rem,15.5vw,15rem)] leading-[0.8] text-[#e9d8bd]/90`}>
        Desert Stars
      </p>
      <div className="mt-8 flex flex-col gap-3 border-t border-[#f7f1e6]/20 pt-6 text-[0.85rem] text-[#e9d8bd] md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Desert Stars, Dubai</p>
        <p>{site.cancellation}</p>
      </div>
    </footer>
  );
}

export default function Page() {
  const lead = getTour("premium-evening-desert-safari");
  return (
    <div className={`${display.variable} ${sans.variable} overflow-x-clip bg-[#f7f1e6] font-[family-name:var(--t5-sans)] text-[#2a2420] antialiased`}>
      <Header />
      <main>
        <Hero lead={lead} />
        <Intro />
        <Experiences />
        <Beyond />
        <Evening />
        <Camp />
        <Stats />
        <NightSky />
        <Journal />
        <Enquire />
      </main>
      <Footer />
    </div>
  );
}
