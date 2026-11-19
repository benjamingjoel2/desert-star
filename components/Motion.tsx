"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * One motion engine for the whole site:
 * - Lenis inertia scrolling
 * - .reveal / .reveal-img / .split: animate in once when they enter the viewport
 * - [data-parallax="0.15"]: translateY relative to the viewport centre
 * - [data-count]: numbers count up
 * Everything is skipped when the visitor prefers reduced motion.
 */
let lenis: Lenis | null = null;

export default function Motion() {
  const path = usePathname();

  // Smooth scroll + parallax loop (once)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("js");
    if (reduce) return;
    lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true, touchMultiplier: 1.4 });
    let raf = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = parseFloat(el.dataset.parallax || "0.12");
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(${1 + speed * 0.9})`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    // Anchor links glide instead of jumping
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a || !a.hash || a.pathname !== location.pathname) return;
      const t = document.querySelector(a.hash);
      if (t) { e.preventDefault(); lenis?.scrollTo(t as HTMLElement, { offset: -120 }); history.replaceState(null, "", a.hash); }
    };
    document.addEventListener("click", onClick);
    return () => { cancelAnimationFrame(raf); document.removeEventListener("click", onClick); lenis?.destroy(); lenis = null; };
  }, []);

  // Per page: reset scroll, observe new elements
  const first = useRef(true);
  useEffect(() => {
    // Page fade only after the first load, so it never delays the first paint
    if (first.current) first.current = false;
    else document.documentElement.classList.add("navigated");
    if (!location.hash) lenis?.scrollTo(0, { immediate: true });
    else setTimeout(() => { const t = document.querySelector(location.hash); if (t) lenis?.scrollTo(t as HTMLElement, { offset: -120, immediate: true }); }, 50);

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          // A fully clipped .reveal-img never "intersects", so we watch its parent instead.
          if (el.dataset.revealHost !== undefined) el.querySelectorAll(":scope > .reveal-img, :scope > * > .reveal-img").forEach((c) => c.classList.add("in"));
          else el.classList.add("in");
          if (el.dataset.count) count(el);
          io.unobserve(el);
        }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
    );
    document.querySelectorAll(".reveal:not(.in), .split:not(.in), [data-count]").forEach((el) => io.observe(el));
    document.querySelectorAll<HTMLElement>(".reveal-img:not(.in)").forEach((el) => {
      const host = el.parentElement!;
      host.dataset.revealHost = "";
      io.observe(host);
    });
    return () => io.disconnect();
  }, [path]);

  return null;
}

function count(el: HTMLElement) {
  const target = el.dataset.count!;
  const n = parseFloat(target.replace(/[^\d.]/g, ""));
  if (!n || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const suffix = target.replace(/[\d,.]/g, "");
  const start = performance.now();
  const dur = 1800;
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    const v = Math.round(n * (1 - Math.pow(1 - p, 4)));
    el.textContent = v.toLocaleString("en") + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
