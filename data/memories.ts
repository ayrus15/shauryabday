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
  { src: "/photos/placeholder-1.svg", alt: "Placeholder photo from the movie date", caption: "[[EDIT ME: add photo from the night]]" },
  { src: "/photos/placeholder-2.svg", alt: "Placeholder photo from the movie date", caption: "[[EDIT ME: add another photo]]" },
];

export const movieDate = {
  title: "Rockstar, October 2025",
  // Exact date unknown — fill in if you have it, e.g. "October 12, 2025".
  date: "[[EDIT ME: exact date]]",
  ticketLabel: "ADMIT TWO",
  caption:
    "[[EDIT ME: a line about how the evening felt — the theatre, the seats, the walk after.]]",
  insideJoke:
    "[[EDIT ME: the inside joke from that night, if there is one.]]",
  photos: moviePhotos,
};

export const ethnicDay2025Photos: Photo[] = [
  { src: "/photos/placeholder-1.svg", alt: "Ethnic Day 2025 placeholder", caption: "[[EDIT ME]]" },
];

export const ethnicDay2025 = {
  title: "Ethnic Day, 2025",
  subtitle: "Before we were us",
  note:
    "Funny how a memory can mean something completely different when you look back at it.",
  photos: ethnicDay2025Photos,
};

export const labPhotos: Photo[] = [
  { src: "/photos/placeholder-1.svg", alt: "Research lab placeholder photo", caption: "[[EDIT ME: caption]]" },
  { src: "/photos/placeholder-2.svg", alt: "Research lab placeholder photo", caption: "[[EDIT ME: caption]]" },
  { src: "/photos/placeholder-3.svg", alt: "Research lab placeholder photo", caption: "[[EDIT ME: caption]]" },
];

export const labMemories = {
  title: "The Research Lab Chronicles",
  subtitle: "Less formal, more us",
  intro:
    "[[EDIT ME: a line setting up the lab era — the long hours, the shared desk, whatever made it ours.]]",
  notes: [
    "[[EDIT ME: a funny taped-note moment #1]]",
    "[[EDIT ME: a funny taped-note moment #2]]",
    "[[EDIT ME: a funny taped-note moment #3]]",
  ],
  photos: labPhotos,
};

export const ethnicDay2026Photos: Photo[] = [
  { src: "/photos/placeholder-2.svg", alt: "Ethnic Day 2026 placeholder", caption: "[[EDIT ME]]" },
];

export const fullCircle = {
  title: "Ethnic Day, 2025 → 2026",
  message:
    "Last year, we were just making memories. This year, I got to make that memory with you as my girlfriend.",
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
  photo: { src: "/photos/placeholder-3.svg", alt: "November 11 placeholder photo" } as Photo,
};
