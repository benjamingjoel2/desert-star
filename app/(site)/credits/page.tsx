import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import { Steps } from "@/components/concepts/v4/Chrome";

export const metadata: Metadata = { title: "Image credits" };

export default function Credits() {
  return (
    <>
      <PageHead eyebrow="Image credits" title="Image credits" intro="A note on the pictures you see across this site." />
      <div className="relative">
        <div className="h-[72px] md:h-[130px]" aria-hidden="true" />
        <Steps tone="sand" chips={["Desert Stars", "Imagery", "Illustrative", "Dubai"]} />
      </div>
      <section className="bg-[#efe6d6] px-5 pb-[16svh] pt-10 text-[#1c140d] md:px-10 md:pt-16">
        <div className="max-w-[62ch] space-y-5 text-[17px] leading-[1.65]">
          <p>The photograph on our homepage is our own.</p>
          <p>The other images on this site are illustrative artwork created for Desert Stars with generative AI, in our own colours and style. They show the mood of each experience rather than a specific evening, vehicle or venue, so details on the day will differ.</p>
          <p>For photographs of a particular camp, cruise or tour, ask us when you enquire and we will send them.</p>
        </div>
      </section>
    </>
  );
}
