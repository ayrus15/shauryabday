"use client";

import { AnimatePresence } from "motion/react";
import { SceneProvider, useScene } from "@/lib/sceneContext";
import { ParallaxProvider } from "@/lib/parallax";
import SoundToggle from "@/components/ui/SoundToggle";
import SceneNavigation from "@/components/ui/SceneNavigation";
import BirthdayInvitation from "@/components/opening/BirthdayInvitation";
import WelcomeEnvelope from "@/components/opening/WelcomeEnvelope";
import MovieDateScene from "@/components/scrapbook/MovieDateScene";
import EthnicDay2025Scene from "@/components/scrapbook/EthnicDay2025Scene";
import FullCircleScene from "@/components/scrapbook/FullCircleScene";
import Nov11Scene from "@/components/scrapbook/Nov11Scene";
import KeepsakeBoardScene from "@/components/game/KeepsakeBoardScene";
import PlaylistScene from "@/components/music/PlaylistScene";
import LoveLetter from "@/components/letter/LoveLetter";
import BirthdayReveal from "@/components/finale/BirthdayReveal";

function SceneRouter() {
  const { sceneId } = useScene();

  return (
    <AnimatePresence mode="wait">
      {sceneId === "invitation" && <BirthdayInvitation key="invitation" />}
      {sceneId === "envelope" && <WelcomeEnvelope key="envelope" />}
      {sceneId === "movie" && <MovieDateScene key="movie" />}
      {sceneId === "ethnic2025" && <EthnicDay2025Scene key="ethnic2025" />}
      {sceneId === "fullcircle" && <FullCircleScene key="fullcircle" />}
      {sceneId === "nov11" && <Nov11Scene key="nov11" />}
      {sceneId === "keepsake" && <KeepsakeBoardScene key="keepsake" />}
      {sceneId === "playlist" && <PlaylistScene key="playlist" />}
      {sceneId === "letter" && <LoveLetter key="letter" />}
      {sceneId === "finale" && <BirthdayReveal key="finale" />}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <ParallaxProvider>
      <SceneProvider>
        <main className="relative">
          <SceneRouter />
          <SceneNavigation />
          <SoundToggle />
        </main>
      </SceneProvider>
    </ParallaxProvider>
  );
}
