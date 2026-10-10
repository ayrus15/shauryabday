// Memory quiz questions. `revealAfter` text shows once she answers (right or
// wrong) — a little bonus memory for getting through the question.

export type QuizOption = {
  id: string;
  label: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  // Shown after she answers, regardless of correctness.
  revealAfter: string;
  // Playful line shown specifically on a wrong answer.
  wrongAnswerHint: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Where did we go on our first movie date?",
    options: [
      { id: "a", label: "A rooftop screening" },
      { id: "b", label: "The movie theatre" },
      { id: "c", label: "Your place, on the laptop" },
      { id: "d", label: "We didn't — we stayed in" },
    ],
    correctOptionId: "b",
    revealAfter: "[[EDIT ME: a small detail about the theatre that night]]",
    wrongAnswerHint: "Close, but think popcorn and the big screen.",
  },
  {
    id: "q2",
    question: "Which month and year did we watch Rockstar together?",
    options: [
      { id: "a", label: "August 2025" },
      { id: "b", label: "October 2025" },
      { id: "c", label: "December 2025" },
      { id: "d", label: "February 2026" },
    ],
    correctOptionId: "b",
    revealAfter: "[[EDIT ME: a line about why that month stuck with you]]",
    wrongAnswerHint: "Think a little further back — closer to Diwali season.",
  },
  {
    id: "q3",
    question: "Which university memory involves our research lab?",
    options: [
      { id: "a", label: "[[EDIT ME: option]]" },
      { id: "b", label: "[[EDIT ME: option]]" },
      { id: "c", label: "[[EDIT ME: option]]" },
      { id: "d", label: "[[EDIT ME: option]]" },
    ],
    correctOptionId: "a",
    revealAfter: "[[EDIT ME: the actual lab memory, once you fill in the options above]]",
    wrongAnswerHint: "[[EDIT ME: a playful nudge toward the right one]]",
  },
  {
    id: "q4",
    question: "Why is this year's Ethnic Day special compared with last year's?",
    options: [
      { id: "a", label: "Better outfits" },
      { id: "b", label: "We went as a couple this time" },
      { id: "c", label: "It was a bigger event" },
      { id: "d", label: "We won a prize" },
    ],
    correctOptionId: "b",
    revealAfter: "Last year you were a memory in the making. This year you were mine.",
    wrongAnswerHint: "Think about who stood next to you this time.",
  },
  {
    id: "q5",
    question: "What happened on November 11 at 11:11 PM?",
    options: [
      { id: "a", label: "Nothing, it's a normal day" },
      { id: "b", label: "We watched a movie" },
      { id: "c", label: "You became my girlfriend" },
      { id: "d", label: "We had an argument" },
    ],
    correctOptionId: "c",
    revealAfter: "This is the one I never want to forget.",
    wrongAnswerHint: "It's the biggest one in this whole website — try again.",
  },
];
