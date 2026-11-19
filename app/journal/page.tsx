import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Pic from "@/components/Pic";
import { posts } from "@/data/journal";

export const metadata: Metadata = { title: "Journal", description: "Notes on Dubai, Abu Dhabi and the desert from the Desert Stars team." };

export default function Journal() {
  const [first, ...rest] = posts;
  return (
    <>
      <PageHead eyebrow="The journal" title={<>Notes from <em>the Emirates</em></>} />
      <section className="px-page pb-28">
        <Link href={`/journal/${first.slug}`} className="group grid gap-8 border-t border-line pt-10 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <div className="zoom reveal-img aspect-[16/10] overflow-hidden bg-dune"><Pic name={first.image} sizes="(min-width:1024px) 60vw, 100vw" /></div>
          <div>
            <p className="eyebrow text-muted">{first.category}</p>
            <h2 className="title mt-3 text-[34px] lg:text-[44px]">{first.title}</h2>
            <p className="mt-4 text-muted">{first.excerpt}</p>
            <span className="u-link mt-6">Read the story</span>
          </div>
        </Link>
        <div className="mt-20 grid gap-12 md:grid-cols-2 md:gap-6">
          {rest.map((p) => (
            <Link key={p.slug} href={`/journal/${p.slug}`} className="group reveal">
              <div className="zoom reveal-img aspect-[3/2] overflow-hidden bg-dune"><Pic name={p.image} sizes="(min-width:768px) 50vw, 100vw" /></div>
              <p className="eyebrow mt-5 text-muted">{p.category}</p>
              <h2 className="title mt-2 text-[26px]">{p.title}</h2>
              <p className="mt-2 text-muted">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
