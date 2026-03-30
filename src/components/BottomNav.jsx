import { useTelegram } from "../hooks/useTelegram";
import { useTranslation } from "react-i18next";

const HomeIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 12L12 4L21 12" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 10V19C5 19.6 5.4 20 6 20H9V15H15V20H18C18.6 20 19 19.6 19 19V10" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SpeakIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth={active ? 2 : 1.5}/>
    <path d="M5 11C5 14.866 8.134 18 12 18C15.866 18 19 14.866 19 11" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round"/>
    <path d="M12 18V22M9 22H15" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round"/>
  </svg>
);

const MockIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth={active ? 2 : 1.5}/>
    <path d="M8 7H16M8 11H16M8 15H12" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round"/>
  </svg>
);

const ProfileIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth={active ? 2 : 1.5}/>
    <path d="M5 20C5 17.239 8.134 15 12 15C15.866 15 19 17.239 19 20" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round"/>
  </svg>
);

const TABS = [
  { id: "home",     label: "Home",    Icon: HomeIcon    },
  { id: "mock",     label: "Mock",    Icon: MockIcon    },
  { id: "practice", label: "Speak",   Icon: SpeakIcon   },
  { id: "profile",  label: "Profile", Icon: ProfileIcon },
];

export default function BottomNav({ activeTab, onTabChange }) {
  const { hapticFeedback } = useTelegram();

  return (
    <nav className="glass-nav flex-shrink-0 flex items-center justify-around" style={{ height: 64 }}
         role="tablist" aria-label="Main navigation">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            id={`nav-${id}`}
            role="tab"
            aria-selected={isActive}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            onClick={() => { hapticFeedback("light"); onTabChange(id); }}
            className={`flex flex-col items-center justify-center gap-1.5 flex-1 h-full transition-all duration-200 ${isActive ? "text-teal" : "text-muted"}`}
          >
            <div className={`p-1.5 rounded-xl transition-all ${isActive ? "bg-teal/10" : ""}`}>
              <Icon active={isActive} />
            </div>
            <span className={`text-[9px] font-semibold leading-none uppercase tracking-wider ${isActive ? "text-teal" : "text-muted"}`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
