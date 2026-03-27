import Card from "../shared/Card";

const QUICK_ACTIONS = [
  { id: "improve", title: "Improve Answer", icon: "✨", desc: "Rewrite last response" },
  { id: "vocab",   title: "Topic Vocab",    icon: "📚", desc: "High-score phrases" },
  { id: "cuecard", title: "Cue Card",       icon: "🎯", desc: "Part 2 practice" },
  { id: "progress",title: "My Progress",    icon: "📊", desc: "Track band score" },
];

export default function HomeTab({ onStartSession, onOpenProfile }) {
  return (
    <div className="flex flex-col gap-6 pb-24 animate-tab-in">
      
      {/* 1. TOP BAR */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3" onClick={onOpenProfile}>
          <div className="w-10 h-10 rounded-full bg-primary-gradient flex items-center justify-center font-black text-white text-sm shadow-xl border border-white/10 shrink-0">
             M
          </div>
          <div className="flex flex-col">
             <h2 className="font-bold text-[16px] text-white leading-none">Mirkomil</h2>
             <span className="text-orange text-[10px] font-black mt-1 uppercase tracking-wider">🔥 5 Day Streak</span>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-lg active:scale-90 transition-all">🔔</button>
      </div>

      {/* 2. BAND SCORE CARD (SECTION 1) */}
      <Card className="bg-card-raised/50 border-y-0 border-r-0 border-l-[4px] border-l-accent p-6 flex flex-col gap-4 active:scale-[0.99] transition-all cursor-pointer">
         <div className="flex justify-between items-start">
            <div className="flex flex-col">
               <span className="text-muted text-[11px] font-bold uppercase tracking-widest">Current Band</span>
               <h3 className="text-accent font-black text-[40px] leading-none mt-2">6.5</h3>
            </div>
            <span className="text-muted text-[11px] font-black uppercase tracking-widest opacity-60">Target: 7.5</span>
         </div>
         <div className="flex items-center gap-2 pt-1">
            <span className="text-green text-[13px] font-black tracking-tight">You're 0.5 away from Band 7.0 💪</span>
         </div>
      </Card>

      {/* 3. MAIN CTA CARD (SECTION 2) */}
      <button 
         onClick={onStartSession}
         className="bg-primary-gradient p-8 rounded-[32px] flex flex-col gap-1 items-center text-center group active:scale-[0.98] transition-all shadow-primary-glow border border-white/20 relative overflow-hidden"
      >
         <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
         <h3 className="text-white font-black text-[22px] relative z-10 leading-none flex items-center gap-3">
            🎤 Start Speaking Test
         </h3>
         <p className="text-white/80 text-[11px] mt-2 font-black relative z-10 uppercase tracking-widest">
            Part 1 + Part 2 + Part 3 · ~15 min
         </p>
         
         <div className="mt-8 bg-white text-accent font-black px-12 py-4 rounded-full text-[13px] relative z-10 shadow-xl group-hover:scale-105 transition-transform uppercase tracking-widest leading-none">
            Start Now ⚡️
         </div>
         <span className="mt-4 text-white/50 text-[9px] font-black uppercase tracking-[0.2em] relative z-10 italic">
            3 free tests remaining today
         </span>
      </button>

      {/* 4. LAST RESULT CARD (SECTION 3) */}
      <Card className="flex items-center justify-between p-6 bg-card-raised border-white/5 active:scale-[0.99] transition-all cursor-pointer group">
         <div className="flex flex-col gap-1">
            <span className="text-muted text-[11px] font-bold uppercase tracking-widest leading-none">Last Test</span>
            <div className="flex flex-col gap-0.5 mt-2">
               <h4 className="text-white font-black text-[17px]">IELTS Mock #1</h4>
               <p className="text-muted text-[11px] font-medium opacity-60">Mar 26, 18:45</p>
            </div>
            <button className="text-accent text-[11px] font-black uppercase tracking-widest mt-4 flex items-center gap-1 group-hover:gap-1.5 transition-all">
               View Full Analysis →
            </button>
         </div>
         <div className="w-16 h-16 bg-accent/20 rounded-full flex flex-col items-center justify-center text-accent font-black shadow-lg border border-accent/20">
            <span className="text-2xl leading-none font-black italic">6.5</span>
            <span className="text-[8px] uppercase tracking-widest mt-0.5 opacity-70 font-black">Band</span>
         </div>
      </Card>

      {/* 5. QUICK ACTIONS (SECTION 4 - 2x2 GRID) */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Quick Actions</h3>
         <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((t, i) => (
               <Card key={i} className="flex flex-col gap-2 p-5 bg-card-raised/50 border border-white/5 active:scale-[0.95] transition-all cursor-pointer group shadow-lg">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{t.icon}</span>
                  <div className="flex flex-col gap-0.5 mt-1 overflow-hidden">
                     <span className="text-white font-black text-[13px] tracking-tight truncate leading-tight">{t.title}</span>
                     <p className="text-muted text-[11px] font-bold leading-none mt-1 opacity-60">{t.desc}</p>
                  </div>
               </Card>
            ))}
         </div>
      </div>

    </div>
  );
}
