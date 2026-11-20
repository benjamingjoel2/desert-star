import PageHead from "./PageHead";
import { Steps } from "./concepts/v4/Chrome";
import { site } from "@/data/site";

const n2 = (i: number) => String(i + 1).padStart(2, "0");

/** Concept 4 legal page: giant title, staircase into sand, numbered index + readable body. */
export default function Legal({ title, updated, sections }: { title: string; updated: string; sections: [string, string[]][] }) {
  return (
    <>
      <div className="relative">
        <PageHead eyebrow={`Last updated ${updated}`} title={title} />
        <div className="h-[72px] md:h-[130px]" aria-hidden="true" />
        <Steps tone="sand" chips={[`Updated ${updated}`, `${n2(sections.length - 1)} sections`, "Desert Stars · Dubai", site.email]} />
      </div>

      <section className="bg-[#efe6d6] px-5 pb-[16svh] pt-10 text-[#1c140d] md:px-10 md:pt-16" aria-label={title}>
        <div className="v4-m mb-4 flex justify-between border-b border-[#1c140d]/20 pb-3 text-[15px] text-[#1c140d]/70">
          <span>{`{${title}}`}</span><span>{n2(sections.length - 1)} sections</span>
        </div>

        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10">
          <nav aria-label="Sections" className="md:pt-2">
            <ol className="v4-m grid grid-cols-1 gap-x-6 text-[16px] sm:grid-cols-2 md:sticky md:top-24 md:grid-cols-1 md:text-[17px]">
              {sections.map(([h], i) => (
                <li key={h} className="border-b border-[#1c140d]/15 py-2 md:border-0 md:py-[3px]">
                  <a href={`#s${i + 1}`} className="v4-link"><span className="mr-3 text-[#1c140d]/60">{n2(i)}</span>{h}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-[68ch]">
            {sections.map(([h, ps], i) => (
              <section key={h} id={`s${i + 1}`} className="scroll-mt-24 border-t border-[#1c140d]/20 pb-10 pt-5 first:border-t-0 first:pt-0 md:pb-14">
                <div className="flex items-baseline gap-4">
                  <span className="v4-m shrink-0 text-[15px] text-[#1c140d]/60">{n2(i)}</span>
                  <h2 className="text-[26px] leading-[1.05] tracking-[-0.02em] md:text-[34px]">{h}</h2>
                </div>
                <div className="mt-4 space-y-4 text-[16px] leading-[1.65] text-[#1c140d]/85 md:ml-[calc(2ch+1rem)] md:text-[17px]">
                  {ps.map((p) => <p key={p}>{p}</p>)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
