import { useState, useEffect } from "react";
import Card from "../shared/Card";
import { PrimaryButton, OutlineButton } from "../shared/Button";

const SCORES = [
  { label: "Fluency",   value: "7.0", pct: 70 },
  { label: "Vocab",     value: "7.5", pct: 75 },
  { label: "Grammar",   value: "6.5", pct: 65 },
  { label: "Pronun.",   value: "7.0", pct: 70 },
];

export default function MockTab() {
  const [screen, setScreen] = useState("setup"); 
  const [mode, setMode] = useState("full");
  const [part, setPart] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startFlow = (selectedMode) => {
    setMode(selectedMode);
    if (selectedMode === "part2") {
      setScreen("prep");
      setTimer(60);
    } else {
      setScreen("flow");
      setPart(selectedMode === "full" ? 1 : parseInt(selectedMode.replace("part", "")));
      setTimer(0);
    }
  };

  const handleStop = () => {
    setIsRecording(false);
    setScreen("evaluating");
    setTimeout(() => setScreen("result"), 3000);
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  if (screen === "setup") {
    return (
      <div className="flex flex-col gap-6 animate-tab-in">
        <div className="flex flex-col gap-1.5 pt-1">
          <h1 className="font-bold text-2xl text-white">IELTS Speaking Mock</h1>
          <p className="text-muted text-sm px-0.5">Real exam simulation with detailed AI scoring</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => startFlow("full")}
            className="bg-primary-gradient p-8 rounded-3xl flex flex-col gap-1 items-start group active:scale-[0.98] transition-all shadow-primary-glow border border-white/20 text-left relative overflow-hidden"
          >
             <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
             <span className="text-white/60 text-[10px] font-black uppercase tracking-widest relative z-10">RECOMMENDED</span>
             <h3 className="text-white font-black text-2xl mt-1 relative z-10">Start Mock Test</h3>
             <p className="text-white/80 text-sm mt-1 relative z-10 font-medium">Part 1, 2 & 3 • ~15 mins total</p>
             <div className="mt-8 bg-white text-accent font-black px-10 py-3 rounded-2xl text-sm relative z-10 shadow-xl group-hover:shadow-white/10 transition-shadow">Start Exam Now ⚡️</div>
          </button>

          <div className="grid grid-cols-2 gap-3 mt-1">
             <Card className="flex flex-col items-center py-5 text-center">
                <span className="text-muted text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">Last Score</span>
                <span className="text-white font-black text-2xl">6.5</span>
             </Card>
             <Card className="flex flex-col items-center py-5 text-center">
                <span className="text-muted text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">Best Score</span>
                <span className="text-accent font-black text-2xl">7.0</span>
             </Card>
          </div>

          <div className="grid grid-cols-1 gap-3 mt-2">
             <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Specific Part Training</h3>
             <div className="grid grid-cols-3 gap-3">
                {["1", "2", "3"].map(p => (
                  <button 
                    key={p} 
                    onClick={() => startFlow(`part${p}`)}
                    className="bg-card-raised border border-white/5 py-6 rounded-2xl flex flex-col items-center gap-2 active:scale-95 transition-all text-center group"
                  >
                    <span className="text-white font-black text-xl group-hover:text-accent transition-colors">Part {p}</span>
                    <span className="text-muted text-[10px] font-bold uppercase tracking-tighter opacity-60">Mock</span>
                  </button>
                ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "prep") {
    return (
      <div className="flex flex-col gap-8 h-full items-center justify-center p-6 animate-scale-in">
        <div className="flex flex-col items-center gap-2 text-center">
           <span className="text-muted text-[11px] font-bold uppercase tracking-widest">Part 2 Preparation</span>
           <h2 className="text-white font-black text-4xl">{timer}s</h2>
        </div>
        
        <Card className="w-full bg-card-raised p-8 flex flex-col gap-4 border-accent/20 border">
           <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📝</span>
              <h3 className="text-white font-bold text-lg">Cue Card</h3>
           </div>
           <p className="text-white text-md font-medium leading-relaxed">
             Describe a piece of technology you enjoy using. You should say:
           </p>
           <ul className="text-slate-400 text-sm flex flex-col gap-2 mt-2">
             <li>• What it is and when you got it</li>
             <li>• How often you use it</li>
             <li>• What you use it for</li>
             <li>And explain why you enjoy using it.</li>
           </ul>
        </Card>

        <PrimaryButton onClick={() => { setScreen("flow"); setTimer(0); setIsRecording(true); }}>
           Start Recording Now 🎙️
        </PrimaryButton>
      </div>
    );
  }

  if (screen === "flow") {
    return (
      <div className="flex flex-col h-full gap-8 pt-4 items-center animate-tab-in">
        <div className="w-full flex items-center justify-between px-2">
           <div className="flex flex-col">
              <span className="text-muted text-[10px] font-bold uppercase tracking-widest">Currently In</span>
              <h1 className="text-white font-black text-xl">Part {part} / 3</h1>
           </div>
           <div className="px-5 py-2.5 bg-card-raised rounded-2xl border border-white/10 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isRecording ? "bg-red animate-pulse" : "bg-white/20"}`} />
              <span className="text-white font-mono font-black text-lg">{formatTime(timer)}</span>
           </div>
        </div>

        <div className="flex-1 w-full flex flex-col items-center justify-center text-center px-4 gap-12">
           <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                 <div className="w-8 h-8 bg-accent rounded-full" />
              </div>
           </div>
           
           <div className="flex flex-col gap-4 px-6">
              <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Question</p>
              <h2 className="text-white font-black text-2xl leading-snug">
                “Do you think technology has made our lives easier or more complicated?”
              </h2>
           </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 pb-10">
           {!isRecording ? (
             <PrimaryButton onClick={() => setIsRecording(true)} className="col-span-2 py-5 shadow-primary-glow">
                Record Response 🎙️
             </PrimaryButton>
           ) : (
             <>
               <OutlineButton onClick={() => setIsRecording(false)}>Pause</OutlineButton>
               <PrimaryButton onClick={handleStop} className="bg-red border-none shadow-[0_10px_30px_rgba(239,68,68,0.3)]">
                  Stop & Submit ⏹️
               </PrimaryButton>
             </>
           )}
        </div>
      </div>
    );
  }

  if (screen === "evaluating") {
    return (
      <div className="flex flex-col flex-1 items-center justify-center gap-8 h-full animate-scale-in">
        <div className="w-24 h-24 relative">
           <div className="absolute inset-0 border-4 border-accent/20 rounded-full" />
           <div className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin" />
           <div className="absolute inset-0 flex items-center justify-center text-2xl">🤖</div>
        </div>
        <div className="flex flex-col items-center gap-2">
           <h2 className="text-white font-black text-2xl">Evaluating...</h2>
           <p className="text-muted text-sm">Analyzing your vocabulary, grammar and fluency</p>
        </div>
      </div>
    );
  }

  if (screen === "result") {
    return (
      <div className="flex flex-col gap-6 animate-tab-in pb-20">
        <div className="flex flex-col items-center gap-3 pt-6">
           <div className="w-20 h-20 bg-primary-gradient rounded-3xl flex flex-col items-center justify-center shadow-primary-glow border-4 border-white/10">
              <span className="text-white font-black text-4xl leading-none">7.5</span>
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-tighter mt-1">Overall</span>
           </div>
           <h2 className="text-white font-black text-2xl mt-2">Excellent Work!</h2>
           <p className="text-muted text-sm -mt-2">You performed better than 84% of students</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
           {SCORES.map(s => (
             <Card key={s.label} className="flex flex-col gap-4 py-6">
                <div className="flex justify-between items-center">
                   <span className="text-muted text-[10px] font-bold uppercase tracking-widest">{s.label}</span>
                   <span className="text-white font-black text-lg">{s.value}</span>
                </div>
                <div className="h-1.5 w-full bg-card-raised rounded-full overflow-hidden">
                   <div className="h-full bg-primary-gradient rounded-full" style={{ width: `${s.pct}%` }} />
                </div>
             </Card>
           ))}
        </div>

        <div className="flex flex-col gap-4 mt-2">
           <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Detailed Feedback</h3>
           <Card className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                 <span className="text-green font-bold text-xs flex items-center gap-2">✅ Strengths</span>
                 <p className="text-slate-400 text-[13px] leading-relaxed ml-6 italic">"Excellent use of complex sentences and idiomatic expressions in Part 2."</p>
              </div>
              <div className="flex flex-col gap-2">
                 <span className="text-red font-bold text-xs flex items-center gap-2">❌ Weaknesses</span>
                 <p className="text-slate-400 text-[13px] leading-relaxed ml-6 italic">"Some hesitation when discussing unfamiliar abstract topics in Part 3."</p>
              </div>
              <div className="flex flex-col gap-2">
                 <span className="text-accent font-bold text-xs flex items-center gap-2">💡 Improvements</span>
                 <div className="bg-[#4f8ef7]/5 p-4 rounded-xl2 border border-[#4f8ef7]/10 ml-6 flex flex-col gap-3">
                    <p className="text-slate-300 text-[13px] leading-relaxed font-black">Refined Version:</p>
                    <p className="text-slate-300 text-[13px] opacity-70 leading-relaxed font-medium">"From my perspective, technology is a double-edged sword..."</p>
                    <button className="text-accent text-xs font-black uppercase tracking-widest underline decoration-2 underline-offset-4 w-fit">Practice This Question Again</button>
                 </div>
              </div>
           </Card>
        </div>

        <div className="flex flex-col gap-4 mt-6">
           <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Recommended Next Step</h3>
           <Card className="bg-primary-gradient border-none p-6 flex items-center justify-between group active:scale-[0.99] transition-all cursor-pointer">
              <div className="flex flex-col gap-1">
                 <span className="text-white/60 text-[10px] font-black uppercase tracking-widest leading-none">AI RECOMMENDATION</span>
                 <h4 className="text-white font-black text-lg mt-1">Improve My Response ✨</h4>
                 <p className="text-white/80 text-xs font-medium max-w-[180px]">Rewrite your Part 2 answer to achieve a Band 8.5.</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white font-black text-lg group-hover:scale-110 transition-transform">
                 GO
              </div>
           </Card>
        </div>

        <div className="flex flex-col gap-3 mt-6">
           <PrimaryButton onClick={() => setScreen("setup")} className="py-5 shadow-primary-glow">Redo Specific Part 🔄</PrimaryButton>
           <OutlineButton onClick={() => setScreen("setup")}>Return to Dashboard</OutlineButton>
        </div>
      </div>
    );
  }

  return null;
}
