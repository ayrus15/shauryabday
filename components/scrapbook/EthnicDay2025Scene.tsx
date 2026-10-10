"use client";

import { motion } from "motion/react";
import ScrapbookScene, { SceneHeading, WashiTape } from "./ScrapbookScene";
import PhotoCard from "./PhotoCard";
import { ethnicDay2025 } from "@/data/memories";
import { staggerContainer, staggerItem } from "@/lib/animationVariants";

export default function EthnicDay2025Scene() {
  return (
    <ScrapbookScene bg="bg-dusty-rose/20">
      <WashiTape top="5%" left="12%" rotate={5} color="#9B3348" />
      <WashiTape top="8%" left="78%" rotate={-6} color="#F2E9FF" />

      <SceneHeading eyebrow="Chapter Two" title={ethnicDay2025.title} subtitle={ethnicDay2025.subtitle} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-3xl flex-col items-center gap-10"
      >
        <motion.div variants={staggerItem} className="flex flex-wrap items-start justify-center gap-6">
          {ethnicDay2025.photos.map((p, i) => (
            <PhotoCard key={p.src + i} photo={p} rotate={i % 2 === 0 ? -6 : 5} width={240} />
          ))}
        </motion.div>

        <motion.div
          variants={staggerItem}
          className="relative max-w-lg rounded-sm bg-white/80 p-8 text-center shadow-sm"
        >
          <p className="font-hand text-2xl leading-relaxed text-walnut/85">&ldquo;{ethnicDay2025.note}&rdquo;</p>
        </motion.div>
      </motion.div>
    </ScrapbookScene>
  );
}
