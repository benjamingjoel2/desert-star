import Link from "next/link";
import Pic from "@/components/Pic";
import { shell, V4Style, Header, Footer, Steps } from "@/components/concepts/v4/Chrome";

export default function NotFound() {
  return (
    <div className={shell}>
      <V4Style />
      <Header />
      <main id="main">
        <section className="relative flex min-h-svh flex-col overflow-hidden px-5 pb-[calc(72px+10svh)] pt-[104px] md:px-10 md:pb-[calc(130px+10svh)] md:pt-[132px]" aria-labelledby="nf-title">
          <div className="absolute inset-0 opacity-35" aria-hidden="true"><Pic name="desert-sunset" alt="" sizes="100vw" priority /></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08]/70 via-[#0c0a08]/40 to-[#0c0a08]/80" aria-hidden="true" />
          <div className="v4-m relative flex flex-wrap justify-between gap-3 text-[15px] md:text-[17px]">
            <span className="v4-box">{"{404 · Page not found}"}</span>
            <span className="text-[#efe6d6]/75">Dubai 25°12′N 55°16′E</span>
          </div>
          <h1 id="nf-title" className="v4-g relative mt-auto pt-[10svh]">
            <span className="block">Lost in</span>
            <span className="block md:text-right">the dunes</span>
          </h1>
          <div className="relative mt-10 flex flex-col gap-6 md:mt-14 md:flex-row md:items-end md:justify-between">
            <p className="v4-s max-w-[760px]">This page doesn&apos;t exist. The desert is still where you left it.</p>
            <Link href="/" className="v4-m v4-box self-start px-3 py-2 text-[19px] hover:opacity-80 md:self-auto">{"{Back to Desert Stars}"}</Link>
          </div>
          <Steps tone="sand" chips={["Pick-up from your door", "Free cancellation 24h", "Reply within 30 min", "Open daily 08:00–22:00"]} />
        </section>
        <div className="h-12 bg-[#efe6d6] md:h-16" aria-hidden="true" />
      </main>
      <Footer />
    </div>
  );
}
