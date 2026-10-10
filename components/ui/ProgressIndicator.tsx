"use client";

import { SCENES, useScene } from "@/lib/sceneContext";
import { playWhoosh } from "@/lib/sound";

const SCRAPBOOK_SCENES = SCENES.slice(2); // movie..finale

export default function ProgressIndicator() {
  const { sceneId, canGoTo, goTo } = useScene();
  const currentIdx = SCRAPBOOK_SCENES.indexOf(sceneId);
  if (currentIdx === -1) return null;

  return (
    <div
      className="flex items-center gap-1.5"
      role="tablist"
      aria-label="Scrapbook progress"
    >
      {SCRAPBOOK_SCENES.map((id, i) => {
        const active = i === currentIdx;
        const reachable = canGoTo(id);
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            aria-label={`Go to scene ${i + 1} of ${SCRAPBOOK_SCENES.length}`}
            disabled={!reachable}
            onClick={() => {
              if (!reachable) return;
              playWhoosh();
              goTo(id);
            }}
            className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy ${
              active
                ? "w-6 bg-burgundy"
                : reachable
                  ? "w-2 bg-burgundy/40 hover:bg-burgundy/60"
                  : "w-2 bg-walnut/15"
            }`}
          />
        );
      })}
    </div>
  );
}
