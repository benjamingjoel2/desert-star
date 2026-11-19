import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import EnquiryForm from "@/components/EnquiryForm";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Enquire", description: "Plan a desert safari, dhow cruise or city journey with Desert Stars." };

export default function Enquire() {
  return (
    <>
      <PageHead eyebrow="Enquire" title={<>Plan your <em>journey</em></>} intro={`${site.response} Tell us what you have in mind and we'll confirm availability, pick-up time and price.`} />
      <section className="px-page grid gap-16 border-t border-line py-20 lg:grid-cols-[1fr_2fr] lg:py-28">
        <div className="space-y-8 text-[15px]">
          <div><p className="eyebrow mb-2 text-muted">Call</p><a className="u-link text-[18px]" href={site.phoneHref}>{site.phone}</a></div>
          <div><p className="eyebrow mb-2 text-muted">WhatsApp</p><a className="u-link text-[18px]" href={`https://wa.me/${site.whatsapp}`}>{site.phone}</a></div>
          <div><p className="eyebrow mb-2 text-muted">Email</p><a className="u-link text-[18px]" href={`mailto:${site.email}`}>{site.email}</a></div>
          <div><p className="eyebrow mb-2 text-muted">Office</p><p>{site.address}</p><a className="u-link mt-2" href={site.mapUrl}>Open in Maps</a></div>
          <div><p className="eyebrow mb-2 text-muted">Hours</p><p>{site.hours}</p></div>
        </div>
        <EnquiryForm />
      </section>
    </>
  );
}
