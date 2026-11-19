export const site = {
  name: "Desert Stars",
  tagline: "Private desert safaris and Emirates journeys",
  description:
    "Desert Stars is a Dubai tour house for desert safaris, dhow cruises and guided days across the Emirates: Dubai, Abu Dhabi, Al Ain and Sharjah.",
  url: "https://desertstars.tourground.com",
  phone: "+971 52 829 1432",
  phoneHref: "tel:+971528291432",
  whatsapp: "971528291432",
  email: "desertstars@tourground.com",
  address: "Office 4, One Central, Trade Centre, Dubai, United Arab Emirates",
  mapUrl:
    "https://www.google.com/maps/place/Musk+Tours/@25.219717,55.286071,14z",
  hours: "Daily, 08:00 to 22:00 (UAE time)",
  response: "We reply within 30 minutes, day and night.",
  cancellation: "Free cancellation up to 24 hours before the tour.",
  stats: [
    { value: "11,000+", label: "Guests hosted" },
    { value: "3,000+", label: "Journeys completed" },
    { value: "16", label: "Signature experiences" },
    { value: "24/7", label: "WhatsApp concierge" },
  ],
};

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const categories = [
  {
    slug: "desert",
    name: "Desert safaris",
    blurb: "Red dunes, Bedouin camps and dinner under the stars.",
    image: "camp-lanterns",
  },
  {
    slug: "city",
    name: "City journeys",
    blurb: "Dubai, Abu Dhabi, Al Ain and Sharjah with a private guide.",
    image: "mosque-1",
  },
  {
    slug: "cruises",
    name: "Dhow cruises",
    blurb: "Dinner on the water, from old Dubai Creek to the Marina.",
    image: "dubai-night",
  },
  {
    slug: "attractions",
    name: "Signature tickets",
    blurb: "Burj Khalifa at the Top and Ferrari World, arranged for you.",
    image: "burj-palms",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

