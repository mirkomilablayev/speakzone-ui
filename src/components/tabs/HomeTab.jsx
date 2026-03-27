import Card from "../shared/Card";
import Avatar from "../shared/Avatar";
import { PremiumBadge } from "../shared/PremiumBadge";
import { PrimaryButton, OutlineButton } from "../shared/Button";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const FILLED = [true, true, true, true, true, false, false];

const STATS = [
  { icon: "🎙️", value: "24",   label: "Total Sessions"  },
  { icon: "📊", value: "6.5",  label: "Avg Band Score"  },
  { icon: "⏱️", value: "318",  label: "Minutes Spoken"  },
  { icon: "⭐", value: "4.8",  label: "Partner Rating"  },
];

const FEEDBACKS = [
  { initials: "A", gradient: "bg-[linear-gradient(135deg,#f97316,#ef4444)]", name: "Asilbek", stars: 5, text: '"Great pronunciation and very fluent speaker!"', date: "Mar 25, 2026" },
  { initials: "Z", gradient: "bg-[linear-gradient(135deg,#8b5cf6,#ec4899)]", name: "Zulfiya",  stars: 4, text: '"Very helpful, good vocabulary range."',         date: "Mar 23, 2026" },
  { initials: "D", gradient: "bg-[linear-gradient(135deg,#06b6d4,#3b82f6)]", name: "Davron",   stars: 5, text: '"Excellent session, very engaging discussion!"',  date: "Mar 20, 2026" },
];

function Stars({ count }) {
  return <span className="text-yellow-400 text-xs">{"⭐".repeat(count)}</span>;
}

export default function HomeTab({ onStartSession }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Profile Card */}
      <Card>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar initials="M" size="lg" />
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green rounded-full border-2 border-card" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-syne font-bold text-lg text-white">Mirkomil</h2>
              <PremiumBadge />
            </div>
            <p className="text-muted text-sm mt-0.5">📍 Tashkent</p>
          </div>
        </div>
      </Card>

      {/* Weekly Streak */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-syne font-semibold text-white">🔥 Weekly Streak</h3>
          <span className="text-orange text-sm font-semibold">5 days</span>
        </div>
        <div className="flex justify-between gap-1">
          {DAYS.map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-1.5 flex-1">
              <span className="text-[10px] text-muted font-medium">{day}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                FILLED[i]
                  ? "bg-primary-gradient border-accent text-white shadow-[0_0_10px_rgba(79,142,247,0.4)]"
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
          <Card key={s.label} className="flex flex-col items-center text-center py-5 gap-1">
            <span className="text-2xl">{s.icon}</span>
            <span className="font-syne font-bold text-2xl text-white mt-1">{s.value}</span>
            <span className="text-muted text-xs leading-tight">{s.label}</span>
          </Card>
        ))}
      </div>

      {/* Partner Feedback */}
      <Card>
        <h3 className="font-syne font-semibold text-white mb-4">Partner Feedback</h3>
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
                <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">{fb.text}</p>
                <span className="text-muted text-[11px] mt-0.5 block">{fb.date}</span>
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
