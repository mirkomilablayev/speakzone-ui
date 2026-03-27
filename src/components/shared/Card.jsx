export default function Card({ children, className = "", padding = "p-4" }) {
  return (
    <div
      className={`bg-card card-border rounded-xl2 shadow-card ${padding} ${className}`}
    >
      {children}
    </div>
  );
}
