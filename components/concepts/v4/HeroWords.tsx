"use client";
import { useEffect, useState } from "react";

/** Giant two-line hero headline that cycles through phrases: each line rises in, holds, then rises out. */
const PHRASES: [string, string][] = [
  ["Desert", "Stars"],
  ["Born in", "the dunes"],
  ["Local", "boutique"],
  ["Desert tour", "operator"],
  ["Private", "evenings"],
  ["Small", "groups"],
  ["Door to", "door"],
];
const HOLD = 2600;

export default function HeroWords({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % PHRASES.length), HOLD);
    return () => clearInterval(id);
  }, []);
  return (
    <h1 className={className}>
      <span className="sr-only">Desert Stars, born in the dunes: a local boutique desert tour operator in Dubai</span>
      <span aria-hidden="true" className="hw grid">
        {PHRASES.map(([a, b], k) => (
          <span key={a + b} data-on={k === i ? "1" : k === (i - 1 + PHRASES.length) % PHRASES.length ? "out" : "0"} className="hw-p [grid-area:1/1]">
            <span className="hw-l"><span className="hw-i">{a}</span></span>
            <span className="hw-l"><span className="hw-i" style={{ transitionDelay: "120ms" }}>{b}</span></span>
          </span>
        ))}
      </span>
      <style>{`
        .hw-l { display: block; overflow: hidden; padding-bottom: .06em; margin-bottom: -.06em; }
        .hw-i { display: inline-block; transform: translate3d(0, 110%, 0); transition: transform 1s cubic-bezier(.16,1,.3,1); }
        .hw-p[data-on="1"] .hw-i { transform: none; }
        .hw-p[data-on="out"] .hw-i { transform: translate3d(0, -110%, 0); transition-duration: .8s; }
        @media (prefers-reduced-motion: reduce) { .hw-p:not(:first-child) { display: none; } .hw-i { transform: none !important; transition: none; } }
      `}</style>
    </h1>
  );
}
