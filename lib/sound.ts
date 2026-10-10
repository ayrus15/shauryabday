"use client";

// Lightweight synthesized sound effects via the Web Audio API — no audio
// files to ship or license, just short oscillator/noise envelopes. The
// AudioContext is created lazily on the first call (browsers block audio
// before a user gesture), and everything is silently skipped if enabled
// is false, Web Audio isn't available, or the user prefers reduced motion.

let ctx: AudioContext | null = null;
let enabled = true;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!ctx) ctx = new AudioContextClass();
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

export function setSoundEnabled(value: boolean) {
  enabled = value;
  try {
    localStorage.setItem("sfx-enabled", value ? "1" : "0");
  } catch {
    // ignore — private mode / storage blocked
  }
}

export function getSoundEnabled() {
  return enabled;
}

export function initSoundPreference() {
  try {
    const stored = localStorage.getItem("sfx-enabled");
    if (stored !== null) enabled = stored === "1";
  } catch {
    // ignore
  }
  return enabled;
}

function tone(
  freq: number,
  duration: number,
  {
    type = "sine",
    startGain = 0.08,
    delay = 0,
    glideTo,
  }: { type?: OscillatorType; startGain?: number; delay?: number; glideTo?: number } = {}
) {
  const c = getContext();
  if (!c || !enabled) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + duration);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(startGain, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

function noiseBurst(duration: number, { startGain = 0.06, delay = 0, filterFreq = 1200 }: { startGain?: number; delay?: number; filterFreq?: number } = {}) {
  const c = getContext();
  if (!c || !enabled) return;
  const t0 = c.currentTime + delay;
  const bufferSize = Math.floor(c.sampleRate * duration);
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = c.createBufferSource();
  source.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = filterFreq;
  const gain = c.createGain();
  gain.gain.setValueAtTime(startGain, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(c.destination);
  source.start(t0);
  source.stop(t0 + duration + 0.02);
}

/** Soft UI click — dial nudge, button taps. */
export function playClick() {
  tone(520, 0.06, { type: "triangle", startGain: 0.05 });
}

/** Gentle page-turn / scene-transition whoosh. */
export function playWhoosh() {
  noiseBurst(0.35, { startGain: 0.045, filterFreq: 900 });
}

/** Wax-seal crack when the envelope opens. */
export function playCrack() {
  noiseBurst(0.12, { startGain: 0.09, filterFreq: 2200 });
  tone(180, 0.1, { type: "square", startGain: 0.04, delay: 0.02 });
}

/** String pulled taut — a correct keepsake-board match. */
export function playSnap() {
  tone(880, 0.09, { type: "triangle", startGain: 0.06, glideTo: 1320 });
}

/** Soft negative buzz — a wrong match or wrong combination. */
export function playBuzz() {
  tone(140, 0.18, { type: "sawtooth", startGain: 0.035, glideTo: 90 });
}

/** Lock tumbling open. */
export function playUnlock() {
  tone(300, 0.08, { type: "square", startGain: 0.05 });
  tone(500, 0.1, { type: "square", startGain: 0.05, delay: 0.09 });
  tone(700, 0.18, { type: "triangle", startGain: 0.06, delay: 0.18 });
}

/** Warm two-note chime — positive confirmations, reveals. */
export function playChime() {
  tone(660, 0.35, { type: "sine", startGain: 0.07 });
  tone(990, 0.45, { type: "sine", startGain: 0.05, delay: 0.12 });
}

/** Small celebratory fanfare for the finale. */
export function playFanfare() {
  [523, 659, 784, 1046].forEach((freq, i) => {
    tone(freq, 0.4, { type: "sine", startGain: 0.06, delay: i * 0.1 });
  });
}

/** A single soft clock-tick, used by the November 11 time reel. */
export function playTick() {
  tone(1000, 0.03, { type: "square", startGain: 0.03 });
}
