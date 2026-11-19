import PageHead from "./PageHead";

export default function Legal({ title, updated, sections }: { title: string; updated: string; sections: [string, string[]][] }) {
  return (
    <>
      <PageHead eyebrow={`Last updated ${updated}`} title={title} />
      <section className="px-page grid gap-8 border-t border-line pb-28 pt-16 lg:grid-cols-[1fr_2fr]">
        <nav aria-label="Sections" className="hidden lg:block">
          <ol className="sticky top-28 space-y-2 text-[14px] text-muted">
            {sections.map(([h], i) => <li key={h}><a className="hover:text-ink" href={`#s${i + 1}`}>{i + 1}. {h}</a></li>)}
          </ol>
        </nav>
        <div className="prose-ds max-w-2xl text-[16px]">
          {sections.map(([h, ps], i) => (
            <section key={h} id={`s${i + 1}`} className="scroll-mt-28">
              <h2>{i + 1}. {h}</h2>
              {ps.map((p) => <p key={p}>{p}</p>)}
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
