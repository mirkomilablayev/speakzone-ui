import { useState } from "react";
import Card from "../shared/Card";
import { PrimaryButton } from "../shared/Button";

const CRITERIA = [
  { name: "Fluency",       score: 6.5, pct: 65 },
  { name: "Lexical",       score: 6.0, pct: 60 },
  { name: "Grammar",       score: 7.0, pct: 70 },
  { name: "Pronunciation", score: 6.0, pct: 60 },
];

const BAR_DATA = [55, 70, 60, 80, 65, 75, 85];
const BAR_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ProgressTab({ onGetPremium }) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-syne font-bold text-2xl text-white pt-1">Progress</h1>

      <div className="relative">
        {/* Blurred background content */}
        <div className={`progress-blur flex flex-col gap-4 select-none transition-all duration-500 ${isUnlocked ? "blur-0 opacity-100 filter-none" : "filter blur-[8px] opacity-40 pointer-events-none"}`}>
          {/* Overall Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="flex flex-col items-center py-5">
              <span className="font-syne font-black text-4xl text-accent">6.5</span>
              <span className="text-muted text-[10px] mt-1 font-bold uppercase tracking-wider">Overall Band</span>
            </Card>
            <Card className="flex flex-col items-center py-5">
              <span className="font-syne font-black text-4xl text-purple">24</span>
              <span className="text-muted text-[10px] mt-1 font-bold uppercase tracking-wider">Total Sessions</span>
            </Card>
          </div>

          {/* Detailed breakdown */}
          <Card>
            <h3 className="font-syne font-semibold text-white mb-4 text-sm">Detailed Breakdown</h3>
            <div className="flex flex-col gap-3">
              {CRITERIA.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="text-slate-400 text-[10px] w-20 shrink-0 uppercase font-bold tracking-tight">{c.name}</span>
                  <div className="flex-1 h-1.5 bg-card-raised rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-gradient rounded-full"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                  <span className="text-white font-bold text-sm w-7 text-right">{c.score}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity Chart */}
          <Card>
            <h3 className="font-syne font-semibold text-white mb-4 text-sm">Activity Heatmap</h3>
            <div className="grid grid-cols-7 gap-1.5 h-16">
              {Array.from({ length: 28 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-sm border border-black/5 ${
                    [2, 5, 8, 12, 14, 18, 22, 25].includes(i) ? "bg-accent/40" : 
                    [4, 10, 16, 20, 24].includes(i) ? "bg-accent/80 shadow-[0_0_8px_rgba(79,142,247,0.3)]" : 
                    "bg-card-raised"
                  }`} 
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Premium lock overlay */}
        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
            <div className="bg-card/80 border border-white/10 rounded-xl3 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden animate-scale-in">
              {/* Close Button "X" to skip for dev viewing */}
              <button 
                onClick={() => setIsUnlocked(true)}
                className="absolute top-4 right-4 text-white/40 hover:text-white text-2xl transition-all h-8 w-8 flex items-center justify-center"
              >
                ×
              </button>

              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5 border border-gold/20 shadow-[0_0_15px_rgba(245,197,24,0.15)]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h2 className="font-syne font-extrabold text-2xl text-white mb-2">Premium Analytics</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-[240px] mx-auto">
                Get access to detailed band score history, session recordings, and personalized AI coaching.
              </p>
              <PrimaryButton id="btn-get-premium" onClick={onGetPremium}>
                👑 Get Premium Now
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
