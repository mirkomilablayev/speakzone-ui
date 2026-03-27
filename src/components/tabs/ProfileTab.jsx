import { useState } from "react";
import Card from "../shared/Card";
import { PrimaryButton, OutlineButton } from "../shared/Button";
import { PremiumBadge } from "../shared/PremiumBadge";

const HISTORY = [
  { id: 1, type: "Full Mock",  date: "Mar 26, 18:45", score: "7.5", trend: "up", category: "full" },
  { id: 2, type: "Part 2 Focus", date: "Mar 25, 12:10", score: "6.5", trend: "stable", category: "part2" },
  { id: 3, type: "Part 1 Mock", date: "Mar 22, 10:30", score: "6.0", trend: "down", category: "part1" },
];

const SETTINGS = [
  { icon: "🌐", label: "App Language", value: "English" },
  { icon: "🔔", label: "Notifications", value: "On" },
  { icon: "🌑", label: "Appearance",    value: "Dark" },
];

export default function ProfileTab({ onGetPremium }) {
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [historyFilter, setHistoryFilter] = useState("all");

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

        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 hide-scrollbar">
           {["all", "full", "part1", "part2", "part3"].map(f => (
             <button 
                key={f}
                onClick={() => setHistoryFilter(f)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all ${
                   historyFilter === f ? "bg-accent border-accent text-white" : "bg-card-raised border-white/10 text-muted"
                }`}
             >
                {f}
             </button>
           ))}
        </div>

        <div className="flex flex-col gap-3">
           {filteredHistory.length > 0 ? (
             <Card className="!p-0 overflow-hidden divide-y divide-subtle mt-1">
                {filteredHistory.map((h, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-5 active:bg-white/5 transition-colors cursor-pointer group">
                     <div className="flex flex-col gap-0.5">
                        <span className="text-white font-black text-sm group-hover:text-accent transition-colors">{h.type}</span>
                        <span className="text-muted text-[11px]">{h.date}</span>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                           <span className="text-white font-black text-lg leading-none">{h.score}</span>
                           <span className="text-[8px] text-muted font-bold uppercase tracking-tighter mt-1">Band Score</span>
                        </div>
                        <span className={`text-sm ${h.trend === 'up' ? 'text-green' : h.trend === 'down' ? 'text-red' : 'text-slate-500'}`}>
                           {h.trend === 'up' ? '↗' : h.trend === 'down' ? '↘' : '→'}
                        </span>
                        <span className="text-muted text-lg opacity-20 ml-1">›</span>
                     </div>
                  </div>
                ))}
             </Card>
           ) : (
             <div className="flex flex-col items-center justify-center p-20 text-center gap-4">
                <span className="text-5xl opacity-20 italic">Empty State Screen UI UX Rules screen.</span>
                <p className="text-muted text-sm font-bold uppercase tracking-[0.2em] leading-relaxed">No tests found for this category</p>
             </div>
           )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-24 animate-tab-in">
      <div className="flex flex-col gap-1.5 pt-1">
        <h1 className="font-bold text-2xl text-white">My Profile</h1>
      </div>

      {/* SECTION A — User Info */}
      <Card className="flex items-center gap-4 py-6 relative overflow-hidden group">
         <div className="absolute -left-4 -top-4 w-24 h-24 bg-accent/5 rounded-full blur-2xl" />
         <div className="w-16 h-16 rounded-full bg-primary-gradient flex items-center justify-center font-black text-white text-2xl shadow-xl border-2 border-white/10 relative z-10 shrink-0 select-none">
            M
         </div>
         <div className="flex flex-col gap-1 relative z-10 overflow-hidden">
            <h2 className="text-white font-black text-xl leading-none truncate pr-2">Mirkomil Zafarov</h2>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
               <span className="bg-accent/10 text-accent text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border border-accent/20">Target: 8.5</span>
               <span className="bg-purple/10 text-purple text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border border-purple/20">Level: B2+</span>
            </div>
         </div>
      </Card>

      {/* SECTION B — Subscription (HIGHLIGHTING VALUE) */}
      <Card className="bg-[#4f8ef7]/5 border-[#4f8ef7]/20 border p-6 flex flex-col gap-5 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-2xl opacity-50" />
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <PremiumBadge size={22} />
               <h3 className="text-white font-black text-[15px]">Active Subscription</h3>
            </div>
            <span className="text-accent text-[11px] font-bold uppercase tracking-widest border-b border-accent border-dashed">Pro Plan</span>
         </div>
         <div className="flex flex-col gap-2 relative z-10">
            <p className="text-white font-black text-xl mb-1 leading-tight">Unlimited Mocks + Full AI Feedback 👑</p>
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-white/50 text-[11px] font-black uppercase tracking-widest">
                   <span className="w-1 h-1 bg-accent rounded-full" /> Infinite Full Tests
                </div>
                <div className="flex items-center gap-2 text-white/50 text-[11px] font-black uppercase tracking-widest">
                   <span className="w-1 h-1 bg-accent rounded-full" /> Deep Error Analysis
                </div>
            </div>
         </div>
         <OutlineButton onClick={onGetPremium} className="py-3 text-xs font-black uppercase tracking-widest border-accent/40 text-accent bg-accent/10 hover:bg-accent/20 transition-all mt-2">
            Manage My Plan
         </OutlineButton>
      </Card>

      {/* SECTION C — Your Performance (RENAMED) */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Your Performance</h3>
         <div className="grid grid-cols-2 gap-3">
            <Card className="flex flex-col items-center py-6 text-center group active:scale-[0.98] transition-all cursor-pointer">
               <span className="text-white font-black text-3xl group-hover:scale-110 transition-transform">6.5</span>
               <span className="text-muted text-[10px] font-bold uppercase tracking-widest mt-2">Avg Band Score</span>
            </Card>
            <Card className="flex flex-col items-center py-6 text-center group active:scale-[0.98] transition-all cursor-pointer">
               <div className="flex items-baseline gap-1 group-hover:scale-110 transition-transform">
                  <span className="text-green font-black text-3xl">+0.5</span>
               </div>
               <span className="text-muted text-[10px] font-bold uppercase tracking-widest mt-2">Score Improvement</span>
            </Card>
         </div>
      </div>

      {/* SECTION D — History */}
      <div className="flex flex-col gap-3">
         <div className="flex items-center justify-between px-1">
            <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest">Mock History</h3>
            <button 
               onClick={() => setShowFullHistory(true)}
               className="text-accent text-[11px] font-black uppercase tracking-widest underline decoration-2 underline-offset-4"
            >
               View All
            </button>
         </div>
         <Card className="!p-0 overflow-hidden divide-y divide-subtle">
            {HISTORY.length > 0 ? HISTORY.map(h => (
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
            )) : (
               <div className="p-8 text-center bg-white/5">
                  <p className="text-muted text-xs font-bold uppercase tracking-widest">Start your first mock to see results</p>
               </div>
            )}
         </Card>
      </div>

      {/* SECTION E — Settings */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Settings</h3>
         <Card className="!p-0 overflow-hidden divide-y divide-subtle">
            {SETTINGS.map(s => (
              <button key={s.label} className="w-full flex items-center justify-between px-5 py-5 active:bg-white/5 transition-colors group">
                 <div className="flex items-center gap-4">
                    <span className="text-xl opacity-80 group-hover:scale-110 transition-transform">{s.icon}</span>
                    <span className="text-white font-black text-[14px]">{s.label}</span>
                 </div>
                 <div className="flex items-center gap-2 opacity-50">
                    <span className="text-muted text-xs font-black uppercase tracking-widest">{s.value}</span>
                    <span className="text-muted text-lg leading-none">›</span>
                 </div>
              </button>
            ))}
         </Card>
      </div>

      <p className="text-center text-muted text-[10px] font-black uppercase tracking-[0.3em] mt-2 mb-4 opacity-30">
        SpeakZone v2.0.0
      </p>

    </div>
  );
}
