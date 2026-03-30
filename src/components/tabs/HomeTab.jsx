import { useTranslation } from "react-i18next";
import { useUserStore } from "../../stores/useUserStore";
import Card from "../shared/Card";

const CORE_TOOLS = [
  { id: "improve", titleKey: "home.improve_answer", icon: "✨", descKey: "home.improve_answer_desc" },
  { id: "vocab",   titleKey: "home.topic_vocab",    icon: "📚", descKey: "home.topic_vocab_desc" },
];

export default function HomeTab({ onStartSession, onOpenProfile }) {
  const { t } = useTranslation();
  const { name, initial, streak } = useUserStore();

  return (
    <div className="flex flex-col gap-6 pb-24 animate-tab-in">

      {/* 1. TOP BAR */}
      <div className="flex items-center justify-between pt-2">
        <button className="flex items-center gap-3" onClick={onOpenProfile} aria-label={`Open profile for ${name}`}>
          <div className="w-10 h-10 rounded-full bg-primary-gradient flex items-center justify-center font-black text-white text-sm shadow-xl border border-white/10 shrink-0">
            {initial}
          </div>
          <div className="flex flex-col items-start">
            <h2 className="font-bold text-[16px] text-white leading-none">{name}</h2>
            <span className="text-orange text-[10px] font-black mt-1 uppercase tracking-wider">
              {t("home.streak", { count: streak })}
            </span>
          </div>
        </button>
        <button className="w-10 h-10 rounded-full bg-card-raised border border-white/5 flex items-center justify-center text-lg active:scale-90 transition-all"
                aria-label="Notifications">🔔</button>
      </div>

      {/* 2. BAND SCORE CARD */}
      <Card onClick={onOpenProfile}
        className="bg-card-raised/50 border-y-0 border-r-0 border-l-[4px] border-l-accent p-6 flex flex-col gap-4 active:scale-[0.99] transition-all cursor-pointer group">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-muted text-[11px] font-bold uppercase tracking-widest leading-none">{t("home.your_progress")}</span>
            <h3 className="text-accent font-black text-[36px] leading-none mt-3" aria-label="Band score 6.5">6.5</h3>
          </div>
          <div className="flex flex-col items-end gap-1 opacity-60">
            <span className="text-white font-black text-xs">{t("home.target", { band: "7.5" })}</span>
            <span className="text-muted text-[9px] font-black uppercase tracking-widest italic">{t("home.improving")}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-green text-[13px] font-black tracking-tight">{t("home.on_track")}</span>
          <span className="text-accent text-[11px] font-black uppercase tracking-widest underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity">
            {t("home.view_details")}
          </span>
        </div>
      </Card>

      {/* 3. START MOCK */}
      <button onClick={onStartSession}
        className="bg-primary-gradient p-8 rounded-[32px] flex flex-col gap-1 items-center text-center group active:scale-[0.98] transition-all shadow-primary-glow border border-white/20 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform" aria-hidden="true" />
        <h3 className="text-white font-black text-[22px] relative z-10 leading-none flex items-center gap-3">
          {t("home.start_mock")}
        </h3>
        <p className="text-white/80 text-[11px] mt-2 font-black relative z-10 uppercase tracking-widest leading-tight">
          {t("home.mock_sub")}
        </p>
        <div className="mt-8 bg-white text-accent font-black px-10 py-4 rounded-full text-[13px] relative z-10 shadow-xl group-hover:scale-105 transition-transform uppercase tracking-widest leading-none">
          {t("home.start_now")}
        </div>
        <span className="mt-4 text-white/50 text-[9px] font-black uppercase tracking-[0.2em] relative z-10 italic">
          {t("home.free_remaining")}
        </span>
      </button>

      {/* 4. TOOLS */}
      <div className="flex flex-col gap-3 mt-2">
        <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest px-1">{t("home.training_title")}</h3>
        <div className="flex flex-col gap-3">
          {CORE_TOOLS.map((tool) => (
            <Card key={tool.id} className="flex items-center gap-4 py-4 px-5 bg-card-raised border-white/5 active:scale-[0.97] transition-all cursor-pointer group shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0" aria-hidden="true">
                {tool.icon}
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-white font-black text-[15px] tracking-tight truncate leading-none">{t(tool.titleKey)}</span>
                <p className="text-muted text-[11px] font-bold opacity-60 leading-none">{t(tool.descKey)}</p>
              </div>
              <span className="ml-auto text-muted text-xl opacity-30 group-hover:translate-x-1 transition-transform shrink-0" aria-hidden="true">›</span>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
