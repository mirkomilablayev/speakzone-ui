import { useState } from "react";
import Card from "../shared/Card";
import { PrimaryButton, OutlineButton } from "../shared/Button";

const TOOLS = [
  { id: "vocab",     icon: "📚", title: "Topic Vocabulary", desc: "Topic-based IELTS vocabulary with examples", color: "bg-blue-500/10 text-blue-400" },
  { id: "cuecard",   icon: "🎴", title: "Cue Card Generator", desc: "Generate unlimited Part 2 topics",    color: "bg-purple-500/10 text-purple-400" },
  { id: "template",  icon: "📐", title: "Speaking Templates", desc: "High-scoring answer structures",        color: "bg-green-500/10 text-green-400" },
  { id: "timer",     icon: "⏱️", title: "Timer Trainer",    desc: "Train speaking time (30–120 sec)",   color: "bg-orange-500/10 text-orange-400" },
  { id: "phrases",   icon: "💎", title: "High Score Phrases", desc: "Band 7–9 phrases for speaking",      color: "bg-teal-500/10 text-teal-400" },
];

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
        <p className="text-muted text-sm">Master specialized IELTS speaking skills</p>
      </div>

      {/* FEATURED: Improve My Answer */}
      <Card 
        onClick={() => setSelectedTool("improve")}
        className="bg-primary-gradient border-none p-6 flex flex-col gap-5 relative overflow-hidden group active:scale-[0.99] transition-all cursor-pointer"
      >
         <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
         <div className="relative z-10 flex flex-col gap-1">
            <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">HABIT BUILDER</span>
            <h2 className="text-white font-black text-2xl mt-1">Improve My Answer ✨</h2>
            <p className="text-white/80 text-xs mt-2 max-w-[240px] leading-relaxed">
               Instant band 8.0+ refinement with linguistic deep-dives.
            </p>
            <button className="mt-4 bg-white text-accent font-black px-6 py-2.5 rounded-xl text-xs active:scale-95 transition-all w-fit uppercase tracking-widest">
               Get Started ⚡️
            </button>
         </div>
      </Card>

      {/* DAILY QUESTION (REORDERED SECOND) */}
      <Card 
         onClick={() => setSelectedTool("daily")}
         className="bg-purple-gradient border-none p-5 flex items-center justify-between group active:scale-[0.99] transition-all cursor-pointer"
      >
         <div className="flex flex-col gap-1 text-left">
            <div className="flex items-center gap-2">
               <span className="text-xl">👉</span>
               <h3 className="text-white font-black text-lg">Daily Question</h3>
            </div>
            <p className="text-white/70 text-xs">One focused challenge every day</p>
         </div>
         <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white font-black text-lg group-hover:scale-110 transition-transform">
            GO
         </div>
      </Card>

      {/* TOOLS GRID */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Practice Tools</h3>
         <div className="grid grid-cols-1 gap-3">
            {TOOLS.map(t => (
              <Card 
                key={t.id} 
                onClick={() => setSelectedTool(t.id)}
                className="flex items-center gap-4 py-5 hover:bg-card-raised active:scale-[0.98] transition-all cursor-pointer group"
              >
                 <div className={`w-12 h-12 rounded-2xl ${t.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {t.icon}
                 </div>
                 <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="text-white font-black text-[15px] truncate">{t.title}</span>
                    <span className="text-muted text-[11px] leading-snug">{t.desc}</span>
                 </div>
                 <span className="ml-auto text-muted text-xl opacity-30 group-hover:translate-x-1 transition-transform">›</span>
              </Card>
            ))}
         </div>
      </div>

    </div>
  );
}
