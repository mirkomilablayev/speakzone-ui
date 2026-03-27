import Card from "../shared/Card";
import { PrimaryButton } from "../shared/Button";

const SESSIONS = [
  { id: 1, type: "Full Test",  date: "Today, 14:20", score: "7.5", status: "Completed" },
  { id: 2, type: "Part 2 Focus", date: "Yesterday",   score: "6.5", status: "Completed" },
  { id: 3, type: "Vocabulary",  date: "Mar 24",       score: "8.0", status: "Completed" },
];

export default function MockTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5 pt-1">
        <h1 className="font-bold text-2xl text-white">Mock Tests</h1>
        <p className="text-muted text-sm">Experience real IELTS Speaking exam conditions</p>
      </div>

      <Card className="bg-primary-gradient border-none p-6 flex flex-col gap-4 relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
        <div className="relative z-10">
          <h2 className="text-white font-bold text-xl mb-1 mt-1">Start Full Mock Test</h2>
          <p className="text-white/80 text-xs mb-6 max-w-[200px]">15 minutes, 3 parts, AI-powered scoring and deep analytics.</p>
          <button className="bg-white text-accent font-bold px-6 py-2.5 rounded-xl text-sm active:scale-95 transition-all">
             Start Test Now ⚡️
          </button>
        </div>
      </Card>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest">Recent Tests</h3>
          <button className="text-accent text-[11px] font-bold uppercase tracking-widest">View All</button>
        </div>
        
        <div className="flex flex-col gap-2">
          {SESSIONS.map(s => (
            <Card key={s.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-card-raised flex items-center justify-center text-lg">
                  📝
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm tracking-tight">{s.type}</span>
                  <span className="text-muted text-[11px] font-medium">{s.date}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <span className="text-accent font-black text-lg leading-none">{s.score}</span>
                 <span className="text-[10px] text-muted font-bold uppercase tracking-tighter opacity-70">Band Score</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
