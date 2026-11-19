import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Pic from "@/components/Pic";
import TourCard from "@/components/TourCard";
import Split from "@/components/Split";
import { categories, site, waLink } from "@/data/site";
import { cover, getTour, price, tours } from "@/lib/tours";

export const dynamicParams = false;
export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = getTour((await params).slug);
  if (!t) return {};
  return { title: t.title, description: t.short, openGraph: { images: [`/img/${cover(t)}-1080.webp`] } };
}

function List({ items, mark = "—" }: { items: string[]; mark?: string }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((x) => (
        <li key={x} className="flex gap-4 py-3.5 text-[15px]"><span aria-hidden="true" className="text-muted">{mark}</span>{x}</li>
      ))}
    </ul>
  );
}

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = getTour((await params).slug);
  if (!t) notFound();
  const cat = categories.find((c) => c.slug === t.category)!;
  const related = tours.filter((x) => x.category === t.category && x.slug !== t.slug).slice(0, 4);
  const msg = `Hello Desert Stars, I'd like to book: ${t.title}. Date: ___ Guests: ___`;
  const facts = [
    ["Price", price(t) + (t.adult ? " per adult" : "")],
    ...(t.child ? [["Children 5 to 11", `AED ${t.child.toLocaleString("en")}`]] : []),
    ["Duration", t.timing],
    ["Where", t.location],
    ...(t.groupSize ? [["Group size", `Up to ${t.groupSize.replace(" People", " guests")}`]] : []),
  ];

  return (
    <>
      <section className="relative h-[78svh] min-h-[540px] overflow-hidden bg-night text-white">
        <div className="hero-zoom absolute inset-0" data-parallax="0.18"><Pic name={cover(t)} priority alt={t.title} /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
        <div className="px-page absolute inset-x-0 bottom-0 pb-10 lg:pb-14">
          <p className="eyebrow fade-in mb-4 text-white/85">
            <Link href={`/experiences#${cat.slug}`} className="hover:underline">{cat.name}</Link> · {t.location}
          </p>
          <h1 className="display max-w-[20ch] text-[40px] sm:text-[56px] lg:text-[72px]"><Split delay={200}>{t.title}</Split></h1>
        </div>
      </section>

      <div className="px-page grid gap-16 py-16 lg:grid-cols-[1fr_380px] lg:gap-20 lg:py-24">
        <div className="min-w-0">
          <p className="display text-[26px] lg:text-[34px]"><Split>{t.short}</Split></p>
          {t.overview && <p className="reveal mt-8 max-w-2xl text-[16px] text-muted">{t.overview}</p>}

          {t.images.filter((im) => im !== cover(t)).length > 0 && (
            <div className="no-scrollbar mt-14 flex snap-x gap-3 overflow-x-auto">
              {t.images.filter((im) => im !== cover(t)).map((im) => (
                <div key={im} className="reveal-img aspect-[4/3] w-[80%] shrink-0 snap-start overflow-hidden bg-dune sm:w-[46%]">
                  <Pic name={im} sizes="(min-width:1024px) 30vw, 80vw" />
                </div>
              ))}
            </div>
          )}

          {t.highlights.length > 0 && (
            <section className="reveal mt-20">
              <h2 className="eyebrow mb-6 text-muted">Highlights</h2>
              <List items={t.highlights} mark="✦" />
            </section>
          )}

          {t.itinerary.length > 0 && (
            <section className="mt-20">
              <h2 className="eyebrow mb-6 text-muted">How the day unfolds</h2>
              <ol className="border-l border-line">
                {t.itinerary.map((s, i) => (
                  <li key={s} className="reveal relative pb-7 pl-8 last:pb-0" style={{ ["--d" as string]: `${i * 70}ms` }}>
                    <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border border-ink bg-sand" aria-hidden="true" />
                    <span className="eyebrow text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <p className="title mt-1 text-[19px]">{s}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {(t.included.length > 0 || t.excluded.length > 0) && (
            <section className="reveal mt-20 grid gap-12 md:grid-cols-2 md:gap-8">
              {t.included.length > 0 && (
                <div><h2 className="eyebrow mb-6 text-muted">Included</h2><List items={t.included} mark="+" /></div>
              )}
              {t.excluded.length > 0 && (
                <div><h2 className="eyebrow mb-6 text-muted">Not included</h2><List items={t.excluded} mark="–" /></div>
              )}
            </section>
          )}

          {t.addons.length > 0 && (
            <section className="mt-20">
              <h2 className="eyebrow mb-6 text-muted">Add to your experience</h2>
              <ul className="divide-y divide-line border-y border-line">
                {t.addons.map((a) => (
                  <li key={a.name} className="flex justify-between gap-6 py-4">
                    <span>{a.name}</span>
                    <span className="shrink-0 text-muted">From AED {a.price.toLocaleString("en")}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {t.faq.length > 0 && (
            <section className="mt-20">
              <h2 className="eyebrow mb-6 text-muted">Questions</h2>
              <div className="border-t border-line">
                {t.faq.map((f) => (
                  <details key={f.q} className="group border-b border-line">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 title text-[19px] [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span aria-hidden="true" className="text-[22px] font-light transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="max-w-2xl pb-6 text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="fade-in border border-line bg-white/40 p-7">
            <p className="eyebrow text-muted">Reserve</p>
            <p className="display mt-3 text-[36px]">{price(t)}</p>
            <dl className="mt-6 divide-y divide-line border-y border-line text-[14px]">
              {facts.slice(1).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3"><dt className="text-muted">{k}</dt><dd className="text-right">{v}</dd></div>
              ))}
            </dl>
            <div className="mt-7 grid gap-3">
              <a href={waLink(msg)} className="btn btn-dark">Reserve on WhatsApp</a>
              <Link href={`/enquire?experience=${t.slug}`} className="btn btn-line">Send an enquiry</Link>
            </div>
            <p className="mt-5 text-[13px] text-muted">{site.cancellation} {site.response}</p>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="px-page border-t border-line py-20 lg:py-28">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="title text-[32px] lg:text-[40px]">More {cat.name.toLowerCase()}</h2>
            <Link href={`/experiences#${cat.slug}`} className="u-link mb-2">View all</Link>
          </div>
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => <TourCard key={r.slug} t={r} />)}
          </div>
        </section>
      )}
    </>
  );
}
