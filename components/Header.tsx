"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { categories, site } from "@/data/site";

const links = [
  { href: "/experiences", label: "All experiences" },
  ...categories.map((c) => ({ href: `/experiences#${c.slug}`, label: c.name })),
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About Desert Stars" },
  { href: "/enquire", label: "Enquire" },
];

export default function Header() {
  const path = usePathname();
  const overHero = path === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) { setHidden(y > last && y > 160); last = y; }
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const light = overHero && !scrolled && !open;
  const pill = "rounded-full px-4 py-2.5 text-[13px] transition-colors";
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,transform,border-color] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${hidden && !open ? "header-hidden" : ""} ${
          open ? "text-white" : light ? "text-ink" : "border-b border-line/70 bg-sand/90 text-ink backdrop-blur"
        }`}
      >
        <div className="px-page grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex items-center gap-2 justify-self-start">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="site-menu"
              className={`${pill} flex min-h-11 items-center gap-2.5 ${open ? "bg-white/10 hover:bg-white/20" : "bg-white/85 backdrop-blur hover:bg-ink hover:text-white"} lg:hidden`}
            >
              <span aria-hidden="true" className="relative block h-[8px] w-[16px]">
                <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
              </span>
              {open ? "Close" : "Menu"}
            </button>
            <nav aria-label="Primary" className="hidden gap-2 lg:flex">
              {[["/experiences", "Experiences"], ["/experiences#desert", "Desert"], ["/experiences#city", "Cities"], ["/journal", "Journal"], ["/about", "About"]].map(([h, l]) => (
                <Link key={h} href={h} className={`${pill} bg-white/85 backdrop-blur hover:bg-ink hover:text-white`}>{l}</Link>
              ))}
            </nav>
          </div>
          <Link
            href="/"
            aria-label="Desert Stars home"
            className={`justify-self-center transition-opacity duration-500 ${overHero && !scrolled && !open ? "pointer-events-none opacity-0" : "opacity-100"}`}
          >
            <Logo />
          </Link>
          <Link href="/enquire" className={`${pill} justify-self-end ${open ? "bg-white text-ink" : "bg-ink text-white hover:bg-ember"}`}>
            Enquire
          </Link>
        </div>
      </header>

      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-40 bg-night text-sand transition-[opacity,visibility] duration-500 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="px-page grid h-full grid-cols-1 gap-12 overflow-y-auto pb-12 pt-28 lg:grid-cols-[1.4fr_1fr]">
          <nav aria-label="Primary">
            <ul>
              {links.map((l, i) => (
                <li
                  key={l.href}
                  className={`border-b border-white/10 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                  style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5 py-3 lg:py-4"
                  >
                    <span className="eyebrow w-6 text-sand/60">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display text-[30px] transition-colors group-hover:text-[#d9b48c] lg:text-[48px]">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={`self-end text-sand/80 transition-opacity delay-500 duration-700 ${open ? "opacity-100" : "opacity-0"}`}>
            <p className="eyebrow mb-4 text-sand/60">Concierge</p>
            <p className="title mb-6 text-[26px] text-sand">{site.response}</p>
            <p className="mb-1"><a className="u-link" href={site.phoneHref}>{site.phone}</a></p>
            <p className="mb-1"><a className="u-link" href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a></p>
            <p><a className="u-link" href={`mailto:${site.email}`}>{site.email}</a></p>
          </div>
        </div>
      </div>
    </>
  );
}
