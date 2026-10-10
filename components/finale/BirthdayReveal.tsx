"use client";

import { motion } from "motion/react";
import { Gift, RotateCcw } from "lucide-react";
import ScrapbookScene from "@/components/scrapbook/ScrapbookScene";
import PhotoCard from "@/components/scrapbook/PhotoCard";
import Confetti from "./Confetti";
import { finale } from "@/data/messages";
import { finalSurpriseMessage, siteConfig } from "@/data/config";
import { moviePhotos, ethnicDay2025Photos, labPhotos } from "@/data/memories";
import { useScene } from "@/lib/sceneContext";
import { staggerContainer, staggerItem } from "@/lib/animationVariants";

const highlightPhotos = [moviePhotos[0], ethnicDay2025Photos[0], labPhotos[0]].filter(Boolean);

export default function BirthdayReveal() {
  const { goTo } = useScene();

  return (
    <ScrapbookScene bg="bg-gradient-to-b from-lavender via-cream to-dusty-rose/40" className="flex min-h-screen flex-col items-center justify-center text-center">
      <Confetti />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex max-w-2xl flex-col items-center gap-8 px-4"
      >
        <motion.h1 variants={staggerItem} className="font-serif text-4xl font-bold text-burgundy sm:text-6xl">
          {finale.heading}
        </motion.h1>

        <motion.p variants={staggerItem} className="max-w-md font-sans text-base text-walnut/75 sm:text-lg">
          {finale.closingMessage}
        </motion.p>

        <motion.div variants={staggerItem} className="flex flex-wrap items-center justify-center gap-5">
          {highlightPhotos.map((p, i) => (
            <PhotoCard key={p.src + i} photo={p} rotate={i % 2 === 0 ? -6 : 5} width={160} />
          ))}
        </motion.div>

        <motion.div
          variants={staggerItem}
          className="flex w-full max-w-md flex-col items-center gap-3 rounded-sm border border-dashed border-burgundy/40 bg-white/70 p-6"
        >
          <Gift className="text-burgundy" size={28} />
          <p className="font-hand text-xl text-walnut/80">{finalSurpriseMessage}</p>
        </motion.div>

        <motion.button
          variants={staggerItem}
          onClick={() => goTo("movie")}
          className="mt-2 flex items-center gap-2 rounded-full border border-walnut/20 px-6 py-3 font-sans text-sm font-medium text-walnut/70 hover:bg-walnut/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
        >
          <RotateCcw size={16} /> Revisit our memories
        </motion.button>

        <motion.p variants={staggerItem} className="font-hand text-lg text-walnut/40">
          happy birthday, {siteConfig.herName}. every chapter of this was true.
        </motion.p>
      </motion.div>
    </ScrapbookScene>
  );
}
