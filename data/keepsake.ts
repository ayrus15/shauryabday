// Content for the corkboard + keepsake-box scene that replaces the old quiz.
// Pair up the two tags that belong together; each correct pair reveals one
// digit of the combination that opens the box.

export type KeepsakeTag = {
  id: string;
  pairId: string;
  label: string;
  sublabel: string;
  top: string;
  left: string;
  rotate: number;
};

// Every pair reveals the digit "1" — because the combination is 11:11 on
// November 11th, the one date this whole site keeps coming back to.
export const keepsakeTags: KeepsakeTag[] = [
  { id: "a1", pairId: "movie", label: "Rockstar", sublabel: "the screen was too bright", top: "10%", left: "8%", rotate: -6 },
  { id: "a2", pairId: "movie", label: "First Movie Date", sublabel: "August 2025", top: "32%", left: "58%", rotate: 4 },

  { id: "b1", pairId: "ethnic", label: "Ethnic Day", sublabel: "before we were us", top: "6%", left: "64%", rotate: 5 },
  { id: "b2", pairId: "ethnic", label: "Ethnic Day, again", sublabel: "this time, together", top: "56%", left: "6%", rotate: -4 },

  { id: "c1", pairId: "lab", label: "The Research Lab", sublabel: "staying up late evenings for Socio", top: "64%", left: "64%", rotate: -5 },
  { id: "c2", pairId: "lab", label: "The Place That Saw Us Fall In Love", sublabel: "less formal, more us", top: "20%", left: "28%", rotate: 3 },

  { id: "d1", pairId: "nov11", label: "11:11 PM", sublabel: "the time", top: "46%", left: "38%", rotate: -3 },
  { id: "d2", pairId: "nov11", label: "November 11", sublabel: "the date", top: "74%", left: "30%", rotate: 6 },
];

export const keepsakeCombination = [1, 1, 1, 1] as const;

export const keepsake = {
  intro: "Four little strings, one little box.",
  subIntro: "Connect what belongs together — each one hides a number.",
  hintBeforeSolved: "Find all four connections to see the combination.",
  hintAfterSolved: "It's the same number, four times. You already know this one.",
  openedNote: "Open me, and keep going.",
};
