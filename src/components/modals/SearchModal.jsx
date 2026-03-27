import { useEffect, useState, useRef } from "react";

export default function SearchModal({ open, onCancel, onConnected }) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (open) {
      setSeconds(0);
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      // Auto-connect after 3 seconds
      timeoutRef.current = setTimeout(() => {
        clearInterval(intervalRef.current);
        onConnected();
      }, 3000);
    }
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [open]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-card card-border rounded-xl3 p-8 flex flex-col items-center gap-5 w-72 shadow-card animate-fade-up">
        {/* Spinner rings */}
        <div className="relative flex items-center justify-center w-32 h-32">
          {/* Outer ring */}
          <div className="absolute w-32 h-32 search-ring-outer" />
          {/* Inner ring */}
          <div className="absolute w-24 h-24 search-ring" />
          {/* Center pulse */}
          <div className="w-12 h-12 bg-primary-gradient rounded-full flex items-center justify-center shadow-primary-glow">
            <span className="text-xl">🔍</span>
          </div>
        </div>

        <div className="text-center">
          <h2 className="font-syne font-bold text-xl text-white">Searching...</h2>
          <p className="text-muted text-sm mt-1">Looking for a partner…</p>
        </div>

        {/* Wait Counter */}
        <div className="bg-card-raised border border-subtle rounded-xl px-6 py-2">
          <span className="font-mono text-accent font-semibold text-lg">{fmt(seconds)}</span>
        </div>

        <button
          onClick={onCancel}
          className="w-full border border-subtle text-slate-400 font-medium rounded-xl2 py-3 text-sm active:scale-95 transition-transform"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
