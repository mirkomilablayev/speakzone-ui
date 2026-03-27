import { useState } from "react";
import Card from "../shared/Card";
import { PrimaryButton, OutlineButton } from "../shared/Button";
import { PremiumBadge } from "../shared/PremiumBadge";

const HISTORY = [
  { id: 1, type: "Full Mock",  date: "Today, 18:45", score: "7.5", trend: "up" },
  { id: 2, type: "Part 2 Focus", date: "Mar 25",       score: "6.5", trend: "stable" },
  { id: 3, type: "Full Mock",  date: "Mar 20",       score: "6.0", trend: "down" },
];

const SETTINGS = [
  { icon: "🌐", label: "App Language", value: "English" },
  { icon: "🔔", label: "Notifications", value: "On" },
  { icon: "🌑", label: "Appearance",    value: "Dark" },
];

export default function ProfileTab({ onGetPremium }) {
  const [showFullHistory, setShowFullHistory] = useState(false);

  if (showFullHistory) {
    return (
      <div className="flex flex-col gap-6 pb-24 animate-tab-in">
        <div className="flex items-center gap-3">
           <button onClick={() => setShowFullHistory(false)} className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-xl">←</button>
           <h2 className="text-white font-bold text-lg">Mock History</h2>
        </div>

        <div className="flex flex-col gap-3">
           <Card className="!p-0 overflow-hidden divide-y divide-subtle">
              {[...HISTORY, ...HISTORY].map((h, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-4 active:bg-white/5 transition-colors">
                   <div className="flex flex-col gap-0.5">
                      <span className="text-white font-bold text-sm">{h.type}</span>
                      <span className="text-muted text-[10px]">{h.date}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="flex flex-col items-end">
                         <span className="text-white font-black text-lg leading-none">{h.score}</span>
                         <span className="text-[8px] text-muted font-bold uppercase tracking-tighter mt-1">Band</span>
                      </div>
                      <span className={`text-sm ${h.trend === 'up' ? 'text-green' : h.trend === 'down' ? 'text-red' : 'text-slate-500'}`}>
                         {h.trend === 'up' ? '↗' : h.trend === 'down' ? '↘' : '→'}
                      </span>
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

      {/* SECTION A — User Info */}
      <Card className="flex items-center gap-4 py-6 relative overflow-hidden group">
         <div className="absolute -left-4 -top-4 w-24 h-24 bg-accent/5 rounded-full blur-2xl" />
         <div className="w-16 h-16 rounded-full bg-primary-gradient flex items-center justify-center font-black text-white text-2xl shadow-xl border-2 border-white/10 relative z-10 shrink-0">
            M
         </div>
         <div className="flex flex-col gap-1 relative z-10 overflow-hidden">
            <h2 className="text-white font-black text-xl leading-none truncate">Mirkomil Zafarov</h2>
            <div className="flex items-center gap-2 mt-1">
               <span className="bg-accent/10 text-accent text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border border-accent/20">Target: 8.5</span>
               <span className="bg-purple/10 text-purple text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border border-purple/20">Level: B2+</span>
            </div>
         </div>
      </Card>

      {/* SECTION B — Subscription */}
      <Card className="bg-[#4f8ef7]/5 border-[#4f8ef7]/20 border p-5 flex flex-col gap-4">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <PremiumBadge size={20} />
               <span className="text-white font-bold text-sm">SpeakZone Premium</span>
            </div>
            <span className="text-accent text-[10px] font-bold uppercase tracking-widest">Active</span>
         </div>
         <div className="flex flex-col gap-1.5 mt-1">
            <div className="flex justify-between text-[11px] font-medium">
               <span className="text-slate-400">Mock Tests left:</span>
               <span className="text-white font-bold">Infinite</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-accent rounded-full" style={{ width: "100%" }} />
            </div>
         </div>
         <OutlineButton onClick={onGetPremium} className="py-2.5 text-xs font-bold border-accent/40 text-accent bg-accent/5 hover:bg-accent/10">
            Manage Subscription
         </OutlineButton>
      </Card>

      {/* SECTION C — Progress Summary */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Progress Summary</h3>
         <div className="grid grid-cols-2 gap-3">
            <Card className="flex flex-col items-center py-5 text-center">
               <span className="text-white font-black text-3xl">6.5</span>
               <span className="text-muted text-[10px] font-bold uppercase tracking-widest mt-2">Avg Band</span>
            </Card>
            <Card className="flex flex-col items-center py-5 text-center">
               <div className="flex items-baseline gap-1">
                  <span className="text-green font-black text-3xl">+0.5</span>
               </div>
               <span className="text-muted text-[10px] font-bold uppercase tracking-widest mt-2">Improvement</span>
            </Card>
         </div>
      </div>

      {/* SECTION D — History */}
      <div className="flex flex-col gap-3">
         <div className="flex items-center justify-between px-1">
            <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest">Mock History</h3>
            <button 
              onClick={() => setShowFullHistory(true)}
              className="text-accent text-[10px] font-bold uppercase tracking-widest"
            >
              View All
            </button>
         </div>
         <Card className="!p-0 overflow-hidden divide-y divide-subtle">
            {HISTORY.map(h => (
              <div key={h.id} className="flex items-center justify-between px-5 py-4 active:bg-white/5 transition-colors">
                 <div className="flex flex-col gap-0.5">
                    <span className="text-white font-bold text-sm">{h.type}</span>
                    <span className="text-muted text-[10px]">{h.date}</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                       <span className="text-white font-black text-lg leading-none">{h.score}</span>
                       <span className="text-[8px] text-muted font-bold uppercase tracking-tighter mt-1">Band</span>
                    </div>
                    <span className={`text-sm ${h.trend === 'up' ? 'text-green' : h.trend === 'down' ? 'text-red' : 'text-slate-500'}`}>
                       {h.trend === 'up' ? '↗' : h.trend === 'down' ? '↘' : '→'}
                    </span>
                 </div>
              </div>
            ))}
         </Card>
      </div>

      {/* SECTION E — Settings */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Settings</h3>
         <Card className="!p-0 overflow-hidden divide-y divide-subtle">
            {SETTINGS.map(s => (
              <button key={s.label} className="w-full flex items-center justify-between px-5 py-4 active:bg-white/5 transition-colors group">
                 <div className="flex items-center gap-3">
                    <span className="text-lg opacity-80 group-hover:scale-110 transition-transform">{s.icon}</span>
                    <span className="text-white font-bold text-sm">{s.label}</span>
                 </div>
                 <div className="flex items-center gap-1.5 opacity-60">
                    <span className="text-muted text-xs font-medium">{s.value}</span>
                    <span className="text-muted text-lg leading-none">›</span>
                 </div>
              </button>
            ))}
         </Card>
      </div>


      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1 ml-0.5">Support</h3>
         <Card className="!p-1.5 flex flex-col gap-1.5">
            <button className="flex items-center justify-between p-4 px-5 rounded-xl hover:bg-white/5 active:scale-[0.99] transition-all bg-card-raised/30 border border-white/5 group">
               <div className="flex items-center gap-4">
                  <span className="w-10 h-10 bg-purple/10 rounded-xl flex items-center justify-center text-xl">❓</span>
                  <span className="text-white text-[14px] font-bold group-hover:text-purple transition-colors">Help Center</span>
               </div>
               <span className="text-muted text-lg opacity-40 group-hover:translate-x-1 transition-transform">›</span>
            </button>
            <button className="flex items-center justify-between p-4 px-5 rounded-xl hover:bg-white/5 active:scale-[0.99] transition-all bg-card-raised/30 border border-white/5 group">
               <div className="flex items-center gap-4">
                  <span className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center text-xl">📝</span>
                  <span className="text-white text-[14px] font-bold group-hover:text-teal transition-colors">Send Feedback</span>
               </div>
               <span className="text-muted text-lg opacity-40 group-hover:translate-x-1 transition-transform">›</span>
            </button>
         </Card>
      </div>

      <p className="text-center text-muted text-[11px] font-bold uppercase tracking-[0.2em] mt-2 mb-4 opacity-40">
        SpeakZone v1.2.0
      </p>

    </div>
  );
}
