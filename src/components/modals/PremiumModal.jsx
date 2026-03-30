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
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess]       = useState(false);

  if (!open) return null;

  const handlePayment = () => {
    hapticFeedback("impact");
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      hapticFeedback("success");
      setTimeout(() => { setIsSuccess(false); onClose(); }, 2000);
    }, 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="premium-modal-title"
      className="fixed inset-0 z-[100] bg-bg flex flex-col pointer-events-auto w-full animate-fade-in"
      style={{ height: "100dvh", maxHeight: "100dvh" }}
    >
      {isSuccess ? (
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center gap-6">
          <div className="w-20 h-20 bg-green rounded-full flex items-center justify-center text-3xl text-white shadow-[0_0_40px_rgba(34,197,94,0.4)] animate-scale-in" aria-hidden="true">✓</div>
          <div className="flex flex-col gap-2">
            <h2 className="text-white font-black text-2xl tracking-tight">{t("premium.access_granted")}</h2>
            <p className="text-muted text-xs font-medium">{t("premium.welcome_pro")}</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col w-full max-w-app mx-auto min-h-0">

          {/* ── Scrollable content ── */}
          <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pt-4 pb-3">

            {/* Header */}
            <div className="flex items-center justify-between w-full pt-1">
              <button onClick={onClose} aria-label="Close"
                className="w-9 h-9 rounded-full bg-card-raised border border-white/10 flex items-center justify-center text-white text-sm z-20 active:scale-95 transition-all shadow-xl">✕</button>
              <div className="text-[10px] font-black text-gold border border-gold/20 bg-gold/5 px-3 py-1.5 rounded-full uppercase tracking-widest">
                {t("premium.badge")}
              </div>
            </div>

            {/* Title */}
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-16 h-16 rounded-[20px] bg-gold-gradient shadow-gold-glow flex items-center justify-center text-3xl mb-3 border border-white/20" aria-hidden="true">👑</div>
              <h2 id="premium-modal-title" className="text-white font-black text-[26px] tracking-tight leading-tight">
                {t("premium.title")} <span className="text-transparent bg-clip-text bg-gold-gradient">{t("premium.pro")}</span>
              </h2>
              <p className="text-muted text-[13px] font-medium leading-tight mt-1.5 px-4 opacity-80">{t("premium.subtitle")}</p>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-2.5 w-full px-1 mt-3">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-[14px] bg-card-raised border border-white/5 flex items-center justify-center text-lg shrink-0 shadow-sm" aria-hidden="true">
                    {b.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-white font-black text-[14px] tracking-tight leading-none">{t(b.titleKey)}</span>
                    <span className="text-muted text-[11px] opacity-70 leading-none tracking-wide">{t(b.descKey)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="w-full flex flex-col gap-2.5 mt-4">
              <button
                onClick={() => setSelectedPlan("monthly")}
                aria-pressed={selectedPlan === "monthly"}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl border-2 transition-all ${
                  selectedPlan === "monthly" ? "border-accent bg-accent/10 shadow-[0_0_20px_rgba(79,142,247,0.15)]" : "border-white/5 bg-white/5"
                }`}
              >
                <span className="text-white font-bold text-[14px]">{t("premium.monthly")}</span>
                <span className="text-white font-black text-[14px]">{t("premium.monthly_price")}</span>
              </button>

              <button
                onClick={() => setSelectedPlan("yearly")}
                aria-pressed={selectedPlan === "yearly"}
                className={`w-full flex flex-col px-5 py-3.5 rounded-xl border-2 transition-all relative ${
                  selectedPlan === "yearly" ? "border-gold bg-gold/10 shadow-[0_0_24px_rgba(245,197,24,0.15)]" : "border-white/5 bg-white/5"
                }`}
              >
                <div className="absolute -top-[10px] left-4 px-2 py-0.5 bg-gold-gradient text-black text-[9px] font-black uppercase tracking-widest rounded-md shadow-[0_4px_12px_rgba(245,197,24,0.4)] leading-snug">
                  {t("premium.save")}
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-white font-bold text-[14px]">{t("premium.yearly")}</span>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-white font-black text-[14px] leading-none">{t("premium.yearly_price")}</span>
                    <span className="text-muted text-[9px] font-bold line-through leading-none opacity-60">{t("premium.yearly_original")}</span>
                  </div>
                </div>
              </button>
            </div>

          </div>

          {/* ── Sticky CTA — always visible ── */}
          <div className="shrink-0 px-5 pt-3 pb-5 border-t border-white/5 bg-bg">
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full font-black py-4 rounded-xl text-[15px] active:scale-[0.98] transition-all flex items-center justify-center uppercase tracking-widest
                focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                disabled:opacity-60 disabled:cursor-not-allowed ${
                  selectedPlan === "yearly"
                    ? "bg-gold-gradient text-black shadow-gold-glow focus-visible:ring-gold"
                    : "bg-primary-gradient text-white shadow-primary-glow focus-visible:ring-accent"
                }`}
            >
              {isProcessing ? (
                <div className={`w-5 h-5 border-[3px] border-t-transparent rounded-full animate-spin ${selectedPlan === "yearly" ? "border-black/20" : "border-white/20"}`}
                     role="status" aria-label="Processing" />
              ) : (
                t("premium.continue")
              )}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
