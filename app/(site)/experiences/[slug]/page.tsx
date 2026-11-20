import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Pic from "@/components/Pic";
import TourCard from "@/components/TourCard";
import Split from "@/components/Split";
import { categories, site } from "@/data/site";
import { cover, getTour, price, tours } from "@/lib/tours";
import { pad, Steps } from "@/components/concepts/v4/Chrome";

export const dynamicParams = false;
export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = getTour((await params).slug);
  if (!t) return {};
  return { title: t.title, description: t.short, openGraph: { images: [`/img/${cover(t)}-1080.webp?v=5`] } };
}

const two = (n: number) => String(n).padStart(2, "0");

/** Section label in the MC "Projects ™ (09)" manner. */
function Label({ children, count, id, sand = false }: { children: React.ReactNode; count?: number; id: string; sand?: boolean }) {
  return (
    <h2 id={id} className="text-[24px] leading-none tracking-[-0.02em] md:text-[30px]">
      {children}
      {count !== undefined && (
        <sup className={`ml-1 align-super font-[family-name:var(--v4-mono)] text-[13px] tracking-normal ${sand ? "text-[#1c140d]/70" : "text-[#efe6d6]/70"}`}>™ ({two(count)})</sup>
      )}
    </h2>
  );
}

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = getTour((await params).slug);
  if (!t) notFound();
  const cat = categories.find((c) => c.slug === t.category)!;
  const related = tours.filter((x) => x.category === t.category && x.slug !== t.slug).slice(0, 3);
  const gallery = t.images.filter((im) => im !== cover(t));
  const facts: [string, string][] = [
    ...(t.child ? [["Children 5 to 11", `AED ${t.child.toLocaleString("en")}`] as [string, string]] : []),
    ["Duration", t.timing],
    ["Where", t.location],
    ...(t.groupSize ? [["Group size", `Up to ${t.groupSize.replace(" People", " guests")}`] as [string, string]] : []),
  ];
  const stepChips: [string, string, string, string] = [
    t.timing,
    t.location,
    t.groupSize ? `Up to ${t.groupSize.replace(" People", " guests")}` : "Free cancellation 24h",
    price(t),
  ];

  return (
    <>
      {/* ───────── Hero: full-bleed photo, giant uppercase title, mono captions ───────── */}
      <section className="relative h-svh min-h-[560px] overflow-hidden" aria-labelledby="tour-title">
        <div className="hero-zoom absolute inset-0" data-parallax="0.18"><Pic name={cover(t)} priority alt={t.title} sizes="100vw" /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08]/70 via-[#0c0a08]/20 to-[#0c0a08]/65" />
        <h1 id="tour-title" className="absolute inset-x-0 top-[64px] px-5 text-center text-[clamp(38px,8.2vw,118px)] uppercase leading-[0.84] tracking-[-0.05em] [overflow-wrap:anywhere] md:top-[72px] md:px-10">
          <Split delay={150}>{t.title}</Split>
        </h1>
        <div className="absolute inset-x-0 bottom-6 flex flex-col gap-3 px-5 md:flex-row md:items-end md:justify-between md:px-[27px]">
          <div className="flex flex-wrap gap-1">
            <Link href={`/experiences#${cat.slug}`} className="v4-m v4-box hover:opacity-80">{`{${cat.name}}`}</Link>
            <span className="v4-m v4-box">{t.location}</span>
            <span className="v4-m v4-box">{t.timing}</span>
          </div>
          <span className="v4-m v4-box self-start md:self-auto">{price(t)}</span>
        </div>
      </section>

      {/* ───────── Statement + overview ───────── */}
      <section className={`${pad} bg-[#0c0a08] pb-[10svh] pt-[14svh] md:pt-[16svh]`} aria-label="Overview">
        <p className="v4-m mb-6 text-[15px] text-[#efe6d6]/75">{`{${cat.name} · ${t.location}}`}</p>
        <p className="v4-s reveal max-w-[1040px] indent-[16vw] md:indent-[8vw]">{t.short}</p>
        {t.overview && (
          <p className="reveal mt-12 text-[14px] leading-[1.62] text-[#efe6d6]/85 md:ml-[24.3%] md:mt-14 md:columns-2 md:gap-10" style={{ ["--d" as string]: "150ms" }}>
            {t.overview}
          </p>
        )}
      </section>

      {/* ───────── Gallery: centre cards ───────── */}
      {gallery.length > 0 && (
        <section className="bg-[#0c0a08] pb-[10svh]" aria-label="Photographs">
          <ul className={`no-scrollbar flex snap-x gap-[6px] overflow-x-auto px-5 md:gap-[21px] md:px-10 md:scroll-px-10 ${gallery.length < 3 ? "md:justify-center" : ""}`}>
            {gallery.map((im, i) => (
              <li key={im} className="reveal-img relative aspect-[7/8] w-[78vw] shrink-0 snap-center overflow-hidden rounded-[4px] bg-[#1a1510] md:w-[calc((100%-42px)/3)]" style={{ ["--d" as string]: `${i * 120}ms` }}>
                <Pic name={im} alt="" sizes="(min-width:768px) 31vw, 78vw" />
                <span className="v4-m v4-box absolute bottom-3 left-3">{two(i + 1)} / {two(gallery.length)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ───────── Highlights ───────── */}
      {t.highlights.length > 0 && (
        <section className={`${pad} bg-[#0c0a08] pb-[10svh] pt-[6svh]`} aria-labelledby="tour-hl">
          <div className="grid gap-8 md:grid-cols-[24.3%_1fr] md:gap-0">
            <Label id="tour-hl" count={t.highlights.length}>Highlights</Label>
            <ol className="border-t border-[#efe6d6]/20">
              {t.highlights.map((h, i) => (
                <li key={h} className="reveal grid grid-cols-[44px_1fr] gap-x-3 border-b border-[#efe6d6]/20 py-4 md:grid-cols-[64px_1fr] md:items-baseline md:gap-6 md:py-5" style={{ ["--d" as string]: `${i * 60}ms` }}>
                  <span className="v4-m text-[15px] text-[#efe6d6]/65">{two(i + 1)}</span>
                  <span className="text-[21px] leading-[1.1] tracking-[-0.02em] md:text-[30px]">{h}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ───────── Itinerary + staircase into sand ───────── */}
      <section className={`relative ${pad} bg-[#0c0a08] pb-[calc(12svh+72px)] pt-[6svh] md:pb-[calc(14svh+130px)]`} aria-labelledby="tour-it">
        {t.itinerary.length > 0 && (
          <div className="grid gap-8 md:grid-cols-[24.3%_1fr] md:gap-0">
            <div className="md:sticky md:top-24 md:self-start">
              <Label id="tour-it" count={t.itinerary.length}>How the day unfolds</Label>
              <p className="v4-m mt-3 text-[15px] text-[#efe6d6]/65">{`{${t.timing}}`}</p>
            </div>
            <ol className="border-t border-[#efe6d6]/20">
              {t.itinerary.map((s, i) => (
                <li key={s} className="reveal grid grid-cols-[64px_1fr] items-baseline gap-x-3 border-b border-[#efe6d6]/20 py-5 md:grid-cols-[120px_1fr] md:gap-6 md:py-7" style={{ ["--d" as string]: `${(i % 4) * 60}ms` }}>
                  <span className="v4-m text-[40px] text-[#efe6d6]/55 md:text-[64px]" aria-hidden="true">{two(i + 1)}</span>
                  <p className="text-[20px] leading-[1.12] tracking-[-0.02em] md:text-[30px]"><span className="sr-only">Step {i + 1}: </span>{s}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
        {t.itinerary.length === 0 && <h2 id="tour-it" className="sr-only">Details</h2>}
        <Steps tone="sand" chips={stepChips} />
      </section>

      {/* ───────── Sand: details + booking card ───────── */}
      <section className={`${pad} bg-[#efe6d6] pb-[14svh] pt-10 text-[#1c140d] md:pt-16`} aria-label="Details and booking">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-[21px]">
          {/* Booking card */}
          <aside className="lg:sticky lg:top-24 lg:order-last lg:self-start" aria-labelledby="tour-book">
            <div className="rounded-[4px] border border-[#1c140d] p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <h2 id="tour-book" className="v4-m text-[17px]">{"{Reserve}"}</h2>
                <span className="v4-m text-[15px] text-[#1c140d]/70">{t.adult ? "Per adult" : ""}</span>
              </div>
              <p className="mt-6 text-[34px] leading-[0.95] tracking-[-0.03em] md:text-[46px]">{price(t)}</p>
              <dl className="mt-6 border-t border-[#1c140d]/20 text-[14px]">
                {facts.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 border-b border-[#1c140d]/20 py-3">
                    <dt className="v4-m text-[15px] text-[#1c140d]/70">{k}</dt>
                    <dd className="text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 grid gap-2">
                <Link href={`/enquire?experience=${t.slug}`} className="v4-m flex h-[56px] items-center justify-center rounded-[4px] bg-[#1c140d] px-4 text-[17px] text-[#efe6d6] transition-opacity hover:opacity-85">
                  Reserve this experience
                </Link>
                <a href={site.phoneHref} className="v4-m flex h-[56px] items-center justify-center rounded-[4px] border border-[#1c140d] px-4 text-[17px] transition-colors hover:bg-[#1c140d] hover:text-[#efe6d6]">
                  Call {site.phone}
                </a>
              </div>
              <p className="mt-5 text-[13px] leading-[1.5] text-[#1c140d]/75">{site.cancellation} {site.response}</p>
            </div>
          </aside>

          <div className="min-w-0">
            {/* Included / not included: bordered tiles */}
            {t.included.length > 0 && (
              <Tiles id="tour-in" title="Included" sub="in the price" items={t.included} />
            )}
            {t.excluded.length > 0 && (
              <Tiles id="tour-ex" title="Not included" sub="to add or bring" items={t.excluded} muted className={t.included.length > 0 ? "mt-[6px] md:mt-[21px]" : ""} />
            )}

            {/* Add-ons */}
            {t.addons.length > 0 && (
              <section className="mt-[12svh]" aria-labelledby="tour-add">
                <div className="mb-5"><Label id="tour-add" count={t.addons.length} sand>Add to your experience</Label></div>
                <ul className="border-t border-[#1c140d]/20">
                  {t.addons.map((a) => (
                    <li key={a.name} className="flex items-baseline justify-between gap-6 border-b border-[#1c140d]/20 py-4">
                      <span className="text-[17px] leading-[1.2] tracking-[-0.01em] md:text-[21px]">{a.name}</span>
                      <span className="v4-m shrink-0 text-[15px] text-[#1c140d]/75">From AED {a.price.toLocaleString("en")}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* FAQ */}
            {t.faq.length > 0 && (
              <section className="mt-[12svh]" aria-labelledby="tour-faq">
                <div className="mb-5"><Label id="tour-faq" count={t.faq.length} sand>Questions</Label></div>
                <div className="border-t border-[#1c140d]/20">
                  {t.faq.map((f) => (
                    <details key={f.q} className="group border-b border-[#1c140d]/20">
                      <summary className="flex min-h-14 cursor-pointer items-start justify-between gap-6 py-5 text-[19px] leading-[1.15] tracking-[-0.02em] md:text-[26px]">
                        <span>{f.q}</span>
                        <span aria-hidden="true" className="v4-m mt-1 shrink-0 text-[17px] text-[#1c140d]/70"><span className="group-open:hidden">[ + ]</span><span className="hidden group-open:inline">[ – ]</span></span>
                      </summary>
                      <p className="max-w-[62ch] pb-6 text-[15px] leading-[1.6] text-[#1c140d]/80">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </section>

      {/* ───────── More in this category ───────── */}
      {related.length > 0 && (
        <section className={`${pad} bg-[#efe6d6] pb-[14svh] text-[#1c140d]`} aria-labelledby="tour-more">
          <div className="v4-m mb-6 flex justify-between border-t border-[#1c140d]/20 pt-3 text-[15px] text-[#1c140d]/70">
            <span>{`{More ${cat.name.toLowerCase()}}`}</span>
            <Link href={`/experiences#${cat.slug}`} className="v4-link text-[#1c140d]">[ View all ]</Link>
          </div>
          <h2 id="tour-more" className="v4-g !leading-[0.86]">
            <span className="block"><Split>More</Split></span>
            <span className="block text-right"><Split delay={120}>{cat.name}</Split></span>
          </h2>
          <ul className="mt-14 grid gap-x-5 gap-y-14 sm:grid-cols-2 md:mt-[10svh] lg:grid-cols-3 lg:gap-x-[21px]">
            {related.map((r) => <li key={r.slug}><TourCard t={r} /></li>)}
          </ul>
        </section>
      )}
    </>
  );
}

function Tiles({ id, title, sub, items, muted = false, className = "" }: { id: string; title: string; sub: string; items: string[]; muted?: boolean; className?: string }) {
  return (
    <section aria-labelledby={id} className={className}>
      <ul className="grid grid-cols-2 gap-[6px] md:grid-cols-3 md:gap-[21px]">
        <li className="col-span-2 flex flex-col items-center justify-center py-8 text-center md:col-span-1 md:min-h-[200px] md:py-0">
          <h2 id={id} className="text-[17px] leading-tight">{title}<span className="v4-m ml-1 align-super text-[11px]">™</span></h2>
          <p className="v4-i mt-1 text-[22px] leading-tight">{sub}</p>
        </li>
        {items.map((x, i) => (
          <li key={x} className={`reveal relative flex min-h-[150px] items-center justify-center rounded-[4px] border p-3 pt-9 text-center md:min-h-[200px] md:p-6 md:pt-12 ${muted ? "border-dashed border-[#1c140d]/35" : "border-[#1c140d]/25"}`} style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}>
            <span className="v4-m absolute left-3 top-3 text-[13px] text-[#1c140d]/65 md:left-4 md:top-4 md:text-[15px]">{muted ? "–" : "+"}{two(i + 1)}</span>
            <span className="text-[14px] leading-[1.25] tracking-[-0.01em] md:text-[17px]">{x}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
