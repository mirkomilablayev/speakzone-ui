import { useEffect } from "react";
import { useSessionStore } from "../../stores/useSessionStore";
import { useTelegram } from "../../hooks/useTelegram";

const MOCK_DATA = [
  { id:1, title:"IELTS Mock Test #1", duration:"15 min", status:"completed", score:"6.5", parts:"CV, Robots, Study Abroad" },
  { id:2, title:"IELTS Mock Test #2", duration:"15 min", status:"available", score:null, parts:"Travel, Work, Education" },
  { id:3, title:"IELTS Mock Test #3", duration:"15 min", status:"available", score:null, parts:"Health, Culture, Family" },
  { id:4, title:"IELTS Mock Test #4", duration:"15 min", status:"locked",    score:null, parts:"Environment, Technology" },
  { id:5, title:"IELTS Mock Test #5", duration:"15 min", status:"locked",    score:null, parts:"Media, Cities, Nature" },
];

const SCORES = [
  { label:"Fluency",     value:"7.0", pct:70 },
  { label:"Vocabulary",  value:"7.5", pct:75 },
  { label:"Grammar",     value:"6.5", pct:65 },
  { label:"Pronun.",     value:"7.0", pct:70 },
];

const MicIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 11c0 3.866 3.134 7 7 7s7-3.134 7-7"/><path d="M12 18v4M9 22h6"/>
  </svg>
);

export default function MockTab({ onGetPremium }) {
  const { screen, selectedMock, isRecording, timer, startSession, stopSession, setScreen, incrementTimer } = useSessionStore();
  const { hapticFeedback } = useTelegram();

  useEffect(() => {
    if (!isRecording) return;
    const id = setInterval(incrementTimer, 1000);
    return () => clearInterval(id);
  }, [isRecording, incrementTimer]);

  const handleAction = (mock) => {
    if (mock.status === "locked")    { onGetPremium(); return; }
    if (mock.status === "available") { hapticFeedback("impact"); startSession(mock); }
  };

  const handleStop = () => {
    hapticFeedback("success");
    stopSession();
    setTimeout(() => setScreen("result"), 3000);
  };

  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  /* ── LIST ── */
  if (screen === "list") return (
    <div className="flex flex-col gap-5 animate-tab-in pb-24">
      <div className="pt-2">
        <h1 className="text-white font-black text-2xl tracking-tight">IELTS Mock Tests</h1>
        <p className="text-muted text-[13px] mt-1">Full speaking exam simulation with AI scoring</p>
      </div>

      <div className="flex flex-col gap-3">
        {MOCK_DATA.map((m) => {
          const done  = m.status === "completed";
          const avail = m.status === "available";
          const lock  = m.status === "locked";
          return (
            <button key={m.id} onClick={() => handleAction(m)}
              className={`w-full text-left bg-surface rounded-2xl p-5 flex flex-col gap-3 transition-all active:scale-[0.99] relative overflow-hidden ${
                done  ? "border-l-[3px] border-l-green"   :
                avail ? "border-l-[3px] border-l-teal"    :
                        "opacity-55 border-l-[3px] border-l-hint"}`}
            >
              {lock && (
                <div className="absolute top-4 right-4 bg-amber/15 border border-amber/30 rounded-lg px-2 py-1 flex items-center gap-1">
                  <span className="text-amber text-[10px] font-bold uppercase tracking-wider">PRO</span>
                </div>
              )}
              <div className="flex items-start justify-between pr-12">
                <div className="flex flex-col gap-1">
                  <span className="text-white font-bold text-[15px] tracking-tight">{m.title}</span>
                  <span className="text-muted text-[11px]">{m.parts}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-hint text-[10px] font-semibold uppercase tracking-wider">{m.duration} · 3 Parts</span>
                {done ? (
                  <span className="flex items-center gap-1.5 bg-green/10 border border-green/25 rounded-full px-3 py-1 text-green text-[10px] font-bold uppercase tracking-wider">
                    ✓ Band {m.score}
                  </span>
                ) : avail ? (
                  <span className="bg-teal text-black font-bold px-4 py-1.5 rounded-full text-[11px] tracking-wide">
                    Begin →
                  </span>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  /* ── FLOW ── */
  if (screen === "flow") return (
    <div className="flex flex-col h-full animate-tab-in">
      {/* Header */}
      <div className="flex items-center justify-between pt-4 pb-6">
        <div className="flex flex-col gap-0.5">
          <span className="text-muted text-[10px] font-semibold uppercase tracking-widest">Part 1 / 3</span>
          <span className="text-white font-bold text-[15px]">{selectedMock?.title}</span>
        </div>
        <div className="flex items-center gap-2 bg-surface border border-white/5 rounded-xl px-4 py-2">
          <div className={`w-2 h-2 rounded-full ${isRecording ? "bg-red animate-pulse" : "bg-hint"}`} aria-hidden="true"/>
          <span className="text-white font-black text-lg font-mono" aria-live="polite">{fmt(timer)}</span>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2 mb-6">
        {[1,2,3].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i===1 ? "bg-teal" : "bg-hint"}`}/>
        ))}
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 px-2">
        <div className="bg-elevated rounded-3xl p-8 w-full shadow-card-lg border border-white/5">
          <span className="text-teal text-[10px] font-bold uppercase tracking-widest block mb-4">Question</span>
          <h2 className="text-white font-black text-[22px] leading-snug tracking-tight">
            "Describe a place you would like to visit in the future."
          </h2>
        </div>
        {isRecording && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center text-teal animate-mic-pulse shadow-teal-glow">
              <MicIcon />
            </div>
            <span className="text-muted text-xs font-semibold uppercase tracking-widest">Recording…</span>
          </div>
        )}
      </div>

      {/* Stop */}
      <div className="pb-10 pt-4">
        <button onClick={handleStop}
          className="w-full bg-red/10 border border-red/30 text-red font-bold py-4 rounded-xl text-[14px] tracking-wide active:scale-[0.98] transition-all">
          Stop & Submit Test
        </button>
      </div>
    </div>
  );

  /* ── EVALUATING ── */
  if (screen === "evaluating") return (
    <div className="flex flex-col flex-1 items-center justify-center gap-6 h-full animate-scale-in" role="status" aria-live="polite">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-2 border-teal/15"/>
        <div className="absolute inset-0 rounded-full border-2 border-teal border-t-transparent animate-spin"/>
        <div className="absolute inset-0 flex items-center justify-center text-2xl" aria-hidden="true">🤖</div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-white font-black text-xl">Analyzing your response</h2>
        <p className="text-muted text-sm">AI is scoring your speaking…</p>
      </div>
    </div>
  );

  /* ── RESULT ── */
  if (screen === "result") return (
    <div className="flex flex-col gap-5 animate-tab-in pb-20">
      {/* Overall score */}
      <div className="flex flex-col items-center gap-2 pt-4">
        <div className="w-24 h-24 rounded-3xl bg-elevated border-2 border-teal/30 flex flex-col items-center justify-center shadow-teal-glow">
          <span className="text-teal font-black text-4xl leading-none">7.5</span>
          <span className="text-muted text-[10px] font-semibold uppercase tracking-wider mt-1">Overall</span>
        </div>
        <h2 className="text-white font-black text-2xl mt-2">Mock Complete!</h2>
        <p className="text-muted text-sm text-center px-6">Great performance — you're improving fast.</p>
      </div>

      {/* Criteria grid */}
      <div className="grid grid-cols-2 gap-3">
        {SCORES.map(s => (
          <div key={s.label} className="bg-surface rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-muted text-[10px] font-bold uppercase tracking-wider">{s.label}</span>
              <span className="text-white font-black text-lg">{s.value}</span>
            </div>
            <div className="h-1.5 w-full bg-hint rounded-full overflow-hidden">
              <div className="h-full bg-teal rounded-full" style={{ width:`${s.pct}%` }}/>
            </div>
          </div>
        ))}
      </div>

      {/* Strengths */}
      <div className="bg-surface rounded-2xl p-5 flex flex-col gap-3">
        <span className="text-teal text-[10px] font-bold uppercase tracking-widest">Strengths</span>
        {["Good use of linking words","Natural intonation patterns","Detailed vocabulary choices"].map((s,i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="text-teal mt-0.5 shrink-0">•</span>
            <span className="text-white/80 text-[13px] font-medium leading-snug">{s}</span>
          </div>
        ))}
      </div>

      {/* Improvements */}
      <div className="bg-surface rounded-2xl p-5 flex flex-col gap-3">
        <span className="text-amber text-[10px] font-bold uppercase tracking-widest">Areas to Improve</span>
        {["Hesitation fillers (um, uh) detected 4×","Simplify complex grammar structures","Vary sentence length more"].map((s,i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="text-amber mt-0.5 shrink-0">•</span>
            <span className="text-white/80 text-[13px] font-medium leading-snug">{s}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <button onClick={()=>setScreen("list")}
          className="w-full bg-teal text-black font-bold py-4 rounded-xl text-[14px] tracking-wide shadow-teal-glow active:scale-[0.98] transition-all">
          Retake This Mock
        </button>
        <button onClick={()=>setScreen("list")}
          className="w-full text-muted text-[13px] font-semibold py-3 transition-all active:text-white">
          ← Back to Mocks
        </button>
      </div>
    </div>
  );

  return null;
}
