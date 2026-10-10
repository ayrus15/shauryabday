"use client";

import { useState } from "react";
import { motion } from "motion/react";
import ScrapbookScene, { SceneHeading } from "@/components/scrapbook/ScrapbookScene";
import { letter } from "@/data/messages";
import { useScene } from "@/lib/sceneContext";
import { lineReveal } from "@/lib/animationVariants";

export default function LoveLetter() {
  const { next } = useScene();
  const [unfolded, setUnfolded] = useState(false);
  const paragraphs = letter.body.split("\n").filter((l) => l.trim().length > 0);

  return (
    <ScrapbookScene bg="bg-cream">
      <SceneHeading eyebrow="Chapter Six" title={letter.heading} />

      <div className="mx-auto max-w-2xl">
        {!unfolded ? (
          <div className="flex flex-col items-center gap-6 py-10">
            <motion.div
              initial={{ scaleY: 0.15 }}
              animate={{ scaleY: 0.15 }}
              className="h-24 w-40 origin-bottom rounded-sm bg-white shadow-md"
            />
            <button
              onClick={() => setUnfolded(true)}
              className="rounded-full bg-burgundy px-7 py-3 font-sans text-sm font-semibold text-cream shadow-md transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
            >
              unfold the letter
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ scaleY: 0.15, opacity: 0.6 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top center" }}
            className="paper-grain relative rounded-sm bg-white px-7 py-10 shadow-xl sm:px-14 sm:py-14"
          >
            <motion.div
              variants={{ visible: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } } }}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  variants={lineReveal}
                  className="font-serif text-lg leading-relaxed text-walnut whitespace-pre-line sm:text-xl"
                >
                  {p}
                </motion.p>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: paragraphs.length * 0.18 + 0.6, duration: 0.6 }}
              className="mt-8 text-right font-hand text-2xl text-walnut/70"
            >
              {letter.signature}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: paragraphs.length * 0.18 + 1, duration: 0.6 }}
              className="mt-10 flex justify-center"
            >
              <button
                onClick={next}
                className="rounded-full bg-forest px-7 py-3 font-sans text-sm font-medium text-cream shadow-md transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                one more thing
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </ScrapbookScene>
  );
}
