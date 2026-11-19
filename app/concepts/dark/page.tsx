import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import HeroSlides from "@/components/concepts/HeroSlides";
import HoverList from "@/components/concepts/HoverList";
import { site, waLink } from "@/data/site";
import { posts } from "@/data/journal";
import { getTour, price, tours } from "@/lib/tours";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["normal", "italic"], variable: "--c-display", display: "swap" });
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500"], variable: "--c-sans", display: "swap" });

export const metadata: Metadata = { title: "Concept 01 · Dark & cinematic" };

const GOLD = "#c9a86a";

const chapters = [
  { time: "15:30", title: "Golden hour on the red dunes", text: "Your 4x4 leaves the tarmac at Lehbab. Forty minutes of dune driving as the sand turns from gold to copper.", img: "premium-morning-4" },
  { time: "17:45", title: "A falcon, a camel, the last light", text: "Hold a falcon on the glove, ride a camel along the ridge, and stop for the sun to drop behind the dunes.", img: "combo-3in1-3" },
  { time: "19:00", title: "The camp comes alive", text: "Lanterns, Arabic coffee and dates, then the Tanoura dancer spins under the string lights while the grill is lit.", img: "standard-sunset-2" },
  { time: "21:00", title: "Fire, then silence", text: "The fire show ends in a shower of sparks. Then the lights go down, and the sky above the camp fills with stars.", img: "combo-mosque-4" },
];

export default function Dark() {
  const list = tours.slice(0, 10).map((t) => ({ href: `/experiences/${t.slug}`, title: t.title, meta: `${t.location} · ${t.timing}`, price: price(t), img: t.images[0] }));
  const evening = getTour("premium-evening-desert-safari")!;
  return (
    <div className={`${display.variable} ${sans.variable} bg-[#0b0d12] text-[#ece4d6] [font-family:var(--c-sans)]`}>
      {/* Header: logo left, nav centre, reserve right */}
      <header className="px-page fixed inset-x-0 top-0 z-50 grid h-20 grid-cols-[1fr_auto] items-center bg-gradient-to-b from-black/60 to-transparent lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/concepts/dark" className="flex items-center gap-3">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 0 L13.6 10.4 L24 12 L13.6 13.6 L12 24 L10.4 13.6 L0 12 L10.4 10.4 Z" fill={GOLD} /></svg>
          <span className="text-[13px] font-medium tracking-[0.42em]">DESERT STARS</span>
        </Link>
        <nav className="hidden gap-10 text-[12px] tracking-[0.22em] lg:flex" aria-label="Primary">
          <a href="#evening" className="hover:text-[#c9a86a]">THE EVENING</a>
          <a href="#experiences" className="hover:text-[#c9a86a]">EXPERIENCES</a>
          <a href="#journal" className="hover:text-[#c9a86a]">JOURNAL</a>
        </nav>
        <a href={waLink("Hello Desert Stars, I'd like to reserve an evening in the desert.")} className="justify-self-end border px-5 py-3 text-[11px] tracking-[0.24em] transition-colors hover:bg-[#c9a86a] hover:text-black" style={{ borderColor: GOLD, color: GOLD }}>RESERVE</a>
      </header>

      <HeroSlides
        gold={GOLD}
        slides={[
          { img: "premium-evening-1", eyebrow: "Lehbab desert · Dubai", title: <>Nightfall in the <em>Arabian</em> desert</> },
          { img: "standard-sunset-2", eyebrow: "The Bedouin camp", title: <>Lanterns, <em>Tanoura</em> and fire</> },
          { img: "burj-3", eyebrow: "Dubai after dark", title: <>The city, <em>lit gold</em></> },
          { img: "mosque-bluehour", eyebrow: "Abu Dhabi · blue hour", title: <>Marble and <em>moonlight</em></> },
        ]}
      >
        <p className="max-w-xs text-[14px] leading-relaxed text-[#ece4d6]/80">
          Private desert evenings and Emirates journeys. From AED {evening.adult} per guest, collected from your door.
        </p>
      </HeroSlides>

      {/* Statement */}
      <section className="px-page grid gap-10 py-28 lg:grid-cols-[1fr_2.2fr] lg:py-44">
        <p className="eyebrow reveal" style={{ color: GOLD }}>Desert Stars</p>
        <p className="font-[family-name:var(--c-display)] text-[36px] font-light leading-[1.1] sm:text-[52px] lg:text-[72px]">
          <Split>An evening in the desert should end the way it began: <em className="text-[#c9a86a]">in silence,</em> under more stars than you have ever seen.</Split>
        </p>
      </section>

      {/* The evening: sticky chapters */}
      <section id="evening" aria-label="The evening, hour by hour">
        {chapters.map((c, k) => (
          <article key={c.time} className="chapter">
            <div className="absolute inset-0" data-parallax="0.1"><Pic name={c.img} sizes="100vw" /></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
            <div className="px-page relative flex h-full flex-col justify-end pb-16 lg:pb-24">
              <p className="mb-6 flex items-center gap-4 text-[12px] tracking-[0.3em]" style={{ color: GOLD }}>
                <span>{String(k + 1).padStart(2, "0")} / 04</span><span className="h-px w-12" style={{ background: GOLD }} /><span>{c.time}</span>
              </p>
              <h2 className="max-w-[14ch] font-[family-name:var(--c-display)] text-[46px] font-light leading-[0.98] lg:text-[96px]"><Split>{c.title}</Split></h2>
              <p className="reveal mt-6 max-w-md text-[16px] leading-relaxed text-[#ece4d6]/85">{c.text}</p>
            </div>
          </article>
        ))}
      </section>

      {/* Experiences index with floating image */}
      <section id="experiences" className="px-page relative z-10 bg-[#0b0d12] py-28 lg:py-40">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_2.2fr]">
          <p className="eyebrow" style={{ color: GOLD }}>{tours.length} experiences</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-[family-name:var(--c-display)] text-[44px] font-light leading-none lg:text-[80px]"><Split>Choose your <em>evening</em></Split></h2>
            <Link href="/experiences" className="u-link text-[13px] tracking-[0.1em]">View all</Link>
          </div>
        </div>
        <HoverList rows={list} />
      </section>

      {/* Numbers */}
      <section className="px-page border-y border-white/10 py-20">
        <dl className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {site.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse border-l border-white/10 pl-6">
              <dt className="mt-3 text-[11px] tracking-[0.24em] text-[#ece4d6]/60">{s.label.toUpperCase()}</dt>
              <dd className="font-[family-name:var(--c-display)] text-[54px] font-light leading-none lg:text-[84px]" style={{ color: GOLD }} data-count={/\d/.test(s.value) && !s.value.includes("/") ? s.value : undefined}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Full-bleed mosque */}
      <section className="relative h-[110svh] overflow-hidden">
        <div className="absolute inset-0" data-parallax="0.2"><Pic name="mosque-bluehour" sizes="100vw" alt="The Sheikh Zayed Grand Mosque reflected in its pools at blue hour" /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12] via-transparent to-[#0b0d12]/60" />
        <div className="px-page absolute inset-x-0 bottom-0 grid gap-8 pb-20 lg:grid-cols-[2fr_1fr] lg:items-end">
          <h2 className="font-[family-name:var(--c-display)] text-[44px] font-light leading-[1] lg:text-[88px]"><Split>Beyond the dunes, <em>the Emirates</em></Split></h2>
          <div className="reveal">
            <p className="text-[15px] leading-relaxed text-[#ece4d6]/85">The Grand Mosque at first light, the old Creek by abra, the oases of Al Ain. Guided days across the country, collected from Dubai.</p>
            <Link href="/experiences#city" className="u-link mt-6 text-[13px] tracking-[0.1em]" style={{ color: GOLD }}>City journeys</Link>
          </div>
        </div>
      </section>

      {/* Photo marquee */}
      <section aria-label="Moments" className="overflow-hidden py-24">
        <div className="marquee gap-4">
          {[...["combo-mosque-2", "standard-sunset-4", "premium-evening-4", "creek-2", "abudhabi-city-1", "self-drive-1", "dubai-city-4", "burj-2"], ...["combo-mosque-2", "standard-sunset-4", "premium-evening-4", "creek-2", "abudhabi-city-1", "self-drive-1", "dubai-city-4", "burj-2"]].map((n, k) => (
            <div key={k} className={`shrink-0 overflow-hidden ${k % 2 ? "h-[340px] w-[260px]" : "h-[340px] w-[440px]"} ${k % 3 === 1 ? "mt-12" : ""}`}><Pic name={n} sizes="440px" /></div>
          ))}
        </div>
      </section>

      {/* Journal */}
      <section id="journal" className="px-page pb-28 lg:pb-40">
        <h2 className="mb-14 font-[family-name:var(--c-display)] text-[40px] font-light lg:text-[64px]"><Split>From the <em>journal</em></Split></h2>
        <div className="grid gap-12 md:grid-cols-3 md:gap-6">
          {posts.map((p, i) => (
            <Link key={p.slug} href={`/journal/${p.slug}`} className="group">
              <div className="zoom reveal-img aspect-[4/5] overflow-hidden" style={{ ["--d" as string]: `${i * 150}ms` }}><Pic name={p.image} sizes="(min-width:768px) 33vw, 100vw" /></div>
              <p className="mt-5 text-[11px] tracking-[0.24em]" style={{ color: GOLD }}>{p.category.toUpperCase()}</p>
              <h3 className="mt-2 font-[family-name:var(--c-display)] text-[28px] leading-tight">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Reserve */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-60" data-parallax="0.25"><Pic name="night-sky" sizes="100vw" /></div>
        <div className="px-page relative grid gap-10 py-32 lg:grid-cols-[2fr_1fr] lg:items-end lg:py-48">
          <h2 className="font-[family-name:var(--c-display)] text-[52px] font-light leading-[0.95] lg:text-[120px]"><Split>Reserve <em>your night</em></Split></h2>
          <div className="reveal grid gap-3">
            <p className="mb-4 text-[15px] text-[#ece4d6]/80">{site.response}</p>
            <a href={waLink("Hello Desert Stars, I'd like to reserve an evening in the desert.")} className="py-4 text-center text-[12px] tracking-[0.24em] text-black transition-opacity hover:opacity-85" style={{ background: GOLD }}>RESERVE ON WHATSAPP</a>
            <a href={site.phoneHref} className="border border-white/30 py-4 text-center text-[12px] tracking-[0.24em] hover:border-white">CALL {site.phone}</a>
          </div>
        </div>
      </section>

      <footer className="px-page flex flex-col gap-4 border-t border-white/10 py-10 text-[12px] text-[#ece4d6]/60 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Desert Stars · {site.address}</p>
        <p className="flex gap-6"><Link href="/privacy">Privacy</Link><Link href="/booking-terms">Booking Terms</Link><Link href="/cookies">Cookies</Link></p>
      </footer>
    </div>
  );
}
