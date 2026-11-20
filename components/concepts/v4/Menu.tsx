"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { setScrollLock } from "@/components/Motion";
import { site } from "@/data/site";

const menu: [string, string][] = [
  ["Home", "/"],
  ["Experiences", "/experiences"],
  ["Desert safaris", "/experiences#desert"],
  ["Journal", "/journal"],
  ["About", "/about"],
  ["Enquire", "/enquire"],
];

/** Full-screen menu: opens with MENU, closes with CLOSE, Esc, any link, or a route change. */
export default function Menu() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    setScrollLock(open);
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => () => setScrollLock(false), []);

  return (
    <>
      <button type="button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((o) => !o)}
        className="v4-m v4-box relative z-[60] cursor-pointer hover:opacity-80">{open ? "Close" : "Menu"}</button>
      <div id="site-menu" hidden={!open} data-lenis-prevent
        className="fixed inset-0 z-[55] flex flex-col justify-between overflow-y-auto overscroll-contain bg-[#0c0a08] px-5 pb-8 pt-24 text-[#efe6d6] md:px-10 md:pt-28">
        <nav aria-label="Menu" className="flex flex-col gap-1 md:gap-2">
          {menu.map(([l, h]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)}
              className="text-[clamp(38px,9vw,56px)] uppercase leading-[0.92] tracking-[-0.04em] text-[#efe6d6]/45 transition-colors hover:text-[#efe6d6] md:text-[clamp(44px,5.2vw,76px)]">{l}</Link>
          ))}
        </nav>
        <div className="v4-m mt-10 flex flex-wrap justify-between gap-4 text-[15px]">
          <a href={site.phoneHref} className="v4-link">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="v4-link">{site.email}</a>
          <span>{site.hours}</span>
        </div>
      </div>
    </>
  );
}
