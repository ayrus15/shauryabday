"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getSoundEnabled, initSoundPreference, playClick, setSoundEnabled } from "@/lib/sound";

export default function SoundToggle() {
  const [on, setOn] = useState(() => initSoundPreference());

  function toggle() {
    const next = !getSoundEnabled();
    setSoundEnabled(next);
    setOn(next);
    if (next) playClick();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={on ? "Mute sound effects" : "Unmute sound effects"}
      aria-pressed={on}
      className="fixed bottom-20 left-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-walnut/80 text-cream shadow-lg backdrop-blur transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
    >
      {on ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}
