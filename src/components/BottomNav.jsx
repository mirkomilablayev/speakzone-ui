// Clean SVG icon components
const HomeIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 22L2 22" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round"/>
    <path d="M2 11L10.1259 4.49931C11.2216 3.62279 12.7784 3.62279 13.8741 4.49931L22 11" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round"/>
    <path opacity="0.5" d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round"/>
    <path d="M4 22V9.5" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round"/>
    <path d="M20 22V9.5" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round"/>
    <path opacity="0.5" d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393C9 14.8787 9 15.5858 9 17V22" stroke="currentColor" strokeWidth={active ? 2.5 : 2} />
    <path opacity="0.5" d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z" stroke="currentColor" strokeWidth={active ? 2.5 : 2} />
  </svg>
);

const PracticeIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MockIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 2} xmlns="http://www.w3.org/2000/svg">
    <path d="M6.643,13.072,17.414,2.3a1.027,1.027,0,0,1,1.452,0L20.7,4.134a1.027,1.027,0,0,1,0,1.452L9.928,16.357,5,18ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/>
  </svg>
);

const ProfileIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TABS = [
  { id: "home",     label: "Home",     Icon: HomeIcon     },
  { id: "mock",     label: "Mock",     Icon: MockIcon     },
  { id: "practice", label: "Practice", Icon: PracticeIcon },
  { id: "profile",  label: "Profile",  Icon: ProfileIcon  },
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
