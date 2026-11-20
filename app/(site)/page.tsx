import Link from "next/link";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import TripPanels from "@/components/TripPanels";
import { site, waLink } from "@/data/site";
import { posts } from "@/data/journal";
import { cover, getTour, price, tours } from "@/lib/tours";

function Swoosh({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 60" className={className} fill="none" aria-hidden="true">
      <path d="M2 38 C 90 6, 250 8, 418 30 M40 52 C 150 30, 300 34, 400 44" stroke="currentColor" strokeWidth="1" className="draw-line" />
    </svg>
  );
}

/** Words that fill from pale to ink as the section scrolls past (White Desert). */
function FillWords({ text, before = "", inlineImg }: { text: string; before?: string; inlineImg?: string }) {
  const words = text.split(" ");
  const n = words.length;
  return (
    <p className="fill-words display text-[30px] sm:text-[44px] lg:text-[62px]" data-scrub="pass" aria-label={`${before} ${text}`.trim()}>
      {before && <span aria-hidden="true">{before} </span>}
      {inlineImg && (
        <span aria-hidden="true" className="mx-2 inline-block h-[0.8em] w-[1.3em] overflow-hidden rounded-[3px] align-[-0.05em]"><Pic name={inlineImg} sizes="120px" /></span>
      )}
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="fw" style={{ ["--i" as string]: i, ["--n" as string]: n }}>{w} </span>
      ))}
    </p>
  );
}

const evening = [
  { time: "15:00", title: "Pick-up at your door", img: "premium-morning-1" },
  { time: "15:45", title: "Into the red dunes", img: "premium-evening-3" },
  { time: "17:45", title: "Camels at golden hour", img: "camel-caravan" },
  { time: "19:00", title: "The camp is lit", img: "camp-lanterns" },
  { time: "20:30", title: "Tanoura and fire", img: "standard-sunset-3" },
];

const steps = [
  ["Enquire", "Tell us the experience, your dates and how many are travelling, on WhatsApp or by email."],
  ["Confirm", "We reply within 30 minutes with availability, pick-up time and the final price in writing."],
  ["Pick-up", "Your driver collects you from your hotel or residence anywhere within Dubai city limits."],
  ["The evening", "Dunes, camels, the camp and the stars. Then the drive home, with free cancellation up to 24 hours before."],
];

export default function Home() {
  const trips = [
    "premium-evening-desert-safari",
    "evening-desert-safari",
    "premium-morning-desert-safari",
    "grand-mosque-and-desert-safari",
    "dubai-city-tour",
    "burj-khalifa-at-the-top",
  ].map((s) => {
    const t = getTour(s)!;
    return { href: `/experiences/${t.slug}`, title: t.title, price: price(t), meta: t.timing, text: t.short, img: cover(t) };
  });

  return (
    <>
      {/* 1 · Hero: the card grows to full screen while the wordmark blurs away (Mathieu Crepel + White Desert) */}
      <section className="relative h-[240svh] bg-ink" data-scrub="sticky" aria-label="Desert Stars">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="hero-zoom absolute inset-0"><Pic name="dunes-cruiser" priority alt="A 4x4 crossing pale dunes in the Dubai desert" /></div>
          <div className="absolute inset-0 bg-gradient-to-b from-sand/55 via-transparent to-black/30" />
          <h1 className="hero-mark px-page wordmark absolute inset-x-0 top-[13vh] text-[21vw] text-ink lg:top-[11vh] lg:text-[17.4vw]">
            <Split delay={150}>Desert Stars</Split>
          </h1>
          <div className="hero-card absolute inset-0">
            <Pic name="camp-lanterns" sizes="100vw" low alt="A desert camp lit by lanterns at dusk" />
            <div className="absolute inset-0 bg-black/25" />
          </div>
          <nav aria-label="Sections" className="hero-ui px-page absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-between text-white md:flex">
            {[["/experiences", "Experiences"], ["/experiences#desert", "Desert"], ["/experiences#city", "Cities"]].map(([h, l]) => (
              <Link key={h} href={h} className="mono hover:underline">{l}</Link>
            ))}
            <span className="w-[250px]" aria-hidden="true" />
            {[["/journal", "Journal"], ["/about", "About"], ["/enquire", "Enquire"]].map(([h, l]) => (
              <Link key={h} href={h} className="mono hover:underline">{l}</Link>
            ))}
          </nav>
          <div className="hero-ui px-page absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 pb-8 text-white">
            <p className="title fade-in max-w-[20ch] text-[28px] lg:text-[38px]" style={{ ["--d" as string]: "900ms" }}>Private evenings in the Arabian desert</p>
            <p className="mono fade-in text-right" style={{ ["--d" as string]: "1100ms" }}>Dubai, United Arab Emirates<br />Scroll ↓</p>
          </div>
          <div className="px-page absolute inset-x-0 bottom-0 pb-12 text-white" style={{ opacity: "calc((var(--p, 1) - 0.72) * 4)" }}>
            <p className="mono mb-4">19:00 · Lehbab desert</p>
            <p className="display max-w-[16ch] text-[40px] lg:text-[80px]">Nightfall at the camp</p>
          </div>
        </div>
      </section>

      {/* 2 · Statement: inline photo, words fill as you scroll */}
      <section id="intro" className="grid-lines px-page py-32 lg:py-48">
        <div className="lg:pl-[16.66%]">
          <div className="reveal mb-10 flex items-center gap-4">
            <Swoosh className="h-8 w-40 opacity-60" />
            <span className="script text-[22px]">The Arabian Desert</span>
          </div>
          <FillWords
            before="An evening"
            inlineImg="camel-ride"
            text="in the desert begins at your door in Dubai and ends under more stars than the city will ever show you."
          />
          <div className="reveal mt-16 grid max-w-3xl gap-8 text-[16px] leading-relaxed text-muted sm:grid-cols-2 lg:ml-[33%]">
            <p>Air-conditioned 4x4s carry up to six guests across the red dunes of Lehbab to a camp lit by lanterns, with a falcon to hold, a camel to ride and dinner from the grill.</p>
            <p>Beyond the dunes, our guides take you to the Grand Mosque in Abu Dhabi, the oases of Al Ain and the old souks of Dubai and Sharjah.</p>
          </div>
        </div>
      </section>

      {/* 3 · Mono credentials + split headline around a photo (Mathieu Crepel) */}
      <section className="steps-top relative bg-ink text-sand">
        <div className="px-page flex flex-wrap justify-between gap-3 pt-10 lg:pt-14">
          {site.stats.map((s) => (
            <span key={s.label} className="mono mono-box border-sand/40">{s.value} {s.label}</span>
          ))}
        </div>
        <div className="px-page relative py-24 lg:py-36">
          <h2 className="wordmark relative z-10 text-[19vw] lg:text-[13vw]">
            <span className="block"><Split>Where the dunes</Split></span>
            <span className="block text-right"><Split delay={200}>meet the stars</Split></span>
          </h2>
          <div className="reveal-img absolute left-1/2 top-1/2 h-[46vw] w-[34vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden lg:h-[30vw] lg:w-[22vw]">
            <Pic name="desert-sunset" sizes="(min-width:1024px) 22vw, 34vw" alt="" />
          </div>
        </div>
      </section>

      {/* 4 · Experiences (White Desert panels) */}
      <section id="experiences" className="grid-lines px-page py-32 lg:py-44">
        <div className="relative mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-[46px] leading-none lg:text-[88px]"><Split>Our experiences</Split></h2>
          <Swoosh className="absolute -bottom-8 left-[8%] h-12 w-[min(70vw,520px)] opacity-50" />
          <Link href="/experiences" className="btn btn-line">All {tours.length} experiences</Link>
        </div>
        <div className="reveal"><TripPanels trips={trips} /></div>
      </section>

      {/* 5 · The evening: centre column scrolls past fixed side labels (Mathieu Crepel) */}
      <section className="steps-top relative bg-ink text-sand" aria-label="The evening, hour by hour">
        <div className="px-page relative grid grid-cols-1 justify-items-center gap-10 py-24 md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch md:gap-4 lg:py-32">
          <div className="flex w-full justify-between md:hidden">
            <p className="mono">The evening ™</p>
            <Link href="/experiences/premium-evening-desert-safari" className="mono hover:underline">Discover →</Link>
          </div>
          <div className="sticky top-[45vh] hidden self-start md:block">
            <p className="mono">The evening ™</p>
            <p className="title mt-3 hidden max-w-[12ch] text-[26px] lg:block">From pick-up to the last star</p>
          </div>
          <ol className="flex w-full max-w-[420px] flex-col gap-16 md:w-[44vw] lg:w-[24vw]">
            {evening.map((e) => (
              <li key={e.time}>
                <div className="reveal-img aspect-[3/4] overflow-hidden"><Pic name={e.img} sizes="(min-width:1024px) 24vw, 62vw" alt="" /></div>
                <p className="mono mt-4 flex justify-between gap-4"><span>{e.time}</span><span className="text-right">{e.title}</span></p>
              </li>
            ))}
          </ol>
          <div className="sticky top-[45vh] hidden self-start justify-self-end md:block">
            <Link href="/experiences/premium-evening-desert-safari" className="mono hover:underline">Discover →</Link>
          </div>
        </div>
      </section>

      {/* 6 · No place like the desert: giant split words over a full photo, mono captions */}
      <section className="relative h-[100svh] min-h-[620px] overflow-hidden text-white">
        <div className="absolute inset-0" data-parallax="0.15"><Pic name="camel-grazing" sizes="100vw" alt="A camel grazing among the dunes" /></div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="px-page relative flex h-full flex-col justify-between py-10">
          <p className="mono flex justify-between"><span>From the Lehbab dunes</span><span>Dubai · UAE</span></p>
          <h2 className="wordmark text-[18vw] lg:text-[12vw]">
            <span className="block"><Split>No place</Split></span>
            <span className="block text-right"><Split delay={200}>like the desert</Split></span>
          </h2>
          <p className="mono flex justify-between"><span>Oct – May: cool evenings</span><span>Best light 17:00 – 18:00</span></p>
        </div>
      </section>

      {/* 7 · The camp, with vertical strips that wipe across (White Desert) */}
      <section className="relative h-[110svh] min-h-[640px] overflow-hidden text-white" data-scrub="pass">
        <div className="absolute inset-0"><Pic name="camp-lanterns" sizes="100vw" alt="" /></div>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 grid grid-cols-6" aria-hidden="true">
          {[0.9, 0, 1.4, 0, 1.1, 0.6].map((s, i) => (
            <div key={i} className="overflow-hidden">
              {s > 0 && <div className="strip h-full" style={{ ["--s" as string]: s }}><div className="h-full w-[600%]" style={{ marginLeft: `-${i * 100}%` }}><Pic name="desert-sunset" sizes="100vw" /></div></div>}
            </div>
          ))}
        </div>
        <div className="px-page relative grid h-full items-end gap-10 pb-16 lg:grid-cols-[2fr_1fr]">
          <h2 className="display text-[56px] leading-[0.95] lg:text-[120px]"><Split>The camp</Split></h2>
          <div className="reveal max-w-sm bg-black/35 p-6 backdrop-blur-sm">
            <p className="mono mb-3">Lantern-lit · Lehbab</p>
            <p className="text-[15px] leading-relaxed text-white/90">Arabic coffee and dates on arrival, henna and shisha in the majlis, a live buffet from the grill with vegetarian, vegan and halal dishes, then Tanoura, belly dance and fire.</p>
          </div>
        </div>
      </section>

      {/* 8 · Route line (White Desert "CPT – WFR") */}
      <section className="grid-lines px-page py-28 lg:py-40">
        <p className="mono mb-6 text-muted">Your route · evening desert safari</p>
        <h2 className="wordmark text-[17vw] lg:text-[14vw]"><Split>Dubai – Lehbab</Split></h2>
        <ol className="mt-12 grid grid-cols-2 gap-y-8 border-t border-line pt-8 lg:grid-cols-4">
          {[["15:00", "Pick-up, Dubai"], ["15:45", "Dune drive, Lehbab"], ["18:30", "Camp and dinner"], ["21:30", "Drop-off, Dubai"]].map(([t, l]) => (
            <li key={t}><p className="wordmark text-[44px] lg:text-[64px]">{t}</p><p className="mono mt-2 text-muted">{l}</p></li>
          ))}
        </ol>
        <p className="mt-6 text-[13px] text-muted">Times vary with the season and your pick-up area.</p>
      </section>

      {/* 9 · How it works */}
      <section className="px-page grid gap-12 border-t border-line py-28 lg:grid-cols-[1fr_2fr] lg:py-36">
        <h2 className="display text-[36px] lg:text-[48px]"><Split>How it works</Split></h2>
        <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {steps.map(([h, p], i) => (
            <li key={h} className="reveal border-t border-ink pt-5" style={{ ["--d" as string]: `${i * 90}ms` }}>
              <p className="title text-[26px]">{i + 1}. {h}</p>
              <p className="mt-3 text-muted">{p}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 10 · Journal */}
      <section className="px-page border-t border-line py-28 lg:py-40">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-[40px] leading-none lg:text-[72px]"><Split>The journal</Split></h2>
          <Link href="/journal" className="btn btn-line">All stories</Link>
        </div>
        <div className="grid gap-12 md:grid-cols-3 md:gap-6">
          {posts.map((p, i) => (
            <Link key={p.slug} href={`/journal/${p.slug}`} className="group">
              <div className="zoom reveal-img aspect-[4/5] overflow-hidden bg-dune" style={{ ["--d" as string]: `${i * 150}ms` }}><Pic name={p.image} sizes="(min-width:768px) 33vw, 100vw" /></div>
              <p className="mono mt-5 text-muted">{p.category}</p>
              <h3 className="title mt-2 text-[28px]">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 11 · Enquire */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0" data-parallax="0.18"><Pic name="dubai-skyline" sizes="100vw" alt="Dubai at sunset" /></div>
        <div className="absolute inset-0 bg-ink/55" />
        <div className="px-page relative py-32 lg:py-48">
          <h2 className="display text-[44px] leading-[1] lg:text-[96px]"><Split>Begin your journey</Split></h2>
          <p className="reveal mt-6 max-w-md text-white/85">{site.response} Tell us your dates and group size and we&apos;ll hold the right vehicle and camp.</p>
          <div className="reveal mt-10 flex flex-wrap gap-3">
            <Link href="/enquire" className="btn bg-white text-ink hover:bg-sand">Send an enquiry</Link>
            <a href={waLink("Hello Desert Stars, I'd like to plan a desert evening.")} className="btn border border-white hover:bg-white hover:text-ink">WhatsApp {site.phone}</a>
          </div>
          <p className="title mt-20 text-[22px] text-white/80">“The desert is full of things you only notice once the engine stops.”</p>
          <p className="mono mt-2 text-white/60">— The Desert Stars guides</p>
        </div>
      </section>
    </>
  );
}
