import Link from "next/link";
import { categories, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line bg-sand text-ink">
      <div className="px-page grid gap-12 pt-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <p className="title max-w-sm text-[30px]">Private evenings in the Arabian desert, and journeys across the Emirates.</p>
        <nav aria-label="Experiences">
          <p className="eyebrow mb-5 text-muted">Experiences</p>
          <ul className="space-y-2.5 text-[14px]">
            {categories.map((c) => (
              <li key={c.slug}><Link className="hover:text-ember" href={`/experiences#${c.slug}`}>{c.name}</Link></li>
            ))}
            <li><Link className="hover:text-ember" href="/experiences">All experiences</Link></li>
          </ul>
        </nav>
        <nav aria-label="Desert Stars">
          <p className="eyebrow mb-5 text-muted">Desert Stars</p>
          <ul className="space-y-2.5 text-[14px]">
            <li><Link className="hover:text-ember" href="/about">About</Link></li>
            <li><Link className="hover:text-ember" href="/journal">Journal</Link></li>
            <li><Link className="hover:text-ember" href="/enquire">Enquire</Link></li>
            <li><Link className="hover:text-ember" href="/privacy">Privacy Policy</Link></li>
            <li><Link className="hover:text-ember" href="/booking-terms">Booking Terms</Link></li>
            <li><Link className="hover:text-ember" href="/cookies">Cookie Policy</Link></li>
            <li><Link className="hover:text-ember" href="/credits">Photo credits</Link></li>
          </ul>
        </nav>
        <div className="text-[14px]">
          <p className="eyebrow mb-5 text-muted">Contact</p>
          <address className="space-y-2.5 not-italic">
            <p>{site.address}</p>
            <p><a className="hover:text-ember" href={site.phoneHref}>{site.phone}</a></p>
            <p><a className="hover:text-ember" href={`https://wa.me/${site.whatsapp}`}>WhatsApp concierge</a></p>
            <p><a className="hover:text-ember" href={`mailto:${site.email}`}>{site.email}</a></p>
            <p className="text-muted">{site.hours}</p>
          </address>
        </div>
      </div>
      <p className="px-page mt-16 border-t border-line pb-6 pt-6 text-[12px] text-muted">© {new Date().getFullYear()} Desert Stars. All rights reserved.</p>
    </footer>
  );
}
