"use client";
import Link from "next/link";
import { useState } from "react";
import Pic from "./Pic";

type Item = { slug: string; name: string; blurb: string; image: string; count: number };

/** White Desert-style expanding panels: one open, the rest slim strips. Stacks on mobile. */
export default function Strips({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col gap-2 lg:h-[620px] lg:flex-row">
      {items.map((it, i) => {
        const on = i === open;
        return (
          <Link
            key={it.slug}
            href={`/experiences#${it.slug}`}
            onMouseEnter={() => setOpen(i)}
            onFocus={() => setOpen(i)}
            className={`group relative h-[340px] overflow-hidden text-white transition-[flex-grow] duration-700 ease-[cubic-bezier(.16,1,.3,1)] lg:h-auto ${on ? "lg:flex-[6]" : "lg:flex-[1]"}`}
          >
            <div className="absolute inset-0"><Pic name={it.image} sizes="(min-width:1024px) 70vw, 100vw" /></div>
            <div className={`absolute inset-0 transition-colors duration-700 ${on ? "bg-gradient-to-t from-black/70 via-black/10 to-transparent" : "bg-black/45"}`} />
            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
              <p className="eyebrow mb-3 text-white/80">{String(i + 1).padStart(2, "0")} · {it.count} experiences</p>
              <h3 className={`display whitespace-nowrap text-[34px] italic transition-opacity duration-500 lg:text-[44px] ${on ? "opacity-100" : "lg:opacity-0"}`}>{it.name}</h3>
              <p className={`mt-3 max-w-md text-[15px] text-white/85 transition-opacity duration-500 ${on ? "opacity-100" : "lg:opacity-0"}`}>{it.blurb}</p>
            </div>
            <span className={`absolute left-1/2 top-8 hidden -translate-x-1/2 whitespace-nowrap eyebrow text-white [writing-mode:vertical-rl] lg:block ${on ? "opacity-0" : "opacity-100"} transition-opacity`}>{it.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
