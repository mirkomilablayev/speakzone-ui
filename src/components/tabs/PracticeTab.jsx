import { useState } from "react";
import Card from "../shared/Card";
import { PrimaryButton, OutlineButton } from "../shared/Button";

const TOOLS = [
  { id: "vocab",     icon: "📚", title: "Topic Vocabulary", desc: "Topic-based IELTS vocabulary", color: "blue" },
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
      : TOOLS.find(t => t.id === selectedTool);

    return (
      <div className="flex flex-col gap-6 pb-24 animate-tab-in">
        <div className="flex items-center gap-3">
           <button onClick={() => setSelectedTool(null)} className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-xl active:scale-95 transition-all">←</button>
           <h2 className="text-white font-black text-lg">{tool.title}</h2>
        </div>

        <Card className="flex flex-col gap-6 py-8 items-center text-center bg-card-raised border-white/5">
           <div className="w-20 h-20 rounded-3xl bg-primary-gradient flex items-center justify-center text-4xl shadow-primary-glow border border-white/10">
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
      <div className="flex flex-col gap-1 pt-1">
        <h1 className="font-bold text-2xl text-white">Linguistic Training</h1>
        <p className="text-muted text-sm opacity-60">Master specialized IELTS speaking skills</p>
      </div>

      {/* CORE: Improve My Answer */}
      <Card 
        onClick={() => setSelectedTool("improve")}
        className="bg-primary-gradient border-none p-6 flex flex-col gap-4 relative overflow-hidden group active:scale-[0.99] transition-all cursor-pointer"
      >
         <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
         <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center gap-2">
               <span className="text-2xl leading-none">✨</span>
               <h2 className="text-white font-black text-xl leading-none">Improve My Answer</h2>
            </div>
            <p className="text-white/80 text-[13px] leading-snug">AI-powered refinement for Band 8.5+</p>
            <button className="mt-4 bg-white text-accent font-black px-10 py-3.5 rounded-full text-[11px] uppercase tracking-widest shadow-lg group-hover:scale-105 transition-transform w-fit leading-none">
               Improve Answer ✨
            </button>
         </div>
      </Card>

      {/* TOOLS GRID (REFRACTORED TO SINGLE LIST) */}
      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Specialized Vocabulary</h3>
         <div className="flex flex-col gap-2.5">
            {TOOLS.map(t => (
              <Card 
                key={t.id} 
                onClick={() => setSelectedTool(t.id)}
                className={`flex items-center gap-4 py-4 px-4 border-y-0 border-r-0 border-l-[4px] border-white/5 active:scale-[0.98] transition-all cursor-pointer group shadow-sm ${ACCENT_COLORS[t.color]}`}
              >
                 <div className={`w-11 h-11 rounded-xl ${ICON_BG[t.color]} border border-white/5 flex items-center justify-center text-xl group-hover:scale-105 transition-transform shadow-lg`}>
                    {t.icon}
                 </div>
                 <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <span className="text-white font-black text-[15px] tracking-tight truncate leading-none">{t.title}</span>
                    <span className="text-muted text-[11px] font-bold opacity-60 leading-none">{t.desc}</span>
                 </div>
                 <span className="text-muted text-xl opacity-30 group-hover:translate-x-1 transition-transform font-light">›</span>
              </Card>
            ))}
         </div>
      </div>

    </div>
  );
}
