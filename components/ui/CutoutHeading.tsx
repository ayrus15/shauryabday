"use client";

import { motion } from "motion/react";

// Magazine-cutout style lettering — each letter gets its own tile, color,
// and tilt, like letters clipped from different pages and taped down.

const tileStyles = [
  { bg: "#D6305C", fg: "#FFF3DD" },
  { bg: "#FFF3DD", fg: "#3D2418" },
  { bg: "#1F9D6E", fg: "#E3D2FF" },
  { bg: "#3D2418", fg: "#FFF3DD" },
  { bg: "#F6A9BD", fg: "#3D2418" },
  { bg: "#E3D2FF", fg: "#D6305C" },
];

const tilts = [-8, 5, -3, 7, -6, 4, -4, 8, -7, 3, -5, 6];

function Letter({ char, index }: { char: string; index: number }) {
  if (char === " ") return <span className="inline-block w-3 sm:w-5" />;
  const style = tileStyles[index % tileStyles.length];
  const rotate = tilts[index % tilts.length];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.4, rotate: rotate * 2 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.045, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ rotate: 0, scale: 1.08 }}
      className="inline-flex items-center justify-center rounded-[3px] px-2 py-1 font-serif text-2xl font-black shadow-[0_3px_6px_rgba(53,37,31,0.35)] sm:px-3 sm:py-1.5 sm:text-4xl"
      style={{ background: style.bg, color: style.fg }}
    >
      {char}
    </motion.span>
  );
}

export default function CutoutHeading({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 ${className}`}>
      {text.split("").map((char, i) => (
        <Letter key={`${char}-${i}`} char={char} index={i} />
      ))}
    </div>
  );
}
