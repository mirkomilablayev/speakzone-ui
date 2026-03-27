import { useState } from "react";
import Card from "../shared/Card";
import { PrimaryButton } from "../shared/Button";

const TOOLS = [
  { id: "vocab",     icon: "📚", title: "Topic Vocabulary", desc: "Native phrases & keywords", color: "bg-blue-500/10 text-blue-400" },
  { id: "cuecard",   icon: "🎴", title: "Cue Card Gen",     desc: "Infinite Part 2 topics",    color: "bg-purple-500/10 text-purple-400" },
  { id: "template",  icon: "📐", title: "Templates",        desc: "Structured answers",        color: "bg-green-500/10 text-green-400" },
  { id: "timer",     icon: "⏱️", title: "Timer Trainer",    desc: "30s / 60s / 120s drills",   color: "bg-orange-500/10 text-orange-400" },
  { id: "phrases",   icon: "💎", title: "High-Score",       desc: "Band 7–9 expressions",      color: "bg-teal-500/10 text-teal-400" },
];

export default function PracticeTab() {
  const [selectedTool, setSelectedTool] = useState(null);

  if (selectedTool) {
    const tool = selectedTool === "improve" 
      ? { title: "Improve My Answer", icon: "✨", desc: "AI-powered linguistic refinement" }
      : TOOLS.find(t => t.id === selectedTool);

    return (
      <div className="flex flex-col gap-6 pb-24 animate-tab-in">
        <div className="flex items-center gap-3">
           <button onClick={() => setSelectedTool(null)} className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-xl">←</button>
           <h2 className="text-white font-bold text-lg">{tool.title}</h2>
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
        <h1 className="font-bold text-2xl text-white">IELTS Practice</h1>
        <p className="text-muted text-sm">Boost your band score with specialized tools</p>
      </div>

      {/* FEATURED: Improve My Answer */}
      <Card 
        onClick={() => setSelectedTool("improve")}
        className="bg-primary-gradient border-none p-6 flex flex-col gap-5 relative overflow-hidden group active:scale-[0.99] transition-all cursor-pointer"
      >
         <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
         <div className="relative z-10 flex flex-col gap-1">
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">A.I. Powered</span>
            <h2 className="text-white font-black text-2xl mt-1">Improve My Answer ✨</h2>
            <p className="text-white/80 text-xs mt-2 max-w-[240px] leading-relaxed">
               Input your response via voice or text and get an instant band 8.0+ version with deep explanations.
            </p>
            <div className="flex items-center gap-3 mt-4">
               <button className="bg-white text-accent font-bold px-5 py-2.5 rounded-xl text-xs active:scale-95 transition-all">
                  Voice Input 🎙️
               </button>
               <button className="bg-white/20 text-white font-bold px-5 py-2.5 rounded-xl text-xs active:scale-95 transition-all outline outline-1 outline-white/20">
                  Type Text ⌨️
               </button>
            </div>
         </div>
      </Card>

      {/* TOOLS GRID */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Specialized Tools</h3>
         <div className="grid grid-cols-1 gap-3">
            {TOOLS.map(t => (
              <Card 
                key={t.id} 
                onClick={() => setSelectedTool(t.id)}
                className="flex items-center gap-4 py-5 hover:bg-card-raised/80 active:scale-[0.98] transition-all cursor-pointer group"
              >
                 <div className={`w-12 h-12 rounded-2xl ${t.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {t.icon}
                 </div>
                 <div className="flex flex-col gap-0.5">
                    <span className="text-white font-bold text-[15px]">{t.title}</span>
                    <span className="text-muted text-xs">{t.desc}</span>
                 </div>
                 <span className="ml-auto text-muted text-xl opacity-30 group-hover:translate-x-1 transition-transform">›</span>
              </Card>
            ))}
         </div>
      </div>

    </div>
  );
}
