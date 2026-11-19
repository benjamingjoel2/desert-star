import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Pic from "@/components/Pic";
import { posts, type Block } from "@/data/journal";

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

function render(b: Block, i: number) {
  switch (b.type) {
    case "p": return <p key={i}>{b.text}</p>;
    case "h": return <h2 key={i}>{b.text}</h2>;
    case "list": return <ul key={i}>{b.items.map((x) => <li key={x}>{x}</li>)}</ul>;
    case "table":
      return (
        <div key={i} className="no-scrollbar my-10 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
            <thead><tr>{b.head.map((h) => <th key={h} className="eyebrow border-b border-ink py-3 pr-4 font-normal text-muted">{h}</th>)}</tr></thead>
            <tbody>{b.rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`border-b border-line py-3 pr-4 align-top ${j === 0 ? "text-muted" : ""}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
    case "faq":
      return (
        <div key={i} className="mt-14 border-t border-line">
          <h2 className="eyebrow !font-sans !text-[11px] !text-muted !mt-8">Questions</h2>
          {b.items.map((f) => (
            <div key={f.q} className="border-b border-line py-5">
              <p className="title !mb-2 text-[19px]">{f.q}</p>
              <p className="!mb-0 text-muted">{f.a}</p>
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
  return (
    <article>
      <header className="px-page grid gap-8 pb-14 pt-36 lg:grid-cols-[1fr_2fr] lg:pt-48">
        <p className="eyebrow text-muted"><Link href="/journal" className="hover:underline">Journal</Link> · {p.category}</p>
        <h1 className="display text-[40px] sm:text-[56px] lg:text-[68px]">{p.title}</h1>
      </header>
      <div className="aspect-[16/8] max-h-[78svh] w-full overflow-hidden bg-dune"><Pic name={p.image} priority alt="" /></div>
      <div className="px-page grid gap-8 py-16 lg:grid-cols-[1fr_2fr] lg:py-24">
        <p className="eyebrow text-muted">{new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
        <div className="prose-ds max-w-2xl text-[17px]">{p.body.map(render)}</div>
      </div>
    </article>
  );
}
