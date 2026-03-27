import { useState } from "react";
import { PrimaryButton } from "../shared/Button";

export default function PostCallRating({ open, onSubmit, onSkip }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [comment, setComment] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    onSubmit({ rating: selected, comment });
    setSelected(0);
    setComment("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-bg flex flex-col" style={{ maxWidth: 430, margin: "0 auto" }}>
      {/* Glow bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 30% at 50% 0%, rgba(123,92,240,0.1) 0%, transparent 65%)" }} />

      <div className="relative z-10 flex flex-col flex-1 px-5 pt-14">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-2xl mx-auto mb-5
            shadow-[0_0_24px_rgba(249,115,22,0.25)]"
            style={{ background: "linear-gradient(135deg,#f97316,#ef4444)" }}>
            A
          </div>
          <h1 className="font-syne font-bold text-white text-2xl mb-2">Rate Your Partner</h1>
          <p className="text-muted text-sm">How was your session with <span className="text-white font-medium">Asilbek</span>?</p>
        </div>

        {/* Star Selector */}
        <div className="flex justify-center gap-3 mb-8">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setSelected(star)}
              className="transition-transform duration-100 active:scale-90"
              style={{ fontSize: 44, lineHeight: 1 }}
            >
              <span style={{
                filter: (hovered || selected) >= star
                  ? "drop-shadow(0 0 8px rgba(245,197,24,0.6))"
                  : "none",
                transition: "filter 0.15s"
              }}>
                {(hovered || selected) >= star ? "⭐" : "☆"}
              </span>
            </button>
          ))}
        </div>

        {/* Rating label */}
        {selected > 0 && (
          <p className="text-center text-sm font-medium mb-6 text-slate-300">
            {["", "Poor 😕", "Fair 🙂", "Good 😊", "Great 😄", "Excellent 🤩"][selected]}
          </p>
        )}

        {/* Comment */}
        <div className="mb-6">
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add a comment (optional)"
            rows={3}
            className="w-full bg-card card-border rounded-xl2 px-4 py-3 text-sm text-white
              placeholder:text-muted resize-none outline-none focus:border-accent/50
              transition-colors duration-200"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <PrimaryButton
            id="btn-submit-rating"
            onClick={handleSubmit}
            className={selected === 0 ? "opacity-50 pointer-events-none" : ""}
          >
            ⭐ Submit Rating
          </PrimaryButton>
          <button
            onClick={onSkip}
            className="text-muted text-sm font-medium py-2 text-center active:text-white transition-colors"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
