import { useState } from "react";

export default function PremiumModal({ open, onClose, reason }) {
  const [selectedPlan, setSelectedPlan] = useState("weekly");
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
        className="relative w-full max-w-app bg-[#f8fafc] rounded-t-[40px] p-0 overflow-hidden pointer-events-auto shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-slide-up"
      >
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center p-20 text-center gap-6 bg-white h-[600px]">
             <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-4xl text-white shadow-xl animate-scale-in">
                ✓
             </div>
             <div className="flex flex-col gap-2">
                <h2 className="text-slate-900 font-black text-3xl tracking-tight">Access Granted!</h2>
                <p className="text-slate-500 text-sm font-medium">Welcome to SpeakZone PRO</p>
             </div>
          </div>
        ) : (
          <div className="flex flex-col h-[90dvh] overflow-y-auto hide-scrollbar bg-white">
            
            {/* 1. VISUAL HERO SECTION (CLIME STYLE) */}
            <div className="relative h-64 bg-slate-900 overflow-hidden flex items-center justify-center pt-8">
               <button onClick={onClose} className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xl z-20">✕</button>
               
               {/* Mock Visuals */}
               <div className="relative w-64 h-80 bg-slate-800 rounded-3xl border-4 border-slate-700 shadow-2xl p-4 flex flex-col gap-3 translate-y-12">
                  <div className="w-full h-2 bg-white/10 rounded-full" />
                  <div className="w-3/4 h-2 bg-white/10 rounded-full" />
                  
                  {/* Floating cards */}
                  <div className="absolute -left-6 top-10 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-3 w-56 animate-float">
                     <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">✨</div>
                     <div className="flex flex-col">
                        <span className="text-slate-900 font-bold text-[13px]">Band 8.5 Analysis</span>
                        <span className="text-slate-500 text-[10px]">Real-time feedback</span>
                     </div>
                  </div>

                  <div className="absolute -right-10 top-32 bg-blue-500 rounded-2xl p-4 shadow-xl flex flex-col gap-1 w-48 animate-float-delayed">
                     <span className="text-white/60 text-[9px] font-black uppercase tracking-widest leading-none">Overall Score</span>
                     <span className="text-white font-black text-3xl">7.5</span>
                  </div>
               </div>
            </div>

            {/* 2. CONTENT SECTION */}
            <div className="px-8 pt-10 pb-12 flex flex-col items-center text-center">
               <h2 className="text-slate-900 font-black text-2xl tracking-tight leading-tight mb-3">
                  Get access to SpeakZone PRO with no limits!
               </h2>
               <p className="text-slate-500 text-[15px] font-medium leading-relaxed px-2 mb-8">
                  Elevate your IELTS bands and get detailed AI feedback on every mock test.
               </p>

               {/* 3. PLANS SELECTION */}
               <div className="w-full flex flex-col gap-3">
                  
                  {/* Trial Option */}
                  <label 
                    onClick={() => setSelectedPlan("trial")}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedPlan === "trial" ? "border-blue-500 bg-blue-50" : "border-slate-100 bg-white"
                    }`}
                  >
                     <div className="flex flex-col text-left">
                        <span className="text-slate-900 font-bold text-[15px]">Not sure yet?</span>
                        <span className="text-slate-500 text-[13px]">Enable 3-day free trial</span>
                     </div>
                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === "trial" ? "border-blue-500 bg-blue-500" : "border-slate-200"}`}>
                        {selectedPlan === "trial" && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                     </div>
                  </label>

                  {/* Most Popular (Weekly) */}
                  <label 
                    onClick={() => setSelectedPlan("weekly")}
                    className={`w-full flex flex-col p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      selectedPlan === "weekly" ? "border-blue-500 bg-blue-50" : "border-slate-100 bg-white"
                    }`}
                  >
                     <div className="absolute -top-3 left-4 px-3 py-1 bg-blue-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-blue-200">
                        MOST POPULAR
                     </div>
                     <div className="flex items-center justify-between w-full">
                        <span className="text-slate-900 font-bold text-[15px]">Weekly</span>
                        <span className="text-slate-900 font-black text-[15px]">19,000 UZS/week</span>
                     </div>
                  </label>

                  {/* Yearly */}
                  <label 
                    onClick={() => setSelectedPlan("yearly")}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedPlan === "yearly" ? "border-blue-500 bg-blue-50" : "border-slate-100 bg-white"
                    }`}
                  >
                     <span className="text-slate-900 font-bold text-[15px]">Yearly</span>
                     <span className="text-slate-900 font-black text-[15px]">490,000 UZS/year</span>
                  </label>
               </div>

               {/* 4. CALL TO ACTION */}
               <div className="w-full mt-10 flex flex-col gap-4">
                  <button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-blue-500 text-white font-black py-5 rounded-2xl text-[17px] shadow-2xl shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center"
                  >
                     {isProcessing ? (
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                     ) : (
                        "Continue"
                     )}
                  </button>
                  <button className="text-slate-400 text-[13px] font-bold decoration-slate-300 underline underline-offset-4 mt-2">
                     Already purchased?
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
