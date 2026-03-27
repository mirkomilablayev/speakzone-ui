import { useEffect, useState, useRef } from "react";
import { PremiumBadge } from "../shared/PremiumBadge";
import { MicIcon, MicMuteIcon, EndCallIcon } from "../shared/Icons";

const PARTS = [
  { label: "Part 1", sub: "Intro",     color: "text-green-400",  border: "border-green-500/40",  bg: "bg-green-500/10",  glow: "shadow-[0_0_12px_rgba(34,197,94,0.25)]"  },
  { label: "Part 2", sub: "Cue Card",  color: "text-accent",     border: "border-accent/40",     bg: "bg-accent/10",     glow: ""  },
  { label: "Part 3", sub: "Discuss",   color: "text-orange-400", border: "border-orange-400/40", bg: "bg-orange-400/10", glow: ""  },
];

export default function CallScreen({ open, onEnd }) {
  const [elapsed, setElapsed] = useState(0);
  const [muted,   setMuted]   = useState(false);
  const [activePart, setActivePart] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (open) {
      setElapsed(0);
      setMuted(false);
      setActivePart(0);
      timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [open]);

  if (!open) return null;

  const fmt = s =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-50 bg-bg flex flex-col" style={{ maxWidth: 430, margin: "0 auto" }}>

      {/* ── Background radial glow ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 35% at 50% 0%, rgba(79,142,247,0.12) 0%, transparent 70%)" }} />

      {/* ── 1. TOP BAR ── */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-5 pb-3">
        <span className="text-white/60 text-sm font-medium">
          {PARTS[activePart].label} · {PARTS[activePart].sub}
        </span>
        <span className="font-mono text-accent font-bold text-sm bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
          {fmt(elapsed)}
        </span>
      </div>

      {/* ── 2. CENTER: Avatar + Name ── */}
      <div className="relative z-10 flex flex-col items-center pt-6 pb-4">
        {/* Pulse rings */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-28 h-28 rounded-full bg-orange-500/10 pulse-ring" />
          <div className="absolute w-24 h-24 rounded-full bg-orange-500/15 pulse-ring-delay" />
          {/* Avatar 80px */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-white text-3xl flex-shrink-0
            shadow-[0_0_24px_rgba(249,115,22,0.3)]"
            style={{ background: "linear-gradient(135deg,#f97316,#ef4444)" }}>
            A
          </div>
        </div>

        {/* Name */}
        <div className="flex items-center gap-2 mt-4 mb-2">
          <h2 className="font-syne font-bold text-white" style={{ fontSize: 20 }}>Asilbek</h2>
          <PremiumBadge size={16} />
        </div>

        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="bg-accent/15 border border-accent/30 text-accent text-xs font-semibold px-3 py-1 rounded-full">
            Upper Intermediate
          </span>
        </div>

        {/* ── 3. Role badge ── */}
        <div className="mt-3 bg-card border border-subtle rounded-full px-4 py-1.5 flex items-center gap-1.5">
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
          </svg>
          <span className="text-slate-300 text-xs font-medium">Examiner</span>
        </div>
      </div>

      {/* ── 4. TOPIC CARD ── */}
      <div className="relative z-10 mx-4">
        <div className="bg-card card-border rounded-xl2 px-4 py-3 text-center">
          <p className="text-muted text-[10px] font-semibold uppercase tracking-widest mb-1.5">Today's Topic</p>
          <p className="text-white font-semibold text-sm leading-snug">
            "Do you like visiting museums?"
          </p>
        </div>
      </div>

      {/* ── 5. PART TABS ── */}
      <div className="relative z-10 flex gap-2 mx-4 mt-3">
        {PARTS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setActivePart(i)}
            className={`flex-1 flex flex-col items-center py-2.5 rounded-xl border transition-all duration-200
              ${activePart === i
                ? `${p.bg} ${p.border} ${p.glow}`
                : "bg-card-raised border-subtle"
              }`}
          >
            <span className={`font-syne font-bold text-xs ${activePart === i ? p.color : "text-muted"}`}>
              {p.label}
            </span>
            <span className={`text-[10px] mt-0.5 ${activePart === i ? p.color + "/70" : "text-muted/60"}`}>
              {p.sub}
            </span>
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* ── 6. BOTTOM CONTROLS ── */}
      <div className="relative z-10 flex gap-3 px-4 pb-8 pt-3">
        <button
          onClick={() => setMuted(m => !m)}
          className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl2 border font-semibold text-sm
            transition-all duration-200 active:scale-95
            ${muted
              ? "bg-red/10 border-red/40 text-red"
              : "bg-card-raised border-subtle text-slate-200"
            }`}
        >
          {muted ? <MicMuteIcon size={18} /> : <MicIcon size={18} />}
          {muted ? "Unmute" : "Mute"}
        </button>

        <button
          onClick={onEnd}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl2
            bg-red text-white font-semibold text-sm active:scale-95 transition-all duration-200
            shadow-[0_4px_20px_rgba(239,68,68,0.3)]"
        >
          <EndCallIcon size={18} />
          End Call
        </button>
      </div>
    </div>
  );
}
