export default function PageHead({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro?: string }) {
  return (
    <section className="px-page grid gap-8 pb-16 pt-36 lg:grid-cols-[1fr_2fr] lg:pb-24 lg:pt-48">
      <p className="eyebrow text-muted">{eyebrow}</p>
      <div>
        <h1 className="display text-[44px] sm:text-[60px] lg:text-[80px]">{title}</h1>
        {intro && <p className="mt-8 max-w-2xl text-[17px] text-muted">{intro}</p>}
      </div>
    </section>
  );
}
