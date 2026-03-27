import { useState } from "react";
import Card from "../shared/Card";
import { PremiumLockBadge } from "../shared/PremiumBadge";
import { PrimaryButton } from "../shared/Button";

const RECENT_CALLS = [
  { initials: "A", gradient: "bg-[linear-gradient(135deg,#f97316,#ef4444)]", name: "Asilbek",  topic: '"Do you like visiting museums?"',          duration: "2:36", date: "Mar 25", stars: 5 },
  { initials: "N", gradient: "bg-[linear-gradient(135deg,#8b5cf6,#ec4899)]", name: "Nodira",   topic: '"Describe a place you visited recently."',  duration: "3:12", date: "Mar 23", stars: 4 },
  { initials: "B", gradient: "bg-[linear-gradient(135deg,#06b6d4,#3b82f6)]", name: "Bobur",    topic: '"Talk about your hometown."',               duration: "1:58", date: "Mar 21", stars: 5 },
  { initials: "S", gradient: "bg-[linear-gradient(135deg,#10b981,#06b6d4)]", name: "Sarvinoz", topic: '"Describe a memorable childhood event."',   duration: "4:05", date: "Mar 18", stars: 4 },
];

function FilterChip({ label, active, disabled, onClick }) {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      style={{ fontSize: 13 }}
      className={`px-2.5 py-1 rounded-lg font-medium border transition-all duration-150 ${
        disabled
          ? "border-subtle text-muted opacity-50 cursor-default"
          : active
          ? "bg-primary-gradient border-transparent text-white shadow-primary-glow"
          : "border-subtle text-slate-400 bg-card-raised active:scale-95"
      }`}
    >
      {label}
    </button>
  );
}

function FilterGroup({ label, options, activeIndex, onSelect, locked }) {
  return (
    <div className="mb-2.5">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-slate-500 font-semibold uppercase tracking-wide" style={{ fontSize: 10 }}>{label}</span>
        {locked && <PremiumLockBadge />}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt, i) => (
          <FilterChip
            key={opt}
            label={opt}
            active={activeIndex === i}
            disabled={locked}
            onClick={() => onSelect(i)}
          />
        ))}
        {locked && <span className="text-sm">🔒</span>}
      </div>
    </div>
  );
}

export default function MatchTab({ onFindPartner }) {
  const [gender, setGender]   = useState(2); // "Any"
  const [level,  setLevel]    = useState(3); // "Any level"

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-syne font-bold text-xl text-white">Find a Partner</h1>

      {/* Free Minutes Bar */}
      <Card padding="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-300 font-medium" style={{ fontSize: 13 }}>⏱️ 20 min/day free</span>
          <span className="text-accent font-semibold" style={{ fontSize: 13 }}>14 min remaining</span>
        </div>
        <div className="w-full h-1.5 bg-card-raised rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-gradient rounded-full transition-all duration-500"
            style={{ width: "70%" }}
          />
        </div>
      </Card>

      {/* Filters */}
      <Card padding="px-4 py-3">
        <h3 className="font-syne font-semibold text-white mb-3" style={{ fontSize: 13 }}>Who would you like to talk with?</h3>

        <FilterGroup
          label="Gender"
          options={["Male", "Female", "Any"]}
          activeIndex={gender}
          onSelect={setGender}
        />
        <FilterGroup
          label="English Level"
          options={["Beginner", "Intermediate", "Advanced", "Any level"]}
          activeIndex={level}
          onSelect={setLevel}
          locked
        />
      </Card>

      {/* CTA */}
      <PrimaryButton id="btn-find-partner" onClick={onFindPartner}>
        🔍 Find Partner
      </PrimaryButton>

      {/* Recent Calls */}
      <Card>
        <h3 className="font-syne font-semibold text-white mb-4">Recent Calls</h3>
        <div className="flex flex-col gap-4">
          {RECENT_CALLS.map((call) => (
            <div key={call.name} className="flex gap-3 items-start">
              <div className={`w-9 h-9 ${call.gradient} rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0 mt-0.5`}>
                {call.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-white">{call.name}</span>
                  <span className="text-accent font-mono text-xs font-semibold">{call.duration}</span>
                </div>
                <p className="text-slate-400 text-xs mt-0.5 leading-snug">{call.topic}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-muted text-[11px]">{call.date}</span>
                  <span className="text-yellow-400 text-xs">{"⭐".repeat(call.stars)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="pb-2" />
    </div>
  );
}
