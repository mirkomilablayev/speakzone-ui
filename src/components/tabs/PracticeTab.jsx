import { useTranslation } from "react-i18next";
import Card from "../shared/Card";
import { PrimaryButton, OutlineButton } from "../shared/Button";
import { usePracticeStore } from "../../stores/usePracticeStore";

const VOCAB_TOPICS = [
  { id: 1, title: "Education & Learning", icon: "🎓", isFree: true,  words: 12 },
  { id: 2, title: "Technology & Future",  icon: "💻", isFree: true,  words: 15 },
  { id: 3, title: "Work & Careers",       icon: "💼", isFree: true,  words: 14 },
  { id: 4, title: "Environment & Climate",icon: "🌍", isFree: false, words: 18 },
  { id: 5, title: "Health & Lifestyle",   icon: "🏃", isFree: false, words: 16 },
  { id: 6, title: "Culture & Travel",     icon: "✈️", isFree: false, words: 20 },
];

const MOCK_VOCAB_DETAIL = {
  title: "Education & Learning",
  icon: "🎓",
  collocations: [
    { word: "pursue a degree",          desc: "try to get a university degree" },
    { word: "higher education system",  desc: "education at universities or colleges" },
    { word: "vocational training",      desc: "skills and education that prepare you for a job" },
    { word: "compulsory education",     desc: "education that is required by law" },
  ],
  replacements: [
    { bad: "very good",    better: "highly beneficial / invaluable" },
    { bad: "hard test",    better: "demanding assessment / rigorous exam" },
    { bad: "many students",better: "a substantial number of undergraduates" },
  ],
  speakingUsage: '"I opted to pursue a degree in computer science because vocational training wasn\'t sufficient. Ultimately, the higher education system was highly beneficial for me."',
  mistake: {
    wrong: "I make a degree at university.",
    right:  "I do/pursue a degree at university.",
  },
};

export default function PracticeTab({ onGetPremium }) {
  const { t } = useTranslation();
  const { screen, setScreen } = usePracticeStore();

  /* ── IMPROVE ── */
  if (screen === "improve") {
    return (
      <div className="flex flex-col gap-6 pb-24 animate-tab-in">
        <div className="flex items-center gap-3 pt-1">
          <button onClick={() => setScreen("home")} aria-label={t("profile.back")}
            className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-xl active:scale-95 transition-all">←</button>
          <h2 className="text-white font-black text-xl leading-none">{t("practice.improve_title")}</h2>
        </div>

        <Card className="flex flex-col gap-6 py-8 items-center text-center bg-card-raised border-white/5 shadow-2xl">
          <div className="w-20 h-20 rounded-3xl bg-primary-gradient flex items-center justify-center text-4xl shadow-primary-glow border border-white/10" aria-hidden="true">✨</div>
          <div className="flex flex-col gap-1 px-4">
            <h3 className="text-white font-black text-xl">{t("practice.ready_refine")}</h3>
            <p className="text-muted text-[13px] leading-relaxed max-w-[280px]">{t("practice.refine_desc")}</p>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <div className="bg-card-raised/50 border border-white/5 rounded-2xl p-4 h-32 flex flex-col items-center justify-center text-muted text-sm relative overflow-hidden">
            <span className="italic opacity-50 z-10">{t("practice.waiting")}</span>
            <div className="absolute inset-0 bg-primary-gradient opacity-[0.02]" aria-hidden="true" />
          </div>
          <PrimaryButton className="py-4 shadow-primary-glow text-[15px] uppercase tracking-widest mt-2">{t("practice.record_voice")}</PrimaryButton>
          <OutlineButton className="py-4 text-[15px]">{t("practice.type_response")}</OutlineButton>
        </div>
      </div>
    );
  }

  /* ── VOCAB TOPICS ── */
  if (screen === "vocab_topics") {
    return (
      <div className="flex flex-col gap-6 pb-24 animate-tab-in">
        <div className="flex items-center gap-3 pt-1">
          <button onClick={() => setScreen("home")} aria-label={t("profile.back")}
            className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-xl active:scale-95 transition-all">←</button>
          <h2 className="text-white font-black text-xl leading-none">{t("practice.vocab_title")}</h2>
        </div>

        <div className="flex flex-col gap-3">
          {VOCAB_TOPICS.map((topic) => {
            const isLocked = !topic.isFree;
            return (
              <Card key={topic.id}
                onClick={() => { if (isLocked) onGetPremium(); else setScreen("vocab_detail"); }}
                className={`flex items-center justify-between p-5 border-y-0 border-r-0 border-l-[4px] transition-all cursor-pointer group shadow-lg ${
                  isLocked ? "border-l-gold/30 bg-card-raised/40 opacity-70 scale-[0.98] border border-gold/10" : "border-l-purple bg-card-raised active:scale-[0.98]"
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xl shrink-0 ${isLocked ? "bg-white/5 border border-white/10" : "bg-purple-gradient text-white"}`} aria-hidden="true">
                    {topic.icon}
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <h3 className="text-white font-black text-[15px] tracking-tight truncate">{topic.title}</h3>
                    <span className="text-muted text-[11px] font-bold bg-white/5 w-fit px-2 py-0.5 rounded-md mt-0.5 border border-white/5">
                      {t("practice.core_phrases", { count: topic.words })}
                    </span>
                  </div>
                </div>
                {isLocked ? (
                  <button aria-label={`Unlock ${topic.title}`} className="bg-gold-gradient text-black font-black px-4 py-2 rounded-full text-[10px] uppercase tracking-widest shadow-gold-glow shrink-0 ml-2">
                    🔒 PRO
                  </button>
                ) : (
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 text-lg group-hover:scale-110 group-hover:bg-white/5 group-hover:text-white transition-all shadow-sm shrink-0 ml-2" aria-hidden="true">→</div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── VOCAB DETAIL ── */
  if (screen === "vocab_detail") {
    const v = MOCK_VOCAB_DETAIL;
    return (
      <div className="flex flex-col gap-6 pb-24 animate-tab-in">
        <div className="flex items-center justify-between pb-2 border-b border-white/5 pt-1">
          <div className="flex items-center gap-3">
            <button onClick={() => setScreen("vocab_topics")} aria-label={t("profile.back")}
              className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-xl active:scale-95 transition-all">←</button>
            <h2 className="text-white font-black text-xl leading-none">{v.icon} {v.title}</h2>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">{t("practice.replace_words")}</h3>
          <Card className="flex flex-col gap-4 p-5 bg-card-raised border-white/5 shadow-lg">
            {v.replacements.map((r, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1 gap-2">
                  <span className="text-red text-[13px] font-bold line-through decoration-2 opacity-80 truncate">{r.bad}</span>
                  <span className="text-white/20 text-xs shrink-0">→</span>
                  <span className="text-green text-[13px] font-black truncate text-right">{r.better}</span>
                </div>
                {i !== v.replacements.length - 1 && <div className="w-full h-px bg-white/5" />}
              </div>
            ))}
          </Card>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">{t("practice.collocations")}</h3>
          <div className="grid grid-cols-1 gap-3">
            {v.collocations.map((c, i) => (
              <Card key={i} className="flex flex-col gap-1 p-4 bg-card-raised border-l-[3px] border-l-purple border-y-0 border-r-0 shadow-md">
                <span className="text-white font-black text-[14px] leading-tight flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple block shrink-0" aria-hidden="true" />
                  {c.word}
                </span>
                <span className="text-muted text-[12px] opacity-80 pl-3.5 leading-snug">{c.desc}</span>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">{t("practice.speaking_usage")}</h3>
          <Card className="bg-purple-gradient border-none p-6 relative overflow-hidden shadow-[0_4px_24px_rgba(123,92,240,0.3)]">
            <span className="text-5xl opacity-20 absolute -top-1 -left-1 font-serif" aria-hidden="true">"</span>
            <p className="text-white font-bold text-[14px] leading-relaxed relative z-10 italic pl-2">{v.speakingUsage}</p>
          </Card>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">{t("practice.common_mistake")}</h3>
          <Card className="flex flex-col gap-4 p-5 bg-card-raised border border-red/10 relative overflow-hidden shadow-lg">
            <div className="flex items-center gap-3 px-1">
              <div className="w-6 h-6 rounded-full bg-red/20 text-red flex items-center justify-center text-xs font-black shrink-0" aria-hidden="true">✕</div>
              <span className="text-white/60 text-[13px] font-bold line-through decoration-red">{v.mistake.wrong}</span>
            </div>
            <div className="w-full h-px bg-white/5" />
            <div className="flex items-center gap-3 px-1">
              <div className="w-6 h-6 rounded-full bg-green/20 text-green flex items-center justify-center text-xs font-black shrink-0" aria-hidden="true">✓</div>
              <span className="text-white font-black text-[14px]">{v.mistake.right}</span>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  /* ── HOME ── */
  return (
    <div className="flex flex-col gap-6 pb-24 animate-tab-in">
      <div className="flex flex-col gap-1 pt-2 px-1">
        <h1 className="font-bold text-[28px] text-white tracking-tight leading-none">{t("practice.title")}</h1>
        <p className="text-muted text-[13px] opacity-80 font-medium">{t("practice.subtitle")}</p>
      </div>

      <div className="flex flex-col gap-5 mt-2">
        <Card onClick={() => setScreen("improve")}
          className="bg-primary-gradient border-none p-8 flex flex-col gap-4 relative overflow-hidden group active:scale-[0.98] transition-all cursor-pointer shadow-primary-glow">
          <div className="absolute -right-10 -top-10 w-44 h-44 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" aria-hidden="true" />
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl leading-none" aria-hidden="true">✨</span>
              <h2 className="text-white font-black text-[22px] tracking-tight leading-tight">Improve My Answer</h2>
            </div>
            <p className="text-white/80 text-[14px] leading-snug font-medium max-w-[200px] mt-1">{t("practice.improve_sub")}</p>
            <button className="mt-5 bg-white text-accent font-black px-8 py-4 rounded-full text-[12px] uppercase tracking-widest shadow-lg group-hover:scale-105 transition-transform w-fit leading-none">
              {t("practice.start_now")}
            </button>
          </div>
        </Card>

        <Card onClick={() => setScreen("vocab_topics")}
          className="bg-purple-gradient border-none p-8 flex flex-col gap-4 relative overflow-hidden group active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_30px_rgba(123,92,240,0.35)]">
          <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" aria-hidden="true" />
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl leading-none" aria-hidden="true">📚</span>
              <h2 className="text-white font-black text-[22px] tracking-tight leading-tight">Topic Vocabulary</h2>
            </div>
            <p className="text-white/80 text-[14px] leading-snug font-medium max-w-[200px] mt-1">{t("practice.topic_vocab_sub")}</p>
            <button className="mt-5 bg-white text-purple font-black px-8 py-4 rounded-full text-[12px] uppercase tracking-widest shadow-lg group-hover:scale-105 transition-transform w-fit leading-none">
              {t("practice.browse_topics")}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
