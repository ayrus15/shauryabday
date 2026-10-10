"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import ScrapbookScene, { SceneHeading } from "@/components/scrapbook/ScrapbookScene";
import { quizQuestions } from "@/data/questions";
import { useScene } from "@/lib/sceneContext";

type Answer = { optionId: string; correct: boolean } | undefined;

export default function MemoryQuiz() {
  const { next, completeQuiz, quizCompleted } = useScene();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(() => Array(quizQuestions.length).fill(undefined));

  const question = quizQuestions[index];
  const answer = answers[index];
  const allAnswered = answers.every((a) => a !== undefined);
  const isLast = index === quizQuestions.length - 1;

  function selectOption(optionId: string) {
    if (answer) return; // already answered, no re-selecting
    const correct = optionId === question.correctOptionId;
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = { optionId, correct };
      return copy;
    });
  }

  function goNext() {
    if (isLast) {
      if (allAnswered) completeQuiz();
      return;
    }
    setIndex((i) => Math.min(i + 1, quizQuestions.length - 1));
  }

  function goPrev() {
    setIndex((i) => Math.max(i - 1, 0));
  }

  return (
    <ScrapbookScene bg="bg-lavender/30">
      <SceneHeading eyebrow="Chapter Five" title="How well do you know our story?" />

      <div className="mx-auto mb-8 flex max-w-md items-center justify-center gap-1.5" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={quizQuestions.length}>
        {quizQuestions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setIndex(i)}
            aria-label={`Question ${i + 1}${answers[i] ? ", answered" : ""}`}
            className={`h-2 flex-1 max-w-10 rounded-full transition-colors ${
              i === index ? "bg-burgundy" : answers[i] ? "bg-burgundy/50" : "bg-walnut/15"
            }`}
          />
        ))}
      </div>
      <p className="mb-6 text-center font-sans text-sm text-walnut/50">
        Question {index + 1} of {quizQuestions.length}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mx-auto max-w-xl rounded-sm bg-white/80 p-6 shadow-md sm:p-8"
        >
          <h3 className="mb-6 text-center font-serif text-xl font-semibold text-walnut sm:text-2xl">
            {question.question}
          </h3>

          <div className="flex flex-col gap-3">
            {question.options.map((opt) => {
              const isSelected = answer?.optionId === opt.id;
              const showCorrect = answer && opt.id === question.correctOptionId;
              const showWrongSelected = answer && isSelected && !answer.correct;

              return (
                <button
                  key={opt.id}
                  onClick={() => selectOption(opt.id)}
                  disabled={Boolean(answer)}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left font-sans text-sm transition-colors sm:text-base ${
                    showCorrect
                      ? "border-forest bg-forest/10 text-forest"
                      : showWrongSelected
                        ? "border-burgundy bg-burgundy/10 text-burgundy"
                        : "border-walnut/15 text-walnut/80 enabled:hover:border-burgundy/40 enabled:hover:bg-burgundy/5"
                  } ${answer && !isSelected && opt.id !== question.correctOptionId ? "opacity-50" : ""} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy`}
                >
                  <span>{opt.label}</span>
                  {showCorrect && <Check size={18} />}
                  {showWrongSelected && <X size={18} />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {answer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-5 overflow-hidden"
              >
                <div
                  className={`flex items-start gap-2 rounded-lg p-4 text-sm ${
                    answer.correct ? "bg-forest/10 text-forest" : "bg-dusty-rose/30 text-walnut"
                  }`}
                >
                  <Sparkles size={16} className="mt-0.5 shrink-0" />
                  <div>
                    {!answer.correct && (
                      <p className="mb-1 font-medium">{question.wrongAnswerHint}</p>
                    )}
                    <p className="font-hand text-base leading-snug sm:text-lg">{question.revealAfter}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="mx-auto mt-8 flex max-w-xl items-center justify-between">
        <button
          onClick={goPrev}
          disabled={index === 0}
          className="flex items-center gap-1 rounded-full px-4 py-2 text-sm text-walnut/70 disabled:opacity-30 enabled:hover:bg-walnut/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-burgundy"
        >
          <ChevronLeft size={16} /> Previous
        </button>

        {isLast ? (
          <button
            onClick={() => {
              completeQuiz();
              next();
            }}
            disabled={!allAnswered}
            className="rounded-full bg-burgundy px-6 py-2.5 text-sm font-semibold text-cream shadow-md disabled:opacity-40 enabled:hover:scale-105 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
          >
            {quizCompleted ? "Continue" : "Finish & continue"}
          </button>
        ) : (
          <button
            onClick={goNext}
            disabled={!answer}
            className="flex items-center gap-1 rounded-full px-4 py-2 text-sm text-walnut/70 disabled:opacity-30 enabled:hover:bg-walnut/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-burgundy"
          >
            Next <ChevronRight size={16} />
          </button>
        )}
      </div>
    </ScrapbookScene>
  );
}
