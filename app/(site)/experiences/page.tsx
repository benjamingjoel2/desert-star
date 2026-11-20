import type { Metadata } from "next";
import Pic from "@/components/Pic";
import Split from "@/components/Split";
import TourCard from "@/components/TourCard";
import { categories, site } from "@/data/site";
import { byCategory, tours } from "@/lib/tours";
import { pad, Steps } from "@/components/concepts/v4/Chrome";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Desert safaris in Lehbab, dhow dinner cruises, and guided days in Dubai, Abu Dhabi, Al Ain and Sharjah.",
};

const two = (n: number) => String(n).padStart(2, "0");

export default function Experiences() {
  return (
    <>
      {/* ───────── Hero: giant 2 lines, centre card grows ───────── */}
      <section className="v4-hero relative h-[200svh]" data-scrub="sticky" aria-label="The experiences">
        <div className="sticky top-0 h-svh overflow-hidden">
          <div className="kenburns absolute inset-0"><Pic name="desert-sunset" alt="Red dunes under a low sun" sizes="100vw" priority /></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08]/60 via-[#0c0a08]/15 to-[#0c0a08]/45" />
          <h1 className="v4-fade v4-g absolute inset-x-0 top-[64px] text-center md:top-[26px]">
            <span className="block"><Split>The</Split></span>
            <span className="block"><Split delay={140}>experiences</Split></span>
          </h1>
          <div className="v4-card shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)]">
            <div className="h-full w-full"><Pic name="camp-lanterns" alt="A lantern-lit Bedouin camp at dusk" sizes="100vw" /></div>
            <div className="v4-tint absolute inset-0 bg-[#0c0a08]/50" />
          </div>
          <nav aria-label="Categories" className="v4-navrow absolute inset-x-0 z-10 grid -translate-y-1/2 grid-cols-4 px-2 text-center md:px-[10vw]">
            {categories.map((c) => (
              <a key={c.slug} href={`#${c.slug}`} className="v4-m v4-link justify-self-center text-[13px] text-[#efe6d6] [text-shadow:0_1px_10px_rgba(0,0,0,.5)] md:text-[17px]">
                {c.name.split(" ")[0]}
              </a>
            ))}
          </nav>
          <p className="v4-fade v4-m absolute inset-x-0 bottom-6 flex justify-between px-5 text-[14px] md:px-[27px] md:text-[17px]">
            <span>{"{Experiences}"}</span><span>({two(tours.length)}) · Dubai · UAE</span>
          </p>
        </div>
      </section>

      {/* ───────── Statement + category anchors ───────── */}
      <section className={`${pad} bg-[#0c0a08] pb-[10svh] pt-[14svh] md:pt-[16svh]`} aria-labelledby="xp-intro">
        <h2 id="xp-intro" className="v4-m mb-6 text-[15px] text-[#efe6d6]/75">{`{${tours.length} experiences, four ways in}`}</h2>
        <p className="v4-s reveal max-w-[1040px] indent-[16vw] md:indent-[8vw]">
          Desert, city <span className="v4-i text-[1.08em]">and water.</span> Every experience includes pick-up from your hotel or residence in Dubai unless noted, and free cancellation up to 24 hours before.
        </p>
        <ul className="reveal mt-12 flex flex-wrap gap-2 md:ml-[24.3%] md:mt-14" style={{ ["--d" as string]: "150ms" }}>
          {categories.map((c) => (
            <li key={c.slug}>
              <a href={`#${c.slug}`} className="v4-m v4-box text-[17px] hover:opacity-80">
                {`{${c.name}}`} ({two(byCategory(c.slug).length)})
              </a>
            </li>
          ))}
        </ul>
        <p className="reveal mt-8 max-w-[62ch] text-[14px] leading-[1.62] text-[#efe6d6]/80 md:ml-[24.3%]" style={{ ["--d" as string]: "220ms" }}>
          {site.response} {site.cancellation}
        </p>
      </section>

      {/* ───────── Categories, alternating night and sand, joined by staircases ───────── */}
      {categories.map((c, i) => {
        const list = byCategory(c.slug);
        const sand = i % 2 === 1;
        const next = categories[i + 1];
        const [first, ...rest] = c.name.split(" ");
        return (
          <section
            key={c.slug}
            id={c.slug}
            className={`relative scroll-mt-16 ${pad} pt-[12svh] ${next ? "pb-[calc(14svh+72px)] md:pb-[calc(16svh+130px)]" : "pb-[16svh]"} ${sand ? "bg-[#efe6d6] text-[#1c140d]" : "bg-[#0c0a08] text-[#efe6d6]"}`}
            aria-labelledby={`xp-${c.slug}`}
          >
            <div className={`v4-m mb-6 flex justify-between border-t pt-3 text-[15px] ${sand ? "border-[#1c140d]/20 text-[#1c140d]/70" : "border-[#efe6d6]/20 text-[#efe6d6]/70"}`}>
              <span>{`{${two(i + 1)} / ${two(categories.length)}}`}</span>
              <span>({two(list.length)}) {list.length === 1 ? "experience" : "experiences"}</span>
            </div>
            <h2 id={`xp-${c.slug}`} className="v4-g">
              <span className="block"><Split>{first}</Split></span>
              <span className="block text-right"><Split delay={120}>{rest.join(" ")}</Split></span>
            </h2>
            <p className="v4-i reveal mt-6 max-w-[22ch] text-[24px] leading-[1.08] md:-mt-[0.9em] md:text-[34px]">{c.blurb}</p>
            <ul className="mt-14 grid gap-x-5 gap-y-14 sm:grid-cols-2 md:mt-[12svh] lg:grid-cols-3 lg:gap-x-[21px]">
              {list.map((t, k) => (
                <li key={t.slug}>
                  <TourCard t={t} n={k + 1} />
                </li>
              ))}
            </ul>
            {next && (
              <Steps
                tone={sand ? "night" : "sand"}
                chips={[`Next · ${two(i + 2)}`, next.name, `${two(byCategory(next.slug).length)} experiences`, "Free cancellation 24h"]}
              />
            )}
          </section>
        );
      })}
    </>
  );
}
