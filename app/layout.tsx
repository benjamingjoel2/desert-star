import type { Metadata, Viewport } from "next";
import "./globals.css";
import Motion from "@/components/Motion";
import { site } from "@/data/site";


export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Desert Stars | Luxury Desert Safaris & Emirates Journeys", template: "%s | Desert Stars" },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Desert Stars: red dunes under a starry sky" }] },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#0c0a08" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", streetAddress: "Office 4, One Central, Trade Centre", addressLocality: "Dubai", addressCountry: "AE" },
  openingHours: "Mo-Su 08:00-22:00",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-sand">Skip to content</a>
        {children}
        <Motion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
