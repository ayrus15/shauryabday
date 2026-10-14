export function parseSpotifyUrl(url: string): { type: string; id: string } | null {
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
