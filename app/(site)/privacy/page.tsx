import type { Metadata } from "next";
import Legal from "@/components/Legal";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <Legal
      title="Privacy Policy"
      updated="19 November 2026"
      sections={[
        ["Who we are", [`Desert Stars ("we", "us") arranges desert safaris, cruises and guided tours in the United Arab Emirates. Our office is at ${site.address}. For any privacy question, write to ${site.email}.`]],
        ["What we collect", ["When you enquire or book, we collect the details you give us: your name, email address, phone number, travel dates, number of guests, pick-up location, and any notes such as dietary needs or accessibility requirements.", "This website does not use analytics, advertising trackers or social media pixels."]],
        ["How we use it", ["We use your details only to answer your enquiry, arrange and confirm your booking, coordinate pick-up with our drivers and guides, and contact you about changes on the day. We do not sell your data or use it for marketing without your consent."]],
        ["Who we share it with", ["We share only what is needed to deliver your experience: with our drivers, guides, desert camps, cruise operators and attraction ticketing partners."]],
        ["How long we keep it", ["We keep booking records for as long as UAE law requires for accounting purposes, and delete enquiry details that did not lead to a booking within 12 months."]],
        ["Your rights", [`You can ask to see, correct or delete the personal data we hold about you, or withdraw consent at any time, by writing to ${site.email}. We reply within 30 days. This policy follows the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data.`]],
        ["Security", ["Booking details are kept in access-controlled systems used only by our reservations team."]],
        ["Changes", ["We may update this policy. The date at the top of this page shows when it last changed."]],
      ]}
    />
  );
}
