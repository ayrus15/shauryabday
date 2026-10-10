"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { Photo } from "@/data/memories";

type PhotoCardProps = {
  photo: Photo;
  rotate?: number;
  width?: number;
  className?: string;
};

export default function PhotoCard({ photo, rotate = 0, width = 240, className = "" }: PhotoCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setExpanded(true)}
        initial={{ rotate }}
        whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
        whileFocus={{ scale: 1.04, rotate: 0, zIndex: 10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ width }}
        className={`polaroid-shadow relative shrink-0 cursor-zoom-in rounded-sm bg-white p-3 pb-10 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy ${className}`}
        aria-label={`Open photo: ${photo.alt}`}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-dusty-rose/40">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={`${width}px`}
            className="object-cover"
          />
        </div>
        {photo.caption && (
          <p className="mt-2 truncate font-hand text-lg text-walnut/80">{photo.caption}</p>
        )}
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-walnut/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
            role="dialog"
            aria-modal="true"
            aria-label={photo.alt}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="polaroid-shadow relative max-h-[86vh] w-full max-w-md rounded-sm bg-white p-4 pb-12"
            >
              <button
                onClick={() => setExpanded(false)}
                aria-label="Close photo"
                className="absolute -top-3 -right-3 rounded-full bg-cream p-2 text-walnut shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-burgundy"
              >
                <X size={18} />
              </button>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-dusty-rose/40">
                <Image src={photo.src} alt={photo.alt} fill sizes="400px" className="object-cover" />
              </div>
              {photo.caption && (
                <p className="mt-3 font-hand text-xl text-walnut/80">{photo.caption}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
