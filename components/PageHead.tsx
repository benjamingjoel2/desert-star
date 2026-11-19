import Split from "./Split";

export default function PageHead({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro?: string }) {
  return (
    <section className="px-page grid gap-8 pb-16 pt-36 lg:grid-cols-[1fr_2fr] lg:pb-24 lg:pt-48">
      <p className="eyebrow fade-in text-muted">{eyebrow}</p>
      <div>
        <h1 className="display text-[44px] sm:text-[60px] lg:text-[80px]"><Split delay={100}>{title}</Split></h1>
        {intro && <p className="fade-in mt-8 max-w-2xl text-[17px] text-muted" style={{ ["--d" as string]: "600ms" }}>{intro}</p>}
      </div>
    </section>
  );
}
