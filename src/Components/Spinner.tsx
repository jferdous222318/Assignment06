export default function Spinner({ label = "Loading workouts…" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-3 py-20"
    >
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
      <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
    </div>
  );
}