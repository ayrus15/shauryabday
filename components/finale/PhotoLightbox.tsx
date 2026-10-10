"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/data/memories";
import { playClick } from "@/lib/sound";

type PhotoLightboxProps = {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
};

const SWIPE_THRESHOLD = 60;

export default function PhotoLightbox({ photos, initialIndex, onClose }: PhotoLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const photo = photos[index];

  function go(delta: number) {
    playClick();
    setIndex((i) => (i + delta + photos.length) % photos.length);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
  }

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-walnut/85 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.alt} — photo ${index + 1} of ${photos.length}`}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      tabIndex={-1}
    >
      <button
        onClick={onClose}
        aria-label="Close photo"
        className="absolute right-4 top-4 z-10 rounded-full bg-cream p-2 text-walnut shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-burgundy"
      >
        <X size={20} />
      </button>

      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-cream/90 p-2 text-walnut shadow-md hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-burgundy sm:left-6"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={photo.src + index}
          initial={{ opacity: 0, scale: 0.9, rotate: index % 2 === 0 ? -3 : 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          drag={photos.length > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={handleDragEnd}
          onClick={(e) => e.stopPropagation()}
          className="polaroid-shadow relative max-h-[80vh] w-full max-w-md cursor-grab rounded-sm bg-white p-4 pb-12 active:cursor-grabbing"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-dusty-rose/40">
            <Image src={photo.src} alt={photo.alt} fill sizes="420px" className="object-cover" draggable={false} />
          </div>
          {photo.caption && <p className="mt-3 font-hand text-xl text-walnut/80">{photo.caption}</p>}
          {photos.length > 1 && (
            <p className="absolute bottom-3 right-4 font-sans text-xs text-walnut/40">
              {index + 1} / {photos.length}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-cream/90 p-2 text-walnut shadow-md hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-burgundy sm:right-6"
        >
          <ChevronRight size={22} />
        </button>
      )}
    </motion.div>
  );
}
