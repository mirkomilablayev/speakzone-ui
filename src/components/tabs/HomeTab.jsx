import Card from "../shared/Card";
import Avatar from "../shared/Avatar";
import { PremiumBadge } from "../shared/PremiumBadge";
import { PrimaryButton } from "../shared/Button";

const STATS = [
  { label: "Avg Band", value: "6.5", color: "text-accent" },
  { label: "Total Mocks", value: "12", color: "text-purple" },
  { label: "Min Spoken", value: "318", color: "text-green" },
];

const GOALS = [
  { text: "Complete 1 full mock", done: true },
  { text: "Practice 3 quick questions", done: false },
];

const LEARNING_CARDS = [
  { title: "Improve My Answer", icon: "✨", desc: "Rewrite your last response" },
  { title: "Vocabulary", icon: "📚", desc: "Topic: Technology" },
  { title: "Cue Card Gen", icon: "🎴", desc: "Random part 2 topics" },
];

export default function HomeTab({ onStartSession, onOpenProfile }) {
  return (
    <div className="flex flex-col gap-6 pb-24">
      
      {/* SECTION A — Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3" onClick={onOpenProfile}>
          <div className="relative">
             <Avatar initials="M" size="lg" />
             <div className="absolute -bottom-1 -right-1">
                <PremiumBadge size={20} />
             </div>
          </div>
          <div className="flex flex-col">
             <h2 className="font-black text-xl text-white leading-none">Mirkomil</h2>
             <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-orange text-xs font-bold flex items-center gap-1">
                  🔥 5 Day Streak
                </span>
             </div>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-xl">
           🔔
        </button>
      </div>

      {/* SECTION B — Start Full Mock (DOMINANT) */}
      <button 
        onClick={onStartSession}
        className="bg-primary-gradient p-8 rounded-3xl flex flex-col gap-1 items-start group active:scale-[0.98] transition-all shadow-primary-glow border border-white/20 relative overflow-hidden"
      >
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
        <span className="text-white/70 text-[11px] font-black uppercase tracking-[0.2em] mb-1 relative z-10">CORE EXAM</span>
        <h3 className="text-white font-black text-3xl relative z-10">Start Full Mock</h3>
        <p className="text-white/80 text-sm mt-1 font-medium relative z-10">Real IELTS simulation with AI scoring</p>
        <div className="mt-8 bg-white text-accent font-black px-8 py-3 rounded-2xl text-sm relative z-10 shadow-xl group-hover:shadow-white/10 transition-shadow">
           Start Exam Now ⚡️
        </div>
      </button>

      {/* DAILY QUESTION (REMOVED SOCIAL, ADDED HABIT DRIVER) */}
      <Card className="bg-purple-gradient border-none p-5 flex items-center justify-between group active:scale-[0.99] transition-all cursor-pointer">
         <div className="flex flex-col gap-1 text-left">
            <div className="flex items-center gap-2">
               <span className="text-xl">👉</span>
               <h3 className="text-white font-bold text-lg">Daily Question</h3>
            </div>
            <p className="text-white/70 text-xs">Practice 1 question today to keep your streak</p>
         </div>
         <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white font-black text-lg">
            GO
         </div>
      </Card>

      {/* SECTION C — Quick Practice */}
      <button className="bg-card-raised border border-white/5 p-5 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all">
        <div className="flex flex-col items-start text-left">
           <h3 className="text-white font-bold text-lg">Quick Practice</h3>
           <p className="text-muted text-xs mt-0.5">Practice 1 IELTS question (30–60s)</p>
        </div>
        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-xl text-accent group-hover:rotate-12 transition-transform">
           ⚡
        </div>
      </button>

      {/* SECTION D — Today's Goal (IMPROVED LOGIC) */}
      <Card className="bg-[#1e2130]/40 border-white/5">
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-white font-bold text-sm">Today's Goal</h3>
           <span className="text-accent text-[11px] font-black tracking-widest uppercase">50% DONE</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full mb-6 overflow-hidden">
           <div className="h-full bg-accent rounded-full shadow-[0_0_8px_rgba(79,142,247,0.5)]" style={{ width: "50%" }} />
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

      {/* SECTION E — Continue Learning (REORDERED) */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Continue Learning</h3>
         <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar -mx-4 px-4">
            {LEARNING_CARDS.map((c, i) => (
              <div key={i} className="min-w-[170px] bg-card-raised border border-white/5 p-5 rounded-2xl flex flex-col gap-4 active:scale-95 transition-all cursor-pointer">
                 <span className="text-3xl">{c.icon}</span>
                 <div className="flex flex-col gap-1">
                    <span className="text-white font-black text-sm">{c.title}</span>
                    <span className="text-muted text-[10px] leading-relaxed">{c.desc}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* SECTION F — Last Result (IMPROVED) */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Last Result</h3>
         <Card className="flex flex-col gap-5 bg-card-raised border-white/5">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-accent rounded-2xl flex flex-col items-center justify-center shadow-primary-glow border border-white/10">
                     <span className="text-white font-black text-2xl leading-none">6.5</span>
                     <span className="text-white/60 text-[9px] font-bold uppercase tracking-tighter mt-1">Band</span>
                  </div>
                  <div className="flex flex-col gap-0.5 ml-1">
                     <span className="text-white font-black text-[15px]">Full Mock Test</span>
                     <span className="text-muted text-[11px]">Mar 26 • 18:45</span>
                  </div>
               </div>
               <button className="text-accent text-xs font-black uppercase tracking-widest underline decoration-2 underline-offset-4">Full Analysis</button>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
               <p className="text-slate-300 text-[13px] italic leading-relaxed font-medium">
                 "Your fluency has significantly improved! Focus on idiomatic expressions to break into Band 7.0."
               </p>
            </div>
         </Card>
      </div>

    </div>
  );
}
