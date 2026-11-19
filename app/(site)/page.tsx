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

const places = [
  { name: "Lehbab", img: "camel-grazing", note: "The red dunes", href: "/experiences#desert" },
  { name: "Dubai", img: "dubai-skyline", note: "Creek, souks, Burj Khalifa", href: "/experiences/dubai-city-tour" },
  { name: "Abu Dhabi", img: "mosque-1", note: "Grand Mosque, Emirates Palace", href: "/experiences/abu-dhabi-city-tour" },
  { name: "Al Ain", img: "alain-1", note: "Oases and Jebel Hafeet", href: "/experiences/al-ain-city-tour" },
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
      {/* Hero: giant wordmark over a pale desert sky */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-dune">
        <div className="hero-zoom absolute inset-0" data-parallax="0.15">
          <Pic name="dunes-cruiser" priority alt="A 4x4 crossing pale dunes in the Dubai desert" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-sand/60 via-transparent to-black/40" />
        <h1 className="px-page wordmark absolute inset-x-0 top-[16vh] text-[21vw] text-ink lg:top-[14vh] lg:text-[17.4vw]">
          <Split delay={150}>Desert Stars</Split>
        </h1>
        <div className="px-page absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 pb-10 text-white">
          <p className="title fade-in max-w-[22ch] text-[30px] lg:text-[42px]" style={{ ["--d" as string]: "900ms" }}>
            Private evenings in the Arabian desert
          </p>
          <a href="#intro" className="fade-in text-[13px] tracking-[0.2em]" style={{ ["--d" as string]: "1200ms" }}>SCROLL ↓</a>
        </div>
      </section>

      {/* Statement */}
      <section id="intro" className="px-page py-32 lg:py-48">
        <div className="lg:pl-[22%]">
          <div className="reveal mb-8 flex items-center gap-4">
            <Swoosh className="h-8 w-40 opacity-60" />
            <span className="script text-[22px]">The Arabian Desert</span>
          </div>
          <p className="display max-w-[24ch] text-[32px] sm:text-[46px] lg:text-[66px]">
            <Split>Vast, golden and silent: an evening in the dunes of Lehbab stays with you long after the drive home.</Split>
          </p>
          <div className="reveal mt-16 grid max-w-3xl gap-8 text-[16px] leading-relaxed text-muted sm:grid-cols-2 lg:ml-[18%]">
            <p>Every Desert Stars journey begins at your door in Dubai. Air-conditioned 4x4s carry up to six guests across the red dunes to a camp lit by lanterns.</p>
            <p>More than 11,000 guests have spent an evening with us in the desert, on the water and across the seven emirates.</p>
          </div>
        </div>
      </section>

      {/* Experiences: expanding panels */}
      <section id="experiences" className="px-page pb-32 lg:pb-44">
        <div className="relative mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-[46px] leading-none lg:text-[88px]"><Split>Our experiences</Split></h2>
          <Swoosh className="absolute -bottom-8 left-[8%] h-12 w-[min(70vw,520px)] opacity-50" />
          <Link href="/experiences" className="btn btn-line">All {tours.length} experiences</Link>
        </div>
        <div className="reveal"><TripPanels trips={trips} /></div>
      </section>

      {/* Destinations: giant words, photo on hover */}
      <section id="destinations" className="px-page border-t border-line py-28 lg:py-40">
        <p className="script mb-12 text-[26px]">Where we take you</p>
        <ul>
          {places.map((p, i) => (
            <li key={p.name} className="group relative border-b border-line">
              <Link href={p.href} className="grid items-center gap-4 py-6 lg:grid-cols-[1fr_auto] lg:py-8">
                <span className="wordmark text-[16vw] transition-colors duration-500 group-hover:text-ember lg:text-[9vw]">{p.name}</span>
                <span className="text-[14px] text-muted">{String(i + 1).padStart(2, "0")} · {p.note}</span>
              </Link>
              <div className="pointer-events-none absolute right-[22%] top-1/2 hidden h-[300px] w-[230px] overflow-hidden opacity-0 transition-[opacity,transform] duration-700 [transform:translateY(-40%)_rotate(-3deg)] group-hover:opacity-100 group-hover:[transform:translateY(-50%)_rotate(2deg)] lg:block">
                <Pic name={p.img} sizes="230px" />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Strip band */}
      <section aria-label="Moments in the desert" className="grid h-[72svh] min-h-[460px] grid-cols-3 gap-1 lg:grid-cols-6">
        {["camel-ride", "camp-lanterns", "premium-morning-4", "combo-mosque-3", "camel-grazing", "desert-sunset"].map((n, i) => (
          <div key={n} className={`reveal-img overflow-hidden ${i % 2 ? "mt-16" : ""} ${i > 2 ? "max-lg:hidden" : ""}`} style={{ ["--d" as string]: `${i * 120}ms` }}>
            <Pic name={n} sizes="(min-width:1024px) 17vw, 33vw" />
          </div>
        ))}
      </section>

      {/* Brand line */}
      <section className="px-page grid gap-10 py-32 lg:grid-cols-[1fr_2fr] lg:py-44">
        <span className="script text-[90px] leading-none text-muted/60">“</span>
        <div>
          <p className="title max-w-[30ch] text-[32px] leading-[1.25] lg:text-[48px]">
            <Split>The desert is not empty. It is full of things you only notice once the engine stops and the stars come out.</Split>
          </p>
          <p className="reveal mt-8 text-[13px] tracking-[0.2em]">THE DESERT STARS GUIDES</p>
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-ink text-sand">
        <dl className="px-page grid grid-cols-2 lg:grid-cols-4">
          {site.stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col-reverse border-white/15 py-14 lg:py-20 ${i % 2 ? "border-l pl-6" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}>
              <dt className="mt-4 text-[12px] tracking-[0.2em] text-sand/70">{s.label.toUpperCase()}</dt>
              <dd className="wordmark text-[64px] lg:text-[112px]" data-count={/\d/.test(s.value) && !s.value.includes("/") ? s.value : undefined}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Journal */}
      <section className="px-page py-28 lg:py-40">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-[40px] leading-none lg:text-[72px]"><Split>The journal</Split></h2>
          <Link href="/journal" className="btn btn-line">All stories</Link>
        </div>
        <div className="grid gap-12 md:grid-cols-3 md:gap-6">
          {posts.map((p, i) => (
            <Link key={p.slug} href={`/journal/${p.slug}`} className="group">
              <div className="zoom reveal-img aspect-[4/5] overflow-hidden bg-dune" style={{ ["--d" as string]: `${i * 150}ms` }}><Pic name={p.image} sizes="(min-width:768px) 33vw, 100vw" /></div>
              <p className="eyebrow mt-5 text-muted">{p.category}</p>
              <h3 className="title mt-2 text-[28px]">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Enquire */}
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
        </div>
      </section>
    </>
  );
}
