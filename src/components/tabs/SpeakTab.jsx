import { useState, useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";

const STAGES = {
  HOME: "HOME",
  PREP: "PREP",
  RECORD: "RECORD",
  PLAYBACK: "PLAYBACK",
  LOADING: "LOADING",
  RESULT: "RESULT"
};

const MicIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 11c0 3.866 3.134 7 7 7s7-3.134 7-7"/><path d="M12 18v4M9 22h6"/>
  </svg>
);

const SCORES = [
  { label: "Fluency",     value: "7.0", pct: 70 },
  { label: "Vocabulary",  value: "8.0", pct: 80 },
  { label: "Grammar",     value: "7.5", pct: 75 },
  { label: "Pronun.",     value: "7.0", pct: 70 },
];

export default function SpeakTab({ onGetPremium }) {
  const { hapticFeedback } = useTelegram();
  const [stage, setStage] = useState(STAGES.HOME);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (stage === STAGES.PREP) {
      if (timer > 0) {
        const id = setTimeout(() => setTimer(timer - 1), 1000);
        return () => clearTimeout(id);
      } else {
        hapticFeedback("impact");
        setStage(STAGES.RECORD);
        setTimer(120);
      }
    } else if (stage === STAGES.RECORD) {
      if (timer > 0) {
        const id = setTimeout(() => setTimer(timer - 1), 1000);
        return () => clearTimeout(id);
      } else {
        hapticFeedback("success");
        setStage(STAGES.PLAYBACK);
      }
    }
  }, [stage, timer, hapticFeedback]);

  const handleStart = () => {
    hapticFeedback("impact");
    setStage(STAGES.PREP);
    setTimer(60);
  };

  const handleStopEarly = () => {
    hapticFeedback("success");
    setStage(STAGES.PLAYBACK);
  };

  const handleGetInsights = () => {
    hapticFeedback("impact");
    setStage(STAGES.LOADING);
    setTimeout(() => {
      setStage(STAGES.RESULT);
      hapticFeedback("success");
    }, 2500);
  };

  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  if (stage === STAGES.RESULT) {
    return (
      <div className="flex flex-col gap-6 animate-tab-in pb-24 pt-2">
        <h1 className="text-white font-black text-[26px] tracking-tight text-center">Insights Report</h1>
        
        {/* Overall score */}
        <div className="flex flex-col items-center gap-2 -mt-2">
          <div className="w-24 h-24 rounded-3xl bg-elevated border-2 border-teal/30 flex flex-col items-center justify-center shadow-teal-glow">
            <span className="text-teal font-black text-4xl leading-none">7.5</span>
            <span className="text-muted text-[10px] font-semibold uppercase tracking-wider mt-1">Band</span>
          </div>
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

        {/* Filler & Details */}
        <div className="bg-surface rounded-2xl p-5 flex items-center justify-between border-l-[3px] border-amber">
          <div className="flex flex-col">
            <span className="text-white font-bold text-[14px]">Filler Words Detected</span>
            <span className="text-muted text-[12px] mt-0.5">You said "um", "like" 6 times.</span>
          </div>
          <span className="text-amber font-black text-xl">6</span>
        </div>

        {/* Strengths */}
        <div className="bg-surface rounded-2xl p-5 flex flex-col gap-3">
          <span className="text-teal text-[10px] font-bold uppercase tracking-widest">Strengths</span>
          {["Great pacing and flow","Excellent topic vocabulary mapping","Natural connecting phrases"].map((s,i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="text-teal mt-0.5 shrink-0">•</span>
              <span className="text-white/80 text-[13px] font-medium leading-snug">{s}</span>
            </div>
          ))}
        </div>

        {/* Improvements */}
        <div className="bg-surface rounded-2xl p-5 flex flex-col gap-3">
          <span className="text-amber text-[10px] font-bold uppercase tracking-widest">Areas to Improve</span>
          {["Repeating grammatical forms","Overusing basic transition words"].map((s,i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="text-amber mt-0.5 shrink-0">•</span>
              <span className="text-white/80 text-[13px] font-medium leading-snug">{s}</span>
            </div>
          ))}
        </div>

        {/* Vocabulary Highlights */}
        <div className="bg-surface rounded-2xl p-5 flex flex-col gap-3">
          <span className="text-muted text-[10px] font-bold uppercase tracking-widest">Vocabulary Highlights</span>
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex items-center gap-2">
              <span className="bg-green/15 text-green text-[11px] font-bold px-2 py-1 rounded">Excellent use:</span>
              <span className="text-white text-[13px] font-semibold">"Detrimental impact"</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-amber/15 text-amber text-[11px] font-bold px-2 py-1 rounded">Instead of "bad":</span>
              <span className="text-white text-[13px] font-semibold text-amber">"Adverse"</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button onClick={onGetPremium} className="w-full bg-surface border border-white/5 text-white font-bold py-4 rounded-xl text-[14px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
            <span aria-hidden="true" className="text-muted">🔒</span> Share Card
          </button>
          <button onClick={() => setStage(STAGES.HOME)} className="w-full bg-teal text-black font-bold py-4 rounded-xl text-[14px] shadow-teal-glow mt-2 active:scale-[0.98] transition-all tracking-wide">
            Try Another
          </button>
        </div>
      </div>
    );
  }

  if (stage === STAGES.LOADING) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-6 animate-scale-in" role="status">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-2 border-teal/15"/>
          <div className="absolute inset-0 rounded-full border-2 border-teal border-t-transparent animate-spin"/>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-white font-black text-xl">Analyzing your response</h2>
          <p className="text-muted text-sm">Identifying filler words & grammar…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full pb-20 pt-2 animate-tab-in">
      <div className="flex flex-col gap-1 items-center pb-6">
        <h1 className="text-white font-black text-[22px] tracking-tight">Improve Your Speaking</h1>
        <p className="text-muted text-[13px] font-medium">Random IELTS Part 2 Questions</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full -mt-10">
        
        {/* Timers above the mic if active */}
        {(stage === STAGES.PREP || stage === STAGES.RECORD) && (
          <div className="flex flex-col items-center animate-fade-in absolute top-[140px]">
             <span className="text-white font-black font-mono text-[40px] leading-none mb-1">{fmt(timer)}</span>
             <span className={`text-[12px] font-bold uppercase tracking-widest ${stage === STAGES.RECORD ? "text-red animate-pulse" : "text-amber"}`}>
               {stage === STAGES.PREP ? "PREP TIME" : "RECORDING"}
             </span>
          </div>
        )}

        {/* ── Cue Card ── */}
        <div className={`w-full bg-elevated rounded-3xl p-6 shadow-card border transition-all duration-300 ${stage === STAGES.RECORD ? 'opacity-30 border-white/5 scale-95 mt-[180px]' : 'border-white/10 mt-6'}`}>
          <div className="flex items-center justify-between mb-5">
            <span className="bg-teal/15 text-teal text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">Part 2 Topic</span>
            {stage === STAGES.HOME && (
              <button aria-label="Refresh question" className="text-muted active:scale-90 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M21 2v6h-6"/><path d="M3 12a9 9 0 1 0 2.13-5.85L2 9"/>
                </svg>
              </button>
            )}
          </div>
          <h2 className="text-white font-black text-[22px] leading-snug tracking-tight mb-4">
            Describe a piece of modern technology you find difficult to use.
          </h2>
          <div className="text-white/70 text-[14px] font-medium leading-relaxed italic space-y-1">
            <p>You should say:</p>
            <ul className="list-disc pl-5">
              <li>what it is</li>
              <li>what it is used for</li>
              <li>how often you use it</li>
              <li>and explain why you find it difficult.</li>
            </ul>
          </div>
        </div>

        {stage === STAGES.HOME && (
          <p className="text-muted text-[12px] font-medium mt-1">You have 1 minute to prepare before recording.</p>
        )}

        {stage === STAGES.RECORD && (
          <div className="w-24 h-24 bg-teal/10 rounded-full flex items-center justify-center text-teal animate-mic-pulse shadow-teal-glow mt-8">
            <MicIcon />
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-3">
        {stage === STAGES.HOME && (
          <button onClick={handleStart} className="w-full bg-teal text-black font-bold py-4 rounded-xl text-[15px] shadow-teal-glow active:scale-[0.98] transition-all tracking-wide">
            Start Speaking
          </button>
        )}
        
        {stage === STAGES.PREP && (
          <button disabled className="w-full bg-surface text-muted font-bold py-4 rounded-xl text-[15px] transition-all tracking-wide opacity-80 border border-white/5 cursor-not-allowed">
            Start Speaking
          </button>
        )}

        {stage === STAGES.RECORD && (
          <button onClick={handleStopEarly} className="w-full text-muted text-[13px] font-bold py-3 transition-colors hover:text-white uppercase tracking-widest">
            Stop Early
          </button>
        )}

        {stage === STAGES.PLAYBACK && (
          <div className="flex flex-col gap-6 animate-slide-up bg-surface border border-white/5 rounded-2xl p-5 shadow-card-lg mt-4">
            <div className="flex items-center gap-4">
              <button aria-label="Play" className="w-12 h-12 bg-teal text-black rounded-full flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z"/></svg>
              </button>
              <div className="flex-1 h-1.5 bg-hint rounded-full overflow-hidden">
                <div className="h-full bg-teal rounded-full w-1/3" />
              </div>
              <span className="text-muted font-mono text-xs font-bold">1:45</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setStage(STAGES.HOME)} className="flex-1 border border-hint text-muted font-bold py-3.5 rounded-xl text-[14px] active:scale-[0.98] transition-all">
                Re-record
              </button>
              <button onClick={handleGetInsights} className="flex-1 bg-teal text-black font-bold py-3.5 rounded-xl text-[14px] shadow-teal-glow active:scale-[0.98] transition-all">
                Get Insights
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
