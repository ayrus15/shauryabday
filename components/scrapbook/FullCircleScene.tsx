"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { MoveHorizontal } from "lucide-react";
import ScrapbookScene, { SceneHeading } from "./ScrapbookScene";
import { StickerField, HeartSticker, StarSticker } from "@/components/ui/stickers";
import { fullCircle } from "@/data/memories";
import { fadeUp } from "@/lib/animationVariants";

export default function FullCircleScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splitPercent, setSplitPercent] = useState(50);

  function updateFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplitPercent(Math.min(100, Math.max(0, pct)));
  }

  return (
    <ScrapbookScene bg="bg-gradient-to-b from-lavender/50 via-cream to-dusty-rose/40">
      <StickerField
        stickers={[
          { node: <HeartSticker color="#D6305C" />, left: "6%", top: "18%", width: 22, animation: "float-slow" },
          { node: <StarSticker color="#1F9D6E" />, right: "7%", top: "14%", width: 20, animation: "twinkle", delay: 0.5 },
          { node: <HeartSticker color="#F6A9BD" />, right: "5%", bottom: "20%", width: 18, animation: "float-slow", delay: 1 },
        ]}
      />
      <SceneHeading eyebrow="Chapter Three" title={fullCircle.title} />

      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mx-auto max-w-xl">
        <div
          ref={containerRef}
          className="polaroid-shadow relative mx-auto aspect-[4/5] w-full max-w-sm touch-none select-none overflow-hidden rounded-sm bg-white"
          onPointerDown={(e) => {
            (e.target as Element).setPointerCapture?.(e.pointerId);
            updateFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.buttons !== 1 && e.pointerType !== "touch") return;
            updateFromClientX(e.clientX);
          }}
          role="slider"
          aria-label="Compare Ethnic Day 2025 and 2026"
          aria-valuenow={Math.round(splitPercent)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setSplitPercent((p) => Math.max(0, p - 5));
            if (e.key === "ArrowRight") setSplitPercent((p) => Math.min(100, p + 5));
          }}
        >
          <div className="absolute inset-0">
            <Image src={fullCircle.after.photo.src} alt={fullCircle.after.photo.alt} fill className="object-cover" />
            <span className="absolute bottom-3 right-3 rounded-full bg-walnut/80 px-3 py-1 font-hand text-sm text-cream">
              {fullCircle.after.year}
            </span>
          </div>
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
          >
            <Image src={fullCircle.before.photo.src} alt={fullCircle.before.photo.alt} fill className="object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-walnut/80 px-3 py-1 font-hand text-sm text-cream">
              {fullCircle.before.year}
            </span>
          </div>
          <div
            className="absolute inset-y-0 w-0.5 bg-cream shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
            style={{ left: `${splitPercent}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-walnut shadow-md">
              <MoveHorizontal size={16} />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={() => setSplitPercent(0)}
            className="rounded-full border border-walnut/20 px-4 py-1.5 text-sm font-medium text-walnut/70 hover:bg-walnut/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-burgundy"
          >
            {fullCircle.after.year}
          </button>
          <button
            onClick={() => setSplitPercent(100)}
            className="rounded-full border border-walnut/20 px-4 py-1.5 text-sm font-medium text-walnut/70 hover:bg-walnut/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-burgundy"
          >
            {fullCircle.before.year}
          </button>
        </div>

        <p className="mx-auto mt-8 max-w-md text-center font-serif text-xl italic leading-relaxed text-walnut/80">
          {fullCircle.message}
        </p>
      </motion.div>
    </ScrapbookScene>
  );
}
