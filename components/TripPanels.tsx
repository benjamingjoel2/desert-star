"use client";
import Link from "next/link";
import { useState } from "react";
import Pic from "./Pic";

type Trip = { href: string; title: string; price: string; meta: string; text: string; img: string };

/** White Desert "Our trips": one wide open panel, the rest slim strips that blur until hovered. */
export default function TripPanels({ trips }: { trips: Trip[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col gap-2 lg:h-[640px] lg:flex-row">
      {trips.map((t, i) => {
        const on = i === open;
        return (
          <Link key={t.href} href={t.href} onMouseEnter={() => setOpen(i)} onFocus={() => setOpen(i)}
            className={`group relative h-[380px] overflow-hidden text-white transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] lg:h-auto ${on ? "lg:flex-[7]" : "lg:flex-[1]"}`}>
            <div className={`absolute inset-0 transition-transform duration-[900ms]`}><Pic name={t.img} sizes="(min-width:1024px) 60vw, 100vw" /></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className={`absolute left-6 top-6 transition-opacity duration-500 lg:left-8 lg:top-8 ${on ? "opacity-100 delay-300" : "lg:opacity-0"}`}>
              <h3 className="max-w-[14ch] font-script text-[34px] italic leading-[1.05] lg:text-[46px]">{t.title}</h3>
            </div>
            <div className={`absolute inset-x-6 bottom-6 transition-opacity duration-500 lg:inset-x-8 lg:bottom-8 ${on ? "opacity-100 delay-300" : "lg:opacity-0"}`}>
              <p className="flex flex-wrap gap-3 text-[13px] font-medium"><span>{t.price}</span><span className="opacity-60">/</span><span>{t.meta}</span></p>
              <p className="mt-2 max-w-sm text-[14px] text-white/85">{t.text}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
