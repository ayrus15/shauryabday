"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { SCENES, useScene } from "@/lib/sceneContext";
import ProgressIndicator from "./ProgressIndicator";

const SCRAPBOOK_SCENES = SCENES.slice(2);

export default function SceneNavigation() {
  const { sceneId, sceneIndex, next, prev, canGoTo } = useScene();
  const inScrapbook = SCRAPBOOK_SCENES.includes(sceneId);
  if (!inScrapbook) return null;

  const isFirst = sceneIndex === 0;
  const isLast = sceneIndex === SCENES.length - 1;
  const nextBlocked = isLast || !canGoTo(SCENES[Math.min(sceneIndex + 1, SCENES.length - 1)]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-walnut/10 bg-cream/90 px-4 py-3 backdrop-blur sm:px-8">
      <button
        onClick={prev}
        disabled={isFirst}
        aria-label="Previous memory"
        className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-walnut/80 disabled:opacity-30 enabled:hover:bg-walnut/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-burgundy"
      >
        <ChevronLeft size={18} />
        <span className="hidden sm:inline">Back</span>
      </button>

      <ProgressIndicator />

      <button
        onClick={next}
        disabled={nextBlocked}
        aria-label="Next memory"
        className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-walnut/80 disabled:opacity-30 enabled:hover:bg-walnut/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-burgundy"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
