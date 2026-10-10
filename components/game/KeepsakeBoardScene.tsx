"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Film,
  Clapperboard,
  Shirt,
  Sparkles,
  FlaskConical,
  NotebookPen,
  Clock,
  CalendarDays,
  ChevronUp,
  ChevronDown,
  Lock,
  LockOpen,
} from "lucide-react";
import ScrapbookScene from "@/components/scrapbook/ScrapbookScene";
import { StickerField, StarSticker, SparkleSticker } from "@/components/ui/stickers";
import { keepsakeTags, keepsakeCombination, keepsake, type KeepsakeTag } from "@/data/keepsake";
import { useScene } from "@/lib/sceneContext";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  a1: Clapperboard,
  a2: Film,
  b1: Shirt,
  b2: Sparkles,
  c1: FlaskConical,
  c2: NotebookPen,
  d1: Clock,
  d2: CalendarDays,
};

// Pair order controls which combination digit each connection reveals.
const PAIR_ORDER = ["movie", "ethnic", "lab", "nov11"];

function pairMidpoint(tags: KeepsakeTag[], pairId: string) {
  const [t1, t2] = tags.filter((t) => t.pairId === pairId);
  const toNum = (v: string) => parseFloat(v);
  return {
    x: (toNum(t1.left) + toNum(t2.left)) / 2,
    y: (toNum(t1.top) + toNum(t2.top)) / 2,
  };
}

export default function KeepsakeBoardScene() {
  const { next, completeGame, gameCompleted } = useScene();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, boolean>>({});
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [dials, setDials] = useState([0, 0, 0, 0]);
  const [lockShake, setLockShake] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);

  const totalPairs = PAIR_ORDER.length;
  const allMatched = Object.keys(matchedPairs).length === totalPairs;

  function handleTagClick(tag: KeepsakeTag) {
    if (matchedPairs[tag.pairId] || boxOpen) return;

    if (selectedId === tag.id) {
      setSelectedId(null);
      return;
    }

    if (!selectedId) {
      setSelectedId(tag.id);
      return;
    }

    const first = keepsakeTags.find((t) => t.id === selectedId)!;
    if (first.pairId === tag.pairId && first.id !== tag.id) {
      setMatchedPairs((prev) => ({ ...prev, [tag.pairId]: true }));
      setSelectedId(null);
    } else {
      setWrongIds([selectedId, tag.id]);
      setSelectedId(null);
      setTimeout(() => setWrongIds([]), 450);
    }
  }

  function adjustDial(index: number, delta: number) {
    if (!allMatched || boxOpen) return;
    setDials((prev) => {
      const copy = [...prev];
      copy[index] = (copy[index] + delta + 10) % 10;
      return copy;
    });
  }

  function tryOpen() {
    if (!allMatched || boxOpen) return;
    const correct = dials.every((d, i) => d === keepsakeCombination[i]);
    if (correct) {
      setBoxOpen(true);
      completeGame();
      setTimeout(next, 1400);
    } else {
      setLockShake(true);
      setTimeout(() => setLockShake(false), 450);
    }
  }

  const lines = useMemo(
    () =>
      PAIR_ORDER.filter((p) => matchedPairs[p]).map((p) => {
        const [t1, t2] = keepsakeTags.filter((t) => t.pairId === p);
        return { pairId: p, t1, t2, mid: pairMidpoint(keepsakeTags, p) };
      }),
    [matchedPairs]
  );

  return (
    <ScrapbookScene bg="cork-texture" className="min-h-screen">
      <StickerField
        stickers={[
          { node: <StarSticker color="#FFC43D" />, left: "3%", top: "6%", width: 24, animation: "twinkle" },
          { node: <SparkleSticker color="#FFF3DD" />, right: "4%", top: "8%", width: 22, animation: "twinkle", delay: 0.6 },
          { node: <StarSticker color="#F6A9BD" />, left: "5%", bottom: "4%", width: 18, animation: "twinkle", delay: 1.1 },
        ]}
      />
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream/80 text-shadow-soft">
          Chapter Five
        </p>
        <h2 className="font-serif text-3xl font-bold text-cream text-shadow-soft sm:text-4xl">{keepsake.intro}</h2>
        <p className="mt-2 font-hand text-xl text-cream/85 text-shadow-soft">{keepsake.subIntro}</p>
      </div>

      <div className="relative mx-auto h-[560px] w-full max-w-3xl sm:h-[600px]">
        {/* string lines between matched pairs */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
          {lines.map(({ pairId, t1, t2 }) => (
            <motion.line
              key={pairId}
              x1={parseFloat(t1.left)}
              y1={parseFloat(t1.top)}
              x2={parseFloat(t2.left)}
              y2={parseFloat(t2.top)}
              stroke="#D6305C"
              strokeWidth="0.4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </svg>

        {/* digit chips at each matched pair's midpoint */}
        {lines.map(({ pairId, mid }) => (
          <motion.div
            key={pairId}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cream bg-burgundy font-serif text-base font-bold text-cream shadow-md"
            style={{ left: `${mid.x}%`, top: `${mid.y}%` }}
          >
            {keepsakeCombination[PAIR_ORDER.indexOf(pairId)]}
          </motion.div>
        ))}

        {/* tag cards */}
        {keepsakeTags.map((tag) => {
          const Icon = ICONS[tag.id];
          const isMatched = matchedPairs[tag.pairId];
          const isSelected = selectedId === tag.id;
          const isWrong = wrongIds.includes(tag.id);

          return (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag)}
              disabled={isMatched}
              aria-label={`${tag.label}, ${tag.sublabel}${isMatched ? ", connected" : ""}`}
              aria-pressed={isSelected}
              style={{ top: tag.top, left: tag.left, transform: `translate(-50%, -50%) rotate(${tag.rotate}deg)` }}
              className={`absolute z-10 w-32 rounded-sm bg-[#FFF9E8] p-3 text-left shadow-md transition-shadow sm:w-36 ${
                isSelected ? "ring-2 ring-burgundy" : ""
              } ${isMatched ? "opacity-60" : "hover:shadow-lg"} ${isWrong ? "shake" : ""} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy`}
            >
              <span
                className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-walnut shadow-sm"
                aria-hidden="true"
              />
              <Icon size={16} className="mb-1 text-burgundy" />
              <p className="font-hand text-base leading-tight text-walnut">{tag.label}</p>
              <p className="font-sans text-[11px] text-walnut/55">{tag.sublabel}</p>
            </button>
          );
        })}
      </div>

      {/* the keepsake box */}
      <div className="mx-auto mt-8 flex max-w-sm flex-col items-center gap-4 pb-10">
        <p className="text-center font-hand text-xl text-cream/90">
          {allMatched ? keepsake.hintAfterSolved : keepsake.hintBeforeSolved}
        </p>

        <AnimatePresence mode="wait">
          {!boxOpen ? (
            <motion.div
              key="locked"
              exit={{ opacity: 0, scale: 0.9 }}
              className={`polaroid-shadow flex flex-col items-center gap-4 rounded-sm bg-[#5c3d2e] p-6 ${lockShake ? "shake" : ""}`}
            >
              <div className="flex items-center gap-1.5 text-dusty-rose">
                {allMatched ? <LockOpen size={18} /> : <Lock size={18} />}
                <span className="text-xs uppercase tracking-[0.2em]">
                  {allMatched ? "enter the combination" : "locked"}
                </span>
              </div>

              <div className="flex gap-2">
                {dials.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => adjustDial(i, 1)}
                      disabled={!allMatched}
                      aria-label={`Increase dial ${i + 1}`}
                      className="text-cream/70 enabled:hover:text-cream disabled:opacity-30"
                    >
                      <ChevronUp size={18} />
                    </button>
                    <div className="flex h-11 w-9 items-center justify-center rounded-sm border border-cream/30 bg-[#3f2a20] font-mono text-xl text-cream">
                      {d}
                    </div>
                    <button
                      onClick={() => adjustDial(i, -1)}
                      disabled={!allMatched}
                      aria-label={`Decrease dial ${i + 1}`}
                      className="text-cream/70 enabled:hover:text-cream disabled:opacity-30"
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={tryOpen}
                disabled={!allMatched}
                className="mt-1 rounded-full bg-burgundy px-6 py-2.5 text-sm font-semibold text-cream shadow-md disabled:opacity-30 enabled:hover:scale-105 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                Open
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2 rounded-sm bg-[#5c3d2e] p-8"
            >
              <LockOpen size={28} className="text-dusty-rose" />
              <p className="font-hand text-xl text-cream">{keepsake.openedNote}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {gameCompleted && !boxOpen && (
          <p className="font-sans text-xs text-cream/50">already unlocked — continuing on…</p>
        )}
      </div>
    </ScrapbookScene>
  );
}
