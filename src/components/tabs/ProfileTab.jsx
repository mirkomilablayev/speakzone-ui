import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../stores/useUserStore";
import i18n from "../../i18n";

// Profile band chart pts (shows more data than Home tab)
const CHART_PTS = [
  { d:"Jan 12", x:0,   y:42, score:"6.0", type:"S" },
  { d:"Jan 15", x:46,  y:42, score:"6.0", type:"M" },
  { d:"Jan 22", x:93,  y:30, score:"6.5", type:"S" },
  { d:"Feb 05", x:140, y:28, score:"6.5", type:"M" },
  { d:"Feb 18", x:186, y:18, score:"7.0", type:"S" },
  { d:"Mar 10", x:233, y:12, score:"7.0", type:"S" },
  { d:"Mar 26", x:280, y:6,  score:"7.5", type:"M" },
];
const LINE = "M 0,42 C 23,42 23,42 46,42 C 70,42 70,30 93,30 C 117,30 117,28 140,28 C 163,28 163,18 186,18 C 210,18 210,12 233,12 C 256,12 256,6 280,6";
const AREA = LINE + " L 280,52 L 0,52 Z";

const HISTORY = [
  { id: 1, type: "Full Mock Test", date: "Mar 26", score: "7.5", dur: "14m" },
  { id: 2, type: "Random Topic",   date: "Mar 25", score: "6.5", dur: "4m" },
  { id: 3, type: "Random Topic",   date: "Mar 22", score: "6.0", dur: "6m" },
];

const METRICS = [
  { label: "Sessions", value: "24", icon: "🎤" },
  { label: "Talk Time", value: "3h 45m", icon: "⏱️" },
  { label: "Mocks", value: "7", icon: "📝" },
  { label: "Words", value: "142", icon: "📚" },
];

export default function ProfileTab({ onGetPremium }) {
  const { t } = useTranslation();
  const { name, initial, isPremium, language, setLanguage } = useUserStore();

  return (
    <div className="flex flex-col gap-6 pb-24 animate-tab-in pt-4 px-1">
      
      {/* ── HEADER INTRO ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-teal flex items-center justify-center font-black text-black text-2xl shadow-teal-glow">
            {initial}
          </div>
          <div className="flex flex-col gap-0.5">
            <h1 className="font-black text-2xl text-white tracking-tight leading-none">{name}</h1>
            <span className="text-muted text-[13px] font-medium opacity-80">@mirkomil12</span>
            <span className="text-hint text-[10px] font-bold uppercase tracking-widest mt-0.5">Since Jan 2026</span>
          </div>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 shadow-sm ${isPremium ? "bg-amber/10 text-amber border-amber/20" : "bg-elevated text-muted"}`}>
          {isPremium ? "PRO MEMBER" : "FREE PLAN"}
        </div>
      </div>

      {/* ── STATS GRID ── */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        {METRICS.map(m => (
          <div key={m.label} className="bg-surface p-4 flex flex-col gap-3 rounded-2xl relative overflow-hidden group">
            <span className="text-muted text-[11px] font-bold uppercase tracking-widest">{m.label}</span>
            <span className="text-white font-black text-3xl leading-none">{m.value}</span>
            <span className="absolute bottom-3 right-3 text-3xl opacity-5 transition-transform group-hover:scale-110" aria-hidden="true">{m.icon}</span>
          </div>
        ))}
      </div>

      {/* ── PROFILE BAND SCORE CHART ── */}
      <div className="bg-surface rounded-2xl p-5 flex flex-col gap-2 mt-2">
        <div className="flex items-baseline justify-between">
          <span className="text-white font-semibold text-[14px]">Performance History</span>
          {!isPremium && <span className="text-amber text-[10px] font-bold uppercase tracking-widest">Last 7 <span className="opacity-50">(PRO: 30)</span></span>}
        </div>
        <svg viewBox="0 0 280 80" className="w-full h-20 overflow-visible mt-2">
          <defs>
            <linearGradient id="profileTealFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00c9b1" stopOpacity="0.35"/>
              <stop offset="100%" stopColor="#00c9b1" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d={AREA} fill="url(#profileTealFill)"/>
          <path d={LINE} fill="none" stroke="#00c9b1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          {CHART_PTS.map(({ x, y, score, type }) => (
            <g key={x}>
              <circle cx={x} cy={y} r="4" fill="#070b13" stroke="#00c9b1" strokeWidth="2.5"/>
              <text x={x} y={y - 10} textAnchor="middle" fill="#dce8f5" fontSize="10" fontFamily="Space Grotesk" fontWeight="bold">{score}</text>
              <text x={x} y="64" textAnchor="middle" fill={type === "S" ? "#f59e0b" : "#00c9b1"} fontSize="10" fontFamily="Space Grotesk" fontWeight="bold">{type}</text>
            </g>
          ))}
        </svg>
      </div>

      {/* ── UPGRADE BANNER (Free Users Only) ── */}
      {/* Fix 7: Show Monthly base price */}
      {!isPremium && (
        <div className="bg-elevated rounded-2xl p-6 flex flex-col gap-5 mt-2 shadow-card teal-edge relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-teal/5 blur-3xl rounded-full pointer-events-none" />
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-teal font-black text-[15px] uppercase tracking-widest leading-none">Unlock Limitless</span>
              <ul className="text-white/80 text-[12px] font-medium flex flex-col gap-1 mt-1">
                <li className="flex items-center gap-2"><span className="text-teal text-lg leading-none mt-0.5">•</span> Unlimited Mocks</li>
                <li className="flex items-center gap-2"><span className="text-teal text-lg leading-none mt-0.5">•</span> Advanced AI Analytics</li>
                <li className="flex items-center gap-2"><span className="text-teal text-lg leading-none mt-0.5">•</span> Premium Vocabulary</li>
              </ul>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-muted text-[10px] font-bold uppercase tracking-widest line-through">199K UZS</span>
              <span className="text-white font-black text-[18px] leading-none">99K <span className="text-sm font-medium">UZS/mo</span></span>
              <span className="text-amber text-[9px] font-bold uppercase tracking-widest mt-0.5">Or save 20% yearly</span>
            </div>
          </div>
          <button onClick={onGetPremium} className="w-full bg-teal text-black font-bold py-3.5 rounded-xl text-[14px] shadow-teal-glow active:scale-[0.98] transition-all relative z-10">
            Upgrade to PRO
          </button>
        </div>
      )}

      {/* ── SESSIONS LIST ── */}
      <div className="flex flex-col gap-3 mt-2">
        <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">My Sessions</h3>
        <div className="flex flex-col gap-2">
          {HISTORY.map(h => (
            <button key={h.id} className="w-full text-left bg-surface rounded-xl p-4 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-elevated rounded-lg flex items-center justify-center text-teal shadow-inner shrink-0">
                  {h.type === "Full Mock Test" ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 11c0 3.866 3.134 7 7 7s7-3.134 7-7"/></svg>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white font-bold text-[14px] leading-tight tracking-tight">{h.type}</span>
                  <span className="text-muted text-[11px] font-medium">{h.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-teal font-black text-[18px] leading-none">{h.score}</span>
                  <span className="text-hint text-[9px] font-bold uppercase tracking-widest mt-1">{h.dur}</span>
                </div>
                <span className="text-muted opacity-30 text-lg leading-none shrink-0" aria-hidden="true">›</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── SETTINGS ── */}
      <div className="flex flex-col gap-3 mt-4">
        <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">Settings</h3>
        <div className="bg-surface rounded-2xl overflow-hidden flex flex-col">
          <button className="flex items-center justify-between p-4 border-b border-white/5 active:bg-elevated transition-colors">
            <span className="text-white font-semibold text-[14px]">Daily Reminder</span>
            <div className="w-10 h-6 bg-teal rounded-full relative">
              <div className="absolute top-1 right-1 w-4 h-4 bg-black rounded-full shadow-sm" />
            </div>
          </button>
          
          <button className="flex items-center justify-between p-4 border-b border-white/5 active:bg-elevated transition-colors">
            <span className="text-white font-semibold text-[14px]">Reminder Time</span>
            <div className="flex items-center gap-2 text-muted">
              <span className="text-[13px] font-bold">08:00 AM</span>
              <span className="opacity-40 text-lg leading-none" aria-hidden="true">›</span>
            </div>
          </button>
          
          <button className="flex items-center justify-between p-4 border-b border-white/5 active:bg-elevated transition-colors">
            <span className="text-white font-semibold text-[14px]">Daily Goal</span>
            <div className="flex items-center gap-2 text-muted">
              <span className="text-[13px] font-bold">15 mins</span>
              <span className="opacity-40 text-lg leading-none" aria-hidden="true">›</span>
            </div>
          </button>

          <button className="flex items-center justify-between p-4 border-b border-white/5 active:bg-elevated transition-colors">
            <span className="text-white font-semibold text-[14px]">App Language</span>
            <div className="flex items-center gap-2 text-muted">
              <select 
                value={language}
                onChange={e => { setLanguage(e.target.value); i18n.changeLanguage(e.target.value); }}
                className="bg-transparent text-[13px] font-bold outline-none border-none text-right appearance-none"
              >
                <option value="en" className="text-black">English</option>
                <option value="uz" className="text-black">O'zbek</option>
                <option value="ru" className="text-black">Русский</option>
              </select>
              <span className="opacity-40 text-lg leading-none" aria-hidden="true">›</span>
            </div>
          </button>
          
          <button className="flex items-center justify-between p-4 active:bg-elevated transition-colors group">
            <span className="text-red font-semibold text-[14px] group-active:opacity-80">Clear History</span>
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="flex flex-col items-center gap-5 mt-6 pb-6">
        <div className="flex items-center gap-6">
          <button className="text-muted text-[12px] font-bold hover:text-white transition-colors">Send Feedback</button>
          <div className="w-1 h-1 bg-hint rounded-full" />
          <button className="text-muted text-[12px] font-bold hover:text-white transition-colors">Rate SpeakZone</button>
        </div>
        <div className="flex items-center gap-4 text-hint text-[10px] font-semibold uppercase tracking-widest">
          <a href="#" className="hover:text-muted transition-colors">Terms</a>
          <a href="#" className="hover:text-muted transition-colors">Privacy</a>
        </div>
        <button className="mt-4 border border-hint text-muted font-bold py-3.5 px-12 rounded-xl text-[13px] active:scale-[0.98] transition-all uppercase tracking-wider">
          Log Out
        </button>
      </div>

    </div>
  );
}
