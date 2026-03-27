import Card from "../shared/Card";

const CORE_TOOLS = [
  { id: "improve", title: "Improve Answer", icon: "✨", desc: "AI-powered rewrite" },
  { id: "vocab",   title: "Topic Vocab",    icon: "📚", desc: "High-score phrases" },
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
             <span className="text-orange text-[10px] font-black mt-1 uppercase tracking-wider font-syne">🔥 5 Day Streak</span>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-lg active:scale-90 transition-all font-syne">🔔</button>
      </div>

      {/* 2. BAND SCORE CARD (PROGRESS TRACKING entry) */}
      <Card 
         onClick={onOpenProfile}
         className="bg-card-raised/50 border-y-0 border-r-0 border-l-[4px] border-l-accent p-6 flex flex-col gap-4 active:scale-[0.99] transition-all cursor-pointer group"
      >
         <div className="flex justify-between items-start">
            <div className="flex flex-col">
               <span className="text-muted text-[11px] font-bold uppercase tracking-widest leading-none">Your Progress</span>
               <h3 className="text-accent font-black text-[36px] leading-none mt-3">6.5</h3>
            </div>
            <div className="flex flex-col items-end gap-1 opacity-60">
               <span className="text-white font-black text-xs">Target: 7.5</span>
               <span className="text-muted text-[9px] font-black uppercase tracking-widest italic">Improving +1.0</span>
            </div>
         </div>
         <div className="flex items-center justify-between pt-1">
            <span className="text-green text-[13px] font-black tracking-tight">On track for Band 7.5 💪</span>
            <span className="text-accent text-[11px] font-black uppercase tracking-widest underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity">View Details</span>
         </div>
      </Card>

      {/* 3. CORE ACTION — MOCK TEST */}
      <button 
         onClick={onStartSession}
         className="bg-primary-gradient p-8 rounded-[32px] flex flex-col gap-1 items-center text-center group active:scale-[0.98] transition-all shadow-primary-glow border border-white/20 relative overflow-hidden"
      >
         <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
         <h3 className="text-white font-black text-[22px] relative z-10 leading-none flex items-center gap-3">
            🎤 Start Mock Test
         </h3>
         <p className="text-white/80 text-[11px] mt-2 font-black relative z-10 uppercase tracking-widest leading-tight">
            Part 1+2+3 · Band Score · AI Feedback
         </p>
         
         <div className="mt-8 bg-white text-accent font-black px-12 py-4 rounded-full text-[13px] relative z-10 shadow-xl group-hover:scale-105 transition-transform uppercase tracking-widest leading-none">
            Start Now ⚡️
         </div>
         <span className="mt-4 text-white/50 text-[9px] font-black uppercase tracking-[0.2em] relative z-10 italic">
            3 free tests remaining today
         </span>
      </button>

      {/* 4. TOOLS (INLINE) */}
      <div className="flex flex-col gap-3 mt-2">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Linguistic Training</h3>
         <div className="flex flex-col gap-3">
            {CORE_TOOLS.map((t, i) => (
               <Card key={i} className="flex items-center gap-4 py-4 px-5 bg-card-raised border-white/5 active:scale-[0.97] transition-all cursor-pointer group shadow-lg">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                     {t.icon}
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                     <span className="text-white font-black text-[15px] tracking-tight truncate leading-none">{t.title}</span>
                     <p className="text-muted text-[11px] font-bold opacity-60 leading-none">{t.desc}</p>
                  </div>
                  <span className="ml-auto text-muted text-xl opacity-30 group-hover:translate-x-1 transition-transform">›</span>
               </Card>
            ))}
         </div>
      </div>

    </div>
  );
}
