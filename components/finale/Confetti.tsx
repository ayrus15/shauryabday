"use client";

import { motion } from "motion/react";

const colors = ["#D6305C", "#F6A9BD", "#1F9D6E", "#E3D2FF", "#FFF3DD"];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

const pieces = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: randomBetween(2, 98),
  delay: randomBetween(0, 0.6),
  duration: randomBetween(2.4, 3.6),
  rotate: randomBetween(-180, 180),
  color: colors[i % colors.length],
  size: randomBetween(6, 11),
}));

export default function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: -40, x: 0, opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size * 0.5,
            background: p.color,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}
