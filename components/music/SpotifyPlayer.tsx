"use client";

import { useState } from "react";
import { Music2, ExternalLink, ChevronUp } from "lucide-react";
import { spotifyPlaylistUrl } from "@/data/config";

function parsePlaylistId(url: string): { type: string; id: string } | null {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("spotify.com")) return null;
    const parts = u.pathname.split("/").filter(Boolean);
    // e.g. /playlist/<id> or /track/<id> or /album/<id>
    if (parts.length >= 2) {
      return { type: parts[0], id: parts[1] };
    }
    return null;
  } catch {
    return null;
  }
}

export default function SpotifyPlayer() {
  const [open, setOpen] = useState(false);
  const parsed = spotifyPlaylistUrl ? parsePlaylistId(spotifyPlaylistUrl) : null;
  const hasPlaylist = Boolean(parsed);

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="w-[320px] max-w-[88vw] rounded-2xl border border-walnut/15 bg-cream/95 p-3 shadow-2xl backdrop-blur">
          {hasPlaylist && parsed ? (
            <>
              <iframe
                title="Spotify playlist"
                src={`https://open.spotify.com/embed/${parsed.type}/${parsed.id}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                style={{ borderRadius: 12 }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
              <a
                href={spotifyPlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-1.5 rounded-lg border border-forest/30 py-2 text-sm font-medium text-forest hover:bg-forest/5"
              >
                Open in Spotify <ExternalLink size={14} />
              </a>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 py-6 text-center">
              <Music2 className="text-burgundy" size={28} />
              <p className="font-serif text-base text-walnut">
                Her playlist is on its way.
              </p>
              <p className="text-xs text-walnut/60">
                A birthday mix is coming soon — check back here.
              </p>
            </div>
          )}
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close music player" : "Open music player"}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full bg-burgundy px-4 py-3 text-cream shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
      >
        {open ? <ChevronUp size={18} /> : <Music2 size={18} />}
        <span className="hidden text-sm font-medium sm:inline">
          {hasPlaylist ? "Her playlist" : "Music"}
        </span>
      </button>
    </div>
  );
}
