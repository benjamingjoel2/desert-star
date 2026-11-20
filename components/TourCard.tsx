import Link from "next/link";
import Pic from "./Pic";
import { cover, price, type Tour } from "@/lib/tours";

/** Concept 4 tour card: photo with mono boxed chips, grotesk title, short text, [ Discover ].
 *  Text colours inherit (currentColor + opacity), so it sits on night or sand sections. */
export default function TourCard({ t, className = "", n }: { t: Tour; className?: string; n?: number }) {
  return (
    <Link href={`/experiences/${t.slug}`} className={`group block ${className}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-[#1a1510]">
        <div className="reveal-img absolute inset-0">
          <div className="h-full w-full transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]">
            <Pic name={cover(t)} alt="" sizes="(min-width:768px) 31vw, 90vw" />
          </div>
        </div>
        {n !== undefined && (
          <span className="v4-m v4-box absolute left-3 top-3">{String(n).padStart(2, "0")}</span>
        )}
        <div className="absolute bottom-3 left-3 flex max-w-[calc(100%-24px)] flex-col items-start gap-1">
          <span className="v4-m v4-box">{t.location}</span>
          <span className="v4-m v4-box">{price(t)}</span>
        </div>
      </div>
      <div className="reveal" style={{ ["--d" as string]: "160ms" }}>
        <h3 className="mt-4 text-[24px] leading-[1.02] tracking-[-0.03em] md:text-[30px]">{t.title}</h3>
        <p className="mt-3 max-w-[46ch] text-[14px] leading-[1.55] opacity-80">{t.short}</p>
        <p className="v4-m mt-4 flex items-baseline justify-between gap-4 text-[17px]">
          <span className="v4-link">[ Discover ]</span>
          <span className="text-right opacity-75">{t.timing}</span>
        </p>
      </div>
    </Link>
  );
}
