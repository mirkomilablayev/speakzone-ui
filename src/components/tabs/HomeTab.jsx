import Card from "../shared/Card";
import Avatar from "../shared/Avatar";

const QUICK_TOOLS = [
  { title: "Improve Answer", icon: "✨", desc: "Rewrite last response" },
  { title: "Topic Vocab",    icon: "📚", desc: "High-score phrases" },
  { title: "Cue Card",       icon: "🎯", desc: "Part 2 practice" },
  { title: "Daily Question", icon: "📝", desc: "One challenge" },
];

export default function HomeTab({ onStartSession, onOpenProfile }) {
  return (
    <div className="flex flex-col gap-6 pb-20 animate-tab-in">
      
      {/* 1. TOP BAR */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3" onClick={onOpenProfile}>
          <div className="w-10 h-10 rounded-full bg-primary-gradient flex items-center justify-center font-black text-white text-sm shadow-lg border border-white/10 shrink-0">
             M
          </div>
          <div className="flex flex-col">
             <h2 className="font-bold text-[17px] text-white leading-tight">Mirkomil</h2>
             <span className="text-orange text-[10px] font-black mt-0.5 uppercase tracking-wider flex items-center gap-1">🔥 5 Day Streak</span>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-lg active:scale-95 transition-all">🔔</button>
      </div>

      {/* 2. BAND SCORE CARD (MINI ANALYTICS) */}
      <Card className="bg-card-raised/50 border border-accent/20 p-6 flex flex-col gap-4 relative group hover:border-accent/40 transition-all">
         <div className="flex justify-between items-start">
            <div className="flex flex-col">
               <span className="text-muted text-[10px] font-bold uppercase tracking-widest">Current Band</span>
               <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-accent font-black text-4xl leading-none">6.5</h3>
                  <span className="text-muted text-[11px] font-bold">→ Target: 7.5</span>
               </div>
            </div>
            {/* Mini Trend Line */}
            <div className="w-20 h-10 opacity-60">
               <svg viewBox="0 0 100 40" className="w-full h-full">
                  <path d="M0,35 L20,30 L40,32 L60,20 L80,15 L100,5" fill="none" stroke="#4f8ef7" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="100" cy="5" r="3" fill="#4f8ef7" className="animate-pulse" />
               </svg>
            </div>
         </div>
         <div className="flex items-center gap-2 pt-2 border-t border-white/5">
            <span className="text-green text-xs font-bold">You're 0.5 away from Band 7.0 📈</span>
         </div>
      </Card>

      {/* 3. MAIN CTA CARD (START TEST) */}
      <button 
         onClick={onStartSession}
         className="bg-primary-gradient p-8 rounded-[32px] flex flex-col gap-1 items-center text-center group active:scale-[0.98] transition-all shadow-primary-glow border border-white/20 relative overflow-hidden"
      >
         <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
         <h3 className="text-white font-black text-[24px] relative z-10 leading-none flex items-center gap-3">
            🎤 Start Speaking Test
         </h3>
         <p className="text-white/80 text-[11px] mt-2 font-bold relative z-10 uppercase tracking-widest leading-loose">
            ~15 min · Part 1 + 2 + 3 · AI Feedback
         </p>
         
         <div className="mt-8 bg-white text-accent font-black px-12 py-4 rounded-full text-[13px] relative z-10 shadow-xl group-hover:scale-105 transition-transform uppercase tracking-widest">
            Start Now ⚡️
         </div>
         <span className="mt-4 text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] relative z-10 italic">
            3 free tests remaining today
         </span>
      </button>

      {/* 4. QUICK TOOLS (2x2 GRID) */}
      <div className="grid grid-cols-2 gap-3">
         {QUICK_TOOLS.map((t, i) => (
            <Card key={i} className="flex flex-col gap-3 p-5 bg-card-raised border-white/5 active:scale-[0.98] transition-all cursor-pointer group shadow-lg">
               <span className="text-2xl group-hover:scale-110 transition-transform">{t.icon}</span>
               <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-white font-black text-[14px] tracking-tight truncate">{t.title}</span>
                  <p className="text-muted text-[10px] font-medium leading-none mt-1 opacity-70">{t.desc}</p>
               </div>
            </Card>
         ))}
      </div>

      {/* 5. LAST RESULT */}
      <Card className="flex items-center justify-between p-6 bg-card-raised border-white/5 group active:scale-[0.99] transition-all cursor-pointer">
         <div className="flex flex-col gap-1">
            <span className="text-muted text-[10px] font-bold uppercase tracking-widest">Last Test</span>
            <div className="flex flex-col gap-0.5 mt-1">
               <h4 className="text-white font-black text-lg">IELTS Mock #1</h4>
               <p className="text-muted text-[11px] font-medium opacity-60">Mar 26, 18:45</p>
            </div>
            <button className="text-accent text-[11px] font-black uppercase tracking-widest mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
               View Analysis →
            </button>
         </div>
         <div className="w-16 h-16 bg-accent rounded-3xl flex flex-col items-center justify-center text-white font-black shadow-primary-glow border-2 border-white/10">
            <span className="text-2xl leading-none font-black italic">6.5</span>
            <span className="text-[8px] uppercase tracking-tighter opacity-70 mt-1">Band</span>
         </div>
      </Card>

    </div>
  );
}
