import { useState } from "react";
import { PrimaryButton } from "../shared/Button";

const BENEFITS = [
  { icon: "🌍", title: "Unlimited Mock Tests", desc: "No daily limits on full 15-min exams" },
  { icon: "🤖", title: "Full AI Feedback", desc: "Detailed analysis of grammar & vocab" },
  { icon: "🎙️", title: "Answer Improvement", desc: "Get Band 8.5+ versions for every answer" },
  { icon: "📈", title: "Performance Reports", desc: "Track progress and weak areas over time" },
];

export default function PremiumModal({ open, onClose, reason }) {
  const [selectedPlan, setSelectedPlan] = useState("annual");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!open) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Automatically close after success
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
        className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div 
        className="relative w-full max-w-app bg-[#0f1118] border-t border-white/10 rounded-t-[40px] p-8 pointer-events-auto shadow-[0_-20px_50px_rgba(0,0,0,0.8)] animate-slide-up"
        style={{ marginBottom: 0 }}
      >
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/10 rounded-full" />
        
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center p-12 text-center gap-6 animate-scale-in">
             <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                ✓
             </div>
             <div className="flex flex-col gap-2">
                <h2 className="text-white font-black text-3xl">Payment Success!</h2>
                <p className="text-muted text-sm font-medium">Your account is now PRO Elite 👑</p>
             </div>
          </div>
        ) : (
          <>
            {/* Title & Price */}
            <div className="text-center mt-6 mb-8">
               <div className="inline-flex py-1 px-3 bg-accent/10 rounded-full border border-accent/20 mb-3">
                  <span className="text-accent text-[10px] font-black uppercase tracking-widest leading-none">{reason || "ELITE UPGRADE"}</span>
               </div>
               <h2 className="font-black text-3xl text-white mb-2 leading-tight">Master IELTS Faster</h2>
               <p className="text-muted text-sm font-medium">Unlock full feedback on all 20+ mocks</p>
            </div>

            {/* Benefits List (Detailed) */}
            <div className="flex flex-col gap-4 mb-8">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xl shrink-0">
                    {b.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                     <h4 className="text-white font-bold text-sm tracking-tight">{b.title}</h4>
                     <p className="text-muted text-[10px] leading-snug">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price & Selection */}
            <div className="flex flex-col gap-3 mb-8">
               <div 
                 onClick={() => setSelectedPlan("annual")}
                 className={`p-5 rounded-3xl flex items-center justify-between border transition-all cursor-pointer ${
                   selectedPlan === "annual" ? "bg-primary-gradient border-white/20 shadow-primary-glow" : "bg-card-raised border-white/5 opacity-60"
                 }`}
               >
                  <div className="flex flex-col">
                     <span className={`${selectedPlan === 'annual' ? 'text-white/60' : 'text-muted'} text-[10px] font-black uppercase tracking-widest`}>1-Year Access</span>
                     <h3 className="text-white font-black text-lg">Save 40%</h3>
                  </div>
                  <div className="flex flex-col items-end">
                     <span className="text-white font-black text-xl">490k</span>
                     <span className={`${selectedPlan === 'annual' ? 'text-white/70' : 'text-muted'} text-[9px] font-bold uppercase tracking-tighter -mt-1`}>UZS / Total</span>
                  </div>
               </div>
               
               <div 
                 onClick={() => setSelectedPlan("monthly")}
                 className={`p-5 rounded-3xl flex items-center justify-between border transition-all cursor-pointer ${
                   selectedPlan === "monthly" ? "bg-primary-gradient border-white/20 shadow-primary-glow" : "bg-card-raised border-white/5 opacity-60"
                 }`}
               >
                  <h3 className="text-white font-bold text-lg">Monthly Plan</h3>
                  <div className="flex flex-col items-end">
                     <span className="text-white font-bold text-lg tracking-tight">59k</span>
                     <span className={`${selectedPlan === 'monthly' ? 'text-white/70' : 'text-muted'} text-[9px] font-medium uppercase tracking-tighter`}>UZS / Month</span>
                  </div>
               </div>
            </div>

            {/* Action Button */}
            <div className="flex flex-col gap-4 pb-6">
               <button 
                 onClick={handlePayment}
                 disabled={isProcessing}
                 className="w-full bg-white text-black font-black py-5 rounded-3xl text-[15px] uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed h-[62px]"
               >
                  {isProcessing ? (
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto" />
                  ) : (
                    "Pay with Click / Payme ⚡"
                  )}
               </button>
               <button onClick={onClose} className="text-muted text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors">
                  Maybe later
               </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
