import Card from "../shared/Card";

const MockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const CueIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" /><line x1="7" y1="8" x2="17" y2="8" /><line x1="7" y1="12" x2="17" y2="12" /><line x1="7" y1="16" x2="13" y2="16" />
  </svg>
);

const RoleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const InterviewIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const IELTS_CARDS = [
  {
    id: "mock",
    Icon: MockIcon,
    title: "IELTS Mock Test",
    sub: "Full 3-part structured session",
    desc: "Complete IELTS Speaking simulation with AI examiner, timing, and instant feedback.",
    gradient: "from-purple to-[#ec4899]",
    glow: "shadow-[0_4px_24px_rgba(123,92,240,0.35)]",
    locked: false,
  },
  {
    id: "cue",
    Icon: CueIcon,
    title: "Cue Card Practice",
    sub: "Part 2 – 2-minute monologue",
    desc: "Practice speaking on random topics with 1-min preparation and follow-up questions.",
    gradient: "from-accent to-teal",
    glow: "shadow-[0_4px_24px_rgba(79,142,247,0.3)]",
    locked: false,
  },
  {
    id: "roleplay",
    Icon: RoleIcon,
    title: "Role-Play Scenarios",
    sub: "Hotel, Airport, Shopping & more",
    desc: "Real-life situational conversations to build practical speaking confidence.",
    gradient: "from-teal to-[#06b6d4]",
    glow: "shadow-[0_4px_24px_rgba(45,212,191,0.3)]",
    locked: true,
  },
  {
    id: "interview",
    Icon: InterviewIcon,
    title: "Interview Prep",
    sub: "Job & university admissions",
    desc: "Specialized practice for high-stakes interviews with personalized AI coaching.",
    gradient: "from-orange to-[#f5c518]",
    glow: "shadow-[0_4px_24px_rgba(251,146,60,0.3)]",
    locked: true,
  },
];

const QUESTIONS = [
  "Describe a skill you want to learn",
  "Talk about your favourite season",
  "Describe a person who influenced your life",
  "Do you prefer cities or countryside?",
  "Describe a piece of technology you use daily",
  "Talk about a goal you achieved",
];

export default function IeltsTab() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-syne font-bold text-2xl text-white pt-1">IELTS Practice</h1>

      {/* Practice Cards */}
      <div className="flex flex-col gap-3">
        {IELTS_CARDS.map((card) => (
          <div
            key={card.id}
            className={`relative rounded-xl2 p-4 bg-gradient-to-br ${card.gradient} ${card.glow} card-border overflow-hidden active:scale-[0.98] transition-all`}
          >
            {/* Frosted overlay for locked */}
            {card.locked && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] rounded-xl2 flex flex-col items-center justify-between p-4 px-6 text-center">
                <div className="w-full flex justify-end">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gold">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div className="flex-1" />
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg active:scale-95 transition-transform"
                >
                  👑 Buy Premium
                </button>
              </div>
            )}
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                <card.Icon />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-syne font-bold text-white text-base leading-snug">{card.title}</h3>
                <p className="text-white/70 text-xs font-medium mt-0.5">{card.sub}</p>
                <p className="text-white/60 text-xs mt-2 leading-relaxed">{card.desc}</p>
              </div>
            </div>
            <button
              className={`mt-4 w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-150 ${
                card.locked
                  ? "bg-black/20 text-white/40 cursor-default"
                  : "bg-white/20 text-white active:scale-[0.97] hover:bg-white/30"
              }`}
            >
              {card.locked ? "Locked" : "Start Practice →"}
            </button>
          </div>
        ))}
      </div>

      {/* Question Bank */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <h3 className="font-syne font-semibold text-white">Question Bank</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {QUESTIONS.map((q) => (
            <span
              key={q}
              className="bg-card-raised border border-subtle text-slate-300 text-xs px-3 py-1.5 rounded-full leading-snug"
            >
              "{q}"
            </span>
          ))}
        </div>
      </Card>

      <div className="pb-2" />
    </div>
  );
}
