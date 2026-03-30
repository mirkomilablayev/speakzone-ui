import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePracticeStore } from "../../stores/usePracticeStore";

const VOCAB_TOPICS = [
  { id: 1, title: "Education & Learning", icon: "🎓",   status: "in_progress", words: 12, total: 20, isFree: true },
  { id: 2, title: "Technology",           icon: "💻",   status: "mastered",    words: 20, total: 20, isFree: true },
  { id: 3, title: "Work & Careers",       icon: "💼",   status: "new",         words: 0,  total: 18, isFree: true },
  { id: 4, title: "Environment",          icon: "🌍",   status: "new",         words: 0,  total: 25, isFree: true },
  { id: 5, title: "Health",               icon: "🏃",   status: "new",         words: 0,  total: 22, isFree: true },
  { id: 6, title: "Culture & Travel",     icon: "✈️",   status: "locked",      words: 0,  total: 30, isFree: false },
  { id: 7, title: "Global Issues",        icon: "🌐",   status: "locked",      words: 0,  total: 24, isFree: false },
  { id: 8, title: "Arts & Media",         icon: "🎨",   status: "locked",      words: 0,  total: 19, isFree: false },
];

const MOCK_VOCAB_DETAIL = {
  title: "Education & Learning",
  icon: "🎓",
  words: [
    { word: "pursue a degree",         status: "mastered" },
    { word: "higher education system", status: "due" },
    { word: "vocational training",     status: "new" },
    { word: "compulsory education",    status: "new" },
  ],
};

const VOCAB_CARD = {
  word: "vocational training",
  pos: "noun phrase",
  def: "Education and skills training that prepares you for a specific occupation or trade.",
  example: '"I opted for vocational training rather than university because I wanted practical skills."',
  synonyms: ["practical education", "skills training", "apprenticeship"],
  collocations: ["undergo vocational training", "provide vocational training"],
  band: "B2",
};

export default function PracticeTab({ onGetPremium }) {
  const { t } = useTranslation();
  const { screen, setScreen } = usePracticeStore();
  const [learningMode, setLearningMode] = useState(false);

  /* ── OLD IMPROVE FLOW (Kept for compatibility, styled dark/teal) ── */
  if (screen === "improve") {
    return (
      <div className="flex flex-col gap-5 pb-24 animate-tab-in pt-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setScreen("home")} className="text-muted text-xl p-2 active:scale-90 transition-transform">←</button>
          <h1 className="text-white font-black text-2xl tracking-tight">Improve Answer</h1>
        </div>
        <div className="bg-surface rounded-3xl p-8 flex flex-col items-center text-center gap-4 shadow-card">
          <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center text-2xl" aria-hidden="true">✨</div>
          <div>
            <h3 className="text-white font-bold text-[17px]">Ready to refine?</h3>
            <p className="text-muted text-[13px] mt-1 leading-relaxed">Speak or type your answer. AI will rewrite it using Band 8.5 vocabulary.</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-2">
          <div className="bg-elevated border border-white/5 rounded-2xl p-6 h-32 flex items-center justify-center text-muted text-[13px] italic">
            Waiting for input...
          </div>
          <button className="w-full bg-teal text-black font-bold py-4 rounded-xl text-[14px] shadow-teal-glow mt-4 active:scale-95 transition-all">Record Voice 🎙️</button>
          <button className="w-full border border-teal/30 text-teal py-4 rounded-xl text-[14px] font-semibold active:scale-95 transition-all">Type Response ⌨️</button>
        </div>
      </div>
    );
  }

  /* ── VOCAB DETAIL / LEARNING CARD ── */
  if (screen === "vocab_detail") {
    if (learningMode) {
      const v = VOCAB_CARD;
      return (
        <div className="flex flex-col h-full animate-tab-in p-4 justify-center relative">
          <button onClick={() => setLearningMode(false)} className="absolute top-4 left-4 text-muted p-2 text-xl z-20">✕</button>
          
          <div className="w-full h-1 bg-hint rounded-full absolute top-16 left-0 right-0 max-w-[398px] mx-auto overflow-hidden">
            <div className="h-full bg-teal rounded-full w-[25%]" />
          </div>
          <p className="text-center text-muted text-[11px] font-bold uppercase tracking-widest absolute top-20 w-full left-0">Word 1 of 4</p>

          <div className="bg-elevated rounded-3xl p-6 w-full shadow-card-lg border border-hint flex flex-col mt-10">
            <span className="text-muted text-[11px] font-medium tracking-wide mb-1 opacity-80">{v.pos}</span>
            <h2 className="text-white font-black text-3xl tracking-tight mb-4">{v.word}</h2>
            <p className="text-white/80 text-[15px] leading-relaxed mb-6">{v.def}</p>
            <p className="text-muted text-[14px] italic leading-relaxed border-l-2 border-teal/30 pl-3 mb-6">{v.example}</p>
            
            <div className="flex flex-col gap-4 mt-auto">
              <div className="flex flex-wrap gap-2">
                {v.synonyms.map(s => (
                  <span key={s} className="bg-teal/15 text-teal text-[11px] font-bold px-2.5 py-1 rounded-md">{s}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {v.collocations.map(c => (
                  <span key={c} className="bg-hint text-muted text-[11px] font-bold px-2.5 py-1 rounded-md">{c}</span>
                ))}
              </div>
            </div>
            
            <span className="absolute bottom-5 right-5 text-amber font-black text-xs uppercase tracking-widest">
              Band {v.band}
            </span>
          </div>

          <div className="flex flex-col gap-3 w-full mt-8">
            <button className="w-full bg-teal text-black font-bold py-4 rounded-xl text-[14px] shadow-teal-glow active:scale-[0.98] transition-all">I know this</button>
            <button className="w-full border border-amber/40 text-amber font-semibold py-4 rounded-xl text-[14px] active:scale-[0.98] transition-all bg-amber/5">Still learning</button>
            <button className="w-full border border-hint text-muted font-semibold py-4 rounded-xl text-[14px] active:scale-[0.98] transition-all">Don't know</button>
          </div>
        </div>
      );
    }

    const v = MOCK_VOCAB_DETAIL;
    return (
      <div className="flex flex-col gap-6 animate-tab-in pb-24 pt-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setScreen("home")} className="text-muted text-xl p-2 active:scale-95 transition-transform">←</button>
          <div className="flex flex-col">
            <span className="text-muted text-[10px] font-bold uppercase tracking-widest">{v.words.length} Words</span>
            <h1 className="text-white font-black text-xl tracking-tight leading-none">{v.icon} {v.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setLearningMode(true)} className="bg-teal text-black font-bold py-3.5 rounded-xl text-[13px] shadow-teal-glow active:scale-[0.98] transition-all text-center">Start Learning</button>
          <button onClick={() => setLearningMode(true)} className="bg-amber/10 border border-amber/30 text-amber font-bold py-3.5 rounded-xl text-[13px] shadow-amber-glow active:scale-[0.98] transition-all text-center">Review Due (1)</button>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          {v.words.map((w, i) => (
            <button key={i} onClick={() => setLearningMode(true)} className="bg-surface rounded-xl p-4 flex items-center justify-between active:scale-[0.98] transition-all">
              <span className="text-white font-semibold text-[14px] tracking-tight">{w.word}</span>
              <div className="flex items-center gap-3">
                {w.status === "mastered" && <span className="text-teal text-[9px] font-black uppercase tracking-wider bg-teal/10 px-2 py-0.5 rounded">Mastered</span>}
                {w.status === "due" && <span className="text-amber text-[9px] font-black uppercase tracking-wider bg-amber/10 px-2 py-0.5 rounded">Due</span>}
                {w.status === "new" && <span className="text-muted text-[9px] font-black uppercase tracking-wider bg-hint px-2 py-0.5 rounded">New</span>}
                <span className="text-muted opacity-40 text-lg leading-none shrink-0›" aria-hidden="true">›</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ── MAIN VOCAB HOME ── */
  return (
    <div className="flex flex-col gap-5 pb-24 animate-tab-in pt-2">
      {/* Title & subtitle */}
      <div className="flex flex-col gap-1">
        <h1 className="text-white font-black text-[26px] tracking-tight">Vocabulary by Topic</h1>
        <p className="text-muted text-[13px] font-medium opacity-90">Curated high-score phrases for speaking</p>
      </div>

      {/* Progress summary */}
      <div className="flex flex-col gap-2">
        <span className="text-white font-semibold text-[13px]">You have mastered <strong className="text-teal">32</strong> of 480 words.</span>
        <div className="w-full h-1 bg-hint rounded-full overflow-hidden">
          <div className="h-full bg-teal rounded-full" style={{ width: "8%" }} />
        </div>
      </div>

      {/* Vocab due card */}
      <div className="bg-surface rounded-2xl p-4 flex items-center justify-between shadow-sm amber-edge">
        <div className="flex flex-col gap-0.5">
          <span className="text-white font-bold text-[14px]">12 words due</span>
          <span className="text-amber text-[11px] font-semibold">Keep your memory fresh</span>
        </div>
        <button className="bg-amber/10 text-amber font-bold text-[12px] px-4 py-2 rounded-lg border border-amber/20 active:scale-95 transition-all">
          Review Now →
        </button>
      </div>

      {/* Topic Grid */}
      <div className="grid grid-cols-2 gap-3 mt-1">
        {VOCAB_TOPICS.map((topic) => {
          const isLocked = !topic.isFree;
          return (
            <button
              key={topic.id}
              onClick={() => { if (isLocked) onGetPremium(); else setScreen("vocab_detail"); }}
              className={`bg-surface rounded-2xl p-4 flex flex-col items-start gap-4 active:scale-[0.98] transition-all relative overflow-hidden h-32 ${isLocked ? "opacity-60" : ""}`}
            >
              <div className="w-full flex justify-between items-start">
                <span className="text-2xl leading-none" aria-hidden="true">{topic.icon}</span>
                {topic.status === "mastered" && <span className="text-teal text-[9px] font-black uppercase tracking-wider bg-teal/10 border border-teal/20 px-1.5 py-0.5 rounded">Mastered</span>}
                {topic.status === "in_progress" && <span className="text-amber text-[9px] font-black uppercase tracking-wider bg-amber/10 border border-amber/20 px-1.5 py-0.5 rounded">Learning</span>}
                {topic.status === "new" && <span className="text-blue text-[9px] font-black uppercase tracking-wider bg-blue/10 border border-blue/20 px-1.5 py-0.5 rounded">New</span>}
                {isLocked && <span className="text-muted text-[10px] font-bold bg-elevated border border-white/10 px-1.5 py-0.5 rounded">🔒 PRO</span>}
              </div>
              <div className="flex flex-col mt-auto text-left w-full">
                <span className="text-white font-bold text-[13px] leading-tight mb-1 truncate">{topic.title}</span>
                <span className="text-muted text-[11px]">{topic.words} / {topic.total} words</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
