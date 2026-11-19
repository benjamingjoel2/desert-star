import Link from "next/link";
import Logo from "./Logo";
import { categories, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-night text-sand/80">
      <div className="px-page grid gap-12 pb-10 pt-20 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo className="!items-start text-sand" />
          <p className="title mt-8 max-w-sm text-[22px] text-sand">
            Private desert safaris and guided days across the Emirates, planned from Dubai.
          </p>
        </div>
        <nav aria-label="Experiences">
          <p className="eyebrow mb-5 text-sand/60">Experiences</p>
          <ul className="space-y-2.5 text-[14px]">
            {categories.map((c) => (
              <li key={c.slug}><Link className="hover:text-white" href={`/experiences#${c.slug}`}>{c.name}</Link></li>
            ))}
            <li><Link className="hover:text-white" href="/experiences">All experiences</Link></li>
          </ul>
        </nav>
        <nav aria-label="Desert Stars">
          <p className="eyebrow mb-5 text-sand/60">Desert Stars</p>
          <ul className="space-y-2.5 text-[14px]">
            <li><Link className="hover:text-white" href="/about">About</Link></li>
            <li><Link className="hover:text-white" href="/journal">Journal</Link></li>
            <li><Link className="hover:text-white" href="/enquire">Enquire</Link></li>
          </ul>
        </nav>
        <div className="text-[14px]">
          <p className="eyebrow mb-5 text-sand/60">Contact</p>
          <address className="space-y-2.5 not-italic">
            <p>{site.address}</p>
            <p><a className="hover:text-white" href={site.phoneHref}>{site.phone}</a></p>
            <p><a className="hover:text-white" href={`https://wa.me/${site.whatsapp}`}>WhatsApp concierge</a></p>
            <p><a className="hover:text-white" href={`mailto:${site.email}`}>{site.email}</a></p>
            <p>{site.hours}</p>
          </address>
        </div>
      </div>
      <div className="px-page flex flex-col gap-4 border-t border-white/10 py-6 text-[12px] text-sand/60 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Desert Stars. All rights reserved.</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><Link className="hover:text-white" href="/privacy">Privacy Policy</Link></li>
          <li><Link className="hover:text-white" href="/booking-terms">Booking Terms</Link></li>
          <li><Link className="hover:text-white" href="/cookies">Cookie Policy</Link></li>
        </ul>
      </div>
    </footer>
  );
}
