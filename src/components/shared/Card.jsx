export default function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-surface rounded-2xl p-4 ${className}`}
    >
      {children}
    </div>
  );
}
