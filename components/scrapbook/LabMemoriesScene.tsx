"use client";

import { motion } from "motion/react";
import ScrapbookScene, { SceneHeading, WashiTape } from "./ScrapbookScene";
import PhotoCard from "./PhotoCard";
import { labMemories } from "@/data/memories";
import { staggerContainer, staggerItem } from "@/lib/animationVariants";

const rotations = [-8, 5, -3, 7, -5];

export default function LabMemoriesScene() {
  return (
    <ScrapbookScene bg="bg-forest/5">
      <WashiTape top="4%" left="6%" rotate={-10} color="#344B40" />
      <WashiTape top="10%" left="88%" rotate={8} color="#9B3348" />

      <SceneHeading eyebrow="Chapter Three" title={labMemories.title} subtitle={labMemories.subtitle} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl"
      >
        <motion.p variants={staggerItem} className="mx-auto mb-10 max-w-lg text-center font-sans text-walnut/70">
          {labMemories.intro}
        </motion.p>

        <motion.div variants={staggerItem} className="relative flex flex-wrap items-center justify-center gap-x-4 gap-y-8">
          {labMemories.photos.map((p, i) => (
            <div
              key={p.src + i}
              className="relative"
              style={{ marginTop: i % 2 === 1 ? 24 : 0, zIndex: i }}
            >
              <PhotoCard photo={p} rotate={rotations[i % rotations.length]} width={210} />
            </div>
          ))}
        </motion.div>

        <motion.div variants={staggerItem} className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-4">
          {labMemories.notes.map((note, i) => (
            <div
              key={i}
              className="relative max-w-[220px] rotate-[var(--r)] rounded-sm bg-[#FFF9E8] p-4 shadow-md"
              style={{ "--r": `${i % 2 === 0 ? -3 : 3}deg` } as React.CSSProperties}
            >
              <span
                className="washi-tape absolute -top-2 left-1/2 h-5 w-14 -translate-x-1/2 rounded-sm"
                style={{ background: "#D9B8B1cc" }}
                aria-hidden="true"
              />
              <p className="font-hand text-lg leading-snug text-walnut/80">{note}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </ScrapbookScene>
  );
}
