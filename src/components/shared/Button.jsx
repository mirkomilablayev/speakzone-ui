import { useTelegram } from "../../hooks/useTelegram";

export function PrimaryButton({ children, onClick, className = "", id, disabled = false }) {
  const { hapticFeedback } = useTelegram();

  const handleClick = (e) => {
    hapticFeedback("impact");
    onClick?.(e);
  };

  return (
    <button
      id={id}
      onClick={handleClick}
      disabled={disabled}
      className={`w-full bg-primary-gradient text-white font-semibold rounded-xl2 py-3.5 px-5 shadow-primary-glow
        active:scale-[0.97] transition-transform duration-150 flex items-center justify-center gap-2
        focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${className}`}
    >
      {children}
    </button>
  );
}

export function OutlineButton({ children, onClick, className = "", id, disabled = false }) {
  const { hapticFeedback } = useTelegram();

  const handleClick = (e) => {
    hapticFeedback("light");
    onClick?.(e);
  };

  return (
    <button
      id={id}
      onClick={handleClick}
      disabled={disabled}
      className={`w-full border border-accent text-accent font-semibold rounded-xl2 py-3.5 px-5
        active:scale-[0.97] transition-transform duration-150 flex items-center justify-center gap-2
        focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${className}`}
    >
      {children}
    </button>
  );
}
