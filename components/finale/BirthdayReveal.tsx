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
  PartyHatSticker,
  DiscoBallSticker,
  BuntingBanner,
  PawPrintSticker,
} from "@/components/ui/stickers";
import Confetti from "./Confetti";
import PhotoLightbox from "./PhotoLightbox";
import { finale } from "@/data/messages";
import { finalSurpriseMessage, siteConfig } from "@/data/config";
import { moviePhotos, ethnicDay2025Photos, labPhotos, nov11 } from "@/data/memories";
import { useScene } from "@/lib/sceneContext";
import { staggerContainer, staggerItem } from "@/lib/animationVariants";
import { playFanfare, playWhoosh } from "@/lib/sound";

const allPhotos = [nov11.photo, moviePhotos[0], ethnicDay2025Photos[0], labPhotos[0]].filter(Boolean);
const highlightPhotos = allPhotos.slice(1);

export default function BirthdayReveal() {
  const { goTo } = useScene();
  const [confettiKey, setConfettiKey] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
      className="flex min-h-screen flex-col items-center justify-center overflow-hidden pt-10 text-center"
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
        {nov11.photo && (
          <motion.div variants={staggerItem} className="relative">
            <motion.div
              className="absolute -left-6 -top-7 z-10 w-14 sm:-left-10 sm:-top-10 sm:w-20"
              initial={{ opacity: 0, rotate: -40, scale: 0.6 }}
              animate={{ opacity: 1, rotate: -18, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <PartyHatSticker />
            </motion.div>
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              aria-label={`Open photo gallery, starting with ${nov11.photo.alt}`}
              className="polaroid-shadow w-56 rotate-[-2deg] cursor-zoom-in bg-white p-3 pb-6 transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy sm:w-64"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-dusty-rose/40">
                <Image src={nov11.photo.src} alt={nov11.photo.alt} fill sizes="260px" className="object-cover" />
              </div>
            </button>
          </motion.div>
        )}

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

        <motion.div variants={staggerItem} className="flex flex-wrap items-center justify-center gap-5">
          {highlightPhotos.map((p, i) => (
            <button
              key={p.src + i}
              type="button"
              onClick={() => setLightboxIndex(i + 1)}
              aria-label={`Open photo gallery: ${p.alt}`}
              style={{ rotate: `${i % 2 === 0 ? -6 : 5}deg` }}
              className="polaroid-shadow w-[150px] cursor-zoom-in bg-white p-3 pb-9 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-dusty-rose/40">
                <Image src={p.src} alt={p.alt} fill sizes="150px" className="object-cover" />
              </div>
              {p.caption && <p className="mt-2 truncate font-hand text-lg text-walnut/80">{p.caption}</p>}
            </button>
          ))}
        </motion.div>

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
        {lightboxIndex !== null && (
          <PhotoLightbox photos={allPhotos} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </ScrapbookScene>
  );
}
