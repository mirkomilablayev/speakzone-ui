import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../stores/useUserStore";
import Card from "../shared/Card";
import { PrimaryButton } from "../shared/Button";

const BANDS = ["6.5", "7.5", "8.5", "9.0"];

export default function OnboardingFlow({ onComplete }) {
  const { t } = useTranslation();
  const [target, setTarget] = useState("7.5");
  const { setTargetBand } = useUserStore();

  const handleComplete = () => {
    setTargetBand(target);
    onComplete();
  };

  return (
    <div className="flex flex-col h-dvh bg-bg p-6 items-center justify-between text-center animate-fade-in relative overflow-hidden"
         role="main" aria-label="Onboarding">
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative z-10 flex flex-col gap-8 pt-12 items-center">
        <div className="w-20 h-20 bg-primary-gradient rounded-3xl flex items-center justify-center text-4xl shadow-primary-glow border border-white/20" aria-hidden="true">🤖</div>
        <div className="flex flex-col gap-3">
          <h1 className="text-white font-black text-4xl tracking-tight leading-tight px-2">
            {t("onboarding.heading")}
          </h1>
          <p className="text-muted text-base px-4 leading-relaxed font-medium">
            {t("onboarding.subtitle")}
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">
            {t("onboarding.target_label")}
          </p>
          <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Target band score">
            {BANDS.map(b => (
              <button
                key={b}
                role="radio"
                aria-checked={target === b}
                onClick={() => setTarget(b)}
                className={`py-5 rounded-2xl font-black text-lg transition-all border shadow-lg ${
                  target === b ? "bg-accent border-accent text-white scale-105" : "bg-card-raised border-white/5 text-muted"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <PrimaryButton onClick={handleComplete} className="py-5 rounded-3xl text-lg font-black tracking-widest uppercase shadow-primary-glow active:scale-[0.98]">
            {t("onboarding.get_started")}
          </PrimaryButton>
          <p className="text-muted text-[11px] font-bold uppercase tracking-widest opacity-60">
            {t("onboarding.no_cc")}
          </p>
        </div>
      </div>

      <div className="relative pb-4 opacity-30">
        <span className="text-white font-black text-xs uppercase tracking-[0.5em]">SPEAKZONE AI</span>
      </div>
    </div>
  );
}
