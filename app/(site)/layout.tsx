import { shell, V4Style, Header, Footer } from "@/components/concepts/v4/Chrome";

/** Inner pages share the Concept 4 frame: header with full-screen menu, footer. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={shell}>
      <V4Style />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
