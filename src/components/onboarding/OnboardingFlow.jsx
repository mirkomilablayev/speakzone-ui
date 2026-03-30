import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../stores/useUserStore";

const BANDS = ["6.5", "7.0", "7.5", "8.0", "8.5", "9.0"];

export default function OnboardingFlow({ onComplete }) {
  const { t } = useTranslation();
  const [target, setTarget] = useState("7.5");
  const { setTargetBand } = useUserStore();

  const handleComplete = () => {
    setTargetBand(target);
    onComplete();
  };

  return (
    <div className="flex flex-col h-dvh bg-[#070b13] p-6 items-center justify-between text-center animate-fade-in relative overflow-hidden"
         role="main" aria-label="Onboarding">
         
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal/10 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber/5 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 flex flex-col gap-8 pt-16 items-center w-full">
        <div className="flex items-center gap-2">
          <span className="text-white font-black text-2xl tracking-tight leading-none">Speak</span>
          <span className="bg-teal text-black font-black text-[13px] uppercase tracking-widest px-2.5 py-1 rounded">Zone</span>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <h1 className="text-white font-black text-[38px] tracking-tight leading-[1.1] px-2 text-left w-full">
            Master<br/>IELTS Speaking<br/><span className="text-teal text-[44px]">Faster.</span>
          </h1>
          <p className="text-muted text-[16px] px-2 text-left leading-relaxed font-medium mt-3 max-w-[280px]">
            {t("onboarding.subtitle", "Get real-time AI scoring and professional native feedback in under 15 minutes.")}
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full flex flex-col gap-8">
        <div className="flex flex-col gap-4 text-left px-2">
          <p className="text-teal text-[11px] font-bold uppercase tracking-[0.2em]">
            {t("onboarding.target_label", "Select Target Band")}
          </p>
          <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Target band score">
            {BANDS.map(b => (
              <button
                key={b}
                role="radio"
                aria-checked={target === b}
                onClick={() => setTarget(b)}
                className={`py-4 rounded-xl font-bold text-[18px] transition-all border ${
                  target === b 
                    ? "bg-teal/10 border-teal text-teal shadow-teal-glow-sm" 
                    : "bg-surface border-white/5 text-muted hover:bg-elevated"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 px-2">
          <button onClick={handleComplete} 
            className="w-full bg-teal text-black font-bold py-4 rounded-xl text-[16px] shadow-teal-glow tracking-wide active:scale-[0.98] transition-all">
            {t("onboarding.get_started", "Get Started Now")} →
          </button>
          <p className="text-muted text-[11px] font-bold uppercase tracking-widest opacity-60 text-center">
            {t("onboarding.no_cc", "No credit card required · Instant results")}
          </p>
        </div>
      </div>

    </div>
  );
}
