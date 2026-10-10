"use client";

import { AnimatePresence } from "motion/react";
import { SceneProvider, useScene } from "@/lib/sceneContext";
import SpotifyPlayer from "@/components/music/SpotifyPlayer";
import SceneNavigation from "@/components/ui/SceneNavigation";
import BirthdayInvitation from "@/components/opening/BirthdayInvitation";
import WelcomeEnvelope from "@/components/opening/WelcomeEnvelope";
import MovieDateScene from "@/components/scrapbook/MovieDateScene";
import EthnicDay2025Scene from "@/components/scrapbook/EthnicDay2025Scene";
import LabMemoriesScene from "@/components/scrapbook/LabMemoriesScene";
import FullCircleScene from "@/components/scrapbook/FullCircleScene";
import Nov11Scene from "@/components/scrapbook/Nov11Scene";
import MemoryQuiz from "@/components/game/MemoryQuiz";
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
      {sceneId === "lab" && <LabMemoriesScene key="lab" />}
      {sceneId === "fullcircle" && <FullCircleScene key="fullcircle" />}
      {sceneId === "nov11" && <Nov11Scene key="nov11" />}
      {sceneId === "quiz" && <MemoryQuiz key="quiz" />}
      {sceneId === "letter" && <LoveLetter key="letter" />}
      {sceneId === "finale" && <BirthdayReveal key="finale" />}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <SceneProvider>
      <main className="relative">
        <SceneRouter />
        <SceneNavigation />
        <SpotifyPlayer />
      </main>
    </SceneProvider>
  );
}
