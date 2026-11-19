export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "faq"; items: { q: string; a: string }[] };

export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "sunset-to-skyline-dubai",
    title: "Sunset to Skyline: Five Moments You Can't Miss in Dubai",
    category: "Dubai",
    date: "2025-07-28",
    image: "/images/tours/premium-evening-2.jpg",
    excerpt:
      "From soaring towers to golden desert horizons, the five Dubai moments that turn a checklist into a story.",
    body: [
      {
        type: "p",
        text: "Dubai isn't just a destination, it's a revelation. From soaring architectural wonders to golden desert horizons, every moment feels curated for awe. Whether it's your first visit or your fifth, these experiences will take your journey from checklist to storybook.",
      },
      { type: "h", text: "1. Sunset from Sky Views Observatory" },
      {
        type: "list",
        items: [
          "Why it's special: a panoramic glass walkway with views of Burj Khalifa as the sun dips behind the skyline.",
          "Tip: arrive 30 minutes before sunset for the full spectrum of colour.",
          "With Desert Stars: book with instant slot confirmation to avoid the crowds.",
        ],
      },
      { type: "h", text: "2. A Palm Jumeirah sunset cruise" },
      {
        type: "list",
        items: [
          "Serenity, grandeur and dreamlike reflections over the water.",
          "Route highlights: Atlantis, The Pointe fountains, private yacht options.",
        ],
      },
      { type: "h", text: "3. Burj Khalifa at the Top, by night" },
      {
        type: "list",
        items: [
          "The city lights below like a galaxy, a favourite for romantic photographs.",
          "Pair it with dinner at At.mosphere for the full luxury evening.",
        ],
      },
      { type: "h", text: "4. An evening stroll on JBR Beach" },
      {
        type: "list",
        items: [
          "Light installations along the beach, perfect for families and solo travellers.",
          "Add an optional photo walk with a Desert Stars guide.",
        ],
      },
      { type: "h", text: "5. Desert sunset and stargazing" },
      {
        type: "list",
        items: [
          "Sunset over the dunes, then silence under the stars.",
          "Disconnect, reflect and feel the vastness of the desert.",
        ],
      },
      {
        type: "p",
        text: "Dubai's golden hours aren't just pretty, they shift your perspective. Whether it's a tranquil skyline cruise or a skywalk with a racing heart, each moment is a memory sculpted in light.",
      },
      {
        type: "faq",
        items: [
          {
            q: "Can I book guided sunset experiences with Desert Stars?",
            a: "Yes. From Burj Khalifa golden-hour slots to desert sunset drives, we plan timed itineraries for the best light.",
          },
          {
            q: "What's the best skyline spot for photos?",
            a: "Sky Views Observatory, The View at the Palm and Dubai Frame all offer great skyline views. We'll recommend time slots for the best light.",
          },
          {
            q: "Are tripods or professional cameras allowed?",
            a: "Most attractions allow handheld cameras but restrict tripods. We'll guide you on each location's policy.",
          },
        ],
      },
    ],
  },
  {
    slug: "abu-dhabi-in-one-day",
    title: "Abu Dhabi in One Day: Heritage Meets Modern Wonders",
    category: "Abu Dhabi",
    date: "2025-07-28",
    image: "/images/tours/abudhabi-city-1.webp",
    excerpt:
      "Abu Dhabi doesn't rush you, but if time is tight it delivers. How to see the best of the capital in a single day.",
    body: [
      {
        type: "p",
        text: "Abu Dhabi doesn't rush you, but if time is tight, it delivers. From spiritual serenity to architectural brilliance, here's how to savour the best of the capital in just one day.",
      },
      { type: "h", text: "The day at a glance" },
      {
        type: "list",
        items: [
          "Morning: Sheikh Zayed Grand Mosque, with time for the dress code and quiet reflection.",
          "Midday: Qasr Al Watan and Emirates Palace, a photo stop and a cultural deep-dive.",
          "Afternoon: Louvre Abu Dhabi, with timed tickets.",
          "Sunset: a bike ride along the Corniche or a walk on the beach.",
          "To finish: dinner on a rooftop with skyline views.",
        ],
      },
      {
        type: "faq",
        items: [
          {
            q: "Can I see the Grand Mosque, the Louvre and Qasr Al Watan in one day?",
            a: "Yes. Desert Stars plans the day with transport and time buffers for each site.",
          },
          {
            q: "Do I need to dress modestly at Abu Dhabi's cultural sites?",
            a: "Yes. Cover shoulders and knees at religious and government landmarks.",
          },
          {
            q: "Is a guide necessary?",
            a: "Highly recommended. A local expert adds cultural depth and saves a lot of time.",
          },
        ],
      },
    ],
  },
  {
    slug: "ferrari-world-vs-warner-bros",
    title: "Ferrari World or Warner Bros World: Which Suits Your Family?",
    category: "Theme parks",
    date: "2025-07-28",
    image: "/images/tours/ferrari-1.webp",
    excerpt:
      "Two icons on Yas Island. Compare Ferrari World's thrills with Warner Bros' family charm and choose your day.",
    body: [
      {
        type: "p",
        text: "Two iconic parks, one unforgettable holiday. Whether you crave speed or charm, the Emirates' entertainment giants deliver.",
      },
      {
        type: "table",
        head: ["", "Ferrari World", "Warner Bros World"],
        rows: [
          ["Rides", "Extreme thrills: Formula Rossa, Flying Aces", "Immersive themed rides: Batman, Scooby-Doo"],
          ["For little ones", "Limited toddler zones", "Extensive areas for every age"],
          ["Atmosphere", "Futuristic motorsport", "Hollywood storytelling and nostalgia"],
          ["Time needed", "4 to 6 hours", "4 to 5 hours"],
          ["Height rules", "105 to 140 cm on key rides", "Most rides from 90 cm"],
          ["Dining", "Italian, Arabic and casual snacks", "Cartoon-themed cafés and international food"],
          ["Best for", "Teenagers, thrill-seekers, racing fans", "Families with children, animation fans"],
        ],
      },
      {
        type: "faq",
        items: [
          {
            q: "Which park has more thrill rides?",
            a: "Ferrari World. It's built for speed seekers, while Warner Bros leans toward storytelling and family zones.",
          },
          {
            q: "Are there toddler areas in both parks?",
            a: "Yes. Each has soft-play zones, character meet-and-greets and shaded lounges.",
          },
          {
            q: "Can I visit both parks in one day?",
            a: "It's possible with careful timing, but we recommend a full day for each.",
          },
        ],
      },
    ],
  },
];
