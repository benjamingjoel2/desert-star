import meta from "@/data/images.json";

type Meta = Record<string, { w: number; h: number; widths: number[] }>;

export default function Pic({
  name,
  alt = "",
  sizes = "100vw",
  priority = false,
  low = false,
  className = "",
}: {
  name: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  /** Visible at load but not important: let the main image win the bandwidth. */
  low?: boolean;
  className?: string;
}) {
  const m = (meta as Meta)[name];
  if (!m) return null;
  const set = (ext: string) => m.widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(", ");
  const fallback = `/img/${name}-${m.widths[Math.min(1, m.widths.length - 1)]}.webp`;
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img
        src={fallback}
        srcSet={set("webp")}
        sizes={sizes}
        alt={alt}
        width={m.w}
        height={m.h}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : low ? "low" : undefined}
        decoding={priority ? "sync" : "async"}
        className={`h-full w-full object-cover ${className}`}
      />
    </picture>
  );
}
