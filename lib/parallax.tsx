"use client";

import { createContext, useContext, useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";

type ParallaxContextValue = { x: MotionValue<number>; y: MotionValue<number> };

const ParallaxContext = createContext<ParallaxContextValue | null>(null);

/**
 * Tracks normalized pointer position (-1..1 on each axis) across the whole
 * page, smoothed with a spring. Decorative stickers read this to drift
 * gently opposite the cursor. Desktop-with-mouse only — never attaches a
 * listener on touch devices or when the user prefers reduced motion, so x/y
 * simply stay at 0 and every consumer renders with no offset.
 */
export function ParallaxProvider({ children }: { children: React.ReactNode }) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 40, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 40, damping: 18, mass: 0.6 });

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasFinePointer || reducedMotion) return;

    function handleMove(e: PointerEvent) {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [rawX, rawY]);

  return <ParallaxContext.Provider value={{ x, y }}>{children}</ParallaxContext.Provider>;
}

export function useParallax() {
  const ctx = useContext(ParallaxContext);
  if (!ctx) throw new Error("useParallax must be used within ParallaxProvider");
  return ctx;
}
