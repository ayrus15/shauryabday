"use client";

import { motion } from "motion/react";
import { scenePush } from "@/lib/animationVariants";

type ScrapbookSceneProps = {
  children: React.ReactNode;
  className?: string;
  bg?: string;
};

export default function ScrapbookScene({ children, className = "", bg = "bg-cream" }: ScrapbookSceneProps) {
  return (
    <motion.section
      variants={scenePush}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`paper-grain relative min-h-dvh w-full px-5 pb-28 pt-14 sm:px-10 sm:pt-20 ${bg} ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function WashiTape({
  top,
  left,
  rotate = -4,
  color = "#F6A9BD",
  width = 90,
}: {
  top: string;
  left: string;
  rotate?: number;
  color?: string;
  width?: number;
}) {
  return (
    <span
      className="washi-tape pointer-events-none absolute"
      style={{
        top,
        left,
        width,
        transform: `rotate(${rotate}deg)`,
        background: `repeating-linear-gradient(45deg, ${color}, ${color} 6px, ${color}cc 6px, ${color}cc 12px)`,
      }}
      aria-hidden="true"
    />
  );
}

export function SceneHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-burgundy/70">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl font-bold text-walnut sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 font-hand text-xl text-walnut/60">{subtitle}</p>}
    </div>
  );
}
