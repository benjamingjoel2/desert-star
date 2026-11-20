"use client";
import { useEffect, useState } from "react";
import Pic from "../Pic";

type Slide = { img: string; eyebrow: string; title: React.ReactNode };

/** Full-screen crossfading film: slow Ken Burns on each frame, numbered progress bars. */
export default function HeroSlides({ slides, gold = "#c9a86a", children }: { slides: Slide[]; gold?: string; children?: React.ReactNode }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((i + 1) % slides.length), 6500);
    return () => clearTimeout(t);
  }, [i, paused, slides.length]);
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-black text-[#ece4d6]" aria-roledescription="carousel" aria-label="Desert Stars in pictures">
      {slides.map((s, k) => (
        <div key={s.img} className={`absolute inset-0 transition-opacity duration-[1800ms] ease-out ${k === i ? "opacity-100" : "opacity-0"}`} aria-hidden={k !== i}>
          <div className={`absolute inset-0 ${k === i ? "kenburns" : ""}`} data-parallax="0.12">
            <Pic name={s.img} priority={k === 0} sizes="100vw" />
          </div>
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/20 to-[#07080c]/50" />
      <div className="px-page absolute inset-x-0 bottom-0 pb-10 lg:pb-14">
        <div className="grid">
        {slides.map((s, k) => (
          <div key={s.img} className={`[grid-area:1/1] self-end ${k === i ? "" : "pointer-events-none"}`} aria-hidden={k !== i}>
            <p className={`eyebrow mb-6 transition-all duration-1000 ${k === i ? "translate-y-0 opacity-100 delay-500" : "translate-y-4 opacity-0"}`} style={{ color: gold }}>{s.eyebrow}</p>
            <h1 className={`max-w-[15ch] font-[family-name:var(--c-display)] text-[54px] font-light leading-[0.95] tracking-[-0.02em] transition-all duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] sm:text-[80px] lg:text-[124px] ${k === i ? "translate-y-0 opacity-100 delay-500" : "-translate-y-6 opacity-0 duration-700"}`}>{s.title}</h1>
          </div>
        ))}
        </div>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <div className="flex items-center gap-4">
            {slides.map((s, k) => (
              <button key={s.img} type="button" onClick={() => setI(k)} className="group flex min-h-11 items-center gap-3 text-[12px] tracking-[0.2em]" aria-label={`Show slide ${k + 1}`} aria-current={k === i}>
                <span className={k === i ? "" : "opacity-50"}>{String(k + 1).padStart(2, "0")}</span>
                <span className="relative block h-px w-10 overflow-hidden bg-white/25 sm:w-16">
                  <span key={`${i}-${paused}`} className={`absolute inset-y-0 left-0 ${k === i && !paused ? "slide-progress" : k < i ? "w-full" : "w-0"}`} style={{ background: gold }} />
                </span>
              </button>
            ))}
            <button type="button" onClick={() => setPaused(!paused)} className="ml-2 grid h-11 w-11 place-items-center rounded-full border border-white/30 text-[11px]" aria-label={paused ? "Play slideshow" : "Pause slideshow"}>
              {paused ? "▶" : "❚❚"}
            </button>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
