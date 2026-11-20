import Split from "./Split";
import { Swoosh } from "./Bits";

export default function PageHead({ eyebrow, title, intro, label }: { eyebrow: string; title: React.ReactNode; intro?: string; label?: string }) {
  return (
    <section className="px-page pb-20 pt-32 lg:pb-28 lg:pt-44">
      <p className="eyebrow fade-in flex justify-between text-muted"><span>{eyebrow}</span><span>Desert Stars · Dubai</span></p>
      <h1 className="display mt-10 text-[48px] leading-[0.98] sm:text-[72px] lg:text-[112px]"><Split delay={100}>{title}</Split></h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div className="fade-in flex items-center gap-4" style={{ ["--d" as string]: "500ms" }}>
          <Swoosh className="h-8 w-36 opacity-60" />
          {label && <span className="script text-[22px]">{label}</span>}
        </div>
        {intro && <p className="title fade-in text-[24px] leading-[1.3] lg:text-[32px]" style={{ ["--d" as string]: "600ms" }}>{intro}</p>}
      </div>
    </section>
  );
}
