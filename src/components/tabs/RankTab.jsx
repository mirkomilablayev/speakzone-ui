import { useState } from "react";
import Card from "../shared/Card";
import { PremiumBadge } from "../shared/PremiumBadge";

const PERIODS = ["Week", "Month", "All Time"];

const PODIUM = [
  { rank: 1, initials: "A", gradient: "bg-[linear-gradient(135deg,#fbbf24,#f97316)]", name: "Asilbek",  score: 8.0, premium: true  },
  { rank: 2, initials: "Z", gradient: "bg-[linear-gradient(135deg,#8b5cf6,#ec4899)]", name: "Zulfiya",  score: 7.0, premium: false },
  { rank: 3, initials: "B", gradient: "bg-[linear-gradient(135deg,#06b6d4,#3b82f6)]", name: "Bobur",    score: 6.5, premium: false },
];

const LIST = [
  { rank: 4,  initials: "S", gradient: "bg-[linear-gradient(135deg,#10b981,#06b6d4)]", name: "Sarvinoz", premium: true,  sessions: 12, ratings: 34, score: 6.5 },
  { rank: 5,  initials: "K", gradient: "bg-[linear-gradient(135deg,#f97316,#fbbf24)]", name: "Kamola",   premium: false, sessions: 9,  ratings: 21, score: 6.0 },
  { rank: 6,  initials: "F", gradient: "bg-[linear-gradient(135deg,#ec4899,#8b5cf6)]", name: "Farangiz", premium: true,  sessions: 8,  ratings: 18, score: 6.0 },
  { rank: 47, initials: "M", gradient: "bg-avatar-gradient",                           name: "Mirkomil", premium: true,  sessions: 24, ratings: 60, score: 6.5, isMe: true },
];

const RANK_COLORS = {
  1: "text-yellow-400",
  2: "text-slate-300",
  3: "text-amber-600",
};

export default function RankTab() {
  const [period, setPeriod] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-syne font-bold text-2xl text-white pt-1">Leaderboard 🏆</h1>

      {/* Period Filter */}
      <div className="flex bg-card-raised rounded-xl2 p-1 card-border">
        {PERIODS.map((p, i) => (
          <button
            key={p}
            onClick={() => setPeriod(i)}
            className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
              period === i
                ? "bg-primary-gradient text-white shadow-primary-glow"
                : "text-muted"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-3 mt-2">
        {/* 2nd */}
        <div className="flex flex-col items-center gap-2 mb-0">
          <div className={`w-11 h-11 ${PODIUM[1].gradient} rounded-full flex items-center justify-center font-bold text-white`}>
            {PODIUM[1].initials}
          </div>
          <div className="bg-slate-300/10 border border-slate-300/20 rounded-t-xl w-16 h-16 flex flex-col items-center justify-center">
            <span className="font-syne font-bold text-lg text-slate-300">2</span>
            <span className="text-slate-400 text-[10px]">🥈</span>
          </div>
          <span className="text-xs text-slate-300 font-medium">{PODIUM[1].name}</span>
          <span className="text-accent font-syne font-bold text-sm">{PODIUM[1].score}</span>
        </div>

        {/* 1st */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl">👑</span>
          <div className={`w-14 h-14 ${PODIUM[0].gradient} rounded-full flex items-center justify-center font-bold text-white text-lg shadow-gold-glow`}>
            {PODIUM[0].initials}
          </div>
          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-t-xl w-16 h-24 flex flex-col items-center justify-center">
            <span className="font-syne font-bold text-2xl text-yellow-400">1</span>
            <span className="text-yellow-400 text-sm">🥇</span>
          </div>
          <span className="text-xs text-white font-semibold">{PODIUM[0].name}</span>
          <span className="text-yellow-400 font-syne font-bold text-sm">{PODIUM[0].score}</span>
        </div>

        {/* 3rd */}
        <div className="flex flex-col items-center gap-2 mb-0">
          <div className={`w-11 h-11 ${PODIUM[2].gradient} rounded-full flex items-center justify-center font-bold text-white`}>
            {PODIUM[2].initials}
          </div>
          <div className="bg-amber-600/10 border border-amber-600/20 rounded-t-xl w-16 h-12 flex flex-col items-center justify-center">
            <span className="font-syne font-bold text-lg text-amber-600">3</span>
            <span className="text-amber-600 text-[10px]">🥉</span>
          </div>
          <span className="text-xs text-slate-300 font-medium">{PODIUM[2].name}</span>
          <span className="text-accent font-syne font-bold text-sm">{PODIUM[2].score}</span>
        </div>
      </div>

      {/* Full List */}
      <Card className="!p-0 overflow-hidden">
        {LIST.map((item, idx) => (
          <div
            key={item.rank}
            className={`flex items-center gap-3 px-4 py-3 ${
              item.isMe
                ? "bg-accent/5 border border-accent/25 rounded-xl2 mx-2 my-2"
                : idx < LIST.length - 1
                ? "border-b border-subtle"
                : ""
            }`}
          >
            <span className={`font-syne font-bold text-sm w-5 text-center ${
              item.isMe ? "text-accent" : RANK_COLORS[item.rank] || "text-muted"
            }`}>
              {item.rank}
            </span>
            <div className={`w-9 h-9 ${item.gradient} rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0`}>
              {item.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`font-semibold text-sm ${item.isMe ? "text-white" : "text-slate-200"}`}>
                  {item.name}
                </span>
                {item.premium && <PremiumBadge small />}
              </div>
              <span className="text-muted text-[11px]">
                {item.sessions} sessions · {item.ratings} ratings
              </span>
            </div>
            <span className={`font-syne font-bold text-base ${item.isMe ? "text-accent" : "text-white"}`}>
              {item.score}
            </span>
          </div>
        ))}
      </Card>

      {/* Your Rank */}
      <div className="bg-accent/10 border border-accent/20 rounded-xl2 px-5 py-3 text-center">
        <span className="text-slate-300 text-sm">🎯 Your rank: <strong className="text-white font-syne">#47</strong></span>
      </div>

      <div className="pb-2" />
    </div>
  );
}
