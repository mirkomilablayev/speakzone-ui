export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-card card-border rounded-xl2 p-4 shadow-card ${className}`}
    >
      {children}
    </div>
  );
}
