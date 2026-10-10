"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import ScrapbookScene from "./ScrapbookScene";
import { StickerField, StarSticker, SparkleSticker } from "@/components/ui/stickers";
import { nov11 } from "@/data/memories";
import { useScene } from "@/lib/sceneContext";

export default function Nov11Scene() {
  const { next } = useScene();
  const [revealed, setRevealed] = useState(false);

  return (
    <ScrapbookScene bg="bg-walnut" className="film-grain flex min-h-screen flex-col items-center justify-center text-center">
      <div className="vignette absolute inset-0" />
      <StickerField
        stickers={[
          { node: <StarSticker color="#FFF3DD" />, left: "10%", top: "14%", width: 14, animation: "twinkle" },
          { node: <SparkleSticker color="#F6A9BD" />, right: "12%", top: "22%", width: 16, animation: "twinkle", delay: 0.9 },
          { node: <StarSticker color="#F6A9BD" />, left: "18%", bottom: "18%", width: 10, animation: "twinkle", delay: 1.6 },
          { node: <SparkleSticker color="#FFF3DD" />, right: "18%", bottom: "26%", width: 12, animation: "twinkle", delay: 0.4 },
        ]}
      />

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="seal"
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1.2 }}
              className="font-mono text-sm uppercase tracking-[0.3em] text-dusty-rose"
            >
              a moment, sealed
            </motion.p>

            <motion.button
              type="button"
              onClick={() => setRevealed(true)}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05 }}
              className="flex h-28 w-28 items-center justify-center rounded-full bg-burgundy text-cream shadow-[0_0_55px_rgba(214,48,92,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
              aria-label="Open the sealed memory"
            >
              <span className="font-serif text-lg">open</span>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-hand text-xl text-cream/60"
            >
              tap, whenever you&apos;re ready
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial="hidden"
            animate="visible"
            className="relative z-10 flex max-w-lg flex-col items-center gap-6 px-4"
          >
            <motion.h2
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.05em" }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="font-serif text-4xl font-bold text-cream sm:text-5xl"
            >
              {nov11.heading}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="font-mono text-2xl tracking-widest text-dusty-rose sm:text-3xl"
            >
              {nov11.time}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="font-serif text-xl italic text-cream/90 sm:text-2xl"
            >
              {nov11.line}
            </motion.p>

            {nov11.photo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="polaroid-shadow mt-2 w-48 rotate-1 bg-white p-3 pb-6"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-dusty-rose/40">
                  <Image src={nov11.photo.src} alt={nov11.photo.alt} fill sizes="200px" className="object-cover" />
                </div>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 3.1 }}
              className="mt-2 max-w-sm font-sans text-sm text-cream/60"
            >
              {nov11.message}
            </motion.p>

            <motion.button
              type="button"
              onClick={next}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 3.8 }}
              className="mt-4 rounded-full border border-cream/30 px-6 py-2.5 font-sans text-sm text-cream/80 transition-colors hover:bg-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              keep going
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </ScrapbookScene>
  );
}
