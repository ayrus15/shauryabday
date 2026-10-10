"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export const SCENES = [
  "invitation",
  "envelope",
  "movie",
  "ethnic2025",
  "lab",
  "fullcircle",
  "nov11",
  "quiz",
  "letter",
  "finale",
] as const;

export type SceneId = (typeof SCENES)[number];

type SceneContextValue = {
  sceneIndex: number;
  sceneId: SceneId;
  quizCompleted: boolean;
  furthestUnlocked: number;
  goTo: (id: SceneId) => void;
  next: () => void;
  prev: () => void;
  completeQuiz: () => void;
  canGoTo: (id: SceneId) => boolean;
};

const SceneContext = createContext<SceneContextValue | null>(null);

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [furthestUnlocked, setFurthestUnlocked] = useState(0);

  const quizIndex = SCENES.indexOf("quiz");
  const finaleIndex = SCENES.indexOf("finale");

  const canGoTo = useCallback(
    (id: SceneId) => {
      const idx = SCENES.indexOf(id);
      if (idx === finaleIndex && !quizCompleted) return false;
      return idx <= furthestUnlocked + 1;
    },
    [furthestUnlocked, quizCompleted, finaleIndex]
  );

  const goTo = useCallback(
    (id: SceneId) => {
      const idx = SCENES.indexOf(id);
      if (idx === finaleIndex && !quizCompleted) return;
      setSceneIndex(idx);
      setFurthestUnlocked((f) => Math.max(f, idx));
    },
    [quizCompleted, finaleIndex]
  );

  const next = useCallback(() => {
    setSceneIndex((i) => {
      const nextIdx = Math.min(i + 1, SCENES.length - 1);
      if (nextIdx === finaleIndex && !quizCompleted) return i;
      setFurthestUnlocked((f) => Math.max(f, nextIdx));
      return nextIdx;
    });
  }, [quizCompleted, finaleIndex]);

  const prev = useCallback(() => {
    setSceneIndex((i) => Math.max(i - 1, 0));
  }, []);

  const completeQuiz = useCallback(() => {
    setQuizCompleted(true);
    setFurthestUnlocked((f) => Math.max(f, quizIndex + 1));
  }, [quizIndex]);

  const value = useMemo(
    () => ({
      sceneIndex,
      sceneId: SCENES[sceneIndex],
      quizCompleted,
      furthestUnlocked,
      goTo,
      next,
      prev,
      completeQuiz,
      canGoTo,
    }),
    [sceneIndex, quizCompleted, furthestUnlocked, goTo, next, prev, completeQuiz, canGoTo]
  );

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>;
}

export function useScene() {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error("useScene must be used within SceneProvider");
  return ctx;
}
