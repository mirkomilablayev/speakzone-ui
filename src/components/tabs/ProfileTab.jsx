import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import Card from "../shared/Card";
import { PrimaryButton, OutlineButton } from "../shared/Button";
import { PremiumBadge } from "../shared/PremiumBadge";
import { useUserStore } from "../../stores/useUserStore";

const HISTORY = [
  { id: 1, type: "Full Mock",    date: "Mar 26, 18:45", score: "7.5", trend: "up" },
  { id: 2, type: "Part 2 Focus", date: "Mar 25, 12:10", score: "6.5", trend: "stable" },
  { id: 3, type: "Part 1 Mock",  date: "Mar 22, 10:30", score: "6.0", trend: "down" },
];

const CRITERIA = [
  { label: "Fluency",  value: "7.0", pct: 70 },
  { label: "Lexical",  value: "7.5", pct: 75 },
  { label: "Grammar",  value: "6.5", pct: 65 },
  { label: "Pronun.",  value: "7.0", pct: 70 },
];

const LANGUAGES = [
  { code: "uz", label: "O'zbek" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
];

export default function ProfileTab({ onGetPremium }) {
  const { t } = useTranslation();
  const [showFullHistory, setShowFullHistory] = useState(false);
  const { name, initial, isPremium, targetBand, language, setLanguage } = useUserStore();

  const SETTINGS = [
    { icon: "🎯", label: t("profile.settings_target"),    value: targetBand },
    { icon: "🔔", label: t("profile.settings_notifications"), value: t("profile.on") },
  ];

  if (showFullHistory) {
    return (
      <div className="flex flex-col gap-6 pb-24 animate-tab-in">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowFullHistory(false)} aria-label={t("profile.back")}
            className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-xl active:scale-95 transition-all">←</button>
          <h2 className="text-white font-black text-lg">{t("profile.history_title")}</h2>
        </div>
        <Card className="!p-0 overflow-hidden divide-y divide-subtle mt-1 bg-card-raised border-white/5">
          {HISTORY.map((h, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-5 active:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex flex-col gap-0.5">
                <span className="text-white font-black text-sm">{h.type}</span>
                <span className="text-muted text-[10px] uppercase font-bold tracking-widest opacity-60 italic">{h.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-white font-black text-lg leading-none">{h.score}</span>
                  <span className="text-[8px] text-muted font-bold uppercase tracking-tighter mt-1">{t("profile.band_score")}</span>
                </div>
                <span className="text-muted text-lg opacity-20 ml-1" aria-hidden="true">›</span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-24 animate-tab-in">
      <div className="flex flex-col gap-1.5 pt-1">
        <h1 className="font-bold text-2xl text-white">{t("profile.title")}</h1>
      </div>

      {/* 1. USER INFO */}
      <Card className="flex items-center gap-4 py-8 bg-card-raised border-white/5 relative overflow-hidden group active:scale-[0.99] transition-all cursor-pointer">
        <div className="w-20 h-20 rounded-full bg-primary-gradient flex items-center justify-center font-black text-white text-3xl shadow-xl border-4 border-white/5 relative z-10 shrink-0 select-none"
             aria-label={`Avatar of ${name}`}>{initial}</div>
        <div className="flex flex-col gap-1 relative z-10 overflow-hidden">
          <div className="flex items-center gap-2 pr-2">
            <h2 className="text-white font-black text-2xl leading-none truncate pr-1">{name}</h2>
            {isPremium && (
              <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center text-white text-[10px] shadow-primary-glow border border-white/20" aria-label="Premium verified">✓</div>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="bg-accent text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Target: {targetBand}</span>
            <span className="bg-accent/80 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Level: B2+</span>
          </div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-muted text-2xl opacity-20 group-hover:translate-x-1 transition-transform" aria-hidden="true">›</div>
      </Card>

      {/* 2. BAND CHART */}
      <div className="flex flex-col gap-3">
        <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">{t("profile.band_over_time")}</h3>
        <Card className="p-6 bg-card-raised border-white/5 overflow-visible">
          <div className="h-44 w-full relative flex gap-2">
            <div className="flex flex-col justify-between h-32 text-[10px] text-muted font-bold py-1 w-6 text-right" aria-hidden="true">
              <span>8.0</span><span>7.0</span><span>6.0</span><span>5.0</span>
            </div>
            <div className="flex-1 h-32 relative">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="absolute w-full h-[1px] border-t border-dashed border-white/5 z-0" style={{ top: `${(i / 3) * 100}%` }} aria-hidden="true" />
              ))}
              <svg viewBox="0 0 400 150" className="w-full h-full relative z-10 overflow-visible" role="img" aria-label="Band score progress chart">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f8ef7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#4f8ef7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,120 L80,105 L160,115 L240,80 L320,60 L400,30 L400,150 L0,150 Z" fill="url(#chartGrad)" />
                <path d="M0,120 L80,105 L160,115 L240,80 L320,60 L400,30" fill="none" stroke="#4f8ef7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                {[0, 80, 160, 240, 320, 400].map((x, i) => (
                  <circle key={i} cx={x} cy={[120, 105, 115, 80, 60, 30][i]} r="5" fill="white" stroke="#4f8ef7" strokeWidth="2" />
                ))}
              </svg>
              <div className="flex justify-between w-full mt-2 text-[9px] text-muted font-black uppercase tracking-tighter opacity-60" aria-hidden="true">
                <span>Mar 1</span><span>Mar 8</span><span>Mar 15</span><span>Mar 22</span><span>Mar 26</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/5">
            <div className="flex flex-col">
              <span className="text-white font-black text-2xl leading-none">7.5</span>
              <span className="text-muted text-[10px] font-bold uppercase tracking-widest mt-1">{t("profile.current_band")}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-green font-black text-2xl leading-none">+1.5</span>
              <span className="text-muted text-[10px] font-bold uppercase tracking-widest mt-1">{t("profile.improvement")}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 3. DETAILED ANALYSIS */}
      <div className="flex flex-col gap-3">
        <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">{t("profile.detailed_analysis")}</h3>
        <Card className="flex flex-col gap-6 p-6 bg-card-raised border-white/5">
          {CRITERIA.map(c => (
            <div key={c.label} className="flex flex-col gap-3">
              <div className="flex justify-between items-end">
                <span className="text-white font-black text-[13px] tracking-tight">{c.label}</span>
                <span className="text-white font-black text-sm">{c.value}</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden" role="progressbar" aria-valuenow={c.pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${c.label}: ${c.value}`}>
                <div className="h-full bg-primary-gradient rounded-full shadow-primary-glow transition-all" style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* 4. MOCK HISTORY */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest">{t("profile.mock_history")}</h3>
          <button onClick={() => setShowFullHistory(true)} className="text-accent text-[11px] font-black uppercase tracking-widest underline decoration-2 underline-offset-4">
            {t("profile.view_all")}
          </button>
        </div>
        <Card className="!p-0 overflow-hidden divide-y divide-subtle bg-card-raised border-white/5">
          {HISTORY.map(h => (
            <div key={h.id} className="flex items-center justify-between px-5 py-5 active:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex flex-col gap-1">
                <span className="text-white font-black text-[15px]">{h.type}</span>
                <span className="text-muted text-[11px] font-medium opacity-60 leading-none">{h.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-white font-black text-lg leading-none">{h.score}</span>
                  <span className="text-[9px] text-muted font-bold uppercase tracking-tighter mt-1 opacity-40">Band</span>
                </div>
                <span className={`text-[15px] font-black ${h.trend === "up" ? "text-green" : h.trend === "down" ? "text-red" : "text-slate-500"}`}
                      aria-label={h.trend === "up" ? "Improving" : h.trend === "down" ? "Declining" : "Stable"}>
                  {h.trend === "up" ? "↑" : h.trend === "down" ? "↓" : "→"}
                </span>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* 5. PREMIUM CTA */}
      {!isPremium && (
        <Card className="bg-bg border border-gold/40 p-6 flex flex-col gap-4 relative overflow-hidden group active:scale-[0.99] transition-all cursor-pointer" onClick={onGetPremium}>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl group-hover:scale-125 transition-transform" aria-hidden="true" />
          <div className="relative z-10">
            <span className="text-gold text-[10px] font-black uppercase tracking-widest">{t("profile.unlock_roadmap")}</span>
            <h3 className="text-white font-black text-xl leading-tight mt-1">{t("profile.strategy_title")}</h3>
            <p className="text-white/60 text-[13px] font-medium leading-relaxed max-w-[240px] mt-2">{t("profile.strategy_desc")}</p>
            <button className="mt-6 w-full bg-gold-gradient text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest shadow-gold-glow group-hover:scale-105 transition-transform">
              {t("profile.upgrade")}
            </button>
          </div>
        </Card>
      )}

      {/* 6. SETTINGS — including language selector */}
      <div className="flex flex-col gap-3">
        <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">{t("profile.settings")}</h3>
        <Card className="!p-0 overflow-hidden divide-y divide-subtle bg-card-raised border-white/5">
          {/* Language selector */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-4">
              <span className="text-xl opacity-80" aria-hidden="true">🌐</span>
              <span className="text-white font-black text-[14px] leading-none">{t("profile.settings_language")}</span>
            </div>
            <div className="flex items-center gap-1">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); i18n.changeLanguage(lang.code); }}
                  aria-pressed={language === lang.code}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${
                    language === lang.code ? "bg-accent text-white" : "bg-white/5 text-muted"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {SETTINGS.map(s => (
            <button key={s.label} className="w-full flex items-center justify-between px-5 py-5 active:bg-white/5 transition-colors group">
              <div className="flex items-center gap-4">
                <span className="text-xl opacity-80 group-hover:scale-110 transition-transform" aria-hidden="true">{s.icon}</span>
                <span className="text-white font-black text-[14px] leading-none">{s.label}</span>
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <span className="text-white text-[11px] font-black uppercase tracking-widest leading-none">{s.value}</span>
                <span className="text-muted text-lg leading-none opacity-40" aria-hidden="true">›</span>
              </div>
            </button>
          ))}
        </Card>
      </div>

      <p className="text-center text-muted text-[11px] font-black uppercase tracking-[0.3em] mt-2 mb-4 opacity-10">
        {t("profile.version")}
      </p>
    </div>
  );
}
