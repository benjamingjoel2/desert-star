import Link from "next/link";
import Pic from "@/components/Pic";
import Rail from "@/components/Rail";
import Strips from "@/components/Strips";
import TourCard from "@/components/TourCard";
import DuneRule from "@/components/DuneRule";
import { categories, site, waLink } from "@/data/site";
import { posts } from "@/data/journal";
import { byCategory, getTour, price, tours } from "@/lib/tours";

export default function Home() {
  const evening = getTour("premium-evening-desert-safari")!;
  const morning = getTour("premium-morning-desert-safari")!;
  const marina = getTour("dubai-marina-dhow-cruise")!;
  const signature = [
    "evening-desert-safari",
    "grand-mosque-and-desert-safari",
    "dubai-abu-dhabi-desert-safari-3-in-1",
    "abu-dhabi-city-tour",
    "al-ain-city-tour",
    "dubai-creek-dhow-cruise",
    "burj-khalifa-at-the-top",
  ].map((s) => getTour(s)!);

  return (
    <>
      {/* Hero: full-bleed, text bottom-left */}
      <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-night text-white">
        <div className="absolute inset-0">
          <Pic name="premium-evening-1" priority alt="A Desert Stars 4x4 cresting a red dune in the Lehbab desert" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/35" />
        <div className="px-page absolute inset-x-0 bottom-0 grid gap-8 pb-12 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:pb-16">
          <div>
            <p className="eyebrow mb-5 text-white/85">Lehbab desert, Dubai</p>
            <h1 className="display max-w-[14ch] text-[48px] sm:text-[64px] lg:text-[88px]">
              Where the dunes <em>meet the stars</em>
            </h1>
          </div>
          <div className="max-w-sm lg:justify-self-end">
            <p className="mb-5 text-[16px] text-white/90">
              Private desert evenings, dhow dinners and guided days across the Emirates, arranged by one concierge from
              first message to the last mile home.
            </p>
            <Link href="/experiences" className="u-link text-white">Discover the experiences</Link>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="px-page grid gap-10 py-24 lg:grid-cols-[1fr_2fr] lg:py-36">
        <p className="eyebrow text-muted reveal">Desert Stars</p>
        <div className="reveal">
          <p className="display text-[32px] sm:text-[44px] lg:text-[56px]">
            The red sands of Lehbab at golden hour, a camp lit by lanterns, and a sky with more stars than the city
            ever shows you.
          </p>
          <div className="mt-10 grid gap-8 text-muted sm:grid-cols-2 lg:max-w-3xl">
            <p>
              We have hosted more than 11,000 guests in the desert and across the seven emirates. Every journey starts
              with a pick-up at your door and ends with a drive home under the night sky.
            </p>
            <p>
              Choose a premium evening in the dunes, a quiet dawn safari, a dhow cruise along the old Creek, or a day
              with a guide in Abu Dhabi, Al Ain or Sharjah.
            </p>
          </div>
        </div>
      </section>

      {/* Category strips (White Desert) */}
      <section className="px-page pb-24 lg:pb-36">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="display text-[40px] lg:text-[64px]">Our experiences</h2>
          <Link href="/experiences" className="u-link mb-3 hidden whitespace-nowrap sm:inline-block">View all {tours.length}</Link>
        </div>
        <Strips items={categories.map((c) => ({ ...c, count: byCategory(c.slug).length }))} />
      </section>

      {/* Two features (Aman) */}
      <section className="px-page grid gap-16 pb-24 lg:grid-cols-[1.35fr_1fr] lg:gap-10 lg:pb-36">
        {[evening, morning].map((t, i) => (
          <article key={t.slug} className={`reveal ${i === 1 ? "lg:mt-40" : ""}`}>
            <Link href={`/experiences/${t.slug}`} className="zoom block overflow-hidden">
              <div className={i === 0 ? "aspect-[4/3]" : "aspect-[4/5]"}>
                <Pic name={t.images[i === 0 ? 2 : 1] ?? t.images[0]} sizes="(min-width:1024px) 55vw, 100vw" alt="" />
              </div>
            </Link>
            <p className="eyebrow mt-6 text-muted">{i === 0 ? "Evening in the dunes" : "Before the city wakes"}</p>
            <h3 className="title mt-2 text-[28px]">{t.title}</h3>
            <p className="mt-3 max-w-xl text-muted">{t.short}</p>
            <p className="mt-5 flex gap-8 text-[13px]">
              <Link href={`/experiences/${t.slug}`} className="u-link">Discover more</Link>
              <span className="text-muted">{price(t)}</span>
            </p>
          </article>
        ))}
      </section>

      {/* Rail (Aman "Seasonal Experiences") */}
      <section className="border-t border-line bg-dune/50 py-24 lg:py-32">
        <div className="px-page grid gap-12 lg:grid-cols-[minmax(260px,1fr)_3fr]">
          <div className="reveal">
            <p className="eyebrow mb-4 text-muted">Across the Emirates</p>
            <h2 className="title text-[34px] lg:text-[40px]">Signature journeys</h2>
            <p className="mt-4 max-w-xs text-muted">
              From the Grand Mosque at first light to dinner on the water, each one with door-to-door transfers.
            </p>
            <Link href="/experiences" className="u-link mt-8">Discover more</Link>
          </div>
          <Rail label="Signature journeys">
            {signature.map((t) => (
              <TourCard key={t.slug} t={t} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[25vw]" />
            ))}
          </Rail>
        </div>
      </section>

      {/* Night band */}
      <section className="relative overflow-hidden bg-night text-sand">
        <div className="absolute inset-0 opacity-70"><Pic name="night-sky" sizes="100vw" /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-transparent to-night" />
        <div className="px-page relative py-28 lg:py-40">
          <p className="eyebrow mb-6 text-sand/70">After dark</p>
          <h2 className="display max-w-[18ch] text-[40px] lg:text-[72px]">
            When the shows end, <em>look up.</em>
          </h2>
          <p className="mt-6 max-w-lg text-sand/80">
            Far from the city lights, the Lehbab sky fills with stars. Our evening safaris end with time to sit on the
            sand and simply watch it.
          </p>
          <dl className="mt-20 grid grid-cols-2 gap-y-10 border-t border-white/15 pt-10 lg:grid-cols-4">
            {site.stats.map((s) => (
              <div key={s.label}>
                <dt className="eyebrow order-2 mt-3 text-sand/65">{s.label}</dt>
                <dd className="display text-[44px] lg:text-[60px]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Full-bleed cruise */}
      <section className="relative h-[80svh] min-h-[520px] overflow-hidden text-white">
        <div className="absolute inset-0"><Pic name={marina.images[0]} sizes="100vw" alt="Dhows moored in Dubai Marina at night" /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="px-page absolute inset-x-0 bottom-0 pb-12 lg:pb-16">
          <p className="eyebrow mb-4 text-white/85">Dhow cruises</p>
          <h2 className="title max-w-xl text-[34px] lg:text-[48px]">Dinner on the water, from the old Creek to the Marina</h2>
          <Link href="/experiences#cruises" className="u-link mt-6">Discover more</Link>
        </div>
      </section>

      {/* Journal */}
      <section className="px-page py-24 lg:py-36">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4 text-muted">The journal</p>
            <h2 className="title text-[34px] lg:text-[40px]">Notes from the Emirates</h2>
          </div>
          <Link href="/journal" className="u-link mb-2">All stories</Link>
        </div>
        <div className="grid gap-12 md:grid-cols-3 md:gap-6">
          {posts.map((p) => (
            <Link key={p.slug} href={`/journal/${p.slug}`} className="group reveal">
              <div className="zoom aspect-[3/2] overflow-hidden bg-dune"><Pic name={p.image} sizes="(min-width:768px) 33vw, 100vw" /></div>
              <p className="eyebrow mt-5 text-muted">{p.category}</p>
              <h3 className="title mt-2 text-[22px]">{p.title}</h3>
              <p className="mt-2 text-[14px] text-muted">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <DuneRule className="px-page" />

      {/* Enquire */}
      <section className="px-page grid gap-10 py-24 lg:grid-cols-[1.6fr_1fr] lg:py-32">
        <h2 className="display text-[40px] lg:text-[64px] reveal">Plan your evening in the dunes</h2>
        <div className="reveal self-end">
          <p className="text-muted">{site.response} Tell us your dates and group size and we will hold the right vehicle and camp.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/enquire" className="btn btn-dark">Send an enquiry</Link>
            <a href={waLink("Hello Desert Stars, I'd like to plan a desert safari.")} className="btn btn-line">WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}
