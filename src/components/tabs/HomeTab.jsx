import Card from "../shared/Card";
import Avatar from "../shared/Avatar";
import { PremiumBadge } from "../shared/PremiumBadge";
import { PrimaryButton } from "../shared/Button";

const GOALS = [
  { text: "Complete 1 full mock", done: true },
  { text: "Practice 3 quick questions", done: false },
];

const PRACTICE_TOOLS = [
  { title: "Improve My Answer", icon: "✨", desc: "Refine last response" },
  { id: "vocab", icon: "📚", title: "Topic Vocab", desc: "Native phrases" },
  { id: "cuecard", icon: "🎴", title: "Cue Card Gen", desc: "Part 2 topics" },
];

export default function HomeTab({ onStartSession, onOpenProfile }) {
  const isPremium = false; // Toggle to false to show upgrade pressure

  return (
    <div className="flex flex-col gap-6 pb-24">
      
      {/* SECTION 1: Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3" onClick={onOpenProfile}>
          <div className="relative">
             <Avatar initials="M" size="lg" />
             {isPremium && <div className="absolute -bottom-1 -right-1"><PremiumBadge size={20} /></div>}
          </div>
          <div className="flex flex-col">
             <h2 className="font-black text-xl text-white leading-none">Mirkomil</h2>
             <span className="text-orange text-xs font-bold mt-1.5 flex items-center gap-1">🔥 5 Day Streak</span>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-xl">🔔</button>
      </div>

      {/* PROBLEM 2: HIERARCHY — 1. CONTINUE / RESUME */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Resume Practice</h3>
         <Card className="flex items-center justify-between py-4 bg-card-raised border-white/5 group active:scale-[0.99] transition-all cursor-pointer">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-accent/10 rounded-xl flex flex-col items-center justify-center border border-accent/20">
                  <span className="text-accent font-black text-lg leading-none">6.5</span>
                  <span className="text-accent/60 text-[8px] font-bold uppercase tracking-tighter mt-0.5">Mock</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-white font-black text-sm">Last Result Available</span>
                  <span className="text-muted text-[10px]">Yesterday, 18:45</span>
               </div>
            </div>
            <button className="text-accent text-xs font-black uppercase tracking-widest underline underline-offset-4">Improve Last Answer</button>
         </Card>
      </div>

      {/* PROBLEM 2: HIERARCHY — 2. PRIMARY CTA (START MOCK) */}
      <button 
        onClick={onStartSession}
        className="bg-primary-gradient p-8 rounded-3xl flex flex-col gap-1 items-start group active:scale-[0.98] transition-all shadow-primary-glow border border-white/20 relative overflow-hidden"
      >
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <span className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mb-1 relative z-10">CORE SIMULATION</span>
        <h3 className="text-white font-black text-2xl relative z-10">Start Speaking Test (15 min)</h3>
        {!isPremium && (
           <div className="flex items-center gap-2 mt-2 py-1 px-3 bg-black/20 rounded-lg backdrop-blur-sm border border-white/5 relative z-10">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">3 free mocks left</span>
           </div>
        )}
        <div className="mt-8 bg-white text-accent font-black px-10 py-3 rounded-2xl text-sm relative z-10 shadow-xl group-hover:scale-105 transition-transform">
           Start Speaking Test Now ⚡️
        </div>
      </button>

      {/* PROBLEM 2: HIERARCHY — 3. DAILY GOAL */}
      <Card className="bg-card-raised border-white/5">
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-white font-bold text-sm">Today's Goal</h3>
           <span className="text-accent text-[11px] font-black tracking-widest uppercase">50% Done</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full mb-6 overflow-hidden">
           <div className="h-full bg-accent rounded-full" style={{ width: "50%" }} />
        </div>
        <div className="flex flex-col gap-3">
           {GOALS.map((g, i) => (
             <div key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${g.done ? "bg-accent border-accent" : "border-white/10"}`}>
                   {g.done && <span className="text-white text-[10px] font-bold">✓</span>}
                </div>
                <span className={`text-[13px] font-bold ${g.done ? "text-white/30 line-through" : "text-white"}`}>{g.text}</span>
             </div>
           ))}
        </div>
      </Card>

      {/* PROBLEM 2: HIERARCHY — 4. PRACTICE TOOLS */}
      <div className="flex flex-col gap-3">
         <div className="flex items-center justify-between px-1">
            <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest">Practice Tools</h3>
            <button className="text-accent text-[11px] font-bold uppercase tracking-widest underline">Daily Question</button>
         </div>
         <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar -mx-4 px-4">
            {PRACTICE_TOOLS.map((c, i) => (
              <div key={i} className="min-w-[170px] bg-card-raised border border-white/5 p-5 rounded-2xl flex flex-col gap-4 active:scale-95 transition-all cursor-pointer group">
                 <span className="text-3xl group-hover:scale-110 transition-transform">{c.icon}</span>
                 <div className="flex flex-col gap-0.5">
                    <span className="text-white font-black text-sm">{c.title}</span>
                    <span className="text-muted text-[10px] leading-relaxed">{c.desc}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* PROBLEM 4: MONETIZATION TRIGGER — UPGRADE NUDGE */}
      {!isPremium && (
         <Card className="bg-gold-gradient border-none p-6 flex flex-col gap-4 relative overflow-hidden group active:scale-[0.99] transition-all cursor-pointer">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
            <div className="relative z-10">
               <span className="text-black/60 text-[10px] font-black uppercase tracking-widest">PRO FEATURE LOCKED</span>
               <h3 className="text-black font-black text-xl mt-1">Unlock Full AI Feedback</h3>
               <p className="text-black/70 text-xs mt-2 font-medium leading-relaxed max-w-[200px]">
                  Get detailed grammar, vocabulary and pronunciation reports on every mock.
               </p>
               <button className="mt-6 bg-black text-white font-black px-8 py-2.5 rounded-xl text-xs uppercase tracking-widest shadow-xl">
                  Upgrade to PRO 👑
               </button>
            </div>
         </Card>
      )}

    </div>
  );
}
