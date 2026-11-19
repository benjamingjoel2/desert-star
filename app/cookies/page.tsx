import type { Metadata } from "next";
import Legal from "@/components/Legal";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function Cookies() {
  return (
    <Legal
      title="Cookie Policy"
      updated="19 November 2026"
      sections={[
        ["Our approach", ["The Desert Stars website does not set any cookies. We use no analytics, advertising or tracking tools, so there is no cookie banner to accept."]],
        ["Fonts and images", ["Our fonts and images are served from this website itself, so loading a page does not send your data to third-party font or image services."]],
        ["Links to other services", ["When you choose to contact us on WhatsApp or open our office in Google Maps, those services may set their own cookies under their own policies."]],
        ["Contact", [`Questions about this policy: ${site.email}, ${site.address}.`]],
      ]}
    />
  );
}
