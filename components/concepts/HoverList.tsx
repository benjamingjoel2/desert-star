"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import Pic from "../Pic";

type Row = { href: string; title: string; meta: string; price: string; img: string };

/** Index list whose photo floats beside the cursor. On touch, rows show a thumbnail instead. */
export default function HoverList({ rows, tone = "dark" }: { rows: Row[]; tone?: "dark" | "light" }) {
  const box = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const move = (e: React.MouseEvent) => {
    const el = box.current;
    if (!el) return;
    const r = el.parentElement!.getBoundingClientRect();
    el.style.transform = `translate3d(${e.clientX - r.left + 28}px, ${e.clientY - r.top - 140}px, 0)`;
  };
  const line = tone === "dark" ? "border-white/12" : "border-black/12";
  return (
    <div className="relative" onMouseMove={move} onMouseLeave={() => setActive(null)}>
      <ul className={`border-t ${line}`}>
        {rows.map((r, k) => (
          <li key={r.href} className={`border-b ${line}`}>
            <Link href={r.href} onMouseEnter={() => setActive(k)} onFocus={() => setActive(k)}
              className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-1 py-5 transition-[padding] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:pl-4 md:grid-cols-[3rem_1fr_14rem_10rem] md:py-7">
              <span className="text-[12px] tracking-[0.2em] opacity-50 max-md:row-span-2">{String(k + 1).padStart(2, "0")}</span>
              <span className="font-[family-name:var(--c-display)] text-[26px] leading-tight md:text-[38px]">{r.title}</span>
              <span className="text-[13px] opacity-60 max-md:col-start-2">{r.meta}</span>
              <span className="text-[13px] opacity-80 max-md:hidden md:text-right">{r.price}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={box} className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[280px] w-[220px] overflow-hidden transition-[transform] duration-[400ms] ease-out lg:block" aria-hidden="true">
        {rows.map((r, k) => (
          <div key={r.href} className={`absolute inset-0 transition-[opacity,clip-path] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${active === k ? "opacity-100 [clip-path:inset(0)]" : "opacity-0 [clip-path:inset(100%_0_0_0)]"}`}>
            <Pic name={r.img} sizes="220px" />
          </div>
        ))}
      </div>
    </div>
  );
}
