import Pic from "./Pic";
import Split from "./Split";

/** Splits a plain-string title into two roughly equal lines (MC: giant 2-line headlines). */
function twoLines(title: string): [string, string] {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return [title, ""];
  let best = 1;
  let diff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const d = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (d < diff) { diff = d; best = i; }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

/**
 * Concept 4 inner-page header: mono boxed chips, a giant uppercase 2-line title,
 * an optional photo and a 46px statement. A string title is broken into two lines;
 * in a node title, an <em> becomes the second line.
 */
export default function PageHead({ eyebrow, title, intro, label, image, imageAlt = "" }: {
  eyebrow: string; title: React.ReactNode; intro?: string; label?: string; image?: string; imageAlt?: string;
}) {
  const [a, b] = typeof title === "string" ? twoLines(title) : ["", ""];
  return (
    <section className="relative bg-[#0c0a08] px-5 pb-[10svh] pt-[104px] md:px-10 md:pb-[14svh] md:pt-[132px]">
      <div className="v4-m fade-in flex flex-wrap items-start justify-between gap-3 text-[15px] md:text-[17px]">
        <span className="v4-box">{`{${eyebrow}}`}</span>
        <span className="text-[#efe6d6]/70">Desert Stars · Dubai</span>
      </div>
      <h1 className="v4-g mt-[8svh] break-words [&_em]:block [&_em]:not-italic md:[&_em]:text-right md:mt-[10svh]">
        {typeof title === "string" ? (
          <>
            <span className="block"><Split delay={80}>{a}</Split></span>
            {b && <span className="block md:text-right"><Split delay={220}>{b}</Split></span>}
          </>
        ) : (
          <Split delay={80}>{title}</Split>
        )}
      </h1>
      {image && (
        <div className="reveal-img relative mt-[8svh] aspect-[4/5] overflow-hidden rounded-[4px] bg-[#1a1510] md:mx-auto md:aspect-[16/9] md:w-[62.8vw]">
          <div className="absolute inset-x-0 -inset-y-[6%]" data-parallax="0.08"><Pic name={image} alt={imageAlt} sizes="(min-width:768px) 63vw, 100vw" priority /></div>
        </div>
      )}
      {(intro || label) && (
        <div className="mt-[8svh] md:mt-[12svh]">
          {label && <p className="v4-i fade-in mb-4 text-[24px] leading-none text-[#efe6d6]/85 md:text-[28px]" style={{ ["--d" as string]: "400ms" }}>{label}</p>}
          {intro && <p className="v4-s reveal max-w-[1080px] indent-[16vw] md:indent-[8vw]">{intro}</p>}
        </div>
      )}
    </section>
  );
}
