import { useState } from "react";

export default function PremiumModal({ open, onClose }) {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
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
        className="absolute inset-0 bg-black/90 backdrop-blur-md pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div 
        className="relative w-full max-w-app bg-bg rounded-t-[40px] p-0 overflow-hidden pointer-events-auto shadow-[0_-20px_50px_rgba(0,0,0,0.8)] animate-slide-up border-t border-white/10"
      >
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center p-20 text-center gap-6 bg-bg h-[600px]">
             <div className="w-24 h-24 bg-green rounded-full flex items-center justify-center text-4xl text-white shadow-[0_0_40px_rgba(34,197,94,0.4)] animate-scale-in">
                ✓
             </div>
             <div className="flex flex-col gap-2">
                <h2 className="text-white font-black text-3xl tracking-tight">Access Granted!</h2>
                <p className="text-muted text-sm font-medium">Welcome to SpeakZone PRO</p>
             </div>
          </div>
        ) : (
          <div className="flex flex-col h-[85dvh] overflow-y-auto hide-scrollbar">
            
            {/* 1. VISUAL HERO SECTION (DARK PREMIUM) */}
            <div className="relative h-64 w-full flex items-center justify-center pt-8 overflow-hidden">
               {/* Background glows */}
               <div className="absolute top-10 left-10 w-40 h-40 bg-accent/20 rounded-full blur-[60px]" />
               <div className="absolute top-20 right-10 w-40 h-40 bg-purple/20 rounded-full blur-[60px]" />
               
               <button onClick={onClose} className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white text-xl z-20 active:scale-90 transition-all">✕</button>
               
               {/* Abstract Premium Visual */}
               <div className="relative w-64 h-80 bg-card-raised rounded-3xl border border-white/10 shadow-2xl p-5 flex flex-col gap-3 translate-y-16">
                  {/* Floating cards */}
                  <div className="absolute -left-4 top-4 bg-card rounded-2xl p-4 shadow-xl border border-white/10 flex items-center gap-3 w-56 animate-float z-20">
                     <div className="w-10 h-10 bg-primary-gradient rounded-xl flex items-center justify-center text-xl shadow-primary-glow">✨</div>
                     <div className="flex flex-col">
                        <span className="text-white font-black text-[14px] leading-tight">Band 8.5 Analysis</span>
                        <span className="text-muted text-[10px] font-bold">AI Feedback</span>
                     </div>
                  </div>

                  <div className="absolute -right-8 top-28 bg-card rounded-2xl p-4 shadow-xl border border-white/10 flex flex-col justify-center gap-1 min-w-[140px] animate-float-delayed z-10">
                     <div className="absolute inset-0 bg-primary-gradient opacity-10 rounded-2xl" />
                     <span className="text-muted text-[9px] font-black uppercase tracking-widest leading-none relative z-10">Overall Score</span>
                     <span className="text-accent font-black text-4xl relative z-10">7.5</span>
                  </div>
               </div>
            </div>

            {/* 2. CONTENT SECTION */}
            <div className="px-6 pt-12 pb-12 flex flex-col items-center text-center relative z-20 bg-gradient-to-t from-bg via-bg to-transparent mt-[-20px]">
               <h2 className="text-white font-black text-[28px] tracking-tight leading-tight mb-3">
                  Unlock SpeakZone <span className="text-transparent bg-clip-text bg-gold-gradient">PRO</span>
               </h2>
               <p className="text-muted text-[14px] font-medium leading-relaxed px-2 mb-8">
                  Elevate your IELTS bands with unlimited mock tests, AI feedback, and answer refinement.
               </p>

               {/* 3. PLANS SELECTION */}
               <div className="w-full flex flex-col gap-3">
                  
                  {/* Monthly */}
                  <label 
                    onClick={() => setSelectedPlan("monthly")}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedPlan === "monthly" ? "border-accent bg-accent/10" : "border-white/5 bg-white/5 active:bg-white/10 hover:border-white/10"
                    }`}
                  >
                     <span className="text-white font-bold text-[16px]">Monthly</span>
                     <span className="text-white font-black text-[16px]">99,000 UZS</span>
                  </label>

                  {/* Yearly */}
                  <label 
                    onClick={() => setSelectedPlan("yearly")}
                    className={`w-full flex flex-col p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      selectedPlan === "yearly" ? "border-gold bg-gold/5" : "border-white/5 bg-white/5 hover:border-white/10"
                    }`}
                  >
                     <div className="absolute -top-3 left-4 px-3 py-1 bg-gold-gradient text-black text-[10px] font-black uppercase tracking-widest rounded-lg shadow-[0_4px_12px_rgba(245,197,24,0.3)]">
                        SAVE ~20%
                     </div>
                     <div className="flex items-center justify-between w-full">
                        <span className="text-white font-bold text-[16px]">Yearly</span>
                        <div className="flex flex-col items-end">
                           <span className="text-white font-black text-[16px]">790,000 UZS/yr</span>
                           <span className="text-muted text-[10px] font-bold line-through mt-0.5">1,188,000 UZS</span>
                        </div>
                     </div>
                  </label>
               </div>

               {/* 4. CALL TO ACTION */}
               <div className="w-full mt-8 flex flex-col gap-4">
                  <button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-primary-gradient text-white font-black py-4 rounded-2xl text-[17px] shadow-primary-glow active:scale-[0.98] transition-all flex items-center justify-center uppercase tracking-widest"
                  >
                     {isProcessing ? (
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                     ) : (
                        "Continue"
                     )}
                  </button>
               </div>

            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 4s ease-in-out infinite 1s; }
      `}</style>
    </div>
  );
}
