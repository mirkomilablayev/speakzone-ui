import { useState } from "react";
import Card from "../shared/Card";
import { PremiumBadge } from "../shared/PremiumBadge";

const TrophyIcon = ({ color = "text-yellow-400" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={color}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.45.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const PODIUM = [
  { rank: 1, initials: "A", gradient: "bg-[linear-gradient(135deg,#f97316,#ef4444)]", name: "Asilbek",  score: 3420, premium: true },
  { rank: 2, initials: "Z", gradient: "bg-[linear-gradient(135deg,#8b5cf6,#ec4899)]", name: "Zulfiya",  score: 3150, premium: true },
  { rank: 3, initials: "B", gradient: "bg-[linear-gradient(135deg,#06b6d4,#3b82f6)]", name: "Bobur",    score: 2980, premium: false },
];

const LIST_DATA = [
  { rank: 4, initials: "S", gradient: "bg-[linear-gradient(135deg,#10b981,#06b6d4)]", name: "Sarvinoz", sessions: 12, score: 2840, trend: "up", premium: true },
  { rank: 5, initials: "K", gradient: "bg-[linear-gradient(135deg,#f97316,#fbbf24)]", name: "Kamola",   sessions: 9,  score: 2710, trend: "neutral", premium: false },
  { rank: 6, initials: "F", gradient: "bg-[linear-gradient(135deg,#ec4899,#8b5cf6)]", name: "Farangiz", sessions: 8,  score: 2650, trend: "up", premium: true },
];

export default function RankTab() {
  const [period, setPeriod] = useState(0);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-syne font-bold text-2xl text-white pt-1">Leaderboard</h1>

      {/* Period Filter */}
      <div className="flex bg-card p-1 rounded-xl2 card-border">
        {["Week", "Month", "All Time"].map((p, i) => (
          <button
            key={p}
            onClick={() => setPeriod(i)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all
              ${period === i ? "bg-card-raised text-accent shadow-sm" : "text-muted hover:text-slate-300"}`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="relative flex items-end justify-center pt-8 pb-4 h-56 mt-2">
        {/* Silver - 2nd */}
        <div className="flex flex-col items-center flex-1 z-10 animate-tab-in" style={{ animationDelay: "100ms" }}>
          <div className="relative mb-2">
            <div className={`w-14 h-14 ${PODIUM[1].gradient} rounded-full flex items-center justify-center font-bold text-white text-lg border-2 border-slate-400/30 ring-4 ring-slate-400/5`}>
              {PODIUM[1].initials}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-slate-400 text-bg w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-card">2</div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white text-xs font-bold truncate w-auto max-w-[60px]">{PODIUM[1].name}</span>
            {PODIUM[1].premium && <PremiumBadge size={14} />}
          </div>
          <span className="text-accent text-[10px] font-mono font-bold">{PODIUM[1].score}</span>
          <div className="w-full bg-gradient-to-t from-card-raised/80 to-card-raised/20 h-16 mt-2 rounded-t-lg border-x border-t border-subtle" />
        </div>

        {/* Gold - 1st */}
        <div className="flex flex-col items-center flex-1 z-20 -mb-2 scale-110 animate-tab-in">
          <TrophyIcon />
          <div className="relative my-2">
            <div className={`w-16 h-16 ${PODIUM[0].gradient} rounded-full flex items-center justify-center font-bold text-white text-2xl border-2 border-yellow-400/40 ring-4 ring-yellow-400/10 shadow-[0_0_20px_rgba(245,197,24,0.2)]`}>
              {PODIUM[0].initials}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-bg w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2 border-card">1</div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-white text-sm font-bold truncate w-auto max-w-[80px]">{PODIUM[0].name}</span>
            {PODIUM[0].premium && <PremiumBadge size={16} />}
          </div>
          <span className="text-yellow-400 text-xs font-mono font-bold">{PODIUM[0].score}</span>
          <div className="w-full bg-gradient-to-t from-card-raised to-card-raised/30 h-24 mt-2 rounded-t-xl border-x border-t border-accent/20" />
        </div>

        {/* Bronze - 3rd */}
        <div className="flex flex-col items-center flex-1 z-10 animate-tab-in" style={{ animationDelay: "200ms" }}>
          <div className="relative mb-2">
            <div className={`w-14 h-14 ${PODIUM[2].gradient} rounded-full flex items-center justify-center font-bold text-white text-lg border-2 border-amber-600/30 ring-4 ring-amber-600/5`}>
              {PODIUM[2].initials}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-600 text-bg w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-card">3</div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white text-xs font-bold truncate w-auto max-w-[60px]">{PODIUM[2].name}</span>
            {PODIUM[2].premium && <PremiumBadge size={14} />}
          </div>
          <span className="text-accent text-[10px] font-mono font-bold">{PODIUM[2].score}</span>
          <div className="w-full bg-gradient-to-t from-card-raised/80 to-card-raised/20 h-12 mt-2 rounded-t-lg border-x border-t border-subtle" />
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {LIST_DATA.map((u) => (
          <div key={u.name} className="flex items-center gap-3 bg-card p-3 rounded-xl card-border active:scale-[0.99] transition-all">
            <span className="w-5 text-muted font-mono text-center text-xs font-bold">#{u.rank}</span>
            <div className={`w-9 h-9 ${u.gradient} rounded-full flex items-center justify-center font-bold text-white text-sm border border-subtle`}>
              {u.initials}
            </div>
            <div className="flex-1 min-w-0 px-1">
              <div className="flex items-center gap-1.5">
                <span className="text-white font-bold text-sm block leading-none">{u.name}</span>
                {u.premium && <PremiumBadge size={14} />}
              </div>
              <span className="text-muted text-[10px] font-medium">{u.sessions} sessions</span>
            </div>
            <div className="text-right">
              <span className="text-accent font-mono text-xs font-bold block">{u.score}</span>
              <span className={`text-[10px] font-bold ${u.trend === "up" ? "text-green" : "text-muted"}`}>
                {u.trend === "up" ? "▲" : "—"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Me */}
      <div className="bg-primary-gradient p-3 rounded-xl flex items-center justify-between shadow-primary-glow border border-accent/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-white border border-white/20">M</div>
          <div>
             <div className="flex items-center gap-1.5">
               <span className="text-white font-bold text-sm block">Mirkomil (You)</span>
               <PremiumBadge size={14} />
             </div>
            <span className="text-white/70 text-[10px] font-bold">#47 · 1420 pts</span>
          </div>
        </div>
        <div className="text-right pr-2">
          <span className="text-white font-syne font-black text-xl">#47</span>
        </div>
      </div>

      <div className="pb-2" />
    </div>
  );
}
