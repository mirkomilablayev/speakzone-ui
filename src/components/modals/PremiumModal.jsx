import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTelegram } from "../../hooks/useTelegram";

export default function PremiumModal({ open, onClose }) {
  const { t } = useTranslation();
  const { hapticFeedback } = useTelegram();
  const [plan, setPlan] = useState("yearly");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const BENEFITS = [
    { icon: "🎤", title: t("premium.unlimited_mocks", "Unlimited Mocks"),         desc: t("premium.unlimited_mocks_desc", "Take as many full mock exams as you want.") },
    { icon: "🤖", title: t("premium.ai_feedback", "Advanced AI Analytics"),       desc: t("premium.ai_feedback_desc", "Get deep insights into grammar and vocabulary.") },
    { icon: "✨", title: t("premium.ai_refinement", "AI Answer Refinement"),      desc: t("premium.ai_refinement_desc", "See how a Band 8.5 speaker would answer.") },
    { icon: "📚", title: t("premium.topic_vocab", "Premium Topic Vocabulary"),    desc: t("premium.topic_vocab_desc", "Unlock all advanced vocabulary lists.") },
  ];

  const handleBuy = () => {
    hapticFeedback("impact");
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      hapticFeedback("success");
      setTimeout(() => { setSuccess(false); onClose(); }, 2000);
    }, 1500);
  };

  return (
    <div
      role="dialog" aria-modal="true"
      className="fixed inset-0 z-[100] bg-[#070b13] flex flex-col pointer-events-auto w-full animate-fade-in"
      style={{ height: "100dvh", maxHeight: "100dvh" }}
    >
      {success ? (
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center gap-6">
          <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center text-teal text-4xl shadow-teal-glow animate-scale-in" aria-hidden="true">✓</div>
          <div className="flex flex-col gap-2">
            <h2 className="text-white font-black text-[28px] tracking-tight">{t("premium.access_granted", "Access Granted!")}</h2>
            <p className="text-teal text-sm font-bold uppercase tracking-widest">{t("premium.welcome_pro", "Welcome to SpeakZone PRO")}</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col w-full mx-auto min-h-0 relative">
          
          {/* ── Background Decals ── */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber/5 blur-[80px] rounded-full pointer-events-none" />

          {/* ── Scrollable ── */}
          <div className="flex-1 overflow-y-auto hide-scrollbar px-6 pt-6 pb-4 relative z-10">
            <button onClick={onClose} aria-label="Close"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-elevated border border-white/5 flex items-center justify-center text-muted text-xs active:scale-90 transition-all z-20">✕</button>

            <div className="flex flex-col items-start mt-6">
              <h2 className="text-white font-black text-[34px] tracking-tight leading-[1.1]">
                Master IELTS<br/>Speaking <span className="text-teal">Faster.</span>
              </h2>
              <p className="text-muted text-[15px] leading-relaxed mt-4 max-w-[280px]">
                {t("premium.subtitle", "Reach your target band score faster with unlimited AI mocks and native feedback.")}
              </p>
            </div>

            <div className="flex flex-col gap-5 mt-10">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex flex-col gap-1.5 bg-surface/50 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl leading-none" aria-hidden="true">{b.icon}</span>
                    <span className="text-white font-bold text-[16px] tracking-tight">{b.title}</span>
                  </div>
                  <p className="text-muted text-[13px] leading-snug pl-[38px]">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center mt-10 gap-4">
              {/* TOGGLE */}
              <div className="flex items-center bg-surface p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setPlan("monthly")}
                  className={`px-5 py-2 rounded-lg text-[13px] font-bold transition-all ${
                    plan === "monthly" ? "bg-teal text-black shadow-teal-glow-sm" : "text-muted hover:text-white"
                  }`}
                >
                  {t("premium.monthly_tab", "Monthly")}
                </button>
                <button
                  onClick={() => setPlan("yearly")}
                  className={`px-5 py-2 rounded-lg text-[13px] font-bold transition-all flex items-center gap-2 ${
                    plan === "yearly" ? "bg-teal text-black shadow-teal-glow-sm" : "text-muted hover:text-white"
                  }`}
                >
                  {t("premium.yearly_tab", "Yearly")}
                  {plan !== "yearly" && <span className="text-amber text-[9px] uppercase tracking-wider">-20%</span>}
                </button>
              </div>

              {/* DYNAMIC PRICE CARD */}
              <div className="w-full relative">
                {plan === "yearly" && (
                  <div className="absolute -top-3 left-4 px-3 py-1 bg-amber text-black font-black text-[10px] uppercase tracking-widest rounded-lg shadow-amber-glow z-10">
                    {t("premium.save", "SAVE 20%")}
                  </div>
                )}
                <div className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-teal bg-teal/5 shadow-teal-glow-sm">
                  <span className="font-bold text-[16px] text-teal">
                    {plan === "yearly" ? t("premium.yearly", "Annual Plan") : t("premium.monthly", "Monthly Plan")}
                  </span>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-white font-black text-[18px] leading-none">
                      {plan === "yearly" ? t("premium.yearly_price", "790K UZS/yr") : t("premium.monthly_price", "99K UZS/mo")}
                    </span>
                    {plan === "yearly" && (
                      <span className="text-muted text-[11px] font-bold line-through leading-none">{t("premium.yearly_original", "1.1M UZS")}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="shrink-0 px-6 pt-4 pb-8 border-t border-white/5 bg-[#070b13] relative z-20">
            <button
              onClick={handleBuy}
              disabled={processing}
              className="w-full bg-teal text-black font-bold py-4 rounded-xl text-[16px] shadow-teal-glow flex items-center justify-center tracking-wide active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {processing ? (
                <div className="w-6 h-6 border-[3px] border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                t("premium.continue", "Unlock PRO Access")
              )}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
