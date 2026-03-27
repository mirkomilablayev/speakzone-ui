export function PremiumBadge({ small = false }) {
  return (
    <span
      className={`bg-gold-gradient text-black font-bold rounded-full inline-flex items-center gap-1 ${
        small ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"
      }`}
    >
      👑 Premium
    </span>
  );
}

export function PremiumLockBadge() {
  return (
    <span className="bg-gold-gradient text-black font-bold text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
      👑 Premium
    </span>
  );
}
