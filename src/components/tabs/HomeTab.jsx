import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";

// Band trend mini chart — 7 day curve
const CHART_PTS = [
  { d:"M", x:0,   y:42, score:"6.0" },
  { d:"T", x:46,  y:42, score:"6.0" },
  { d:"W", x:93,  y:30, score:"6.5" },
  { d:"T", x:140, y:28, score:"6.5" },
  { d:"F", x:186, y:18, score:"7.0" },
  { d:"S", x:233, y:12, score:"7.0" },
  { d:"S", x:280, y:6,  score:"7.5" },
];
const LINE = "M 0,42 C 23,42 23,42 46,42 C 70,42 70,30 93,30 C 117,30 117,28 140,28 C 163,28 163,18 186,18 C 210,18 210,12 233,12 C 256,12 256,6 280,6";
const AREA = LINE + " L 280,52 L 0,52 Z";

const hour = new Date().getHours();
const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

export default function HomeTab({ onStartSession, onOpenProfile, onOpenVocab, onStartSpeak, onGetPremium }) {
  const { name, initial, streak, currentBand, isPremium } = useUserStore();
  
  // Local dismiss states for banners
  const [showContinue, setShowContinue] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(!isPremium);
  
  // Hardcoded for demo
  const vocabDueCount = 12;

  return (
    <div className="flex flex-col gap-4 pb-24 animate-tab-in">

      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between pt-2">
        <button onClick={onOpenProfile} className="flex flex-col" aria-label="Open profile">
          <span className="text-teal font-bold text-[11px] uppercase tracking-[0.25em] leading-none">SpeakZone</span>
          <span className="text-white font-black text-xl leading-tight tracking-tight">
            Speak<span className="text-teal">AI</span>
          </span>
        </button>
        <button aria-label="Notifications"
          className="relative w-10 h-10 rounded-xl bg-surface border border-white/5 flex items-center justify-center text-muted active:scale-90 transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          {streak > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber rounded-full flex items-center justify-center text-[8px] leading-none">🔥</span>
          )}
        </button>
      </div>

      {/* ── GREETING ── */}
      <div className="flex flex-col gap-0.5 px-0.5">
        <p className="text-muted text-[13px] font-medium">{greeting},</p>
        <h1 className="text-white font-black text-[26px] leading-tight tracking-tight">{name} 👋</h1>
      </div>

      {/* ── BAND SCORE BADGE ── */}
      <div className="bg-surface border border-teal/20 rounded-2xl p-5 flex items-center gap-4 shadow-teal-glow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-muted text-[9px] font-bold uppercase tracking-widest">Estimated Band</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-teal font-black text-[44px] leading-none">{currentBand}</span>
            <span className="text-muted text-sm font-semibold">/&nbsp;9.0</span>
          </div>
        </div>
        <div className="ml-auto flex flex-col items-end gap-2">
          <div className="flex items-center gap-1 bg-green/10 border border-green/25 rounded-full px-2.5 py-1">
            <span className="text-green text-[10px] font-bold tracking-wide">↑ Improving</span>
          </div>
          <span className="text-muted text-[11px]">Target: 7.5</span>
        </div>
      </div>

      {/* ── PRIMARY CTA ── */}
      <button onClick={onStartSpeak}
        className="w-full bg-teal text-black font-bold py-4 rounded-xl text-[15px] tracking-wide shadow-teal-glow active:scale-[0.98] transition-all flex items-center justify-center gap-2.5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 11c0 3.866 3.134 7 7 7s7-3.134 7-7"/><path d="M12 18v4M9 22h6"/>
        </svg>
        Practice Random Topic
      </button>

      {/* ── SECONDARY CTA ── */}
      <button onClick={onStartSession}
        className="w-full border border-teal/35 text-teal bg-teal/5 font-semibold py-3.5 rounded-xl text-[14px] tracking-wide active:scale-[0.98] transition-all flex items-center justify-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/>
        </svg>
        Start Full Mock Test
      </button>

      {/* ── CONTINUE BANNER ── */}
      {showContinue && (
        <div className="bg-surface rounded-2xl p-4 flex items-center justify-between shadow-sm amber-edge relative animate-fade-in -mt-1">
          <button onClick={() => setShowContinue(false)} className="absolute top-2 right-2 text-muted p-1 active:scale-90" aria-label="Dismiss">✕</button>
          <div className="flex flex-col gap-0.5">
            <span className="text-white font-bold text-[14px]">Resume Mock Test #4</span>
            <span className="text-amber text-[11px] font-semibold">Part 2 unfinished</span>
          </div>
          <button onClick={onStartSession} className="bg-amber/10 text-amber font-bold text-[12px] px-4 py-2 rounded-lg border border-amber/20 active:scale-95 transition-all mr-6">
            Continue →
          </button>
        </div>
      )}

      {/* ── STATS ROW ── */}
      <div className="grid grid-cols-2 gap-3 mt-1">
        <div className="bg-surface rounded-2xl p-4 flex flex-col gap-2">
          <span className="text-amber text-2xl leading-none">🔥</span>
          <span className="text-white font-black text-2xl leading-none">{streak}</span>
          <span className="text-muted text-[11px] font-medium">Day Streak</span>
        </div>
        <div className="bg-surface rounded-2xl p-4 flex flex-col gap-2">
          <span className="text-teal text-[10px] font-bold uppercase tracking-wider">Daily Goal</span>
          <span className="text-white font-black text-2xl leading-none">2 / 3</span>
          <div className="w-full h-1.5 bg-hint rounded-full overflow-hidden mt-0.5">
            <div className="h-full bg-teal rounded-full" style={{ width: "66%" }} />
          </div>
        </div>
      </div>

      {/* ── BAND TREND CHART ── */}
      <div className="bg-surface rounded-2xl p-5 flex flex-col gap-3">
        <span className="text-white font-semibold text-[13px]">Band Progress</span>
        <svg viewBox="0 0 280 60" className="w-full h-14 overflow-visible">
          <defs>
            <linearGradient id="tealFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00c9b1" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#00c9b1" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d={AREA} fill="url(#tealFill)"/>
          <path d={LINE} fill="none" stroke="#00c9b1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          {CHART_PTS.map(({ x, y, score, d }) => (
            <g key={d + x}>
              <circle cx={x} cy={y} r="3.5" fill="#070b13" stroke="#00c9b1" strokeWidth="2"/>
              <text x={x} y={y - 7} textAnchor="middle" fill="#5a6e8a" fontSize="8" fontFamily="Space Grotesk">{score}</text>
              <text x={x} y="58" textAnchor="middle" fill="#1e2f45" fontSize="8" fontFamily="Space Grotesk">{d}</text>
            </g>
          ))}
        </svg>
      </div>

      {/* ── VOCAB DUE WIDGET ── */}
      {vocabDueCount > 0 && (
        <div className="bg-surface rounded-2xl p-4 flex items-center justify-between shadow-sm amber-edge">
          <div className="flex flex-col gap-0.5">
            <span className="text-white font-bold text-[14px]">{vocabDueCount} words due</span>
            <span className="text-amber text-[11px] font-semibold">Keep your memory fresh</span>
          </div>
          <button onClick={onOpenVocab} className="bg-amber/10 text-amber font-bold text-[12px] px-4 py-2 rounded-lg border border-amber/20 active:scale-95 transition-all">
            Review Now →
          </button>
        </div>
      )}

      {/* ── LAST SESSION ── */}
      <div className="bg-surface rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00c9b1" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 11c0 3.866 3.134 7 7 7s7-3.134 7-7"/>
          </svg>
        </div>
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <span className="text-white font-semibold text-[13px] truncate">Full Mock Test</span>
          <span className="text-muted text-[11px]">Mar 26 · Band <span className="text-teal font-bold">7.5</span></span>
        </div>
        <span className="text-muted text-lg leading-none" aria-hidden="true">›</span>
      </div>

      {/* ── UPGRADE BANNER (Free Users) ── */}
      {showUpgrade && (
        <div className="bg-surface rounded-2xl p-5 flex flex-col gap-3 shadow-card teal-edge relative mt-2 animate-fade-in">
          <button onClick={() => setShowUpgrade(false)} className="absolute top-3 right-3 text-muted p-1 active:scale-90" aria-label="Dismiss">✕</button>
          
          <div className="flex flex-col pr-6">
            <span className="text-white font-bold text-[15px] mb-1">Upgrade to SpeakZone PRO</span>
            <div className="flex items-center gap-2">
              <span className="text-muted text-[12px] font-bold uppercase tracking-widest">Sessions Used Today:</span>
              <span className="text-teal font-black text-[13px]">1 / 1</span>
            </div>
            <div className="w-full h-1.5 bg-hint rounded-full overflow-hidden mt-1.5 mb-2">
              <div className="h-full bg-teal rounded-full w-full" />
            </div>
            <p className="text-white/70 text-[12px] leading-snug">Unlock unlimited speaking practice and AI analytics.</p>
          </div>

          <button onClick={onGetPremium} className="w-full bg-teal text-black font-bold py-3.5 rounded-xl text-[14px] shadow-teal-glow active:scale-[0.98] transition-all relative z-10 mt-1">
            Upgrade Now
          </button>
        </div>
      )}

      {/* ── SOCIAL PROOF ── */}
      <p className="text-center text-hint text-[11px] font-medium pb-4 mt-2">
        2,400 students improving their IELTS speaking.
      </p>

    </div>
  );
}
