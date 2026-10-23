import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-white/10 bg-surface px-6 py-16 text-center">
      <h3 className="font-display text-2xl font-bold uppercase text-white">
        Nothing here yet
      </h3>
      <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-accent px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black hover:brightness-110"
      >
        Go to workouts
      </Link>
    </div>
  );
}