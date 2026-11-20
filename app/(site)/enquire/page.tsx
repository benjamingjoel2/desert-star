import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import EnquiryForm from "@/components/EnquiryForm";
import { Steps, GiantLinks, wa } from "@/components/concepts/v4/Chrome";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Enquire", description: "Plan a desert safari, dhow cruise or city journey with Desert Stars." };

type Fact = { k: string; v: string; href?: string; ext?: boolean; sub?: React.ReactNode };
const facts: Fact[] = [
  { k: "Call", v: site.phone, href: site.phoneHref },
  { k: "WhatsApp", v: site.phone, href: wa, ext: true },
  { k: "Email", v: site.email, href: `mailto:${site.email}` },
  { k: "Office", v: site.address, sub: <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="v4-m v4-link text-[15px]">Open in Google Maps ↗</a> },
  { k: "Hours", v: site.hours },
  { k: "Reply", v: site.response },
];

export default function Enquire() {
  return (
    <>
      <PageHead eyebrow="Enquire" title={<>Plan your <em>journey</em></>} intro={`${site.response} Tell us what you have in mind and we'll confirm availability, pick-up time and price.`} />

      {/* Contact facts: bordered mono-label cells */}
      <section className="bg-[#0c0a08] px-5 pb-[10svh] md:px-10 md:pb-[14svh]" aria-labelledby="enq-reach">
        <div className="v4-m mb-4 flex justify-between border-b border-[#efe6d6]/20 pb-3 text-[15px] text-[#efe6d6]/70">
          <h2 id="enq-reach" className="font-normal">{"{Reach us}"}</h2><span>Dubai · UAE</span>
        </div>
        <ul className="grid gap-[6px] sm:grid-cols-2 md:grid-cols-3 md:gap-[21px]">
          {facts.map((f, i) => (
            <li key={f.k} className="reveal relative flex min-h-[150px] flex-col justify-end rounded-[4px] border border-[#efe6d6]/25 p-4 pt-12 md:min-h-[210px] md:p-5 md:pt-14" style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}>
              <span className="v4-m absolute left-4 top-4 text-[15px] text-[#efe6d6]/60 md:left-5 md:top-5">{String(i + 1).padStart(2, "0")}</span>
              <span className="v4-m v4-box absolute right-4 top-4 md:right-5 md:top-5">{f.k}</span>
              {f.href ? (
                <a href={f.href} {...(f.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="v4-link self-start break-all text-[22px] leading-[1.1] tracking-[-0.02em] md:text-[26px]">{f.v}</a>
              ) : (
                <p className="text-[18px] leading-[1.25] tracking-[-0.01em] md:text-[20px]">{f.v}</p>
              )}
              {f.sub && <div className="mt-3">{f.sub}</div>}
            </li>
          ))}
        </ul>
      </section>

      {/* The form */}
      <section className="relative bg-[#0c0a08] px-5 pb-[calc(72px+12svh)] md:px-10 md:pb-[calc(130px+14svh)]" aria-labelledby="enq-form">
        <div className="v4-m mb-8 flex justify-between border-b border-[#efe6d6]/20 pb-3 text-[15px] text-[#efe6d6]/70 md:mb-12">
          <h2 id="enq-form" className="font-normal">{"{Your enquiry}"}</h2><span>Reply within 30 min</span>
        </div>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10">
          <div>
            <p className="text-[34px] uppercase leading-[0.9] tracking-[-0.04em] md:text-[clamp(40px,4.4vw,64px)]">Tell us<br />your date</p>
            <p className="v4-i mt-4 text-[24px] leading-[1.1] text-[#efe6d6]/85 md:text-[28px]">and we will plan the rest.</p>
            <p className="mt-6 max-w-[38ch] text-[15px] leading-[1.6] text-[#efe6d6]/75">Your message opens ready to send in WhatsApp or your email app. {site.cancellation}</p>
          </div>
          <EnquiryForm />
        </div>
        <Steps tone="sand" chips={["Pick-up from your door", "Free cancellation 24h", "Reply within 30 min", "Open daily 08:00–22:00"]} />
      </section>

      {/* Giant stacked links on sand */}
      <section className="bg-[#efe6d6] px-5 pb-[14svh] pt-10 text-[#1c140d] md:px-10 md:pt-16" aria-labelledby="enq-other">
        <h2 id="enq-other" className="v4-m mb-6 text-[15px] text-[#1c140d]/70">{"{Or reach us directly}"}</h2>
        <p className="v4-s reveal max-w-[1380px] indent-[16vw] md:indent-[8vw]">
          Prefer to talk it through? Message, call or write to the concierge team at One Central, open daily from 08:00 to 22:00 UAE time.
        </p>
        <GiantLinks className="mt-[12svh] md:ml-[calc(34.7vw-40px)]" />
      </section>
    </>
  );
}
