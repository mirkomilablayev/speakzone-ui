import Card from "../shared/Card";
import Avatar from "../shared/Avatar";
import { PremiumBadge } from "../shared/PremiumBadge";
import { PrimaryButton, OutlineButton } from "../shared/Button";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const FILLED = [true, true, true, true, true, false, false];

const SessionsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);

const ScoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const MinutesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const RatingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const STATS = [
  { Icon: SessionsIcon, value: "24",   label: "Total Sessions"  },
  { Icon: ScoreIcon,    value: "6.5",  label: "Avg Band Score"  },
  { Icon: MinutesIcon,  value: "318",  label: "Minutes Spoken"  },
  { Icon: RatingIcon,   value: "4.8",  label: "Partner Rating"  },
];

const FEEDBACKS = [
  { initials: "A", gradient: "bg-[linear-gradient(135deg,#f97316,#ef4444)]", name: "Asilbek", stars: 5, text: '"Great pronunciation and very fluent speaker!"', date: "Mar 25, 2026" },
  { initials: "Z", gradient: "bg-[linear-gradient(135deg,#8b5cf6,#ec4899)]", name: "Zulfiya",  stars: 4, text: '"Very helpful, good vocabulary range."',         date: "Mar 23, 2026" },
  { initials: "D", gradient: "bg-[linear-gradient(135deg,#06b6d4,#3b82f6)]", name: "Davron",   stars: 5, text: '"Excellent session, very engaging discussion!"',  date: "Mar 20, 2026" },
];

function Stars({ count }) {
  return <span className="text-yellow-400 text-xs">{"⭐".repeat(count)}</span>;
}

export default function HomeTab({ onStartSession, onOpenProfile }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Profile Card */}
      <Card 
        onClick={onOpenProfile}
        className="active:scale-[0.98] active:bg-card-raised transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar initials="M" size="lg" />
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green rounded-full border-2 border-card shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-syne font-bold text-lg text-white">Mirkomil</h2>
              <PremiumBadge size={16} />
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-muted text-xs font-medium tracking-tight">📍 Tashkent</span>
            </div>
          </div>
          <span className="text-muted text-2xl group-active:translate-x-1 transition-transform">›</span>
        </div>
      </Card>

      {/* Weekly Streak */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <h3 className="font-syne font-semibold text-white">Weekly Streak</h3>
          </div>
          <span className="text-orange text-sm font-bold bg-orange/10 px-3 py-1 rounded-full outline outline-1 outline-orange/20">5 days</span>
        </div>
        <div className="flex justify-between gap-1">
          {DAYS.map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-1.5 flex-1">
              <span className="text-[10px] text-muted font-bold uppercase tracking-tighter">{day}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                FILLED[i]
                  ? "bg-primary-gradient border-accent text-white shadow-[0_0_12px_rgba(79,142,247,0.5)] scale-110"
                  : "bg-card-raised border-subtle text-muted"
              }`}>
                {FILLED[i] ? "✓" : ""}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Stats 2×2 */}
      <div className="grid grid-cols-2 gap-3">
        {STATS.map((s) => (
          <Card key={s.label} className="flex flex-col items-center text-center py-5 transition-transform active:scale-95">
            <s.Icon />
            <span className="font-syne font-bold text-2xl text-white mt-2">{s.value}</span>
            <span className="text-muted font-medium" style={{ fontSize: 11 }}>{s.label}</span>
          </Card>
        ))}
      </div>

      {/* Partner Feedback */}
      <Card>
        <h3 className="font-syne font-semibold text-white mb-4 flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Partner Feedback
        </h3>
        <div className="flex flex-col gap-4">
          {FEEDBACKS.map((fb) => (
            <div key={fb.name} className="flex gap-3">
              <div className={`w-9 h-9 ${fb.gradient} rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0`}>
                {fb.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm text-white">{fb.name}</span>
                  <Stars count={fb.stars} />
                </div>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{fb.text}</p>
                <span className="text-muted text-[10px] mt-1 block font-medium">{fb.date}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pb-2">
        <OutlineButton id="btn-invite">👥 Invite Friends</OutlineButton>
        <PrimaryButton id="btn-start-session" onClick={onStartSession}>
          🎙️ Start Session
        </PrimaryButton>
      </div>
    </div>
  );
}
