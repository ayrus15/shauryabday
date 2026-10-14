"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Disc3, ExternalLink, Music2, Music4 } from "lucide-react";
import ScrapbookScene from "@/components/scrapbook/ScrapbookScene";
import { StickerField, StarSticker, SparkleSticker } from "@/components/ui/stickers";
import { playlist } from "@/data/messages";
import { spotifyPlaylistUrl } from "@/data/config";
import { parseSpotifyUrl } from "@/lib/spotify";
import { useScene } from "@/lib/sceneContext";
import { playClick, playWhoosh } from "@/lib/sound";
import { staggerContainer, staggerItem } from "@/lib/animationVariants";

export default function PlaylistScene() {
  const { next } = useScene();
  const [expanded, setExpanded] = useState(false);
  const parsed = spotifyPlaylistUrl ? parseSpotifyUrl(spotifyPlaylistUrl) : null;
  const hasPlaylist = Boolean(parsed);

  return (
    <ScrapbookScene bg="bg-gradient-to-b from-gold/25 via-cream to-dusty-rose/30" className="min-h-dvh">
      <StickerField
        stickers={[
          { node: <StarSticker color="#FFC43D" />, left: "6%", top: "10%", width: 22, animation: "twinkle" },
          { node: <SparkleSticker color="#D6305C" />, right: "8%", top: "16%", width: 20, animation: "twinkle", delay: 0.6 },
          { node: <StarSticker color="#1F9D6E" />, left: "10%", bottom: "14%", width: 18, animation: "twinkle", delay: 1.1 },
          { node: <SparkleSticker color="#F6A9BD" />, right: "6%", bottom: "20%", width: 22, animation: "twinkle", delay: 0.3 },
        ]}
      />

      <div className="mx-auto mb-8 max-w-2xl text-center">
        <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-burgundy/70">
          {playlist.eyebrow}
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-xl flex-col items-center gap-7 px-4 text-center"
      >
        <motion.div variants={staggerItem} className="relative">
          <motion.div
            className="absolute -right-5 -top-5 z-10 text-burgundy sm:-right-8 sm:-top-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          >
            <Disc3 size={48} />
          </motion.div>
          <div className="polaroid-shadow w-64 rotate-[-2deg] bg-white p-3 pb-7 sm:w-72">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-dusty-rose/40">
              <Image src="/photos/sunflower.jpg" alt="A sunflower at sunset" fill sizes="300px" className="object-cover" />
            </div>
          </div>
        </motion.div>

        <motion.h2
          variants={staggerItem}
          className="font-serif text-2xl font-black tracking-tight text-walnut sm:text-3xl"
        >
          {playlist.title}
        </motion.h2>
        <motion.p variants={staggerItem} className="-mt-4 font-hand text-xl text-walnut/60">
          {playlist.subtitle}
        </motion.p>

        <motion.div variants={staggerItem} className="flex items-center gap-4 text-burgundy/60">
          <Music2 size={18} className="float-slow" />
          <Music4 size={22} className="float-slow" style={{ animationDelay: "0.8s" }} />
          <Music2 size={16} className="float-slow" style={{ animationDelay: "1.4s" }} />
        </motion.div>

        <motion.div variants={staggerItem} className="w-full max-w-sm">
          <button
            type="button"
            onClick={() => {
              playClick();
              setExpanded((e) => !e);
            }}
            aria-expanded={expanded}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-burgundy px-6 py-4 font-sans text-sm font-semibold text-cream shadow-lg transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
          >
            <Disc3 size={18} />
            {playlist.listenLabel}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-2xl border border-walnut/10 bg-white/80 p-3 shadow-md">
                  {hasPlaylist && parsed ? (
                    <iframe
                      title="Spotify playlist"
                      src={`https://open.spotify.com/embed/${parsed.type}/${parsed.id}?utm_source=generator&theme=0`}
                      width="100%"
                      height="352"
                      style={{ borderRadius: 12 }}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-8 text-center">
                      <Music2 className="text-burgundy" size={26} />
                      <p className="font-serif text-base text-walnut">Her playlist is on its way.</p>
                      <p className="text-xs text-walnut/60">A birthday mix is coming soon.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {hasPlaylist && (
            <a
              href={spotifyPlaylistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1.5 font-sans text-sm text-forest hover:underline"
            >
              Open in Spotify <ExternalLink size={14} />
            </a>
          )}
        </motion.div>

        <motion.button
          variants={staggerItem}
          onClick={() => {
            playWhoosh();
            next();
          }}
          className="mt-2 rounded-full border border-walnut/20 bg-cream/80 px-6 py-3 font-sans text-sm font-medium text-walnut/70 hover:bg-walnut/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
        >
          {playlist.continueLabel}
        </motion.button>
      </motion.div>
    </ScrapbookScene>
  );
}
