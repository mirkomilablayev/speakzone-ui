import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Card from "../shared/Card";
import { PrimaryButton, OutlineButton } from "../shared/Button";
import { useSessionStore } from "../../stores/useSessionStore";
import { useTelegram } from "../../hooks/useTelegram";

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
  { label: "Fluency",  value: "7.0", pct: 70 },
  { label: "Vocab",    value: "7.5", pct: 75 },
  { label: "Grammar",  value: "6.5", pct: 65 },
  { label: "Pronun.",  value: "7.0", pct: 70 },
];

export default function MockTab({ onGetPremium }) {
  const { t } = useTranslation();
  const { hapticFeedback } = useTelegram();

  const {
    screen, selectedMock, isRecording, timer,
    startSession, stopSession, setScreen, incrementTimer,
  } = useSessionStore();

  // Drive timer from component — store holds the value
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

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  /* ── LIST ── */
  if (screen === "list") {
    return (
      <div className="flex flex-col gap-6 animate-tab-in pb-24">
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl text-white">{t("mock.title")}</h1>
            <span className="text-accent text-[9px] font-black uppercase tracking-widest border border-accent/20 px-2.5 py-1 rounded-full bg-accent/5">
              {t("mock.free_badge")}
            </span>
          </div>
          <p className="text-muted text-sm px-0.5 opacity-60 font-medium">{t("mock.subtitle")}</p>
        </div>

        <div className="flex flex-col gap-3">
          {MOCK_DATA.map((m) => {
            const isCompleted = m.status === "completed";
            const isAvailable = m.status === "available";
            const isLocked    = m.status === "locked";
            return (
              <Card
                key={m.id}
                onClick={() => handleAction(m)}
                className={`flex flex-col gap-5 py-6 transition-all cursor-pointer group relative overflow-hidden border-y-0 border-r-0 border-l-[4px] ${
                  isCompleted ? "border-l-green bg-green/5" :
                  isAvailable ? "border-l-accent bg-card-raised border-white/5 active:scale-[0.99]" :
                  "border-l-gold/20 bg-card-raised/30 border-gold/10 opacity-50"
                }`}
              >
                <div className="flex items-start justify-between px-1">
                  <div className="flex flex-col gap-1.5">
                    <h3 className={`text-white font-black tracking-tight ${isCompleted ? "text-xl" : "text-[16px]"}`}>{m.title}</h3>
                    {isCompleted ? (
                      <div className="flex items-center gap-1 bg-green px-2.5 py-1 rounded-full w-fit">
                        <span className="text-white text-[9px] font-black uppercase tracking-widest">✓ COMPLETED</span>
                      </div>
                    ) : isLocked ? (
                      <span className="text-gold text-[10px] font-black uppercase tracking-widest">{t("mock.unlock_pro")}</span>
                    ) : (
                      <span className="text-muted text-[10px] font-bold uppercase tracking-widest opacity-70">Part 1·2·3</span>
                    )}
                  </div>

                  {isAvailable ? (
                    <button aria-label={`Start ${m.title}`} className="flex items-center gap-2 bg-primary-gradient text-white font-black px-5 py-3 rounded-full text-xs shadow-primary-glow active:scale-95 transition-all">
                      {t("mock.start")}
                    </button>
                  ) : isLocked ? (
                    <button aria-label={`Unlock ${m.title}`} className="flex items-center gap-2 bg-gold-gradient text-white font-black px-5 py-3 rounded-full text-xs shadow-gold-glow">
                      🔒 PRO
                    </button>
                  ) : (
                    <div className="w-14 h-14 bg-primary-gradient rounded-full flex flex-col items-center justify-center text-white font-black shadow-primary-glow border border-white/20" aria-label={`Score: ${m.score}`}>
                      <span className="text-xl leading-none">{m.score}</span>
                      <span className="text-[8px] uppercase tracking-tighter opacity-70 -mt-0.5">BAND</span>
                    </div>
                  )}
                </div>

                {isCompleted && (
                  <div className="flex gap-2 px-1">
                    <button className="flex-1 py-3.5 bg-primary-gradient rounded-xl text-white text-[11px] font-black uppercase tracking-widest shadow-primary-glow active:scale-[0.98] transition-all">
                      {t("mock.view_analysis")}
                    </button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── FLOW ── */
  if (screen === "flow") {
    return (
      <div className="flex flex-col h-full gap-8 pt-4 items-center animate-tab-in">
        <div className="w-full flex items-center justify-between px-2">
          <div className="flex flex-col">
            <span className="text-muted text-[10px] font-bold uppercase tracking-widest">{selectedMock?.title}</span>
            <h1 className="text-white font-black text-xl">{t("mock.part", { part: 1 })}</h1>
          </div>
          <div className="px-5 py-2.5 bg-card-raised rounded-2xl border border-white/10 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRecording ? "bg-red animate-pulse" : "bg-white/20"}`} aria-hidden="true" />
            <span className="text-white font-mono font-black text-lg" aria-live="polite" aria-label={`Timer: ${formatTime(timer)}`}>{formatTime(timer)}</span>
          </div>
        </div>
        <div className="flex-1 w-full flex flex-col items-center justify-center text-center px-4 gap-12">
          <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center animate-pulse" aria-hidden="true">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-accent rounded-full" />
            </div>
          </div>
          <div className="flex flex-col gap-4 px-6">
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest">{t("mock.question_label")}</p>
            <h2 className="text-white font-black text-2xl leading-snug">"Describe a place you would like to visit in the future."</h2>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 pb-10">
          <PrimaryButton onClick={handleStop} className="bg-red border-none shadow-[0_10px_30px_rgba(239,68,68,0.3)] py-5">
            {t("mock.stop_submit")}
          </PrimaryButton>
        </div>
      </div>
    );
  }

  /* ── EVALUATING ── */
  if (screen === "evaluating") {
    return (
      <div className="flex flex-col flex-1 items-center justify-center gap-8 h-full animate-scale-in" role="status" aria-live="polite">
        <div className="w-24 h-24 relative">
          <div className="absolute inset-0 border-4 border-accent/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-2xl" aria-hidden="true">🤖</div>
        </div>
        <h2 className="text-white font-black text-2xl">{t("mock.analyzing")}</h2>
      </div>
    );
  }

  /* ── RESULT ── */
  if (screen === "result") {
    return (
      <div className="flex flex-col gap-6 animate-tab-in pb-20">
        <div className="flex flex-col items-center gap-3 pt-6">
          <div className="w-20 h-20 bg-primary-gradient rounded-3xl flex flex-col items-center justify-center shadow-primary-glow border-4 border-white/10">
            <span className="text-white font-black text-4xl leading-none">7.5</span>
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-tighter mt-1">Overall</span>
          </div>
          <h2 className="text-white font-black text-2xl mt-2 text-center">{t("mock.complete")}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
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
        <div className="flex flex-col gap-3 mt-4">
          <PrimaryButton onClick={() => setScreen("list")} className="py-5 shadow-primary-glow">{t("mock.redo")}</PrimaryButton>
          <OutlineButton onClick={() => setScreen("list")}>{t("mock.return_list")}</OutlineButton>
        </div>
      </div>
    );
  }

  return null;
}
