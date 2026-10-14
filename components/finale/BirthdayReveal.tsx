"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Gift, PartyPopper, RotateCcw } from "lucide-react";
import ScrapbookScene from "@/components/scrapbook/ScrapbookScene";
import CutoutHeading from "@/components/ui/CutoutHeading";
import {
  StickerField,
  StarSticker,
  SparkleSticker,
  BalloonSticker,
  DiscoBallSticker,
  BuntingBanner,
  PawPrintSticker,
} from "@/components/ui/stickers";
import Confetti from "./Confetti";
import PhotoLightbox from "./PhotoLightbox";
import { finale } from "@/data/messages";
import { finalSurpriseMessage, siteConfig } from "@/data/config";
import type { Photo } from "@/data/memories";
import { useScene } from "@/lib/sceneContext";
import { staggerContainer, staggerItem } from "@/lib/animationVariants";
import { playFanfare, playWhoosh } from "@/lib/sound";

const heroPhoto: Photo = { src: "/photos/happy-birthday.jpg", alt: "Happy birthday, Shaurya" };

export default function BirthdayReveal() {
  const { goTo } = useScene();
  const [confettiKey, setConfettiKey] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(playFanfare, 300);
    return () => clearTimeout(t);
  }, []);

  function replay() {
    playFanfare();
    setConfettiKey((k) => k + 1);
  }

  return (
    <ScrapbookScene
      bg="stripe-bg"
      className="flex min-h-dvh flex-col items-center justify-center overflow-hidden pt-10 text-center"
    >
      <Confetti key={confettiKey} />

      {/* bunting across the top */}
      <div className="absolute inset-x-0 top-0 h-16 w-full opacity-90 sm:h-20">
        <BuntingBanner className="h-full w-[140%] -translate-x-[8%]" />
      </div>

      <StickerField
        stickers={[
          { node: <BalloonSticker color="#D6305C" pattern="stripes" />, left: "2%", bottom: "4%", width: 70, rotate: -6, animation: "bob-slow" },
          { node: <BalloonSticker color="#1F9D6E" pattern="dots" />, left: "9%", bottom: "12%", width: 56, rotate: 4, animation: "bob-slow", delay: 0.6 },
          { node: <BalloonSticker color="#F6A9BD" />, left: "1%", bottom: "20%", width: 46, rotate: -3, animation: "bob-slow", delay: 1.1 },
          { node: <DiscoBallSticker />, right: "4%", top: "8%", width: 72, animation: "spin-slow", opacity: 0.95 },
          { node: <StarSticker color="#D6305C" />, left: "6%", top: "10%", width: 26, animation: "twinkle" },
          { node: <StarSticker color="#1F9D6E" />, right: "14%", top: "30%", width: 20, animation: "twinkle", delay: 0.8 },
          { node: <SparkleSticker color="#F6A9BD" />, left: "16%", top: "22%", width: 22, animation: "twinkle", delay: 1.4 },
          { node: <SparkleSticker color="#D6305C" />, right: "6%", bottom: "30%", width: 24, animation: "twinkle", delay: 0.4 },
          { node: <PawPrintSticker color="#3D2418" />, right: "3%", bottom: "6%", width: 44, rotate: -12, animation: "float-slow", opacity: 0.5 },
        ]}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex max-w-2xl flex-col items-center gap-7 px-4 pt-6"
      >
        <motion.div variants={staggerItem} className="relative">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Open the birthday photo"
            className="polaroid-shadow w-64 rotate-[-2deg] cursor-zoom-in bg-white p-3 pb-6 transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy sm:w-72"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-dusty-rose/40">
              <Image src={heroPhoto.src} alt={heroPhoto.alt} fill sizes="300px" className="object-cover" />
            </div>
          </button>
        </motion.div>

        <motion.div variants={staggerItem} className="flex items-center gap-3">
          <StarSticker color="#1F9D6E" className="h-6 w-6 sm:h-8 sm:w-8" />
          <CutoutHeading text="HAPPY" />
          <StarSticker color="#D6305C" className="h-6 w-6 sm:h-8 sm:w-8" />
        </motion.div>
        <motion.div variants={staggerItem}>
          <CutoutHeading text="BIRTHDAY" />
        </motion.div>
        <motion.p variants={staggerItem} className="font-hand text-3xl text-burgundy sm:text-4xl">
          {siteConfig.herName}.
        </motion.p>

        <motion.p variants={staggerItem} className="max-w-md font-sans text-base text-walnut/75 sm:text-lg">
          {finale.closingMessage}
        </motion.p>

        <motion.div
          variants={staggerItem}
          className="flex w-full max-w-md flex-col items-center gap-3 rounded-sm border border-dashed border-burgundy/40 bg-white/80 p-6"
        >
          <Gift className="text-burgundy" size={28} />
          <p className="font-hand text-xl text-walnut/80">{finalSurpriseMessage}</p>
        </motion.div>

        <motion.div variants={staggerItem} className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              playWhoosh();
              goTo("movie");
            }}
            className="flex items-center gap-2 rounded-full border border-walnut/20 bg-cream/80 px-6 py-3 font-sans text-sm font-medium text-walnut/70 hover:bg-walnut/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
          >
            <RotateCcw size={16} /> Revisit our memories
          </button>
          <button
            onClick={replay}
            className="flex items-center gap-2 rounded-full bg-burgundy px-6 py-3 font-sans text-sm font-medium text-cream shadow-md transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
          >
            <PartyPopper size={16} /> Replay the magic
          </button>
        </motion.div>

        <motion.p variants={staggerItem} className="pb-4 font-hand text-lg text-walnut/40">
          happy birthday, {siteConfig.herName}. every chapter of this was true.
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {lightboxOpen && (
          <PhotoLightbox photos={[heroPhoto]} initialIndex={0} onClose={() => setLightboxOpen(false)} />
        )}
      </AnimatePresence>
    </ScrapbookScene>
  );
}
