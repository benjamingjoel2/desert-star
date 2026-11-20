import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <Link
        href="/enquire"
        className="side-tab mono fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 bg-ember px-3 py-5 text-white transition-[padding] hover:py-7 md:block"
      >
        Enquire ✦
      </Link>
    </>
  );
}
