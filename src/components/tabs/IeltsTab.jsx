import Card from "../shared/Card";

const IELTS_CARDS = [
  {
    id: "mock",
    icon: "📝",
    title: "IELTS Mock Test",
    sub: "Full 3-part structured session",
    desc: "Complete IELTS Speaking simulation with AI examiner, timing, and instant feedback.",
    gradient: "from-purple to-[#ec4899]",
    glow: "shadow-[0_4px_24px_rgba(123,92,240,0.35)]",
    locked: false,
  },
  {
    id: "cue",
    icon: "🃏",
    title: "Cue Card Practice",
    sub: "Part 2 – 2-minute monologue",
    desc: "Practice speaking on random topics with 1-min preparation and follow-up questions.",
    gradient: "from-accent to-teal",
    glow: "shadow-[0_4px_24px_rgba(79,142,247,0.3)]",
    locked: false,
  },
  {
    id: "roleplay",
    icon: "🎭",
    title: "Role-Play Scenarios",
    sub: "Hotel, Airport, Shopping & more",
    desc: "Real-life situational conversations to build practical speaking confidence.",
    gradient: "from-teal to-[#06b6d4]",
    glow: "shadow-[0_4px_24px_rgba(45,212,191,0.3)]",
    locked: true,
  },
  {
    id: "interview",
    icon: "💼",
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
            className={`relative rounded-xl2 p-4 bg-gradient-to-br ${card.gradient} ${card.glow} card-border overflow-hidden`}
          >
            {/* Frosted overlay for locked */}
            {card.locked && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-xl2 flex items-start justify-end p-3">
                <span className="text-2xl">🔒</span>
              </div>
            )}
            <div className="flex gap-4 items-start">
              <span className="text-3xl mt-1">{card.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-syne font-bold text-white text-base leading-snug">{card.title}</h3>
                <p className="text-white/70 text-xs font-medium mt-0.5">{card.sub}</p>
                <p className="text-white/60 text-xs mt-2 leading-relaxed">{card.desc}</p>
              </div>
            </div>
            <button
              className={`mt-3 w-full rounded-xl py-2 text-sm font-semibold transition-all duration-150 ${
                card.locked
                  ? "bg-white/10 text-white/50 cursor-default"
                  : "bg-white/20 text-white active:scale-[0.97] hover:bg-white/30"
              }`}
            >
              {card.locked ? "👑 Premium Only" : "Start →"}
            </button>
          </div>
        ))}
      </div>

      {/* Question Bank */}
      <Card>
        <h3 className="font-syne font-semibold text-white mb-3">📚 Question Bank</h3>
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
