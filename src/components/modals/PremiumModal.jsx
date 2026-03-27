import { PrimaryButton } from "../shared/Button";

const BENEFITS = [
  { icon: "🌍", title: "Unlimited Mock Tests", desc: "No daily limits on full 15-min exams" },
  { icon: "🤖", title: "Full AI Feedback", desc: "Detailed analysis of grammar & vocab" },
  { icon: "🎙️", title: "Answer Improvement", desc: "Get Band 8.5+ versions for every answer" },
  { icon: "📈", title: "Performance Reports", desc: "Track progress and weak areas over time" },
];

export default function PremiumModal({ open, onClose, reason }) {
  if (!open) return null;

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
        
        {/* Title & Price */}
        <div className="text-center mt-6 mb-8">
           <div className="inline-flex py-1 px-3 bg-accent/10 rounded-full border border-accent/20 mb-3">
              <span className="text-accent text-[10px] font-black uppercase tracking-widest">{reason || "KING OF SPEAKING"}</span>
           </div>
           <h2 className="font-black text-3xl text-white mb-2 leading-tight">Elite Prep for Band 8.5</h2>
           <p className="text-muted text-sm font-medium">Join 5,000+ students mastering IELTS</p>
        </div>

        {/* Benefits List (Detailed) */}
        <div className="flex flex-col gap-5 mb-10">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl shrink-0">
                {b.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                 <h4 className="text-white font-bold text-sm tracking-tight">{b.title}</h4>
                 <p className="text-muted text-[11px] leading-snug">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price & Selection */}
        <div className="flex flex-col gap-4 mb-8">
           <div className="bg-primary-gradient p-6 rounded-3xl flex items-center justify-between shadow-primary-glow group cursor-pointer active:scale-[0.98] transition-all">
              <div className="flex flex-col">
                 <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">LIMITED OFFER</span>
                 <h3 className="text-white font-black text-xl">1-Year Access</h3>
              </div>
              <div className="flex flex-col items-end">
                 <span className="text-white font-black text-2xl">490k</span>
                 <span className="text-white/70 text-[10px] font-bold uppercase tracking-tighter -mt-1">UZS / Total</span>
              </div>
           </div>
           
           <div className="bg-card-raised border border-white/5 p-5 rounded-3xl flex items-center justify-between opacity-60">
              <h3 className="text-white font-bold text-lg">Monthly Plan</h3>
              <div className="flex flex-col items-end">
                 <span className="text-white font-bold text-xl">59k</span>
                 <span className="text-muted text-[10px] font-medium uppercase tracking-tighter">UZS / Month</span>
              </div>
           </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-4 pb-6">
           <button className="w-full bg-white text-black font-black py-5 rounded-3xl text-[15px] uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all">
              Unlock Elite Now 💎
           </button>
           <button onClick={onClose} className="text-muted text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors">
              Maybe later, I'll stay at Band 6.0
           </button>
        </div>
      </div>
    </div>
  );
}
