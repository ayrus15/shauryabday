"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import Character from "./Character";
import FloatingDecor from "./FloatingDecor";
import { invitation } from "@/data/messages";
import { siteConfig } from "@/data/config";
import { useScene } from "@/lib/sceneContext";

export default function BirthdayInvitation() {
  const { next } = useScene();
  const [noClicks, setNoClicks] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const [leaving, setLeaving] = useState(false);

  const noMessage =
    invitation.noResponses[Math.min(noClicks, invitation.noResponses.length - 1)];
  const yesScale = 1 + Math.min(noClicks, 5) * 0.045;
  const noScale = Math.max(1 - Math.min(noClicks, 5) * 0.06, 0.72);

  function handleNo() {
    setNoClicks((c) => c + 1);
  }

  function handleYes() {
    const burst = Array.from({ length: 6 }, (_, i) => ({ id: Date.now() + i, x: (i - 2.5) * 18 }));
    setHearts(burst);
    setLeaving(true);
    setTimeout(next, 650);
  }

  return (
    <motion.section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-lavender px-6 py-16 text-center"
      animate={leaving ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      aria-label="Birthday invitation"
    >
      <FloatingDecor />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="float-slow relative z-10"
      >
        <Character className="h-40 w-40 sm:h-52 sm:w-52" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="relative z-10 mt-6 font-serif text-3xl font-semibold text-walnut sm:text-4xl"
      >
        {invitation.greeting}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="relative z-10 mt-3 max-w-sm font-sans text-base text-walnut/70 sm:text-lg"
      >
        {invitation.subline}
      </motion.p>

      <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-5">
        <div className="relative">
          <AnimatePresence>
            {hearts.map((h) => (
              <motion.span
                key={h.id}
                className="pointer-events-none absolute left-1/2 top-0 text-burgundy"
                style={{ marginLeft: h.x }}
                initial={{ opacity: 0, y: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0], y: -70, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <Heart size={20} fill="currentColor" />
              </motion.span>
            ))}
          </AnimatePresence>
          <motion.button
            type="button"
            onClick={handleYes}
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.05 }}
            whileTap={{ scale: yesScale * 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="rounded-full bg-burgundy px-8 py-4 font-sans text-base font-semibold text-cream shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy sm:text-lg"
          >
            {invitation.yesLabel}
          </motion.button>
        </div>

        <motion.button
          type="button"
          onClick={handleNo}
          animate={{ scale: noScale, rotate: noClicks % 2 === 0 ? -1.5 : 1.5 }}
          whileHover={{ scale: noScale * 1.03 }}
          whileTap={{ scale: noScale * 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="rounded-full border-2 border-walnut/25 px-8 py-4 font-sans text-base font-medium text-walnut/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-walnut sm:text-lg"
        >
          {noClicks === 0 ? invitation.noLabel : noMessage}
        </motion.button>
      </div>

      <p className="relative z-10 mt-12 font-hand text-xl text-walnut/50">
        for {siteConfig.herName}, from me
      </p>
    </motion.section>
  );
}
