import Link from "next/link";
import { Oswald, Cormorant_Garamond, Hanken_Grotesk, VT323 } from "next/font/google";
import Pic from "@/components/Pic";
import { tours } from "@/lib/tours";
import { site, waLink } from "@/data/site";
import { posts } from "@/data/journal";

/* Shared chrome for Variation 1 · Balanced light: fonts, header, footer, fixed side tab, grid lines. */

const osw = Oswald({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--v1-osw" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--v1-serif" });
const sans = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--v1-sans" });
const mono = VT323({ subsets: ["latin"], weight: "400", variable: "--v1-mono" });

/** Font variable classes: put on the page wrapper. */
export const fontVars = `${osw.variable} ${serif.variable} ${sans.variable} ${mono.variable}`;

/* Palette: white #fff, off-white #f3f1ec, navy ink #1f2a44, deep navy #18213a, sand-orange #b9601f (tab + Enquire only) */
export const O = "font-[family-name:var(--v1-osw)]";
export const C = "font-[family-name:var(--v1-serif)]";
export const M = "font-[family-name:var(--v1-mono)] uppercase tracking-[0.04em]";
export const pad = "px-5 lg:px-10";

export const HOME = "/concepts/1";
export const ABOUT = "/concepts/1/about";

export const wa = waLink("Hello Desert Stars, I would like to plan a desert evening.");

/** Wrapper class shared by every Variation 1 page. */
export const shellClass = `${fontVars} v1 relative overflow-x-clip bg-white font-[family-name:var(--v1-sans)] text-[#1f2a44] antialiased`;

/** CSS shared by every Variation 1 page (selection, pills, tab, underline links, details marker). */
export const sharedCss = `
  .v1 ::selection { background: #1f2a44; color: #fff; }
  .v1-pill { transition: background-color .4s, color .4s; }
  .v1-tab { transition: width .5s cubic-bezier(.16,1,.3,1); }
  .v1-link { background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .6s cubic-bezier(.16,1,.3,1), color .3s; }
  .v1-link:hover { background-size: 100% 1px; }
  .v1 details > summary { list-style: none; } .v1 details > summary::-webkit-details-marker { display: none; }
`;

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path d="M10 0 L11.4 8.6 L20 10 L11.4 11.4 L10 20 L8.6 11.4 L0 10 L8.6 8.6 Z" fill="currentColor" />
    </svg>
  );
}

/* Hand-drawn loop around a small italic label (White Desert) */
export function Loop({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 90" className={className} fill="none" aria-hidden="true">
      <path d="M4 84 C 70 80, 200 82, 244 64 C 270 52, 220 18, 120 10 C 40 4, 10 26, 70 46 C 110 60, 150 70, 176 86" stroke="currentColor" strokeWidth="1" className="draw-line" />
    </svg>
  );
}

export function Swash({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 540 100" className={className} fill="none" aria-hidden="true">
      <path d="M2 10 C 40 40, 80 60, 180 84 M 60 30 C 200 10, 360 20, 380 44 C 390 60, 250 50, 160 40 M 120 52 C 260 70, 420 84, 536 98" stroke="currentColor" strokeWidth="1" className="draw-line" />
    </svg>
  );
}

/* W12: faint vertical grid lines */
export function GridLines() {
  return (
    <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-[1] ${pad}`}>
      <div className="grid h-full grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`border-l border-[#1f2a44]/[0.07] ${i >= 4 ? "hidden lg:block" : ""} ${i === 3 ? "lg:border-r-0 border-r" : ""} last:border-r`} />
        ))}
      </div>
    </div>
  );
}

/* W12: fixed side tab */
export function SideTab() {
  return (
    <Link href="/enquire" className="v1-tab fixed right-0 top-1/2 z-40 flex h-[140px] w-[40px] -translate-y-1/2 flex-col items-center justify-center gap-3 bg-[#b9601f] text-white hover:w-[48px] lg:h-[200px] lg:w-[60px] lg:hover:w-[70px]">
      <Star className="h-3 w-3" />
      <span className="rotate-180 text-[14px] font-medium [writing-mode:vertical-rl]">Enquire</span>
    </Link>
  );
}

const navMain: [string, string][] = [["Experiences", "/experiences"], ["The evening", `${HOME}#evening`], ["About", ABOUT]];
const navMobile: [string, string][] = [["Experiences", "/experiences"], ["The evening", `${HOME}#evening`], ["Rates", `${HOME}#experiences`], ["Journal", "/journal"], ["About", ABOUT]];

/* W1: header — pills left, centred logo, pills right */
export function Header() {
  return (
    <header className={`absolute inset-x-0 top-0 z-30 ${pad} pt-4 lg:pt-6`}>
      <div className="flex items-center justify-between gap-3 text-[14px] font-medium text-white">
        <nav aria-label="Primary" className="hidden flex-1 gap-2 lg:flex">
          {navMain.map(([l, h]) => (
            <Link key={l} href={h} className="v1-pill rounded-[4px] bg-white/15 px-5 py-3 backdrop-blur-md hover:bg-white hover:text-[#1f2a44]">{l}</Link>
          ))}
        </nav>
        <details className="relative lg:hidden">
          <summary className="v1-pill cursor-pointer rounded-[4px] bg-white/15 px-5 py-3 backdrop-blur-md">Menu</summary>
          <div className="absolute left-0 top-[calc(100%+8px)] w-[220px] rounded-[4px] bg-white p-2 text-[#1f2a44] shadow-xl">
            {navMobile.map(([l, h]) => (
              <Link key={l} href={h} className="block rounded-[3px] px-3 py-2.5 hover:bg-[#f3f1ec]">{l}</Link>
            ))}
          </div>
        </details>
        <Link href={HOME} className="flex flex-col items-center gap-1.5 text-white" aria-label="Desert Stars home">
          <Star className="h-4 w-4 lg:h-5 lg:w-5" />
          <span className={`${O} text-[15px] font-normal uppercase leading-none tracking-[0.28em] lg:text-[18px]`}>Desert Stars</span>
        </Link>
        <div className="flex flex-1 justify-end gap-2">
          <Link href={`${HOME}#experiences`} className="v1-pill hidden rounded-[4px] bg-white/15 px-5 py-3 backdrop-blur-md hover:bg-white hover:text-[#1f2a44] lg:block">Rates</Link>
          <Link href="/enquire" className="v1-pill rounded-[4px] bg-[#b9601f] px-5 py-3 text-white hover:bg-[#a0521a]">Enquire</Link>
        </div>
      </div>
    </header>
  );
}

const desert = tours.filter((t) => t.category === "desert");
const other = tours.filter((t) => t.category !== "desert").slice(0, 6);

/* W11: footer (relative z-50 so it covers the fixed side tab) */
export function Footer() {
  return (
    <footer className="relative z-50 bg-[#f3f1ec] text-[#1f2a44]">
      <div className={`${pad} grid grid-cols-2 gap-x-6 gap-y-10 pb-16 pt-16 lg:grid-cols-6 lg:gap-x-0 lg:pt-12`}>
        <div className="col-span-2 lg:col-span-1">
          <Link href={HOME} className="inline-flex flex-col items-start gap-2" aria-label="Desert Stars home">
            <Star className="h-6 w-6" />
            <span className={`${O} text-[16px] uppercase tracking-[0.28em]`}>Desert Stars</span>
          </Link>
        </div>
        <div className="col-span-2 lg:col-span-1 lg:pl-3">
          <h3 className={`${C} text-[22px] italic`}>Enquiries</h3>
          <ul className="mt-3 space-y-1.5 text-[14px] text-[#1f2a44]/65">
            <li><a className="hover:text-[#1f2a44]" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a className="hover:text-[#1f2a44]" href={site.phoneHref}>{site.phone}</a></li>
            <li><a className="hover:text-[#1f2a44]" href={wa}>WhatsApp</a></li>
            <li>{site.hours}</li>
          </ul>
          <h3 className={`mt-6 ${C} text-[22px] italic`}>Visit</h3>
          <p className="mt-3 text-[14px] leading-[1.5] text-[#1f2a44]/65">{site.address}</p>
        </div>
        <div className="lg:pl-3">
          <h3 className={`${C} text-[22px] italic`}>Desert</h3>
          <ul className="mt-3 space-y-1.5 text-[14px] text-[#1f2a44]/65">
            {desert.map((t) => <li key={t.slug}><Link className="hover:text-[#1f2a44]" href={`/experiences/${t.slug}`}>{t.title}</Link></li>)}
            <li><Link className="hover:text-[#1f2a44]" href="/experiences#desert">View all</Link></li>
          </ul>
        </div>
        <div className="lg:pl-3">
          <h3 className={`${C} text-[22px] italic`}>Emirates</h3>
          <ul className="mt-3 space-y-1.5 text-[14px] text-[#1f2a44]/65">
            {other.map((t) => <li key={t.slug}><Link className="hover:text-[#1f2a44]" href={`/experiences/${t.slug}`}>{t.title}</Link></li>)}
            <li><Link className="hover:text-[#1f2a44]" href="/experiences">View all</Link></li>
          </ul>
          <h3 className={`mt-6 ${C} text-[22px] italic`}>Journal</h3>
          <ul className="mt-3 space-y-1.5 text-[14px] text-[#1f2a44]/65">
            {posts.slice(0, 2).map((p) => <li key={p.slug}><Link className="hover:text-[#1f2a44]" href={`/journal/${p.slug}`}>{p.title}</Link></li>)}
            <li><Link className="hover:text-[#1f2a44]" href={ABOUT}>About us</Link></li>
          </ul>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-2 lg:pl-2">
          <Link href={`${HOME}#evening`} className="group relative col-span-2 flex h-[110px] items-center justify-center overflow-hidden rounded-[2px] text-[14px] font-medium text-white">
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"><Pic name="premium-morning-4" sizes="(min-width:1024px) 33vw, 100vw" /></div>
            <div className="absolute inset-0 bg-[#1f2a44]/35" />
            <span className="relative flex items-center gap-8">Our evenings <span aria-hidden="true" className="text-[11px]">▶</span></span>
          </Link>
          <Link href="/experiences" className="flex h-[110px] items-center justify-center rounded-[2px] bg-white/70 text-[14px] font-medium transition-colors hover:bg-white">Dates &amp; Rates</Link>
          <Link href="/enquire" className="flex h-[110px] items-center justify-center rounded-[2px] bg-[#b9601f] text-[14px] font-medium text-white transition-colors hover:bg-[#a0521a]">Enquire now</Link>
          <a href={site.phoneHref} className="flex h-[110px] items-center justify-center rounded-[2px] bg-white/70 text-[14px] font-medium transition-colors hover:bg-white">Call us</a>
          <a href={wa} className="flex h-[110px] items-center justify-center rounded-[2px] bg-white/70 text-[14px] font-medium transition-colors hover:bg-white">WhatsApp</a>
        </div>
      </div>
      <div className={`${pad} flex flex-col items-center gap-5 border-t border-[#1f2a44]/15 py-6 text-center lg:flex-row lg:justify-between lg:text-left`}>
        <Star className="hidden h-3.5 w-3.5 lg:block" />
        <p className="lg:pl-[8%]">
          <span className={`${C} block text-[22px] italic`}>“Every evening ends under the same stars.”</span>
          <span className={`${O} mt-1 block text-[11px] uppercase tracking-[0.18em] text-[#1f2a44]/60`}>— The Desert Stars team</span>
        </p>
        <p className="text-[12px] text-[#1f2a44]/60">
          <Link href={ABOUT} className="hover:text-[#1f2a44]">About</Link> · <Link href="/enquire" className="hover:text-[#1f2a44]">Enquire</Link> · © 2026 Desert Stars
        </p>
      </div>
    </footer>
  );
}
