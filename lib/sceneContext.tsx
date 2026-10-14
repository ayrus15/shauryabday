"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

export const SCENES = [
  "invitation",
  "envelope",
  "movie",
  "ethnic2025",
  "fullcircle",
  "nov11",
  "keepsake",
  "letter",
  "finale",
] as const;

export type SceneId = (typeof SCENES)[number];

type SceneContextValue = {
  sceneIndex: number;
  sceneId: SceneId;
  gameCompleted: boolean;
  furthestUnlocked: number;
  goTo: (id: SceneId) => void;
  next: () => void;
  prev: () => void;
  completeGame: () => void;
  canGoTo: (id: SceneId) => boolean;
};

const SceneContext = createContext<SceneContextValue | null>(null);

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [furthestUnlocked, setFurthestUnlocked] = useState(0);

  // A ref mirrors gameCompleted so gating checks always see the latest value
  // even from a function captured before React re-renders — e.g. a
  // setTimeout(next, ...) scheduled in the same tick as completeGame(),
  // where `next`'s own closure would otherwise still think the game isn't
  // done yet and silently refuse to advance.
  const gameCompletedRef = useRef(false);

  const gameIndex = SCENES.indexOf("keepsake");

  // Everything after the keepsake game (the letter and the finale) requires
  // the game to actually be completed — not just reached — otherwise the
  // progress dots let you skip straight from the game to the letter without
  // finishing it, leaving `next()` on the letter scene silently unable to
  // advance.
  const canGoTo = useCallback(
    (id: SceneId) => {
      const idx = SCENES.indexOf(id);
      if (idx > gameIndex && !gameCompletedRef.current) return false;
      return idx <= furthestUnlocked + 1;
    },
    [furthestUnlocked, gameIndex]
  );

  const goTo = useCallback(
    (id: SceneId) => {
      const idx = SCENES.indexOf(id);
      if (idx > gameIndex && !gameCompletedRef.current) return;
      setSceneIndex(idx);
      setFurthestUnlocked((f) => Math.max(f, idx));
    },
    [gameIndex]
  );

  const next = useCallback(() => {
    setSceneIndex((i) => {
      const nextIdx = Math.min(i + 1, SCENES.length - 1);
      if (nextIdx > gameIndex && !gameCompletedRef.current) return i;
      setFurthestUnlocked((f) => Math.max(f, nextIdx));
      return nextIdx;
    });
  }, [gameIndex]);

  const prev = useCallback(() => {
    setSceneIndex((i) => Math.max(i - 1, 0));
  }, []);

  const completeGame = useCallback(() => {
    gameCompletedRef.current = true;
    setGameCompleted(true);
    setFurthestUnlocked((f) => Math.max(f, gameIndex + 1));
  }, [gameIndex]);

  const value = useMemo(
    () => ({
      sceneIndex,
      sceneId: SCENES[sceneIndex],
      gameCompleted,
      furthestUnlocked,
      goTo,
      next,
      prev,
      completeGame,
      canGoTo,
    }),
    [sceneIndex, gameCompleted, furthestUnlocked, goTo, next, prev, completeGame, canGoTo]
  );

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>;
}

export function useScene() {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error("useScene must be used within SceneProvider");
  return ctx;
}
