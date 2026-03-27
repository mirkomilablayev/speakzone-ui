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
  { text: "Practice 2 questions", done: false },
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

      {/* SECTION B — Primary CTA */}
      <div className="grid grid-cols-1 gap-3">
        <button 
          onClick={onStartSession}
          className="bg-primary-gradient p-6 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all shadow-primary-glow border border-white/10"
        >
          <div className="flex flex-col items-start text-left">
             <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1">Recommended</span>
             <h3 className="text-white font-black text-2xl">Start Full Mock</h3>
             <p className="text-white/70 text-xs mt-1">15 mins • Part 1, 2 & 3</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
             ▶
          </div>
        </button>

        <button className="bg-card-raised border border-white/5 p-5 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all">
          <div className="flex flex-col items-start text-left">
             <h3 className="text-white font-bold text-lg">Quick Practice</h3>
             <p className="text-muted text-xs mt-0.5">Answer 1 random question</p>
          </div>
          <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-xl text-accent group-hover:rotate-12 transition-transform">
             ⚡
          </div>
        </button>
      </div>

      {/* SECTION C — Today Block */}
      <Card className="bg-[#1e2130]/40 border-white/5">
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-white font-bold text-sm">Today's Goal</h3>
           <span className="text-accent text-[10px] font-bold uppercase tracking-widest">50% Done</span>
        </div>
        <div className="flex flex-col gap-3">
           {GOALS.map((g, i) => (
             <div key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${g.done ? "bg-accent border-accent" : "border-white/10"}`}>
                   {g.done && <span className="text-white text-[10px] font-bold">✓</span>}
                </div>
                <span className={`text-sm font-medium ${g.done ? "text-white/40 line-through" : "text-white"}`}>{g.text}</span>
             </div>
           ))}
        </div>
      </Card>


      {/* SECTION E — Continue Learning */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Continue Learning</h3>
         <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4">
            {LEARNING_CARDS.map((c, i) => (
              <div key={i} className="min-w-[160px] bg-card-raised border border-white/5 p-4 rounded-xl2 flex flex-col gap-3 active:scale-95 transition-all">
                 <span className="text-2xl">{c.icon}</span>
                 <div className="flex flex-col">
                    <span className="text-white font-bold text-xs">{c.title}</span>
                    <span className="text-muted text-[10px] mt-0.5">{c.desc}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* SECTION F — Last Result */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Last Result</h3>
         <Card className="flex flex-col gap-4 bg-card-raised border-white/5">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex flex-col items-center justify-center">
                     <span className="text-accent font-black text-xl leading-none">6.5</span>
                     <span className="text-accent/60 text-[8px] font-bold uppercase tracking-tighter mt-0.5">Band</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-white font-bold text-sm">Mock Test #12</span>
                     <span className="text-muted text-[10px]">Yesterday, 18:45</span>
                  </div>
               </div>
               <button className="text-accent text-[11px] font-bold underline">Analysis</button>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
               <p className="text-slate-400 text-xs italic leading-relaxed">
                 "Your fluency has improved! Work on idiomatic expressions in Part 2..."
               </p>
            </div>
         </Card>
      </div>

    </div>
  );
}
