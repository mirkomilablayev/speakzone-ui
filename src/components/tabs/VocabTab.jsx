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

export default function VocabTab({ onGetPremium }) {
  const { t } = useTranslation();
  const { screen, setScreen } = usePracticeStore();
  
  // Custom local state for deeper navigation
  // "list", "detail", "learning", "complete"
  const [view, setView] = useState("list");

  /* ── SESSION COMPLETE SCREEN (Fix 6) ── */
  if (view === "complete") {
    return (
      <div className="flex flex-col gap-6 animate-scale-in pb-24 pt-10 h-full items-center text-center">
        <div className="w-24 h-24 bg-teal/10 rounded-full flex items-center justify-center text-teal text-5xl shadow-teal-glow mb-4" aria-hidden="true">🎯</div>
        
        <h1 className="text-white font-black text-3xl tracking-tight leading-none mb-2">Session Complete</h1>
        <p className="text-muted text-[14px]">You're expanding your IELTS vocabulary.</p>

        <div className="w-full bg-surface rounded-2xl p-5 flex flex-col gap-4 mt-6 text-left">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-muted text-[12px] font-bold uppercase tracking-widest">Mastered Today</span>
            <span className="text-white font-black text-xl">4</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-muted text-[12px] font-bold uppercase tracking-widest">Still Learning</span>
            <span className="text-white font-black text-xl">2</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex flex-col">
              <span className="text-muted text-[12px] font-bold uppercase tracking-widest">Scheduled Review</span>
              <span className="text-amber text-[10px] font-bold mt-0.5">Tomorrow, 08:00 AM</span>
            </div>
            <span className="text-white font-black text-xl">6</span>
          </div>
        </div>

        <button onClick={() => setView("list")} className="w-full bg-teal text-black font-bold py-4 rounded-xl text-[15px] shadow-teal-glow mt-auto active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          ← Back to Topics
        </button>
      </div>
    );
  }

  /* ── VOCAB LEARNING CARD ── */
  if (view === "learning") {
    const v = VOCAB_CARD;
    return (
      <div className="flex flex-col h-full animate-tab-in p-2 justify-center relative pb-20">
        <button onClick={() => setView("detail")} className="absolute top-2 left-2 text-muted p-2 text-xl z-20 hover:text-white transition-colors">✕</button>
        
        <div className="w-full h-1 bg-hint rounded-full absolute top-[52px] left-0 right-0 max-w-[400px] mx-auto overflow-hidden">
          <div className="h-full bg-teal rounded-full w-[25%]" />
        </div>
        <p className="text-center text-muted text-[11px] font-bold uppercase tracking-widest absolute top-16 w-full left-0">Word 1 of 4</p>

        <div className="bg-elevated rounded-3xl p-6 w-full shadow-card-lg border border-white/5 flex flex-col mt-4">
          <span className="text-muted text-[12px] font-medium tracking-wide mb-1 opacity-80">{v.pos}</span>
          <h2 className="text-white font-black text-[32px] tracking-tight mb-4 leading-none">{v.word}</h2>
          <p className="text-white/80 text-[15px] leading-relaxed mb-6">{v.def}</p>
          <p className="text-muted text-[14px] italic leading-relaxed border-l-[3px] border-teal/40 pl-4 mb-8">
            {v.example}
          </p>
          
          <div className="flex flex-col gap-4 mt-auto">
            <div className="flex flex-wrap gap-2">
              {v.synonyms.map(s => (
                <span key={s} className="bg-teal/15 text-teal text-[11px] font-bold px-2.5 py-1 rounded-md">{s}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {v.collocations.map(c => (
                <span key={c} className="bg-surface border border-white/5 text-muted text-[11px] font-bold px-2.5 py-1 rounded-md">{c}</span>
              ))}
            </div>
          </div>
          
          <span className="absolute bottom-5 right-5 text-amber font-black text-xs uppercase tracking-widest">
            Band {v.band}
          </span>
        </div>

        <div className="flex flex-col gap-3 w-full mt-6">
          <button onClick={() => setView("complete")} className="w-full bg-teal text-black font-bold py-4 rounded-xl text-[14px] shadow-teal-glow active:scale-[0.98] transition-all">I know this</button>
          <button onClick={() => setView("complete")} className="w-full border border-amber/40 text-amber font-semibold py-4 rounded-xl text-[14px] active:scale-[0.98] transition-all bg-amber/5">Still learning</button>
          <button onClick={() => setView("complete")} className="w-full border border-white/10 text-muted hover:text-white font-semibold py-4 rounded-xl text-[14px] active:scale-[0.98] transition-all bg-surface/50">Don't know</button>
        </div>
      </div>
    );
  }

  /* ── VOCAB TOPIC DETAIL ── */
  if (view === "detail") {
    const v = MOCK_VOCAB_DETAIL;
    return (
      <div className="flex flex-col gap-6 animate-tab-in pb-24 pt-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setView("list")} className="text-muted text-xl p-2 active:scale-95 transition-transform">←</button>
          <div className="flex flex-col">
            <span className="text-muted text-[10px] font-bold uppercase tracking-widest">{v.words.length} Words</span>
            <h1 className="text-white font-black text-[22px] tracking-tight leading-none mt-0.5">{v.icon} {v.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setView("learning")} className="bg-teal text-black font-bold py-4 rounded-xl text-[13px] shadow-teal-glow active:scale-[0.98] transition-all text-center uppercase tracking-wide">
            Start Learning
          </button>
          <button onClick={() => setView("learning")} className="bg-amber/10 border border-amber/30 text-amber font-bold py-4 rounded-xl text-[13px] shadow-amber-glow active:scale-[0.98] transition-all text-center uppercase tracking-wide">
            Review Due (1)
          </button>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          {v.words.map((w, i) => (
            <button key={i} onClick={() => setView("learning")} className="bg-surface rounded-xl p-4 flex items-center justify-between active:scale-[0.98] transition-all hover:bg-elevated relative overflow-hidden">
              <span className="text-white font-semibold text-[14px] tracking-tight">{w.word}</span>
              <div className="flex items-center gap-3">
                {w.status === "mastered" && <span className="text-teal text-[9px] font-black uppercase tracking-wider bg-teal/10 px-2 py-0.5 rounded border border-teal/20">Mastered</span>}
                {w.status === "due" && <span className="text-amber text-[9px] font-black uppercase tracking-wider bg-amber/10 px-2 py-0.5 rounded border border-amber/20">Due</span>}
                {w.status === "new" && <span className="text-muted text-[9px] font-black uppercase tracking-wider bg-surface border border-white/5 px-2 py-0.5 rounded">New</span>}
                <span className="text-muted opacity-40 text-lg leading-none shrink-0›" aria-hidden="true">›</span>
              </div>
              {w.status === "due" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber" />}
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
        <div className="w-full h-1.5 bg-hint rounded-full overflow-hidden mt-0.5">
          <div className="h-full bg-teal rounded-full shadow-teal-glow-sm" style={{ width: "8%" }} />
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
               onClick={() => { if (isLocked) onGetPremium(); else setView("detail"); }}
               className={`bg-surface rounded-2xl p-4 flex flex-col items-start gap-4 active:scale-[0.98] transition-all relative overflow-hidden h-36 border border-white/5 ${isLocked ? "opacity-60 grayscale-[0.8]" : "hover:border-teal/30 hover:bg-elevated"}`}
            >
              <div className="w-full flex justify-between items-start">
                <span className="text-3xl leading-none" aria-hidden="true">{topic.icon}</span>
                {topic.status === "mastered" && <span className="text-teal text-[9px] font-black uppercase tracking-wider bg-teal/10 border border-teal/20 px-1.5 py-0.5 rounded">Mastered</span>}
                {topic.status === "in_progress" && <span className="text-amber text-[9px] font-black uppercase tracking-wider bg-amber/10 border border-amber/20 px-1.5 py-0.5 rounded">Learning</span>}
                {topic.status === "new" && <span className="text-blue text-[9px] font-black uppercase tracking-wider bg-blue/10 border border-blue/20 px-1.5 py-0.5 rounded">New</span>}
                {isLocked && <span className="text-muted text-[10px] font-bold bg-surface border border-white/10 px-2 py-1 rounded shadow-sm">🔒 PRO</span>}
              </div>
              <div className="flex flex-col mt-auto text-left w-full gap-0.5 z-10">
                <span className="text-white font-bold text-[14px] leading-tight truncate">{topic.title}</span>
                <span className="text-muted text-[11px] font-semibold">{topic.words} / {topic.total} words</span>
              </div>
              {/* Background gradient hint */}
              {topic.status === "mastered" && <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-teal/10 blur-xl rounded-full" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
