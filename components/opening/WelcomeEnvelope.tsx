"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { envelope } from "@/data/messages";
import { siteConfig } from "@/data/config";
import { useScene } from "@/lib/sceneContext";
import { lineReveal } from "@/lib/animationVariants";
import { StickerField, StarSticker, SparkleSticker, HeartSticker } from "@/components/ui/stickers";
import { playCrack, playWhoosh } from "@/lib/sound";

type Stage = "closed" | "opening" | "letter";

export default function WelcomeEnvelope() {
  const { next } = useScene();
  const [stage, setStage] = useState<Stage>("closed");

  const lines = envelope.revealMessage.split(". ").map((s, i, arr) => (i < arr.length - 1 ? s + "." : s));

  return (
    <motion.section
      initial={{ backgroundColor: "#E3D2FF" }}
      animate={{ backgroundColor: stage === "closed" ? "#E3D2FF" : "#FFF3DD" }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
      aria-label="Opening the scrapbook"
    >
      <div className="vignette absolute inset-0" />
      <StickerField
        stickers={[
          { node: <StarSticker color="#D6305C" />, left: "8%", top: "14%", width: 20, animation: "twinkle" },
          { node: <SparkleSticker color="#1F9D6E" />, right: "10%", top: "20%", width: 18, animation: "twinkle", delay: 0.8 },
          { node: <HeartSticker color="#F6A9BD" />, left: "14%", bottom: "16%", width: 18, animation: "float-slow", delay: 1.2 },
        ]}
      />

      <AnimatePresence mode="wait">
        {stage !== "letter" && (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
            className="relative z-10 flex flex-col items-center"
          >
            <p className="mb-6 font-hand text-2xl text-walnut/70">
              {envelope.openPrompt}
            </p>
            <button
              type="button"
              aria-label={`Open the envelope addressed to ${envelope.addressedTo}`}
              onClick={() => {
                if (stage === "closed") {
                  playCrack();
                  setStage("opening");
                  setTimeout(() => setStage("letter"), 1000);
                }
              }}
              className="group relative h-[220px] w-[300px] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy sm:h-[260px] sm:w-[360px]"
            >
              {/* envelope body */}
              <div className="absolute inset-0 rounded-sm bg-[#EDE0CC] shadow-xl" />
              <div className="absolute inset-0 rounded-sm border border-walnut/20" />
              {/* bottom flap shading */}
              <svg
                viewBox="0 0 360 260"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <polygon points="0,0 180,140 360,0" fill="#E2D2B8" />
                <polygon points="0,260 180,130 0,40" fill="#DAC7A8" />
                <polygon points="360,260 180,130 360,40" fill="#DAC7A8" />
              </svg>
              {/* top flap that opens */}
              <motion.div
                className="absolute inset-x-0 top-0 origin-top"
                style={{ height: "55%" }}
                animate={
                  stage === "opening"
                    ? { rotateX: 180, zIndex: 20 }
                    : { rotateX: 0, zIndex: 20 }
                }
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 360 143" className="h-full w-full" preserveAspectRatio="none">
                  <polygon points="0,0 360,0 180,140" fill="#EDE0CC" stroke="#3D2418" strokeOpacity="0.15" />
                </svg>
              </motion.div>

              <p className="absolute bottom-7 left-0 right-0 z-10 font-hand text-2xl text-walnut/70">
                {envelope.addressedTo}
              </p>

              {/* wax seal */}
              <motion.div
                animate={stage === "opening" ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute left-1/2 top-1/2 z-30 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-burgundy shadow-md"
              >
                <span className="font-serif text-xl text-cream">S</span>
              </motion.div>
            </button>
          </motion.div>
        )}

        {stage === "letter" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scaleY: 0.3, y: -40 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top center" }}
            className="paper-grain relative z-10 w-full max-w-lg rounded-sm bg-white px-8 py-12 shadow-2xl sm:px-12"
          >
            <motion.div
              variants={{ visible: { transition: { staggerChildren: 0.35, delayChildren: 0.2 } } }}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  variants={lineReveal}
                  className="font-serif text-lg leading-relaxed text-walnut sm:text-xl"
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>

            <motion.button
              type="button"
              onClick={() => {
                playWhoosh();
                next();
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: lines.length * 0.35 + 0.6, duration: 0.5 }}
              className="mt-10 rounded-full bg-forest px-7 py-3 font-sans text-sm font-medium text-cream shadow-md transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              {envelope.continueLabel}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="relative z-10 mt-8 font-hand text-lg text-walnut/40">
        for {siteConfig.fullName}
      </p>
    </motion.section>
  );
}
