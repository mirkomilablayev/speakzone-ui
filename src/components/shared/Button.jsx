export function PrimaryButton({ children, onClick, className = "", id }) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`w-full bg-primary-gradient text-white font-semibold rounded-xl2 py-3.5 px-5 shadow-primary-glow
        active:scale-[0.97] transition-transform duration-150 flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </button>
  );
}

export function OutlineButton({ children, onClick, className = "", id }) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`w-full border border-accent text-accent font-semibold rounded-xl2 py-3.5 px-5
        active:scale-[0.97] transition-transform duration-150 flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </button>
  );
}
