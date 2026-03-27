import Card from "../shared/Card";
import Avatar from "../shared/Avatar";
import { PremiumBadge } from "../shared/PremiumBadge";
import { OutlineButton } from "../shared/Button";

const FIELD_ROWS = [
  { label: "Full Name", value: "Mirkomil Zafarov" },
  { label: "Username",  value: "@mirkomil_speaks" },
  { label: "Birthday",  value: "Jan 15, 1998" },
  { label: "Region",    value: "Tashkent" },
  { label: "Current IELTS Score", value: "6.5" },
  { label: "Target IELTS Score",  value: "7.5" },
];

const MENU_ROWS = [
  { icon: "👥", label: "Invite Friends" },
  { icon: "❓", label: "Help & Support" },
  { icon: "🔔", label: "Notifications" },
];

export default function ProfileScreen({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-bg flex flex-col animate-slide-in-right overflow-y-auto hide-scrollbar" style={{ maxWidth: 430, margin: "0 auto" }}>
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-bg/80 backdrop-blur-md flex items-center justify-between px-4 py-4 border-b border-subtle">
        <button 
          onClick={onClose}
          className="flex items-center gap-1 text-accent font-medium active:scale-95 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <h1 className="font-syne font-bold text-white text-lg">Profile</h1>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      <div className="flex flex-col gap-6 p-4">
        {/* Section 1: Avatar Card */}
        <Card className="flex flex-col items-center py-8 gap-3 text-center">
          <Avatar initials="M" size="xl" />
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <h2 className="font-syne font-extrabold text-2xl text-white">Mirkomil</h2>
              <PremiumBadge size={20} />
            </div>
            <span className="text-muted text-sm font-medium">@mirkomil_speaks</span>
          </div>
          <button className="mt-2 text-white/80 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-white/5 active:scale-95 transition-all">
            Edit Profile
          </button>
        </Card>

        {/* Section 2: Edit Fields */}
        <Card className="!p-0 overflow-hidden">
          {FIELD_ROWS.map((row, i) => (
            <button 
              key={row.label}
              className={`w-full flex items-center justify-between px-4 py-4 active:bg-white/5 transition-colors ${
                i < FIELD_ROWS.length - 1 ? "border-b border-subtle" : ""
              }`}
            >
              <span className="text-slate-400 text-sm font-medium">{row.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-bold">{row.value}</span>
                <span className="text-muted text-lg">›</span>
              </div>
            </button>
          ))}
        </Card>

        {/* Section 3: Premium Card */}
        <div className="bg-gradient-to-r from-green-600 to-teal-500 rounded-xl2 p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="relative z-10 flex flex-col gap-1">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-green-600 text-[10px] font-black">✓</span>
              Premium Active
            </h3>
            <p className="text-white/80 text-xs font-medium">Valid until April 27, 2026</p>
            <button className="mt-4 border border-white/30 text-white text-[11px] font-bold px-3 py-1.5 rounded-full w-fit hover:bg-white/10 transition-colors">
              Manage Subscription
            </button>
          </div>
        </div>

        {/* Section 4: My Stats */}
        <div className="flex gap-2">
           {[
             { label: "Sessions", value: "24", color: "text-purple" },
             { label: "Minutes",  value: "318", color: "text-teal" },
             { label: "Avg Score", value: "6.5", color: "text-accent" },
           ].map((s) => (
             <Card key={s.label} className="flex-1 flex flex-col items-center py-4 text-center">
               <span className={`font-syne font-black text-2xl ${s.color}`}>{s.value}</span>
               <span className="text-muted text-[10px] font-bold uppercase tracking-wider mt-0.5">{s.label}</span>
             </Card>
           ))}
        </div>

        {/* Section 5: Menu Rows */}
        <Card className="!p-2 flex flex-col gap-1">
          {MENU_ROWS.map((row) => (
            <button 
              key={row.label}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{row.icon}</span>
                <span className="text-white text-sm font-bold">{row.label}</span>
              </div>
              <span className="text-muted text-xl">›</span>
            </button>
          ))}
        </Card>

        <p className="text-center text-muted text-[11px] font-bold uppercase tracking-widest mt-2 mb-8">
          SpeakZone v1.0.0
        </p>
      </div>
    </div>
  );
}
