import { useState } from "react";
import Card from "../shared/Card";
import { PrimaryButton, OutlineButton } from "../shared/Button";

const TOOLS = [
  { id: "vocab",     icon: "📚", title: "Topic Vocabulary", desc: "Topic-based IELTS vocabulary", color: "blue" },
  { id: "cuecard",   icon: "🎴", title: "Cue Card Generator", desc: "Generate unlimited Part 2 topics", color: "purple" },
  { id: "template",  icon: "📝", title: "Speaking Templates", desc: "High-scoring answer structures", color: "teal" },
  { id: "timer",     icon: "⏱️", title: "Timer Trainer",    desc: "Train speaking time (30–120s)", color: "orange" },
  { id: "phrases",   icon: "💎", title: "High Score Phrases", desc: "Band 7–9 phrases for speaking", color: "gold" },
];

const ACCENT_COLORS = {
  blue: "border-l-accent bg-accent/5",
  purple: "border-l-purple bg-purple/5",
  teal: "border-l-teal bg-teal/5",
  orange: "border-l-orange bg-orange/5",
  gold: "border-l-gold bg-gold/5",
};

const ICON_BG = {
  blue: "bg-accent/10 text-accent",
  purple: "bg-purple/10 text-purple",
  teal: "bg-teal/10 text-teal",
  orange: "bg-orange/10 text-orange",
  gold: "bg-gold/10 text-gold",
};

export default function PracticeTab() {
  const [selectedTool, setSelectedTool] = useState(null);

  if (selectedTool) {
    const tool = selectedTool === "improve" 
      ? { title: "Improve My Answer", icon: "✨", desc: "AI-powered linguistic refinement" }
      : selectedTool === "daily"
      ? { title: "Daily Question", icon: "👉", desc: "One focused challenge every day" }
      : TOOLS.find(t => t.id === selectedTool);

    return (
      <div className="flex flex-col gap-6 pb-24 animate-tab-in">
        <div className="flex items-center gap-3">
           <button onClick={() => setSelectedTool(null)} className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-xl">←</button>
           <h2 className="text-white font-black text-lg">{tool.title}</h2>
        </div>

        <Card className="flex flex-col gap-6 py-8 items-center text-center">
           <div className="w-20 h-20 rounded-3xl bg-primary-gradient flex items-center justify-center text-4xl shadow-primary-glow">
              {tool.icon}
           </div>
           <div className="flex flex-col gap-1 px-4">
              <h3 className="text-white font-black text-xl">Ready to Practice?</h3>
              <p className="text-muted text-sm leading-relaxed">
                 Use this tool to master specialized {tool.title.toLowerCase()} techniques.
              </p>
           </div>
        </Card>

        {selectedTool === "daily" && (
           <Card className="bg-white/5 border-white/10 p-5 mt-2">
              <span className="text-accent text-[10px] font-black uppercase tracking-widest">Today's Topic</span>
              <p className="text-white font-bold text-lg mt-2">"Describe a person you admire for their intelligence..."</p>
           </Card>
        )}

        <div className="flex flex-col gap-4">
           <div className="bg-card-raised border border-white/5 rounded-2xl p-4 h-40 flex items-center justify-center text-muted italic text-sm">
              Waiting for input...
           </div>
           <PrimaryButton className="py-4 shadow-primary-glow">Record Your Voice 🎙️</PrimaryButton>
           <OutlineButton>Type Response ⌨️</OutlineButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-24 animate-tab-in">
      <div className="flex flex-col gap-1.5 pt-1">
        <h1 className="font-bold text-2xl text-white">Daily Practice</h1>
        <p className="text-muted text-sm opacity-60">Master specialized IELTS speaking skills</p>
      </div>

      {/* FEATURED: Improve My Answer */}
      <Card 
        onClick={() => setSelectedTool("improve")}
        className="bg-primary-gradient border-none p-6 flex flex-col gap-4 relative overflow-hidden group active:scale-[0.99] transition-all cursor-pointer"
      >
         <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
         <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center gap-2">
               <span className="text-2xl leading-none">✨</span>
               <h2 className="text-white font-black text-xl">Improve My Answer</h2>
            </div>
            <p className="text-white/80 text-[13px] leading-snug">AI-powered refinement for Band 8.5+</p>
            <button className="mt-2 bg-white text-accent font-black px-8 py-3 rounded-full text-[11px] uppercase tracking-widest shadow-lg group-hover:scale-105 transition-transform w-fit">
               Improve Answer ✨
            </button>
         </div>
      </Card>

      {/* DAILY QUESTION (COMPACT) */}
      <Card 
         onClick={() => setSelectedTool("daily")}
         className="bg-purple-gradient border-none p-6 flex flex-col gap-4 relative overflow-hidden group active:scale-[0.99] transition-all cursor-pointer"
      >
         <div className="flex items-center justify-between relative z-10">
            <div className="flex flex-col gap-2">
               <div className="flex items-center gap-2">
                  <span className="text-2xl leading-none">👉</span>
                  <h3 className="text-white font-black text-xl tracking-tight">Daily Question</h3>
               </div>
               <p className="text-white/80 text-[13px] leading-snug">New speaking challenge every 24h</p>
            </div>
            <div className="w-14 h-14 bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform shadow-xl">
               →
            </div>
         </div>
      </Card>

      {/* TOOLS GRID (REFINED ROWS) */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Practice Tools</h3>
         <div className="flex flex-col gap-2.5">
            {TOOLS.map(t => (
              <Card 
                key={t.id} 
                onClick={() => setSelectedTool(t.id)}
                className={`flex items-center gap-4 py-3.5 px-4 border-y-0 border-r-0 border-l-[4px] border-white/5 active:scale-[0.98] transition-all cursor-pointer group shadow-sm ${ACCENT_COLORS[t.color]}`}
              >
                 <div className={`w-11 h-11 rounded-xl ${ICON_BG[t.color]} border border-white/5 flex items-center justify-center text-xl group-hover:scale-105 transition-transform shadow-lg`}>
                    {t.icon}
                 </div>
                 <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="text-white font-black text-[15px] tracking-tight">{t.title}</span>
                    <span className="text-muted text-[11px] font-medium opacity-80">{t.desc}</span>
                 </div>
                 <span className="text-muted text-xl opacity-30 group-hover:translate-x-1 transition-transform font-light">›</span>
              </Card>
            ))}
         </div>
      </div>

    </div>
  );
}
