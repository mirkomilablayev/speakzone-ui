const TABS = [
  { id: "home",     icon: "🏠", label: "Home"     },
  { id: "match",    icon: "🔍", label: "Match"    },
  { id: "ielts",    icon: "📝", label: "IELTS"    },
  { id: "progress", icon: "📈", label: "Progress" },
  { id: "rank",     icon: "🏆", label: "Rank"     },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="glass-nav h-16 flex items-center justify-around px-2 flex-shrink-0">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`nav-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 rounded-xl
              transition-all duration-200 ${isActive ? "text-accent" : "text-muted"}`}
          >
            <span className={`text-xl transition-transform duration-200 ${isActive ? "scale-110" : "scale-100"}`}>
              {tab.icon}
            </span>
            <span className={`text-[10px] font-medium leading-none transition-all duration-200 ${
              isActive ? "text-accent font-semibold" : "text-muted"
            }`}>
              {tab.label}
            </span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-accent mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
