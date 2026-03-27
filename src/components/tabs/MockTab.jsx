import { useState, useEffect } from "react";
import Card from "../shared/Card";
import { PrimaryButton, OutlineButton } from "../shared/Button";

const MOCK_LIST = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `IELTS Mock Test #${i + 1}`,
  duration: "15 min",
  isFree: i < 5,
  status: i === 0 ? "completed" : "available",
  score: i === 0 ? "6.5" : null
}));

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

  const handleStart = (mock) => {
    if (!mock.isFree) {
      onGetPremium();
      return;
    }
    setSelectedMock(mock);
    setScreen("flow");
    setIsRecording(true);
    setTimer(0);
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
          <h1 className="font-bold text-2xl text-white">Available Mocks</h1>
          <p className="text-muted text-sm px-0.5">Select a full-length simulation to begin</p>
        </div>

        <div className="flex flex-col gap-3">
          {MOCK_LIST.map((m) => (
            <Card 
               key={m.id} 
               onClick={() => handleStart(m)}
               className={`flex items-center justify-between py-6 transition-all group cursor-pointer relative overflow-hidden ${
                 !m.isFree ? "opacity-50 grayscale select-none" : "hover:bg-card-raised/80 active:scale-[0.98]"
               }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black ${
                    m.isFree ? "bg-accent/10 text-accent" : "bg-white/5 text-muted"
                 }`}>
                    {m.id}
                 </div>
                 <div className="flex flex-col gap-0.5">
                    <h3 className="text-white font-black text-sm">{m.title}</h3>
                    <div className="flex items-center gap-2">
                       <span className="text-muted text-[10px] font-bold uppercase tracking-widest">{m.duration}</span>
                       {m.status === "completed" && <span className="text-green text-[9px] font-black uppercase bg-green/10 px-1.5 py-0.5 rounded">Completed</span>}
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-3 relative z-10">
                 {m.score && (
                   <span className="text-white font-black text-lg bg-card-raised px-3 py-1 rounded-lg border border-white/5">{m.score}</span>
                 )}
                 {!m.isFree ? (
                   <span className="text-muted text-xl">🔒</span>
                 ) : (
                   <span className="text-accent text-lg font-black group-hover:translate-x-1 transition-transform">▶</span>
                 )}
              </div>

              {!m.isFree && (
                 <div className="absolute inset-x-0 bottom-0 py-1 bg-accent/20 flex justify-center backdrop-blur-sm">
                    <span className="text-accent text-[8px] font-black uppercase tracking-widest">Upgrade to PRO</span>
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
           <h2 className="text-white font-black text-2xl mt-2 text-center">Mock Complete!</h2>
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
