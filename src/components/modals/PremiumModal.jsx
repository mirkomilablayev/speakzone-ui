import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTelegram } from "../../hooks/useTelegram";

const BENEFITS = [
  { icon: "🎤", titleKey: "premium.unlimited_mocks",  descKey: "premium.unlimited_mocks_desc" },
  { icon: "🤖", titleKey: "premium.ai_feedback",      descKey: "premium.ai_feedback_desc" },
  { icon: "✨", titleKey: "premium.ai_refinement",    descKey: "premium.ai_refinement_desc" },
  { icon: "📚", titleKey: "premium.topic_vocab",      descKey: "premium.topic_vocab_desc" },
];

export default function PremiumModal({ open, onClose }) {
  const { t } = useTranslation();
  const { hapticFeedback } = useTelegram();
  const [plan, setPlan] = useState("yearly");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

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

            <div className="flex flex-col items-start mt-4">
              <span className="text-teal font-black text-[11px] uppercase tracking-[0.2em] border border-teal/20 bg-teal/5 px-3 py-1.5 rounded-full mb-6">
                PRO MEMBER
              </span>
              <h2 className="text-white font-black text-[34px] tracking-tight leading-[1.1]">
                Master IELTS<br/>Speaking <span className="text-teal">Faster.</span>
              </h2>
              <p className="text-muted text-[15px] leading-relaxed mt-4 max-w-[280px]">
                {t("premium.subtitle", "The fastest way to achieve Band 8.5 with unlimited AI mocks and native feedback.")}
              </p>
            </div>

            <div className="flex flex-col gap-5 mt-10">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex flex-col gap-1.5 bg-surface/50 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl leading-none" aria-hidden="true">{b.icon}</span>
                    <span className="text-white font-bold text-[16px] tracking-tight">{t(b.titleKey)}</span>
                  </div>
                  <p className="text-muted text-[13px] leading-snug pl-[38px]">{t(b.descKey)}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <button
                onClick={() => setPlan("yearly")}
                className={`w-full flex flex-col p-5 rounded-2xl border-[2.5px] transition-all relative outline-none ${
                  plan === "yearly" ? "border-teal bg-teal/5 shadow-teal-glow-sm" : "border-surface bg-surface"
                }`}
              >
                <div className="absolute -top-3 left-4 px-3 py-1 bg-amber text-black font-black text-[10px] uppercase tracking-widest rounded-lg shadow-amber-glow">
                  {t("premium.save", "SAVE 20%")}
                </div>
                <div className="flex items-center justify-between w-full mt-1">
                  <span className={`font-bold text-[16px] ${plan==="yearly"?"text-teal":"text-white"}`}>{t("premium.yearly", "Annual Plan")}</span>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-white font-black text-[18px] leading-none">{t("premium.yearly_price", "790K UZS/yr")}</span>
                    <span className="text-muted text-[11px] font-bold line-through leading-none">{t("premium.yearly_original", "1.1M UZS")}</span>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPlan("monthly")}
                className={`w-full flex items-center justify-between p-5 rounded-2xl border-[2.5px] transition-all outline-none ${
                  plan === "monthly" ? "border-teal bg-teal/5 shadow-teal-glow-sm" : "border-surface bg-surface"
                }`}
              >
                <span className={`font-bold text-[16px] ${plan==="monthly"?"text-teal":"text-white"}`}>{t("premium.monthly", "Monthly")}</span>
                <span className="text-white font-black text-[18px] leading-none">{t("premium.monthly_price", "99K UZS")}</span>
              </button>
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
