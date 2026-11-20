import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Pic from "@/components/Pic";
import { Steps } from "@/components/concepts/v4/Chrome";
import { credits } from "@/data/credits";

export const metadata: Metadata = { title: "Photo credits" };

const n2 = (i: number) => String(i).padStart(2, "0");

export default function Credits() {
  return (
    <>
      <PageHead eyebrow="Photo credits" title="Photo credits" intro="Some photographs on this site are shared under Creative Commons licences. With thanks to their photographers." />

      <div className="relative">
        <div className="h-[72px] md:h-[130px]" aria-hidden="true" />
        <Steps tone="sand" chips={["Creative Commons", `${n2(credits.length)} photographs`, "Wikimedia Commons", "With thanks"]} />
      </div>

      <section className="bg-[#efe6d6] px-5 pb-[16svh] pt-10 text-[#1c140d] md:px-10 md:pt-16" aria-labelledby="credits-list">
        <div className="v4-m mb-2 flex justify-between border-b border-[#1c140d]/20 pb-3 text-[15px] text-[#1c140d]/70">
          <h2 id="credits-list" className="font-normal">{"{Creative Commons}"}</h2><span>({n2(credits.length)})</span>
        </div>
        <div className="v4-m hidden grid-cols-[64px_88px_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-6 border-b border-[#1c140d]/20 py-3 text-[15px] text-[#1c140d]/60 md:grid" aria-hidden="true">
          <span>No.</span><span /><span>Title</span><span>Photographer</span><span>Licence</span><span>Link</span>
        </div>
        <ol>
          {credits.map((c, i) => (
            <li key={c.image} className="reveal grid grid-cols-[64px_minmax(0,1fr)] gap-x-4 gap-y-1 border-b border-[#1c140d]/20 py-5 md:grid-cols-[64px_88px_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center md:gap-6" style={{ ["--d" as string]: `${(i % 4) * 60}ms` }}>
              <span className="v4-m row-span-4 text-[15px] text-[#1c140d]/60 md:row-span-1">
                <span className="mb-2 block md:hidden">{n2(i + 1)}</span>
                <span className="relative block aspect-square w-16 overflow-hidden rounded-[4px] bg-[#1a1510] md:hidden"><Pic name={c.image} alt="" sizes="64px" /></span>
                <span className="hidden md:inline">{n2(i + 1)}</span>
              </span>
              <span className="relative hidden aspect-square w-[88px] overflow-hidden rounded-[4px] bg-[#1a1510] md:block"><Pic name={c.image} alt="" sizes="88px" /></span>
              <span className="text-[22px] leading-[1.08] tracking-[-0.02em] md:text-[28px]">{c.title}</span>
              <span className="text-[15px] md:text-[16px]">{c.author}</span>
              <span className="v4-m text-[16px] text-[#1c140d]/70">{c.license}</span>
              <a className="v4-m v4-link mt-1 justify-self-start text-[16px] md:mt-0" href={c.source} target="_blank" rel="noopener noreferrer">
                Source ↗<span className="sr-only">: {c.title} on Wikimedia Commons</span>
              </a>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
