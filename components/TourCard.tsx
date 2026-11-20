import Link from "next/link";
import Pic from "./Pic";
import { cover, price, type Tour } from "@/lib/tours";

export default function TourCard({ t, className = "" }: { t: Tour; className?: string }) {
  return (
    <Link href={`/experiences/${t.slug}`} className={`group block ${className}`}>
      <div className="zoom reveal-img aspect-[4/5] overflow-hidden bg-dune">
        <Pic name={cover(t)} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 90vw" />
      </div>
      <div className="reveal" style={{ ["--d" as string]: "200ms" }}>
      <p className="eyebrow mt-5 text-muted">{t.location}</p>
      <h3 className="title mt-2 text-[30px] leading-[1.1]">{t.title}</h3>
      <p className="mt-3 text-[15px] text-muted">{t.short}</p>
      <p className="mt-4 flex items-baseline justify-between gap-4 text-[13px]">
        <span className="u-link">Discover</span>
        <span className="text-muted">{price(t)}</span>
      </p>
      </div>
    </Link>
  );
}
