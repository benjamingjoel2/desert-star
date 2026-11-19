import type { Metadata } from "next";
import Legal from "@/components/Legal";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Booking Terms" };

export default function Terms() {
  return (
    <Legal
      title="Booking Terms"
      updated="19 November 2026"
      sections={[
        ["About these terms", [`These terms apply to every experience booked with Desert Stars, ${site.address}. By confirming a booking you accept them. Questions: ${site.email} or ${site.phone}.`]],
        ["Prices", ["Prices are shown in UAE dirhams (AED) per person and include VAT unless stated. Children's prices apply to ages 5 to 11. Add-ons such as quad biking or private transfers are charged on top. We confirm the final price in writing before you pay."]],
        ["Booking and payment", ["A booking is confirmed once we send written confirmation by WhatsApp or email. Payment terms, including any deposit, are stated in that confirmation."]],
        ["Cancellation by you", ["Cancel free of charge up to 24 hours before the scheduled pick-up time. Cancellations within 24 hours, and no-shows, are charged in full. Timed attraction tickets, such as Burj Khalifa At the Top, may be non-refundable once issued; we tell you before booking."]],
        ["Changes and cancellation by us", ["Desert activities depend on weather and safety. If we cancel because of sandstorms, extreme heat, rain or official restrictions, we offer another date or a full refund. Pick-up times may shift by up to 30 minutes; we tell you as early as possible."]],
        ["Pick-up", ["Pick-up is included from hotels and residences within Dubai city limits unless stated. Please be ready in the lobby at the confirmed time. We can wait up to 10 minutes on shared tours before departing."]],
        ["Health and safety", ["Dune bashing is not recommended for pregnant guests, guests with back or heart conditions, or children under 3. Quad biking requires a minimum age and signed waiver at the centre. Please follow your guide's instructions at all times. Self-drive guests are responsible for their own vehicle, permit and insurance."]],
        ["Conduct and dress", ["Modest dress is required at mosques: shoulders and knees covered, and a headscarf for women. Abayas are provided at the Sheikh Zayed Grand Mosque where needed."]],
        ["Liability", ["We act with reasonable care in arranging every experience. We are not liable for loss of personal belongings, or for delays and losses caused by events outside our control. Nothing in these terms limits liability that cannot be limited under UAE law."]],
        ["Governing law", ["These terms are governed by the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates."]],
      ]}
    />
  );
}
