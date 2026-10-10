"use client";

import { motion } from "motion/react";
import { Film, Ticket } from "lucide-react";
import ScrapbookScene, { SceneHeading, WashiTape } from "./ScrapbookScene";
import PhotoCard from "./PhotoCard";
import { movieDate } from "@/data/memories";
import { staggerContainer, staggerItem } from "@/lib/animationVariants";

export default function MovieDateScene() {
  return (
    <ScrapbookScene>
      <WashiTape top="4%" left="8%" rotate={-8} color="#9B3348" />
      <WashiTape top="6%" left="82%" rotate={6} color="#344B40" />

      <SceneHeading eyebrow="Chapter One" title={movieDate.title} subtitle={movieDate.date} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-4xl flex-col items-center gap-10"
      >
        {/* movie ticket */}
        <motion.div
          variants={staggerItem}
          className="film-grain relative flex w-full max-w-md items-stretch overflow-hidden rounded-md bg-walnut text-cream shadow-xl"
        >
          <div className="flex flex-1 flex-col justify-between p-5">
            <div className="flex items-center gap-2 text-dusty-rose">
              <Film size={18} />
              <span className="text-xs uppercase tracking-[0.25em]">Now Showing</span>
            </div>
            <p className="font-serif text-2xl font-bold">Rockstar</p>
            <p className="font-hand text-lg text-cream/70">{movieDate.ticketLabel}</p>
          </div>
          <div className="stamp-edge flex w-16 items-center justify-center border-l border-dashed border-cream/30 bg-burgundy/40">
            <Ticket size={20} className="rotate-90 text-cream/80" />
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="flex flex-wrap items-start justify-center gap-6">
          {movieDate.photos.map((p, i) => (
            <PhotoCard key={p.src + i} photo={p} rotate={i % 2 === 0 ? -5 : 4} width={220} />
          ))}
        </motion.div>

        <motion.div
          variants={staggerItem}
          className="mx-auto max-w-lg rounded-sm bg-white/70 p-6 text-center shadow-sm"
        >
          <p className="font-hand text-2xl leading-relaxed text-walnut/85">{movieDate.caption}</p>
          {movieDate.insideJoke && (
            <p className="mt-3 font-sans text-sm italic text-walnut/50">{movieDate.insideJoke}</p>
          )}
        </motion.div>
      </motion.div>
    </ScrapbookScene>
  );
}
