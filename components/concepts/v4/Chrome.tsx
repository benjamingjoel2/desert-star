import Link from "next/link";
import { Host_Grotesk, VT323, Cormorant_Garamond } from "next/font/google";
import Pic from "@/components/Pic";
import { site, waLink } from "@/data/site";

/* Shared chrome for Variation 4 (homepage + about): fonts, stylesheet, header with MENU overlay,
   staircase steps, sticky centre column, giant contact links and footer. */

const sans = Host_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--v4-sans" });
const mono = VT323({ subsets: ["latin"], weight: "400", variable: "--v4-mono" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["italic"], variable: "--v4-serif" });

export const fontVars = `${sans.variable} ${mono.variable} ${serif.variable}`;
export const shell = `${fontVars} v4 min-h-screen overflow-x-clip bg-[#0c0a08] font-[family-name:var(--v4-sans)] text-[#efe6d6] antialiased selection:bg-[#efe6d6] selection:text-[#0c0a08]`;
export const pad = "px-5 md:px-10";
export const wa = waLink("Hello Desert Stars, I'd like to plan an evening in the desert.");

export function V4Style() {
  return (
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
  );
}

const menu: [string, string][] = [
  ["Home", "/"],
  ["Experiences", "/experiences"],
  ["Desert safaris", "/experiences#desert"],
  ["Journal", "/journal"],
  ["About", "/about"],
  ["Enquire", "/enquire"],
];

/* ── M1 Header + full-screen MENU ─────────────────────── */
export function Header() {
  return (
    <header className="v4-head fixed inset-x-0 top-0 z-50 flex items-start justify-between px-5 pt-5 md:px-[27px] md:pt-[26px]">
      <Link href="/" className="block text-[#efe6d6] transition-opacity hover:opacity-80" aria-label="Desert Stars, home"><svg viewBox="0 0 37 43" className="h-[44px] w-auto md:h-[54px]" fill="currentColor" aria-hidden="true"><path d="M10 0L12.3 7.7L20 10L12.3 12.3L10 20L7.7 12.3L0 10L7.7 7.7ZM10 23L12.3 30.7L20 33L12.3 35.3L10 43L7.7 35.3L0 33L7.7 30.7ZM26 11.5L28.3 19.2L36 21.5L28.3 23.8L26 31.5L23.7 23.8L16 21.5L23.7 19.2Z" /></svg></Link>
      <div className="flex items-start gap-2">
        <a href={wa} target="_blank" rel="noopener noreferrer" className="v4-m v4-box hover:opacity-80">{"{WhatsApp}"}</a>
        <details>
          <summary className="v4-m v4-box relative z-10 cursor-pointer"><span className="v4-closed">Menu</span><span className="v4-opened">Close</span></summary>
          <div className="fixed inset-0 flex flex-col justify-between overflow-y-auto bg-[#0c0a08] px-5 pb-8 pt-24 text-[#efe6d6] md:px-10">
            <nav aria-label="Menu" className="flex flex-col">
              {menu.map(([l, h]) => (
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
  );
}

/* ── M4 / M9 Staircase ────────────────────────────────── */
export function Steps({ tone, chips }: { tone: "night" | "sand"; chips?: [string, string, string, string] }) {
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

/** Mobile companion to Steps: the chips the staircase hides below md. */
export function StepChips({ chips }: { chips: string[] }) {
  return (
    <div className={`${pad} grid grid-cols-2 gap-2 bg-[#0c0a08] pt-6 md:hidden`}>
      {chips.map((c) => (
        <span key={c} className="v4-m border border-[#efe6d6]/25 px-2 py-2 text-[14px]">{c}</span>
      ))}
    </div>
  );
}

/* ── M7 Sticky centre column ──────────────────────────── */
export type ColumnItem = { href?: string; img: string; cap: string; alt: string; body?: string };

export function Column({ id, label, count, items, discover = "/experiences", discoverLabel = "Discover" }: {
  id: string; label: string; count: number; items: ColumnItem[]; discover?: string; discoverLabel?: string;
}) {
  return (
    <section id={id} className="relative bg-[#0c0a08] py-[12svh]" aria-label={label}>
      <ul className="relative mx-auto w-[69vw] md:w-[31.4vw]">
        {items.map((it, i) => {
          const cls = `group relative block aspect-[2/3] overflow-hidden bg-[#1a1510] md:aspect-[7/8] ${i === 0 ? "rounded-t-[4px]" : ""} ${i === items.length - 1 ? "rounded-b-[4px]" : ""}`;
          const inner = (
            <>
              <div className="absolute inset-0" data-parallax="0.06">
                <div className="h-full w-full transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]">
                  <Pic name={it.img} alt={it.alt} sizes="(min-width:768px) 32vw, 70vw" />
                </div>
              </div>
              {it.body ? (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c0a08]/90 via-[#0c0a08]/55 to-transparent px-3 pb-3 pt-24">
                  <span className="v4-m v4-box">{it.cap}</span>
                  <p className="mt-2 max-w-[42ch] text-[13px] leading-[1.5] text-[#efe6d6]/90 md:text-[14px]">{it.body}</p>
                </div>
              ) : (
                <span className="v4-m v4-box absolute bottom-3 left-3 max-w-[calc(100%-24px)] transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">{it.cap}</span>
              )}
            </>
          );
          return (
            <li key={it.img + i}>
              {it.href ? <Link href={it.href} className={cls}>{inner}</Link> : <div className={cls}>{inner}</div>}
            </li>
          );
        })}
      </ul>
      <div className="pointer-events-none absolute inset-0">
        <div className={`sticky top-0 flex h-svh items-center justify-between ${pad}`}>
          <h2 className="text-[24px] leading-none tracking-[-0.02em] [text-shadow:0_1px_12px_rgba(0,0,0,.45)] md:text-[30px]">
            {label}<sup className="ml-1 align-super font-[family-name:var(--v4-mono)] text-[13px] tracking-normal">™ ({String(count).padStart(2, "0")})</sup>
          </h2>
          <Link href={discover} className="v4-m v4-link pointer-events-auto [text-shadow:0_1px_12px_rgba(0,0,0,.45)]">{discoverLabel}</Link>
        </div>
      </div>
    </section>
  );
}

/* ── M11 Giant stacked contact links ──────────────────── */
const giant = [
  { label: "WhatsApp", href: wa, note: "Reply within 30 min", ext: true },
  { label: "Call", href: site.phoneHref, note: site.phone, ext: false },
  { label: "Email", href: `mailto:${site.email}`, note: site.email, ext: false },
  { label: "Enquire", href: "/enquire", note: "Plan your date", ext: false },
];

export function GiantLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`v4-giant ${className}`}>
      {giant.map((g) => (
        <li key={g.label} className="flex items-start gap-3">
          <a href={g.href} {...(g.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="v4-g block text-[clamp(54px,11vw,158px)]">{g.label}</a>
          <span className="v4-m mt-[0.4em] hidden shrink-0 text-[14px] text-[#1c140d]/70 xl:inline">{g.note}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── M12 Footer ───────────────────────────────────────── */
export function Footer() {
  return (
    <footer className={`${pad} bg-[#efe6d6] pb-8 text-[#1c140d]`}>
      <div className="grid gap-10 md:grid-cols-3 md:gap-5">
        <div className="grid grid-cols-2 gap-5 md:col-span-2">
          <ul className="v4-m space-y-[3px] text-[17px]">
            <li><Link href="/" className="v4-link">Home</Link></li>
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
      <nav aria-label="Legal" className="v4-m mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-[#1c140d]/70">
        <Link href="/privacy" className="v4-link">Privacy Policy</Link>
        <Link href="/booking-terms" className="v4-link">Booking Terms</Link>
        <Link href="/cookies" className="v4-link">Cookie Policy</Link>
        <Link href="/credits" className="v4-link">Photo credits</Link>
      </nav>
    </footer>
  );
}
