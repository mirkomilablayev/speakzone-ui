import { useState, useEffect } from "react";
import Card from "../shared/Card";
import { PrimaryButton, OutlineButton } from "../shared/Button";

const MOCK_DATA = [
  { id: 1, title: "IELTS Mock Test #1", duration: "15 min", status: "completed", score: "6.5", isFree: true },
  { id: 2, title: "IELTS Mock Test #2", duration: "15 min", status: "available", score: null, isFree: true },
  { id: 3, title: "IELTS Mock Test #3", duration: "15 min", status: "available", score: null, isFree: true },
  { id: 4, title: "IELTS Mock Test #4", duration: "15 min", status: "locked",    score: null, isFree: false },
  { id: 5, title: "IELTS Mock Test #5", duration: "15 min", status: "locked",    score: null, isFree: false },
  { id: 6, title: "IELTS Mock Test #6", duration: "15 min", status: "locked",    score: null, isFree: false },
  { id: 7, title: "IELTS Mock Test #7", duration: "15 min", status: "locked",    score: null, isFree: false },
];

const SCORES = [
  { label: "Fluency",   value: "7.0", pct: 70 },
  { label: "Vocab",     value: "7.5", pct: 75 },
  { label: "Grammar",   value: "6.5", pct: 65 },
  { label: "Pronun.",   value: "7.0", pct: 70 },
];

export default function MockTab({ onGetPremium }) {
  const [screen, setScreen] = useState("list"); 
  const [selectedMock, setSelectedMock] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleAction = (mock) => {
    if (mock.status === "locked") {
      onGetPremium();
      return;
    }
    if (mock.status === "available") {
      setSelectedMock(mock);
      setScreen("flow");
      setIsRecording(true);
      setTimer(0);
    }
  };

  const handleStop = () => {
    setIsRecording(false);
    setScreen("evaluating");
    setTimeout(() => setScreen("result"), 3000);
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  if (screen === "list") {
    return (
      <div className="flex flex-col gap-6 animate-tab-in pb-24">
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center justify-between">
             <h1 className="font-bold text-2xl text-white">Your Speaking Tests</h1>
             <span className="text-accent text-[9px] font-black uppercase tracking-widest border border-accent/20 px-2.5 py-1 rounded-full bg-accent/5">3 free tests</span>
          </div>
          <p className="text-muted text-sm px-0.5 opacity-60">Practice results & band score feedback</p>
        </div>

        {/* UNIFIED TEST LIST (ONE LIST ONLY) */}
        <div className="flex flex-col gap-3">
          {MOCK_DATA.map((m) => (
            <Card 
               key={m.id} 
               onClick={() => handleAction(m)}
               className={`flex flex-col gap-4 py-5 transition-all cursor-pointer group relative overflow-hidden ${
                 m.status === "locked" ? "opacity-75 bg-card-raised/50 border-white/5 grayscale-[0.3]" : "bg-card-raised border-white/5 active:scale-[0.99]"
               } ${m.id === 1 ? "border-accent/30 shadow-primary-glow/10 py-6" : ""}`}
            >
              <div className="flex items-center justify-between px-1">
                 <div className="flex flex-col gap-1">
                    <h3 className={`text-white font-black ${m.id === 1 ? "text-xl" : "text-[16px]"}`}>{m.title}</h3>
                    {m.status === "completed" ? (
                      <div className="flex items-center gap-2">
                         <span className="text-green text-[9px] font-black uppercase tracking-widest bg-green/10 px-2 py-0.5 rounded">✓ Completed</span>
                         <span className="text-white/40 text-[10px] font-bold">Band Score: {m.score}</span>
                      </div>
                    ) : m.status === "locked" ? (
                      <div className="flex items-center gap-1.5">
                         <span className="text-muted text-[10px] font-bold uppercase tracking-widest">Get full access (PRO)</span>
                      </div>
                    ) : (
                      <span className="text-muted text-[10px] font-bold tracking-tight uppercase opacity-60">15 min speaking test</span>
                    )}
                 </div>
                 
                 {m.status === "available" ? (
                    <button className="flex items-center gap-2 bg-white text-accent font-black px-5 py-2.5 rounded-xl text-xs active:scale-95 transition-all shadow-primary-glow group-hover:scale-105">
                       ▶ Start
                    </button>
                 ) : m.status === "locked" ? (
                    <button className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/40 font-black px-5 py-2.5 rounded-xl text-xs group-hover:bg-white/10 group-hover:text-white transition-all">
                       🔒 PRO
                    </button>
                 ) : (
                    <div className="w-12 h-12 bg-card-raised border border-white/10 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                       {m.score}
                    </div>
                 )}
              </div>

              {m.status === "completed" && (
                 <div className="flex gap-2 px-1">
                    <button className="flex-1 py-3 bg-accent/10 border border-accent/20 rounded-xl text-accent text-[10px] font-black uppercase tracking-widest hover:bg-accent/20 transition-all font-syne">
                       View Analysis
                    </button>
                 </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (screen === "flow") {
    return (
      <div className="flex flex-col h-full gap-8 pt-4 items-center animate-tab-in">
        <div className="w-full flex items-center justify-between px-2">
           <div className="flex flex-col">
              <span className="text-muted text-[10px] font-bold uppercase tracking-widest">{selectedMock?.title}</span>
              <h1 className="text-white font-black text-xl">Part 1 / 3</h1>
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
              <h2 className="text-white font-black text-2xl leading-snug">“Describe a place you would like to visit in the future.”</h2>
           </div>
        </div>
        <div className="w-full grid grid-cols-1 pb-10">
           <PrimaryButton onClick={handleStop} className="bg-red border-none shadow-[0_10px_30px_rgba(239,68,68,0.3)] py-5">
              Stop & Submit Test ⏹️
           </PrimaryButton>
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
        <h2 className="text-white font-black text-2xl">Analyzing...</h2>
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
           <h2 className="text-white font-black text-2xl mt-2 text-center text-shadow-glow">Mock Complete!</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
           {SCORES.map(s => (
             <Card key={s.label} className="flex flex-col gap-4 py-6">
                <div className="flex justify-between items-center">
                   <span className="text-muted text-[10px] font-bold uppercase tracking-widest">{s.label}</span>
                   <span className="text-white font-black text-lg">{s.value}</span>
                </div>
                <div className="h-1.5 w-full bg-card-raised rounded-full overflow-hidden"><div className="h-full bg-primary-gradient rounded-full" style={{ width: `${s.pct}%` }} /></div>
             </Card>
           ))}
        </div>
        <div className="flex flex-col gap-3 mt-4">
           <PrimaryButton onClick={() => setScreen("list")} className="py-5 shadow-primary-glow">Redo Mock 🔄</PrimaryButton>
           <OutlineButton onClick={() => setScreen("list")}>Return to List</OutlineButton>
        </div>
      </div>
    );
  }

  return null;
}
