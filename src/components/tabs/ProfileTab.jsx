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
];

const ACHIEVEMENTS = [
  { icon: "🔥", label: "5 Day Streak", value: "5/7", color: "bg-orange-500/10 text-orange-400" },
  { icon: "🎯", label: "Goal Tracker", value: "2/5", color: "bg-blue-500/10 text-blue-400" },
];

export default function ProfileTab({ onGetPremium }) {
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [historyFilter, setHistoryFilter] = useState("all");
  const isPremium = false; // Toggle to false for pressure

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
             <button key={f} onClick={() => setHistoryFilter(f)} className={`flex-shrink-0 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all ${historyFilter === f ? "bg-accent border-accent text-white" : "bg-card-raised border-white/10 text-muted"}`}>
                {f}
             </button>
           ))}
        </div>
        <div className="flex flex-col gap-3">
           <Card className="!p-0 overflow-hidden divide-y divide-subtle mt-1">
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
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-24 animate-tab-in">
      <div className="flex flex-col gap-1.5 pt-1">
        <h1 className="font-bold text-2xl text-white">My Profile</h1>
      </div>

      {/* USER INFO — FLAT DARK CARD (PROBLEM 1) */}
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

      {/* SUBSCRIPTION — UPGRADE PRESSURE (PROBLEM 4 & 5) */}
      {!isPremium ? (
         <Card className="bg-gold-gradient border-none p-6 flex flex-col gap-5 relative overflow-hidden group active:scale-[0.99] transition-all cursor-pointer">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
            <div className="relative z-10 flex flex-col gap-1">
               <span className="text-black/60 text-[10px] font-black uppercase tracking-widest">LIMITED FREE ACCOUNT</span>
               <h3 className="text-black font-black text-2xl mt-1 leading-tight">Practice Like a Pro 👑</h3>
               <p className="text-black/70 text-sm mt-1.5 font-medium leading-relaxed max-w-[200px]">
                  Get unlimited mocks, real-time AI feedback and deep analytics.
               </p>
               <button onClick={onGetPremium} className="mt-6 bg-black text-white font-black px-10 py-3 rounded-2xl text-sm uppercase tracking-[0.1em] shadow-xl hover:shadow-black/20 transition-all">
                  Upgrade to PRO Now
               </button>
            </div>
         </Card>
      ) : (
         <Card className="bg-card-raised border-white/5 p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
               <h3 className="text-white font-black text-lg">PRO ACTIVE</h3>
               <p className="text-muted text-xs">Valid until Apr 27, 2026</p>
            </div>
            <PremiumBadge size={32} />
         </Card>
      )}

      {/* ACHIEVEMENTS & REWARDS (PROBLEM 5) */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Rewards & Streaks</h3>
         <div className="grid grid-cols-2 gap-3">
            {ACHIEVEMENTS.map(a => (
               <Card key={a.label} className="flex flex-col items-center py-6 text-center group active:scale-[0.98] transition-all cursor-pointer">
                  <span className="text-3xl group-hover:scale-110 transition-transform mb-3">{a.icon}</span>
                  <span className="text-muted text-[10px] font-bold uppercase tracking-widest mb-1">{a.label}</span>
                  <span className="text-white font-black text-xl">{a.value}</span>
                  <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                     <div className="h-full bg-accent rounded-full" style={{ width: a.label === "Goal Tracker" ? "40%" : "70%" }} />
                  </div>
               </Card>
            ))}
         </div>
      </div>

      {/* REFERRAL SYSTEM (PROBLEM 5) */}
      <Card className="bg-blue-600/10 border-blue-500/20 border p-6 flex flex-col gap-4 text-center">
         <h3 className="text-blue-400 font-black text-lg">Invite Friends, Get Free Mocks</h3>
         <p className="text-slate-400 text-xs px-2 leading-relaxed">
            Every friend who joins using your link gives you **2 extra free mocks**. Maximize your practice!
         </p>
         <OutlineButton className="py-2.5 text-xs font-black uppercase tracking-widest border-blue-500/40 text-blue-400 hover:bg-blue-500/10">
            Share Referral Link 🔗
         </OutlineButton>
      </Card>

      {/* SETTINGS (PROBLEM 1: FLAT DARK) */}
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
        SpeakZone v2.5.0
      </p>

    </div>
  );
}
