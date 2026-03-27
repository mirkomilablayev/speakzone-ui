import Card from "../shared/Card";
import Avatar from "../shared/Avatar";
import { PremiumBadge } from "../shared/PremiumBadge";
import { PrimaryButton } from "../shared/Button";

const TOOLS = [
  { title: "Improve My Answer", icon: "✨", desc: "Rewrite last response" },
  { title: "Topic Vocabulary",  icon: "📚", desc: "High-score phrases" },
];

export default function HomeTab({ onStartSession, onOpenProfile }) {
  const isPremium = false;

  return (
    <div className="flex flex-col gap-6 pb-24">
      
      {/* 1. HEADER (FAST & MINIMAL) */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3" onClick={onOpenProfile}>
          <div className="relative">
             <Avatar initials="M" size="lg" />
             {isPremium && <div className="absolute -bottom-1 -right-1"><PremiumBadge size={20} /></div>}
          </div>
          <div className="flex flex-col">
             <h2 className="font-black text-xl text-white leading-none">Mirkomil</h2>
             <span className="text-orange text-xs font-black mt-1.5 flex items-center gap-1">🔥 5 Day Streak</span>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-xl">🔔</button>
      </div>

      {/* 2. RESUME BLOCK (HIGH PRIORITY ACTION) */}
      <Card className="flex flex-col gap-4 bg-card-raised border-white/5 p-5 active:scale-[0.99] transition-all cursor-pointer">
         <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
               <span className="text-white font-black text-sm">Band 6.5 • Last test</span>
               <p className="text-muted text-[11px] font-bold">You’re close to Band 7.0</p>
            </div>
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent font-black">6.5</div>
         </div>
         <div className="bg-white/5 p-3 rounded-xl">
            <p className="text-slate-300 text-xs font-medium italic">"Fix fluency mistakes in Part 2..."</p>
         </div>
         <button className="w-full py-3 bg-white/5 border border-accent/30 rounded-xl text-accent text-xs font-black uppercase tracking-widest hover:bg-accent/5 transition-all">
            Improve Answer ✨
         </button>
      </Card>

      {/* 3. MAIN CARD (DOMINANT CONVERSION) */}
      <div className="flex flex-col gap-3">
         <button 
           onClick={onStartSession}
           className="bg-primary-gradient p-8 rounded-3xl flex flex-col gap-1 items-start group active:scale-[0.98] transition-all shadow-primary-glow border border-white/20 relative overflow-hidden text-left"
         >
           <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
           <h3 className="text-white font-black text-2xl relative z-10 leading-tight">Start Speaking Test (15 min)</h3>
           <p className="text-white/80 text-sm mt-1 font-medium relative z-10">🎯 Get band score + AI feedback</p>
           
           <div className="mt-8 bg-white text-accent font-black px-10 py-3 rounded-2xl text-sm relative z-10 shadow-xl group-hover:scale-105 transition-transform animate-pulse-slow">
              Start Test Now ⚡️
           </div>
         </button>

         {/* 4. URGENCY LIMITS */}
         <div className="flex items-center justify-center gap-2 py-1">
            <span className="w-1.5 h-1.5 bg-red rounded-full animate-pulse" />
            <span className="text-red text-[10px] font-black uppercase tracking-widest">Only 3 free tests remaining today</span>
         </div>
      </div>

      {/* 5. NEXT STEP (SIMPLIFIED ROADMAP) */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Next Step</h3>
         <Card className="flex items-center justify-between p-5 bg-card-raised border-white/5 active:scale-[0.99] transition-all cursor-pointer group">
            <div className="flex flex-col gap-1">
               <h4 className="text-white font-black text-lg">Topic: Infrastructure</h4>
               <p className="text-muted text-[11px] font-medium">Improve vocabulary & ideas</p>
            </div>
            <button className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-primary-glow group-hover:rotate-12 transition-all">
               ▶
            </button>
         </Card>
      </div>

      {/* 6. MINIMAL TOOLS (MAX 2) */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Practice Tools</h3>
         <div className="grid grid-cols-2 gap-3">
            {TOOLS.map((t, i) => (
               <Card key={i} className="flex flex-col gap-3 p-4 bg-card-raised border-white/5 active:scale-[0.98] transition-all cursor-pointer group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{t.icon}</span>
                  <div className="flex flex-col gap-0.5">
                     <span className="text-white font-black text-[13px] tracking-tight">{t.title}</span>
                     <span className="text-muted text-[9px] font-medium">{t.desc}</span>
                  </div>
               </Card>
            ))}
         </div>
      </div>

      {/* 7. PRO BLOCK (DIRECT CONVERSION) */}
      {!isPremium && (
         <Card className="bg-gold-gradient border-none p-6 flex flex-col gap-4 relative overflow-hidden group active:scale-[0.99] transition-all cursor-pointer">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
            <div className="flex flex-col gap-1 relative z-10">
               <h3 className="text-black font-black text-xl leading-tight">Unlock Full Feedback</h3>
               <p className="text-black/80 text-xs font-bold leading-snug max-w-[200px] mt-1">
                  See grammar, vocabulary & mistakes instantly.
               </p>
               <div className="flex items-center gap-2 mt-4">
                  <button className="bg-black text-white font-black px-6 py-2.5 rounded-xl text-[10px] uppercase tracking-widest shadow-xl">
                     Upgrade to PRO 👑
                  </button>
                  <span className="text-black/40 text-[9px] font-black uppercase tracking-tighter">Limited feedback in free</span>
               </div>
            </div>
         </Card>
      )}

      <p className="text-center text-muted text-[11px] font-black uppercase tracking-[0.3em] mt-2 mb-4 opacity-20">
        SpeakZone v3.0.0
      </p>

    </div>
  );
}
