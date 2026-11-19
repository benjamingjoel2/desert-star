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

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
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
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          light ? "text-white" : open ? "text-sand" : "bg-sand/95 text-ink backdrop-blur border-b border-line/70"
        }`}
      >
        <div className="px-page grid h-[68px] grid-cols-[1fr_auto_1fr] items-center">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="flex min-h-11 items-center gap-3 justify-self-start text-[13px] tracking-[0.06em]"
          >
            <span aria-hidden="true" className="relative block h-[9px] w-[18px]">
              <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </span>
            <span className="sr-only sm:not-sr-only">{open ? "Close" : "Menu"}</span>
          </button>
          <Link href="/" aria-label="Desert Stars home" className="justify-self-center">
            <Logo />
          </Link>
          <Link
            href="/enquire"
            className={`btn justify-self-end !min-h-10 !px-4 sm:!px-5 ${light || open ? "border border-white/70 hover:bg-white hover:text-ink" : "btn-dark"}`}
          >
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
                <li key={l.href} className="border-b border-white/10">
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5 py-3 lg:py-4"
                  >
                    <span className="eyebrow w-6 text-sand/60">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display text-[30px] transition-colors group-hover:text-[#e3b48c] lg:text-[44px]">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="self-end text-sand/80">
            <p className="eyebrow mb-4 text-sand/60">Concierge</p>
            <p className="title mb-6 text-[22px] text-sand">{site.response}</p>
            <p className="mb-1"><a className="u-link" href={site.phoneHref}>{site.phone}</a></p>
            <p className="mb-1"><a className="u-link" href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a></p>
            <p><a className="u-link" href={`mailto:${site.email}`}>{site.email}</a></p>
          </div>
        </div>
      </div>
    </>
  );
}
