import { useState } from "react";
import Card from "../shared/Card";
import { PrimaryButton } from "../shared/Button";

const BANDS = ["6.5", "7.5", "8.5", "9.0"];

export default function OnboardingFlow({ onComplete }) {
  const [target, setTarget] = useState("7.5");

  return (
    <div className="flex flex-col h-dvh bg-bg p-8 items-center justify-between text-center animate-fade-in relative overflow-hidden">
      {/* BACKGROUND DECOR */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col gap-8 pt-12 items-center">
         <div className="w-20 h-20 bg-primary-gradient rounded-3xl flex items-center justify-center text-4xl shadow-primary-glow border border-white/20">
            🤖
         </div>
         <div className="flex flex-col gap-3">
            <h1 className="text-white font-black text-4xl tracking-tight leading-tight px-4">
               Master the IELTS <br/>Speaking Test.
            </h1>
            <p className="text-muted text-md px-6 leading-relaxed font-medium">
               Get real-time AI scoring and professional feedback in under 15 minutes.
            </p>
         </div>
      </div>

      <div className="relative z-10 w-full flex flex-col gap-6">
         <div className="flex flex-col gap-4">
            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">Select Your Target Band</p>
            <div className="grid grid-cols-4 gap-3">
               {BANDS.map(b => (
                 <button 
                  key={b}
                  onClick={() => setTarget(b)}
                  className={`py-6 rounded-2xl font-black text-lg transition-all border shadow-lg ${
                    target === b ? "bg-accent border-accent text-white scale-105" : "bg-card-raised border-white/5 text-muted hover:bg-white/5"
                  }`}
                 >
                    {b}
                 </button>
               ))}
            </div>
         </div>

         <div className="flex flex-col gap-4 pt-4">
            <PrimaryButton onClick={onComplete} className="py-6 rounded-3xl text-lg font-black tracking-widest uppercase shadow-primary-glow active:scale-[0.98]">
               Get Started Now ⚡️
            </PrimaryButton>
            <p className="text-muted text-[11px] font-bold uppercase tracking-widest opacity-60">
               No credit card required • Instant results
            </p>
         </div>
      </div>

      <div className="relative pb-4 opacity-30">
         <span className="text-white font-black text-xs uppercase tracking-[0.5em]">SPEAKZONE AI</span>
      </div>

    </div>
  );
}
