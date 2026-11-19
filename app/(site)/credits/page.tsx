import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import { credits } from "@/data/credits";

export const metadata: Metadata = { title: "Photo credits" };

export default function Credits() {
  return (
    <>
      <PageHead eyebrow="Photo credits" title="Photo credits" intro="Some photographs on this site are shared under Creative Commons licences. With thanks to their photographers." />
      <section className="px-page border-t border-line pb-28 pt-12">
        <ul className="divide-y divide-line border-b border-line">
          {credits.map((c) => (
            <li key={c.image} className="grid gap-1 py-5 md:grid-cols-[2fr_1fr_1fr_auto] md:items-baseline md:gap-6">
              <span className="title text-[22px]">{c.title}</span>
              <span>{c.author}</span>
              <span className="text-muted">{c.license}</span>
              <a className="u-link justify-self-start" href={c.source}>Source</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
