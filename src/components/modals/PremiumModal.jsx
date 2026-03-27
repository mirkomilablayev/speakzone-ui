import { useState } from "react";

const BENEFITS = [
  { icon: "🎤", title: "Unlimited Mock Tests", desc: "Practice without daily limits." },
  { icon: "🤖", title: "Detailed AI Feedback", desc: "Band scores for all 4 criteria." },
  { icon: "✨", title: "AI Answer Refinement", desc: "Get native-level corrections." },
  { icon: "📚", title: "Topic Vocabulary", desc: "Access high-score phrases." },
];

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
    <div className="fixed inset-0 z-[100] bg-bg flex flex-col pointer-events-auto h-dvh w-full animate-fade-in overflow-hidden">
      {isSuccess ? (
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center gap-6">
           <div className="w-20 h-20 bg-green rounded-full flex items-center justify-center text-3xl text-white shadow-[0_0_40px_rgba(34,197,94,0.4)] animate-scale-in">
              ✓
           </div>
           <div className="flex flex-col gap-2">
              <h2 className="text-white font-black text-2xl tracking-tight">Access Granted!</h2>
              <p className="text-muted text-xs font-medium">Welcome to SpeakZone PRO.</p>
           </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col px-5 py-4 w-full h-full max-w-app mx-auto relative justify-between">
           
           {/* Top / Header */}
           <div className="flex items-center justify-between w-full pt-1">
              <button onClick={onClose} className="w-9 h-9 rounded-full bg-card-raised border border-white/10 flex items-center justify-center text-white text-sm z-20 active:scale-95 transition-all shadow-xl">
                 ✕
              </button>
              <div className="text-[10px] font-black text-gold border border-gold/20 bg-gold/5 px-3 py-1.5 rounded-full uppercase tracking-widest">
                 Premium
              </div>
           </div>

           {/* Title Section (Ultra Compact) */}
           <div className="flex flex-col items-center text-center mt-2">
              <div className="w-16 h-16 rounded-[20px] bg-gold-gradient shadow-gold-glow flex items-center justify-center text-3xl mb-3 border border-white/20">
                 👑
              </div>
              <h2 className="text-white font-black text-[26px] tracking-tight leading-tight">
                 Unlock SpeakZone <span className="text-transparent bg-clip-text bg-gold-gradient">PRO</span>
              </h2>
              <p className="text-muted text-[13px] font-medium leading-tight mt-1.5 px-4 opacity-80">
                 The fastest way to achieve Band 8.5 in IELTS Speaking.
              </p>
           </div>

           {/* Benefits List (Ultra Compact) */}
           <div className="flex flex-col gap-2.5 w-full px-1 mt-3">
              {BENEFITS.map((b, i) => (
                 <div key={i} className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-[14px] bg-card-raised border border-white/5 flex items-center justify-center text-lg shrink-0 shadow-sm">
                       {b.icon}
                    </div>
                    <div className="flex flex-col gap-0.5">
                       <span className="text-white font-black text-[14px] tracking-tight leading-none">{b.title}</span>
                       <span className="text-muted text-[11px] opacity-70 leading-none tracking-wide">{b.desc}</span>
                    </div>
                 </div>
              ))}
           </div>

           <div className="flex-1 min-h-[10px]" />

           {/* PRICING PLANS */}
           <div className="w-full flex flex-col gap-2.5 mt-2">
              {/* Monthly */}
              <label 
                onClick={() => setSelectedPlan("monthly")}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedPlan === "monthly" ? "border-accent bg-accent/10 shadow-[0_0_20px_rgba(79,142,247,0.15)]" : "border-white/5 bg-white/5 active:bg-white/10"
                }`}
              >
                 <span className="text-white font-bold text-[14px]">Monthly</span>
                 <span className="text-white font-black text-[14px]">99,000 UZS</span>
              </label>

              {/* Yearly */}
              <label 
                onClick={() => setSelectedPlan("yearly")}
                className={`w-full flex flex-col px-5 py-3.5 rounded-xl border-2 transition-all cursor-pointer relative ${
                  selectedPlan === "yearly" ? "border-gold bg-gold/10 shadow-[0_0_24px_rgba(245,197,24,0.15)]" : "border-white/5 bg-white/5"
                }`}
              >
                 <div className="absolute -top-[10px] left-4 px-2 py-0.5 bg-gold-gradient text-black text-[9px] font-black uppercase tracking-widest rounded-md shadow-[0_4px_12px_rgba(245,197,24,0.4)] leading-snug">
                    SAVE ~20%
                 </div>
                 <div className="flex items-center justify-between w-full">
                    <span className="text-white font-bold text-[14px]">Yearly</span>
                    <div className="flex flex-col items-end gap-0.5">
                       <span className="text-white font-black text-[14px] leading-none">790,000 UZS/yr</span>
                       <span className="text-muted text-[9px] font-bold line-through leading-none opacity-60">1,188,000 UZS</span>
                    </div>
                 </div>
              </label>
           </div>

           {/* CTA BUTTON */}
           <div className="w-full mt-4 pb-2">
              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full font-black py-4 rounded-xl text-[15px] active:scale-[0.98] transition-all flex items-center justify-center uppercase tracking-widest ${
                  selectedPlan === 'yearly' ? 'bg-gold-gradient text-black shadow-gold-glow' : 'bg-primary-gradient text-white shadow-primary-glow'
                }`}
              >
                 {isProcessing ? (
                    <div className={`w-5 h-5 border-[3px] border-t-transparent rounded-full animate-spin ${selectedPlan === 'yearly' ? 'border-black/20' : 'border-white/20'}`} />
                 ) : (
                    "Continue"
                 )}
              </button>
           </div>

        </div>
      )}
    </div>
  );
}
