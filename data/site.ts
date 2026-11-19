export const site = {
  name: "Desert Stars",
  tagline: "Private desert safaris and Emirates journeys",
  description:
    "Desert Stars is a Dubai tour house for desert safaris, dhow cruises and guided days across the Emirates: Dubai, Abu Dhabi, Al Ain and Sharjah.",
  url: "https://desert-stars.vercel.app",
  phone: "+971 52 829 1432",
  phoneHref: "tel:+971528291432",
  whatsapp: "971528291432",
  email: "sales@musktours.com",
  address: "Office 4, One Central, Trade Centre, Dubai, United Arab Emirates",
  mapUrl:
    "https://www.google.com/maps/place/Musk+Tours/@25.219717,55.286071,14z",
  hours: "Daily, 08:00 to 22:00 (UAE time)",
  response: "We reply within 30 minutes, day and night.",
  cancellation: "Free cancellation up to 24 hours before the tour.",
  social: {
    instagram: "https://www.instagram.com/musk_tours/",
    facebook: "https://www.facebook.com/MuskToursDubai",
    youtube: "https://www.youtube.com/@Desertsafaridubaibymusktours",
    x: "https://twitter.com/musktours_uae",
  },
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
    image: "/images/tours/premium-evening-1.jpg",
  },
  {
    slug: "city",
    name: "City journeys",
    blurb: "Dubai, Abu Dhabi, Al Ain and Sharjah with a private guide.",
    image: "/images/tours/mosque-1.jpg",
  },
  {
    slug: "cruises",
    name: "Dhow cruises",
    blurb: "Dinner on the water, from old Dubai Creek to the Marina.",
    image: "/images/tours/marina-1.webp",
  },
  {
    slug: "attractions",
    name: "Signature tickets",
    blurb: "Burj Khalifa at the Top and Ferrari World, arranged for you.",
    image: "/images/tours/burj-1.webp",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export const testimonials = [
  {
    name: "Lisa M.",
    from: "United Kingdom",
    quote:
      "Desert Stars took our family on the most magical overnight desert safari, roasting marshmallows by the campfire under a million stars. Unforgettable.",
  },
  {
    name: "Ahmed S.",
    from: "United Arab Emirates",
    quote:
      "The Hatta mountain tour was spectacular. Our guide showed us hidden wadis and traditional ruins, and even helped us try local sweets.",
  },
  {
    name: "Maria G.",
    from: "United States",
    quote:
      "Booked quad bikes for my son's birthday and he still talks about it. The bikes were new, the guides put safety first, and we got amazing desert photos.",
  },
];
