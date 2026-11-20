import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Pic from "@/components/Pic";
import { posts, type Block } from "@/data/journal";
import Split from "@/components/Split";
import { Steps } from "@/components/concepts/v4/Chrome";

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
const rule = "border-[#1c140d]/20";

function render(b: Block, i: number) {
  switch (b.type) {
    case "p": return <p key={i} className="my-5">{b.text}</p>;
    case "h": return <h2 key={i} className="mb-4 mt-14 text-[26px] leading-[1.05] tracking-[-0.02em] text-[#1c140d] md:text-[34px]">{b.text}</h2>;
    case "list":
      return (
        <ul key={i} className={`my-6 border-t ${rule}`}>
          {b.items.map((x) => (
            <li key={x} className={`grid grid-cols-[28px_1fr] gap-2 border-b ${rule} py-3`}>
              <span className="v4-m pt-[3px] text-[15px] text-[#1c140d]/60" aria-hidden="true">—</span>
              <span>{x}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div key={i} className="no-scrollbar my-10 overflow-x-auto" tabIndex={0} role="region" aria-label="Comparison table">
          <table className="w-full min-w-[560px] border-collapse text-left text-[15px] leading-[1.5]">
            <thead>
              <tr>{b.head.map((h) => <th key={h} scope="col" className="v4-m border-b border-[#1c140d] py-3 pr-4 text-[16px] font-normal text-[#1c140d]/70">{h}</th>)}</tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r[0]}>
                  {r.map((c, j) => j === 0
                    ? <th key={j} scope="row" className={`border-b ${rule} py-3 pr-4 align-top font-normal text-[#1c140d]`}>{c}</th>
                    : <td key={j} className={`border-b ${rule} py-3 pr-4 align-top`}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "faq":
      return (
        <div key={i} className="mt-16">
          <div className={`v4-m flex justify-between border-b ${rule} pb-3 text-[15px] text-[#1c140d]/70`}>
            <h2 className="font-normal">{"{Questions}"}</h2><span>({String(b.items.length).padStart(2, "0")})</span>
          </div>
          {b.items.map((f, k) => (
            <div key={f.q} className={`grid grid-cols-[36px_1fr] gap-x-3 border-b ${rule} py-5`}>
              <span className="v4-m pt-[5px] text-[15px] text-[#1c140d]/60">{String(k + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-[20px] leading-[1.15] tracking-[-0.02em] text-[#1c140d] md:text-[22px]">{f.q}</p>
                <p className="mt-2">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      );
  }
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  const more = posts.filter((x) => x.slug !== p.slug);
  return (
    <article>
      <header className="bg-[#0c0a08] px-5 pb-[8svh] pt-[104px] md:px-10 md:pb-[10svh] md:pt-[132px]">
        <div className="v4-m fade-in flex flex-wrap items-start gap-2 text-[15px] md:text-[17px]">
          <Link href="/journal" className="v4-box hover:opacity-80">{"{Journal}"}</Link>
          <span className="border border-[#efe6d6]/30 px-[5px] pb-[1px] pt-[2px]">{p.category}</span>
          <span className="border border-[#efe6d6]/30 px-[5px] pb-[1px] pt-[2px]"><time dateTime={p.date}>{fmt(p.date)}</time></span>
        </div>
        <h1 className="mt-[8svh] max-w-[16ch] break-words text-[clamp(38px,7vw,112px)] uppercase leading-[0.86] tracking-[-0.05em] md:mt-[10svh]">
          <Split delay={80}>{p.title}</Split>
        </h1>
        <p className="v4-s reveal mt-[6svh] max-w-[900px] indent-[16vw] text-[#efe6d6]/90 md:indent-[8vw]">{p.excerpt}</p>
      </header>

      <div className="relative h-[78svh] w-full overflow-hidden bg-[#1a1510] md:h-[92svh]">
        <div className="hero-zoom absolute inset-0" data-parallax="0.12"><Pic name={p.image} priority alt="" sizes="100vw" /></div>
        <Steps tone="sand" chips={[p.category, fmt(p.date), "Desert Stars journal", "Dubai · UAE"]} />
      </div>

      <div className="bg-[#efe6d6] px-5 pb-[14svh] pt-10 text-[#1c140d] md:px-10 md:pt-16">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10">
          <aside className="v4-m text-[15px] text-[#1c140d]/70 md:text-[17px]">
            <div className="flex flex-wrap gap-x-6 gap-y-1 md:sticky md:top-24 md:block md:space-y-[3px]">
              <p>{`{${p.category}}`}</p>
              <p><time dateTime={p.date}>{fmt(p.date)}</time></p>
              <p><Link href="/journal" className="v4-link text-[#1c140d]">← All stories</Link></p>
            </div>
          </aside>
          <div className="max-w-[66ch] text-[17px] leading-[1.68] text-[#1c140d]/85 md:text-[18px] [&>p:first-child]:mt-0">
            {p.body.map(render)}
          </div>
        </div>

        {more.length > 0 && (
          <nav aria-label="More stories" className="mt-[14svh]">
            <div className={`v4-m mb-2 flex justify-between border-b ${rule} pb-3 text-[15px] text-[#1c140d]/70`}>
              <span>{"{More from the journal}"}</span><span>({String(more.length).padStart(2, "0")})</span>
            </div>
            <ul>
              {more.map((m) => (
                <li key={m.slug} className={`border-b ${rule}`}>
                  <Link href={`/journal/${m.slug}`} className="group grid grid-cols-[72px_1fr] items-center gap-4 py-4 md:grid-cols-[120px_1fr_auto] md:gap-8 md:py-5">
                    <span className="relative block aspect-square overflow-hidden rounded-[4px] bg-[#1a1510]"><Pic name={m.image} alt="" sizes="120px" /></span>
                    <span className="text-[22px] leading-[1.05] tracking-[-0.02em] text-[#6b5d49] transition-colors duration-500 group-hover:text-[#1c140d] md:text-[clamp(26px,3.2vw,46px)]">{m.title}</span>
                    <span className="v4-m col-start-2 text-[15px] text-[#1c140d]/70 md:col-start-auto">{m.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </article>
  );
}
