import Card from "../shared/Card";
import { PrimaryButton } from "../shared/Button";

const CRITERIA = [
  { name: "Fluency",       score: 6.5, pct: 65 },
  { name: "Lexical",       score: 6.0, pct: 60 },
  { name: "Grammar",       score: 7.0, pct: 70 },
  { name: "Pronunciation", score: 6.0, pct: 60 },
];

const BAR_DATA = [55, 70, 60, 80, 65, 75, 85];
const BAR_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ProgressTab() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-syne font-bold text-2xl text-white pt-1">Progress</h1>

      <div className="relative">
        {/* Blurred background content */}
        <div className="progress-blur flex flex-col gap-4 select-none pointer-events-none">
          {/* Band Score */}
          <Card className="flex flex-col items-center py-8">
            <span className="font-syne font-black text-7xl text-accent">6.5</span>
            <span className="text-muted text-sm mt-2 font-medium">Overall Band Score</span>
          </Card>

          {/* Criteria Bars */}
          <Card>
            <h3 className="font-syne font-semibold text-white mb-4">Criteria Breakdown</h3>
            <div className="flex flex-col gap-3">
              {CRITERIA.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="text-slate-400 text-xs w-24 shrink-0">{c.name}</span>
                  <div className="flex-1 h-2 bg-card-raised rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-gradient rounded-full criteria-bar-fill"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                  <span className="text-accent font-semibold text-sm w-7 text-right">{c.score}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Mini Bar Chart */}
          <Card>
            <h3 className="font-syne font-semibold text-white mb-4">Last 7 Sessions</h3>
            <div className="flex items-end justify-between gap-1.5 h-20">
              {BAR_DATA.map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className={`w-full rounded-t-md ${i === 6 ? "bg-primary-gradient" : "bg-card-raised"}`}
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[9px] text-muted">{BAR_DAYS[i]}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Premium lock overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-card/95 border border-subtle rounded-xl3 p-6 mx-4 text-center shadow-card backdrop-blur-sm">
            <div className="text-5xl mb-3">🔒</div>
            <h2 className="font-syne font-bold text-xl text-white mb-2">Premium Feature</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Unlock to see your band score history, session recordings, and detailed analytics
            </p>
            <PrimaryButton id="btn-get-premium">👑 Get Premium</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
