import { useEffect, useState, useRef } from "react";
import { PremiumBadge } from "../shared/PremiumBadge";

export default function CallScreen({ open, onEnd }) {
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (open) {
      setElapsed(0);
      intervalRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [open]);

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(79,142,247,0.15)_0%,_rgba(13,15,20,0.98)_70%)]" />

      <div className="relative z-10 flex flex-col items-center flex-1 pt-14 pb-10 px-6 gap-6">
        {/* Partner Avatar with pulse rings */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-36 h-36 rounded-full bg-accent/15 pulse-ring" />
          <div className="absolute w-28 h-28 rounded-full bg-accent/20 pulse-ring-delay" />
          <div className="w-24 h-24 bg-[linear-gradient(135deg,#f97316,#ef4444)] rounded-full flex items-center justify-center font-bold text-white text-4xl shadow-[0_0_32px_rgba(249,115,22,0.4)]">
            A
          </div>
        </div>

        {/* Partner Info */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-syne font-bold text-2xl text-white">Asilbek</h2>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="bg-accent/20 border border-accent/30 text-accent text-xs font-semibold px-3 py-1 rounded-full">
              Upper Intermediate
            </span>
            <PremiumBadge />
          </div>
          <span className="text-slate-400 text-xs font-medium mt-1 bg-card-raised px-3 py-1 rounded-full border border-subtle">
            🎙️ Examiner
          </span>
        </div>

        {/* Timer */}
        <div className="font-syne font-black text-5xl text-accent drop-shadow-[0_0_16px_rgba(79,142,247,0.5)]">
          {fmt(elapsed)}
        </div>

        {/* Topic Card */}
        <div className="w-full bg-card card-border rounded-xl2 p-4 text-center">
          <p className="text-muted text-xs font-medium uppercase tracking-wider mb-1">Today's Topic</p>
          <p className="text-white font-semibold text-sm leading-snug">
            "Do you like visiting museums?"
          </p>
        </div>

        {/* Part Tiles */}
        <div className="flex gap-2.5 w-full">
          {/* Part 1 — Active */}
          <div className="flex-1 bg-green/10 border border-green/40 rounded-xl2 py-3 flex flex-col items-center gap-0.5 shadow-[0_0_12px_rgba(34,197,94,0.2)]">
            <span className="font-syne font-bold text-green text-sm">Part 1</span>
            <span className="text-green/70 text-[10px]">Intro</span>
          </div>
          {/* Part 2 */}
          <div className="flex-1 bg-accent/10 border border-accent/30 rounded-xl2 py-3 flex flex-col items-center gap-0.5">
            <span className="font-syne font-bold text-accent text-sm">Part 2</span>
            <span className="text-accent/60 text-[10px]">Cue Card</span>
          </div>
          {/* Part 3 */}
          <div className="flex-1 bg-orange/10 border border-orange/30 rounded-xl2 py-3 flex flex-col items-center gap-0.5">
            <span className="font-syne font-bold text-orange text-sm">Part 3</span>
            <span className="text-orange/60 text-[10px]">⭐ Discuss</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mt-auto w-full">
          <button
            onClick={() => setMuted((m) => !m)}
            className={`flex-1 flex flex-col items-center gap-1.5 py-4 rounded-xl2 border transition-all duration-200 active:scale-95 ${
              muted
                ? "bg-red/10 border-red/40 text-red"
                : "bg-card-raised border-subtle text-slate-300"
            }`}
          >
            <span className="text-xl">{muted ? "🔇" : "🎙️"}</span>
            <span className="text-xs font-medium">{muted ? "Unmute" : "Mute"}</span>
          </button>

          <button
            onClick={onEnd}
            className="flex-1 flex flex-col items-center gap-1.5 py-4 rounded-xl2 bg-red/15 border border-red/40 text-red active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
          >
            <span className="text-xl">📵</span>
            <span className="text-xs font-medium">End Call</span>
          </button>
        </div>
      </div>
    </div>
  );
}
