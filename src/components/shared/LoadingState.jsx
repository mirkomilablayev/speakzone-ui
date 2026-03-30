/** Skeleton — for cards and list items */
export function Skeleton({ className = "" }) {
  return <div className={`bg-white/5 animate-pulse rounded-xl ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="bg-card-raised border border-white/5 rounded-2xl p-5 flex flex-col gap-4 animate-pulse">
      <div className="h-4 bg-white/10 rounded-full w-3/4" />
      <div className="h-3 bg-white/5 rounded-full w-1/2" />
      <div className="h-3 bg-white/5 rounded-full w-2/3" />
    </div>
  );
}

export function ListSkeleton({ rows = 3 }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Spinner — for full-screen async operations */
export function Spinner({ size = "md", label = "" }) {
  const sizes = { sm: "w-5 h-5 border-[3px]", md: "w-10 h-10 border-4", lg: "w-16 h-16 border-4" };
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12" role="status" aria-label={label || "Loading"}>
      <div className={`${sizes[size]} border-accent/20 border-t-accent rounded-full animate-spin`} />
      {label && <p className="text-muted text-sm font-medium">{label}</p>}
    </div>
  );
}

/** Default export — choose variant via prop */
export default function LoadingState({ variant = "spinner", ...props }) {
  if (variant === "card-skeleton") return <CardSkeleton {...props} />;
  if (variant === "list-skeleton") return <ListSkeleton {...props} />;
  return <Spinner {...props} />;
}
