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
    <div className="fixed inset-0 z-[100] bg-bg flex flex-col pointer-events-auto h-dvh w-full animate-slide-up overflow-y-auto hide-scrollbar">
      {isSuccess ? (
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center gap-6">
           <div className="w-24 h-24 bg-green rounded-full flex items-center justify-center text-4xl text-white shadow-[0_0_40px_rgba(34,197,94,0.4)] animate-scale-in">
              ✓
           </div>
           <div className="flex flex-col gap-2">
              <h2 className="text-white font-black text-3xl tracking-tight">Access Granted!</h2>
              <p className="text-muted text-sm font-medium">Welcome to SpeakZone PRO.</p>
           </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col p-6 max-w-app mx-auto w-full relative">
           
           {/* Close Button */}
           <button onClick={onClose} className="absolute top-6 left-6 w-10 h-10 rounded-full bg-card-raised border border-white/10 flex items-center justify-center text-white text-xl z-20 active:scale-90 transition-all">
              ✕
           </button>

           {/* Premium Crown Icon */}
           <div className="mt-16 w-20 h-20 rounded-[28px] bg-gold-gradient shadow-gold-glow flex items-center justify-center text-4xl mb-6 self-center border-2 border-white/20">
              👑
           </div>

           {/* Title Section */}
           <h2 className="text-white font-black text-[32px] tracking-tight leading-tight text-center">
              Unlock SpeakZone <span className="text-transparent bg-clip-text bg-gold-gradient">PRO</span>
           </h2>
           <p className="text-muted text-[15px] font-medium leading-relaxed mt-2 mb-10 text-center px-2">
              The fastest way to achieve Band 8.5 in IELTS Speaking.
           </p>

           {/* Benefits List */}
           <div className="flex flex-col gap-5 mb-10 w-full px-1">
              {BENEFITS.map((b, i) => (
                 <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-card-raised border border-white/5 flex items-center justify-center text-2xl shrink-0 shadow-lg">
                       {b.icon}
                    </div>
                    <div className="flex flex-col gap-0.5">
                       <span className="text-white font-black text-[16px] tracking-tight leading-none">{b.title}</span>
                       <span className="text-muted text-[13px] opacity-80 leading-snug tracking-wide">{b.desc}</span>
                    </div>
                 </div>
              ))}
           </div>

           {/* Flexible spacing to push pricing to bottom if screen is tall */}
           <div className="flex-1 min-h-[20px]" />

           {/* PRICING PLANS */}
           <div className="w-full flex flex-col gap-3">
              {/* Monthly */}
              <label 
                onClick={() => setSelectedPlan("monthly")}
                className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedPlan === "monthly" ? "border-accent bg-accent/10 shadow-[0_0_20px_rgba(79,142,247,0.15)]" : "border-white/5 bg-white/5 active:bg-white/10"
                }`}
              >
                 <span className="text-white font-bold text-[16px]">Monthly</span>
                 <span className="text-white font-black text-[16px]">99,000 UZS</span>
              </label>

              {/* Yearly */}
              <label 
                onClick={() => setSelectedPlan("yearly")}
                className={`w-full flex flex-col p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                  selectedPlan === "yearly" ? "border-gold bg-gold/10 shadow-[0_0_24px_rgba(245,197,24,0.15)]" : "border-white/5 bg-white/5"
                }`}
              >
                 <div className="absolute -top-3 left-4 px-3 py-1 bg-gold-gradient text-black text-[10px] font-black uppercase tracking-widest rounded-lg shadow-[0_4px_12px_rgba(245,197,24,0.4)]">
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

           {/* CTA BUTTON */}
           <div className="w-full mt-6 mb-4 flex flex-col gap-0.5">
              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full font-black py-4.5 rounded-2xl text-[17px] active:scale-[0.98] transition-all flex items-center justify-center uppercase tracking-widest min-h-[60px] ${
                  selectedPlan === 'yearly' ? 'bg-gold-gradient text-black shadow-gold-glow' : 'bg-primary-gradient text-white shadow-primary-glow'
                }`}
              >
                 {isProcessing ? (
                    <div className={`w-6 h-6 border-4 border-t-transparent rounded-full animate-spin ${selectedPlan === 'yearly' ? 'border-black/20' : 'border-white/20'}`} />
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
