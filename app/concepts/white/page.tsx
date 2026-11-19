import type { Metadata } from "next";
import Link from "next/link";
import { Oswald, Marcellus, Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import TripPanels from "@/components/concepts/TripPanels";
import { site, waLink } from "@/data/site";
import { getTour, price } from "@/lib/tours";

const mark = Oswald({ subsets: ["latin"], weight: ["400"], variable: "--c-mark", display: "swap" });
const serif = Marcellus({ subsets: ["latin"], weight: ["400"], variable: "--c-serif", display: "swap" });
const script = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"], style: ["italic"], variable: "--c-script", display: "swap" });
const sans = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500"], variable: "--c-sans", display: "swap" });

export const metadata: Metadata = { title: "Concept 02 · White Desert, bolder" };

const NAVY = "#1d2333";

function Swoosh({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 60" className={className} fill="none" aria-hidden="true">
      <path d="M2 38 C 90 6, 250 8, 418 30 M40 52 C 150 30, 300 34, 400 44" stroke="currentColor" strokeWidth="1" className="draw-line" />
    </svg>
  );
}

const places = [
  { name: "Dubai", img: "dubai-skyline", note: "Creek, souks, Burj Khalifa" },
  { name: "Abu Dhabi", img: "mosque-1", note: "Grand Mosque, Emirates Palace" },
  { name: "Al Ain", img: "alain-1", note: "Oases and Jebel Hafeet" },
  { name: "Lehbab", img: "self-drive-1", note: "The red dunes" },
];

export default function White() {
  const trips = ["premium-evening-desert-safari", "premium-morning-desert-safari", "grand-mosque-and-desert-safari", "dubai-marina-dhow-cruise", "al-ain-city-tour", "burj-khalifa-at-the-top"].map((s) => {
    const t = getTour(s)!;
    return { href: `/experiences/${t.slug}`, title: t.title, price: price(t), meta: t.timing, text: t.short, img: t.images[0] };
  });
  return (
    <div className={`${mark.variable} ${serif.variable} ${script.variable} ${sans.variable} bg-[#fbf9f6] [font-family:var(--c-sans)]`} style={{ color: NAVY }}>
      {/* Header: pill nav */}
      <header className="px-page fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between gap-4">
        <nav className="hidden gap-2 md:flex" aria-label="Primary">
          {[["Experiences", "#experiences"], ["Destinations", "#destinations"], ["About", "/about"]].map(([l, h]) => (
            <a key={l} href={h} className="rounded-full bg-white/80 px-4 py-2.5 text-[13px] backdrop-blur transition-colors hover:bg-[#1d2333] hover:text-white">{l}</a>
          ))}
        </nav>
        <Link href="/concepts/white" className="font-[family-name:var(--c-serif)] text-[15px] tracking-[0.3em] md:hidden">DESERT STARS</Link>
        <Link href="/enquire" className="rounded-full bg-[#1d2333] px-5 py-2.5 text-[13px] text-white transition-opacity hover:opacity-85">Enquire</Link>
      </header>

      {/* Hero: giant wordmark over the sky */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <div className="hero-zoom absolute inset-0" data-parallax="0.15"><Pic name="premium-evening-1" priority alt="A 4x4 crossing the dunes of Lehbab" /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf9f6]/70 via-transparent to-black/45" />
        <h1 className="px-page absolute inset-x-0 top-[15vh] font-[family-name:var(--c-mark)] text-[21vw] uppercase leading-[0.82] tracking-[-0.01em] lg:top-[11vh] lg:text-[17.5vw]">
          <Split delay={150}>Desert Stars</Split>
        </h1>
        <div className="px-page absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 pb-10 text-white">
          <p className="fade-in max-w-[22ch] font-[family-name:var(--c-script)] text-[30px] italic leading-tight lg:text-[40px]" style={{ ["--d" as string]: "900ms" }}>Private evenings in the Arabian desert</p>
          <a href="#intro" className="fade-in text-[13px] tracking-[0.2em]" style={{ ["--d" as string]: "1200ms" }}>SCROLL ↓</a>
        </div>
      </section>

      {/* Statement */}
      <section id="intro" className="px-page py-32 lg:py-48">
        <div className="lg:pl-[22%]">
          <div className="reveal mb-8 flex items-center gap-4">
            <Swoosh className="h-8 w-40 opacity-60" />
            <span className="font-[family-name:var(--c-script)] text-[22px] italic">The Arabian Desert</span>
          </div>
          <p className="max-w-[24ch] font-[family-name:var(--c-serif)] text-[34px] uppercase leading-[1.08] sm:text-[48px] lg:text-[68px]">
            <Split>Vast, golden and silent: an evening in the dunes of Lehbab stays with you long after the drive home.</Split>
          </p>
          <div className="reveal mt-16 grid max-w-3xl gap-8 text-[15px] leading-relaxed text-[#1d2333]/75 sm:grid-cols-2 lg:ml-[18%]">
            <p>Every Desert Stars journey begins at your door in Dubai. Air-conditioned 4x4s carry up to six guests across the red dunes to a camp lit by lanterns.</p>
            <p>More than 11,000 guests have spent an evening with us in the desert, on the water and across the seven emirates.</p>
          </div>
        </div>
      </section>

      {/* Trips */}
      <section id="experiences" className="px-page pb-32 lg:pb-44">
        <div className="relative mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-[family-name:var(--c-serif)] text-[48px] uppercase leading-none lg:text-[88px]"><Split>Our experiences</Split></h2>
          <Swoosh className="absolute -bottom-8 left-[8%] h-12 w-[min(70vw,520px)] opacity-50" />
          <Link href="/experiences" className="rounded-full border border-current px-5 py-2.5 text-[13px] transition-colors hover:bg-[#1d2333] hover:text-white">All 16 experiences</Link>
        </div>
        <div className="reveal"><TripPanels trips={trips} /></div>
      </section>

      {/* Destinations: giant words */}
      <section id="destinations" className="px-page border-t border-[#1d2333]/15 py-28 lg:py-40">
        <p className="mb-12 font-[family-name:var(--c-script)] text-[24px] italic">Where we take you</p>
        <ul>
          {places.map((p, i) => (
            <li key={p.name} className="group relative border-b border-[#1d2333]/15">
              <Link href="/experiences" className="grid items-center gap-4 py-6 lg:grid-cols-[1fr_auto] lg:py-8">
                <span className="font-[family-name:var(--c-mark)] text-[16vw] uppercase leading-[0.85] transition-colors duration-500 group-hover:text-[#b8875a] lg:text-[9vw]">{p.name}</span>
                <span className="text-[14px] opacity-70">{String(i + 1).padStart(2, "0")} · {p.note}</span>
              </Link>
              <div className="pointer-events-none absolute right-[22%] top-1/2 hidden h-[260px] w-[200px] -translate-y-1/2 overflow-hidden opacity-0 transition-[opacity,transform] duration-700 [transform:translateY(-40%)_rotate(-3deg)] group-hover:opacity-100 group-hover:[transform:translateY(-50%)_rotate(2deg)] lg:block">
                <Pic name={p.img} sizes="200px" />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Strip band (White Desert footer strips) */}
      <section aria-label="Moments" className="grid h-[70svh] grid-cols-6 gap-1">
        {["combo-3in1-3", "standard-sunset-4", "premium-morning-4", "combo-mosque-3", "burj-palms", "creek-1"].map((n, i) => (
          <div key={n} className={`reveal-img overflow-hidden ${i % 2 ? "mt-16" : ""}`} style={{ ["--d" as string]: `${i * 120}ms` }}><Pic name={n} sizes="17vw" /></div>
        ))}
      </section>

      {/* Quote-style brand line */}
      <section className="px-page grid gap-10 py-32 lg:grid-cols-[1fr_2fr] lg:py-44">
        <span className="font-[family-name:var(--c-script)] text-[80px] leading-none opacity-40">“</span>
        <div>
          <p className="max-w-[30ch] font-[family-name:var(--c-script)] text-[32px] italic leading-[1.25] lg:text-[46px]">
            <Split>The desert is not empty. It is full of things you only notice once the engine stops and the stars come out.</Split>
          </p>
          <p className="reveal mt-8 text-[13px] tracking-[0.2em]">THE DESERT STARS GUIDES</p>
        </div>
      </section>

      {/* Enquire */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0" data-parallax="0.18"><Pic name="dubai-skyline" sizes="100vw" /></div>
        <div className="absolute inset-0 bg-[#1d2333]/55" />
        <div className="px-page relative py-32 lg:py-48">
          <h2 className="font-[family-name:var(--c-serif)] text-[44px] uppercase leading-[1] lg:text-[96px]"><Split>Begin your journey</Split></h2>
          <div className="reveal mt-12 flex flex-wrap gap-3">
            <Link href="/enquire" className="rounded-full bg-white px-6 py-3.5 text-[14px] text-[#1d2333]">Send an enquiry</Link>
            <a href={waLink("Hello Desert Stars, I'd like to plan a desert evening.")} className="rounded-full border border-white px-6 py-3.5 text-[14px] hover:bg-white hover:text-[#1d2333]">WhatsApp {site.phone}</a>
          </div>
        </div>
      </section>

      <footer className="px-page overflow-hidden pt-20">
        <div className="grid gap-8 text-[14px] md:grid-cols-4">
          <p className="opacity-70">{site.address}</p>
          <p><a href={site.phoneHref}>{site.phone}</a><br /><a href={`mailto:${site.email}`}>{site.email}</a></p>
          <p className="opacity-70">{site.hours}</p>
          <p className="flex flex-col"><Link href="/privacy">Privacy Policy</Link><Link href="/booking-terms">Booking Terms</Link><Link href="/cookies">Cookie Policy</Link></p>
        </div>
        <p className="mt-16 font-[family-name:var(--c-mark)] text-[21vw] uppercase leading-[0.78] tracking-[-0.01em] lg:text-[17.5vw]" aria-hidden="true">Desert Stars</p>
      </footer>
    </div>
  );
}
