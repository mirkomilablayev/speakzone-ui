import { useState } from "react";
import Card from "../shared/Card";
import { PrimaryButton, OutlineButton } from "../shared/Button";
import { PremiumBadge } from "../shared/PremiumBadge";

const HISTORY = [
  { id: 1, type: "Full Mock",  date: "Mar 26, 18:45", score: "7.5", trend: "up", category: "full" },
  { id: 2, type: "Part 2 Focus", date: "Mar 25, 12:10", score: "6.5", trend: "stable", category: "part2" },
  { id: 3, type: "Part 1 Mock", date: "Mar 22, 10:30", score: "6.0", trend: "down", category: "part1" },
];

const CRITERIA = [
  { label: "Fluency",   value: "7.0", pct: 70, color: "bg-blue-500" },
  { label: "Lexical",   value: "7.5", pct: 75, color: "bg-purple-500" },
  { label: "Grammar",   value: "6.5", pct: 65, color: "bg-green-500" },
  { label: "Pronun.",   value: "7.0", pct: 70, color: "bg-orange-500" },
];

const SETTINGS = [
  { icon: "🌐", label: "App Language", value: "English" },
  { icon: "🔔", label: "Notifications", value: "On" },
];

export default function ProfileTab({ onGetPremium }) {
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [historyFilter, setHistoryFilter] = useState("all");
  const isPremium = false;

  const filteredHistory = historyFilter === "all" 
    ? HISTORY 
    : HISTORY.filter(h => h.category === historyFilter);

  if (showFullHistory) {
    return (
      <div className="flex flex-col gap-6 pb-24 animate-tab-in">
        <div className="flex items-center gap-3">
           <button onClick={() => setShowFullHistory(false)} className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-xl">←</button>
           <h2 className="text-white font-black text-lg">Mock History</h2>
        </div>
        <Card className="!p-0 overflow-hidden divide-y divide-subtle mt-1 bg-card-raised">
           {filteredHistory.map((h, i) => (
             <div key={i} className="flex items-center justify-between px-5 py-5 active:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex flex-col gap-1">
                   <span className="text-white font-black text-sm group-hover:text-accent transition-colors">{h.type}</span>
                   <span className="text-muted text-[10px] uppercase font-bold tracking-widest opacity-60 font-mono italic">{h.date}</span>
                </div>
                <div className="flex items-center gap-4">
                   <div className="flex flex-col items-end">
                      <span className="text-white font-black text-lg leading-none">{h.score}</span>
                      <span className="text-[8px] text-muted font-bold uppercase tracking-tighter mt-1">Band Score</span>
                   </div>
                   <span className="text-muted text-lg opacity-20 ml-1">›</span>
                </div>
             </div>
           ))}
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-24 animate-tab-in">
      <div className="flex flex-col gap-1.5 pt-1">
        <h1 className="font-bold text-2xl text-white">Performance Hub</h1>
      </div>

      {/* SECTION A — User Info */}
      <Card className="flex items-center gap-4 py-8 bg-card-raised border-white/5 relative overflow-hidden group active:scale-[0.99] transition-all cursor-pointer">
         <div className="w-20 h-20 rounded-full bg-primary-gradient flex items-center justify-center font-black text-white text-3xl shadow-xl border-4 border-white/5 relative z-10 shrink-0 select-none">
            M
         </div>
         <div className="flex flex-col gap-1 relative z-10 overflow-hidden">
            <div className="flex items-center gap-2 pr-2">
               <h2 className="text-white font-black text-2xl leading-none truncate pr-2">Mirkomil</h2>
               {isPremium && <PremiumBadge size={22} />}
            </div>
            <div className="flex items-center gap-2 mt-2">
               <span className="bg-white/5 text-muted text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">Target: 8.5</span>
               <span className="bg-white/5 text-muted text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">Level: B2+</span>
            </div>
         </div>
         <div className="absolute right-6 top-1/2 -translate-y-1/2 text-muted text-2xl opacity-20 group-hover:translate-x-1 transition-transform">›</div>
      </Card>

      {/* SECTION B — Progress Chart (BAND OVER TIME) */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Band Score Over Time</h3>
         <Card className="p-6 bg-card-raised border-white/5">
            <div className="h-40 w-full relative group">
               <svg viewBox="0 0 400 150" className="w-full h-full">
                  <path 
                     d="M0,120 L80,100 L160,110 L240,80 L320,60 L400,30" 
                     fill="none" 
                     stroke="url(#grad)" 
                     strokeWidth="4" 
                     className="drop-shadow-[0_0_10px_rgba(79,142,247,0.5)]"
                  />
                  <defs>
                     <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#4f8ef7" />
                     </linearGradient>
                  </defs>
                  {[0, 80, 160, 240, 320, 400].map((x, i) => (
                    <circle key={i} cx={x} cy={[120, 100, 110, 80, 60, 30][i]} r="5" fill="#4f8ef7" className="animate-pulse" />
                  ))}
               </svg>
            </div>
            <div className="flex justify-between items-center mt-6">
               <div className="flex flex-col">
                  <span className="text-white font-black text-2xl leading-none">7.5</span>
                  <span className="text-muted text-[10px] font-bold uppercase tracking-widest mt-1">Current Band</span>
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-green font-black text-2xl leading-none">+1.5</span>
                  <span className="text-muted text-[10px] font-bold uppercase tracking-widest mt-1">Total Improvement</span>
               </div>
            </div>
         </Card>
      </div>

      {/* SECTION C — Criteria Breakdown (WEAKNESS TRACKING) */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Detailed Analysis</h3>
         <Card className="grid grid-cols-2 gap-6 p-6 bg-card-raised border-white/5">
            {CRITERIA.map(c => (
              <div key={c.label} className="flex flex-col gap-2">
                 <div className="flex justify-between items-end">
                    <span className="text-white font-bold text-sm tracking-tight">{c.label}</span>
                    <span className="text-white font-black text-xs">{c.value}</span>
                 </div>
                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
                 </div>
              </div>
            ))}
         </Card>
      </div>

      {/* SECTION D — History */}
      <div className="flex flex-col gap-3">
         <div className="flex items-center justify-between px-1">
            <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest">Mock History</h3>
            <button onClick={() => setShowFullHistory(true)} className="text-accent text-[11px] font-black uppercase tracking-widest underline decoration-2 underline-offset-4">View All</button>
         </div>
         <Card className="!p-0 overflow-hidden divide-y divide-subtle bg-card-raised border-white/5">
            {HISTORY.map(h => (
              <div key={h.id} className="flex items-center justify-between px-5 py-5 active:bg-white/5 transition-colors cursor-pointer group">
                 <div className="flex flex-col gap-0.5">
                    <span className="text-white font-black text-sm group-hover:text-accent transition-colors">{h.type}</span>
                    <span className="text-muted text-[11px] font-medium">{h.date}</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                       <span className="text-white font-black text-lg leading-none">{h.score}</span>
                       <span className="text-[9px] text-muted font-bold uppercase tracking-tighter mt-1 opacity-70">Band</span>
                    </div>
                    <span className={`text-sm ${h.trend === 'up' ? 'text-green' : h.trend === 'down' ? 'text-red' : 'text-slate-500'}`}>
                       {h.trend === 'up' ? '↗' : h.trend === 'down' ? '↘' : '→'}
                    </span>
                 </div>
              </div>
            ))}
         </Card>
      </div>

      {!isPremium && (
         <Card className="bg-gold-gradient border-none p-6 flex flex-col gap-3 relative overflow-hidden group active:scale-[0.99] transition-all cursor-pointer" onClick={onGetPremium}>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
            <span className="text-black/60 text-[10px] font-black uppercase tracking-widest">PRO ACCESS</span>
            <h3 className="text-black font-black text-xl leading-tight">Unlock Your Roadmap 👑</h3>
            <p className="text-black/70 text-sm font-medium leading-relaxed max-w-[200px]">Get a personalized learning path based on your weak areas.</p>
            <button className="mt-4 bg-black text-white font-black px-10 py-3 rounded-2xl text-sm uppercase tracking-widest shadow-xl">Upgrade to PRO</button>
         </Card>
      )}

      {/* SETTINGS */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Settings</h3>
         <Card className="!p-0 overflow-hidden divide-y divide-subtle bg-card-raised border-white/5">
            {SETTINGS.map(s => (
              <button key={s.label} className="w-full flex items-center justify-between px-5 py-5 active:bg-white/5 transition-colors group">
                 <div className="flex items-center gap-4">
                    <span className="text-xl opacity-80 group-hover:scale-110 transition-transform">{s.icon}</span>
                    <span className="text-white font-black text-[14px]">{s.label}</span>
                 </div>
                 <div className="flex items-center gap-2 opacity-50">
                    <span className="text-muted text-[10px] font-black uppercase tracking-widest">{s.value}</span>
                    <span className="text-muted text-lg leading-none">›</span>
                 </div>
              </button>
            ))}
         </Card>
      </div>

      <p className="text-center text-muted text-[10px] font-black uppercase tracking-[0.3em] mt-2 mb-4 opacity-30">
        SpeakZone v2.7.0
      </p>

    </div>
  );
}
