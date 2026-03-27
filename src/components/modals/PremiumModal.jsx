import { useState } from "react";

const COMPARISON = [
  { name: "Full Mock Tests", free: "3 Free", pro: "Unlimited" },
  { name: "AI Band Scoring", free: "Basic", pro: "Detailed" },
  { name: "Answer Refinement", free: "—", pro: "✓" },
  { name: "Grammar Analysis", free: "—", pro: "✓" },
  { name: "Native Vocabulary", free: "—", pro: "✓" },
  { name: "Band 8.5 Roadmap", free: "—", pro: "✓" },
];

export default function PremiumModal({ open, onClose, reason }) {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
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

  const getPrice = () => selectedPlan === "monthly" ? "59,000 UZS" : "490,000 UZS";

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-0 pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div 
        className="relative w-full max-w-app bg-[#111218] border-t border-white/10 rounded-t-[40px] p-8 pb-10 pointer-events-auto shadow-[0_-20px_50px_rgba(0,0,0,0.9)] animate-slide-up"
      >
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/10 rounded-full" />
        
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center p-12 text-center gap-6 animate-scale-in">
             <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                ✓
             </div>
             <div className="flex flex-col gap-2">
                <h2 className="text-white font-black text-3xl tracking-tight">Access Granted!</h2>
                <p className="text-muted text-sm font-medium">Your account is now PRO Elite 👑</p>
             </div>
          </div>
        ) : (
          <>
            {/* 1. ICON & TITLE */}
            <div className="flex flex-col items-center text-center mt-6 mb-8">
               <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-primary-glow border border-accent/30">
                  ⚡
               </div>
               <h2 className="text-white font-black text-3xl tracking-tight leading-none mb-3">SpeakZone Pro</h2>
               <p className="text-muted text-[15px] font-medium opacity-60">Unlock your true potential for Band 8.5</p>
            </div>

            {/* 2. TOGGLE TABS (CHATGPT STYLE) */}
            <div className="p-1 bg-white/5 rounded-2xl flex mb-8">
               <button 
                 onClick={() => setSelectedPlan("monthly")}
                 className={`flex-1 py-3.5 rounded-[14px] text-xs font-black uppercase tracking-widest transition-all ${
                   selectedPlan === "monthly" ? "bg-white text-black shadow-lg" : "text-muted hover:text-white"
                 }`}
               >
                  Monthly
               </button>
               <button 
                 onClick={() => setSelectedPlan("annual")}
                 className={`flex-1 py-3.5 rounded-[14px] text-xs font-black uppercase tracking-widest transition-all relative ${
                   selectedPlan === "annual" ? "bg-white text-black shadow-lg" : "text-muted hover:text-white"
                 }`}
               >
                  Annual
                  <div className="absolute -top-1 -right-1 px-2 py-0.5 bg-green text-[7px] font-black text-white rounded-full">SAVE 40%</div>
               </button>
            </div>

            {/* 3. COMPARISON TABLE */}
            <div className="bg-card-raised/50 border border-white/5 rounded-3xl p-6 mb-10">
               <div className="flex justify-between items-center mb-6 px-1">
                  <span className="text-muted text-[10px] font-black uppercase tracking-widest">Features</span>
                  <div className="flex items-center gap-8">
                     <span className="text-muted text-[10px] font-black uppercase tracking-widest">Free</span>
                     <span className="text-accent text-[10px] font-black uppercase tracking-widest">Pro</span>
                  </div>
               </div>
               
               <div className="flex flex-col gap-6">
                  {COMPARISON.map(item => (
                    <div key={item.name} className="flex justify-between items-center">
                       <span className="text-white font-bold text-[13px] tracking-tight">{item.name}</span>
                       <div className="flex items-center gap-2">
                          <span className="w-[44px] text-center text-white/30 text-[11px] font-medium">{item.free}</span>
                          <span className="w-[44px] text-center text-accent text-[11px] font-black">{item.pro}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* 4. CTA BUTTON */}
            <div className="flex flex-col items-center gap-4">
               <button 
                 onClick={handlePayment}
                 disabled={isProcessing}
                 className="w-full bg-white text-black font-black py-5 rounded-[22px] text-lg uppercase tracking-tight shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 h-[68px] flex items-center justify-center"
               >
                  {isProcessing ? (
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    `Upgrade for ${getPrice()}`
                  )}
               </button>
               
               <div className="flex flex-col items-center gap-1 opacity-40">
                  <span className="text-muted text-[10px] font-bold tracking-tight">Auto-renews {selectedPlan === 'annual' ? 'yearly' : 'monthly'}. Cancel anytime.</span>
               </div>

               <button onClick={onClose} className="mt-4 text-muted text-[11px] font-black uppercase tracking-widest underline underline-offset-4 opacity-30 hover:opacity-100 transition-opacity">
                  Maybe later
               </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
