import Pic from "./Pic";

export function Swoosh({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 60" className={className} fill="none" aria-hidden="true">
      <path d="M2 38 C 90 6, 250 8, 418 30 M40 52 C 150 30, 300 34, 400 44" stroke="currentColor" strokeWidth="1" className="draw-line" />
    </svg>
  );
}

/** Words that fill from pale to ink as the block scrolls past (White Desert). */
export function FillWords({ text, before = "", inlineImg, className = "display text-[30px] sm:text-[44px] lg:text-[62px]" }: { text: string; before?: string; inlineImg?: string; className?: string }) {
  const words = text.split(" ");
  const n = words.length;
  return (
    <p className={`fill-words ${className}`} data-scrub="pass" aria-label={`${before} ${text}`.trim()}>
      {before && <span aria-hidden="true">{before} </span>}
      {inlineImg && (
        <span aria-hidden="true" className="mx-2 inline-block h-[0.8em] w-[1.3em] overflow-hidden rounded-[3px] align-[-0.05em]"><Pic name={inlineImg} sizes="120px" /></span>
      )}
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="fw" style={{ ["--i" as string]: i, ["--n" as string]: n }}>{w} </span>
      ))}
    </p>
  );
}
