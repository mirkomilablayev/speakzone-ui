export default function Card({ children, className = "", padding = "p-4", ...props }) {
  return (
    <div
      className={`bg-card card-border rounded-xl2 shadow-card ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
