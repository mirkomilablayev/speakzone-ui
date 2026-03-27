import Card from "../shared/Card";
import { PrimaryButton } from "../shared/Button";
import Avatar from "../shared/Avatar";

const TOPICS = [
  { id: "leisure", icon: "🎨", label: "Leisure" },
  { id: "work",    icon: "💼", label: "Work & Study" },
  { id: "family",  icon: "🏠", label: "Family" },
  { id: "tech",    icon: "💻", label: "Technology" },
  { id: "travel",  icon: "✈️", label: "Travel" },
  { id: "health",  icon: "🍎", label: "Health" },
];

export default function PracticeTab({ onFindPartner }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5 pt-1">
        <h1 className="font-bold text-2xl text-white">English Practice</h1>
        <p className="text-muted text-sm">Find speaking partners around the world</p>
      </div>

      <Card className="bg-card-raised/50 border-accent/20 border p-6 flex flex-col gap-5 items-center text-center">
        <div className="flex -space-x-3 mb-2 animate-tab-in">
           {[1, 2, 3, 4, 5].map(i => (
             <div key={i} className="w-12 h-12 rounded-full border-4 border-bg overflow-hidden shadow-xl select-none">
                <Avatar index={i} size={48} />
             </div>
           ))}
        </div>
        <div className="flex flex-col gap-2">
           <h2 className="text-white font-black text-2xl leading-tight">3,421 Online Now</h2>
           <p className="text-muted text-xs px-8 leading-relaxed">Join a speaking session and level up your fluency automatically.</p>
        </div>
        <PrimaryButton onClick={onFindPartner} className="py-4 shadow-primary-glow select-none">
           Find Practice Partner 🌍
        </PrimaryButton>
      </Card>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-muted text-[11px] font-bold uppercase tracking-widest">Conversation Topics</h3>
          <button className="text-accent text-[11px] font-bold uppercase tracking-widest">More</button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 pb-10">
          {TOPICS.map(t => (
            <Card key={t.id} className="flex flex-col gap-3 py-6 active:scale-[0.98] transition-all cursor-pointer select-none">
              <span className="text-3xl text-center leading-none transform group-hover:scale-110 transition-transform">{t.icon}</span>
              <span className="text-white font-bold text-sm text-center tracking-tight">{t.label}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
