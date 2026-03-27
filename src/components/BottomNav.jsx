// Clean SVG icon components
const HomeIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const MatchIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const IeltsIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const ProgressIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const RankIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 21H5a2 2 0 01-2-2v-5m18 7h-3a2 2 0 01-2-2v-5" />
    <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.5l-4.9 2.7.9-5.5L4 8.8l5.5-.8L12 3z" />
  </svg>
);

const TABS = [
  { id: "home",     label: "Home",     Icon: HomeIcon     },
  { id: "match",    label: "Match",    Icon: MatchIcon    },
  { id: "ielts",    label: "IELTS",    Icon: IeltsIcon    },
  { id: "progress", label: "Progress", Icon: ProgressIcon },
  { id: "rank",     label: "Rank",     Icon: RankIcon     },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="glass-nav flex-shrink-0 flex items-center justify-around"
      style={{ height: 60 }}>
      {TABS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            id={`nav-${id}`}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors duration-200
              ${isActive ? "text-accent" : "text-muted"}`}
          >
            <Icon active={isActive} />
            <span className={`text-[10px] font-medium leading-none ${isActive ? "text-accent" : "text-muted"}`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
