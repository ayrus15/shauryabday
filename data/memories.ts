// All personal memory content lives here. Replace placeholder photos and
// [[EDIT ME]] text with the real thing — the UI never needs to change.

export type Photo = {
  // Path under /public, e.g. "/photos/movie-date-1.jpg".
  // Leave as the placeholder path until real photos are added.
  src: string;
  alt: string;
  caption?: string;
};

export const moviePhotos: Photo[] = [
  { src: "/photos/rockstar-poster.jpg", alt: "Rockstar movie poster" },
];

export const movieDate = {
  title: "Rockstar, August 2025",
  date: "August 25, 2025",
  ticketLabel: "ADMIT TWO",
  caption: "The best cinema experience till date.",
  insideJoke: "The day I realised you are more than a fling.",
  photos: moviePhotos,
};

export const ethnicDay2025Photos: Photo[] = [
  { src: "/photos/ethnic-day-2025.jpg", alt: "Shaurya and Surya dressed up for Ethnic Day, 2025" },
];

export const ethnicDay2025 = {
  title: "Ethnic Day, 2025",
  subtitle: "Before we were us",
  note: "This will always be the closest to my heart — the day I fell completely in love.",
  photos: ethnicDay2025Photos,
};

export const ethnicDay2026Photos: Photo[] = [
  { src: "/photos/ethnic-day-2025.jpg", alt: "Shaurya and Surya dressed up for Ethnic Day, 2025" },
];

export const fullCircle = {
  title: "Ethnic Day, 2025 → 2026",
  message: "The best one year of my life — from a fling to my girlfriend. 😜😝 You have made it in life.",
  before: {
    year: "2025",
    photo: ethnicDay2025Photos[0],
    label: "Before",
  },
  after: {
    year: "2026",
    photo: ethnicDay2026Photos[0],
    label: "After",
  },
};

export const nov11 = {
  heading: "November 11",
  time: "11:11 PM",
  line: "The moment you became my girlfriend.",
  message:
    "Of all the dates I could remember, this is the one I never want to forget.",
  photo: { src: "/photos/nov11-moment.jpg", alt: "The moment Shaurya became Surya's girlfriend" } as Photo,
};
