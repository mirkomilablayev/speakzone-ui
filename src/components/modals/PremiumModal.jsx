import { useState } from "react";
import { PrimaryButton } from "../shared/Button";

const RESULTS_VALUES = [
  { icon: "✓", text: "See your real mistakes immediately" },
  { icon: "✓", text: "Get Band 8.0+ sample answers" },
  { icon: "✓", text: "Improve faster with AI corrections" },
];

export default function PremiumModal({ open, onClose, reason }) {
  const [selectedPlan, setSelectedPlan] = useState("annual");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!open) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-0 pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div 
        className="relative w-full max-w-app bg-[#0a0c10] border-t border-white/10 rounded-t-[40px] p-8 pointer-events-auto shadow-[0_-20px_50px_rgba(0,0,0,0.9)] animate-slide-up"
        style={{ marginBottom: 0 }}
      >
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/10 rounded-full" />
        
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center p-12 text-center gap-6 animate-scale-in">
             <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                ✓
             </div>
             <div className="flex flex-col gap-2">
                <h2 className="text-white font-black text-3xl">Elite Access Granted!</h2>
                <p className="text-muted text-sm font-medium">Your account is now PRO Elite 👑</p>
             </div>
          </div>
        ) : (
          <>
            {/* 1. TOP HOOK (PERSONALIZED) */}
            <div className="text-center mt-6 mb-8 flex flex-col items-center">
               <div className="inline-flex py-1 px-3 bg-red/10 rounded-full border border-red/20 mb-4">
                  <span className="text-red text-[10px] font-black uppercase tracking-widest leading-none">Limit Reached: 3/3 Free Tests</span>
               </div>
               <h2 className="font-black text-3xl text-white mb-2 leading-tight tracking-tight px-4">Unlock Your Full Band Score 🚀</h2>
               <div className="flex items-center gap-2 mt-1">
                  <span className="text-muted text-sm font-medium">You are at Band 6.5 •</span>
                  <span className="text-accent text-sm font-black italic">Get to Band 7+ faster</span>
               </div>
            </div>

            {/* 2. VALUE (RESULT-DRIVEN) */}
            <div className="flex flex-col gap-4 mb-8 bg-white/5 p-5 rounded-3xl border border-white/5">
              {RESULTS_VALUES.map((v, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[10px] font-black shrink-0">
                    {v.icon}
                  </div>
                  <span className="text-white/80 text-[13px] font-bold tracking-tight">{v.text}</span>
                </div>
              ))}
              <div className="h-px w-full bg-white/5 my-1" />
              <p className="text-muted text-[11px] font-black uppercase tracking-widest text-center italic opacity-60">
                 🔥 500+ students improved their band score
              </p>
            </div>

            {/* 3. PRICING (REFRAMED FOR UZ MARKET) */}
            <div className="flex flex-col gap-3 mb-10">
               <div 
                 onClick={() => setSelectedPlan("annual")}
                 className={`p-6 rounded-[32px] flex items-center justify-between border-2 transition-all cursor-pointer relative ${
                   selectedPlan === "annual" ? "bg-primary-gradient border-white/20 shadow-primary-glow" : "bg-card-raised border-white/5 opacity-50"
                 }`}
               >
                  {selectedPlan === "annual" && (
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-white text-accent text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                       BEST VALUE
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                     <h3 className="text-white font-black text-xl leading-none">490k / Year</h3>
                     <span className={`${selectedPlan === 'annual' ? 'text-white/70' : 'text-muted'} text-[11px] font-bold uppercase`}>Save 40% (≈ 41k / mo)</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === "annual" ? "border-white bg-white" : "border-white/10"}`}>
                     {selectedPlan === "annual" && <div className="w-2.5 h-2.5 bg-accent rounded-full" />}
                  </div>
               </div>
               
               <div 
                 onClick={() => setSelectedPlan("monthly")}
                 className={`p-6 rounded-[32px] flex items-center justify-between border-2 transition-all cursor-pointer ${
                   selectedPlan === "monthly" ? "bg-primary-gradient border-white/20 shadow-primary-glow" : "bg-card-raised border-white/5 opacity-50"
                 }`}
               >
                  <div className="flex flex-col gap-1">
                     <h3 className="text-white font-black text-xl leading-none">59k / Month</h3>
                     <span className="text-muted text-[11px] font-bold uppercase tracking-tight">Standard flexible plan</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === "monthly" ? "border-white bg-white" : "border-white/10"}`}>
                     {selectedPlan === "monthly" && <div className="w-2.5 h-2.5 bg-accent rounded-full" />}
                  </div>
               </div>
            </div>

            {/* 4. ACTION (EMOTIONAL CTA) */}
            <div className="flex flex-col gap-4 pb-6">
               <div className="flex flex-col items-center gap-6">
                  <div className="w-full flex flex-col items-center gap-2">
                     <button 
                       onClick={handlePayment}
                       disabled={isProcessing}
                       className="w-full bg-white text-black font-black py-6 rounded-[32px] text-lg uppercase tracking-widest shadow-[0_20px_40px_rgba(255,255,255,0.15)] active:scale-[0.98] transition-all disabled:opacity-50 h-[72px] flex items-center justify-center"
                     >
                        {isProcessing ? (
                          <div className="w-7 h-7 border-3 border-black border-t-transparent rounded-full animate-spin" />
                        ) : (
                          "Upgrade Now ⚡"
                        )}
                     </button>
                     <span className="text-muted text-[10px] font-black uppercase tracking-widest opacity-40">Pay with Click / Payme / Visa</span>
                  </div>
                  
                  <button onClick={onClose} className="text-muted text-[11px] font-black uppercase tracking-widest underline underline-offset-4 decoration-2 opacity-50 hover:opacity-100 transition-opacity">
                     Continue with limited version
                  </button>
               </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
