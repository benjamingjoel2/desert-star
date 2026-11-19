import Link from "next/link";
import Pic from "./Pic";
import { price, type Tour } from "@/lib/tours";

export default function TourCard({ t, className = "" }: { t: Tour; className?: string }) {
  return (
    <Link href={`/experiences/${t.slug}`} className={`group block ${className}`}>
      <div className="zoom reveal-img aspect-[4/5] overflow-hidden bg-dune">
        <Pic name={t.images[0]} sizes="(min-width:1024px) 26vw, (min-width:640px) 45vw, 80vw" />
      </div>
      <div className="reveal" style={{ ["--d" as string]: "200ms" }}>
      <p className="eyebrow mt-5 text-muted">{t.location}</p>
      <h3 className="title mt-2 text-[22px]">{t.title}</h3>
      <p className="mt-2 text-[14px] text-muted">{t.short}</p>
      <p className="mt-4 flex items-baseline justify-between gap-4 text-[13px]">
        <span className="u-link">Discover</span>
        <span className="text-muted">{price(t)}</span>
      </p>
      </div>
    </Link>
  );
}
