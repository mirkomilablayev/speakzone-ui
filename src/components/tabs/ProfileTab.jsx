import { useState } from "react";
import Card from "../shared/Card";
import { PrimaryButton } from "../shared/Button";
import { PremiumBadge } from "../shared/PremiumBadge";
import { InviteIcon } from "../shared/Icons";

const STATS = [
  { label: "Hours", value: "318", color: "text-accent" },
  { label: "Sessions", value: "24", color: "text-purple" },
  { label: "Avg Band", value: "6.5", color: "text-green" },
];

const ACCOUNT_FIELDS = [
  { icon: "👤", label: "Full Name", value: "Mirkomil Zafarov" },
  { icon: "🔖", label: "Username",  value: "@mirkomil_speaks" },
  { icon: "📍", label: "Region",    value: "Tashkent City" },
];

export default function ProfileTab({ onGetPremium }) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex flex-col gap-1.5 pt-1 relative">
        <h1 className="font-bold text-2xl text-white">My Profile</h1>
        <p className="text-muted text-sm">Monitor your IELTS progress and settings</p>
      </div>

      <Card className="flex flex-col items-center py-8 gap-4 text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-50 group-hover:scale-125 transition-transform" />
        <div className="w-24 h-24 rounded-full bg-primary-gradient flex items-center justify-center font-black text-white text-4xl shadow-2xl border-4 border-white/10 animate-scale-in">
          M
          <div className="absolute -bottom-1 -right-1">
             <PremiumBadge size={28} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1.5 overflow-hidden">
          <h2 className="font-black text-white text-2xl truncate px-4">Mirkomil Zafarov</h2>
          <span className="text-muted text-xs font-bold uppercase tracking-widest px-1 ml-1 opacity-70">@mirkomil_speaks</span>
        </div>
        <button className="mt-2 text-white/50 border border-white/10 px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-white/5 active:scale-95 transition-all">
          Edit Profile
        </button>
      </Card>

      <div className="flex gap-2.5">
        {STATS.map(s => (
          <Card key={s.label} className="flex-1 flex flex-col items-center py-5 text-center px-1">
            <span className={`font-black text-2xl ${s.color} leading-none`}>{s.value}</span>
            <span className="text-muted text-[10px] font-bold uppercase tracking-widest mt-2">{s.label}</span>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1 ml-0.5">Account Details</h3>
         <Card className="!p-0 overflow-hidden divide-y divide-subtle">
            {ACCOUNT_FIELDS.map(f => (
              <div key={f.label} className="flex items-center justify-between px-5 py-4.5 active:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                   <span className="text-lg grayscale-[0.5]">{f.icon}</span>
                   <span className="text-slate-300 text-[13px] font-bold">{f.label}</span>
                </div>
                <span className="text-white text-[13px] font-black">{f.value}</span>
              </div>
            ))}
         </Card>
      </div>

      <div className="flex flex-col gap-3">
         <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1 ml-0.5">Quick Actions</h3>
         <Card className="!p-1.5 flex flex-col gap-1.5">
            <button className="flex items-center justify-between p-4 px-5 rounded-xl hover:bg-white/5 active:scale-[0.99] transition-all bg-card-raised/30 border border-white/5 translate-x-0 group">
               <div className="flex items-center gap-4">
                  <span className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-xl">👥</span>
                  <span className="text-white text-[14px] font-bold group-hover:text-accent transition-colors">Invite Friends</span>
               </div>
               <span className="text-muted text-lg opacity-40 group-hover:translate-x-1 transition-transform duration-300">›</span>
            </button>
            <button className="flex items-center justify-between p-4 px-5 rounded-xl hover:bg-white/5 active:scale-[0.99] transition-all bg-card-raised/30 border border-white/5 translate-x-0 group">
               <div className="flex items-center gap-4">
                  <span className="w-10 h-10 bg-purple/10 rounded-xl flex items-center justify-center text-xl">❓</span>
                  <span className="text-white text-[14px] font-bold group-hover:text-purple transition-colors">Help Center</span>
               </div>
               <span className="text-muted text-lg opacity-40 group-hover:translate-x-1 transition-transform duration-300">›</span>
            </button>
         </Card>
      </div>
    </div>
  );
}
