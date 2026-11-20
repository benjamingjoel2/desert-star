import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Pic from "@/components/Pic";
import { Steps } from "@/components/concepts/v4/Chrome";
import { posts } from "@/data/journal";

export const metadata: Metadata = { title: "Journal", description: "Notes on Dubai, Abu Dhabi and the desert from the Desert Stars team." };

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const n2 = (i: number) => String(i).padStart(2, "0");
const cats = [...new Set(posts.map((p) => p.category))];
const chips: [string, string, string, string] = [cats[0] ?? "Dubai", cats[1] ?? "Abu Dhabi", cats[2] ?? "The desert", `${n2(posts.length)} stories`];

export default function Journal() {
  return (
    <>
      <PageHead
        eyebrow="The journal"
        title={<>Notes from <em>the Emirates</em></>}
        intro="Notes on Dubai, Abu Dhabi and the desert from the Desert Stars team, for planning your days in the Emirates."
      />

      <section className="relative bg-[#0c0a08] px-5 pb-[calc(72px+12svh)] md:px-10 md:pb-[calc(130px+14svh)]" aria-label="All stories">
        <div className="v4-m mb-4 flex justify-between border-b border-[#efe6d6]/20 pb-3 text-[15px] text-[#efe6d6]/70">
          <span>{"{Stories}"}</span><span>({n2(posts.length)})</span>
        </div>

        <ol>
          {posts.map((p, i) => (
            <li key={p.slug} className="border-b border-[#efe6d6]/20">
              <Link href={`/journal/${p.slug}`} className="group grid gap-6 py-8 md:grid-cols-12 md:gap-10 md:py-12">
                <div className={`reveal-img relative aspect-[4/3] overflow-hidden rounded-[4px] bg-[#1a1510] md:col-span-7 md:aspect-[3/2] ${i % 2 ? "md:order-2 md:col-start-6" : ""}`}>
                  <div className="absolute inset-x-0 -inset-y-[6%]" data-parallax="0.06">
                    <div className="h-full w-full transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]">
                      <Pic name={p.image} alt="" sizes="(min-width:768px) 58vw, 100vw" priority={i === 0} />
                    </div>
                  </div>
                  <span className="v4-m v4-box absolute bottom-3 left-3">{p.category}</span>
                </div>
                <div className={`flex flex-col justify-between gap-6 md:col-span-5 ${i % 2 ? "md:order-1" : ""}`}>
                  <div>
                    <div className="v4-m flex flex-wrap gap-2 text-[15px]">
                      <span className="text-[#efe6d6]/60">{n2(i + 1)}</span>
                      <span className="border border-[#efe6d6]/30 px-[5px] pb-[1px] pt-[2px]">{p.category}</span>
                      <span className="border border-[#efe6d6]/30 px-[5px] pb-[1px] pt-[2px]"><time dateTime={p.date}>{fmt(p.date)}</time></span>
                    </div>
                    <h2 className="mt-5 text-[30px] leading-[1.02] tracking-[-0.03em] md:text-[clamp(32px,3.2vw,46px)]">{p.title}</h2>
                  </div>
                  <div>
                    <p className="max-w-[46ch] text-[15px] leading-[1.6] text-[#efe6d6]/80">{p.excerpt}</p>
                    <span className="v4-m v4-link mt-5 inline-block text-[17px]">{"{Read the story}"}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
        <Steps tone="sand" chips={chips} />
      </section>
      <div className="h-12 bg-[#efe6d6] md:h-16" aria-hidden="true" />
    </>
  );
}
