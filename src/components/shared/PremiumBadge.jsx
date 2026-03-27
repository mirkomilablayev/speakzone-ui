export function PremiumBadge({ size = 18 }) {
  return (
    <div 
      className="inline-flex items-center justify-center bg-[#3b82f6] rounded-full shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

export function PremiumLockBadge() {
  return (
    <span className="bg-gold/10 text-gold font-bold text-[9px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 border border-gold/20 uppercase tracking-wider">
      Premium
    </span>
  );
}
