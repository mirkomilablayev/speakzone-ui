import Card from "../shared/Card";
import Avatar from "../shared/Avatar";
import { PremiumBadge } from "../shared/PremiumBadge";
import { OutlineButton } from "../shared/Button";
import { InviteIcon } from "../shared/Icons";

const FIELD_ROWS = [
  { icon: "👤", label: "Full Name", value: "Mirkomil Zafarov" },
  { icon: "🔖", label: "Username",  value: "@mirkomil_speaks" },
  { icon: "🎂", label: "Birthday",  value: "Jan 15, 1998" },
  { icon: "📍", label: "Region",    value: "Tashkent City" },
  { icon: "📊", label: "Current IELTS Score", value: "6.5" },
  { icon: "🎯", label: "Target IELTS Score",  value: "7.5" },
];

const MENU_ROWS = [
  { icon: "👥", label: "Invite Friends" },
  { icon: "🔔", label: "Notifications" },
  { icon: "❓", label: "Help & Support" },
];

export default function ProfileScreen({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-bg flex flex-col animate-slide-in-right overflow-y-auto hide-scrollbar" style={{ maxWidth: 430, margin: "0 auto" }}>
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-bg/80 backdrop-blur-md flex items-center justify-between px-4 py-4 border-b border-subtle">
        <button 
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center text-white text-2xl active:scale-90 transition-transform"
        >
          ←
        </button>
        <h1 className="font-syne font-bold text-white text-lg">Profile</h1>
        <div className="w-10" /> 
      </div>

      <div className="flex flex-col gap-6 p-4 pt-2">
        {/* SECTION 1 — Avatar card */}
        <Card className="flex flex-col items-center py-8 gap-3 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4f8ef7] to-[#7b5cf0] flex items-center justify-center font-bold text-white text-3xl shadow-lg border-2 border-white/10">
            M
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <h2 className="font-syne font-bold text-white text-[22px]">Mirkomil</h2>
              <PremiumBadge size={18} />
            </div>
            <span className="text-muted text-sm px-1">@mirkomil_speaks</span>
          </div>
          <button className="mt-2 text-white/70 border border-white/20 px-5 py-1.5 rounded-full text-xs font-bold hover:bg-white/5 active:scale-95 transition-all">
            Edit Profile
          </button>
        </Card>

        {/* SECTION 2 — Edit fields */}
        <div className="flex flex-col gap-2">
          <p className="text-muted text-[11px] font-bold uppercase tracking-widest px-1 ml-1 mb-1">Account</p>
          <Card className="!p-0 overflow-hidden">
            {FIELD_ROWS.map((row, i) => (
              <button 
                key={row.label}
                className={`w-full flex items-center justify-between px-4 py-4 active:bg-white/5 transition-colors ${
                  i < FIELD_ROWS.length - 1 ? "border-b border-subtle" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg grayscale-[0.5] opacity-80">{row.icon}</span>
                  <span className="text-slate-300 text-[13px] font-medium">{row.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[13px] font-medium">{row.value}</span>
                  <span className="text-muted text-lg opacity-40">›</span>
                </div>
              </button>
            ))}
          </Card>
        </div>

        {/* SECTION 3 — Premium card */}
        <div className="bg-gradient-to-br from-green-600 to-teal-500 rounded-xl2 p-6 shadow-lg relative overflow-hidden active:scale-[0.99] transition-transform">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl" />
          <div className="relative z-10 flex flex-col gap-1">
            <h3 className="text-white font-bold text-[18px] flex items-center gap-2">
              <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-green-600 text-[10px] font-black shrink-0">✓</span>
              Premium Active
            </h3>
            <p className="text-white/80 text-xs font-medium mt-0.5">Valid until April 27, 2026</p>
            <button className="mt-4 border border-white/40 text-white text-[11px] font-bold px-4 py-1.5 rounded-full w-fit bg-black/10 hover:bg-black/20 transition-all active:scale-95">
              Manage Subscription
            </button>
          </div>
        </div>

        {/* SECTION 4 — My Stats */}
        <div className="flex gap-2.5">
           {[
             { label: "Sessions", value: "24" },
             { label: "Minutes",  value: "318" },
             { label: "Avg Score", value: "6.5" },
           ].map((s) => (
             <Card key={s.label} className="flex-1 flex flex-col items-center py-4 text-center">
               <span className="font-syne font-black text-2xl text-white">{s.value}</span>
               <span className="text-muted text-[10px] font-bold uppercase tracking-wider mt-1 opacity-70">{s.label}</span>
             </Card>
           ))}
        </div>

        {/* SECTION 5 — Menu */}
        <Card className="!p-1.5 flex flex-col gap-1">
          {MENU_ROWS.map((row) => (
            <button 
              key={row.label}
              className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl min-w-[24px] flex items-center justify-center">
                  {row.label === "Invite Friends" ? <InviteIcon size={22} className="text-white/80" /> : row.icon}
                </span>
                <span className="text-white text-[14px] font-bold">{row.label}</span>
              </div>
              <span className="text-muted text-lg opacity-40">›</span>
            </button>
          ))}
        </Card>

        <p className="text-center text-muted text-[11px] font-bold uppercase tracking-[0.2em] mt-2 mb-10 opacity-40">
          SpeakZone v1.0.0
        </p>
      </div>
    </div>
  );
}
