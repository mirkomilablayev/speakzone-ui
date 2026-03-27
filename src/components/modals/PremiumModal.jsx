import { PrimaryButton } from "../shared/Button";

const BENEFITS = [
  "Unlimited practice sessions",
  "AI-powered Band Score feedback",
  "Access to session recordings",
  "Detailed performance analytics",
  "Priority matching with top partners",
];

export default function PremiumModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-0 pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div 
        className="relative w-full max-w-app bg-card card-border rounded-t-3xl p-6 pointer-events-auto shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-slide-up"
        style={{ marginBottom: 0 }}
      >
        {/* Drain pipe handle */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-700 rounded-full" />
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-card-raised border border-subtle flex items-center justify-center text-slate-400 active:scale-90"
        >
          ✕
        </button>

        {/* Title & Price */}
        <div className="text-center mt-4 mb-6">
          <h2 className="font-syne font-bold text-2xl text-white mb-1">Upgrade to Premium</h2>
          <div className="flex items-center justify-center gap-2 mt-2">
             <span className="text-gold font-syne font-black text-xl">59,000 UZS</span>
             <span className="text-muted text-sm font-medium">/ month</span>
          </div>
        </div>

        {/* Benefits List */}
        <div className="flex flex-col gap-3 mb-8">
          {BENEFITS.map((b) => (
            <div key={b} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-green/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-slate-300 text-sm font-medium">{b}</span>
            </div>
          ))}
        </div>

        {/* Payment Buttons */}
        <div className="flex flex-col gap-3 pb-4">
          <button className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg">
            💳 Karta
          </button>
          <button className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg">
            🔵 Click
          </button>
          <button className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg">
            🟢 Payme
          </button>
        </div>
      </div>
    </div>
  );
}
