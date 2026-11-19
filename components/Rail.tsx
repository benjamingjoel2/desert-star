"use client";
import { useEffect, useRef, useState } from "react";

/** Aman-style horizontal rail with a thin progress line and arrow buttons. */
export default function Rail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [w, setW] = useState(0.3);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => {
      const max = el.scrollWidth - el.clientWidth;
      setP(max > 0 ? el.scrollLeft / max : 0);
      setW(Math.min(1, el.clientWidth / el.scrollWidth));
    };
    on();
    el.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { el.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  const go = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <div className="min-w-0">
      <div ref={ref} role="region" aria-label={label} tabIndex={0} className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:gap-6">
        {children}
      </div>
      <div className="mt-8 flex items-center gap-6">
        <div className="relative h-px flex-1 bg-line" aria-hidden="true">
          <span className="absolute inset-y-0 bg-ink transition-[left] duration-300" style={{ width: `${w * 100}%`, left: `${p * (1 - w) * 100}%` }} />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center border border-line hover:border-ink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next" className="grid h-11 w-11 place-items-center border border-line hover:border-ink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
